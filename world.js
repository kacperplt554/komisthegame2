// Świat izometryczny: pętla gry, gracz (8 kierunków), kolizje, kamera, głębokość, interakcje
const SLOTS=MAP.slots,P={x:MAP.spawn.x,y:MAP.spawn.y,t:0,mv:0,fx:0,fy:1},K={},J={x:0,y:0},GB={x0:-300,y0:-300,x1:1800,y1:1300};
let cv,g,Z=1,DPR=1,GR,GOX,GOY,near=null,last=0;
const rr=(g,x,y,w,h,r)=>{g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()};
function fenceRun(g,x1,y1,x2,y2,h=24){const n=Math.max(1,Math.round(Math.hypot(x2-x1,y2-y1)/50));poly(g,[[x1,y1,0],[x2,y2,0],[x2,y2,h],[x1,y1,h]],'rgba(200,210,220,.22)');
 let a=toScreen(x1,y1,h),b=toScreen(x2,y2,h);g.strokeStyle='#cfd5dc';g.lineWidth=1.5;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();
 for(let i=0;i<=n;i++){const x=x1+(x2-x1)*i/n,y=y1+(y2-y1)*i/n,p0=toScreen(x,y),p1=toScreen(x,y,h);g.strokeStyle='#5a616b';g.lineWidth=3;g.beginPath();g.moveTo(p0.x,p0.y);g.lineTo(p1.x,p1.y);g.stroke()}}
function buildGround(){const sx0=(GB.x0-GB.y1)*ISO.kx,sx1=(GB.x1-GB.y0)*ISO.kx,sy0=(GB.x0+GB.y0)*ISO.ky,sy1=(GB.x1+GB.y1)*ISO.ky;GOX=-sx0;GOY=-sy0;
 const c=document.createElement('canvas');c.width=Math.ceil(sx1-sx0);c.height=Math.ceil(sy1-sy0);const g=c.getContext('2d');g.translate(GOX,GOY);g.save();g.transform(ISO.kx,ISO.ky,-ISO.kx,ISO.ky,0,0);
 let s=11;const r=()=>(s=(s*9301+49297)%233280)/233280,f=MAP.fence,W=2100;
 g.fillStyle='#5b8a45';g.fillRect(GB.x0,GB.y0,W,W);for(let i=0;i<5000;i++){g.fillStyle=r()>.5?'#67974e':'#4d7a3a';g.fillRect(GB.x0+r()*W,GB.y0+r()*W,3,3)}
 g.fillStyle='#3b3e45';g.fillRect(GB.x0,930,W,150);g.fillStyle='#e8c53a';for(let x=-300;x<1800;x+=90)g.fillRect(x,1000,45,5);g.fillStyle='#9a9ea6';g.fillRect(GB.x0,898,W,32);
 g.fillStyle='#4b4f58';g.fillRect(f.x0,f.y0,f.x1-f.x0,f.y1-f.y0);for(let i=0;i<9000;i++){g.fillStyle=r()>.5?'#555a64':'#43474f';g.fillRect(f.x0+r()*(f.x1-f.x0),f.y0+r()*(f.y1-f.y0),2,2)}
 g.fillStyle='rgba(20,20,25,.25)';for(let i=0;i<9;i++){g.beginPath();g.ellipse(200+r()*1100,430+r()*420,10+r()*18,6+r()*10,0,0,7);g.fill()}
 g.strokeStyle='#2c2f35';g.lineWidth=1.5;for(let i=0;i<12;i++){g.beginPath();let x=120+r()*1200,y=330+r()*480;g.moveTo(x,y);for(let k=0;k<4;k++){x+=r()*36-8;y+=r()*26;g.lineTo(x,y)}g.stroke()}
 MAP.buildings.forEach(b=>{g.fillStyle='#8d9199';g.fillRect(b.x-20,b.y+b.d,b.w+40,70);g.fillStyle='#7d818a';for(let x=b.x-20;x<b.x+b.w+20;x+=35)g.fillRect(x,b.y+b.d,2,70)});
 g.fillStyle='#e8c53a';for(let y=f.y1-60;y<f.y1;y+=20)g.fillRect(f.g0+20,y,6,10),g.fillRect(f.g1-26,y,6,10);
 g.strokeStyle='#e8edf3';g.lineWidth=3;g.fillStyle='rgba(232,237,243,.65)';g.font='bold 22px system-ui';g.textAlign='center';
 MAP.slots.forEach((o,i)=>{g.strokeRect(o.cx-o.w/2,o.cy-o.d/2,o.w,o.d);g.fillText(i+1,o.cx,o.cy+o.d/2-10)});
 MAP.lamps.forEach(([x,y])=>{const rg=g.createRadialGradient(x,y,2,x,y,150);rg.addColorStop(0,'rgba(255,225,150,.35)');rg.addColorStop(1,'rgba(255,225,150,0)');g.fillStyle=rg;g.fillRect(x-150,y-150,300,300)});
 g.restore();fenceRun(g,f.x0,f.y0,f.x1,f.y0);fenceRun(g,f.x0,f.y0,f.x0,f.y1);return c}
