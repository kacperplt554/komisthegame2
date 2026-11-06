// Okna i interfejs (logika gry w game.js)
const $=s=>document.querySelector(s);
const UI={cur:null,sel:null,isOpen:()=>!!UI.cur,open(n){UI.cur=n;UI.sel=null;render()},car(id){UI.cur='car';UI.sel=id;render()},close(){UI.cur=null;render()}};
function toast(r){const t=$('#toast');t.textContent=r.msg;t.className='show'+(r.ok?'':' err');clearTimeout(toast.h);toast.h=setTimeout(()=>t.className='',2800)}
function act(r){toast(r);render()}
function barHtml(v){const c=v>66?'#3ecf8e':v>33?'#f5b638':'#ff5d5d';return`<div class="bar"><i style="width:${v}%;background:${c}"></i></div>`}
function carImg(c){return getCarSprite(c).c.toDataURL()}
function carDetails(c){return`<div class="card"><div class="row" style="align-items:flex-start"><div><b>${c.brand} ${c.model} ${c.year}</b><div class="mut">${c.fuel}, ${c.hp} KM, ${c.km.toLocaleString('pl-PL')} km</div><div class="mut">Wartość rynkowa: ${pln(carValue(c))}<br>Technika ${carCond(c)}% • wygląd ${carVis(c)}%</div></div><img src="${carImg(c)}" width="100"></div><br>
 ${Object.entries(PARTS).map(([k,n])=>`<div class="row"><span>${n}</span><span>${Math.round(c.parts[k])}%</span></div>${barHtml(c.parts[k])}`).join('')}</div>`}
function saleBox(c){return c.listed?`<div class="card">Wystawiony za <b>${pln(c.ask)}</b> • atrakcyjność: <b>${G.attract(c)}%</b> (dni: ${c.daysOn})<br><br><button onclick="act(G.unlist(${c.id}))">Zdejmij z oferty</button></div>`:
 `<div class="card"><div class="row"><span>Cena sprzedaży</span><span class="mut">sugerowana: ${pln(carValue(c))}</span></div><br><div class="row"><input id="pr" type="number" value="${Math.round(carValue(c)*1.1)}" oninput="prv()"><button class="pri" onclick="act(G.list(${c.id},$('#pr').value))">Wystaw</button><button onclick="if(confirm('Sprzedać handlarzowi za 70% wartości?'))act(G.sellNow(${c.id}))">Sprzedaj od razu</button></div><div id="att" class="mut" style="margin-top:8px"></div></div>`}
function prv(){const c=S.cars.find(x=>x.id===UI.sel);if(c)$('#att').textContent='Atrakcyjność przy tej cenie: '+clamp(Math.round(100-($('#pr').value/carValue(c)-.8)*160))+'%'}
const views={
 office(){return`<div class="card row"><div>Przychody<br><b class="pos">${pln(S.income)}</b></div><div>Wydatki<br><b class="neg">${pln(S.expense)}</b></div><div>Saldo<br><b>${pln(S.money)}</b></div></div>
 <div class="card"><b>Historia transakcji</b>${S.tx.map(t=>`<div class="row mut"><span>Dz.${t.day} ${t.type}: ${t.label}</span><b class="${t.amt>=0?'pos':'neg'}">${t.amt>=0?'+':''}${pln(t.amt)}</b></div>`).join('')||'<p>Brak</p>'}</div>
 <button onclick="if(confirm('Rozpocząć nową grę? Postęp zostanie utracony.')){newState();UI.close();toast({ok:1,msg:'Nowa gra rozpoczęta'})}">Nowa gra</button>`},
 market(){return`<div class="grid">${S.market.map(c=>`<div class="card"><img src="${carImg(c)}" width="100" style="float:right"><b>${c.brand} ${c.model} ${c.year}</b><div class="mut">${c.fuel}, ${c.hp} KM, ${c.km.toLocaleString('pl-PL')} km<br>Technika ${carCond(c)}% • wygląd ${carVis(c)}%</div>
  <details><summary class="mut">Sprawdź stan</summary>${Object.entries(PARTS).map(([k,n])=>`<div class="row"><small>${n}</small><small>${Math.round(c.parts[k])}%</small></div>${barHtml(c.parts[k])}`).join('')}</details>
  <div class="row"><b>${pln(c.price)}</b><button class="pri" onclick="act(G.buy(${c.id}))">Kup</button></div></div>`).join('')}</div><p class="mut">Oferty odświeżają się co 3 dni. Wolne miejsca: ${S.slots-S.cars.length}/${S.slots}</p>`},
 garage(){return`<div class="card">Stanowiska: ${S.repairs.length}/${S.bays} zajęte. Naprawa trwa 1 dzień i poprawia część o do ${CFG.repairPts} pkt.</div>`+(S.cars.length?S.cars.map(c=>`<div class="card"><b>${c.brand} ${c.model}</b>${Object.keys(REPAIRS).map(k=>{const r=G.repairCost(c,k);return`<div class="row"><span>${PARTS[k]} ${Math.round(c.parts[k])}%</span><button ${r.pts<=0?'disabled':''} onclick="act(G.repair(${c.id},'${k}'))">${r.pts>0?'Napraw +'+r.pts+' • '+pln(r.cost):'Sprawne'}</button></div>${barHtml(c.parts[k])}`}).join('')}</div>`).join(''):'<p class="mut">Brak aut do naprawy.</p>')}};
function render(){$('#top').innerHTML=`<div class="sg"><div class="stat"><small>Pieniądze</small>${pln(S.money)}</div><div class="stat"><small>Dzień</small>${S.day}</div><div class="stat"><small>Reputacja</small>${S.rep}/100</div></div>
 <div class="sg"><button onclick="UI.open('office')">📋</button><button onclick="UI.open('market')">🛒</button><button onclick="UI.open('garage')">🔧</button><button class="pri" onclick="act(G.nextDay())">Dzień ▶</button></div>`;
 const car=S.cars.find(c=>c.id===UI.sel);if(UI.cur==='car'&&!car)UI.cur=null;const w=$('#win');if(!UI.cur){w.classList.remove('show');return}
 $('#wt').textContent={office:'🏢 Biuro – finanse',market:'🛒 Rynek samochodowy',garage:'🔧 Warsztat',car:car?`${car.brand} ${car.model} ${car.year}`:''}[UI.cur];
 $('#wb').innerHTML=UI.cur==='car'?carDetails(car)+saleBox(car):views[UI.cur]();w.classList.add('show')}
$('#win').addEventListener('pointerdown',e=>{if(e.target.id==='win')UI.close()});
addEventListener('beforeunload',save);document.addEventListener('visibilitychange',save);
if(!load())newState();render();startWorld();
