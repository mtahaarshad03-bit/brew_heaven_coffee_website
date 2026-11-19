(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],money=n=>'Rs '+Math.round(n).toLocaleString('en-PK'),ROOT=document.body.dataset.root||'',page=document.body.dataset.page;
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2400)};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* Products (replace with a catalogue API later) */
const P=[
{id:'esp',n:'House Espresso',c:['hot'],p:450,t:'cup',col:'#2a170d',d:'A short, syrupy double shot with notes of dark chocolate and toasted hazelnut.'},
{id:'amer',n:'Americano',c:['hot'],p:500,t:'cup',col:'#3b2417',d:'Espresso lengthened with hot water for a clean, full-bodied cup.'},
{id:'fw',bs:1,n:'Flat White',c:['hot'],p:650,t:'cup',col:'#b9824a',d:'Double ristretto with silky microfoam. Strong, smooth, small.'},
{id:'cap',n:'Cappuccino',c:['hot'],p:620,t:'cup',col:'#a8703d',d:'Equal parts espresso, steamed milk and airy foam, dusted with cocoa.'},
{id:'hcl',bs:1,n:'Honey Cardamom Latte',c:['signature','hot'],p:790,t:'cup',col:'#c79a55',d:'Espresso, local honey and freshly crushed cardamom with steamed milk.'},
{id:'col',bs:1,n:'Caramel Oat Latte',c:['signature','hot'],p:780,t:'cup',col:'#b57a3a',d:'House salted caramel, oat milk and a double shot. Our most ordered drink.'},
{id:'po',n:'Ethiopia Pour-over',c:['signature','hot'],p:720,t:'cup',col:'#5a3620',d:'Hand-poured single origin with jasmine and stone fruit. Brewed in four minutes.'},
{id:'cb',bs:1,n:'Twenty-hour Cold Brew',c:['cold'],p:650,t:'glass',col:'#2a170d',d:'Steeped slowly for a low-acid, chocolatey cup served over ice.'},
{id:'et',n:'Espresso Tonic',c:['cold'],p:720,t:'glass',col:'#c9a45a',d:'Bright and bittersweet: espresso over tonic with orange peel.'},
{id:'cro',n:'Butter Croissant',c:['pastry'],p:420,t:'pastry',col:'#d09a4e',d:'Laminated by hand and baked every morning.'},
{id:'pis',n:'Pistachio Slice',c:['pastry'],p:590,t:'pastry',col:'#8b9a6a',d:'Moist pistachio sponge with a light cream finish.'},
{id:'bag',n:'House Blend Beans, 250g',c:['beans'],p:2400,t:'bag',col:'#33221a',d:'Our everyday roast: balanced, nutty and sweet. Whole bean or ground.'},
{id:'bag2',n:'Ethiopia Single Origin, 250g',c:['beans'],p:3200,t:'bag',col:'#6b3f23',d:'Floral and fruity, roasted light. Great for filter brewing.'}];
const CATS={all:'All',hot:'Hot',signature:'Signature',cold:'Cold',pastry:'Pastries',beans:'Beans'};
const byId=id=>P.find(x=>x.id===id);
const CODES={BREW10:{t:'p',v:10},FIRST500:{t:'f',v:500,min:2000},BEANS15:{t:'b',v:15}};

