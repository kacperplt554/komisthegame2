// Stan gry, zapis, transakcje
let S=null;
const rnd=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const clamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
const pln=n=>Math.round(n).toLocaleString('pl-PL')+' zł';
function newCar(m,o={}){const y=o.year||rnd(m.y[0],m.y[1]);const age=2026-y;const km=o.km??clamp(age*rnd(9000,22000),5000,450000);
 const w=()=>clamp(100-km/6000-rnd(0,35));
 const c={id:S?S.nextId++:1,brand:m.b,model:m.m,year:y,km,fuel:m.fuel,hp:rnd(m.hp[0],m.hp[1]),color:COLORS[rnd(0,6)],
  parts:{engine:w(),gearbox:w(),suspension:w(),brakes:w(),body:w(),interior:w()},listed:false,ask:0,boughtFor:0,daysOn:0};
 return Object.assign(c,o.parts?{parts:o.parts}:{});}
function carCond(c){const p=c.parts;return Math.round((p.engine+p.gearbox+p.suspension+p.brakes)/4)}
function carVis(c){return Math.round((c.parts.body+c.parts.interior)/2)}
function carValue(c){const m=MODELS.find(x=>x.m===c.model)||{base:30000};const age=Math.max(0,2026-c.year);
 const v=m.base*Math.pow(.9,age)*(1-c.km/700000)*(.4+.6*(carCond(c)*.65+carVis(c)*.35)/100);return Math.max(1500,Math.round(v/50)*50)}
function genMarket(n=6){S.market=[];for(let i=0;i<n;i++){const car=newCar(MODELS[rnd(0,MODELS.length-1)]);car.id=S.nextId++;
 car.price=Math.round(carValue(car)*(0.8+Math.random()*.3)/50)*50;S.market.push(car)}}
function newState(){S={money:CFG.startMoney,day:1,rep:CFG.rep,slots:CFG.slots,bays:CFG.bays,nextId:1,cars:[],market:[],tx:[],repairs:[],income:0,expense:0,msg:[]};
 const c=newCar(MODELS[0],{year:2008,km:280000});c.fuel='diesel';c.boughtFor=0;c.id=S.nextId++;S.cars.push(c);genMarket();save();return S}
function addTx(type,label,amt){S.money+=amt;if(amt>=0)S.income+=amt;else S.expense-=amt;S.tx.unshift({day:S.day,type,label,amt});S.tx=S.tx.slice(0,100)}
function save(){try{localStorage.setItem(CFG.saveKey,JSON.stringify(S))}catch(e){}}
function load(){try{const r=localStorage.getItem(CFG.saveKey);if(r){S=JSON.parse(r);return true}}catch(e){}return false}
