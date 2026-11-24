
(function(){
  const btn=document.querySelector('.mobile-toggle');
  const menu=document.getElementById('mobileMenu');
  if(btn&&menu){
    btn.addEventListener('click',function(){
      const open=document.body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded',open?'true':'false');
      menu.setAttribute('aria-hidden',open?'false':'true');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        document.body.classList.remove('menu-open');
        btn.setAttribute('aria-expanded','false');
        menu.setAttribute('aria-hidden','true');
      });
    });
  }
  const items=document.querySelectorAll('.hero,.stats,.section,.card,.service-row,.training-card,.contact-panel,.booking-embed,.reservation-copy,.reservation-card,.review-card,.map-card,.ba-card');
  items.forEach(function(el){el.classList.add('reveal');});
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}
      });
    },{threshold:.12});
    items.forEach(function(el){io.observe(el);});
  } else {
    items.forEach(function(el){el.classList.add('is-visible');});
  }
})();

/* Ritual picker — moved here from lotus.js on 2026-11-23, when the 3D
   lotus hero was removed. The buttons update the preview text only;
   there is no lotus left to recolour. Runs on DOMContentLoaded so the
   inline MALAAK_RITUALS data (declared after this script) exists. */
document.addEventListener('DOMContentLoaded', function () {
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
    });
  });
});