function syncSlots(){const u=new Set(),n=Math.min(S.slots,SLOTS.length);S.cars.forEach(c=>{if(c.slot==null||c.slot<0||c.slot>=n||u.has(c.slot))c.slot=-1;else u.add(c.slot)});
 S.cars.forEach(c=>{if(c.slot<0){let i=0;while(u.has(i))i++;c.slot=i;u.add(i)}})}
function things(){const t=[];S.cars.forEach(c=>{const o=SLOTS[c.slot];if(o)t.push({x:o.cx,y:o.cy,r:130,hit:60,hz:25,label:'Obejrzyj '+c.brand+' '+c.model,fn:()=>UI.car(c.id)})});
 t.push({x:250,y:305,r:95,hit:55,hz:30,label:'Wejdź do biura',fn:()=>UI.open('office')},{x:1100,y:325,r:100,hit:60,hz:30,label:'Wejdź do warsztatu',fn:()=>UI.open('garage')},
  {x:623,y:305,r:80,hit:45,hz:25,label:'Komputer – rynek aut',fn:()=>UI.open('market')},{x:750,y:870,r:70,hit:50,hz:10,label:'Zamknij dzień (brama)',fn:()=>act(G.nextDay())});return t}
function solids(){const r=[],f=MAP.fence,k=MAP.kiosk,bb=MAP.billboard;MAP.buildings.forEach(b=>r.push({x:b.x,y:b.y,w:b.w,h:b.d+6}));r.push({x:k.x,y:k.y,w:k.w,h:k.d+4},{x:bb.x,y:bb.y,w:bb.w,h:bb.d});
 MAP.props.forEach(p=>r.push({x:p.x,y:p.y,w:p.w,h:p.d}));
 r.push({x:f.x0-8,y:f.y0-8,w:f.x1-f.x0+16,h:8},{x:f.x0-8,y:f.y0,w:8,h:f.y1-f.y0+8},{x:f.x1,y:f.y0,w:8,h:f.y1-f.y0+8},{x:f.x0-8,y:f.y1,w:f.g0-f.x0+8,h:8},{x:f.g1,y:f.y1,w:f.x1-f.g1+8,h:8});
 S.cars.forEach(c=>{const o=SLOTS[c.slot];if(!o)return;const s=carSpec(c);r.push({x:o.cx-s.W/2,y:o.cy-s.L/2,w:s.W,h:s.L})});return r}
function blocked(x,y){if(x<12||y<12||x>MAP.w-12||y>MAP.h-12)return true;return solids().some(o=>x+10>o.x&&x-10<o.x+o.w&&y+10>o.y&&y-10<o.y+o.h)}
function interact(){if(near&&!UI.isOpen())near.fn()}
function step(dt){syncSlots();if(UI.isOpen())return;
 let vx=(K.d||K.arrowright?1:0)-(K.a||K.arrowleft?1:0),vy=(K.s||K.arrowdown?1:0)-(K.w||K.arrowup?1:0);
 if(!vx&&!vy&&Math.hypot(J.x,J.y)>.3){const a=Math.round(Math.atan2(J.y,J.x)/(Math.PI/4))*Math.PI/4;vx=Math.round(Math.cos(a));vy=Math.round(Math.sin(a))}
 P.mv=0;if(vx||vy){const m=Math.hypot(vx,vy),sx=vx/m,sy=vy/m;P.fx=sx;P.fy=sy;const w=toWorld(sx,sy),l=Math.hypot(w.x,w.y),dx=w.x/l,dy=w.y/l,sp=170*dt;
  if(!blocked(P.x+dx*sp,P.y))P.x+=dx*sp;if(!blocked(P.x,P.y+dy*sp))P.y+=dy*sp;P.mv=1;P.t+=dt*11;CAM.ox=CAM.oy=0}
 near=null;let b=1e9;things().forEach(t=>{const d=Math.hypot(t.x-P.x,t.y-P.y);if(d<t.r&&d<b){b=d;near=t}})}