/* Generated illustration, swap for photography */
const PHOTOS=['cafe','esp','amer','fw','cap','col','hcl','po','cb','et','cro','pis','bag','bag2','gallery-1','gallery-2','gallery-3','gallery-4','gallery-5','gallery-6','gallery-7','gallery-8','gallery-9','gallery-10','gallery-11','gallery-12'];/* local café photography in assets/images */
const art=(t,c='#5a3620')=>{const W=(b)=>`<svg class="wide" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${b}</svg>`;const S=(b)=>`<svg viewBox="0 0 200 200" aria-hidden="true">${b}</svg>`;
if(t==='cafe')return W(`<rect width="400" height="300" fill="#d9c3a1"/><rect x="36" y="36" width="140" height="160" rx="4" fill="#f9d98f" fill-opacity=".45" stroke="#33221a" stroke-width="7"/><path d="M106 36v160M36 116h140" stroke="#33221a" stroke-width="4"/><path d="M250 0v62M322 0v44" stroke="#33221a" stroke-width="2"/><path d="M224 62a26 26 0 0 1 52 0zM298 44a24 24 0 0 1 48 0z" fill="#b48a3c"/><circle cx="250" cy="68" r="9" fill="#ffe9a8"/><circle cx="322" cy="50" r="8" fill="#ffe9a8"/><rect y="222" width="400" height="78" fill="#33221a"/><rect y="208" width="400" height="16" fill="#5a3620"/><rect x="214" y="150" width="150" height="58" rx="4" fill="#7a4a26"/><path d="M236 186h32v8a16 14 0 0 1-32 0zM288 186h32v8a16 14 0 0 1-32 0z" fill="#fbf5ea"/><ellipse cx="252" cy="186" rx="16" ry="3" fill="#6b3f23"/><ellipse cx="304" cy="186" rx="16" ry="3" fill="#6b3f23"/><path d="M52 208c0-26 18-40 26-52 8 12 26 26 26 52z" fill="#4a5a47"/><rect x="62" y="200" width="32" height="26" rx="3" fill="#b48a3c"/>`);
if(t==='beans')return W(`<rect width="400" height="300" fill="#33221a"/>`+Array.from({length:70},(_,i)=>{const x=(i*83)%420-10,y=(i*47)%320-10,r=(i*53)%180;return`<g transform="rotate(${r} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="24" ry="15" fill="${i%3?'#5a3620':'#6b3f23'}" stroke="#1d130d" stroke-width="2"/><path d="M${x-18} ${y}q18-8 36 0" fill="none" stroke="#1d130d" stroke-width="3"/></g>`}).join(''));
if(t==='latte')return S(`<circle cx="100" cy="100" r="95" fill="#fbf5ea"/><circle cx="100" cy="100" r="84" fill="#e8dcc7"/><circle cx="100" cy="100" r="75" fill="${c}"/><g transform="scale(.5)"><path d="M200 300c-60-10-80-60-60-90 20-25 40-20 60 0 20-20 40-25 60 0 20 30 0 80-60 90z" fill="#f4ecdf"/><path d="M200 255c-45-8-58-42-42-62 15-17 30-12 42 3 12-15 27-20 42-3 16 20 3 54-42 62z" fill="${c}"/><path d="M200 218c-30-5-38-27-27-40 10-11 20-8 27 3 7-11 17-14 27-3 11 13 3 35-27 40z" fill="#f4ecdf"/><path d="M200 120c-8 25-6 70 0 95 6-25 8-70 0-95z" fill="#7a4a26"/></g>`);
if(t==='glass')return S(`<path d="M62 50h76l-9 118a8 8 0 0 1-8 7H79a8 8 0 0 1-8-7z" fill="#fff" fill-opacity=".4" stroke="#b9ab94" stroke-width="3"/><path d="M66 92h68l-6 76H72z" fill="${c}"/><path d="M68 92h64" stroke="#f4ecdf" stroke-width="9" opacity=".7"/><rect x="104" y="22" width="6" height="92" rx="3" fill="#b48a3c" transform="rotate(12 107 68)"/>`);
if(t==='pastry')return S(`<ellipse cx="100" cy="150" rx="75" ry="10" fill="#0002"/><path d="M28 135c0-48 42-78 72-78s72 30 72 78c-20 14-46 4-72 4s-52 10-72-4z" fill="${c}"/><path d="M62 98l14 24M96 84l8 38M132 98l-10 24" stroke="#0003" stroke-width="5" stroke-linecap="round"/>`);
if(t==='bag')return S(`<path d="M55 40h90l8 135H47z" fill="${c}"/><path d="M55 40h90l-4 22H59z" fill="#0003"/><rect x="68" y="92" width="64" height="50" rx="4" fill="#f4ecdf"/><circle cx="100" cy="117" r="11" fill="none" stroke="#b48a3c" stroke-width="3"/>`);
return S(`<ellipse cx="100" cy="162" rx="72" ry="12" fill="#fff8"/><path d="M48 82h104v18a52 46 0 0 1-104 0z" fill="#fbf5ea"/><ellipse cx="100" cy="82" rx="52" ry="10" fill="${c}"/><path d="M152 92h10a15 15 0 0 1 0 30h-16" fill="none" stroke="#fbf5ea" stroke-width="9" stroke-linecap="round"/><path d="M86 60c-8-10 8-16 0-28M112 60c-8-10 8-16 0-28" fill="none" stroke="#7c5c1c" stroke-width="3" stroke-linecap="round" opacity=".5"/>`)};
const paint=r=>$$('[data-art]',r).forEach(e=>{if(e.firstChild)return;e.innerHTML=art(e.dataset.art,e.dataset.c);if(PHOTOS.includes(e.dataset.img)){const i=new Image();i.alt='';i.onload=()=>{e.innerHTML='';e.appendChild(i)};i.src=ROOT+'assets/images/'+e.dataset.img+'.jpg'}});

