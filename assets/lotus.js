/* ═══════════════════════════════════════════════════════════════════════════
   Maison Malaak — 3D Fine Lotus (homepage)
   ---------------------------------------------------------------------------
   A real-time gold lotus (the maison's Fine Lotus logo, in 3D) rendered
   behind the hero: extruded gold petals, portal rings, a glowing bud and
   drifting gold dust. It turns as the visitor scrolls, can be dragged to
   rotate, and recolours itself when a ritual is picked in the picker
   section (#ritual-picker).

   Ported from the approved `maison-malaak-3d-website` showcase (2026-11-10).
   The lotus scene is the showcase's own code; the loader/fallback pattern
   is the proven one from the Mortea 3D port.

   Robustness first:
   - three.js is loaded from a CDN with a timeout. If it fails (or WebGL is
     unavailable), a lightweight 2D-canvas gold ring + orb takes over.
   - If even that fails, the canvas hides and the CSS gold-glow backdrop
     (#glFallback) carries the look. The page never depends on this.
   - Respects prefers-reduced-motion (renders one still frame, no loop).
   - Rendering pauses while the lotus is hidden (scrolled past the hero and
     the picker) or the tab is hidden.
   - Dragging never hijacks links or buttons.

   Ritual data comes from `window.MALAAK_RITUALS` (defined inline on each
   homepage, in that page's language). If it is absent, the picker wiring
   is skipped and the lotus still runs.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    var THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.min.js';
    var THREE_TIMEOUT_MS = 8000;

    var glContainer = document.getElementById('gl');
    var glFallback = document.getElementById('glFallback');
    var heroEl = document.querySelector('.hero-lotus');
    var pickerEl = document.getElementById('ritual-picker');
    if (!glContainer || !heroEl) { return; }

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Shared state ─────────────────────────────────────────────────── */
    var targetColor = null, targetRing = null;
    var spinBoost = 0;

    /* Lotus visibility: full in the hero, near-full over the picker,
       hidden everywhere else (cream sections, footer). */
    function computeOpacity() {
        var vh = window.innerHeight;
        if (pickerEl) {
            var r = pickerEl.getBoundingClientRect();
            if (r.top < vh * 0.65 && r.bottom > vh * 0.35) { return '0.95'; }
        }
        if (window.scrollY < vh * 0.55) { return '1'; }
        return '0';
    }
    function applyOpacity() {
        var op = computeOpacity();
        if (glContainer._op !== op) {
            glContainer._op = op;
            glContainer.style.opacity = op;
        }
        return op;
    }

    /* ── Load three.js from CDN (with timeout) ────────────────────────── */
    function loadThree() {
        return new Promise(function (resolve) {
            if (window.THREE) { resolve(true); return; }
            var done = false;
            var timer = setTimeout(function () { finish(false); }, THREE_TIMEOUT_MS);
            function finish(ok) {
                if (done) { return; }
                done = true;
                clearTimeout(timer);
                resolve(ok);
            }
            var s = document.createElement('script');
            s.src = THREE_CDN;
            s.async = true;
            s.onload = function () { finish(!!window.THREE); };
            s.onerror = function () { finish(false); };
            document.head.appendChild(s);
        });
    }

    /* ── Ritual picker wiring ─────────────────────────────────────────── */
    function wirePicker() {
        var data = window.MALAAK_RITUALS;
        if (!data) { return; }
        var buttons = document.querySelectorAll('.ritual');
        if (!buttons.length) { return; }
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
                btn.setAttribute('aria-pressed', 'true');
                var r = data[btn.getAttribute('data-ritual')];
                if (!r) { return; }
                var set = function (id, v) { var el = document.getElementById(id); if (el) { el.textContent = v; } };
                set('pvKicker', r.kicker);
                set('pvName', r.name);
                set('pvDesc', r.desc);
                set('pvPrice', r.price);
                set('pvFrom', r.from);
                set('pvNote', r.note);
                if (window.THREE) {
                    targetColor = new window.THREE.Color(r.color);
                    targetRing = new window.THREE.Color(r.ring);
                }
                spinBoost = 6;
            });
        });
    }

    /* ═══════════════════════════════════════════════════════════════════
       THREE.JS FINE LOTUS (showcase scene, unchanged)
       ═══════════════════════════════════════════════════════════════════ */
    function startThree() {
        var THREE = window.THREE;
        var renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch (e) { return false; }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.12;
        if (renderer.outputColorSpace !== undefined) { renderer.outputColorSpace = THREE.SRGBColorSpace; }
        glContainer.appendChild(renderer.domElement);

        var scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x4a3a2e, 0.028);
        var camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 1.4, 9.2);

        var pmrem = new THREE.PMREMGenerator(renderer);
        var envScene = new THREE.Scene();
        envScene.background = new THREE.Color(0x4a3a2e);
        function panel(x, y, z, w, h, c, i) {
            var p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c }));
            p.material.color.multiplyScalar(i); p.position.set(x, y, z); p.lookAt(0, 0, 0); envScene.add(p);
        }
        panel(0, 6, 0, 10, 10, 0xffe9c4, 3); panel(-6, 2, 2, 6, 4, 0xc9a96e, 2);
        panel(6, 1, -2, 6, 4, 0xfff6e6, 2.2); panel(0, 2, -7, 8, 5, 0x8a6f45, 1.4);
        scene.environment = pmrem.fromScene(envScene, 0.06).texture;

        // Lights: key, fill, rim
        var key = new THREE.DirectionalLight(0xffe3b3, 3.2); key.position.set(4, 6, 5); scene.add(key);
        var fill = new THREE.DirectionalLight(0xfff4e0, 0.55); fill.position.set(-5, 2, 4); scene.add(fill);
        var rim = new THREE.PointLight(0xC9A96E, 60, 30); rim.position.set(0, 3, -4); scene.add(rim);
        scene.add(new THREE.AmbientLight(0x40342a, 0.9));

        var group = new THREE.Group(); scene.add(group);

        // Petal geometry: teardrop shape, extruded with bevel
        function petalGeometry(len, wid) {
            var s = new THREE.Shape();
            s.moveTo(0, 0);
            s.bezierCurveTo(wid, len * 0.28, wid * 0.82, len * 0.78, 0, len);
            s.bezierCurveTo(-wid * 0.82, len * 0.78, -wid, len * 0.28, 0, 0);
            var g = new THREE.ExtrudeGeometry(s, { depth: 0.09, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.045, bevelSegments: 3, curveSegments: 24 });
            g.translate(0, 0, -0.045);
            g.computeVertexNormals();
            return g;
        }
        var petalMat = new THREE.MeshPhysicalMaterial({ color: 0xD9B878, metalness: 0.55, roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.3, emissive: 0x3A2A10, emissiveIntensity: 0.5, side: THREE.DoubleSide });
        targetColor = new THREE.Color(0xC9A96E);

        function addRing(count, len, wid, tilt, y, scale) {
            var geo = petalGeometry(len, wid);
            for (var i = 0; i < count; i++) {
                var pivot = new THREE.Group();
                var m = new THREE.Mesh(geo, petalMat);
                m.rotation.x = tilt;
                pivot.add(m);
                pivot.rotation.y = (i / count) * Math.PI * 2;
                pivot.position.y = y;
                pivot.scale.setScalar(scale || 1);
                group.add(pivot);
            }
        }
        addRing(8, 1.9, 0.62, 0.95, -0.55, 1);       // outer petals, open
        addRing(6, 1.45, 0.5, 0.5, -0.35, 0.92);     // mid petals
        addRing(5, 1.05, 0.4, 0.18, -0.12, 0.85);    // inner petals, upright

        // Bud
        var bud = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 24), new THREE.MeshPhysicalMaterial({ color: 0xE8D5A8, metalness: 0.7, roughness: 0.25, emissive: 0x6b5322, emissiveIntensity: 0.35 }));
        bud.scale.set(1, 1.35, 1); bud.position.y = 0.28; group.add(bud);

        // Portal rings
        var ringMat = new THREE.MeshPhysicalMaterial({ color: 0xE8D5A8, metalness: 1, roughness: 0.22 });
        targetRing = new THREE.Color(0xE8D5A8);
        var ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.035, 16, 140), ringMat);
        ring1.rotation.x = Math.PI / 2.25; group.add(ring1);
        var ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.05, 0.02, 16, 140), ringMat.clone());
        ring2.rotation.x = Math.PI / 1.8; ring2.rotation.y = 0.5; group.add(ring2);

        // Pedestal disc
        var disc = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.9, 0.16, 64), new THREE.MeshPhysicalMaterial({ color: 0xC9A96E, metalness: 0.9, roughness: 0.3 }));
        disc.position.y = -0.78; group.add(disc);
        var rimDisc = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.025, 12, 100), ringMat);
        rimDisc.rotation.x = Math.PI / 2; rimDisc.position.y = -0.7; group.add(rimDisc);
        group.position.y = 0.55;

        // Gold dust particles with soft sprite
        function makeSprite() {
            var c = document.createElement('canvas'); c.width = c.height = 64;
            var x = c.getContext('2d'); var gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
            gr.addColorStop(0, 'rgba(255,240,200,1)'); gr.addColorStop(0.4, 'rgba(232,213,168,.55)'); gr.addColorStop(1, 'rgba(232,213,168,0)');
            x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
            return new THREE.CanvasTexture(c);
        }
        var pCount = 340, pos = new Float32Array(pCount * 3);
        for (var i = 0; i < pCount; i++) {
            var r = 3 + Math.random() * 5.5, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
            pos[i * 3] = r * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = (Math.random() - 0.35) * 5.2; pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
        }
        var pGeo = new THREE.BufferGeometry(); pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        var particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.14, map: makeSprite(), transparent: true, depthWrite: false, color: 0xE8D5A8, opacity: 0.85 }));
        scene.add(particles);

        // Interaction: drag to rotate, scroll to unfold (never hijacks links/buttons)
        var dragRot = 0, dragging = false, lastX = 0;
        heroEl.addEventListener('pointerdown', function (e) {
            if (e.target.closest('a,button,input,select,textarea,[role="button"]')) { return; }
            dragging = true; lastX = e.clientX;
        });
        window.addEventListener('pointerup', function () { dragging = false; });
        window.addEventListener('pointermove', function (e) {
            if (!dragging) { return; }
            dragRot += (e.clientX - lastX) * 0.005; lastX = e.clientX;
        });
        var reduced = reduceMotion;
        var baseScale = 1;

        function layout() {
            var w = window.innerWidth;
            if (w > 860) { group.position.x = 2.35; camera.position.z = 9.2; baseScale = 1; group.position.y = 0.55; }
            else { group.position.x = 0; camera.position.z = 14.5; group.position.y = 3.4; baseScale = 0.52; }
            camera.aspect = w / window.innerHeight; camera.updateProjectionMatrix();
            renderer.setSize(w, window.innerHeight);
        }
        layout();
        window.addEventListener('resize', layout);

        var startT = performance.now();
        function elapsed() { return (performance.now() - startT) / 1000; }

        function renderFrame() {
            var t = elapsed();
            var scrollMax = Math.max(1, document.body.scrollHeight - window.innerHeight);
            var prog = Math.min(1, window.scrollY / scrollMax);
            if (!dragging) { dragRot += reduced ? 0.0006 : 0.0016; }
            spinBoost *= 0.94;
            group.rotation.y = dragRot + prog * Math.PI * 2.2 + spinBoost * 0.02;
            group.rotation.x = Math.sin(t * 0.3) * 0.05 + prog * 0.35;
            var open = 1 + Math.sin(t * 0.6) * 0.02;
            group.scale.setScalar(baseScale * open * (1 - prog * 0.12));
            ring1.rotation.z = t * 0.12; ring2.rotation.z = -t * 0.08;
            particles.rotation.y = t * 0.02;
            if (targetColor) { petalMat.color.lerp(targetColor, 0.06); }
            if (targetRing) { ringMat.color.lerp(targetRing, 0.06); }
            renderer.render(scene, camera);
        }

        function tick() {
            requestAnimationFrame(tick);
            if (document.hidden) { return; }
            var op = applyOpacity();
            if (op === '0') { return; }
            try { renderFrame(); } catch (err) { /* fail silently; fallbacks cover the look */ }
        }

        if (reduced) {
            applyOpacity();
            try { renderFrame(); } catch (err) { /* one still frame failed; CSS glow covers it */ }
            return true;
        }
        tick();
        return true;
    }

    /* ═══════════════════════════════════════════════════════════════════
       2D FALLBACK — gold ring + glowing orb + drifting dust, same
       visibility rules as the 3D lotus (hero + picker only).
       ═══════════════════════════════════════════════════════════════════ */
    function startFallback2D() {
        var canvas = document.createElement('canvas');
        canvas.setAttribute('aria-hidden', 'true');
        glContainer.appendChild(canvas);
        var ctx = canvas.getContext('2d');
        if (!ctx) { return false; }
        var dots = [];
        for (var i = 0; i < 150; i++) {
            dots.push({
                a: Math.random() * Math.PI * 2,
                r: 0.75 + Math.random() * 0.45,
                s: 0.6 + Math.random() * 1.6,
                o: 0.25 + Math.random() * 0.65,
                w: 0.2 + Math.random() * 0.8
            });
        }
        function geom() {
            var w = window.innerWidth, h = window.innerHeight;
            if (w > 860) { return { cx: w * 0.72, cy: h * 0.38, rad: Math.min(w, h) * 0.24 }; }
            return { cx: w * 0.5, cy: h * 0.2, rad: Math.min(w, h) * 0.3 };
        }
        function resize() {
            var dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();
        window.addEventListener('resize', resize);
        var start = performance.now();
        var running = true;
        function frame(now) {
            if (!running) { return; }
            requestAnimationFrame(frame);
            if (document.hidden) { return; }
            var op = applyOpacity();
            var t = (now - start) / 1000;
            var g = geom();
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            if (op === '0') { return; }
            var rot = t * 0.12 + window.scrollY * 0.0009;
            // glow
            var glow = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.rad * 1.8);
            glow.addColorStop(0, 'rgba(232,213,168,0.30)');
            glow.addColorStop(0.6, 'rgba(201,169,110,0.10)');
            glow.addColorStop(1, 'rgba(201,169,110,0)');
            ctx.fillStyle = glow;
            ctx.fillRect(g.cx - g.rad * 1.8, g.cy - g.rad * 1.8, g.rad * 3.6, g.rad * 3.6);
            // ring dots
            for (var i = 0; i < dots.length; i++) {
                var d = dots[i];
                var a = d.a + rot * d.w;
                var x = g.cx + Math.cos(a) * g.rad * d.r;
                var y = g.cy + Math.sin(a) * g.rad * d.r * 0.9;
                ctx.beginPath();
                ctx.arc(x, y, d.s, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(232,213,168,' + d.o + ')';
                ctx.fill();
            }
            // orb
            var pulse = 1 + Math.sin(t * 1.4) * 0.08;
            var orb = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, 26 * pulse);
            orb.addColorStop(0, 'rgba(255,240,200,0.95)');
            orb.addColorStop(0.4, 'rgba(232,213,168,0.55)');
            orb.addColorStop(1, 'rgba(232,213,168,0)');
            ctx.fillStyle = orb;
            ctx.beginPath();
            ctx.arc(g.cx, g.cy, 26 * pulse, 0, Math.PI * 2);
            ctx.fill();
        }
        if (reduceMotion) {
            applyOpacity();
            frame(start);
            running = false;
            return true;
        }
        requestAnimationFrame(frame);
        return true;
    }

    /* ── Boot: three.js first, 2D fallback, then CSS glow alone ───────── */
    function boot() {
        wirePicker();
        loadThree().then(function (ok) {
            var started = false;
            if (ok) {
                try { started = startThree(); } catch (e) { started = false; }
            }
            if (!started) {
                try { started = startFallback2D(); } catch (e) { started = false; }
            }
            if (!started) {
                glContainer.style.display = 'none';
                if (glFallback) { glFallback.style.display = 'grid'; }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
