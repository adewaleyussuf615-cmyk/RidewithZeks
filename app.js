document.documentElement.classList.add('js');
const $=s=>document.querySelector(s);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const story=$('.scroll-story'),stage=$('.stage'),header=$('.header');
const windowScene=$('.window-scene'),hero=$('.hero-copy'),note=$('.hero-note'),scrollNote=$('.scroll-note');
const aircraft=$('.aircraft-scene'),wrap=$('.aircraft-wrap'),jet=$('.jet'),cabin=$('.cabin'),details=$('.aircraft-details'),title=$('.flight-title');
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const range=(p,a,b)=>clamp((p-a)/(b-a));
const smooth=x=>x*x*(3-2*x);
let active=false;
function render(){
 active=false;
 const y=scrollY, vh=innerHeight;
 const p=clamp(y/Math.max(1,story.offsetHeight-vh));
 if(!reduced.matches){
  const zoom=smooth(range(p,0,.27));
  windowScene.style.transform=`scale(${1+zoom*5.5})`;
  const leave=smooth(range(p,.015,.14));
  hero.style.opacity=1-leave;hero.style.transform=`translateX(${-leave*150}px)`;
  note.style.opacity=1-leave;scrollNote.style.opacity=1-leave;
  const reveal=smooth(range(p,.255,.36));
  aircraft.style.opacity=reveal;
  aircraft.style.pointerEvents=reveal>.9?'auto':'none';
  const settle=smooth(range(p,.34,.56));
  wrap.style.transform=`translateY(${(1-settle)*20}%) scale(${3.6-2.6*settle})`;
  title.style.opacity=range(p,.33,.39)*(1-range(p,.46,.54));
  const info=smooth(range(p,.5,.59));
  details.style.opacity=info;details.style.transform=`translateY(${(1-info)*30}px)`;details.style.pointerEvents=info>.95?'auto':'none';
  const cut=smooth(range(p,.72,.88));jet.style.opacity=1-cut;cabin.style.opacity=cut;
  $('.diagram-note').style.opacity=cut;
  $('.story-progress i').style.width=`${p*100}%`;
 }
 const light=reduced.matches?(y>vh*.85&&y<story.offsetHeight-vh*.1):(p>.33&&y<story.offsetHeight-vh*.15);
 const inJourney=y>=$('#journey').offsetTop-90&&y<$('footer').offsetTop-90;
 header.classList.toggle('light',light||inJourney);
 header.classList.toggle('scrolled',y>story.offsetHeight-vh*.2);
}
function requestRender(){if(!active){active=true;requestAnimationFrame(render)}}
addEventListener('scroll',requestRender,{passive:true});addEventListener('resize',requestRender);reduced.addEventListener('change',requestRender);render();
// Keep the experience navigation aligned with the aircraft chapter inside the pinned scene.
document.querySelector('a[href="#experience"]').addEventListener('click',e=>{e.preventDefault();scrollTo({top:reduced.matches?innerHeight:(story.offsetHeight-innerHeight)*.59,behavior:reduced.matches?'instant':'smooth'})});
const serviceData={chauffeur:{title:'Arrive composed.',description:'An airport arrival. An important meeting. An evening worth taking your time over. Leave the driving to your chauffeur and make the journey your own.',points:['Airport transfers','Business & personal journeys','Events & special occasions'],service:'Chauffeur service',cta:'Enquire about a chauffeur',index:'01 / BY ROAD'},rental:{title:'Make an entrance.',description:'Choose a luxury car for the moments that deserve a little more. Share your occasion, preferred style and dates, and we’ll help you explore the available options.',points:['Luxury occasions & celebrations','Business travel & personal use','Vehicle options confirmed on enquiry'],service:'Luxury car rental',cta:'Explore your rental options',index:'02 / BY ROAD'}};
const tabs=[...document.querySelectorAll('[data-tab]')];
function selectTab(tab){const d=serviceData[tab.dataset.tab];tabs.forEach(t=>{const on=t===tab;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1});$('#road-panel').setAttribute('aria-labelledby',tab.id);$('#road-title').textContent=d.title;$('#road-description').textContent=d.description;$('#road-points').replaceChildren(...d.points.map(t=>{const li=document.createElement('li');li.textContent=t;return li}));$('#road-enquiry').innerHTML=d.cta+' <span>+</span>';$('#road-enquiry').dataset.service=d.service;$('.service-index').textContent=d.index}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=(e.key==='Home'?tabs[0]:e.key==='End'?tabs[1]:tabs[1-i]);selectTab(next);next.focus()}})});
document.addEventListener('click',e=>{const link=e.target.closest('[data-service]');if(link)$('#service').value=link.dataset.service});
const form=$('#enquiry-form');const date=form.elements.date;const now=new Date();date.min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
function message(){const d=new FormData(form);return `Hello RidewithZeks, I’d like to enquire about a ${d.get('service').toLowerCase()}.\n\nName: ${d.get('name')}\nPreferred date: ${d.get('date')}\nGuests: ${d.get('guests')}\nJourney: ${d.get('journey')}\n\nPlease share availability and pricing. Thank you.`}
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;window.open('https://wa.me/2349126105778?text='+encodeURIComponent(message()),'_blank','noopener,noreferrer');$('#form-note').textContent='Your WhatsApp draft is ready to review. Your enquiry is sent only when you send it in WhatsApp.'});
$('#email-enquiry').addEventListener('click',()=>{if(!form.reportValidity())return;location.href='mailto:Adewaleyussuf615@gmail.com?subject='+encodeURIComponent('RidewithZeks — '+form.elements.service.value+' enquiry')+'&body='+encodeURIComponent(message());$('#form-note').textContent='Review the draft in your email app, then send it when you’re ready.'});
$('#year').textContent=new Date().getFullYear();