/* Cart */
const cart=()=>ls.get('bh_cart',[]);
const save=c=>{ls.set('bh_cart',c);badge();window.dispatchEvent(new Event('cartchange'))};
const badge=()=>{const n=cart().reduce((a,i)=>a+i.q,0);$('#cc').textContent=n};
const add=id=>{const c=cart(),i=c.find(x=>x.id===id);i?i.q++:c.push({id,q:1});save(c);toast(byId(id).n+' added to cart');const cb=$('#cc');cb.classList.remove('bump');void cb.offsetWidth;cb.classList.add('bump')};
const setQ=(id,q)=>{let c=cart();q<=0?c=c.filter(i=>i.id!==id):c.find(i=>i.id===id).q=q;save(c)};
const totals=(mode='delivery')=>{const c=cart(),sub=c.reduce((a,i)=>a+byId(i.id).p*i.q,0),code=ls.get('bh_promo',''),d=CODES[code];let disc=0;
if(d){if(d.t==='p')disc=sub*d.v/100;else if(d.t==='f'&&sub>=d.min)disc=d.v;else if(d.t==='b')disc=c.filter(i=>byId(i.id).c.includes('beans')).reduce((a,i)=>a+byId(i.id).p*i.q,0)*d.v/100}
const net=sub-disc,fee=mode==='pickup'||net>=3000||!c.length?0:250,tax=net*.05;return{sub,disc,fee,tax,total:net+fee+tax,code:d&&disc>0?code:'',bad:code&&!(d&&disc>0)}};
const applyCode=raw=>{const k=raw.trim().toUpperCase();if(!CODES[k]){toast('That code is not valid');return false}ls.set('bh_promo',k);toast(k+' saved');window.dispatchEvent(new Event('cartchange'));return true};

/* Product card + details */
const card=p=>`<article class="prod card"><div class="art" data-art="${p.t}" data-c="${p.col}" data-img="${p.id}"></div>${p.bs?'<span class="badge">Bestseller</span>':''}<h3>${p.n}</h3><p>${p.d}</p><div class="row2"><b>${money(p.p)}</b><div class="acts"><button class="btn sm ghost-d" data-info="${p.id}">Details</button><button class="btn sm" data-add="${p.id}">Add</button></div></div></article>`;
const dlg=$('#dlg');
const open=h=>{dlg.innerHTML=h+'<div class="cta"><button class="btn sm ghost-d" data-close>Close</button></div>';dlg.showModal?dlg.showModal():dlg.setAttribute('open','')};
document.addEventListener('click',e=>{const b=e.target.closest('button,a');if(!b)return;
if(b.dataset.add)add(b.dataset.add);
if(b.dataset.info){const p=byId(b.dataset.info);open(`<div class="art" data-art="${p.t}" data-c="${p.col}" style="--bg:#e8dcc7"></div><h2>${p.n}</h2><p>${p.d}</p><p><b>${money(p.p)}</b></p><button class="btn gold" data-add="${p.id}" data-close>Add to cart</button> `);paint(dlg)}
if('close' in b.dataset)dlg.close&&dlg.close();
if(b.dataset.copy){navigator.clipboard&&navigator.clipboard.writeText(b.dataset.copy).then(()=>toast('Code copied'),()=>toast('Copy failed: select the code manually'))}
if(b.dataset.apply&&applyCode(b.dataset.apply))setTimeout(()=>location.href='cart.html',500);
if(b.dataset.role){$('#role').value=b.dataset.role;$('#apply').scrollIntoView({behavior:'smooth'})}
if(b.dataset.q){const c=cart(),i=c.find(x=>x.id===b.dataset.id);setQ(b.dataset.id,i.q+ +b.dataset.q)}
if(b.dataset.rm){setQ(b.dataset.rm,0);toast('Item removed')}
if(b.dataset.cancel){ls.set('bh_res',ls.get('bh_res',[]).filter(r=>r.ref!==b.dataset.cancel));renderRes();toast('Reservation cancelled')}
if(b.id==='logout'){ls.set('bh_session',null);location.reload()}});
dlg&&dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});

