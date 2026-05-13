
:root{
  --cream:#FAF7F2; --warm:#F3ECE3; --ivory:#FFFCF7; --gold:#C9A96E; --gold2:#A07840;
  --char:#2C2418; --taupe:#8B7355; --rose:#D8A7A0; --sage:#A8AFA0;
  --shadow:0 24px 80px rgba(44,36,24,.12); --soft:0 14px 44px rgba(44,36,24,.08);
  --space:clamp(70px,9vw,120px); --serif:'Cormorant Garamond',serif; --body:'Jost',sans-serif; --logo:'Cinzel',serif;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--body);background:var(--cream);color:var(--char);font-weight:300;line-height:1.8;overflow-x:hidden}
body.menu-open{overflow:hidden}
a{color:inherit}
img{max-width:100%;display:block}
.skip-link{position:absolute;left:-999px;top:10px;background:var(--char);color:var(--cream);padding:10px 14px;z-index:999;text-decoration:none}
.skip-link:focus{left:10px}
.page{padding-top:86px}
.topbar{position:fixed;z-index:90;top:0;left:0;right:0;background:rgba(250,247,242,.94);backdrop-filter:blur(18px);border-bottom:1px solid rgba(201,169,110,.18)}
.nav{max-width:1280px;margin:auto;padding:14px 28px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.brand{text-decoration:none;display:flex;flex-direction:column;align-items:center;text-align:center;min-width:154px}
.brand svg{width:52px;height:20px;margin-bottom:2px}
.brand-name{font-family:var(--logo);letter-spacing:.28em;font-size:13px;text-transform:uppercase;white-space:nowrap}
.brand-sub{color:var(--taupe);font-size:8px;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap}
.menu{display:flex;align-items:center;gap:22px;list-style:none}
.menu a{font-size:10px;letter-spacing:.2em;text-transform:uppercase;text-decoration:none;color:var(--taupe);font-weight:400;position:relative}
.menu a:after{content:'';position:absolute;left:0;right:0;bottom:-7px;height:1px;background:var(--gold);transform:scaleX(0);transform-origin:left;transition:.28s}
.menu a:hover{color:var(--gold2)}
.menu a:hover:after{transform:scaleX(1)}
.nav-actions{display:flex;align-items:center;gap:12px}
.book,.lang{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;text-transform:uppercase;font-size:9px;letter-spacing:.22em;white-space:nowrap}
.book{background:var(--gold);color:var(--cream)!important;padding:11px 22px;font-weight:500;box-shadow:0 10px 30px rgba(201,169,110,.18);transition:.28s}
.book:hover{background:var(--gold2);transform:translateY(-1px)}
.lang{border:1px solid rgba(201,169,110,.45);padding:7px 14px;color:var(--taupe)}
.mobile-toggle{display:none;align-items:center;justify-content:center;width:42px;height:42px;border:1px solid rgba(201,169,110,.38);background:var(--ivory);cursor:pointer;position:relative;z-index:110}
.mobile-toggle span,.mobile-toggle span:before,.mobile-toggle span:after{display:block;width:18px;height:1px;background:var(--char);transition:.28s}
.mobile-toggle span:before,.mobile-toggle span:after{content:'';position:absolute}
.mobile-toggle span:before{transform:translateY(-6px)}
.mobile-toggle span:after{transform:translateY(6px)}
body.menu-open .mobile-toggle span{background:transparent}
body.menu-open .mobile-toggle span:before{transform:rotate(45deg)}
body.menu-open .mobile-toggle span:after{transform:rotate(-45deg)}
.mobile-menu{position:fixed;inset:0;background:rgba(250,247,242,.98);z-index:100;display:flex;align-items:center;justify-content:center;text-align:center;padding:100px 28px 40px;opacity:0;pointer-events:none;transform:translateY(-12px);transition:.3s;backdrop-filter:blur(20px)}
body.menu-open .mobile-menu{opacity:1;pointer-events:auto;transform:translateY(0)}
.mobile-menu-inner{width:min(430px,100%);display:flex;flex-direction:column;align-items:center;gap:14px}
.mobile-menu-brand{font-family:var(--logo);text-transform:uppercase;letter-spacing:.28em;font-size:15px;margin-bottom:14px}
.mobile-menu a{text-decoration:none;text-transform:uppercase;letter-spacing:.22em;font-size:12px;color:var(--taupe);padding:8px 0}
.mobile-menu .mobile-book{margin-top:12px;background:var(--gold);color:var(--cream)!important;padding:14px 26px;min-width:230px;font-size:10px;box-shadow:0 12px 30px rgba(201,169,110,.22)}
.mobile-menu .mobile-lang{border:1px solid rgba(201,169,110,.35);padding:10px 18px;min-width:90px}
.mobile-menu-note{font-size:11px;color:var(--taupe);letter-spacing:.08em;margin-top:12px}
.hero{min-height:calc(100vh - 86px);display:grid;grid-template-columns:1fr 1fr;background:radial-gradient(circle at 20% 0%,rgba(216,167,160,.22),transparent 34%),var(--cream);position:relative;overflow:hidden}
.hero:before{content:'Maison Malaak';position:absolute;left:3vw;bottom:-16px;font-family:var(--logo);font-size:clamp(54px,10vw,140px);letter-spacing:.2em;color:rgba(201,169,110,.06);white-space:nowrap;pointer-events:none}
.hero-copy{display:flex;flex-direction:column;justify-content:center;padding:70px 7vw;position:relative;z-index:2}
.eyebrow{font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:var(--gold2);font-weight:500;margin-bottom:22px}
.hero h1,.title{font-family:var(--serif);font-weight:300;line-height:1.06}
.hero h1{font-size:clamp(48px,6vw,86px);margin-bottom:26px}
.hero em,.title em{color:var(--gold);font-style:italic}
.lead{font-size:15px;color:var(--taupe);max-width:590px}
.hero-actions{display:flex;gap:18px;align-items:center;margin-top:36px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;padding:15px 32px;background:var(--char);color:var(--cream);font-size:10px;letter-spacing:.24em;text-transform:uppercase;border:0;cursor:pointer;transition:.28s}
.btn.gold{background:var(--gold)}
.btn.gold:hover{background:var(--gold2);transform:translateY(-1px)}
.text-link{font-size:10px;text-transform:uppercase;letter-spacing:.22em;color:var(--taupe);text-decoration:none;border-bottom:1px solid var(--gold);padding-bottom:3px}
.hero-img{position:relative;min-height:560px;overflow:hidden}
.hero-img img{width:100%;height:100%;object-fit:cover;object-position:center top;transform:scale(1.03)}
.hero-img:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(250,247,242,.4),transparent 42%),linear-gradient(0deg,rgba(44,36,24,.18),transparent 38%)}
.stats{display:grid;grid-template-columns:repeat(4,1fr);background:var(--char);color:var(--cream);border-top:2px solid var(--gold)}
.stat{text-align:center;padding:34px 16px;border-right:1px solid rgba(201,169,110,.24)}
.stat strong{font-family:var(--serif);font-size:38px;color:var(--gold);font-weight:300;display:block}
.stat span{font-size:9px;color:var(--sage);letter-spacing:.22em;text-transform:uppercase}
.section{padding:var(--space) 28px}
.wrap{max-width:1180px;margin:auto}
.section-head{text-align:center;margin-bottom:56px}
.section-head.left{text-align:left}
.title{font-size:clamp(36px,4.3vw,60px);margin-bottom:16px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}
.about-card{position:relative}
.about-card .main{aspect-ratio:3/4;object-fit:cover;width:100%;box-shadow:var(--shadow)}
.about-card .accent{position:absolute;right:-28px;bottom:-28px;width:168px;height:168px;object-fit:cover;border:7px solid var(--cream);box-shadow:var(--shadow)}
.badges{display:flex;flex-wrap:wrap;gap:10px;margin:26px 0}
.badge{border:1px solid rgba(201,169,110,.38);padding:7px 13px;font-size:9px;text-transform:uppercase;letter-spacing:.17em;color:var(--gold2);font-weight:400}
.signature{font-family:var(--serif);font-size:29px;color:var(--gold);font-style:italic;margin-top:28px;border-top:1px solid var(--gold);padding-top:20px}
.signature small{display:block;font-family:var(--body);font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--taupe);font-style:normal;margin-top:4px}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.card{background:var(--ivory);box-shadow:0 1px 0 rgba(201,169,110,.18);border:1px solid rgba(201,169,110,.13);overflow:hidden;transition:.3s}
.card:hover{transform:translateY(-5px);box-shadow:var(--soft)}
.card img{height:245px;width:100%;object-fit:cover;transition:.6s}
.card:hover img{transform:scale(1.05)}
.card-body{padding:26px}
.card h3{font-family:var(--serif);font-size:25px;font-weight:400;line-height:1.15}
.price{font-family:var(--serif);font-size:25px;color:var(--gold2);margin-top:14px}
.small{font-size:12px;color:var(--taupe)}
.benefits{margin-top:14px;list-style:none}
.benefits li{font-size:13px;color:var(--taupe);margin-bottom:7px}
.benefits li:before{content:'✦';color:var(--gold);margin-right:8px}
.band{background:var(--char);color:var(--cream)}
.band .lead,.band .small{color:var(--sage)}
.band .title{color:var(--cream)}
.service-list{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.service-row{display:flex;justify-content:space-between;gap:15px;border-bottom:1px solid rgba(201,169,110,.22);padding:14px 0}
.service-row span:first-child{color:var(--taupe)}
.service-row strong{color:var(--gold2);font-family:var(--serif);font-size:21px;white-space:nowrap}
.training-card{background:var(--char);color:var(--cream);display:grid;grid-template-columns:1fr 1fr;box-shadow:var(--shadow)}
.training-card img{height:100%;min-height:430px;object-fit:cover;width:100%}
.training-copy{padding:58px}
.training-copy p{color:var(--sage)}
.contact-panel{background:var(--ivory);padding:48px;box-shadow:var(--shadow);border:1px solid rgba(201,169,110,.14)}
.info{margin:18px 0}
.info .label{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--gold2);font-weight:500}
.info p{color:var(--taupe)}
.booking-embed{border:1px solid rgba(201,169,110,.25);min-height:480px;background:var(--warm);display:flex;align-items:center;justify-content:center;text-align:center;padding:30px}
.gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.gallery img{width:100%;height:230px;object-fit:cover;transition:.4s}
.gallery img:hover{transform:scale(.985);filter:saturate(1.08)}
.before-after{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.ba-card{background:var(--ivory);border:1px solid rgba(201,169,110,.16);box-shadow:var(--soft);overflow:hidden}
.ba-card img{width:100%;height:340px;object-fit:cover}
.ba-card div{padding:22px}
.ba-card h3{font-family:var(--serif);font-size:28px;font-weight:400}
.review-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.review-card{background:var(--ivory);border:1px solid rgba(201,169,110,.16);box-shadow:0 1px 0 rgba(201,169,110,.14);padding:30px}
.stars{color:var(--gold2);letter-spacing:.14em;font-size:14px;margin-bottom:12px}
.review-card p{color:var(--taupe);font-size:14px;line-height:1.85}
.review-card strong{display:block;margin-top:16px;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold2)}
.map-frame{width:100%;height:380px;border:0;filter:saturate(.82) contrast(.95);box-shadow:var(--shadow)}
.map-card{background:var(--ivory);border:1px solid rgba(201,169,110,.16);padding:14px;box-shadow:var(--shadow)}
.reservation-hero{padding:calc(var(--space) + 20px) 28px var(--space);background:linear-gradient(135deg,var(--cream),var(--warm));min-height:calc(100vh - 86px);display:flex;align-items:center}
.reservation-shell{max-width:1180px;margin:auto;display:grid;grid-template-columns:1.05fr .95fr;gap:54px;align-items:center}
.reservation-copy{background:rgba(255,252,247,.76);border:1px solid rgba(201,169,110,.18);padding:54px;box-shadow:var(--shadow)}
.reservation-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:32px 0 8px}
.reservation-steps div{background:var(--ivory);border:1px solid rgba(201,169,110,.18);padding:18px 14px}
.reservation-steps strong{display:block;font-family:var(--serif);font-size:26px;color:var(--gold2);font-weight:300;line-height:1}
.reservation-steps span{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--taupe);line-height:1.5;margin-top:8px}
.reservation-card{background:var(--char);color:var(--cream);padding:46px;box-shadow:var(--shadow);position:relative;overflow:hidden}
.reservation-card:before{content:'';position:absolute;right:-80px;top:-80px;width:240px;height:240px;background:radial-gradient(circle,rgba(201,169,110,.18),transparent 68%)}
.reservation-card h2{font-family:var(--serif);font-size:38px;font-weight:300;margin-bottom:18px;color:var(--cream)}
.reservation-card .benefits li{color:var(--sage)}
.reservation-mini{border-top:1px solid rgba(201,169,110,.22);padding-top:18px;margin-top:18px}
.reservation-mini span{display:block;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);margin-bottom:4px}
.reservation-mini strong{font-weight:300;color:var(--cream)}
.floating-book{position:fixed;right:18px;bottom:18px;z-index:80;background:var(--gold);color:var(--cream);text-decoration:none;text-transform:uppercase;letter-spacing:.18em;font-size:9px;padding:13px 17px;box-shadow:0 18px 42px rgba(44,36,24,.18)}
.footer{background:var(--char);color:var(--cream);padding:52px 28px}
.footer .wrap{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:30px;align-items:start}
.footer p,.footer a{color:var(--sage);font-size:13px;text-decoration:none}
.footer h4{font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);margin-bottom:12px}
.social-links{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
.social-pill{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(201,169,110,.35);padding:9px 14px;text-decoration:none;color:var(--sage);font-size:10px;letter-spacing:.18em;text-transform:uppercase;transition:.25s}
.social-pill:hover{background:rgba(201,169,110,.12);color:var(--cream);border-color:var(--gold)}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .75s ease,transform .75s ease}
.reveal.is-visible{opacity:1;transform:translateY(0)}
@media(max-width:960px){
  .mobile-toggle{display:flex}.menu{display:none}.nav{gap:12px;padding:12px 18px}.brand{min-width:auto;text-align:left;align-items:flex-start}.brand svg{width:42px}.brand-sub{display:none}.nav-actions{margin-left:auto}.page{padding-top:74px}
  .hero,.grid2,.training-card,.reservation-shell{grid-template-columns:1fr}.hero-img{min-height:420px;order:-1}.cards{grid-template-columns:1fr 1fr}.stats{grid-template-columns:repeat(2,1fr)}.service-list{grid-template-columns:1fr}.gallery{grid-template-columns:1fr 1fr}.about-card .accent{right:10px}.review-grid,.before-after{grid-template-columns:1fr}.footer .wrap{grid-template-columns:1fr}.map-frame{height:320px}.reservation-steps{grid-template-columns:1fr}.reservation-copy{padding:38px}
}
@media(max-width:640px){
  .nav{padding:12px 14px}.brand-name{font-size:10px;letter-spacing:.22em}.nav .book{display:none}.lang{display:none}.mobile-toggle{width:40px;height:40px}.page{padding-top:70px}.mobile-menu{padding-top:90px}.hero-copy{padding:44px 24px}.section{padding:65px 22px}.cards{grid-template-columns:1fr}.gallery img{height:170px}.contact-panel{padding:28px}.training-copy{padding:34px}.hero-actions{align-items:flex-start;flex-direction:column}.reservation-hero{padding:80px 18px 58px}.reservation-copy,.reservation-card{padding:28px}.reservation-card h2{font-size:31px}.floating-book{left:18px;right:18px;text-align:center}.ba-card img{height:280px}
}