function drawPlayer(g){const s=toScreen(P.x,P.y),sw=P.mv?Math.sin(P.t)*5:0,fx=P.fx,fy=P.fy,front=fy>.3,back=fy<-.3;g.save();g.translate(s.x,s.y);
 g.save();g.shadowColor='rgba(0,0,0,.5)';g.shadowBlur=6;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(2,1,13,6,0,0,7);g.fill();g.restore();
 g.lineCap='round';const limb=(x0,y0,ph,len,col,w)=>{g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.moveTo(x0,y0);g.lineTo(x0+fx*sw*ph*1.1,y0+len+fy*sw*ph*.5);g.stroke()};
 limb(-3.5,-15,1,14,'#26324a',5);limb(3.5,-15,-1,14,'#26324a',5);
 g.fillStyle='#2b6fd6';rr(g,-8,-32,16,19,5);g.fill();g.fillStyle='#1c4a96';g.fillRect(-8,-17,16,3);
 limb(-9,-29,-1,12,'#2b6fd6',4);limb(9,-29,1,12,'#2b6fd6',4);
 g.fillStyle='#f1c8a0';g.beginPath();g.arc(fx*1.5,-39,7,0,7);g.fill();
 g.fillStyle='#3a2a1a';g.beginPath();g.arc(fx*1.5,-40,7.2,back?0:Math.PI*1.05,back?7:Math.PI*1.95);g.fill();if(back)g.fill();
 if(front){g.fillStyle='#222';g.fillRect(fx*3-3,-38,2,2);g.fillRect(fx*3+1,-38,2,2)}else if(Math.abs(fx)>.3&&!back){g.fillStyle='#222';g.fillRect(fx*6-1,-39,2,2)}
 g.restore()}
function lampPole(g,x,y){const a=toScreen(x,y),b=toScreen(x,y,88);g.strokeStyle='#2d333b';g.lineWidth=3;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();g.fillStyle='#ffe9a8';g.beginPath();g.ellipse(b.x,b.y,6,3,0,0,7);g.fill()}
function buildItems(){const it=[],add=(x0,y0,x1,y1,fn)=>it.push({x0,y0,x1,y1,fn}),f=MAP.fence,k=MAP.kiosk,bb=MAP.billboard;
 MAP.buildings.forEach(b=>add(b.x,b.y,b.x+b.w,b.y+b.d,g=>blit(g,getBuildingSprite(b),b.x,b.y)));
 add(k.x,k.y,k.x+k.w,k.y+k.d,g=>blit(g,getKioskSprite(k),k.x,k.y));add(bb.x,bb.y,bb.x+bb.w,bb.y+bb.d,g=>blit(g,getBillboardSprite(bb),bb.x,bb.y));
 MAP.props.forEach(p=>add(p.x,p.y,p.x+p.w,p.y+p.d,g=>blit(g,getPropSprite(p),p.x,p.y)));
 MAP.trees.forEach(([x,y,v])=>add(x-8,y-8,x+8,y+8,g=>blit(g,getTreeSprite(v),x,y)));MAP.shrubs.forEach(([x,y,v])=>add(x-6,y-6,x+6,y+6,g=>blit(g,getShrubSprite(v),x,y)));
 MAP.lamps.forEach(([x,y])=>add(x-3,y-3,x+3,y+3,g=>lampPole(g,x,y)));
 [f.g0-18,f.g1].forEach(x=>add(x,f.y1-4,x+18,f.y1+14,g=>blit(g,getPillarSprite(),x,f.y1-4)));
 S.cars.forEach(c=>{const o=SLOTS[c.slot];if(!o)return;const s=carSpec(c),x=o.cx-s.W/2,y=o.cy-s.L/2;add(x,y,x+s.W,y+s.L,g=>blit(g,getCarSprite(c),x,y))});
 add(P.x-9,P.y-9,P.x+9,P.y+9,drawPlayer);return depthSort(it)}
