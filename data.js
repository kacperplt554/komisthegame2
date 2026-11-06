// Dane statyczne gry
const MODELS=[
 {b:'Bavaria',m:'320d',fuel:'diesel',hp:[163,184],base:42000,y:[2005,2016]},
 {b:'Volkswagen',m:'Golf',fuel:'benzyna',hp:[90,150],base:30000,y:[2004,2017]},
 {b:'Opel',m:'Astra',fuel:'diesel',hp:[100,136],base:24000,y:[2003,2016]},
 {b:'Ford',m:'Focus',fuel:'benzyna',hp:[100,125],base:25000,y:[2004,2016]},
 {b:'Toyota',m:'Corolla',fuel:'hybryda',hp:[99,136],base:34000,y:[2008,2018]},
 {b:'Audi',m:'A4',fuel:'diesel',hp:[143,190],base:45000,y:[2004,2016]},
 {b:'Skoda',m:'Octavia',fuel:'diesel',hp:[105,150],base:32000,y:[2005,2017]}];
const PARTS={engine:'Silnik',gearbox:'Skrzynia',suspension:'Zawieszenie',brakes:'Hamulce',body:'Karoseria',interior:'Wnętrze'};
const REPAIRS={engine:{cost:150,name:'Naprawa silnika'},suspension:{cost:90,name:'Naprawa zawieszenia'},brakes:{cost:60,name:'Naprawa hamulców'},body:{cost:110,name:'Naprawa karoserii'}}; // zł za 1 pkt stanu
const COLORS=['#c0392b','#2980b9','#27ae60','#bdc3c7','#2c3e50','#f39c12','#8e44ad'];
const CFG={startMoney:50000,slots:4,bays:1,rep:10,repairPts:25,dailyCost:150,saveKey:'komis_save_v1'};
