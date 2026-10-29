document.querySelector('.burger')?.addEventListener('click',()=>document.querySelector('.menu').classList.toggle('open'));
document.querySelectorAll('.tabs').forEach(t=>t.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const g=t.dataset.g;t.querySelectorAll('button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});document.querySelectorAll('.pane[data-g="'+g+'"]').forEach(p=>p.classList.toggle('on',p.dataset.p===b.dataset.p))}));
const f=document.querySelector('.filters');if(f){const run=()=>{const v={};f.querySelectorAll('[data-f]').forEach(s=>v[s.dataset.f]=s.value.toLowerCase());document.querySelectorAll('.mat').forEach(c=>{let ok=true;for(const k in v){if(!v[k])continue;if(k==='q'?!c.textContent.toLowerCase().includes(v[k]):c.dataset[k]!==v[k])ok=false}c.style.display=ok?'':'none'})};f.addEventListener('input',run)}
document.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();alert('Прототип: '+b.dataset.demo)}));
document.querySelectorAll('form').forEach(fm=>fm.addEventListener('submit',e=>{e.preventDefault();alert('Прототип: форма не отправляется')}));
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// hero demo
const X=document.querySelector('.xdemo');if(X){const rows=[...X.querySelectorAll('.xrow')],btn=X.querySelector('.xbtn'),st=X.querySelector('.xstack'),cnt=X.querySelector('.xcount b'),cur=X.querySelector('.xcursor'),body=X.querySelector('.xbody');let run=0;const N=4;
const w=ms=>new Promise(r=>setTimeout(r,ms));const mv=el=>{const b=body.getBoundingClientRect(),e=el.getBoundingClientRect();cur.style.left=(e.left-b.left+e.width*.6)+'px';cur.style.top=(e.top-b.top+e.height*.55)+'px'};
const pdf=(i,k)=>{const d=document.createElement('div');d.className='xpdf';d.style.top=(k*6)+'px';d.style.transform='rotate('+((k%2?1:-1)*k*2)+'deg)';d.textContent='АОСР №'+i;st.appendChild(d)};
const final=()=>{rows.forEach((r,i)=>r.classList.toggle('sel',i<N));st.innerHTML='';for(let k=0;k<N;k++)pdf(k+1,k);cnt.textContent=N};
async function loop(){const id=++run;while(id===run){rows.forEach(r=>r.classList.remove('sel'));st.innerHTML='';cnt.textContent=0;await w(700);
for(let i=0;i<N&&id===run;i++){mv(rows[i]);await w(450);rows[i].classList.add('sel')}if(id!==run)return;
mv(btn);await w(600);btn.classList.add('press');await w(180);btn.classList.remove('press');
for(let k=0;k<N&&id===run;k++){pdf(k+1,k);cnt.textContent=k+1;await w(380)}await w(3200)}}
X.querySelector('.xreplay').addEventListener('click',()=>RM?final():loop());
if(RM)final();else new IntersectionObserver(([e],o)=>{if(e.isIntersecting){o.disconnect();loop()}}).observe(X)}
// calculator
const cO=document.getElementById('cOut');if(cO){let cur=0,raf;const calc=()=>{const v=id=>Math.max(0,+document.getElementById(id).value||0);const t=Math.max(0,v('cA')*(v('cM')-v('cT'))/60);cancelAnimationFrame(raf);if(RM){cO.textContent=t.toFixed(1);cur=t;return}const s=cur,t0=performance.now();const f=n=>{const p=Math.min(1,(n-t0)/700),e=1-Math.pow(1-p,3);cur=s+(t-s)*e;cO.textContent=cur.toFixed(1);if(p<1)raf=requestAnimationFrame(f)};raf=requestAnimationFrame(f)};document.querySelectorAll('.calc input').forEach(i=>i.addEventListener('input',calc));
new IntersectionObserver(([e],o)=>{if(e.isIntersecting){o.disconnect();calc()}}).observe(cO)}
// reveal
if(!RM&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('main section:not(:first-child)').forEach(s=>{s.classList.add('reveal');io.observe(s)})}
// tilt
if(!RM&&matchMedia('(hover:hover)').matches)document.querySelectorAll('.price').forEach(p=>{const c=p.closest('.card');c.classList.add('tilt');c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-3px)`});c.addEventListener('mouseleave',()=>c.style.transform='')});
const TG=document.querySelector('.theme-tgl');if(TG){const sync=()=>{const b=document.documentElement.dataset.theme==='blueprint';TG.setAttribute('aria-pressed',b);TG.querySelector('.tl').textContent=b?'Светлая':'Чертёж';TG.setAttribute('aria-label',b?'Включить светлую тему':'Включить тему «Чертёж»')};sync();TG.addEventListener('click',()=>{const b=document.documentElement.dataset.theme!=='blueprint';if(b)document.documentElement.dataset.theme='blueprint';else delete document.documentElement.dataset.theme;try{localStorage.setItem('pp-theme',b?'blueprint':'')}catch(e){}sync()})}
