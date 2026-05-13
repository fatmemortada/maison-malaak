
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
