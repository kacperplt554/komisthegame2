// Generator grafik (rysowanych kodem, buforowanych). Każdą funkcję get*Sprite można później zastąpić grafiką PNG.
const SPR={};const cached=(k,f)=>SPR[k]||(SPR[k]=f());
const rect2=(g,x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
function wheel(g,x,yc,zc,r){const pts=[];for(let i=0;i<14;i++){const a=i/14*6.283;pts.push([x,yc+Math.cos(a)*r,zc+Math.sin(a)*r])}
 poly(g,pts,'#15171a');poly(g,pts.map(p=>[p[0]+.3,yc+(p[1]-yc)*.55,zc+(p[2]-zc)*.55]),'#aeb4bb')}
function drawCarBox(g,c,sp,wear){const W=sp.W,L=sp.L,h1=sp.h1,h2=sp.h2,col=c.color,z=4,y0={sedan:.2,hatch:.1,wagon:.05}[sp.body]||.2,y1={sedan:.6,hatch:.62,wagon:.64}[sp.body]||.6;
 g.save();g.shadowColor='rgba(0,0,0,.55)';g.shadowBlur=10;poly(g,[[-2,4,0],[W+8,4,0],[W+8,L+6,0],[-2,L+6,0]],'rgba(0,0,0,.4)');g.restore();
 box(g,0,0,W,L,h1,col,z);[.2,.78].forEach(f=>wheel(g,W+.4,L*f,7,7));
 const cb={x:5,y:L*y0,w:W-10,d:L*(y1-y0)},zc=z+h1;box(g,cb.x,cb.y,cb.w,cb.d,h2,col,zc);
 const gl='#22313f',gh='#4d6b85',F={x:0,y:0,w:W,d:L};
 wall(g,cb,'L',3,cb.w-3,zc+2,zc+h2-2,gl,.3);wall(g,cb,'L',4,cb.w*.45,zc+h2*.55,zc+h2-3,gh,.35);
 wall(g,cb,'R',3,cb.d/2-1,zc+2.5,zc+h2-2.5,gl,.3);wall(g,cb,'R',cb.d/2+1,cb.d-3,zc+2.5,zc+h2-2.5,gl,.3);
 wall(g,F,'L',4,14,z+h1*.45,z+h1*.85,'#fff3b8',.4);wall(g,F,'L',W-14,W-4,z+h1*.45,z+h1*.85,'#fff3b8',.4);
 wall(g,F,'L',W*.28,W*.72,z+h1*.3,z+h1*.6,'#14171b',.4);wall(g,F,'L',3,W-3,z,z+h1*.22,'#2a2e34',.45);wall(g,F,'L',W*.38,W*.62,z+h1*.05,z+h1*.17,'#e8e8e8',.6);
 [.34,.58].forEach(f=>wall(g,F,'R',L*f,L*f+1,z+3,z+h1+1,'rgba(0,0,0,.35)',.4));box(g,W-1,L*.6,4,6,3,col,zc-1);
 if(c.id%4===0){const t=z+h1+.2,u=zc+h2+.2;poly(g,[[W*.4,L*.66,t],[W*.6,L*.66,t],[W*.6,L,t],[W*.4,L,t]],'rgba(255,255,255,.6)');poly(g,[[cb.x+cb.w*.4,cb.y,u],[cb.x+cb.w*.6,cb.y,u],[cb.x+cb.w*.6,cb.y+cb.d,u],[cb.x+cb.w*.4,cb.y+cb.d,u]],'rgba(255,255,255,.6)')}
 for(let i=0;i<wear;i++){const u=(c.id*37+i*53)%(L-10)+4,v=z+3+(i*7)%10;wall(g,F,'R',u,u+5,v,v+3,'rgba(140,70,25,.85)',.5)}}
function getCarSprite(c){const sp=carSpec(c),wear=Math.max(0,Math.floor((60-c.parts.body)/12));
 return cached(`car|${c.brand}|${c.model}|${c.color}|${wear}|${c.id%4===0?1:0}`,()=>makeSprite(sp.W,sp.L,sp.h1+sp.h2+10,g=>drawCarBox(g,c,sp,wear)))}
function textOnFront(g,x,y,z,txt,w,h,font,bg,fg){const s=toScreen(x,y,z);g.save();g.transform(ISO.kx,ISO.ky,0,1,s.x,s.y);g.fillStyle=bg;g.fillRect(0,0,w,h);g.fillStyle=fg;g.font=font;g.textAlign='center';g.fillText(txt,w/2,h*.72);g.restore()}
function drawBuilding(g,b){const h=b.h,B={x:0,y:0,w:b.w,d:b.d},win='#243a4f',gl='#86b9da';
 g.save();g.shadowColor='rgba(0,0,0,.5)';g.shadowBlur=16;poly(g,[[8,8,0],[b.w+24,8,0],[b.w+24,b.d+24,0],[8,b.d+24,0]],'rgba(0,0,0,.4)');g.restore();
 box(g,0,0,b.w,b.d,h,b.wall);poly(g,[[7,7,h+.4],[b.w-7,7,h+.4],[b.w-7,b.d-7,h+.4],[7,b.d-7,h+.4]],shade(b.roof,.95));
 box(g,b.w*.62,b.d*.3,50,36,12,'#c4c9cf',h);box(g,b.w*.18,b.d*.35,10,10,8,'#7b8590',h);
 if(b.id==='office'){[[22,72],[96,142],[158,204],[228,278]].forEach(([a,c])=>{if(a<b.w/2-30||a>b.w/2+30){wall(g,B,'L',a,c,34,76,win);wall(g,B,'L',a+3,c-3,37,73,gl,.7)}});
  [[25,70],[100,145]].forEach(([a,c])=>{wall(g,B,'R',a,c,34,76,win);wall(g,B,'R',a+3,c-3,37,73,gl,.7)});
  wall(g,B,'L',b.w/2-22,b.w/2+22,0,52,'#4a2f1b');wall(g,B,'L',b.w/2-17,b.w/2+17,6,48,'#7fb0cf',.7);
  box(g,b.w/2-36,b.d,72,22,5,'#d9453f',54);textOnFront(g,b.w/2-45,b.d+.8,90,b.name,90,18,'bold 14px system-ui','#1a222d','#f5b638')}
 else{[[24,130],[150,256]].forEach(([a,c])=>{wall(g,B,'L',a,c,0,64,'#8f98a2');for(let z=6;z<64;z+=7)wall(g,B,'L',a,c,z,z+1,'rgba(0,0,0,.3)',.7);wall(g,B,'L',a,c,64,69,'#f5b638',.6)});
  wall(g,B,'L',290,330,0,52,'#3a424b');wall(g,B,'L',296,324,24,46,'#7fb0cf',.7);
  [[30,80],[110,160]].forEach(([a,c])=>{wall(g,B,'R',a,c,40,78,win);wall(g,B,'R',a+3,c-3,43,75,gl,.7)});
  textOnFront(g,b.w/2-55,b.d+.8,95,b.name,110,20,'bold 15px system-ui','#1a222d','#f5b638')}}
function getBuildingSprite(b){return cached('b'+b.id,()=>makeSprite(b.w+24,b.d+24,b.h+16,g=>drawBuilding(g,b)))}
function cyl(g,wx,wy,r,h,col,top){const s=toScreen(wx,wy);g.fillStyle=shade(col,.75);g.fillRect(s.x-r,s.y-h,2*r,h);g.fillStyle=shade(col,.75);g.beginPath();g.ellipse(s.x,s.y,r,r*.5,0,0,7);g.fill();
 g.fillStyle=top||shade(col,1.15);g.beginPath();g.ellipse(s.x,s.y-h,r,r*.5,0,0,7);g.fill();g.strokeStyle='rgba(0,0,0,.25)';g.beginPath();g.moveTo(s.x-r,s.y-h*.5);g.lineTo(s.x+r,s.y-h*.5);g.stroke()}
function getPropSprite(p){return cached('p'+p.t+p.x+p.y,()=>makeSprite(p.w,p.d,p.h,g=>{
 const sh=()=>{g.save();g.shadowColor='rgba(0,0,0,.5)';g.shadowBlur=8;poly(g,[[2,2,0],[p.w+5,2,0],[p.w+5,p.d+5,0],[2,p.d+5,0]],'rgba(0,0,0,.3)');g.restore()};sh();
 if(p.t==='crate'){box(g,0,0,p.w,p.d,p.h,'#b0824f');for(let u=8;u<p.w;u+=12)wall(g,{x:0,y:0,w:p.w,d:p.d},'L',u,u+2,2,p.h-2,'rgba(60,35,15,.5)',.4)}
 else if(p.t==='bench'){box(g,0,0,p.w,p.d,6,'#6b4a2b',10);box(g,3,2,4,p.d-4,10,'#333');box(g,p.w-7,2,4,p.d-4,10,'#333')}
 else if(p.t==='barrel'){cyl(g,p.w/2,p.d/2,13,p.h,'#2f6fb0')}
 else{[0,1,2].forEach(i=>cyl(g,p.w/2,p.d/2,15,10,'#1c1d20','#2b2d31'));for(let i=0;i<3;i++)cyl(g,p.w/2,p.d/2,15,10*(i+1),'#1c1d20','#2b2d31')}}))}
function getKioskSprite(k){return cached('kiosk',()=>makeSprite(k.w,k.d,k.h+30,g=>{
 g.save();g.shadowColor='rgba(0,0,0,.5)';g.shadowBlur=8;poly(g,[[2,2,0],[k.w+5,2,0],[k.w+5,k.d+5,0],[2,k.d+5,0]],'rgba(0,0,0,.3)');g.restore();
 box(g,0,0,k.w,k.d,24,'#6b4a2b');box(g,k.w*.2,4,k.w*.6,5,20,'#222',24);wall(g,{x:k.w*.2,y:4,w:k.w*.6,d:5},'L',2,k.w*.6-2,28,40,'#4aa3f0',.4);
 wall(g,{x:0,y:0,w:k.w,d:k.d},'L',6,k.w-6,22,23,'#ddd',.6)}))}
function getBillboardSprite(b){return cached('bill',()=>makeSprite(b.w,b.d,b.h,g=>{
 g.save();g.shadowColor='rgba(0,0,0,.5)';g.shadowBlur=8;poly(g,[[4,6,0],[b.w+8,6,0],[b.w+8,b.d+10,0],[4,b.d+10,0]],'rgba(0,0,0,.3)');g.restore();
 box(g,12,2,8,8,60,'#555');box(g,b.w-20,2,8,8,60,'#555');box(g,0,2,b.w,6,46,'#17263a',54);
 textOnFront(g,6,8.8,98,'AUTO KOMIS',b.w-12,22,'bold 20px system-ui','#17263a','#f5b638');textOnFront(g,6,8.8,76,'SKUP • SPRZEDAŻ',b.w-12,16,'bold 12px system-ui','#17263a','#e8edf3')}))}
function getPillarSprite(){return cached('pil',()=>makeSprite(18,18,64,g=>{box(g,0,0,18,18,60,'#8b5a3c');box(g,-2,-2,22,22,4,'#a87250',60)}))}
function blob(g,x,y,r,c1,c2){const rg=g.createRadialGradient(x-r*.3,y-r*.35,r*.1,x,y,r);rg.addColorStop(0,c1);rg.addColorStop(1,c2);g.fillStyle=rg;g.beginPath();g.arc(x,y,r,0,7);g.fill()}
function getTreeSprite(v){return cached('t'+v,()=>{const c=document.createElement('canvas');c.width=240;c.height=300;const g=c.getContext('2d');g.scale(2,2);const ax=60,ay=135,P=[['#8fc86a','#2f6a2c'],['#a4d46f','#3a7a30'],['#7fbf7a','#2a6a40']][v%3];
 g.save();g.shadowColor='rgba(0,0,0,.5)';g.shadowBlur=14;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(ax+10,ay,36,15,0,0,7);g.fill();g.restore();
 g.fillStyle='#5b3a21';g.fillRect(ax-4,ay-46,8,46);[[0,-72,30],[-17,-56,22],[18,-54,22],[0,-92,21],[-8,-78,22]].forEach(([x,y,r])=>blob(g,ax+x,ay+y,r,P[0],P[1]));return{c,ax,ay,res:2}})}
function getShrubSprite(v){return cached('s'+v,()=>{const c=document.createElement('canvas');c.width=100;c.height=80;const g=c.getContext('2d');g.scale(2,2);const ax=25,ay=32;
 g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(ax+3,ay,14,6,0,0,7);g.fill();[[-6,-8,9],[7,-8,9],[0,-14,10]].forEach(([x,y,r])=>blob(g,ax+x,ay+y,r,v?'#c9a8e0':'#9ad07a',v?'#6e3f93':'#3a7a30'));return{c,ax,ay,res:2}})}
