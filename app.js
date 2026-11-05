const grid=document.querySelector('#grid'),tabs=document.querySelector('#tabs'),search=document.querySelector('#search');
let active='All';
const all=Object.entries(MENU).flatMap(([cat,items])=>items.map(([name,price,type])=>({cat,name,price,type})));
const cats=['All',...Object.keys(MENU)];
const photoPools={
  'Pizza & Pasta':['images/pizza-1.jpg','images/pizza-10.jpg','images/pizza-13.jpg','images/pizza-16.jpg','images/pizza-20.jpg','images/pizza-21.jpg'],
  'Wraps':['images/wrap-1.jpg'],
  'Starters':['images/starter-4.jpg','images/starter-7.jpg','images/starter-10.jpg'],
  'Dessert':['images/dessert.jpg']
};
const photoCounts={};
const icons=cat=>cat.includes('Pizza')?'🍕':cat.includes('Burger')?'🍔':cat==='Wraps'?'🌯':cat==='Snacks'?'🍟':cat==='Dessert'?'🍫':'🍗';
function drawTabs(){tabs.innerHTML=cats.map(c=>`<button class="tab ${c===active?'active':''}" data-c="${c}">${c}</button>`).join('');tabs.querySelectorAll('button').forEach(b=>b.onclick=()=>{active=b.dataset.c;drawTabs();drawMenu()})}
function drawMenu(){
 let q=search.value.toLowerCase().trim();
 let list=all.filter(x=>(active==='All'||x.cat===active)&&x.name.toLowerCase().includes(q));
 Object.keys(photoCounts).forEach(k=>photoCounts[k]=0);
 grid.innerHTML=list.length?list.map(x=>{
  const pool=photoPools[x.cat]||[];
  const n=photoCounts[x.cat]||0, src=pool.length?pool[n%pool.length]:null;
  photoCounts[x.cat]=n+1;
  return `<article class="card"><div class="food ${x.type}">${src?`<img src="${src}" alt="${x.name}" loading="lazy">`:`<span>${icons(x.cat)}</span>`}<small>${x.type==='veg'?'🟢 VEG':'🔺 NON-VEG'}</small></div><div class="item"><div><small>${x.cat}</small><h3>${x.name}</h3></div><b>₹${x.price}</b></div><div class="cardfoot"><span>Order this item</span><div class="orderlinks"><a class="orderbtn" href="https://zomato.onelink.me/xqzv/i9hbfnk1" target="_blank" rel="noopener">Zomato ↗</a><a class="orderbtn swiggy" href="https://www.swiggy.com/menu/1410571?source=sharing" target="_blank" rel="noopener">Swiggy ↗</a></div></div></article>`;
 }).join(''):'<div class="empty">No matching bites found. Try another search.</div>';
}
search.addEventListener('input',drawMenu);
document.querySelector('#hamb').onclick=()=>document.querySelector('#nav').classList.toggle('open');
document.querySelector('#year').textContent=new Date().getFullYear();
drawTabs();drawMenu();