// Mechaniki gry: kupno, naprawy, sprzedaż, dni. Zwracają {ok,msg}
const G={
 buy(id){const i=S.market.findIndex(c=>c.id===id);if(i<0)return{ok:0,msg:'Oferta nieaktualna'};const c=S.market[i];
  if(S.cars.length>=S.slots)return{ok:0,msg:'Brak wolnego miejsca na placu!'};
  if(S.money<c.price)return{ok:0,msg:'Za mało pieniędzy!'};
  addTx('Zakup',`${c.brand} ${c.model} ${c.year}`,-c.price);S.market.splice(i,1);c.boughtFor=c.price;delete c.price;S.cars.push(c);save();return{ok:1,msg:'Kupiono '+c.brand+' '+c.model}},
 repairCost(c,k){const pts=Math.min(CFG.repairPts,100-c.parts[k]);return{pts,cost:pts*REPAIRS[k].cost}},
 repair(id,k){const c=S.cars.find(x=>x.id===id);if(!c)return{ok:0,msg:'Brak auta'};
  const{pts,cost}=this.repairCost(c,k);if(pts<=0)return{ok:0,msg:'Ta część jest w pełni sprawna'};
  if(S.repairs.length>=S.bays)return{ok:0,msg:'Stanowisko zajęte - przejdź do następnego dnia'};
  if(S.money<cost)return{ok:0,msg:'Za mało pieniędzy!'};
  addTx('Naprawa',`${REPAIRS[k].name} (${c.model})`,-cost);S.repairs.push({id,k,pts,days:1});save();return{ok:1,msg:'Zlecono: '+REPAIRS[k].name+' (gotowe po dniu)'}},
 // atrakcyjność: stosunek ceny do wartości rynkowej
 attract(c){const r=c.ask/carValue(c);return clamp(Math.round(100-(r-0.8)*160))},
 list(id,price){const c=S.cars.find(x=>x.id===id);price=Math.round(+price);if(!c)return{ok:0,msg:'Brak auta'};
  if(!(price>0))return{ok:0,msg:'Podaj poprawną cenę'};c.listed=true;c.ask=price;c.daysOn=0;save();return{ok:1,msg:'Wystawiono na sprzedaż'}},
 unlist(id){const c=S.cars.find(x=>x.id===id);if(c){c.listed=false;save()}return{ok:1,msg:'Zdjęto z oferty'}},
 sellNow(id){const c=S.cars.find(x=>x.id===id);if(!c)return{ok:0,msg:'Brak auta'};const p=Math.round(carValue(c)*.7);
  S.cars=S.cars.filter(x=>x!==c);addTx('Skup',`${c.brand} ${c.model} (do handlarza)`,p);save();return{ok:1,msg:'Sprzedano handlarzowi za '+pln(p)}},
 nextDay(){const log=[];S.day++;
  S.repairs=S.repairs.filter(r=>{const c=S.cars.find(x=>x.id===r.id);if(c){c.parts[r.k]=clamp(c.parts[r.k]+r.pts);log.push('Gotowe: '+REPAIRS[r.k].name)}return false});
  for(const c of S.cars.filter(x=>x.listed)){c.daysOn++;const a=this.attract(c);
   const chance=clamp(a,0,100)/100*(0.15+S.rep/200);
   if(Math.random()<chance){addTx('Sprzedaż',`${c.brand} ${c.model} ${c.year}`,c.ask);S.cars=S.cars.filter(x=>x!==c);
    const profit=c.ask-c.boughtFor;S.rep=clamp(S.rep+(a>50?1:0));log.push(`SPRZEDANO ${c.brand} ${c.model} za ${pln(c.ask)}`)}}
  addTx('Koszty',`Opłaty dzienne placu`,-CFG.dailyCost);
  if(S.day%3===0)genMarket();
  S.msg=log;save();return{ok:1,msg:log.length?log.join(' | '):'Nowy dzień '+S.day}}
};
