// Izometria: logika i kolizje zostają w płaskich współrzędnych świata, tu tylko przekształcenie do rysowania.
const ISO={kx:.7,ky:.35};
const CAM={x:0,y:0,ox:0,oy:0};
const toScreen=(x,y,z=0)=>({x:(x-y)*ISO.kx,y:(x+y)*ISO.ky-z});
const toWorld=(sx,sy)=>{const a=sx/ISO.kx,b=sy/ISO.ky;return{x:(a+b)/2,y:(b-a)/2}};
function shade(hex,f){const n=parseInt(hex.slice(1),16),k=v=>Math.max(0,Math.min(255,v*f))|0;return`rgb(${k(n>>16)},${k((n>>8)&255)},${k(n&255)})`}
function poly(g,pts,fill){g.beginPath();pts.forEach((p,i)=>{const s=toScreen(p[0],p[1],p[2]);i?g.lineTo(s.x,s.y):g.moveTo(s.x,s.y)});g.closePath();g.fillStyle=fill;g.fill()}
// Bryła: prawa ściana (ciemna), przednia (średnia), góra (jasna). Światło pada z lewej-góry.
function box(g,x,y,w,d,h,col,z0=0){const z1=z0+h;
 poly(g,[[x+w,y,z0],[x+w,y+d,z0],[x+w,y+d,z1],[x+w,y,z1]],shade(col,.68));
 poly(g,[[x,y+d,z0],[x+w,y+d,z0],[x+w,y+d,z1],[x,y+d,z1]],shade(col,.88));
 poly(g,[[x,y,z1],[x+w,y,z1],[x+w,y+d,z1],[x,y+d,z1]],shade(col,1.12))}
// Prostokąt na ścianie bryły b={x,y,w,d}: 'L' = ściana przednia (u wzdłuż x), 'R' = prawa (u wzdłuż y); v0,v1 = wysokość bezwzględna.
function wall(g,b,side,u0,u1,v0,v1,col,e=.5){
 if(side==='L')poly(g,[[b.x+u0,b.y+b.d+e,v0],[b.x+u1,b.y+b.d+e,v0],[b.x+u1,b.y+b.d+e,v1],[b.x+u0,b.y+b.d+e,v1]],col);
 else poly(g,[[b.x+b.w+e,b.y+u0,v0],[b.x+b.w+e,b.y+u1,v0],[b.x+b.w+e,b.y+u1,v1],[b.x+b.w+e,b.y+u0,v1]],col)}
// Sprite: rysuje obiekt (lokalny początek = (0,0)) raz do bufora w 2x rozdzielczości.
function makeSprite(w,d,h,draw,pad=16,res=2){const minX=-d*ISO.kx-pad,maxX=w*ISO.kx+pad,minY=-h-pad,maxY=(w+d)*ISO.ky+pad,c=document.createElement('canvas');
 c.width=Math.ceil((maxX-minX)*res);c.height=Math.ceil((maxY-minY)*res);const g=c.getContext('2d');g.scale(res,res);g.translate(-minX,-minY);draw(g);return{c,ax:-minX,ay:-minY,res}}
function blit(g,sp,wx,wy){const s=toScreen(wx,wy);g.drawImage(sp.c,s.x-sp.ax,s.y-sp.ay,sp.c.width/sp.res,sp.c.height/sp.res)}
// Sortowanie głębokości: obiekt A jest "za" B, gdy leży całkowicie po stronie mniejszego x lub y.
function depthSort(it){const out=[],vis=new Set(),bh=(a,b)=>a.x1<=b.x0+.01||a.y1<=b.y0+.01;
 const visit=o=>{if(vis.has(o))return;vis.add(o);it.forEach(p=>{if(p!==o&&!vis.has(p)&&bh(p,o)&&!bh(o,p))visit(p)});out.push(o)};
 it.slice().sort((a,b)=>(a.x0+a.x1+a.y0+a.y1)-(b.x0+b.x1+b.y0+b.y1)).forEach(visit);return out}