function tag(txt,x,y,bg,fg){g.font='bold 12px system-ui';g.textAlign='center';const w=g.measureText(txt).width+14;g.fillStyle=bg;rr(g,x-w/2,y-12,w,22,8);g.fill();g.fillStyle=fg;g.fillText(txt,x,y+4)}
function draw(dt){g.setTransform(1,0,0,1,0,0);g.fillStyle='#16210f';g.fillRect(0,0,cv.width,cv.height);
 const tp=toScreen(P.x,P.y,20),k=Math.min(1,dt*8);CAM.x+=(tp.x+CAM.ox-CAM.x)*k;CAM.y+=(tp.y+CAM.oy-CAM.y)*k;
 g.setTransform(DPR*Z,0,0,DPR*Z,(innerWidth/2-CAM.x*Z)*DPR,(innerHeight/2-CAM.y*Z)*DPR);g.drawImage(GR,-GOX,-GOY);
 buildItems().forEach(i=>i.fn(g));const f=MAP.fence;[[f.x0,f.y1,f.g0,f.y1],[f.g1,f.y1,f.x1,f.y1],[f.x1,f.y0,f.x1,f.y1]].forEach(s=>fenceRun(g,...s));
 g.globalCompositeOperation='lighter';MAP.lamps.forEach(([x,y])=>{const h=toScreen(x,y,88),rg=g.createRadialGradient(h.x,h.y,1,h.x,h.y,40);rg.addColorStop(0,'rgba(255,225,150,.55)');rg.addColorStop(1,'rgba(255,225,150,0)');g.fillStyle=rg;g.fillRect(h.x-40,h.y-40,80,80)});g.globalCompositeOperation='source-over';
 S.cars.forEach(c=>{const o=SLOTS[c.slot];if(!o)return;const sp=carSpec(c),a=toScreen(o.cx,o.cy,sp.h1+sp.h2+34);tag(c.model,a.x,a.y,'rgba(20,27,36,.85)','#fff');if(c.listed){const b=toScreen(o.cx,o.cy+o.d/2+12);tag(pln(c.ask),b.x,b.y,'#3ecf8e','#06251a')}});
 if(near&&!UI.isOpen()){const a=toScreen(near.x,near.y),p=1+Math.sin(performance.now()/200)*.08;g.strokeStyle='#f5b638';g.lineWidth=3;g.beginPath();g.ellipse(a.x,a.y,44*p,22*p,0,0,7);g.stroke();const t=toScreen(near.x,near.y,near.hz+70);tag('[E] '+near.label,t.x,t.y,'#f5b638','#1a1200')}}
function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;step(dt);draw(dt);requestAnimationFrame(loop)}
function resize(){DPR=window.devicePixelRatio||1;Z=Math.max(.8,Math.min(1.3,innerWidth/1100));cv.width=innerWidth*DPR;cv.height=innerHeight*DPR}
function startWorld(){cv=document.getElementById('cv');g=cv.getContext('2d');GR=buildGround();resize();addEventListener('resize',resize);
 const tp=toScreen(P.x,P.y,20);CAM.x=tp.x;CAM.y=tp.y;
 addEventListener('keydown',e=>{const k=e.key.toLowerCase();K[k]=1;if(k==='e')interact();if(k==='escape')UI.close();if(k.startsWith('arrow'))e.preventDefault()});addEventListener('keyup',e=>K[e.key.toLowerCase()]=0);
 let dn=null;cv.addEventListener('pointerdown',e=>{dn={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,mv:0}});
 cv.addEventListener('pointermove',e=>{if(!dn)return;if(dn.mv||Math.hypot(e.clientX-dn.sx,e.clientY-dn.sy)>8){dn.mv=1;CAM.ox=Math.max(-500,Math.min(500,CAM.ox-(e.clientX-dn.x)/Z));CAM.oy=Math.max(-300,Math.min(300,CAM.oy-(e.clientY-dn.y)/Z));dn.x=e.clientX;dn.y=e.clientY}});
 cv.addEventListener('pointerup',e=>{if(dn&&!dn.mv&&!UI.isOpen()){const sx=(e.clientX-innerWidth/2)/Z+CAM.x,sy=(e.clientY-innerHeight/2)/Z+CAM.y;let best=null,bd=1e9;
  things().forEach(t=>{const a=toScreen(t.x,t.y,t.hz),d=Math.hypot(a.x-sx,a.y-sy);if(d<t.hit&&d<bd){bd=d;best=t}});
  if(best){if(Math.hypot(best.x-P.x,best.y-P.y)<=best.r)best.fn();else toast({ok:0,msg:'Podejdź bliżej: '+best.label})}}dn=null});
 const joy=document.getElementById('joy'),st=document.getElementById('stick');let jp=null;
 const jm=e=>{const b=joy.getBoundingClientRect(),x=e.clientX-b.left-60,y=e.clientY-b.top-60,d=Math.min(1,Math.hypot(x,y)/50),a=Math.atan2(y,x);J.x=Math.cos(a)*d;J.y=Math.sin(a)*d;st.style.transform=`translate(${J.x*40}px,${J.y*40}px)`};
 joy.addEventListener('pointerdown',e=>{jp=e.pointerId;joy.setPointerCapture(jp);jm(e)});joy.addEventListener('pointermove',e=>{if(jp===e.pointerId)jm(e)});
 const je=()=>{jp=null;J.x=J.y=0;st.style.transform=''};joy.addEventListener('pointerup',je);joy.addEventListener('pointercancel',je);
 document.getElementById('eBtn').addEventListener('pointerdown',e=>{e.preventDefault();interact()});requestAnimationFrame(loop)}