/* Nav */
const bg=$('.burger'),nv=$('#nav');bg.addEventListener('click',()=>{const o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Close menu':'Open menu')});
const sess=ls.get('bh_session',null);if(sess){const a=$('#acct');a.textContent='Hi, '+sess.name.split(' ')[0];a.href=ROOT+'pages/login.html'}
badge();paint();

/* Validation */
const rule=el=>{const v=el.value.trim();if(el.type==='radio')return'';if(el.required&&(el.type==='checkbox'?!el.checked:!v))return el.type==='checkbox'?'Please tick this box.':'This field is required.';if(!v)return'';
if(el.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))return'Enter a valid email address.';if(el.type==='tel'&&!/^\+?[\d\s()-]{7,}$/.test(v))return'Enter a valid phone number.';
if(el.minLength>0&&v.length<el.minLength)return`Use at least ${el.minLength} characters.`;if(el.dataset.match&&v!==$(el.dataset.match).value)return'Passwords do not match.';
if(el.type==='number'&&(+v<+el.min||+v>+el.max))return`Enter ${el.min} to ${el.max}.`;
if(el.type==='file'&&el.files[0]){const f=el.files[0];if(!/\.(pdf|docx?)$/i.test(f.name))return'Upload a PDF or Word file.';if(f.size>5242880)return'File must be 5 MB or smaller.'}return''};
const validate=f=>{let ok=true,first;$$('input,select,textarea',f).forEach(el=>{if(el.closest('[hidden]'))return;const m=rule(el);let e=el.parentElement.querySelector(':scope>.err');if(!e){e=document.createElement('small');e.className='err';el.parentElement.appendChild(e)}e.textContent=m;el.setAttribute('aria-invalid',!!m);if(m){ok=false;first=first||el}});first&&first.focus();return ok};
const done=(f,h)=>{f.innerHTML=h};
const data=f=>Object.fromEntries([...new FormData(f)].map(([k,v])=>[k,v instanceof File?v.name:v]));
const H={
news:f=>{ls.set('bh_news',[...ls.get('bh_news',[]),data(f).email]);done(f,'<p class="ok">Thank you, you are on the list (demo: saved in this browser).</p>')},
contact:f=>{ls.set('bh_msgs',[...ls.get('bh_msgs',[]),data(f)]);done(f,'<h2>Message received</h2><p>Thank you. In this demo your message is saved in your browser; a live site needs a backend or email service.</p>')},
register:f=>{const d=data(f);ls.set('bh_user',{name:d.name,email:d.email.toLowerCase(),pw:d.pw});ls.set('bh_session',{name:d.name});toast('Account created');setTimeout(()=>location.href=ROOT+'menu.html',700)},
login:f=>{const d=data(f),u=ls.get('bh_user',null);if(!u||u.email!==d.email.toLowerCase()||u.pw!==d.pw){const e=$('#pw').parentElement.querySelector('.err');e.textContent=u?'Email or password is incorrect.':'No demo account found in this browser. Create one first.';return}ls.set('bh_session',{name:u.name});toast('Signed in');setTimeout(()=>location.href=ROOT+'menu.html',600)},
checkout:f=>{const d=data(f),t=totals(d.mode),id='BH-'+(1100+Math.floor(Math.random()*8900));ls.set('bh_orders',[...ls.get('bh_orders',[]),{id,t:Date.now(),mode:d.mode,total:t.total,items:cart()}]);ls.set('bh_promo','');save([]);location.href='order-tracking.html?id='+id},
reserve:f=>{const d=data(f);d.ref='RS-'+Math.floor(1000+Math.random()*9000);ls.set('bh_res',[...ls.get('bh_res',[]),d]);f.reset();renderRes();toast('Table requested: '+d.ref)},
track:f=>track(data(f).oid),
career:f=>{ls.set('bh_apps',[...ls.get('bh_apps',[]),data(f)]);done(f,'<h2>Application received</h2><p>Thank you. This demo saves your application in your browser only.</p>')}};
$$('form[data-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();if(validate(f))H[f.dataset.form](f)}));
$$('form[data-form] input,form[data-form] select,form[data-form] textarea').forEach(el=>el.addEventListener('blur',()=>{if(el.value||el.dataset.touched)el.dataset.touched=1}));

/* Home / Menu */
const ft=$('#featured');if(ft){ft.innerHTML=['col','hcl','fw','cb'].map(i=>card(byId(i))).join('');paint(ft)}
const mg=$('#menuGrid');if(mg){let cat=(location.hash||'#all').slice(1);if(!CATS[cat])cat='all';const ch=$('#chips');
const draw=()=>{const q=$('#q').value.toLowerCase(),l=P.filter(p=>(cat==='all'||p.c.includes(cat))&&(p.n+p.d).toLowerCase().includes(q));mg.innerHTML=l.map(card).join('');paint(mg);$('#noRes').hidden=l.length>0;$$('button',ch).forEach(b=>b.setAttribute('aria-pressed',b.dataset.cat===cat))};
ch.innerHTML=Object.entries(CATS).map(([k,v])=>`<button data-cat="${k}">${v}</button>`).join('');ch.addEventListener('click',e=>{if(e.target.dataset.cat){cat=e.target.dataset.cat;try{history.replaceState(null,'','#'+cat)}catch{}draw()}});$('#q').addEventListener('input',draw);draw()}

/* Cart + checkout summary */
const sumBox=$('#sum');
const lines=(t)=>`<div class="ln"><span>Subtotal</span><span>${money(t.sub)}</span></div>${t.disc?`<div class="ln ok"><span>Code ${t.code}</span><span>-${money(t.disc)}</span></div>`:''}<div class="ln"><span>Delivery</span><span>${t.fee?money(t.fee):'Free'}</span></div><div class="ln"><span>Sample tax (5%)</span><span>${money(t.tax)}</span></div><div class="ln tot"><span>Total</span><span>${money(t.total)}</span></div>`;
const renderCart=()=>{const c=cart(),box=$('#cartItems');
if(!c.length){box.innerHTML='<div class="empty"><h2>Your cart is empty</h2><p>Add a drink or a bag of beans to get started.</p><a class="btn" href="../menu.html">Browse the menu</a></div>';sumBox.hidden=true;return}
sumBox.hidden=false;box.innerHTML=c.map(i=>{const p=byId(i.id);return`<div class="item"><div class="art" data-art="${p.t}" data-c="${p.col}"></div><div><h3>${p.n}</h3><span>${money(p.p)} each</span><br><button class="link" data-rm="${p.id}">Remove</button></div><div><div class="qty"><button data-q="-1" data-id="${p.id}" aria-label="Decrease ${p.n}">-</button><span>${i.q}</span><button data-q="1" data-id="${p.id}" aria-label="Increase ${p.n}">+</button></div><div><b>${money(p.p*i.q)}</b></div></div></div>`}).join('');paint(box);
const t=totals();sumBox.innerHTML=`<h2>Order summary</h2>${lines(t)}<form class="promo" id="pf"><input id="pc" placeholder="Offer code" aria-label="Offer code" value="${esc(ls.get('bh_promo',''))}"><button class="btn sm">Apply</button></form>${t.bad?'<small class="err">This code does not apply to your cart.</small>':''}<a class="btn gold" href="checkout.html">Go to checkout</a>`;
$('#pf').addEventListener('submit',e=>{e.preventDefault();$('#pc').value?applyCode($('#pc').value):(ls.set('bh_promo',''),renderCart())})};
if(page==='cart'){renderCart();window.addEventListener('cartchange',renderCart)}
if(page==='checkout'){const form=$('#coForm'),mode=()=>$('input[name=mode]:checked').value;
const draw=()=>{const c=cart();if(!c.length){form.hidden=true;sumBox.hidden=true;$('#coEmpty').hidden=false;return}const t=totals(mode());
sumBox.innerHTML='<h2>Your order</h2>'+c.map(i=>`<div class="ln"><span>${i.q} x ${byId(i.id).n}</span><span>${money(byId(i.id).p*i.q)}</span></div>`).join('')+'<hr>'+lines(t)+'<a class="link" href="cart.html">Edit cart</a>';
$('#addr').hidden=mode()==='pickup';$('#pick').hidden=mode()!=='pickup'};
form.addEventListener('change',draw);draw();if(sess)$('[name=name]',form).value=sess.name;const u=ls.get('bh_user',null);if(u&&sess)$('[name=email]',form).value=u.email}

/* Reservations */
const renderRes=()=>{const b=$('#resList');if(!b)return;const l=ls.get('bh_res',[]);b.innerHTML=l.length?l.map(r=>`<div class="card" style="margin-bottom:12px"><b>${esc(r.loc)}</b> (${r.ref})<br>${esc(r.date)} at ${esc(r.time)}, ${esc(r.guests)} guest(s)<br><button class="link" data-cancel="${r.ref}">Cancel</button></div>`).join(''):'<div class="empty">No reservations yet. Fill in the form to request a table.</div>'};
if(page==='reservations'){const d=$('#date');d.min=new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);$('#time').innerHTML+=Array.from({length:19},(_,i)=>{const m=8*60+i*30,h=Math.floor(m/60),mm=m%60;const s=(h>12?h-12:h)+':'+(mm?'30':'00')+(h>=12?' PM':' AM');return`<option>${s}</option>`}).join('');
const q=new URLSearchParams(location.search).get('loc');if(q)$('#loc').value=q;
d.addEventListener('change',()=>{const e=d.parentElement.querySelector('.err');if(e&&d.value<d.min){e.textContent='Choose today or a future date.';d.value=''}});renderRes()}

/* Tracking */
const STEPS=['Order received','Being prepared','Ready for pickup or on the way','Completed'];
function track(id){id=id.trim().toUpperCase();const box=$('#trk'),o=id==='BH-1042'?{id,t:Date.now(),sample:1}:ls.get('bh_orders',[]).find(x=>x.id===id);
clearInterval(track.i);if(!o){box.innerHTML=`<div class="empty">No order found for <b>${esc(id)}</b>. Check the number or try BH-1042.</div>`;return}
const draw=()=>{const s=Math.min(3,Math.floor((Date.now()-o.t)/15000));box.innerHTML=`<div class="card trk"><h2>Order ${o.id}</h2><p class="note">Demo timeline: each step advances every 15 seconds. A live site needs real order status from a backend.</p><ol class="tl">${STEPS.map((x,i)=>`<li class="${i<=s?'done':''}">${x}</li>`).join('')}</ol></div>`;if(s===3)clearInterval(track.i)};draw();track.i=setInterval(draw,3000)}
if(page==='order-tracking'){const id=new URLSearchParams(location.search).get('id');if(id){$('#oid').value=id;track(id)}}

/* Gallery */
const gal=$('#gal');if(gal){const G=[['cup','#3b2417','#e8dcc7','Morning pour'],['pastry','#d09a4e','#d9c3a1','Fresh croissants'],['glass','#2a170d','#cfd6c8','Cold brew'],['bag','#33221a','#e8dcc7','House blend'],['cup','#c79a55','#d9c3a1','Honey cardamom latte'],['cup','#5a3620','#cfd6c8','Pour-over'],['pastry','#8b9a6a','#e8dcc7','Pistachio slice'],['glass','#c9a45a','#d9c3a1','Espresso tonic'],['bag','#6b3f23','#cfd6c8','Single origin'],['cafe','','#d9c3a1','Our café'],['beans','','#33221a','Fresh roasted beans'],['latte','#b9824a','#e8dcc7','Latte art']];let k=0;
gal.innerHTML=G.map((g,i)=>`<button data-g="${i}" aria-label="Open ${g[3]}"><div class="art" data-art="${g[0]}" data-c="${g[1]}" data-img="gallery-${i+1}" style="--bg:${g[2]}"></div></button>`).join('');paint(gal);
const show=i=>{k=(i+G.length)%G.length;const g=G[k];open(`<div class="art" data-art="${g[0]}" data-c="${g[1]}" data-img="gallery-${k+1}" style="--bg:${g[2]}"></div><h3>${g[3]}</h3><div class="cta"><button class="btn sm" data-gn="-1">Previous</button><button class="btn sm" data-gn="1">Next</button></div>`);paint(dlg)};
gal.addEventListener('click',e=>{const b=e.target.closest('[data-g]');b&&show(+b.dataset.g)});dlg.addEventListener('click',e=>{const b=e.target.closest('[data-gn]');b&&show(k+ +b.dataset.gn)})}

/* FAQ search */
const fq=$('#fq');if(fq)fq.addEventListener('input',()=>{let n=0;$$('.faq').forEach(d=>{const m=d.textContent.toLowerCase().includes(fq.value.toLowerCase());d.hidden=!m;n+=m});$('#noRes').hidden=n>0});

/* Reveal on scroll */
if(!matchMedia('(prefers-reduced-motion:reduce)').matches&&'IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});$$('.sec .shead,.steps li,.offer,.q,.grid3>*,.grid4>*,.split>*,.gal button').forEach((e,i)=>{e.classList.add('rv');e.style.transitionDelay=(i%4)*90+'ms';io.observe(e)})}
/* Polish */
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const prog=document.createElement('div');prog.id='prog';document.body.appendChild(prog);
const onS=()=>{const h=document.documentElement,m=h.scrollHeight-h.clientHeight;prog.style.transform=`scaleX(${m>0?h.scrollTop/m:0})`;$('.hd').classList.toggle('sm',h.scrollTop>40)};addEventListener('scroll',onS,{passive:true});onS();
const h1=$('.hcopy h1');if(h1)h1.innerHTML=h1.innerHTML.split(/(<br>)/).map(x=>x==='<br>'?x:x.trim().split(/\s+/).map((w,i)=>`<span class="w" style="--i:${i}">${w}</span>`).join(' ')).join('');
const hero=$('.hero');if(hero&&!RM)hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)/r.width-.5);hero.style.setProperty('--my',(e.clientY-r.top)/r.height-.5)});
if(!RM&&matchMedia('(hover:hover)').matches){document.addEventListener('mousemove',e=>{const c=e.target.closest&&e.target.closest('.prod,.coll');if(!c)return;const a=$('.art',c),r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;a.style.transform=`perspective(700px) rotateY(${x*9}deg) rotateX(${-y*9}deg) scale(1.03)`});document.addEventListener('mouseout',e=>{const c=e.target.closest&&e.target.closest('.prod,.coll');if(c&&!c.contains(e.relatedTarget))$('.art',c).style.transform=''})}
const sp=$('#spTabs');if(sp){const S=P.filter(p=>p.c.includes('signature'));let cur=S[0];const draw=()=>{sp.innerHTML=S.map(p=>`<button data-sp="${p.id}" aria-pressed="${p.id===cur.id}">${p.n}</button>`).join('');const a=$('#spArt');a.innerHTML='';a.dataset.art='latte';a.dataset.c=cur.col;a.dataset.img=cur.id;a.classList.remove('swap');void a.offsetWidth;a.classList.add('swap');paint(a.parentNode);$('#spName').textContent=cur.n;$('#spDesc').textContent=cur.d;$('#spPrice').textContent=money(cur.p);$('#spAdd').dataset.add=cur.id};sp.addEventListener('click',e=>{const b=e.target.closest('[data-sp]');if(b){cur=byId(b.dataset.sp);draw()}});draw()}
$$('[data-hours]').forEach(e=>{const[a,b]=e.dataset.hours.split('-').map(Number),n=new Date(),h=n.getHours()+n.getMinutes()/60,o=h>=a&&h<b;e.textContent=o?'Open now':'Closed now';e.className='status '+(o?'on':'off')});
})();