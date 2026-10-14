/* ROOH ALI WEB STUDIO - interactions (menu, typing text, finder, tabs, certificate viewer, copy buttons) */

(function(){
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var yr=$('#yr');if(yr)yr.textContent=new Date().getFullYear();

  var burger=$('#burger'),links=$('#links');
  function closeMenu(){links.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Open menu')}
  burger.addEventListener('click',function(){var o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu')});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu()});

  var totop=$('#totop');
  window.addEventListener('scroll',function(){totop.classList.toggle('show',window.scrollY>600)},{passive:true});
  totop.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduce?'auto':'smooth'})});

  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
    $$('.rv').forEach(function(el){io.observe(el)});
  } else {$$('.rv').forEach(function(el){el.classList.add('in')})}

  /* hero */
  var t=$('#typed');
  if(t){
    var roles=['Web Developer','Portfolio Builder','Front-End Developer','HTML · CSS · JavaScript'],ri=0,ci=0,del=false;
    (function type(){
      var w=roles[ri];
      if(reduce){t.textContent=roles[0];return}
      t.textContent=w.slice(0,ci);
      if(!del&&ci<w.length){ci++;setTimeout(type,70)}
      else if(!del){del=true;setTimeout(type,1400)}
      else if(ci>0){ci--;setTimeout(type,35)}
      else{del=false;ri=(ri+1)%roles.length;setTimeout(type,300)}
    })();
    t.textContent=roles[0];
    var lines=[
      '<span class="k">const</span> studio = {',
      '  owner: <span class="s">"Rooh Ali"</span>,',
      '  city: <span class="s">"Karachi"</span>,',
      '  stack: [<span class="s">"HTML"</span>, <span class="s">"CSS"</span>, <span class="s">"JavaScript"</span>],',
      '  responsive: <span class="k">true</span>,',
      '  open: <span class="k">true</span>',
      '};'];
    var out=$('#codeout');
    if(reduce){out.innerHTML=lines.join('\n')}else{
      var li=0;out.innerHTML='';
      (function next(){if(li>=lines.length)return;out.innerHTML=lines.slice(0,li+1).join('\n');li++;setTimeout(next,320)})();
    }
    var fr=$('#frame'),por=$('#portrait');
    if(!reduce&&matchMedia('(hover:hover)').matches){
      por.addEventListener('pointermove',function(e){var r=por.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;fr.style.transform='perspective(900px) rotateY('+(x*10)+'deg) rotateX('+(-y*8)+'deg)'});
      por.addEventListener('pointerleave',function(){fr.style.transform=''});
    }
  }

  /* package finder */
  var fn=$('#fnote');
  if(fn){
    var map={
      student:{id:'plan-starter',msg:'<b>Starter Portfolio</b> is made for you: a clean one-page site with your about, skills, projects and contact.'},
      freelancer:{id:'plan-pro',msg:'<b>Professional Portfolio</b> fits freelancers: a project gallery, social links and up to five sections or pages.'},
      seeker:{id:'plan-pro',msg:'<b>Professional Portfolio</b> works well for job seekers: custom styling, social links and basic SEO so employers can find you.'},
      pro:{id:'plan-premium',msg:'<b>Premium Portfolio</b> suits established professionals: case-study sections, animations and refined interactions.'}};
    var fchips=$$('.finder .chip');
    fchips.forEach(function(b){b.addEventListener('click',function(){
      var m=map[b.dataset.who];
      fchips.forEach(function(c){c.setAttribute('aria-pressed',c===b)});
      $$('.plan').forEach(function(p){p.classList.remove('pick')});
      $('#'+m.id).classList.add('pick');fn.innerHTML=m.msg;
    })});
  }

  /* what I build tabs */
  var tp=$('#tp-title');
  if(tp){
    var tabs={
      student:{t:'A portfolio that shows your potential',x:'You may not have years of work yet, and that is fine. A clear one-page site presents your education, skills and first projects so teachers, internship teams and scholarship panels see your effort.',l:['About you','Skills','Projects','Education','Certificates','Contact']},
      freelancer:{t:'A storefront for your services',x:'Clients decide fast. Your site lists what you offer, shows your best work and makes it easy to start a conversation.',l:['Services','Project gallery','Social links','Testimonials area','Contact options','Basic SEO']},
      seeker:{t:'A living CV employers can open',x:'Go beyond a PDF. A personal site gathers your experience, skills and links in one tidy place you can put on every application.',l:['Experience','Skills','Projects','Resume section','Social links','Contact']},
      pro:{t:'A site with a point of view',x:'For people with a track record. Case studies, refined interactions and a distinctive look that matches how seriously you take your work.',l:['Case studies','Animations','Expanded projects','Social integration','Basic SEO','Contact']}};
    var tb=$$('[data-tab]');
    var showTab=function(k){
      var d=tabs[k];tp.textContent=d.t;$('#tp-text').textContent=d.x;
      $('#tp-list').innerHTML=d.l.map(function(i){return '<li>'+i+'</li>'}).join('');
      tb.forEach(function(b){var on=b.dataset.tab===k;b.setAttribute('aria-selected',on);b.setAttribute('aria-pressed',on)});
    };
    tb.forEach(function(b){b.addEventListener('click',function(){showTab(b.dataset.tab)})});
    showTab('student');
  }

  /* certificate lightbox */
  var lb=$('#lb');
  if(lb){
    $$('.cert').forEach(function(c){c.addEventListener('click',function(){
      $('#lb-img').src=c.dataset.img;$('#lb-img').alt=c.dataset.title+' certificate';
      $('#lb-t').innerHTML=c.dataset.title;$('#lb-d').innerHTML=c.dataset.desc;
      if(lb.showModal)lb.showModal();else lb.setAttribute('open','');
    })});
    $('#lb-x').addEventListener('click',function(){lb.close?lb.close():lb.removeAttribute('open')});
    lb.addEventListener('click',function(e){if(e.target===lb)lb.close()});
  }

  /* copy buttons */
  $$('.cp').forEach(function(b){b.addEventListener('click',function(){
    var txt=b.dataset.copy,strong=b.closest('.ccard').querySelector('strong'),old=b.textContent;
    function reset(){setTimeout(function(){b.textContent=old},1600)}
    function fail(){var r=document.createRange();r.selectNodeContents(strong);var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected';reset()}
    try{navigator.clipboard.writeText(txt).then(function(){b.textContent='Copied';reset()},fail)}catch(e){fail()}
  })});
})();
