// Night Walk : the rainy 7-Eleven street corner (scene licensed by Dark Emperium), with first-person walking,
// shopping, the upstairs flat and the surrounding streets. javascript/night-walk.js loads this file only when the
// visitor launches the scene, then calls nightWalkBoot(host) with the canvas and a small bridge back to the page.
window.nightWalkBoot=function(host){
// window/document listeners are tracked so stopping the scene removes them; keys only reach the scene while it has focus
const addEventListener=(t,f,o)=>{const g=t==='keydown'||t==='keyup'?e=>{if(host.keys())f(e)}:f;window.addEventListener(t,g,o);host.track(()=>window.removeEventListener(t,g,o))};
const docOn=(t,f,o)=>{document.addEventListener(t,f,o);host.track(()=>document.removeEventListener(t,f,o))};
window.__pause=false;
const LOGO7_SRC='data:image/png;base64,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';
let LOGO7;
new Promise(res=>{const i=new Image();i.onload=()=>{LOGO7=i;res()};i.onerror=res;i.src=LOGO7_SRC}).then(()=>{

// ================= Texture atlas (all signage, products, posters drawn procedurally) =================
const AS=4096,ASH=6144;const atlasCanvas=document.createElement('canvas');atlasCanvas.width=AS;atlasCanvas.height=ASH;
const AX=atlasCanvas.getContext('2d');AX.fillStyle='#808080';AX.fillRect(0,0,AS,ASH);
const JP='"Hiragino Sans","Hiragino Kaku Gothic ProN","Yu Gothic","YuGothic","Meiryo","Noto Sans CJK JP","Noto Sans JP",sans-serif';
let packX=4,packY=4,packH=0;const R={};
function alloc(name,w,h,fn){if(packX+w+4>AS){packX=4;packY+=packH+6;packH=0}const x=packX,y=packY;packX+=w+6;packH=Math.max(packH,h);AX.save();AX.translate(x,y);AX.beginPath();AX.rect(0,0,w,h);AX.clip();fn(AX,w,h);AX.restore();R[name]=[(x+.5)/AS,1-(y+h-.5)/ASH,(x+w-.5)/AS,1-(y+.5)/ASH];return R[name]}
let rs=7;function rnd(){rs=(rs*16807)%2147483647;return (rs-1)/2147483646}
function pick(a){return a[Math.floor(rnd()*a.length)]}
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
const PACK=['#e8402f','#f2b705','#2a7de1','#1fa35a','#f07c1b','#d93a8c','#ffffff','#7a3fc0','#13a3b5','#c8102e','#ffd23f','#3d5afe','#ff6f61','#00a676','#f4f1de','#e94f37','#393e41','#44bba4'];
function products(c,w,h,rows,opt={}){c.fillStyle=opt.bg||'#e9e6df';c.fillRect(0,0,w,h);const rh=h/rows;
 for(let r=0;r<rows;r++){const y0=r*rh;c.fillStyle=opt.back||'#d8d4cc';c.fillRect(0,y0,w,rh);
  let x=2;while(x<w-4){const iw=(opt.small?8:12)+rnd()*(opt.small?12:26),ih=rh*(0.45+rnd()*0.42);const col=pick(PACK);const n=1+Math.floor(rnd()*3);
   for(let k=0;k<n&&x<w-4;k++){const yy=y0+rh-10-ih;const g=c.createLinearGradient(x,0,x+iw,0);g.addColorStop(0,col);g.addColorStop(.5,shade(col,25));g.addColorStop(1,shade(col,-25));c.fillStyle=g;
    if(opt.bottles&&rnd()<.7){rr(c,x+1,yy,iw-2,ih,iw*.3);c.fill();c.fillStyle=shade(col,-40);c.fillRect(x+iw*.32,yy-6,iw*.36,7);c.fillStyle='rgba(255,255,255,.85)';c.fillRect(x+2,yy+ih*.35,iw-4,ih*.3);c.fillStyle=pick(PACK);c.fillRect(x+3,yy+ih*.42,iw-6,ih*.08)}
    else{c.fillRect(x,yy,iw-1.5,ih);c.fillStyle='rgba(255,255,255,'+(0.5+rnd()*.5)+')';c.fillRect(x+2,yy+ih*(.2+rnd()*.3),iw-5,ih*.18);c.fillStyle=pick(PACK);c.fillRect(x+2,yy+ih*.62,iw-5,ih*.1);c.fillStyle='rgba(255,255,255,.35)';c.fillRect(x,yy,2,ih)}
    x+=iw}x+=1+rnd()*3}
  c.fillStyle='#f6f6f2';c.fillRect(0,y0+rh-10,w,10);for(let px=6;px<w;px+=34+rnd()*20){c.fillStyle=rnd()<.25?'#ffe14d':'#ffffff';c.fillRect(px,y0+rh-9,20,8);c.fillStyle='#d22';c.fillRect(px+3,y0+rh-6,8,2)}
  c.fillStyle='rgba(0,0,0,.25)';c.fillRect(0,y0+rh-11,w,1.5)}}
function shade(hex,p){let n=parseInt(hex.slice(1),16),r=(n>>16)+p,g=(n>>8&255)+p,b=(n&255)+p;r=Math.max(0,Math.min(255,r));g=Math.max(0,Math.min(255,g));b=Math.max(0,Math.min(255,b));return 'rgb('+r+','+g+','+b+')'}
function txt(c,s,x,y,size,color,weight='bold',align='center',font=JP){c.font=weight+' '+size+'px '+font;c.fillStyle=color;c.textAlign=align;c.textBaseline='middle';c.fillText(s,x,y)}
function logo(c,cx,cy,s,bg='#ffffff',fg='#1747b5'){c.fillStyle=bg;rr(c,cx-s/2,cy-s/2,s,s,s*.12);c.fill();c.strokeStyle=fg;c.lineWidth=s*.05;rr(c,cx-s*.42,cy-s*.42,s*.84,s*.84,s*.1);c.stroke();
 c.fillStyle=fg;c.beginPath();c.arc(cx,cy-s*.03,s*.26,0,Math.PI*2);c.fill();c.fillStyle=bg;c.beginPath();c.arc(cx+s*.12,cy-s*.12,s*.22,0,Math.PI*2);c.fill();
 c.fillStyle=fg;for(let i=0;i<3;i++){c.beginPath();c.arc(cx-s*.2+i*s*.2,cy+s*.3,s*.035,0,7);c.fill()}}
// ---- main signage ----
// ---- 7-Eleven logo & stripes (modelled after reference photo) ----
const C7O='#fe9b1a',C7G='#007e5f',C7R='#ea2933';
// draw original logo image (white box) centred
function seven(c,cx,cy,s,bg=true){const im=LOGO7;const h=s,w=h*im.width/im.height;if(bg){c.fillStyle='#ffffff';c.fillRect(cx-w/2-s*.05,cy-h/2,w+s*.1,h)}c.drawImage(im,cx-w/2,cy-h/2,w,h)}
// original stripe proportions: orange 14 / white 6 / green 37 / white 5 / red 14  (of 76)
// measured from original artwork: orange 76 / gap 29 / green 133 / gap 27 / red 76 (of 341)
function stripes(c,w,y,H){const k=H/341;c.fillStyle=C7O;c.fillRect(0,y,w,76*k);c.fillStyle=C7G;c.fillRect(0,y+105*k,w,133*k);c.fillStyle=C7R;c.fillRect(0,y+265*k,w,76*k)}
function fascia(c,w,h,logoX){c.fillStyle='#ffffff';c.fillRect(0,0,w,h);const H=h*.84,y=(h-H)/2;stripes(c,w,y,H);
 c.fillStyle='rgba(0,0,0,.10)';for(let x=w/8;x<w;x+=w/8)c.fillRect(x,0,2,h);
 if(logoX!=null){const lh=H,lw=lh*LOGO7.width/LOGO7.height,gap=H*38/341;c.fillStyle='#ffffff';c.fillRect(logoX-lw/2-gap,0,lw+gap*2,h);c.drawImage(LOGO7,logoX-lw/2,y,lw,lh)}
 const sg=c.createLinearGradient(0,0,0,h);sg.addColorStop(0,'rgba(0,0,0,.05)');sg.addColorStop(.5,'rgba(0,0,0,0)');sg.addColorStop(1,'rgba(0,0,0,.08)');c.fillStyle=sg;c.fillRect(0,0,w,h)}
alloc('signFront',2400,240,(c,w,h)=>fascia(c,w,h,w*.5));
alloc('signSide',1500,240,(c,w,h)=>fascia(c,w,h,w*.35));
alloc('poleSign',300,1000,(c,w,h)=>{c.fillStyle='#f4f4f0';c.fillRect(0,0,w,h);c.fillStyle=C7O;c.fillRect(w-22,0,10,560);c.fillStyle=C7G;c.fillRect(w-12,0,6,560);c.fillStyle=C7R;c.fillRect(w-6,0,6,560);
 seven(c,w/2-8,260,330,false);
 c.fillStyle=C7R;c.fillRect(10,580,w-20,400);c.fillStyle='#ffffff';c.fillRect(18,588,w-36,190);c.fillStyle=C7G;c.fillRect(22,592,92,182);txt(c,'酒',68,684,80,'#ffffff','900');txt(c,'たばこ',w/2+50,684,58,C7R,'900');
 txt(c,'銀行',w/2-55,880,64,'#ffffff','900');txt(c,'ATM',w/2+75,880,64,'#ffffff','900','center','Arial Black')});
alloc('poleSignBack',300,1000,(c,w,h)=>{c.fillStyle='#ecece8';c.fillRect(0,0,w,h);seven(c,w/2,260,330,false)});
// ---- interior ----
for(let i=0;i<4;i++)alloc('prod'+i,1024,512,(c,w,h)=>products(c,w,h,4));
alloc('prodLow',1024,256,(c,w,h)=>products(c,w,h,2));
alloc('snack',1024,512,(c,w,h)=>products(c,w,h,4,{bg:'#f1ece3'}));
alloc('fridge',1024,512,(c,w,h)=>{c.fillStyle='#f7fbff';c.fillRect(0,0,w,h);products(c,w,h,5,{bottles:true,bg:'#eef6ff',back:'#e4eef8'});const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,255,255,.25)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(0,0,w,h);
 for(let x=0;x<w;x+=w/6){c.fillStyle='#9aa4ad';c.fillRect(x,0,8,h);c.fillStyle='#c9d0d6';c.fillRect(x+w/6-22,h*.35,6,h*.3)}});
alloc('fridgeTop',1024,64,(c,w,h)=>{c.fillStyle=C7G;c.fillRect(0,0,w,h);c.fillStyle=C7O;c.fillRect(0,0,w,6);c.fillStyle=C7R;c.fillRect(0,6,w,4);txt(c,'冷たいお飲みもの  COLD DRINKS  冷たいお飲みもの',w/2,h/2+4,36,'#ffffff')});
alloc('mags',1024,192,(c,w,h)=>{c.fillStyle='#dcd8d0';c.fillRect(0,0,w,h);let x=4;while(x<w){const iw=44+rnd()*20;c.fillStyle=pick(PACK);c.fillRect(x,8+rnd()*10,iw-4,h-30);c.fillStyle='rgba(255,255,255,.8)';c.fillRect(x+4,20,iw-12,14);c.fillStyle=pick(['#fbd','#ffe','#ddf']);c.beginPath();c.arc(x+iw/2,h*.55,iw*.28,0,7);c.fill();x+=iw}c.fillStyle='#bbb';c.fillRect(0,h-16,w,16)});
alloc('cig',512,256,(c,w,h)=>{c.fillStyle='#2b2f36';c.fillRect(0,0,w,h);for(let r=0;r<5;r++)for(let k=0;k<20;k++){c.fillStyle=pick(PACK);c.fillRect(6+k*25,8+r*50,20,34);c.fillStyle='#fff';c.fillRect(8+k*25,30+r*50,16,6)}});
alloc('menu',1024,160,(c,w,h)=>{c.fillStyle='#14213d';c.fillRect(0,0,w,h);const items=['ホットコーヒー','カフェラテ','おでん','からあげ','肉まん'];items.forEach((s,i)=>{const x=20+i*200;c.fillStyle=['#7b4a2a','#c69c6d','#e2b04a','#e07a2f','#f3e3c8'][i];c.beginPath();c.arc(x+90,58,40,0,7);c.fill();txt(c,s,x+90,128,26,'#ffffff')})});
alloc('oden',256,128,(c,w,h)=>{c.fillStyle='#6b4a23';c.fillRect(0,0,w,h);for(let i=0;i<4;i++){c.fillStyle='#8a6232';c.fillRect(4+i*63,4,58,h-8)}for(let i=0;i<22;i++){c.fillStyle=pick(['#f2d7a0','#e8c27a','#fff3d6','#c98b4a','#e9e0c9']);c.beginPath();c.arc(14+rnd()*228,14+rnd()*100,8+rnd()*8,0,7);c.fill()}});
alloc('ceilingPOP',512,96,(c,w,h)=>{c.fillStyle='#ffde00';c.fillRect(0,0,w,h);txt(c,'あったか おでん 始めました',w/2,h/2,44,'#c8102e','900')});
alloc('ceilingPOP2',512,96,(c,w,h)=>{c.fillStyle='#ffffff';c.fillRect(0,0,w,h);c.fillStyle='#1747b5';c.fillRect(0,0,w,14);c.fillRect(0,h-14,w,14);txt(c,'ポイント 2倍 キャンペーン',w/2,h/2,40,'#1747b5','900')});
// ---- posters ----
alloc('poster0',256,360,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#ffcf3f');g.addColorStop(1,'#ff7b29');c.fillStyle=g;c.fillRect(0,0,w,h);txt(c,'新発売',w/2,50,58,'#c8102e','900');c.fillStyle='#fff';c.beginPath();c.moveTo(w/2,110);c.lineTo(w/2+80,250);c.lineTo(w/2-80,250);c.closePath();c.fill();c.fillStyle='#1d1d1d';c.fillRect(w/2-50,205,100,45);txt(c,'こだわりおにぎり',w/2,300,26,'#5a1a00');txt(c,'¥160',w/2,336,30,'#c8102e','900')});
alloc('poster1',256,360,(c,w,h)=>{c.fillStyle='#2b1a10';c.fillRect(0,0,w,h);c.fillStyle='#f2e6d0';c.beginPath();c.ellipse(w/2,190,70,20,0,0,7);c.fill();c.fillStyle='#e9e4dc';c.fillRect(w/2-55,110,110,80);c.fillStyle='#6b3b1d';c.beginPath();c.ellipse(w/2,112,55,12,0,0,7);c.fill();txt(c,'淹れたて',w/2,40,44,'#f2e6d0','900');txt(c,'セブンカフェ',w/2,260,34,'#e8b56b','900');txt(c,'ホット ¥120',w/2,310,30,'#ffffff')});
alloc('poster2',256,360,(c,w,h)=>{c.fillStyle='#e6f3ff';c.fillRect(0,0,w,h);c.fillStyle='#1747b5';c.fillRect(0,0,w,80);txt(c,'夜食フェア',w/2,42,46,'#fff','900');for(let i=0;i<4;i++){c.fillStyle=pick(PACK);c.beginPath();c.arc(64+(i%2)*128,150+Math.floor(i/2)*110,44,0,7);c.fill()}txt(c,'あたたかい一品を',w/2,335,26,'#1747b5')});
alloc('poster3',256,360,(c,w,h)=>{c.fillStyle='#ffffff';c.fillRect(0,0,w,h);c.fillStyle='#d6002a';c.fillRect(0,0,w,h*.45);txt(c,'ポイント',w/2,60,44,'#fff','900');txt(c,'2倍',w/2,130,80,'#ffe14d','900');txt(c,'毎週金曜日',w/2,230,34,'#d6002a','900');txt(c,'nanaco 対象',w/2,290,26,'#333')});
alloc('banner',200,640,(c,w,h)=>{c.fillStyle='#f7f3ea';c.fillRect(0,0,w,h);c.fillStyle='#c8102e';c.fillRect(0,0,w,18);c.fillRect(0,h-18,w,18);c.font='900 64px '+JP;c.fillStyle='#1a1a1a';c.textAlign='center';['お','で','ん'].forEach((s,i)=>c.fillText(s,w/2,100+i*78));
 c.fillStyle='#8a5a2b';c.fillRect(w/2-4,350,8,230);[['#f2d7a0',390],['#fff3d6',450],['#c98b4a',510]].forEach(([col,y])=>{c.fillStyle=col;c.beginPath();c.arc(w/2,y,34,0,7);c.fill()});txt(c,'70円〜',w/2,610,34,'#c8102e','900')});
alloc('openDecal',256,96,(c,w,h)=>{c.fillStyle=C7G;c.fillRect(0,0,w,h);c.fillStyle=C7O;c.fillRect(0,h-14,w,7);c.fillStyle=C7R;c.fillRect(0,h-7,w,7);txt(c,'OPEN 24h',w/2,h/2-4,50,'#ffffff','900','center','Arial')});
alloc('doorDecal',256,64,(c,w,h)=>{c.fillStyle=C7G;c.fillRect(0,0,w,h);txt(c,'← 自動ドア →',w/2,h/2,30,'#ffffff')});
// ---- exterior props ----
alloc('vend0',320,640,(c,w,h)=>{c.fillStyle='#0f3fb0';c.fillRect(0,0,w,h);c.fillStyle='#eaf2ff';c.fillRect(16,16,w-32,370);for(let r=0;r<4;r++){for(let k=0;k<6;k++){const x=26+k*46,y=26+r*90;c.fillStyle=pick(PACK);rr(c,x+6,y+8,30,60,8);c.fill();c.fillStyle='#fff';c.fillRect(x+9,y+34,24,12);c.fillStyle='#222';c.fillRect(x+4,y+72,36,10);c.fillStyle='#4f4';c.fillRect(x+8,y+74,6,6)}}
 c.fillStyle='#0a2a7a';c.fillRect(16,396,w-32,100);txt(c,'COOL',w/2,430,48,'#ffffff','900','center','Arial');txt(c,'つめた〜い',w/2,474,28,'#9cf');c.fillStyle='#071a4d';c.fillRect(40,540,240,70);c.fillStyle='#333';c.fillRect(250,420,30,60)});
alloc('vend1',320,640,(c,w,h)=>{c.fillStyle='#f2f2f2';c.fillRect(0,0,w,h);c.fillStyle='#c8102e';c.fillRect(0,0,w,40);c.fillStyle='#fffaf0';c.fillRect(16,50,w-32,340);for(let r=0;r<4;r++){for(let k=0;k<6;k++){const x=26+k*46,y=60+r*82;c.fillStyle=pick(PACK);c.fillRect(x+8,y+8,28,54);c.fillStyle='#fff';c.fillRect(x+10,y+26,24,12);c.fillStyle='#222';c.fillRect(x+4,y+66,36,10);c.fillStyle=k%3?'#f44':'#4f4';c.fillRect(x+8,y+68,6,6)}}
 c.fillStyle='#c8102e';c.fillRect(16,400,w-32,100);txt(c,'HOT & COLD',w/2,450,40,'#fff','900','center','Arial');c.fillStyle='#444';c.fillRect(40,540,240,70)});
alloc('aframe',200,300,(c,w,h)=>{c.fillStyle='#23302a';c.fillRect(0,0,w,h);c.strokeStyle='#8a6a40';c.lineWidth=14;c.strokeRect(0,0,w,h);txt(c,'本日の',w/2,50,30,'#f5f5f0');txt(c,'おすすめ',w/2,90,34,'#ffe36e','900');c.strokeStyle='#f5f5f0';c.lineWidth=3;c.beginPath();c.arc(w/2,160,28,0,Math.PI);c.stroke();c.strokeRect(w/2-28,130,56,30);txt(c,'ホット珈琲',w/2,220,26,'#f5f5f0');txt(c,'¥120',w/2,260,30,'#ff9e9e','900')});
alloc('street',512,128,(c,w,h)=>{c.fillStyle='#16418f';rr(c,0,0,w,h,14);c.fill();c.strokeStyle='#fff';c.lineWidth=6;rr(c,8,8,w-16,h-16,10);c.stroke();txt(c,'ほたる通り',w/2,52,56,'#fff','900');txt(c,'Hotaru-dori',w/2,100,28,'#fff','bold','center','Arial')});
alloc('park',160,300,(c,w,h)=>{c.fillStyle='#1747b5';c.fillRect(0,0,w,h);c.fillStyle='#fff';c.fillRect(10,10,w-20,150);txt(c,'P',w/2,88,130,'#1747b5','900','center','Arial');c.fillStyle='#ffe14d';c.fillRect(10,170,w-20,50);txt(c,'24h',w/2,196,40,'#1a1a1a','900','center','Arial');c.fillStyle='#00b050';c.fillRect(10,230,w-20,60);txt(c,'空',w/2,262,48,'#fff','900')});
alloc('oneway',96,300,(c,w,h)=>{c.fillStyle='#1747b5';c.fillRect(0,0,w,h);c.fillStyle='#fff';c.beginPath();c.moveTo(w/2,20);c.lineTo(w-14,90);c.lineTo(w/2+12,90);c.lineTo(w/2+12,170);c.lineTo(w/2-12,170);c.lineTo(w/2-12,90);c.lineTo(14,90);c.closePath();c.fill();c.font='900 40px '+JP;c.textAlign='center';['一','通','行'].forEach((s,i)=>c.fillText(s,w/2,205+i*0+i*30))});
alloc('win2f',512,512,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#ffcf8a');g.addColorStop(1,'#d98a3e');c.fillStyle=g;c.fillRect(0,0,w,h);c.fillStyle='rgba(120,60,20,.5)';c.fillRect(0,h*.62,w*.4,h*.38);c.fillStyle='rgba(60,30,10,.55)';c.fillRect(w*.6,h*.45,w*.3,h*.55);
 for(let y=0;y<h*.55;y+=18){c.fillStyle='rgba(255,240,210,.85)';c.fillRect(0,y,w,13);c.fillStyle='rgba(120,70,30,.3)';c.fillRect(0,y+13,w,2)}c.fillStyle='rgba(255,255,230,.9)';c.beginPath();c.arc(w*.75,h*.7,30,0,7);c.fill()});
alloc('win2fb',512,512,(c,w,h)=>{const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#ffe2b0');g.addColorStop(1,'#c47a3a');c.fillStyle=g;c.fillRect(0,0,w,h);c.fillStyle='rgba(250,235,215,.92)';c.fillRect(0,0,w*.28,h);c.fillRect(w*.72,0,w*.28,h);c.fillStyle='rgba(80,40,20,.5)';c.fillRect(w*.35,h*.55,w*.3,h*.45);c.fillStyle='#2e6b3a';c.beginPath();c.arc(w*.5,h*.48,50,0,7);c.fill()});
alloc('winDark',256,256,(c,w,h)=>{c.fillStyle='#1b2433';c.fillRect(0,0,w,h);c.fillStyle='rgba(120,140,170,.15)';c.fillRect(0,0,w,h*.5);c.fillStyle='#2a3446';for(let y=0;y<h;y+=14)c.fillRect(0,y,w,2)});
alloc('winWarmSmall',256,256,(c,w,h)=>{c.fillStyle='#f4b866';c.fillRect(0,0,w,h);c.fillStyle='rgba(255,250,235,.9)';c.fillRect(0,0,w*.35,h);c.fillStyle='rgba(90,50,20,.4)';c.fillRect(w*.5,h*.6,w*.4,h*.4)});
alloc('notice',512,320,(c,w,h)=>{c.fillStyle='#4a3a2a';c.fillRect(0,0,w,h);c.fillStyle='#b8a888';c.fillRect(10,10,w-20,h-20);for(let i=0;i<7;i++){const x=20+rnd()*(w-150),y=20+rnd()*(h-140);c.fillStyle=pick(['#fffdf5','#ffe','#eef8ff','#ffeef0']);c.save();c.translate(x+60,y+60);c.rotate((rnd()-.5)*.15);c.fillRect(-60,-60,120,130);c.fillStyle='#555';for(let l=0;l<6;l++)c.fillRect(-50,-45+l*16,80+rnd()*20,4);c.fillStyle='#c33';c.beginPath();c.arc(0,-56,5,0,7);c.fill();c.restore()}});
alloc('wallText',1024,256,(c,w,h)=>{c.fillStyle='#b9b5ac';c.fillRect(0,0,w,h);txt(c,'夜も、ちいさな灯りがある。',w/2,h/2,64,'rgba(40,40,45,.75)','bold')});
alloc('plinth',2048,128,(c,w,h)=>{c.fillStyle='#808080';c.fillRect(0,0,w,h);txt(c,'雨の夜、灯りのある場所。',w*.74,h/2,56,'#b4b4b4','normal')});
alloc('mat',512,192,(c,w,h)=>{c.fillStyle=C7G;c.fillRect(0,0,w,h);c.strokeStyle='#ffffff';c.lineWidth=6;c.strokeRect(12,12,w-24,h-24);stripes(c,w,h-46,8);seven(c,w/2,h/2-8,h*.62)});
alloc('binL',128,128,(c,w,h)=>{c.fillStyle='#1747b5';c.fillRect(0,0,w,h);c.fillStyle='#fff';c.beginPath();c.arc(w/2,h/2,40,0,7);c.fill();txt(c,'缶',w/2,h/2,44,'#1747b5','900')});
alloc('binL2',128,128,(c,w,h)=>{c.fillStyle='#1747b5';c.fillRect(0,0,w,h);c.fillStyle='#fff';c.beginPath();c.arc(w/2,h/2,40,0,7);c.fill();txt(c,'ペット',w/2,h/2,30,'#1747b5','900')});
alloc('binL3',128,128,(c,w,h)=>{c.fillStyle='#1747b5';c.fillRect(0,0,w,h);c.fillStyle='#fff';c.beginPath();c.arc(w/2,h/2,40,0,7);c.fill();txt(c,'もえる',w/2,h/2,28,'#1747b5','900')});
alloc('manhole',256,256,(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#777';c.beginPath();c.arc(w/2,h/2,124,0,7);c.fill();c.fillStyle='#4a4a4a';c.beginPath();c.arc(w/2,h/2,112,0,7);c.fill();c.strokeStyle='#888';c.lineWidth=5;for(let r=20;r<110;r+=16){c.beginPath();c.arc(w/2,h/2,r,0,7);c.stroke()}for(let a=0;a<12;a++){c.beginPath();c.moveTo(w/2,h/2);c.lineTo(w/2+110*Math.cos(a*.5236),h/2+110*Math.sin(a*.5236));c.stroke()}});
alloc('grate',256,96,(c,w,h)=>{c.fillStyle='#555';c.fillRect(0,0,w,h);c.fillStyle='#0a0a0a';for(let x=8;x<w-8;x+=12)c.fillRect(x,8,7,h-16)});
alloc('neighborSign',512,160,(c,w,h)=>{c.fillStyle='#f5ecd8';c.fillRect(0,0,w,h);c.strokeStyle='#7a4a1a';c.lineWidth=8;c.strokeRect(4,4,w-8,h-8);txt(c,'喫茶 ほたる',w/2,h/2,72,'#5a2a0a','900')});
alloc('noren',256,128,(c,w,h)=>{c.fillStyle='#1d2b4f';c.fillRect(0,0,w,h);c.fillStyle='#0e1730';for(let x=w/4;x<w;x+=w/4)c.fillRect(x-2,30,4,h);txt(c,'ゆ',w/2,60,70,'#f0e6d0','900')});
alloc('lantern',128,192,(c,w,h)=>{const g=c.createRadialGradient(w/2,h/2,10,w/2,h/2,90);g.addColorStop(0,'#fff4c8');g.addColorStop(1,'#e8902e');c.fillStyle=g;c.fillRect(0,0,w,h);c.fillStyle='rgba(120,40,0,.4)';for(let y=10;y<h;y+=20)c.fillRect(0,y,w,2);txt(c,'灯',w/2,h/2,64,'#7a1a00','900')});
// ---- AE86 decals ----
alloc('tofu',640,96,(c,w,h)=>{c.fillStyle='#f2f2ee';c.fillRect(0,0,w,h);txt(c,'藤原とうふ店',w*.4,h*.52,66,'#141414','900');txt(c,'（自家用）',w*.86,h*.6,30,'#141414','bold')});
alloc('trueno',256,48,(c,w,h)=>{c.fillStyle='#101113';c.fillRect(0,0,w,h);for(let x=6;x<w;x+=8){c.fillStyle='#1d1f22';c.fillRect(x,4,4,h-8)}c.fillStyle='#101113';c.fillRect(w*.3,10,w*.4,h-20);txt(c,'TRUENO',w/2,h/2+1,22,'#e8e8e8','900','center','Arial')});
alloc('plate',256,128,(c,w,h)=>{c.fillStyle='#f4f4ee';c.fillRect(0,0,w,h);c.strokeStyle='#2d6a3e';c.lineWidth=6;c.strokeRect(5,5,w-10,h-10);txt(c,'群馬 50',w/2,32,30,'#1f5a32','900');txt(c,'は',34,86,34,'#1f5a32','900');txt(c,'86-86',w*.58,84,62,'#1f5a32','900','center','Arial')});
alloc('hlens',256,128,(c,w,h)=>{const g=c.createRadialGradient(w/2,h/2,4,w/2,h/2,w*.55);g.addColorStop(0,'#ffffff');g.addColorStop(.35,'#fff1d2');g.addColorStop(1,'#8a7a62');c.fillStyle=g;c.fillRect(0,0,w,h);c.fillStyle='rgba(120,100,70,.35)';for(let y=8;y<h;y+=10)c.fillRect(0,y,w,2);for(let x=10;x<w;x+=18)c.fillRect(x,0,1.5,h);c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=3;c.strokeRect(3,3,w-6,h-6)});
alloc('gauge',256,96,(c,w,h)=>{c.fillStyle='#050505';c.fillRect(0,0,w,h);[[60,48,38],[140,48,42],[214,48,30]].forEach(([x,y,r])=>{c.strokeStyle='#ff9a3a';c.lineWidth=3;c.beginPath();c.arc(x,y,r,2.4,7.0);c.stroke();for(let k=0;k<9;k++){const a=2.4+k*.575;c.fillStyle='#ffd08a';c.fillRect(x+Math.cos(a)*(r-6)-1,y+Math.sin(a)*(r-6)-1,3,3)}c.strokeStyle='#ff3a1a';c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(3.4)*r*.8,y+Math.sin(3.4)*r*.8);c.stroke()})});
// ---- NEW detail pack: product packages, price rails, category signs, vending art ----
const PKW=['ポテト','のり塩','コンソメ','えびせん','チョコ','ビスケ','カレー','うどん','しお味','醤油','グミ','ラムネ','せんべい','クッキー','ナッツ','ポップ'];
for(let i=0;i<16;i++)alloc('pkg'+i,96,128,(c,w,h)=>{const col=PACK[(i*5)%PACK.length];const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,shade(col,35));g.addColorStop(1,shade(col,-35));c.fillStyle=g;c.fillRect(0,0,w,h);
 c.fillStyle='rgba(255,255,255,.92)';c.beginPath();c.ellipse(w/2,h*.62,w*.37,h*.2,0,0,7);c.fill();
 c.fillStyle=pick(['#f2c14e','#c98b4a','#e8402f','#7a3b1d','#9bc53d']);for(let k=0;k<4;k++){c.beginPath();c.arc(w*.3+k*w*.13,h*.63+(k%2)*6,9,0,7);c.fill()}
 c.fillStyle='rgba(0,0,0,.25)';c.fillRect(0,0,w,14);c.fillStyle='rgba(255,255,255,.35)';c.fillRect(0,h-12,w,12);
 txt(c,PKW[i],w/2,h*.3,PKW[i].length>3?19:24,col==='#ffffff'||col==='#f4f1de'?'#c8102e':'#ffffff','900');txt(c,'NEW',w*.8,8,10,'#ffe14d','900','center','Arial');c.fillStyle='rgba(255,255,255,.3)';c.fillRect(6,0,4,h)});
alloc('priceStrip',1024,32,(c,w,h)=>{c.fillStyle='#f4f4ef';c.fillRect(0,0,w,h);for(let x=4;x<w;x+=50){const y=rnd()<.25;c.fillStyle=y?'#ffe14d':'#ffffff';c.fillRect(x,3,44,h-6);c.strokeStyle='#bbb';c.lineWidth=1;c.strokeRect(x,3,44,h-6);txt(c,'¥'+(98+Math.floor(rnd()*20)*10),x+22,h/2+1,13,y?'#c8102e':'#222','900','center','Arial')}c.fillStyle='#c8102e';c.fillRect(0,0,w,2)});
const CATS=[['スナック','#e8402f'],['カップ麺','#f07c1b'],['お菓子','#d93a8c'],['日用品','#1747b5']];
CATS.forEach((cc,i)=>alloc('cat'+i,384,96,(c,w,h)=>{c.fillStyle=cc[1];c.fillRect(0,0,w,h);c.fillStyle='#fff';c.fillRect(6,6,w-12,h-12);c.fillStyle=cc[1];c.fillRect(6,6,26,h-12);txt(c,cc[0],w/2+12,h/2,50,cc[1],'900')}));
alloc('vHdr0',512,112,(c,w,h)=>{const g=c.createLinearGradient(0,0,w,0);g.addColorStop(0,'#0b2f8a');g.addColorStop(1,'#2f8bff');c.fillStyle=g;c.fillRect(0,0,w,h);for(let i=0;i<14;i++){c.fillStyle='rgba(255,255,255,'+(.08+rnd()*.12)+')';c.beginPath();c.arc(rnd()*w,rnd()*h,4+rnd()*16,0,7);c.fill()}txt(c,'COOL WATER',w*.42,h/2,54,'#ffffff','900','center','Arial');txt(c,'冷',w*.9,h/2,60,'#bfe4ff','900')});
alloc('vHdr1',512,112,(c,w,h)=>{const g=c.createLinearGradient(0,0,w,0);g.addColorStop(0,'#9c0b16');g.addColorStop(1,'#ff4a3d');c.fillStyle=g;c.fillRect(0,0,w,h);c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=5;c.beginPath();c.moveTo(0,h*.82);c.bezierCurveTo(w*.3,h*.55,w*.6,h*1.05,w,h*.7);c.stroke();txt(c,'こもれび茶房',w*.42,h/2-4,50,'#ffffff','900');txt(c,'HOT',w*.9,h*.33,26,'#ffe14d','900','center','Arial');txt(c,'COLD',w*.9,h*.7,24,'#bfe4ff','900','center','Arial')});
alloc('vAd0',512,400,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#1a56d6');g.addColorStop(1,'#0a2a7a');c.fillStyle=g;c.fillRect(0,0,w,h);for(let i=0;i<30;i++){c.fillStyle='rgba(180,220,255,'+(.1+rnd()*.25)+')';c.beginPath();c.arc(rnd()*w,rnd()*h*.6,3+rnd()*10,0,7);c.fill()}
 c.fillStyle='rgba(255,255,255,.9)';rr(c,w*.68,h*.06,64,150,22);c.fill();c.fillStyle='#2f8bff';c.fillRect(w*.68,h*.18,64,46);txt(c,'つめた〜い',w*.32,h*.14,44,'#ffffff','900');txt(c,'天然水 ¥110',w*.32,h*.3,30,'#bfe4ff','bold');txt(c,'交通系IC 使えます',w*.32,h*.45,24,'#ffe14d','bold');c.fillStyle='#071a4d';c.fillRect(0,h*.6,w,h*.4)});
alloc('vAd1',512,400,(c,w,h)=>{c.fillStyle='#f4f1ea';c.fillRect(0,0,w,h);c.fillStyle='#c8102e';c.fillRect(0,0,w,h*.14);txt(c,'あったか〜い',w/2,h*.07,40,'#ffffff','900');
 [['#6b3b1d','#e9d8a6',.1],['#2e6b3a','#d9f0c8',.4],['#b5121b','#ffffff',.7]].forEach(([a,b,x])=>{c.fillStyle=a;rr(c,w*x,h*.19,80,120,10);c.fill();c.fillStyle=b;c.fillRect(w*x,h*.26,80,40)});
 txt(c,'缶コーヒー · 緑茶 · ココア',w/2,h*.52,28,'#333','bold');c.fillStyle='#3a3a3a';c.fillRect(0,h*.6,w,h*.4)});
alloc('vSide0',256,512,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#2f8bff');g.addColorStop(1,'#0b2f8a');c.fillStyle=g;c.fillRect(0,0,w,h);c.fillStyle='rgba(255,255,255,.88)';rr(c,w*.3,h*.14,w*.4,h*.5,30);c.fill();c.fillStyle='#2f8bff';c.fillRect(w*.3,h*.3,w*.4,h*.14);txt(c,'天然水',w/2,h*.76,56,'#ffffff','900');txt(c,'COOL WATER',w/2,h*.88,30,'#bfe4ff','900','center','Arial')});
alloc('vSide1',256,512,(c,w,h)=>{c.fillStyle='#f4f1ea';c.fillRect(0,0,w,h);c.fillStyle='#c8102e';c.fillRect(0,0,w,h*.3);txt(c,'HOT',w/2,h*.15,80,'#fff','900','center','Arial');c.fillStyle='#6b3b1d';rr(c,w*.32,h*.38,w*.36,h*.42,14);c.fill();c.fillStyle='#e9d8a6';c.fillRect(w*.32,h*.48,w*.36,h*.12);txt(c,'茶房',w/2,h*.9,48,'#c8102e','900')});
alloc('vDisp',128,48,(c,w,h)=>{c.fillStyle='#120400';c.fillRect(0,0,w,h);txt(c,'¥ 000',w/2,h/2,30,'#ff4a1a','900','center','Courier New')});

// ---- reference-style vending machine textures ----
const LBL=[['COLA','#b5121b','#ffffff','#3a0d06'],['ORANGE','#f07c1b','#ffffff','#f2a93b'],['GRAPE','#6a2c91','#ffffff','#4a1a5a'],['LEMON','#f2d43a','#1a7a2e','#f7ec9a'],['緑茶','#2e7d32','#ffffff','#a8c96a'],['烏龍茶','#7a3b1d','#f2e2b0','#8a4a1a'],['天然水','#4aa3e0','#ffffff','#d8eef8'],['SPORTS','#1f6fd1','#ffffff','#dfefff'],['紅茶','#c8102e','#ffe9b0','#b5651d'],['COFFEE','#2b1a10','#e8b56b','#2b1a10'],['BLACK','#111111','#d9b56a','#111111'],['MILK','#ffffff','#1747b5','#f4f1e6'],['CIDER','#16a34a','#ffffff','#e6f7d0'],['PEACH','#f49aa8','#ffffff','#fcd9c6'],['COCOA','#5a2a12','#f6d7a7','#5a2a12'],['ENERGY','#1d1d1d','#38e04a','#1d1d1d']];
LBL.forEach((l,i)=>alloc('lbl'+i,256,96,(c,w,h)=>{c.fillStyle=l[1];c.fillRect(0,0,w,h);
 const g=c.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(0,0,0,.25)');g.addColorStop(.35,'rgba(255,255,255,.18)');g.addColorStop(.5,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(0,0,0,.3)');
 c.fillStyle=l[2];c.globalAlpha=.9;c.fillRect(0,h*.72,w,6);c.fillRect(0,h*.18,w,3);c.globalAlpha=1;
 for(let k=0;k<2;k++){const cx=w*(.25+k*.5);c.fillStyle=l[2];c.beginPath();c.ellipse(cx,h*.46,w*.2,h*.22,0,0,7);c.fill();txt(c,l[0],cx,h*.47,l[0].length>4?20:26,l[1]==='#ffffff'?'#1747b5':l[1],'900');}
 txt(c,'500ml',w*.5,h*.88,12,l[2],'bold','center','Arial');c.fillStyle=g;c.fillRect(0,0,w,h)}));
alloc('vmBack',512,384,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#bfe3ff');g.addColorStop(1,'#5aa9e6');c.fillStyle=g;c.fillRect(0,0,w,h);
 for(let i=0;i<60;i++){c.strokeStyle='rgba(255,255,255,'+(.25+rnd()*.5)+')';c.lineWidth=1+rnd()*2;c.beginPath();c.arc(rnd()*w,rnd()*h,3+rnd()*14,0,7);c.stroke()}
 c.fillStyle='rgba(255,255,255,.35)';for(let i=0;i<5;i++){c.beginPath();c.moveTo(rnd()*w,0);c.lineTo(rnd()*w,h);c.lineTo(rnd()*w,h);c.fill()}});
alloc('vmMarquee',512,48,(c,w,h)=>{c.fillStyle='#120606';c.fillRect(0,0,w,h);const msg='いらっしゃいませ  つめた〜い  あったか〜い';c.font='900 34px '+JP;c.textBaseline='middle';
 const tc=document.createElement('canvas');tc.width=w;tc.height=h;const t2=tc.getContext('2d');if(t2&&t2.fillText){t2.font=c.font;t2.fillStyle='#fff';t2.textBaseline='middle';t2.fillText(msg,8,h/2+2)}
 let d=null;try{d=t2.getImageData(0,0,w,h).data}catch(e){}
 for(let y=3;y<h;y+=5)for(let x=3;x<w;x+=5){const on=d&&d[(y*w+x)*4+3]>80;c.fillStyle=on?'#ff3a1a':'rgba(90,10,5,.6)';c.beginPath();c.arc(x,y,1.8,0,7);c.fill()}});
alloc('vmRail',512,48,(c,w,h)=>{c.fillStyle='#f6f6f2';c.fillRect(0,0,w,h);const n=9;for(let i=0;i<n;i++){const x=i*w/n;c.fillStyle='#ffffff';c.fillRect(x+3,3,w/n-6,18);c.strokeStyle='#c9c9c9';c.strokeRect(x+3,3,w/n-6,18);
 txt(c,(i%3===0?'130':i%3===1?'160':'100'),x+w/n/2,13,13,'#111','900','center','Arial');c.fillStyle='#1d5fd6';rr(c,x+w/n/2-14,26,28,16,5);c.fill();c.fillStyle='rgba(255,255,255,.6)';c.fillRect(x+w/n/2-10,28,20,3)}});
alloc('vmAd',256,256,(c,w,h)=>{c.fillStyle='#ffffff';c.fillRect(0,0,w,h);c.fillStyle='#d61f26';c.fillRect(w*.62,0,w*.38,h);c.fillRect(0,0,w,40);
 txt(c,'こもれび Drinks',w*.45,20,24,'#ffffff','900','center','Arial');c.fillStyle='#d61f26';c.beginPath();c.arc(w*.3,h*.42,40,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(w*.3,h*.42,26,0,7);c.fill();c.fillStyle='#111';c.beginPath();c.arc(w*.26,h*.4,4,0,7);c.arc(w*.34,h*.4,4,0,7);c.fill();
 txt(c,'まちの',w*.8,h*.35,26,'#fff','900');txt(c,'自販機',w*.8,h*.5,26,'#fff','900');for(let l=0;l<4;l++){c.fillStyle='#555';c.fillRect(14,h*.68+l*16,w*.5,4)}});
alloc('vmMascot',256,512,(c,w,h)=>{c.fillStyle='#e8e0cc';c.fillRect(0,0,w,h);txt(c,'まちかど',w*.85,70,22,'#2e7d32','900');
 c.fillStyle='#d61f26';c.beginPath();c.ellipse(w/2,h*.42,80,95,0,0,7);c.fill();c.strokeStyle='#d61f26';c.lineWidth=8;c.beginPath();c.moveTo(w*.38,h*.24);c.lineTo(w*.28,h*.12);c.moveTo(w*.62,h*.24);c.lineTo(w*.72,h*.12);c.stroke();
 c.fillStyle='#fff';c.beginPath();c.ellipse(w/2,h*.45,56,52,0,0,7);c.fill();c.fillStyle='#111';c.beginPath();c.arc(w*.42,h*.43,7,0,7);c.arc(w*.58,h*.43,7,0,7);c.fill();c.fillStyle='#d61f26';c.beginPath();c.arc(w/2,h*.5,9,0,Math.PI);c.fill();
 c.fillStyle='#2e7d32';c.beginPath();c.ellipse(w/2,h*.62,40,14,0,0,7);c.fill();txt(c,'米蔵飲料センター',w/2,h*.8,24,'#2e7d32','900');txt(c,'こもれび',w/2,h*.87,20,'#555','bold')});
alloc('vmPanel',256,256,(c,w,h)=>{c.fillStyle='#1a1b1e';rr(c,0,0,w,h,40);c.fill();c.fillStyle='#2a2c30';rr(c,10,10,w-20,h-20,34);c.fill();
 c.fillStyle='#c6c9cc';rr(c,w*.55,h*.12,70,40,8);c.fill();c.fillStyle='#111';c.fillRect(w*.55+32,h*.12+6,6,28);
 c.fillStyle='#c6c9cc';rr(c,w*.12,h*.15,80,26,6);c.fill();c.fillStyle='#111';c.fillRect(w*.12+8,h*.15+10,64,6);
 c.fillStyle='#111';c.fillRect(w*.2,h*.42,90,60);c.fillStyle='#8f9397';c.fillRect(w*.2+6,h*.42+6,78,48);c.fillStyle='#ddd';c.beginPath();c.arc(w*.78,h*.45,16,0,7);c.fill();
 txt(c,'硬貨',w*.62,h*.82,18,'#ddd','bold');txt(c,'千円札',w*.3,h*.82,18,'#ddd','bold')});
alloc('vmIC',96,96,(c,w,h)=>{c.fillStyle='#202226';c.fillRect(0,0,w,h);c.fillStyle='#2ec4b6';c.fillRect(10,10,w-20,h-34);c.strokeStyle='#fff';c.lineWidth=3;for(let r=8;r<26;r+=7){c.beginPath();c.arc(w/2,h*.4,r,-.9,.9);c.stroke()}txt(c,'IC',w/2,h*.85,16,'#fff','900','center','Arial')});
alloc('vmFlap',512,128,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#3c4046');g.addColorStop(1,'#18191c');c.fillStyle=g;c.fillRect(0,0,w,h);c.fillStyle='rgba(255,255,255,.08)';c.fillRect(0,0,w,10);txt(c,'取出口',w*.5,h*.55,30,'rgba(255,255,255,.35)','bold');c.fillStyle='rgba(255,255,255,.12)';c.fillRect(w*.3,h*.75,w*.4,4)});
alloc('vmSticker',192,96,(c,w,h)=>{c.fillStyle='#ffffff';c.fillRect(0,0,w,h);c.strokeStyle='#999';c.strokeRect(1,1,w-2,h-2);for(let l=0;l<6;l++){c.fillStyle='#444';c.fillRect(10,10+l*13,w-20-rnd()*40,4)}});

// ---- v4.1 apartment textures ----
alloc('tv2f',384,216,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#101a3c');g.addColorStop(.62,'#34457a');g.addColorStop(1,'#e08a5c');c.fillStyle=g;c.fillRect(0,0,w,h);
 c.fillStyle='rgba(255,246,222,.92)';c.beginPath();c.arc(w*.8,h*.2,17,0,7);c.fill();
 for(let i=0;i<24;i++){const bw=10+rnd()*20,bh=30+rnd()*95,bx=i*17-4,by=h*.8-bh;c.fillStyle='#0b1124';c.fillRect(bx,by,bw,bh+80);for(let k=0;k<12;k++)if(rnd()<.5){c.fillStyle=rnd()<.7?'#ffd27a':'#a8d8ff';c.fillRect(bx+3+(k%3)*Math.max(4,bw/3.3),by+6+Math.floor(k/3)*11,3,5)}}
 c.fillStyle='#d6002a';c.fillRect(w*.52,h*.28,3,h*.5);c.fillRect(w*.5,h*.5,7,2);
 c.fillStyle='rgba(8,10,24,.84)';c.fillRect(0,h-46,w,46);c.fillStyle='#d6002a';c.fillRect(0,h-46,74,46);txt(c,'NEWS',37,h-23,19,'#fff','900','center','Arial');
 txt(c,'東京 今夜は雨が強まります',84,h-30,17,'#fff','bold','left');txt(c,'23:42  17℃  降水確率 90%',84,h-11,12,'#b8c4e0','normal','left');
 c.fillStyle='rgba(255,255,255,.05)';for(let y=0;y<h;y+=3)c.fillRect(0,y,w,1)});
alloc('mon2f',256,160,(c,w,h)=>{c.fillStyle='#0e1521';c.fillRect(0,0,w,h);c.fillStyle='#1b2638';c.fillRect(8,10,150,120);c.fillStyle='#243249';c.fillRect(8,10,150,12);
 const cols=['#7fd1ff','#ffd479','#a6e3a1','#f38ba8','#cba6f7','#e6edf7'];for(let i=0;i<13;i++){const x=16+(i%3)*8;c.fillStyle=cols[i%6];c.fillRect(x,30+i*8,20+rnd()*90,3)}
 c.fillStyle='#0a0f17';c.fillRect(166,10,82,120);for(let i=0;i<12;i++){c.fillStyle=i%4?'#6ee787':'#e6edf7';c.fillRect(172,18+i*9,12+rnd()*55,3)}
 c.fillStyle='#0a0e15';c.fillRect(0,h-22,w,22);for(let i=0;i<6;i++){c.fillStyle=cols[i];c.fillRect(10+i*26,h-16,16,10)}txt(c,'23:42',w-26,h-11,10,'#cfd8e8','bold','center','Arial')});
alloc('pstA',240,340,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0d1226');g.addColorStop(.55,'#4a2b5e');g.addColorStop(1,'#f08a4b');c.fillStyle=g;c.fillRect(0,0,w,h);
 c.fillStyle='#120c1e';c.beginPath();c.moveTo(0,215);c.lineTo(60,150);c.lineTo(110,200);c.lineTo(170,130);c.lineTo(240,210);c.lineTo(240,340);c.lineTo(0,340);c.fill();
 c.strokeStyle='#e9e2d0';c.lineWidth=3;c.beginPath();c.moveTo(120,340);c.bezierCurveTo(40,300,200,260,110,230);c.bezierCurveTo(60,215,150,190,170,150);c.stroke();
 c.fillStyle='#fff3c0';c.beginPath();c.arc(118,236,3,0,7);c.arc(130,232,3,0,7);c.fill();
 txt(c,'NIGHT TOUGE',120,36,28,'#fff1d6','900','center','Arial');txt(c,'夜の峠',120,72,26,'#ffd27a');txt(c,'—  86  —',120,314,22,'#fff','bold','center','Arial')});
alloc('pstB',240,340,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0b1b34');g.addColorStop(1,'#2d5878');c.fillStyle=g;c.fillRect(0,0,w,h);
 c.fillStyle='#f6edc8';c.beginPath();c.arc(120,120,62,0,7);c.fill();c.fillStyle='rgba(11,27,52,.22)';c.beginPath();c.arc(104,106,14,0,7);c.arc(138,134,10,0,7);c.fill();
 for(let i=0;i<9;i++){c.strokeStyle='rgba(246,237,200,'+(.55-i*.05)+')';c.lineWidth=2;c.beginPath();c.moveTo(80+i*3,200+i*10);c.lineTo(160-i*3,200+i*10);c.stroke()}
 for(let i=0;i<26;i++){c.fillStyle='rgba(200,255,120,.9)';c.beginPath();c.arc(rnd()*w,200+rnd()*90,1.6+rnd()*1.4,0,7);c.fill()}
 txt(c,'ほたる祭',120,38,34,'#ffe9b0');txt(c,'HOTARU FESTIVAL',120,316,16,'#dfe9f5','bold','center','Arial')});
alloc('rug2f',512,384,(c,w,h)=>{c.fillStyle='#2e5560';c.fillRect(0,0,w,h);c.strokeStyle='#e8dcc0';c.lineWidth=10;c.strokeRect(16,16,w-32,h-32);c.strokeStyle='#c4684a';c.lineWidth=4;c.strokeRect(34,34,w-68,h-68);
 c.fillStyle='#3b6a77';c.fillRect(46,46,w-92,h-92);for(let y=70;y<h-60;y+=46)for(let x=70;x<w-60;x+=46){c.fillStyle=((x+y)/46)%2?'#d9c8a0':'#c4684a';c.beginPath();c.moveTo(x,y-18);c.lineTo(x+18,y);c.lineTo(x,y+18);c.lineTo(x-18,y);c.closePath();c.fill()}
 c.fillStyle='rgba(255,255,255,.06)';for(let i=0;i<2600;i++)c.fillRect(rnd()*w,rnd()*h,2,1)});
alloc('futon2f',256,256,(c,w,h)=>{c.fillStyle='#ebe7dc';c.fillRect(0,0,w,h);c.fillStyle='rgba(39,62,92,.82)';for(let i=0;i<w;i+=32)c.fillRect(i,0,16,h);for(let i=0;i<h;i+=32)c.fillRect(0,i,w,16)});
alloc('blind2f',256,128,(c,w,h)=>{c.fillStyle='#efe8d8';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=5){c.fillStyle='rgba(150,135,105,.28)';c.fillRect(0,y,w,1)}const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,255,255,.25)');g.addColorStop(1,'rgba(0,0,0,.10)');c.fillStyle=g;c.fillRect(0,0,w,h)});
alloc('calendar',128,160,(c,w,h)=>{c.fillStyle='#fdfcf7';c.fillRect(0,0,w,h);c.fillStyle='#d6002a';c.fillRect(0,0,w,34);txt(c,'10月',w/2,18,22,'#fff','900');
 for(let d=0;d<31;d++){const x=10+(d%7)*17,y=50+Math.floor(d/7)*20;if(d===15){c.fillStyle='#ffe14d';c.fillRect(x-7,y-9,16,16)}txt(c,String(d+1),x+1,y,10,d%7===0?'#d6002a':'#333','bold','center','Arial')}});
alloc('clock2f',128,128,(c,w,h)=>{c.fillStyle='#2a2623';c.beginPath();c.arc(64,64,62,0,7);c.fill();c.fillStyle='#f6f4ee';c.beginPath();c.arc(64,64,56,0,7);c.fill();
 c.strokeStyle='#222';for(let i=0;i<12;i++){const a=i/12*6.2832;c.lineWidth=i%3?2:4;c.beginPath();c.moveTo(64+Math.sin(a)*46,64-Math.cos(a)*46);c.lineTo(64+Math.sin(a)*53,64-Math.cos(a)*53);c.stroke()}
 c.lineWidth=5;c.beginPath();c.moveTo(64,64);c.lineTo(64+Math.sin(-.35)*30,64-Math.cos(-.35)*30);c.stroke();c.lineWidth=3;c.beginPath();c.moveTo(64,64);c.lineTo(64+Math.sin(4.15)*44,64-Math.cos(4.15)*44);c.stroke();c.fillStyle='#c33';c.beginPath();c.arc(64,64,4,0,7);c.fill()});
alloc('plate201',128,64,(c,w,h)=>{c.fillStyle='#f2f0e6';c.fillRect(0,0,w,h);c.strokeStyle='#3a3a3a';c.lineWidth=4;c.strokeRect(3,3,w-6,h-6);txt(c,'201',w/2,h/2+2,40,'#222','900','center','Arial')});
window.__atlasUse=[packY+packH,ASH];
// ================= Geometry builder =================
// vertex: pos3 nrm3 uv2 col3 mat rough emis  => 14 floats
const STRIDE=14;
function hexc(h){if(Array.isArray(h))return h;const n=parseInt(h.slice(1),16);const s=x=>Math.pow(x/255,2.2);return [s(n>>16),s(n>>8&255),s(n&255)]}
function M(color,mat=0,rough=.6,emis=0,tex=null){return {c:hexc(color),mat,rough,emis,tex}}
class Geo{constructor(){this.a=[]}
 v(p,n,uv,m){this.a.push(p[0],p[1],p[2],n[0],n[1],n[2],uv[0],uv[1],m.c[0],m.c[1],m.c[2],m.mat,m.rough,m.emis)}
 quad(bl,br,tr,tl,n,m,uvr){let u0=0,v0=0,u1=1,v1=1;if(uvr){[u0,v0,u1,v1]=uvr}
  this.v(bl,n,[u0,v0],m);this.v(br,n,[u1,v0],m);this.v(tr,n,[u1,v1],m);this.v(bl,n,[u0,v0],m);this.v(tr,n,[u1,v1],m);this.v(tl,n,[u0,v1],m)}
 tri(a,b,c,n,m){this.v(a,n,[0,0],m);this.v(b,n,[1,0],m);this.v(c,n,[.5,1],m)}}
const G=new Geo(),GLASS=new Geo(),DOORL=new Geo(),DOORR=new Geo(),DOORGL=new Geo(),DOORGR=new Geo();let cur=G;
// box by min/max; faces: optional per-face material override {pz:M,...}; skip: set of faces
function BX(x0,y0,z0,x1,y1,z1,m,fm={},skip=''){const f=(k)=>fm[k]||m;const g=cur;
 if(!skip.includes('pz')){const mm=f('pz');g.quad([x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1],[0,0,1],mm,mm.tex)}
 if(!skip.includes('nz')){const mm=f('nz');g.quad([x1,y0,z0],[x0,y0,z0],[x0,y1,z0],[x1,y1,z0],[0,0,-1],mm,mm.tex)}
 if(!skip.includes('px')){const mm=f('px');g.quad([x1,y0,z1],[x1,y0,z0],[x1,y1,z0],[x1,y1,z1],[1,0,0],mm,mm.tex)}
 if(!skip.includes('nx')){const mm=f('nx');g.quad([x0,y0,z0],[x0,y0,z1],[x0,y1,z1],[x0,y1,z0],[-1,0,0],mm,mm.tex)}
 if(!skip.includes('py')){const mm=f('py');g.quad([x0,y1,z1],[x1,y1,z1],[x1,y1,z0],[x0,y1,z0],[0,1,0],mm,mm.tex)}
 if(!skip.includes('ny')){const mm=f('ny');g.quad([x0,y0,z0],[x1,y0,z0],[x1,y0,z1],[x0,y0,z1],[0,-1,0],mm,mm.tex)}}
// center-x/z, bottom-y, size
function B(cx,y,cz,w,h,d,m,fm,skip){BX(cx-w/2,y,cz-d/2,cx+w/2,y+h,cz+d/2,m,fm,skip)}
function T(name){return R[name]}
function cyl(x,y,z,r,h,m,seg=16,r2=null,caps=true){r2=r2==null?r:r2;const g=cur;for(let i=0;i<seg;i++){const a=i/seg*6.2832,b=(i+1)/seg*6.2832,ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
 const sl=(r-r2)/h;const na=norm3([ca,sl,sa]),nb=norm3([cb,sl,sb]);
 g.v([x+r*ca,y,z+r*sa],na,[0,0],m);g.v([x+r*cb,y,z+r*sb],nb,[1,0],m);g.v([x+r2*cb,y+h,z+r2*sb],nb,[1,1],m);
 g.v([x+r*ca,y,z+r*sa],na,[0,0],m);g.v([x+r2*cb,y+h,z+r2*sb],nb,[1,1],m);g.v([x+r2*ca,y+h,z+r2*sa],na,[0,1],m);
 if(caps){g.tri([x,y+h,z],[x+r2*cb,y+h,z+r2*sb],[x+r2*ca,y+h,z+r2*sa],[0,1,0],m);g.tri([x,y,z],[x+r*ca,y,z+r*sa],[x+r*cb,y,z+r*sb],[0,-1,0],m)}}}
function cylT(x,y,z,r,h,m,seg,rect,face=1){const g=cur;for(let i=0;i<seg;i++){const a=i/seg*6.2832+face,b=(i+1)/seg*6.2832+face,ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
 const u0=rect[0]+(rect[2]-rect[0])*i/seg,u1=rect[0]+(rect[2]-rect[0])*(i+1)/seg,v0=rect[1],v1=rect[3];const na=[ca,0,sa],nb=[cb,0,sb];
 g.v([x+r*ca,y,z+r*sa],na,[u0,v0],m);g.v([x+r*cb,y,z+r*sb],nb,[u1,v0],m);g.v([x+r*cb,y+h,z+r*sb],nb,[u1,v1],m);
 g.v([x+r*ca,y,z+r*sa],na,[u0,v0],m);g.v([x+r*cb,y+h,z+r*sb],nb,[u1,v1],m);g.v([x+r*ca,y+h,z+r*sa],na,[u0,v1],m)}}
function norm3(v){const l=Math.hypot(v[0],v[1],v[2])||1;return [v[0]/l,v[1]/l,v[2]/l]}
function cross3(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}
function tube(a,b,r,m,seg=8){const g=cur;const d=norm3([b[0]-a[0],b[1]-a[1],b[2]-a[2]]);const up=Math.abs(d[1])<.95?[0,1,0]:[1,0,0];const q=norm3(cross3(d,up)),s=cross3(d,q);
 for(let i=0;i<seg;i++){const t0=i/seg*6.2832,t1=(i+1)/seg*6.2832;const o0=[q[0]*Math.cos(t0)+s[0]*Math.sin(t0),q[1]*Math.cos(t0)+s[1]*Math.sin(t0),q[2]*Math.cos(t0)+s[2]*Math.sin(t0)],o1=[q[0]*Math.cos(t1)+s[0]*Math.sin(t1),q[1]*Math.cos(t1)+s[1]*Math.sin(t1),q[2]*Math.cos(t1)+s[2]*Math.sin(t1)];
  const A=[a[0]+o0[0]*r,a[1]+o0[1]*r,a[2]+o0[2]*r],Bb=[a[0]+o1[0]*r,a[1]+o1[1]*r,a[2]+o1[2]*r],C=[b[0]+o1[0]*r,b[1]+o1[1]*r,b[2]+o1[2]*r],D=[b[0]+o0[0]*r,b[1]+o0[1]*r,b[2]+o0[2]*r];
  g.v(A,o0,[0,0],m);g.v(Bb,o1,[1,0],m);g.v(C,o1,[1,1],m);g.v(A,o0,[0,0],m);g.v(C,o1,[1,1],m);g.v(D,o0,[0,1],m)}}
function polyline(pts,r,m,seg=6){for(let i=1;i<pts.length;i++)tube(pts[i-1],pts[i],r,m,seg)}
function catenary(a,b,sag,n=24){const p=[];for(let i=0;i<=n;i++){const t=i/n;p.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t-sag*4*t*(1-t),a[2]+(b[2]-a[2])*t])}return p}
// flat textured quad facing a direction: dir 'pz','px','nz','nx','py'
function panel(cx,cy,cz,w,h,dir,m){const g=cur,hw=w/2,hh=h/2;
 if(dir==='pz')g.quad([cx-hw,cy-hh,cz],[cx+hw,cy-hh,cz],[cx+hw,cy+hh,cz],[cx-hw,cy+hh,cz],[0,0,1],m,m.tex);
 if(dir==='nz')g.quad([cx+hw,cy-hh,cz],[cx-hw,cy-hh,cz],[cx-hw,cy+hh,cz],[cx+hw,cy+hh,cz],[0,0,-1],m,m.tex);
 if(dir==='px')g.quad([cx,cy-hh,cz+hw],[cx,cy-hh,cz-hw],[cx,cy+hh,cz-hw],[cx,cy+hh,cz+hw],[1,0,0],m,m.tex);
 if(dir==='nx')g.quad([cx,cy-hh,cz-hw],[cx,cy-hh,cz+hw],[cx,cy+hh,cz+hw],[cx,cy+hh,cz-hw],[-1,0,0],m,m.tex);
 if(dir==='py')g.quad([cx-hw,cy,cz+hh],[cx+hw,cy,cz+hh],[cx+hw,cy,cz-hh],[cx-hw,cy,cz-hh],[0,1,0],m,m.tex)}
// foliage: random leaf cards
let rsF=424242;function rndF(){rsF=(rsF*16807)%2147483647;return (rsF-1)/2147483646}
function bush(x,y,z,r,n0=60,hue=0){const g=cur;for(let i=0;i<n0*7;i++)rnd();const n=Math.round(n0*1.7);
 for(let i=0;i<n;i++){const u=rndF()*6.283,v=Math.acos(2*rndF()-1),rr=r*Math.cbrt(rndF());const p=[x+rr*Math.sin(v)*Math.cos(u),y+Math.abs(rr*Math.cos(v))*0.9+r*0.15,z+rr*Math.sin(v)*Math.sin(u)];
 const s=r*(0.27+rndF()*0.2);const nrm=norm3([p[0]-x,(p[1]-y)+.3,p[2]-z]);
 const t0=norm3([-nrm[1]*nrm[0],1-nrm[1]*nrm[1],-nrm[1]*nrm[2]]),b0=cross3(nrm,t0);const ang=(rndF()-.5)*2.4,ca=Math.cos(ang),sa=Math.sin(ang);
 const t=[t0[0]*ca+b0[0]*sa,t0[1]*ca+b0[1]*sa,t0[2]*ca+b0[2]*sa],bt=cross3(nrm,t);
 const gcol=[[.05,.16,.05],[.08,.22,.06],[.04,.12,.05],[.12,.25,.08],[.06,.18,.09]][Math.floor(rndF()*5)];const m={c:gcol,mat:10,rough:.55,emis:0,tex:null};
 const a=[p[0]-t[0]*s,p[1]-t[1]*s,p[2]-t[2]*s],b=[p[0]+bt[0]*s*.6,p[1]+bt[1]*s*.6,p[2]+bt[2]*s*.6],c=[p[0]+t[0]*s,p[1]+t[1]*s,p[2]+t[2]*s],d=[p[0]-bt[0]*s*.6,p[1]-bt[1]*s*.6,p[2]-bt[2]*s*.6];
 g.v(a,nrm,[0,0],m);g.v(b,nrm,[1,0],m);g.v(c,nrm,[1,1],m);g.v(a,nrm,[0,0],m);g.v(c,nrm,[1,1],m);g.v(d,nrm,[0,1],m)}}
function pot(x,y,z,r,h,col='#6b6f75'){cyl(x,y,z,r*0.8,h,M(col,0,.8),14,r);bush(x,y+h*.85,z,r*1.4,50)}
// glass pane (separate buffer) : local uv in meters for droplet shader
function glassPane(g,x0,y0,z0,x1,y1,z1,n){const w=Math.hypot(x1-x0,z1-z0),h=y1-y0;const m={c:[0,0,0],mat:0,rough:0,emis:0};
 g.v([x0,y0,z0],n,[0,0],m);g.v([x1,y0,z1],n,[w,0],m);g.v([x1,y1,z1],n,[w,h],m);g.v([x0,y0,z0],n,[0,0],m);g.v([x1,y1,z1],n,[w,h],m);g.v([x0,y1,z0],n,[0,h],m)}
// ================= Scene content =================
rs=11;
const SW=0.15; // sidewalk top
const mPlinth=M('#5d5d60',9,.85),mRoad=M('#ffffff',1,.8),mTile=M('#8f8f92',2,.7),mCurb=M('#9a9890',3,.8);
const mWall=M('#c4c1b8',3,.75),mWall2=M('#a9a59c',3,.85),mWallIn=M('#efeee9',0,.6),mCeil=M('#f2f2f0',0,.7);
const mFrame=M('#2f343c',4,.35),mAlu=M('#a9adb3',4,.35),mDark=M('#202329',0,.5),mWhite=M('#e9e9e6',0,.45),mSteel=M('#8c9096',4,.3);
const mFloorIn=M('#ece9e2',8,.18),mBlack=M('#141518',0,.4),mRubber=M('#111214',0,.8),mBlue=M('#1747b5',0,.35),mRed=M('#b5121b',0,.4);
const mConc=M('#8f8b84',3,.9),mOrange=M('#e0661b',0,.4),mWood=M('#6b4a2e',0,.6);
function E(color,e,tex=null){return M(color,tex?6:7,.4,e,tex?T(tex):null)}
function TX(name,rough=.5,color='#ffffff'){return M(color,5,rough,0,T(name))}
// ---------- NEW: 3D product helpers ----------
const LIQ=['#2a1206','#d9b56a','#cfe6f2','#f2a93b','#8fbf4a','#e86a92','#f4e9c8','#5a2a12'];
const CAPC=['#ffffff','#e8402f','#1747b5','#1fa35a','#f2b705'];
// kind 0 = 500ml PET, 1 = can, 2 = small PET
function bottle3D(x,y,z,s,kind,seg=8){s=Math.abs(s|0);const lab=M(PACK[s%PACK.length],0,.3),liq=M(LIQ[s%LIQ.length],0,.1),cap=M(CAPC[s%CAPC.length],0,.4);
 if(kind===1){cyl(x,y,z,.029,.008,mSteel,seg,.031,false);cyl(x,y+.008,z,.031,.1,lab,seg,null,false);cyl(x,y+.108,z,.031,.012,mSteel,seg,.026,true);return}
 const h=kind===2?.15:.2;cyl(x,y,z,.033,h*.6,liq,seg,null,false);cyl(x,y+h*.2,z,.0338,h*.3,lab,seg,null,false);cyl(x,y+h*.6,z,.033,h*.28,liq,seg,.014,false);cyl(x,y+h*.88,z,.0145,h*.12,cap,seg,null,true)}
// fill one shelf: items front edge at zf, s=+1 facing +z / -1 facing -z
function fillShelf(xa,xb,y,zf,s,type,face){let x=xa;let gi=Math.floor(rnd()*16);
 while(x<xb-0.07){const facings=1+Math.floor(rnd()*3);const tex=TX('pkg'+(gi%16),.4);const col=PACK[(gi*5)%PACK.length];const mc=M(col,0,.35);
  let t=type;if(t==='mix')t=rnd()<.5?'bag':'box';
  if(t==='bag'){const w=0.13+rnd()*0.06,hh=0.19+rnd()*0.06;for(let k=0;k<facings&&x+w<xb;k++){
    for(let d=0;d<2;d++){const z1=zf-s*d*0.09,z0=z1-s*0.07;BX(x+0.004,y,Math.min(z0,z1),x+w-0.004,y+hh-d*0.012,Math.max(z0,z1),mc,d===0?{[face]:tex}:{})}
    const zb=zf+s*0.006;BX(x+0.014,y+0.03,Math.min(zf,zb),x+w-0.014,y+hh-0.035,Math.max(zf,zb),mc,{[face]:tex}); // pillow bulge
    const zc2=zf-s*0.07;BX(x+0.006,y+hh,Math.min(zf,zc2),x+w-0.006,y+hh+0.014,Math.max(zf,zc2),M('#dcdcd8',4,.35)); // crimp seal
    x+=w}}
  else if(t==='box'){const w=0.09+rnd()*0.07,hh=0.14+rnd()*0.12;for(let k=0;k<facings&&x+w<xb;k++){
    for(let d=0;d<2;d++){const z1=zf-s*d*0.125,z0=z1-s*0.12;BX(x+0.004,y,Math.min(z0,z1),x+w-0.004,y+hh,Math.max(z0,z1),M(col,0,.45),d===0?{[face]:tex}:{})}x+=w}}
  else if(t==='cup'){const w=0.118;for(let k=0;k<facings+1&&x+w<xb;k++){const cx=x+w/2;for(const dz of [0.06,0.18]){const cz=zf-s*dz;for(let st=0;st<2;st++){const yy=y+st*0.112;
     cyl(cx,yy,cz,.043,.105,M('#f6f4ee',0,.4),10,.055,false);cyl(cx,yy+.035,cz,.0475,.045,mc,10,.0522,false);cyl(cx,yy+.105,cz,.057,.007,M(st?'#f2f2ee':'#d9d4c8',4,.3),10,null,true)}}x+=w}}
  else{const kind=rnd()<.4?1:0;const sp=kind?0.066:0.072;for(let k=0;k<facings+1&&x+sp<xb;k++){bottle3D(x+sp/2,y,zf-s*0.04,gi,kind);bottle3D(x+sp/2,y,zf-s*0.12,gi,kind);x+=sp}}
  gi++;x+=0.008}}
// ---------- base / ground ----------
BX(-7,-0.9,-7,7,0,7,mPlinth,{pz:M('#ffffff',5,.85,0,T('plinth'))},'py');
BX(-7.06,-0.95,-7.06,7.06,-0.88,7.06,M('#3a3a3d',0,.6)); // base lip
cur.quad([-7,0,7],[7,0,7],[7,0,-7],[-7,0,-7],[0,1,0],mRoad);
// sidewalks
BX(-7,0,1.5,4.6,SW,3.6,mTile,{pz:mCurb});
BX(2.5,0,-7,4.6,SW,1.5,mTile,{px:mCurb});
BX(-7,0,-7,-5,SW,1.5,mTile);
// curbs (granite edge strips)
BX(-7,SW-0.001,3.45,4.6,SW+0.012,3.6,mCurb);BX(4.45,SW-0.001,-7,4.6,SW+0.012,3.6,mCurb);
// gutter grates along curb
for(let x=-6;x<4;x+=2.4)panel(x,0.004,3.75,0.7,0.22,'py',M('#ffffff',5,.4,0,T('grate')));
for(let z=-6;z<3;z+=2.4)cur.quad([4.64,0.004,z+.35],[4.86,0.004,z+.35],[4.86,0.004,z-.35],[4.64,0.004,z-.35],[0,1,0],M('#ffffff',5,.4,0,T('grate')));
// road markings
const mLine=M('#d9d9d2',0,.55);
for(let z=3.95;z<6.7;z+=0.75)BX(0.7,0,z,4.3,0.006,z+0.45,mLine); // zebra bars parallel to traffic, repeated across the road
BX(-6.9,0,3.68,4.4,0.006,3.78,mLine);BX(4.68,0,-7,4.78,0.006,3.5,mLine);
for(let x=-6.6;x<-0.4;x+=1.6)BX(x,0,5.3,x+0.9,0.006,5.4,M('#d8b23a',0,.55));
for(let z=-6.6;z<2.6;z+=1.6)BX(5.8,0,z,5.9,0.006,z+0.9,mLine);
BX(4.75,0,3.0,6.95,0.006,3.25,mLine); // stop line
panel(-2.6,0.005,5.5,0.75,0.75,'py',M('#ffffff',5,.35,0,T('manhole')));
panel(5.85,0.005,-1.3,0.7,0.7,'py',M('#ffffff',5,.35,0,T('manhole')));
// ---------- store ground floor ----------
const FX0=-5,FX1=2.5,FZ0=-6,FZ1=1.5,CEIL=3.3;
BX(FX0,SW,-4.6,FX1,SW+0.012,FZ1,mFloorIn);
BX(FX0,SW,FZ0,FX1,CEIL,-4.6,mWall,{pz:mWallIn});
BX(FX0,SW,-4.6,FX0+0.2,CEIL,1.3,mWall,{px:mWallIn});              // left wall
BX(FX1-0.2,SW,-4.6,FX1,CEIL,-2.6,mWall,{nx:mWallIn});             // right solid wall
BX(FX0,SW,1.3,-3.4,CEIL,FZ1,mWall,{nz:mWallIn});                  // front-left pillar wall
BX(FX0,CEIL,FZ0,FX1,CEIL+0.06,FZ1,mCeil);                          // ceiling slab
BX(FX0-0.05,CEIL+0.06,FZ0,FX1+0.35,4.12,FZ1+0.35,M('#f4f4f6',0,.4));
BX(FX0-0.05,4.12,FZ0,FX1+0.35,4.22,FZ1+0.35,mConc);               // terrace slab (wet top)
panel(-1.25,3.73,FZ1+0.352,7.6,0.74,'pz',E('#ffffff',9,'signFront'));
panel(FX1+0.352,3.73,-1.6,6.1,0.74,'px',E('#ffffff',9,'signSide'));
for(let x=-4.4;x<2.6;x+=1.2){B(x,CEIL+0.02,FZ1+0.18,0.16,0.03,0.16,E('#fff4e0',30))}
for(let z=-3.2;z<1.6;z+=1.2){B(FX1+0.18,CEIL+0.02,z,0.16,0.03,0.16,E('#fff4e0',30))}
const fy0=SW,fy1=CEIL;
for(const x of [-3.4,-2.0,-0.92,0.72,1.6])B(x,fy0,1.45,0.08,fy1-fy0,0.1,mFrame);
B(FX1-0.04,fy0,FZ1-0.04,0.12,fy1-fy0,0.12,mFrame);
BX(-3.4,fy0,1.4,FX1,0.36,1.5,mFrame);
BX(-3.4,2.86,1.4,FX1,2.94,1.5,mFrame);
BX(-3.4,3.22,1.4,FX1,CEIL,1.5,mFrame);
for(const z of [-2.6,-1.2,0.2])B(FX1-0.05,fy0,z,0.1,fy1-fy0,0.08,mFrame);
BX(FX1-0.1,fy0,-2.6,FX1,0.36,FZ1,mFrame);BX(FX1-0.1,2.86,-2.6,FX1,2.94,FZ1,mFrame);BX(FX1-0.1,3.22,-2.6,FX1,CEIL,FZ1,mFrame);
cur=GLASS;
for(const [a,b] of [[-3.36,-2.04],[-1.96,-0.96],[0.76,1.56],[1.64,2.42]])glassPane(GLASS,a,0.36,1.455,b,2.86,1.455,[0,0,1]);
for(const [a,b] of [[-3.36,-2.04],[-1.96,-0.96],[-0.88,0.68],[0.76,1.56],[1.64,2.42]])glassPane(GLASS,a,2.94,1.455,b,3.22,1.455,[0,0,1]);
for(const [a,b] of [[-2.56,-1.24],[-1.16,0.16],[0.24,1.42]]){glassPane(GLASS,FX1-0.045,0.36,b,FX1-0.045,2.86,a,[1,0,0]);glassPane(GLASS,FX1-0.045,2.94,b,FX1-0.045,3.22,a,[1,0,0])}
cur=G;
for(const [g,gg,x0] of [[DOORL,DOORGL,-0.9],[DOORR,DOORGR,-0.1]]){cur=g;const x1=x0+0.82;
 BX(x0,0.16,1.38,x1,0.22,1.44,mAlu);BX(x0,2.8,1.38,x1,2.86,1.44,mAlu);BX(x0,0.16,1.38,x0+0.05,2.86,1.44,mAlu);BX(x1-0.05,0.16,1.38,x1,2.86,1.44,mAlu);
 panel((x0+x1)/2,1.25,1.442,0.6,0.1,'pz',E('#ffffff',1.2,'doorDecal'));
 glassPane(gg,x0+0.05,0.22,1.41,x1-0.05,2.8,1.41,[0,0,1]);}
cur=G;
B(-0.1,2.94,1.47,0.4,0.07,0.06,mDark);B(-0.1,2.96,1.505,0.06,0.03,0.01,E('#55ff99',8));
panel(-2.7,2.4,1.43,0.42,0.6,'pz',TX('poster0',.6));panel(-1.45,2.4,1.43,0.42,0.6,'pz',TX('poster1',.6));
panel(1.15,2.4,1.43,0.42,0.6,'pz',TX('poster2',.6));panel(2.0,2.42,1.43,0.42,0.6,'pz',TX('poster3',.6));
panel(-2.7,0.62,1.43,0.62,0.24,'pz',E('#ffffff',2.5,'openDecal'));
panel(FX1-0.07,2.42,-0.5,0.42,0.6,'px',TX('poster3',.6));
// ---------- interior ----------
const IF=SW+0.012;
function ball(x,y,z,rx,ry,rz,m,seg=10,rings=6){const g=cur;for(let j=0;j<rings;j++){const v0=j/rings*Math.PI,v1=(j+1)/rings*Math.PI;for(let i=0;i<seg;i++){const u0=i/seg*6.2832,u1=(i+1)/seg*6.2832;
 const P=(u,v)=>[x+rx*Math.sin(v)*Math.cos(u),y+ry*Math.cos(v),z+rz*Math.sin(v)*Math.sin(u)],N=(u,v)=>norm3([Math.sin(v)*Math.cos(u)/rx,Math.cos(v)/ry,Math.sin(v)*Math.sin(u)/rz]);
 const a=P(u0,v0),b=P(u1,v0),c=P(u1,v1),d=P(u0,v1);g.v(a,N(u0,v0),[0,0],m);g.v(b,N(u1,v0),[1,0],m);g.v(c,N(u1,v1),[1,1],m);g.v(a,N(u0,v0),[0,0],m);g.v(c,N(u1,v1),[1,1],m);g.v(d,N(u0,v1),[0,1],m)}}}
// triangular rice ball facing +x (profile in z-y, thickness along x) with a nori band
function onigiri(xf,xb,z0,y0,w,h,m,mn){const a=[xf,y0,z0],b=[xf,y0,z0+w],c=[xf,y0+h,z0+w/2],a2=[xb,y0,z0],b2=[xb,y0,z0+w],c2=[xb,y0+h,z0+w/2];
 cur.tri(a,b,c,[1,0,0],m);cur.tri(a2,c2,b2,[-1,0,0],m);cur.quad(a,b,b2,a2,[0,-1,0],m);
 cur.quad(b,c,c2,b2,norm3([0,w/2,h]),m);cur.quad(c,a,a2,c2,norm3([0,w/2,-h]),m);
 BX(xb-.002,y0,z0+w*.2,xf+.003,y0+h*.36,z0+w*.8,mn)}

// ===== NEW: walk-in drink cooler with real 3D stock =====
const FZB=-4.28,FZF=-3.98;
BX(-4.75,IF,-4.6,0.75,2.45,FZB,M('#b9c0c7',4,.4));
panel(-2.0,1.3,FZB+0.002,5.5,1.9,'pz',E('#ffffff',0.9,'fridge'));
BX(-4.75,IF,FZB,0.75,0.36,FZF,mDark);                                  // kick
BX(-4.75,2.22,FZB,0.75,2.45,FZF,M('#b9c0c7',4,.4));                    // header
panel(-2.0,2.335,FZF+0.003,5.4,0.16,'pz',E('#ffffff',5,'fridgeTop'));
BX(-4.75,0.36,FZB,-4.7,2.22,FZF,mAlu);BX(0.7,0.36,FZB,0.75,2.22,FZF,mAlu);
for(let x=-4.7;x<0.8;x+=0.9)B(x,0.36,FZF+0.015,0.04,1.86,0.03,mAlu);  // door mullions
for(let x=-4.7;x<0.3;x+=0.9)B(x+0.8,0.95,FZF+0.05,0.025,0.55,0.03,mSteel); // door handles
B(-2.0,2.2,FZF-0.03,5.4,0.02,0.04,E('#eef6ff',4));                    // LED strip
[0.38,0.76,1.14,1.52,1.9].forEach((y,r)=>{BX(-4.7,y-0.015,FZB,0.7,y,FZF-0.02,M('#d0d6dc',4,.35));
 BX(-4.7,y-0.05,FZF-0.032,0.7,y,FZF-0.02,mWhite,{pz:TX('priceStrip',.5)});
 let x=-4.66,s=Math.floor(rnd()*20);while(x<0.6){const kind=r===4?2:(r===0?0:(rnd()<.35?1:(rnd()<.5?2:0)));const n=2+Math.floor(rnd()*3);const sp=kind===1?0.066:0.072;
  for(let k=0;k<n&&x+sp<0.68;k++){bottle3D(x+sp/2,y,FZF-0.08,s,kind);x+=sp}s++;x+=0.012}});
// staff door + menu
panel(1.6,1.2,-4.595,0.9,2.05,'pz',M('#9aa3ab',4,.4));panel(1.6,1.7,-4.59,0.3,0.4,'pz',E('#d6e6f2',1.5));
panel(1.6,2.7,-4.59,1.6,0.26,'pz',E('#ffffff',3,'menu'));
panel(-2.0,2.95,-4.59,2.6,0.4,'pz',M('#1747b5',7,.4,2));
// left wall shelving
BX(-4.8,IF,-3.9,-4.35,1.95,1.1,M('#d8d6d0',0,.5),{px:TX('prod0',.55)});
// ===== NEW: real 3D gondola shelves =====
function gondola3D(x0,x1,zc,types,catF,catB){
 const h=1.62,mS=M('#e4e2dc',0,.45),mBoard=M('#cfd3d8',4,.35),mBase=M('#3b3f46',0,.5),pS=TX('priceStrip',.5);
 BX(x0,IF,zc-0.025,x1,h,zc+0.025,mS);                                    // pegboard spine
 for(let x=x0+0.1;x<x1;x+=0.1)for(const sz of [1,-1])BX(x-0.004,IF+0.2,Math.min(zc+sz*0.025,zc+sz*0.027),x+0.004,h-0.05,Math.max(zc+sz*0.025,zc+sz*0.027),M('#cdcac2',0,.6)); // pegboard ribs
 BX(x0,IF,zc-0.33,x1,IF+0.1,zc+0.33,mBase);
 BX(x0-0.03,IF,zc-0.34,x0,h,zc+0.34,mS);BX(x1,IF,zc-0.34,x1+0.03,h,zc+0.34,mS);
 B((x0+x1)/2,h,zc,x1-x0+0.1,0.05,0.7,mWhite);
 for(let i=0;i<2;i++){const s=i?-1:1,face=s>0?'pz':'nz';
  [IF+0.1,IF+0.47,IF+0.84,IF+1.21].forEach((y,li)=>{const zb=zc+s*0.025,zf=zc+s*(li===0?0.33:0.31);
   if(li>0){BX(x0,y-0.02,Math.min(zb,zf),x1,y,Math.max(zb,zf),mBoard);for(const xb of [x0+0.02,x1-0.02])BX(xb-0.008,y-0.12,Math.min(zb,zf-s*0.05),xb+0.008,y-0.02,Math.max(zb,zf-s*0.05),mBoard)}
   const a=s>0?zf:zf-0.012,b=s>0?zf+0.012:zf;BX(x0,y-0.055,a,x1,y+0.008,b,mBoard,{[face]:pS});
   fillShelf(x0+0.03,x1-0.03,y,zf-s*0.02,s,types[(li+i*2)%types.length],face)});}
 const cx=x0+0.75;tube([cx-0.4,2.73,zc],[cx-0.4,CEIL,zc],0.004,mDark,4);tube([cx+0.4,2.73,zc],[cx+0.4,CEIL,zc],0.004,mDark,4);
 B(cx,2.48,zc,1.0,0.25,0.012,mWhite,{pz:E('#ffffff',1.3,catF),nz:E('#ffffff',1.3,catB)});}
gondola3D(-3.9,-0.5,-2.75,['box','bag','cup','bag'],'cat1','cat2');
gondola3D(-3.9,-0.5,-1.0,['bag','box','bottle','mix'],'cat0','cat3');
// end-cap promo
B(-0.25,IF,-1.9,0.4,1.1,1.5,M('#dedcd6',0,.5),{px:TX('prodLow',.55)});
BX(-3.3,IF,0.95,-1.1,0.95,1.32,M('#cfcac0',0,.6),{py:TX('mags',.6),nz:TX('mags',.6)});
BX(-4.5,IF,-0.3,-3.6,0.85,0.8,mWhite);panel(-4.05,0.852,0.25,0.84,1.0,'py',E('#cfe9ff',2.2,'prodLow'));
// ===== v4.0: chilled bento / onigiri / sandwiches on the end-cap (real 3D) =====
(function(){const x=-0.05,mB=M('#cfd3d8',4,.35),mN=M('#10281a',0,.5),mR=M('#f3f1e8',0,.55);
 [IF+.1,IF+.37,IF+.64,IF+.9].forEach((yl,li)=>{BX(x,yl-.022,-2.62,x+.13,yl,-1.18,mB);BX(x+.126,yl-.05,-2.62,x+.13,yl+.012,-1.18,mWhite,{px:TX('priceStrip',.5)});
  let z=-2.58,k=li*3;
  while(z<-1.27){
   if(li===0||li===3){const w=.13,hh=.055+.012*((k%3)),col=PACK[(k*5)%PACK.length];for(let d=0;d<2;d++){const xx=x+.012+d*.045;BX(xx,yl+d*.058,z,xx+.06,yl+.05+d*.058,z+w,M(col,0,.45),{px:TX('pkg'+(k%16),.4)})}z+=w+.012}
   else if(li===1){const w=.092,hh=.085;onigiri(x+.075,x+.02,z,yl,w,hh,mR,mN);onigiri(x+.075,x+.02,z,yl,w,hh,mR,mN);BX(x+.075,yl+.025,z+w*.28,x+.0765,yl+.062,z+w*.72,M(PACK[(k*7)%PACK.length],0,.4),{px:TX('pkg'+(k%16),.4)});z+=w+.01}
   else{const w=.12;for(let d=0;d<2;d++){const xx=x+.014+d*.05;BX(xx,yl,z,xx+.05,yl+.045,z+w,M('#e8d6a8',0,.6),{px:TX('pkg'+((k+d*5)%16),.4)});BX(xx,yl+.045,z+.004,xx+.05,yl+.06,z+w-.004,M('#f4efe0',0,.6))}z+=w+.012}
   k++}});})();

BX(1.0,IF,-2.5,1.75,1.0,0.5,mWhite,{nx:M('#f4f4f2',0,.4)});BX(0.98,1.0,-2.52,1.8,1.05,0.52,M('#3b3026',0,.35));
BX(0.99,0.8,-2.5,1.0,0.88,0.5,E('#3a78ff',3));
B(1.35,1.05,-1.9,0.34,0.22,0.3,mDark);B(1.25,1.27,-1.9,0.04,0.3,0.24,E('#9fd2ff',4));
B(1.35,1.05,-0.9,0.6,0.16,0.42,mSteel);panel(1.35,1.215,-0.9,0.56,0.38,'py',E('#ffffff',1.6,'oden'));
BX(1.05,1.05,-0.2,1.7,1.55,0.45,M('#c8c2b8',4,.3));BX(1.08,1.12,-0.17,1.67,1.5,0.42,E('#ffb35a',4));
(function(){const y=1.215;const mE=M('#f4efe0',0,.35),mD=M('#e9dcc0',0,.4),mK=M('#4a4a52',0,.4),mF=M('#d9b073',0,.5),mT=M('#a96a2e',0,.5),mS=M('#c7563d',0,.4);
 let i=0;for(let r=0;r<3;r++)for(let c=0;c<5;c++){const x=1.13+c*.1,z=-1.03+r*.12,t=(i++)%5;
  if(t===0)ball(x,y+.012,z,.04,.034,.04,mE);else if(t===1)cyl(x,y-.004,z,.04,.035,mD,10);else if(t===2){const a=[x-.04,y-.004,z-.03],b=[x+.04,y-.004,z-.03],cc=[x,y-.004,z+.04],a2=[x-.04,y+.03,z-.03],b2=[x+.04,y+.03,z-.03],c2=[x,y+.03,z+.04];cur.tri(a2,b2,c2,[0,1,0],mK);cur.quad(a,b,b2,a2,[0,0,-1],mK);cur.quad(b,cc,c2,b2,norm3([1,0,1]),mK);cur.quad(cc,a,a2,c2,norm3([-1,0,1]),mK)}
  else if(t===3)ball(x,y+.008,z,.05,.026,.034,mF);else{BX(x-.035,y-.004,z-.03,x+.035,y+.032,z+.03,mT);cyl(x,y+.03,z,.008,.01,mS,6)}}
 for(let r=0;r<3;r++){tube([1.1,y+.02,-1.03+r*.12],[1.62,y+.02,-1.03+r*.12],.004,M('#b08a5a',0,.6),4)}
 // food tray on the hot case
 BX(1.14,1.55,-0.12,1.62,1.57,0.38,mSteel);const mCk=M('#c98a3c',0,.5),mBun=M('#f7f2e8',0,.45);
 for(let a=0;a<4;a++)for(let b=0;b<3;b++)ball(1.22+a*.1,1.60,-.04+b*.1,.034,.03,.034,mCk,8,5);
 for(let a=0;a<3;a++)ball(1.28+a*.12,1.62,.3,.045,.035,.045,mBun,10,6);})();

B(1.4,1.05,-2.35,0.36,0.6,0.32,mBlack);B(1.4,1.35,-2.18,0.24,0.2,0.02,E('#ffd9a0',3));
BX(1.9,IF,-2.5,2.28,1.3,0.5,M('#3b3f46',0,.5),{nx:TX('cig',.5)});
for(const x of [-3.6,-1.9,-0.2,1.5])for(const z of [-3.3,-1.8,-0.3,0.9])B(x,CEIL-0.04,z,1.3,0.04,0.22,E('#fffaf0',9));
panel(-2.2,2.75,0.55,1.1,0.2,'pz',E('#ffffff',1.6,'ceilingPOP'));panel(-0.6,2.75,-1.85,1.1,0.2,'pz',E('#ffffff',1.6,'ceilingPOP2'));
tube([-2.6,2.85,0.55],[-2.6,CEIL,0.55],0.004,mDark,4);tube([-1.8,2.85,0.55],[-1.8,CEIL,0.55],0.004,mDark,4);
for(let i=0;i<5;i++)B(-0.9-0.35,IF+i*0.05,0.95,0.42,0.06,0.3,M('#c8102e',0,.4));
// ---------- front sidewalk props ----------
const _VL=[];
// ===== Vending machines v3 (modelled after reference photo) =====
function vbottle(x,y,z,li,kind){const l=LBL[li%LBL.length];const rect=T('lbl'+(li%LBL.length));const lab=M('#ffffff',5,.25,0,rect);
 if(kind==='can'){cyl(x,y,z,.026,.008,mSteel,14,.03,false);cylT(x,y+.008,z,.03,.096,lab,14,rect,Math.PI*1.5);cyl(x,y+.104,z,.03,.012,mSteel,14,.024,true);return}
 const liq=M(l[3],0,.12),cap=M(l[1]==='#ffffff'?'#1747b5':l[1],0,.35),pet=M('#dfe8ee',0,.08);const H2=kind==='small'?.16:.21;
 cyl(x,y,z,.027,.012,liq,14,.031,false);cyl(x,y+.012,z,.031,H2*.22,liq,14,null,false);cylT(x,y+.012+H2*.22,z,.0318,H2*.3,lab,14,rect,Math.PI*1.5);
 cyl(x,y+.012+H2*.52,z,.031,H2*.08,liq,14,null,false);cyl(x,y+.012+H2*.6,z,.031,H2*.26,pet,14,.013,false);cyl(x,y+.012+H2*.86,z,.013,H2*.04,pet,10,null,false);cyl(x,y+.012+H2*.9,z,.0145,H2*.1,cap,12,null,true)}
function vend(cx,body,side,seed){
 const W=0.9,x0=cx-W/2,x1=cx+W/2,z0=1.48,z1=2.22,yb=SW,mB=M(body,0,.42),mBd=M(shade(body,-28),0,.5),mBl=M('#141518',0,.55),mCh=M('#c9ccd0',4,.22);
 const yM0=1.74,yM1=1.86,yTop=1.92,yW0=0.98,yW1=1.74,wx0=x0+0.04,wx1=x1-0.2;
 BX(x0+0.02,yb,z0+0.02,x1-0.02,yb+0.06,z1-0.04,mBl);                                  // plinth
 BX(x0,yb+0.06,z0,x1,yTop,z1-0.06,mB,{[side]:TX('vmMascot',.45)},'pz');                    // cabinet + side mascot
 BX(x0-0.006,yTop-0.03,z0-0.006,x1+0.006,yTop,z1+0.006,mB);                           // top lip
 // front door frame (cream)
 BX(x0,yb+0.06,z1-0.06,x1,yW0,z1,mB);BX(x0,yW1,z1-0.06,x1,yTop,z1,mB);
 BX(x0,yW0,z1-0.06,wx0,yW1,z1,mB);BX(wx1,yW0,z1-0.06,x1,yW1,z1,mB);
                // door seam
 // LED marquee
 BX(wx0+0.02,yM0+0.02,z1,wx1+0.12,yM1-0.01,z1+0.012,mBl,{pz:E('#ffffff',4.5,'vmMarquee')});
 // display recess
 const rz=z1-0.32;BX(wx0,yW0,rz-0.01,wx1,yW1,rz,M('#ffffff',6,.4,1.6,T('vmBack')),{pz:E('#ffffff',1.6,'vmBack')});
 BX(wx0,yW1-0.03,rz,wx1,yW1,z1-0.06,E('#f4f9ff',6));                                  // top LED light bar
 BX(wx0-0.005,yW0,rz,wx0,yW1,z1-0.06,M('#f2f2ef',0,.3));BX(wx1,yW0,rz,wx1+0.005,yW1,z1-0.06,M('#f2f2ef',0,.3));
 const rows=[{y:yW0+0.02,k:'can'},{y:yW0+0.255,k:'can'},{y:yW0+0.49,k:'pet'}];const n=9,sp=(wx1-wx0)/n;
 rows.forEach((r,ri)=>{BX(wx0,r.y-0.012,rz,wx1,r.y,z1-0.07,M('#d8dde2',4,.3));
  BX(wx0,r.y-0.012,z1-0.075,wx1,r.y+0.04,z1-0.055,M('#ffffff',5,.4,0,T('vmRail')),{pz:TX('vmRail',.35)});   // white price/button rail
  BX(wx0,r.y+0.04,z1-0.07,wx1,r.y+0.046,z1-0.055,M('#cfd3d6',4,.3));
  for(let i=0;i<n;i++){const xx=wx0+sp*(i+.5);const li=(seed+i+ri*4+(ri===2?0:Math.floor(i/3)))%LBL.length;const kind=r.k==='pet'?(i%4===3?'small':'pet'):'can';
   vbottle(xx,r.y+0.045,z1-0.13,li,kind);vbottle(xx,r.y+0.045,z1-0.21,li,kind);}});
 cur=GLASS;glassPane(GLASS,wx0,yW0,z1-0.015,wx1,yW1,z1-0.015,[0,0,1]);cur=G;
 BX(wx0-0.01,yW0-0.01,z1-0.02,wx1+0.01,yW0,z1+0.004,mCh);BX(wx0-0.01,yW1,z1-0.02,wx1+0.01,yW1+0.01,z1+0.004,mCh); // glass trim
 // lower door details
 const zf=z1;
 B(cx-0.12,0.62+yb,zf+0.004,0.36,0.3,0.008,TX('vmAd',.4));                            // promo panel
 BX(cx+0.22,0.5+yb,zf,cx+0.42,0.8+yb,zf+0.03,mBl,{pz:TX('vmPanel',.3)});             // black coin/bill panel
 BX(cx+0.08,0.66+yb,zf,cx+0.18,0.76+yb,zf+0.012,mBl,{pz:E('#ffffff',1.2,'vmIC')});   // IC reader
 BX(x1-0.04,0.68+yb,zf,x1-0.01,0.76+yb,zf+0.03,mCh);tube([x1-0.025,0.72+yb,zf+0.03],[x1-0.14,0.72+yb,zf+0.05],0.012,mCh,10); // T-handle lock
 cyl(x1-0.025,0.66+yb,zf+0.02,0.012,0.01,M('#e6c25a',4,.3),10);
 BX(x0+0.06,yb+0.2,zf-0.04,x1-0.2,yb+0.44,zf+0.004,mBd);                              // dispenser recess
 BX(x0+0.08,yb+0.22,zf,x1-0.22,yb+0.42,zf+0.008,M('#ffffff',5,.15,0,T('vmFlap')),{pz:TX('vmFlap',.12)}); // smoked flap
 BX(x1-0.16,yb+0.16,zf,x1-0.06,yb+0.26,zf+0.006,mBl);                                // coin return slot
 BX(x0+0.03,yb+0.1,zf,x0+0.09,yb+0.18,zf+0.004,mCh);                                 // key plate
 B(x1-0.17,yb+0.07,zf+0.003,0.17,0.08,0.004,TX('vmSticker',.6));
 for(let i=0;i<10;i++)BX(x0+0.12+i*0.06,yb+0.07,zf,x0+0.15+i*0.06,yb+0.12,zf+0.004,mBl);   // kick vents
 // display interior light
 _VL.push([cx-0.1,yW0+0.4,z1-0.1]);}
vend(-4.52,'#e9e1cd','nx',0);vend(-3.58,'#f1f1ee','px',5);
// recycle boxes next to vending
B(-3.0,SW,1.75,0.3,0.7,0.4,M('#1342b0',0,.4));cyl(-3.0,SW+0.7,1.75,0.06,0.01,mBlack,12);
// bicycle
(function(){const y=SW,z=2.45;const mF=M('#4ea89a',0,.35),mT=mRubber,mC=mAlu;
 const wheel=(cx)=>{const pts=[];for(let i=0;i<=28;i++){const a=i/28*6.2832;pts.push([cx+0.33*Math.cos(a),y+0.34+0.33*Math.sin(a),z])}polyline(pts,0.028,mT,6);
  for(let i=0;i<14;i++){const a=i/14*6.2832;tube([cx,y+0.34,z],[cx+0.31*Math.cos(a),y+0.34+0.31*Math.sin(a),z],0.004,mC,3)}cyl(cx,y+0.34,z-0.05,0.04,0.1,mC,8)};
 const xr=-2.95,xf=-1.95;wheel(xr);wheel(xf);
 const A=[xr,y+0.34,z],Bp=[-2.6,y+0.86,z],C=[-2.45,y+0.36,z],D=[-2.08,y+0.88,z],Eh=[xf,y+0.34,z];
 for(const [a,b] of [[A,Bp],[Bp,C],[C,A],[Bp,D],[D,C],[D,Eh]])tube(a,b,0.022,mF,6);
 tube(Bp,[-2.63,y+1.0,z],0.015,mC,6);B(-2.64,y+1.0,z,0.24,0.05,0.12,mBlack);
 tube(D,[-2.05,y+1.08,z],0.016,mC,6);tube([-2.05,y+1.08,z-0.26],[-2.05,y+1.08,z+0.26],0.014,mC,6);
 BX(-1.98,y+0.82,z-0.17,-1.68,y+1.06,z+0.17,M('#9aa0a6',4,.4));tube(C,[-2.45,y+0.04,z+0.15],0.01,mC,4)})();
// umbrella stand
BX(-1.6,SW,1.6,-1.15,0.55,1.85,M('#9ea3a9',4,.35));
for(let i=0;i<5;i++){const x=-1.53+i*0.08;tube([x,0.3,1.72],[x+0.02,1.1,1.72],0.03,M(['#e8eef0','#d0e4f0','#2b3d63','#e8eef0','#9b2335'][i],0,.25),8);tube([x+0.02,1.1,1.72],[x+0.02,1.2,1.72],0.008,mDark,4)}
cur.quad([-0.85,SW+0.003,2.15],[0.65,SW+0.003,2.15],[0.65,SW+0.003,1.55],[-0.85,SW+0.003,1.55],[0,1,0],M('#ffffff',5,.9,0,T('mat')),T('mat'));
(function(){const x=1.0,z=2.3,h=0.95;const m=TX('aframe',.6);cur.quad([x-0.27,SW,z+0.22],[x+0.27,SW,z+0.22],[x+0.27,SW+h,z+0.02],[x-0.27,SW+h,z+0.02],norm3([0,0.2,1]),m,m.tex);
 cur.quad([x+0.27,SW,z-0.18],[x-0.27,SW,z-0.18],[x-0.27,SW+h,z+0.02],[x+0.27,SW+h,z+0.02],norm3([0,0.2,-1]),M('#3a2a1a',0,.6))})();
['binL','binL2','binL3'].forEach((t,i)=>{const x=1.6+i*0.43;BX(x-0.2,SW,1.6,x+0.2,1.05,1.95,M('#e4e6ea',0,.35),{pz:M('#e4e6ea',0,.35)});BX(x-0.205,0.95,1.595,x+0.205,1.07,1.955,mBlue);panel(x,0.78,1.952,0.24,0.24,'pz',TX(t,.4))});
cyl(3.05,SW,2.05,0.02,2.6,mAlu,8);tube([3.05,2.65,2.05],[3.6,2.65,2.05],0.012,mAlu,6);
panel(3.33,1.75,2.05,0.52,1.68,'pz',TX('banner',.7));panel(3.33,1.75,2.049,0.52,1.68,'nz',M('#e6e0d6',0,.7));
pot(-3.15,SW,2.15,0.22,0.42);pot(2.85,SW,2.9,0.26,0.45);{const _k=cur;cur=new Geo();pot(3.0,SW,-2.0,0.24,0.5);pot(2.95,SW,-3.2,0.2,0.4);cur=_k} // Night Walk: these pots blocked the stair; built into a throwaway buffer so the seeded random layout stays identical
cyl(3.15,SW,1.85,0.07,4.3,mSteel,10);
BX(2.65,4.4,1.73,3.65,7.6,1.97,mWhite,{pz:E('#ffffff',5,'poleSign'),nz:E('#ffffff',3,'poleSignBack'),px:M('#dfe3ea',7,.4,2),nx:M('#dfe3ea',7,.4,2)});
BX(2.6,4.36,1.7,3.7,4.42,2.0,mFrame);BX(2.6,7.58,1.7,3.7,7.66,2.0,mFrame);
// ---------- side sidewalk ----------
const mRail=M('#e6e7e8',4,.3);
for(let z=-6.6;z<=0.6;z+=1.2){cyl(4.32,SW,z,0.035,0.85,mRail,8)}
tube([4.32,0.95,-6.6],[4.32,0.95,0.6],0.03,mRail,8);tube([4.32,0.6,-6.6],[4.32,0.6,0.6],0.025,mRail,8);
for(const z of [1.0,2.2]){cyl(4.25,SW,z,0.06,0.85,M('#e8c21a',0,.45),10);for(let k=0;k<3;k++)cyl(4.25,SW+0.12+k*0.24,z,0.062,0.1,mBlack,10,null,false)}
function acUnit(x,y,z,face){const w=0.8,h=0.6,d=0.3;if(face==='px'){BX(x,y,z-w/2,x+d,y+h,z+w/2,M('#d9dad6',0,.5));panel(x+d+0.002,y+h/2,z-0.08,0.42,0.42,'px',M('#2b2d30',0,.6));for(let r=0.06;r<0.22;r+=0.05){const pts=[];for(let i=0;i<=20;i++){const a=i/20*6.2832;pts.push([x+d+0.01,y+h/2+r*Math.sin(a),z-0.08+r*Math.cos(a)])}polyline(pts,0.006,mAlu,3)}}
 else{BX(x-w/2,y,z,x+w/2,y+h,z+d,M('#d9dad6',0,.5));panel(x-0.08,y+h/2,z+d+0.002,0.42,0.42,'pz',M('#2b2d30',0,.6));for(let r=0.06;r<0.22;r+=0.05){const pts=[];for(let i=0;i<=20;i++){const a=i/20*6.2832;pts.push([x-0.08+r*Math.cos(a),y+h/2+r*Math.sin(a),z+d+0.01])}polyline(pts,0.006,mAlu,3)}}}
acUnit(FX1,SW+0.05,-3.6,'px');acUnit(FX1,SW+0.05,-5.0,'px');
polyline([[FX1+0.15,SW+0.6,-3.6],[FX1+0.05,SW+1.8,-3.6],[FX1+0.05,CEIL,-3.6]],0.025,M('#cfd0cc',0,.5));
panel(FX1+0.003,1.95,-4.3,2.2,0.55,'px',TX('wallText',.85));
cyl(FX1+0.42,SW,-5.9,0.05,4.0,M('#b8b8b2',0,.5),8);
cyl(4.15,SW,-4.6,0.05,2.9,mSteel,8);BX(4.12,1.9,-4.85,4.2,3.0,-4.35,mWhite,{px:E('#ffffff',3.5,'park')});
cyl(4.15,SW,-1.0,0.035,2.6,mSteel,8);BX(4.17,1.75,-1.12,4.2,2.6,-0.88,mWhite,{px:TX('oneway',.4)});
// ---------- traffic light ----------
cyl(4.5,SW,3.35,0.1,5.3,M('#9a9c9f',4,.45),12);
tube([4.5,5.1,3.35],[6.7,5.1,3.35],0.06,M('#9a9c9f',4,.45),8);
BX(5.45,4.85,3.27,6.75,5.25,3.47,M('#7c7f84',4,.4));
const sigX=[5.67,6.1,6.53];const sigC=['#20ffc0','#ffb020','#ff2a10'];sigX.forEach((x,i)=>{panel(x,5.05,3.472,0.3,0.3,'pz',mBlack);panel(x,5.05,3.476,0.24,0.24,'pz',M(sigC[i],7,.4,-(i+1)));BX(x-0.17,5.2,3.47,x+0.17,5.24,3.62,M('#7c7f84',4,.4))});
BX(4.62,2.5,3.2,4.8,3.25,3.5,M('#7c7f84',4,.4));panel(4.802,3.05,3.35,0.2,0.24,'px',mBlack);panel(4.802,2.72,3.35,0.2,0.24,'px',mBlack);
// ---------- utility poles, wires, streetlamp, mirror ----------
const mPole=M('#9a978f',3,.8);
function upole(x,z,h){cyl(x,SW,z,0.17,h,mPole,14,0.12);B(x,h-0.9,z,1.6,0.1,0.1,mSteel);B(x,h-1.5,z,1.2,0.1,0.1,mSteel);
 for(const dx of [-0.7,-0.25,0.25,0.7])cyl(x+dx,h-0.8,z,0.035,0.12,M('#e9e6dc',0,.3),8);
 for(let i=0;i<8;i++)B(x,1.6+i*0.45,z+(i%2?0.16:-0.16),0.04,0.03,0.2,mSteel);
 BX(x-0.18,1.2,z-0.18,x+0.18,2.4,z-0.17,M('#e8c21a',0,.5));}
upole(-6.3,3.25,9.0);upole(4.3,-6.6,9.0);
cyl(-6.3-0.45,7.0,3.25,0.25,0.8,M('#6c6f73',0,.5),14);
const W=(a,b,s)=>polyline(catenary(a,b,s,28),0.012,M('#15161a',0,.6),4);
W([-6.3-0.7,8.2,3.25],[4.3-0.7,8.2,-6.6],0.18);W([-6.3+0.7,8.2,3.25],[4.3+0.7,8.2,-6.6],0.18);W([-6.3,7.6,3.25],[4.3,7.6,-6.6],0.15); // Night Walk: lines kept above the roof
W([-6.3-0.25,8.2,3.25],[-7.0,8.0,6.95],0.15);W([-6.3+0.25,8.2,3.25],[-6.6,7.9,7.0],0.15);
W([4.3+0.25,8.2,-6.6],[7.0,8.0,-7.0],0.1);W([4.3-0.25,7.6,-6.6],[4.0,7.5,-7.0],0.05);
W([-6.3,7.0,3.25],[-7.0,6.6,-2.0],0.3);W([4.3,6.8,-6.6],[1.23,6.45,-5.2],0.25);B(1.215,6.38,-5.2,.05,.12,.05,mSteel); // Night Walk: service drop anchored on the wall
tube([-6.3,6.3,3.25],[-5.2,6.45,3.25],0.04,mSteel,8);B(-5.05,6.3,3.25,0.5,0.14,0.26,M('#5e6166',4,.4));B(-5.05,6.285,3.25,0.4,0.02,0.18,E('#ffe2a8',40));
BX(-6.12,3.0,3.24,-5.3,3.24,3.27,mWhite,{pz:TX('street',.4)});
cyl(-5.65,SW,3.42,0.04,2.6,mOrange,8);
(function(){const cx=-5.65,cy=2.95,cz=3.5,r=0.32;const n=norm3([0.5,0,1]);const t=norm3(cross3([0,1,0],n));
 const pts=[];for(let i=0;i<=24;i++){const a=i/24*6.2832;pts.push([cx+t[0]*r*Math.cos(a),cy+r*Math.sin(a),cz+t[2]*r*Math.cos(a)])}polyline(pts,0.035,mOrange,6);
 const mm=M('#dfe6ee',4,.05);for(let i=0;i<24;i++){const a=i/24*6.2832,b=(i+1)/24*6.2832;const p=(q)=>[cx+t[0]*r*Math.cos(q)+n[0]*0.03,cy+r*Math.sin(q),cz+t[2]*r*Math.cos(q)+n[2]*0.03];cur.tri([cx+n[0]*0.08,cy,cz+n[2]*0.08],p(a),p(b),n,mm)}})();
// ---------- second floor + terrace ----------
const Y2=4.22,Y3=7.1;

// ======================= v4.1: REAL second-floor apartment (hollow shell + furnished interior) =======================
cur=G;
const RX0=-4.85,RX1=1.05,RZ0=-5.85,RZ1=-0.55,FLR=4.30,CLG=6.90,F=FLR;
let rsI=987654;function rndI(){rsI=(rsI*16807)%2147483647;return (rsI-1)/2147483646}
const pickI=a=>a[Math.floor(rndI()*a.length)];
function potI(...a){const sv=[rs,rsF];pot(...a);rs=sv[0];rsF=sv[1]}
const mWP=M('#e6d9c2',0,.92),mCl=M('#f0ebe0',0,.9),mSkirt=M('#d9cfbb',0,.5),mOak=M('#a67a4c',0,.5),mOakD=M('#6c4a2e',0,.55),
 mWoodF=M('#ffffff',13,.4),mWhiteG=M('#f2f1ec',0,.4),mAlC=M('#cbc6b9',4,.35),mBk=M('#17181c',0,.45),mMG=M('#9aa0a6',4,.3);
function holedWall(ax,a0,a1,c0,c1,y0,y1,holes,fm){const seg=(s0,s1,t0,t1)=>ax==='x'?BX(s0,t0,c0,s1,t1,c1,mWall2,fm):BX(c0,t0,s0,c1,t1,s1,mWall2,fm);
 holes.sort((p,q)=>p[0]-q[0]);let a=a0;for(const [h0,h1,hy0,hy1] of holes){if(h0>a)seg(a,h0,y0,y1);seg(h0,h1,y0,hy0);seg(h0,h1,hy1,y1);a=h1}if(a<a1)seg(a,a1,y0,y1)}
// ---- shell: floor slab (wood), walls with real window openings, ceiling ----
BX(FX0,Y2,FZ0,1.2,FLR,-0.4,mWall2,{py:mWoodF});
holedWall('x',FX0,1.2,-0.55,-0.4,FLR,CLG,[[-4.45,-2.75,4.975,6.225],[-1.2,0,5.25,6.25]],{nz:mWP});
holedWall('z',FZ0,-0.55,1.05,1.2,FLR,CLG,[[-3.8,-2.2,4.975,6.225],[-4.9,-4.0,FLR,F+2.05]],{nx:mWP}); // Night Walk: real doorway
BX(FX0,FLR,FZ0,RX0,CLG,-0.55,mWall2,{px:mWP});
BX(RX0,FLR,FZ0,RX1,CLG,RZ0,mWall2,{pz:mWP});
BX(FX0,CLG,FZ0,1.2,Y3,-0.4,mWall2,{ny:mCl});
// skirting + crown moulding
BX(RX0,FLR,RZ0,RX1,FLR+.09,RZ0+.012,mSkirt);BX(RX0,FLR,RZ0,RX0+.012,FLR+.09,RZ1,mSkirt);BX(RX1-.012,FLR,RZ0,RX1,FLR+.09,RZ1,mSkirt);BX(RX0,FLR,RZ1-.012,RX1,FLR+.09,RZ1,mSkirt);
BX(RX0,CLG-.06,RZ0,RX1,CLG,RZ0+.035,mWhiteG);BX(RX0,CLG-.06,RZ0,RX0+.035,CLG,RZ1,mWhiteG);BX(RX1-.035,CLG-.06,RZ0,RX1,CLG,RZ1,mWhiteG);BX(RX0,CLG-.06,RZ1-.035,RX1,CLG,RZ1,mWhiteG);
// ---- windows: aluminium frame, two sliding sashes with real glass, sill, trim, coverings ----
function win(cx,cy,z,w,h,tex,e,dir='pz'){
 const u0=cx-w/2,u1=cx+w/2,y0=cy-h/2,y1=cy+h/2,fb=.05;
 const bx=(a0,a1,b0,b1,d0,d1,m,fm)=>dir==='pz'?BX(a0,b0,z-d1,a1,b1,z-d0,m,fm):BX(z-d1,b0,a0,z-d0,b1,a1,m,fm);
 const gp=(a0,a1,b0,b1,d)=>dir==='pz'?glassPane(GLASS,a0,b0,z-d,a1,b1,z-d,[0,0,1]):glassPane(GLASS,z-d,b0,a1,z-d,b1,a0,[1,0,0]);
 const P3=(a,b,d)=>dir==='pz'?[a,b,z-d]:[z-d,b,a];
 bx(u0,u1,y0,y0+fb,.02,.13,mAlC);bx(u0,u1,y1-fb,y1,.02,.13,mAlC);bx(u0,u0+fb,y0,y1,.02,.13,mAlC);bx(u1-fb,u1,y0,y1,.02,.13,mAlC);
 const sash=(a0,a1,d)=>{const sw=.032;bx(a0,a1,y0+fb,y0+fb+sw,d,d+.03,mAlC);bx(a0,a1,y1-fb-sw,y1-fb,d,d+.03,mAlC);bx(a0,a0+sw,y0+fb,y1-fb,d,d+.03,mAlC);bx(a1-sw,a1,y0+fb,y1-fb,d,d+.03,mAlC);gp(a0+sw,a1-sw,y0+fb+sw,y1-fb-sw,d+.015)};
 sash(u0+fb,cx+.04,.035);sash(cx-.04,u1-fb,.085);
 bx(cx-.025,cx+.025,y0+h*.46,y0+h*.46+.07,.07,.12,M('#e9e4d6',4,.3));
 if(dir==='pz')B(cx,cy-h/2-0.12,z+0.08,w+0.3,0.05,0.16,mConc);else B(z+0.08,cy-h/2-0.12,cx,0.16,0.05,w+0.3,mConc);
 bx(u0-.05,u1+.05,y0-.035,y0,.15,.31,mOak);
 bx(u0-.045,u0,y0-.035,y1+.05,.15,.165,mWhiteG);bx(u1,u1+.045,y0-.035,y1+.05,.15,.165,mWhiteG);bx(u0-.045,u1+.045,y1,y1+.05,.15,.165,mWhiteG);
 const curtain=(a0,a1,b0,b1,d,mA,mB)=>{const n=Math.max(3,Math.round((a1-a0)/.055));for(let i=0;i<n;i++){const s0=a0+(a1-a0)*i/n,s1=a0+(a1-a0)*(i+1)/n,dd=d+(i%2?.035:0);bx(s0,s1,b0,b1,dd,dd+.014,i%2?mA:mB)}};
 const rod=(a0,a1,b,d)=>{const p=P3(a0,b,d),q=P3(a1,b,d);tube(p,q,.011,mMG,6)};
 if(tex==='win2f'&&dir==='pz'){ // roller blind, lowered ~24%
  bx(u0-.02,u1+.02,y1+.0,y1+.1,.18,.27,M('#e4dccb',0,.6));bx(u0+.01,u1-.01,y1-h*.24,y1,.2,.215,TX('blind2f',.9));bx(cx-.04,cx+.04,y1-h*.24-.05,y1-h*.24,.2,.215,M('#b9ad93',0,.6))}
 else if(tex==='win2fb'){const mA=M('#cdbfa2',0,.95),mB=M('#b8a888',0,.95);rod(u0-.2,u1+.2,y1+.14,.34);curtain(u0-.18,u0+.28,FLR+.04,y1+.12,.34,mA,mB);curtain(u1-.28,u1+.18,FLR+.04,y1+.12,.34,mA,mB)}
 else if(tex==='win2f'){const mA=M('#92a085',0,.95),mB=M('#7b8a6f',0,.95);rod(u0-.2,u1+.2,y1+.14,.34);curtain(u0-.18,u0+.3,FLR+.04,y1+.12,.34,mA,mB);curtain(u1-.3,u1+.18,FLR+.04,y1+.12,.34,mA,mB)}
}
win(-3.6,5.6,-0.4,1.7,1.25,'win2f',2.2);win(-0.6,5.75,-0.4,1.2,1.0,'win2fb',1.8);
win(-3.0,5.6,1.2,1.6,1.25,'win2f',1.6,'px');
// ---- entry door on the east wall (opens to the east terrace) ----
// Night Walk: door leaf + handles are built by buildDoor2()
BX(1.2,F+2.05,-4.96,1.27,F+2.12,-3.94,mAlC);BX(1.2,Y2,-4.96,1.27,F+2.05,-4.9,mAlC);BX(1.2,Y2,-4.0,1.27,F+2.05,-3.94,mAlC);
B(1.28,F+2.2,-4.45,.12,.1,.12,E('#ffe3b8',4));
// ======================= furniture =======================
const BCOL=['#b23a30','#2f5d8a','#d9b44a','#3f7a5a','#e8e2d0','#6a4c93','#cf6a2f','#2b2d33','#a9b8c4','#8c3b5a'];
// -- flooring accents: rug --
cur.quad([-1.9,F+.006,-1.5],[0.55,F+.006,-1.5],[0.55,F+.006,-3.1],[-1.9,F+.006,-3.1],[0,1,0],M('#ffffff',5,.95,0,T('rug2f')),T('rug2f'));
// -- ceiling lights --
cyl(-1.75,CLG-.07,-3.2,.40,.07,E('#fff2dc',5),24);cyl(-1.75,CLG-.012,-3.2,.43,.012,mWhiteG,24);
cyl(-0.1,CLG-.012,-5.1,.07,.012,E('#fff2dc',5),12);cyl(0.4,CLG-.012,-5.1,.07,.012,E('#fff2dc',5),12);
// -- bed (head against north wall) --
const mDuv=TX('futon2f',.95),mPil=M('#f6f3ec',0,.95),mSheet=M('#f1eee6',0,.95);
BX(-4.83,F,-5.83,-3.57,F+.26,-3.82,mOakD);BX(-4.83,F+.26,-5.85,-3.57,F+.98,-5.80,mOakD);
BX(-4.80,F+.26,-5.80,-3.60,F+.45,-3.85,mSheet);
BX(-4.82,F+.43,-5.12,-3.58,F+.53,-3.83,mDuv);BX(-4.82,F+.43,-5.15,-3.58,F+.55,-5.10,M('#2b3f5c',0,.95));
ball(-4.43,F+.53,-5.52,.26,.075,.17,mPil,12,6);ball(-3.97,F+.53,-5.52,.26,.075,.17,mPil,12,6);
// bedside table + lamp
BX(-3.50,F,-5.82,-3.10,F+.45,-5.42,mOak);BX(-3.48,F+.30,-5.425,-3.12,F+.43,-5.415,mOakD);BX(-3.48,F+.12,-5.425,-3.12,F+.27,-5.415,mOakD);
cyl(-3.30,F+.45,-5.62,.06,.02,mBk,12);cyl(-3.30,F+.47,-5.62,.012,.2,mMG,8);cyl(-3.30,F+.62,-5.62,.1,.15,E('#ffcf9a',3.5),14,.07,false);
// posters, clock
BX(-4.52,F+1.14,RZ0,-3.98,F+1.86,RZ0+.012,mBk);panel(-4.25,F+1.5,RZ0+.014,.46,.68,'pz',TX('pstA',.7));
BX(-3.62,F+1.14,RZ0,-3.08,F+1.86,RZ0+.012,mBk);panel(-3.35,F+1.5,RZ0+.014,.46,.68,'pz',TX('pstB',.7));
panel(-2.9,F+2.05,RZ0+.004,.3,.3,'pz',E('#ffffff',.3,'clock2f'));
// -- desk + PC (west wall) --
BX(RX0,F+.70,-3.45,RX0+.62,F+.74,-1.75,mOak);
for(const [x,z] of [[RX0+.03,-3.42],[RX0+.55,-3.42],[RX0+.03,-1.82],[RX0+.55,-1.82]])BX(x,F,z,x+.04,F+.70,z+.04,mMG);
BX(RX0+.03,F+.45,-3.42,RX0+.55,F+.48,-1.78,mMG);
BX(RX0+.12,F+.74,-2.80,RX0+.30,F+.755,-2.50,mBk);BX(RX0+.19,F+.755,-2.67,RX0+.22,F+.95,-2.63,mBk);
BX(RX0+.16,F+.93,-2.95,RX0+.20,F+1.29,-2.35,mBk,{px:E('#ffffff',1.7,'mon2f')});
BX(RX0+.36,F+.74,-2.85,RX0+.50,F+.752,-2.43,M('#2a2d33',0,.5));BX(RX0+.36,F+.74,-2.30,RX0+.43,F+.755,-2.24,M('#2a2d33',0,.5));
cyl(RX0+.5,F+.74,-3.35,.07,.02,mBk,12);tube([RX0+.5,F+.76,-3.35],[RX0+.38,F+1.05,-3.35],.009,mMG,5);tube([RX0+.38,F+1.05,-3.35],[RX0+.26,F+1.14,-3.35],.009,mMG,5);cyl(RX0+.26,F+1.0,-3.35,.09,.13,E('#ffe3b0',4),12,.035,false);
cyl(RX0+.45,F+.74,-2.15,.035,.09,mWhiteG,10);BX(RX0+.1,F+.74,-2.05,RX0+.33,F+.755,-1.85,M('#d9c27a',0,.8));
BX(RX0,F+1.55,-3.3,RX0+.18,F+1.58,-1.9,mOak);for(let i=0;i<5;i++)BX(RX0+.04,F+1.58,-3.2+i*.27,RX0+.14,F+1.58+.12+(i%3)*.05,-3.2+i*.27+.07+(i%2)*.04,M(BCOL[(i*3)%10],0,.6));
// office chair
cyl(-3.95,F+.05,-2.62,.03,.40,mMG,8);for(let i=0;i<5;i++){const a=i/5*6.2832;tube([-3.95,F+.07,-2.62],[-3.95+Math.cos(a)*.27,F+.05,-2.62+Math.sin(a)*.27],.016,mBk,5);ball(-3.95+Math.cos(a)*.27,F+.03,-2.62+Math.sin(a)*.27,.04,.03,.04,mBk,6,4)}
BX(-4.18,F+.45,-2.86,-3.72,F+.50,-2.38,M('#3d4a57',0,.95));BX(-3.76,F+.50,-2.84,-3.70,F+.93,-2.40,M('#3d4a57',0,.95));BX(-3.97,F+.48,-2.81,-3.93,F+.52,-2.43,mBk);
// -- bookshelf (west wall) --
(function(){const x0=RX0,z0=-1.55,z1=-0.65,d=.30,h=1.85;BX(x0,F,z0,x0+d,F+.06,z1,mOakD);BX(x0,F,z0,x0+d,F+h,z0+.02,mOak);BX(x0,F,z1-.02,x0+d,F+h,z1,mOak);BX(x0,F,z0,x0+.012,F+h,z1,mOak);
 const ys=[.06,.40,.74,1.08,1.42];for(const y of ys)BX(x0,F+y,z0,x0+d,F+y+.02,z1,mOak);BX(x0,F+h-.02,z0,x0+d,F+h,z1,mOak);
 ys.forEach((y,si)=>{let z=z0+.03;const base=F+y+.02;while(z<z1-.05){if(rndI()<.07){z+=.06+rndI()*.08;continue}
  const w=.018+rndI()*.032,hh=.17+rndI()*.13,dd=.2+rndI()*.06,col=pickI(BCOL);const xf=x0+d-.01;BX(xf-dd,base,z,xf,base+hh,z+w,M(col,0,.7));BX(xf,base+hh*.62,z,xf+.002,base+hh*.72,z+w,M('#efe6cf',0,.6));z+=w+.002}
  if(si===4){ball(x0+.17,base+.07,z1-.12,.07,.06,.07,M('#d9b44a',0,.6),8,5)}});})();
// -- TV wall --
BX(-2.6,F,-5.84,-1.1,F+.42,-5.36,mOak);BX(-1.85,F+.02,-5.365,-1.84,F+.40,-5.36,mOakD);BX(-2.58,F+.02,-5.365,-2.57,F+.40,-5.36,mOakD);BX(-1.12,F+.02,-5.365,-1.11,F+.40,-5.36,mOakD);
BX(-1.95,F+.42,-5.80,-1.75,F+.55,-5.72,mBk);
BX(-2.38,F+.55,-5.78,-1.32,F+1.15,-5.73,mBk,{pz:E('#ffffff',1.7,'tv2f')});
BX(-2.30,F+.42,-5.62,-1.40,F+.49,-5.50,mBk);BX(-1.28,F+.42,-5.70,-1.12,F+.48,-5.45,mWhiteG);
potI(-2.5,F+.42,-5.62,.09,.14);
BX(-2.35,CLG-.38,RZ0,-1.15,CLG-.08,RZ0+.22,mWhiteG);BX(-2.35,CLG-.37,RZ0+.2,-1.15,CLG-.32,RZ0+.225,mSkirt);BX(-1.30,CLG-.22,RZ0+.22,-1.27,CLG-.19,RZ0+.225,E('#5dff9a',3));
// -- kitchenette (north-east) --
BX(-0.70,F,-5.84,0.55,F+.84,-5.25,mWhiteG);BX(-0.70,F+.84,-5.84,0.55,F+.87,-5.22,M('#a8aeb4',4,.35));
for(let i=0;i<3;i++){BX(-0.70+i*.417,F+.04,-5.255,-0.70+i*.417+.004,F+.80,-5.250,mSkirt);BX(-0.55+i*.417,F+.62,-5.252,-0.49+i*.417,F+.72,-5.240,mMG)}
BX(-.64,F+.865,-5.74,-.26,F+.875,-5.40,M('#6b7075',4,.25));tube([-.45,F+.87,-5.80],[-.45,F+1.10,-5.80],.012,mMG,6);tube([-.45,F+1.10,-5.80],[-.45,F+1.10,-5.66],.012,mMG,6);
BX(-.22,F+.87,-5.70,-.02,F+.885,-5.40,M('#c9a26b',0,.6));BX(0.05,F+.87,-5.74,0.50,F+.88,-5.36,mBk);cyl(0.17,F+.88,-5.55,.095,.004,E('#ff7040',.6),16);cyl(0.38,F+.88,-5.55,.095,.004,mBk,16);
cyl(0.17,F+.884,-5.55,.11,.11,mMG,16);cyl(0.17,F+.994,-5.55,.115,.012,mMG,16);
BX(-0.70,F+1.52,-5.84,0.55,F+2.08,-5.55,mWhiteG);BX(-0.69,F+1.50,-5.60,0.54,F+1.52,-5.57,E('#fff4dc',4));for(let i=0;i<3;i++)BX(-0.70+i*.417,F+1.54,-5.552,-0.70+i*.417+.004,F+2.06,-5.548,mSkirt);
BX(0.55,F,-5.84,1.04,F+1.72,-5.22,mWhiteG);BX(0.55,F+1.17,-5.225,1.04,F+1.18,-5.22,mSkirt);BX(0.59,F+.95,-5.222,0.62,F+1.40,-5.200,mMG);BX(0.59,F+1.22,-5.222,0.62,F+1.55,-5.200,mMG);
panel(0.86,F+1.45,-5.219,.14,.18,'pz',TX('calendar',.8));BX(0.62,F+1.73,-5.80,1.00,F+1.96,-5.46,mBk);
// -- living: sofa, low table, laptop --
const mSofa=M('#5c7388',0,.95),mSofaL=M('#6b8298',0,.95),mSofaD=M('#4b6074',0,.95);
BX(-1.45,F+.12,-1.45,.25,F+.40,-.60,mSofa);BX(-1.45,F+.40,-.72,.25,F+.82,-.60,mSofa);BX(-1.45,F+.40,-1.45,-1.33,F+.62,-.60,mSofaD);BX(.13,F+.40,-1.45,.25,F+.62,-.60,mSofaD);
BX(-1.32,F+.40,-1.43,-.60,F+.49,-.73,mSofaL);BX(-.58,F+.40,-1.43,.12,F+.49,-.73,mSofaL);
for(const [x,z] of [[-1.42,-1.42],[.20,-1.42],[-1.42,-.66],[.20,-.66]])BX(x,F,z,x+.05,F+.12,z+.05,mOakD);
ball(-1.08,F+.62,-.84,.17,.15,.07,M('#d6c9ad',0,.95),10,6);ball(-.12,F+.60,-.84,.16,.14,.07,M('#b5654a',0,.95),10,6);
BX(-1.25,F+.34,-2.75,-.25,F+.38,-2.05,mOak);for(const [x,z] of [[-1.22,-2.72],[-.31,-2.72],[-1.22,-2.11],[-.31,-2.11]])BX(x,F,z,x+.05,F+.34,z+.05,mOakD);
BX(-.95,F+.38,-2.38,-.60,F+.395,-2.14,mMG);BX(-.95,F+.395,-2.40,-.60,F+.58,-2.38,mBk,{pz:E('#ffffff',1.5,'mon2f')});
cyl(-.45,F+.38,-2.30,.035,.08,mWhiteG,10);cyl(-1.10,F+.38,-2.55,.04,.05,M('#c4684a',0,.6),10);BX(-.80,F+.38,-2.62,-.62,F+.395,-2.48,M('#2a2d33',0,.5));
BX(-1.05,F,-3.15,-.55,F+.07,-2.85,M('#b5654a',0,.95));BX(-.05,F,-2.95,.40,F+.07,-2.65,M('#d6c9ad',0,.95));
// floor lamp + plant
cyl(.9,F,-.8,.12,.02,mBk,14);cyl(.9,F+.02,-.8,.014,1.5,mMG,8);cyl(.9,F+1.32,-.8,.17,.3,E('#ffe0b0',3.2),16,.12,false);
potI(.85,F,-1.75,.16,.3);
// -- dining corner (east window) --
cyl(.35,F+.70,-3.0,.42,.035,mOak,18);cyl(.35,F,-3.0,.05,.70,mMG,10);cyl(.35,F,-3.0,.24,.02,mBk,16);
for(const [cx,cz,back] of [[.35,-2.36,1],[.35,-3.64,-1]]){BX(cx-.2,F+.42,cz-.2,cx+.2,F+.46,cz+.2,mOakD);for(const dx of [-.18,.16])for(const dz of [-.18,.16])BX(cx+dx,F,cz+dz,cx+dx+.03,F+.42,cz+dz+.03,mOakD);BX(cx-.2,F+.46,cz+back*.17-.015,cx+.2,F+.88,cz+back*.17+.015,mOakD)}
cyl(.35,F+.735,-3.0,.05,.14,M('#e9e2d0',0,.5),10,.03,false);ball(.35,F+.93,-3.0,.09,.07,.09,M('#d9b44a',0,.6),8,5);cyl(.52,F+.735,-3.12,.09,.015,mWhiteG,12);
tube([.35,CLG,-3.0],[.35,F+1.95,-3.0],.004,mBk,4);cyl(.35,F+1.72,-3.0,.22,.21,E('#ffcf8a',3.5),16,.07,false);cyl(.35,F+1.93,-3.0,.07,.02,mBk,10);
// -- cat on the big window's sill --
(function(){const mC=M('#8c8478',0,.9),mCd=M('#5f594f',0,.9),y=4.975,x=-3.0,z=-.69;
 ball(x,y+.115,z,.075,.12,.09,mC,10,6);ball(x,y+.255,z+.045,.06,.055,.055,mC,10,6);
 BX(x-.055,y+.29,z+.025,x-.025,y+.34,z+.055,mCd);BX(x+.025,y+.29,z+.025,x+.055,y+.34,z+.055,mCd);
 tube([x-.03,y+.02,z-.07],[x+.08,y+.012,z-.12],.016,mCd,6);tube([x+.08,y+.012,z-.12],[x+.19,y+.02,z-.06],.016,mCd,6);})();
potI(-4.2,4.975,-.64,.06,.1);

BX(-4.6,6.35,-0.4,-2.6,6.42,0.2,M('#5a6068',4,.4));
acUnit(0.3,Y2,-0.38,'pz');polyline([[0.6,Y2+0.5,-0.38],[0.8,Y2+0.8,-0.42],[0.8,6.2,-0.42]],0.025,M('#d2d2cc',0,.5));
for(let x=-4.9;x<=2.8;x+=0.35)cyl(x,Y2,FZ1+0.27,0.012,0.95,mFrame,6);
for(let z=-5.8;z<=1.8;z+=0.35)cyl(FX1+0.27,Y2,z,0.012,0.95,mFrame,6);
tube([-4.95,Y2+0.95,FZ1+0.27],[FX1+0.27,Y2+0.95,FZ1+0.27],0.03,mFrame,6);tube([FX1+0.27,Y2+0.95,FZ1+0.27],[FX1+0.27,Y2+0.95,-5.9],0.03,mFrame,6);
pot(-4.4,Y2,1.2,0.25,0.4);pot(-2.0,Y2,1.3,0.2,0.35);pot(1.6,Y2,1.25,0.3,0.45);pot(2.3,Y2,-1.2,0.25,0.4);{const _k=cur;cur=new Geo();pot(2.2,Y2,-3.5,0.22,0.38);cur=_k} // Night Walk: terrace pot by the door removed; built into a throwaway buffer so the seeded layout stays identical
// Night Walk: the parcel box on the terrace is removed (it blocked the way to the flat)
// ---------- Night Walk: exterior steel stair from the east sidewalk up to the roof terrace ----------
(function(){const X0=3.0,X1=3.95,ZB=-1.45,NS=23,RI=(Y2-SW)/NS,TR=.22,ZT=ZB-(NS-1)*TR;
 const mSt=M('#3c4148',4,.45),mTr=M('#5b6068',4,.6),mRl=M('#2f343c',4,.35);
 const top=z=>SW+RI+(ZB-z)/TR*RI;                    // line through the tread nosings
 // slanted side plate between two (z, y-bottom, y-top) ends
 function beam(xa,xb,zs,ys0,ys1,ze,ye0,ye1,m){const g=cur,nt=norm3([0,zs-ze,ye1-ys1]),nb=norm3([0,ze-zs,ys0-ye0]);
  g.quad([xb,ys0,zs],[xb,ye0,ze],[xb,ye1,ze],[xb,ys1,zs],[1,0,0],m);g.quad([xa,ye0,ze],[xa,ys0,zs],[xa,ys1,zs],[xa,ye1,ze],[-1,0,0],m);
  g.quad([xa,ys1,zs],[xb,ys1,zs],[xb,ye1,ze],[xa,ye1,ze],nt,m);g.quad([xa,ye0,ze],[xb,ye0,ze],[xb,ys0,zs],[xa,ys0,zs],nb,m);
  g.quad([xa,ys0,zs],[xb,ys0,zs],[xb,ys1,zs],[xa,ys1,zs],[0,0,1],m);g.quad([xb,ye0,ze],[xa,ye0,ze],[xa,ye1,ze],[xb,ye1,ze],[0,0,-1],m)}
 for(let i=1;i<NS;i++){const y=SW+i*RI,zf=ZB-(i-1)*TR+.02,zr=ZB-i*TR;BX(X0,y-.04,zr,X1,y,zf,mTr);BX(X0,y-.05,zf-.03,X1,y-.04,zf,mSt)}
 for(const [xa,xb] of [[X0-.06,X0],[X1,X1+.06]])beam(xa,xb,ZB+.08,SW,top(ZB+.08)+.06,ZT,top(ZT)-.34,top(ZT)+.06,mSt);
 // landing behind the shop and a short bridge onto the terrace
 BX(1.25,Y2-.1,-6.95,X1+.06,Y2,ZT,mTr);BX(1.25,Y2-.1,ZT,X0-.06,Y2,-6.0,mTr);
 BX(1.25,Y2-.22,-6.95,X1+.06,Y2-.1,-6.89,mSt);BX(1.25,Y2-.22,-6.95,1.31,Y2-.1,-6.0,mSt);
 for(const [x,z] of [[X1,-6.9],[1.3,-6.9],[1.3,-6.05],[X1,ZT+.05],[X0-.03,ZT+.05]])cyl(x,SW,z,.045,Y2-.1-SW,mSt,8);
 for(const x of [X0-.03,X1+.03])cyl(x,SW,-3.9,.045,top(-3.9)-.34-SW,mSt,8);
 // handrails (top + mid rail) with posts on both sides; the inner rail stops short so the top treads open onto the bridge
 for(const x of [X0-.03,X1+.03]){const ze=x<X0?ZT+.35:ZT;for(const h of [.95,.5])tube([x,top(ZB)+h,ZB],[x,top(ze)+h,ze],.022,mRl,6);
  for(let i=1;i<NS;i+=4){const z=ZB-(i-.5)*TR;cyl(x,top(z)-RI,z,.02,.95,mRl,6)}cyl(x,top(ze)-RI,ze+.02,.02,.95,mRl,6)}
 const rail=(a,b)=>{for(const h of [.95,.5])tube([a[0],Y2+h,a[1]],[b[0],Y2+h,b[1]],.022,mRl,6);cyl(a[0],Y2,a[1],.02,.95,mRl,6);cyl(b[0],Y2,b[1],.02,.95,mRl,6)};
 rail([1.28,-6.92],[X1+.03,-6.92]);rail([1.28,-6.92],[1.28,-6.02]);rail([X1+.03,-6.92],[X1+.03,ZT]);
 panel(X1+.07,1.25,ZB-.05,.34,.22,'px',E('#ffffff',1.1,'plate201'));})();
B(-1.9,5.9,-0.32,0.18,0.28,0.12,E('#ffffff',6,'lantern'));
BX(FX0-0.05,Y3,FZ0-0.05,1.25,Y3+0.25,-0.35,mConc);
cyl(-3.5,Y3+0.25,-4.2,0.6,1.3,M('#c9c6be',0,.6),18);cyl(-3.5,Y3+1.55,-4.2,0.62,0.06,M('#9b978e',0,.6),18);
acUnit(-1.2,Y3+0.25,-2.0,'pz');acUnit(0.0,Y3+0.25,-2.0,'pz');
B(-4.3,Y3+0.25,-1.2,0.8,0.6,0.6,M('#8d9096',4,.4));
tube([-1.0,Y3+0.25,-5.0],[-1.0,Y3+2.2,-5.0],0.02,mSteel,6);tube([-1.5,Y3+1.8,-5.0],[-0.5,Y3+1.8,-5.0],0.012,mSteel,4);
BX(FX0-0.08,Y3+0.25,-0.42,1.28,Y3+0.32,-0.32,mConc);
// ---------- left neighbor ----------
const NX0=-7,NX1=-5.15;
BX(NX0,SW,-1.5,NX1,3.0,1.0,M('#a8a092',3,.9));
BX(NX0,3.0,-1.5,NX1,3.35,1.0,mConc);bush(-6.1,3.3,0.3,0.6,90);bush(-6.6,3.3,-0.7,0.55,80);bush(-5.6,3.3,-0.9,0.45,60);
panel(-6.05,1.7,1.002,1.2,0.75,'pz',TX('notice',.7));
for(let i=0;i<6;i++)bush(-5.4-rnd()*0.3,1.6+rnd()*1.4,1.05,0.28,20);
B(-6.05,2.65,1.06,1.0,0.3,0.06,E('#ffffff',1.2,'neighborSign'));
BX(NX0,SW,1.0,NX1,0.75,1.45,M('#8a857b',3,.9));bush(-6.6,0.7,1.22,0.4,50);bush(-5.7,0.7,1.22,0.35,40);
BX(NX0,SW,-7,NX1,7.6,-1.5,M('#9c968b',3,.9));
panel(NX1+0.005,5.2,-3.2,1.0,1.1,'px',E('#ffffff',1.4,'winWarmSmall'));panel(NX1+0.005,5.2,-5.4,1.0,1.1,'px',TX('winDark',.2));
panel(NX1+0.005,2.3,-4.3,1.2,1.1,'px',TX('winDark',.2));
panel(-6.1,5.2,-1.495,1.1,1.1,'pz',E('#ffffff',1.1,'winWarmSmall'));panel(-6.1,2.3,-1.495,1.1,1.0,'pz',TX('winDark',.2));
B(-6.1,1.0,-1.47,0.9,0.75,0.08,E('#ffffff',3,'lantern'));
acUnit(-6.1,3.3,-1.5,'pz');
BX(NX0,7.6,-7,NX1,7.8,-1.5,mConc);bush(-6.2,7.8,-2.2,0.5,60);
// ---------- AE86 Sprinter Trueno (Initial D) parked on right road ----------
const CAR={X:5.85,Z:-3.0};
const WIPER_PIV=[[5.73,.85,-2.02],[6.40,.85,-2.02]];
(function(){const CX=CAR.X,CZ=CAR.Z;
 const W3=(x,y,u)=>[CX+x,y,CZ+u];
 const pWhite=M('#efefea',11,.07),pBlack=M('#141518',11,.12),pGrey=M('#4f5358',11,.14),mTrim=M('#0e0f11',0,.45),mChrome=M('#c8ccd0',4,.12);
 const lerpT=(u,t)=>{if(u<=t[0][0])return t[0][1];for(let i=1;i<t.length;i++)if(u<=t[i][0]){const a=t[i-1],b=t[i];return a[1]+(b[1]-a[1])*(u-a[0])/(b[0]-a[0])}return t[t.length-1][1]};
 const yhT=[[-2.1,.78],[-1.95,.84],[-1.6,.86],[0,.83],[1.0,.80],[1.75,.74],[2.0,.66],[2.1,.6]];
 const yh=u=>lerpT(u,yhT);
 const ytop=u=>{if(u>1.0||u<-1.9)return null;if(u>.15)return 1.31+(.84-1.31)*(u-.15)/.85;if(u>-.7)return 1.29+(1.31-1.29)*(u+.7)/.85;return .92+(1.29-.92)*(u+1.9)/1.2};
 const arch=u=>{let y=.2;for(const w0 of [-1.2,1.2]){const d=u-w0;if(Math.abs(d)<.36)y=Math.max(y,.27+Math.sqrt(.36*.36-d*d))}if(u>1.85)y=Math.max(y,.2+(u-1.85)*.55);if(u<-1.9)y=Math.max(y,.2+(-1.9-u)*.55);return y};
 const wl=u=>.815-Math.max(0,Math.abs(u)-1.75)*.25;
 function sect(u){const yb=arch(u),h=yh(u),w=wl(u),t=ytop(u);const y1=Math.max(.44,yb+.01),y2=Math.max(.48,y1+.04);
  const gh=t!==null&&t>h+.02;const wg=w-.07,wr=gh?Math.min(.62,wg-.05):wg*.62,yt=gh?t:h+.025;
  const L=[[-w,yb],[-w,y1],[-w,y2],[-w+.01,h-.04],[-wg,h],[-wr,yt]];const R=L.slice().reverse().map(p=>[-p[0],p[1]]);return {pts:L.concat(R),gh,u}}
 const N=64,S=[];for(let i=0;i<=N;i++)S.push(sect(-2.1+4.2*i/N));
 function quadN(a,b,c){return norm3(cross3([b[0]-a[0],b[1]-a[1],b[2]-a[2]],[c[0]-a[0],c[1]-a[1],c[2]-a[2]]))}
 function gq(a,b,c,d,uv){const n=quadN(a,b,c);const m={c:[0,0,0],mat:0,rough:0,emis:0};GLASS.v(a,n,uv[0],m);GLASS.v(b,n,uv[1],m);GLASS.v(c,n,uv[2],m);GLASS.v(a,n,uv[0],m);GLASS.v(c,n,uv[2],m);GLASS.v(d,n,uv[3],m)}
 for(let i=0;i<N;i++){const A=S[i],B=S[i+1],um=(A.u+B.u)/2,both=A.gh&&B.gh;
  for(let k=0;k<11;k++){const a=W3(A.pts[k][0],A.pts[k][1],A.u),b=W3(B.pts[k][0],B.pts[k][1],B.u),c=W3(B.pts[k+1][0],B.pts[k+1][1],B.u),d=W3(A.pts[k+1][0],A.pts[k+1][1],A.u);
   let m=pWhite;if(k===0||k===10)m=pBlack;else if(k===1||k===9)m=pGrey;
   const side=(k===4||k===6),top=k===5;
   if(both&&side&&!(um<-1.42&&false)){const pillar=(um>-.36&&um<-.2)||um>.92;const cp=um<-1.42;if(cp)m=pWhite;else if(pillar)m=mTrim;else{const sgn=k===4?-1:1;gq(a,b,c,d,[[A.u,A.pts[k][1]],[B.u,B.pts[k][1]],[B.u,B.pts[k+1][1]],[A.u,A.pts[k+1][1]]]);continue}}
   if(both&&top&&!(um>-.7&&um<.15)){const edge=um>.95||um<-1.83;if(edge)m=mTrim;else{gq(a,b,c,d,[[A.pts[k][0]+1,A.pts[k][1]],[B.pts[k][0]+1,B.pts[k][1]],[B.pts[k+1][0]+1,B.pts[k+1][1]],[A.pts[k+1][0]+1,A.pts[k+1][1]]]);continue}}
   const n=quadN(a,b,c);cur.quad(a,b,c,d,[n[0],n[1],n[2]],m)}
  // underside
  const a=W3(A.pts[11][0],A.pts[11][1],A.u),b=W3(B.pts[11][0],B.pts[11][1],B.u),c=W3(B.pts[0][0],B.pts[0][1],B.u),d=W3(A.pts[0][0],A.pts[0][1],A.u);cur.quad(a,b,c,d,[0,-1,0],mTrim)}
 // ---- window frames / pillars / roof rails ----
 const mRub=M('#08090a',0,.5);
 for(const sg of [-1,1]){
  const rail=[],belt=[];for(let i=0;i<=N;i++){const s=S[i];if(!s.gh)continue;const p=s.pts[5],q=s.pts[4];rail.push([CX+sg*-p[0],p[1]+.004,CZ+s.u]);belt.push([CX+sg*-q[0],q[1],CZ+s.u])}
  for(let i=1;i<rail.length;i++){const um=(rail[i][2]+rail[i-1][2])/2-CZ;const roof=um>-.7&&um<.15;tube(rail[i-1],rail[i],roof?.03:.026,roof?pWhite:mRub,6)}
  polyline(belt,.016,mRub,6);
  // glass surround on the door
  for(const um of [-1.42,-.36,-.2,.92]){const s=sect(um);const p=s.pts[4],q=s.pts[5];tube([CX+sg*-p[0],p[1],CZ+um],[CX+sg*-q[0],q[1],CZ+um],.022,mRub,6)}}
 for(const um of [1.0,.15,-.7,-1.9]){const s=sect(um);const p=s.pts[5],q=s.pts[6];tube([CX+p[0],p[1],CZ+um],[CX+q[0],q[1],CZ+um],.028,um===.15||um===-.7?pWhite:mRub,6)}
 BX(CX-.68,.82,CZ+.98,CX+.68,.86,CZ+1.08,mRub);  // cowl
 // end caps
 for(const [Sx,nz] of [[S[0],-1],[S[N],1]]){const ctr=[0,.45];for(let k=0;k<12;k++){const p=Sx.pts[k],q=Sx.pts[(k+1)%12];cur.tri(W3(ctr[0],ctr[1],Sx.u),W3(p[0],p[1],Sx.u),W3(q[0],q[1],Sx.u),[0,0,nz],pBlack)}}
 // ---- front details (u=+2.1) ----
 const F=2.11;
 BX(CX-.8,.22,CZ+F-.12,CX+.8,.46,CZ+F+.04,pBlack);                                  // bumper
 BX(CX-.7,.47,CZ+F-.05,CX+.7,.58,CZ+F+.01,mTrim,{pz:TX('trueno',.4)});               // grille band
 BX(CX-.13,.26,CZ+F+.04,CX+.13,.39,CZ+F+.05,TX('plate',.5));                         // plate
 for(const s of [-1,1]){
  BX(CX+s*.55-.07,.28,CZ+F+.03,CX+s*.55+.07,.37,CZ+F+.06,M('#ffcf3a',7,.3,-5));         // yellow fog lamp (lit)
  BX(CX+s*.55-.085,.27,CZ+F+.02,CX+s*.55+.085,.38,CZ+F+.03,mTrim);
  BX(CX+s*.7-.07,.47,CZ+F-.04,CX+s*.7+.07,.53,CZ+F+.015,E('#ff9a1a',1.5));           // amber signal
  // pop-up headlight (raised): slim body-coloured pod, raked black bezel, recessed lens
  const hx=CX+s*.5,hz=CZ+1.86,hw=.2,yb=.72,yt=.85;
  BX(hx-hw,yb,hz-.2,hx+hw,yt,hz+.02,pWhite);                                        // pod
  cur.quad([hx-hw,yb,hz+.02],[hx+hw,yb,hz+.02],[hx+hw,yt,hz+.0],[hx-hw,yt,hz+.0],[0,.15,1],mTrim);
  BX(hx-hw+.012,yb+.012,hz+.02,hx+hw-.012,yt-.012,hz+.026,mTrim);                     // bezel
  BX(hx-hw+.03,yb+.022,hz+.026,hx+hw-.03,yt-.022,hz+.03,M('#ffffff',6,.15,2.2,T('hlens')),{pz:E('#ffffff',2.2,'hlens')}); // lens
  BX(hx-.03,yb+.04,hz+.03,hx+.03,yt-.04,hz+.034,M('#fff6e6',7,.2,-4));               // bulb glow
  BX(hx-hw,yb-.012,hz-.21,hx+hw,yb,hz+.02,mTrim);                                    // seam/gap under pod
  // mirrors
  BX(CX+s*.86-.06,.9,CZ+.78,CX+s*.86+.06,1.0,CZ+.9,mTrim);tube([CX+s*.78,.9,CZ+.86],[CX+s*.84,.94,CZ+.86],.015,mTrim,6);
  // door handles & seams
  BX(CX+s*.818-.004,.70,CZ-.12,CX+s*.818+.004,.72,CZ+.02,mTrim);
  for(const us of [.98,-.28])BX(CX+s*.817-.003,.24,CZ+us-.004,CX+s*.817+.003,.82,CZ+us+.004,mTrim);
 }
 // ---- rear details (u=-2.1) ----
 const Rr=-2.11;
 BX(CX-.8,.22,CZ+Rr-.04,CX+.8,.46,CZ+Rr+.12,pBlack);
 BX(CX-.76,.52,CZ+Rr-.02,CX+.76,.68,CZ+Rr+.02,mTrim);
 for(let i=0;i<8;i++){const x0=CX-.74+i*.185;BX(x0,.535,CZ+Rr-.025,x0+.17,.665,CZ+Rr-.02,i===3||i===4?M('#f2f2f2',7,.3,.6):M('#ff2010',7,.3,3.2))}
 BX(CX-.13,.29,CZ+Rr-.05,CX+.13,.42,CZ+Rr-.04,TX('plate',.5));
 tube([CX+.45,.24,CZ-1.95],[CX+.45,.24,CZ+Rr-.1],.035,mChrome,10);cyl(CX+.45,.21,CZ+Rr-.1,.022,.06,mBlack,8);
 // ---- wheels ----
 function wheel(x,z,s){const r=.29,wd=.19,x0=x-wd/2,x1=x+wd/2,y=.29,seg=28;
  for(let i=0;i<seg;i++){const a=i/seg*6.2832,b=(i+1)/seg*6.2832;const pa=[0,Math.cos(a),Math.sin(a)],pb=[0,Math.cos(b),Math.sin(b)];
   cur.quad([x0,y+r*pa[1],z+r*pa[2]],[x0,y+r*pb[1],z+r*pb[2]],[x1,y+r*pb[1],z+r*pb[2]],[x1,y+r*pa[1],z+r*pa[2]],pa,mRubber);
   const xf=s>0?x1:x0;cur.tri([xf,y,z],[xf,y+r*pa[1],z+r*pa[2]],[xf,y+r*pb[1],z+r*pb[2]],[s,0,0],mRubber);
   cur.tri([xf+s*.004,y,z],[xf+s*.004,y+.2*pa[1],z+.2*pa[2]],[xf+s*.004,y+.2*pb[1],z+.2*pb[2]],[s,0,0],M('#1b1c1f',4,.35))}
  const xf=(s>0?x1:x0)+s*.008;for(let k=0;k<8;k++){const a=k/8*6.2832;tube([xf,y+.045*Math.cos(a),z+.045*Math.sin(a)],[xf-s*.01,y+.19*Math.cos(a),z+.19*Math.sin(a)],.022,M('#202226',4,.3),5)}
  polyline(Array.from({length:25},(_,i)=>{const a=i/24*6.2832;return [xf,y+.2*Math.cos(a),z+.2*Math.sin(a)]}),.012,M('#2a2c30',4,.25),5);
  cyl(xf,y-.03,z,.04,.06,mChrome,10);
  // brake disc
  for(let i=0;i<20;i++){const a=i/20*6.2832,b=(i+1)/20*6.2832;cur.tri([x-s*.03,y,z],[x-s*.03,y+.17*Math.cos(a),z+.17*Math.sin(a)],[x-s*.03,y+.17*Math.cos(b),z+.17*Math.sin(b)],[s,0,0],mSteel)}
  BX(x-s*.05-.02,y+.08,z-.08,x-s*.05+.02,y+.2,z+.06,M('#b02020',0,.4))}
 for(const u of [-1.2,1.2])for(const s of [-1,1])wheel(CX+s*.70,CZ+u,s);
 // ---- interior ----
 const mSeatR=M('#7a1414',0,.8),mSeatB=M('#151515',0,.8);
 BX(CX-.72,.3,CZ-1.9,CX+.72,.34,CZ+.95,M('#101010',0,.9));                      // floor
 for(const s of [-1,1]){const sx=CX+s*.34;
  BX(sx-.22,.34,CZ-.55,sx+.22,.5,CZ-.05,mSeatB);BX(sx-.16,.5,CZ-.5,sx+.16,.53,CZ-.1,mSeatR);
  BX(sx-.22,.5,CZ-.62,sx+.22,1.0,CZ-.5,mSeatB);BX(sx-.15,.55,CZ-.5,sx+.15,.95,CZ-.48,mSeatR);BX(sx-.11,1.0,CZ-.6,sx+.11,1.12,CZ-.53,mSeatB)}
 BX(CX-.6,.34,CZ-1.45,CX+.6,.5,CZ-1.0,mSeatB);BX(CX-.6,.5,CZ-1.5,CX+.6,.85,CZ-1.38,mSeatB);
 BX(CX-.07,.34,CZ-.5,CX+.07,.48,CZ+.6,M('#1a1a1a',0,.6));                       // console
 BX(CX-.72,.62,CZ+.62,CX+.72,.82,CZ+.95,M('#161616',0,.7));                      // dashboard
 BX(CX+.12,.74,CZ+.6,CX+.58,.86,CZ+.62,M('#ffffff',6,.4,1.4,T('gauge')),{nz:E('#ffffff',1.4,'gauge')});
 polyline(Array.from({length:25},(_,i)=>{const a=i/24*6.2832;return [CX+.35+.17*Math.cos(a),.82+.17*Math.sin(a)*.9,CZ+.45+.17*Math.sin(a)*.42]}),.018,M('#111',0,.5),6);
 for(const a of [Math.PI/2,Math.PI*1.17,Math.PI*1.83])tube([CX+.35,.82,CZ+.45],[CX+.35+.16*Math.cos(a),.82+.16*Math.sin(a)*.9,CZ+.45+.16*Math.sin(a)*.42],.014,M('#222',0,.5),5);
 tube([CX+.35,.82,CZ+.45],[CX+.35,.78,CZ+.66],.025,M('#111',0,.5),6);
 tube([CX+.0,.48,CZ+.25],[CX+.0,.62,CZ+.2],.012,mChrome,5);cyl(CX,.62,CZ+.2,.03,.04,M('#111',0,.4),8);
 // antenna
 tube([CX-.7,.86,CZ+1.0],[CX-.72,1.6,CZ+1.0],.004,mSteel,4);
})();
// ================= Lights =================
const LIGHTS=[];function L(p,c,i,r,rain){LIGHTS.push({p,c:hexc(c),i,r,rain:!!rain,zone2:p[0]>-4.87&&p[0]<1.07&&p[2]>-5.87&&p[2]<-.5&&p[1]>4.28&&p[1]<6.92,indoor:p[0]>-4.98&&p[0]<2.48&&p[2]>-5.98&&p[2]<1.44&&p[1]>.1&&p[1]<3.3})}
for(const x of [-3.0,-0.5,1.5])for(const z of [-3.0,-0.6])L([x,3.0,z],'#fff1dc',12,8);
L([-2.0,1.4,-3.4],'#e8f4ff',14,5);
L([1.4,1.4,0.1],'#ffb060',6,3);
for(const x of [-3.8,-1.2,1.4])L([x,3.1,2.2],'#fff0d8',11,6.5,1);
L([3.0,3.1,-0.4],'#fff0d8',12,6,1);L([3.0,3.1,-2.6],'#fff0d8',8,5);
L([-2.6,3.75,2.6],'#8fb2ff',10,7,1);L([1.2,3.75,2.6],'#8fb2ff',10,7,1);L([3.4,3.75,-1.4],'#8fb2ff',8,6,1);
L([3.15,6.0,2.6],'#e8efff',16,8,1);
L([-4.05,1.2,2.7],'#d6e8ff',7,4);
L([-5.05,6.0,3.25],'#ffd7a0',32,12,1);
L([6.53,5.05,3.9],'#ff2a10',3,4);
L([4.6,2.4,-4.6],'#d0e2ff',3,3.5);
L([-3.6,5.4,0.4],'#ffb366',6,4.5);L([-0.6,5.5,0.3],'#ffb366',4,4);L([-1.9,5.9,0.0],'#ffc070',3,3);
L([-6.1,1.0,-1.0],'#ffb060',3.5,3.5);
// NEW: vending display lights + cooler interior lights
L([-3.6,1.7,-4.12],'#eef6ff',2.5,1.8);L([-1.5,1.7,-4.12],'#eef6ff',2.5,1.8);L([0.3,1.7,-4.12],'#eef6ff',2.5,1.8);
_VL.forEach(p=>L(p,'#eef6ff',2.2,1.0));
// v4.1: lights of the real 2F apartment (zone 2: only light the room itself)
L([-1.75,6.55,-3.2],'#ffe0b8',30,10);L([0.15,6.55,-5.1],'#ffe9cc',10,5.5);L([-3.2,6.4,-1.4],'#ffdcb0',12,5);L([-4.35,5.65,-2.8],'#ffd49a',5,3);L([-1.85,5.1,-5.2],'#9cc4ff',3.4,3.4);
L([-3.3,5.1,-5.5],'#ffb070',3,2.6);L([.35,5.9,-3.0],'#ffd9a0',6,4);L([.9,5.8,-.8],'#ffd8a0',3.5,3.2);
L([1.4,6.5,-4.45],'#ffd9a8',3,3.2);
const TAIL=LIGHTS.length;L([CAR.X,.55,CAR.Z-2.3],'#ff1a0c',1.6,2.2,1);
const NLIGHT=LIGHTS.length;const RAINIDX=LIGHTS.map((l,i)=>l.rain?i:-1).filter(i=>i>=0).slice(0,10);
// AE86 spot lights: 2 pop-up headlights + 2 yellow fog lamps
const SPOTS=[];for(const s of [-1,1]){SPOTS.push({p:[CAR.X+s*.5,.785,CAR.Z+1.92],d:norm3([s*.02,-.26,1]),c:hexc('#fff1d6'),i:7,cos:.955,hl:1})}
for(const s of [-1,1]){SPOTS.push({p:[CAR.X+s*.55,.33,CAR.Z+2.18],d:norm3([s*.08,-.18,1]),c:hexc('#ffc840'),i:2.2,cos:.86,hl:0})}
const SP=new Float32Array(12),SD=new Float32Array(12),SC=new Float32Array(16);let HLF=1;
function updSpots(){SPOTS.forEach((o,i)=>{SP.set(o.p,i*3);SD.set(o.d,i*3);const k=o.i*(o.hl?HLF:1);SC.set([o.c[0]*k,o.c[1]*k,o.c[2]*k,o.cos],i*4)})}
const EXH=[CAR.X+.45,.24,CAR.Z-2.25];
// volumetric headlight beams (cone meshes)
const BEAM=[];for(let i=0;i<2;i++){const o=SPOTS[i];const D=o.d,up=[0,1,0],U=norm3(cross3(D,up)),V2=cross3(U,D);const len=7.5,R=len*Math.tan(Math.acos(o.cos))*1.05;
 for(let k=0;k<20;k++){const a=k/20*6.2832,b=(k+1)/20*6.2832;const q=(t)=>[o.p[0]+D[0]*len+(U[0]*Math.cos(t)+V2[0]*Math.sin(t))*R,o.p[1]+D[1]*len+(U[1]*Math.cos(t)+V2[1]*Math.sin(t))*R,o.p[2]+D[2]*len+(U[2]*Math.cos(t)+V2[2]*Math.sin(t))*R];
  const qa=q(a),qb=q(b);BEAM.push(o.p[0],o.p[1],o.p[2],0,qa[0],qa[1],qa[2],1,qb[0],qb[1],qb[2],1)}}
(function(){const B0=BEAM.slice();for(const f of [.62,.3])for(let i=0;i<B0.length;i+=12){const ax=B0[i],ay=B0[i+1],az=B0[i+2];BEAM.push(ax,ay,az,0);for(const o of [4,8])BEAM.push(ax+(B0[i+o]-ax)*f,ay+(B0[i+o+1]-ay)*f,az+(B0[i+o+2]-az)*f,1)}})();
// ================= Renderer (WebGL2, HDR, PBR, planar reflections, SSAO, bloom, DOF) =================
const canvas=host.canvas;
const gl=canvas.getContext('webgl2',{antialias:false,alpha:false,depth:true,preserveDrawingBuffer:false,powerPreference:'high-performance'});
if(!gl){host.fail('This browser does not support WebGL2. Please open the page in the latest Chrome, Edge or Safari.');throw Error('no webgl2')}
const HAVEF=!!(gl.getExtension('EXT_color_buffer_float')||gl.getExtension('EXT_color_buffer_half_float'));if(!HAVEF)console.warn('HDR render targets unavailable: 8-bit fallback (reduced highlight headroom / bloom)');const HALF=HAVEF?gl.RGBA16F:gl.RGBA8;const HTYPE=HALF===gl.RGBA16F?gl.HALF_FLOAT:gl.UNSIGNED_BYTE;
const aniso=gl.getExtension('EXT_texture_filter_anisotropic');
const COMMON=`
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
vec2 hash2(vec2 p){float n=hash(p);return vec2(n,hash(p+n*17.13));}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+17.1;a*=.5;}return v;}
`;
function sh(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.error(src.split('\n').map((l,i)=>(i+1)+': '+l).join('\n'));throw Error(gl.getShaderInfoLog(s))}return s}
function prog(vs,fs){const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,vs));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));
 const u={};const n=gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const info=gl.getActiveUniform(p,i);const nm=info.name.replace('[0]','');u[nm]=gl.getUniformLocation(p,info.name)}return {p,u}}
const H='#version 300 es\nprecision highp float;\nprecision highp int;\n';
// ---------- main surface shader ----------
const mainVS=H+`layout(location=0) in vec3 aPos;layout(location=1) in vec3 aNrm;layout(location=2) in vec2 aUV;layout(location=3) in vec3 aCol;layout(location=4) in vec3 aMat;
uniform mat4 uVP;uniform vec3 uOffset;out vec3 vPos;out vec3 vN;out vec2 vUV;out vec3 vCol;flat out vec3 vMat;
void main(){vPos=aPos+uOffset;vN=aNrm;vUV=aUV;vCol=aCol;vMat=aMat;gl_Position=uVP*vec4(vPos,1.);}`;
const NEON=`
vec3 segLobe(vec3 P,vec3 R,vec3 A,vec3 B,vec3 col,float k,float sharp){vec3 ab=B-A,w0=A-P;float a=dot(ab,ab),b=dot(ab,R),d=dot(ab,w0),e=dot(R,w0);float den=max(a-b*b,1e-4);float sg=clamp((b*e-d)/den,0.,1.);vec3 Q=A+ab*sg;vec3 dq=Q-P;float dl=length(dq);float cs=dot(R,dq/max(dl,1e-3));return col*k*pow(max(cs,0.),sharp)/(1.+.012*dl*dl);}
vec3 envNeon(vec3 P,vec3 R,float rough){float sh=mix(900.,14.,clamp(rough*1.7,0.,1.));vec3 e=mix(vec3(.008,.01,.016),vec3(.03,.04,.075),clamp(R.y*1.5+.4,0.,1.));
 e+=segLobe(P,R,vec3(-5.,3.73,1.95),vec3(2.6,3.73,1.95),vec3(1.,.93,.82),2.6,sh);
 e+=segLobe(P,R,vec3(2.9,3.73,-4.6),vec3(2.9,3.73,1.5),vec3(1.,.93,.82),2.2,sh);
 e+=segLobe(P,R,vec3(3.2,4.5,1.85),vec3(3.2,7.4,1.85),vec3(.9,.95,1.),2.2,sh);
 e+=segLobe(P,R,vec3(-5.05,6.0,3.25),vec3(-5.05,6.0,3.25),vec3(1.,.8,.5),4.,sh);
 e+=segLobe(P,R,vec3(-4.9,.4,2.2),vec3(-4.9,2.3,2.2),vec3(.7,.85,1.),1.4,sh);
 return e;}
float spillOut(vec3 P){float df=max(P.z-1.45,0.),ds=max(P.x-2.5,0.);float fx=smoothstep(-3.9,-3.3,P.x)*(1.-smoothstep(2.6,3.4,P.x));float f=fx*smoothstep(1.3,1.5,P.z)*exp(-df*.55);
 float sz=smoothstep(-3.0,-2.5,P.z)*(1.-smoothstep(1.5,2.3,P.z));float s=sz*smoothstep(2.4,2.6,P.x)*exp(-ds*.55);return (.05+.95*max(f,s))*(1.-smoothstep(3.4,4.2,P.y)*.8);}
`;
const mainFS=H+COMMON+NEON+`in vec3 vPos;in vec3 vN;in vec2 vUV;in vec3 vCol;flat in vec3 vMat;out vec4 o;
uniform sampler2D uAtlas,uRefl,uAtlas2;uniform vec2 uRes;uniform vec3 uEye;uniform float uTime,uClipY,uFlick,uHL;uniform int uMirror,uNL;uniform vec4 uLP[48],uLC[48];uniform vec3 uSig;uniform vec3 uSP[4],uSD[4];uniform vec4 uSC[4];
vec3 srgb(vec3 c){return pow(c,vec3(2.2));}
float DG(float NoH,float a){float a2=a*a;float d=NoH*NoH*(a2-1.)+1.;return a2/(3.14159*d*d+1e-6);}
vec2 ripple(vec2 p,float t){vec2 n=vec2(0);vec2 c0=floor(p);for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){vec2 c=c0+vec2(i,j);vec2 h=hash2(c);vec2 pos=c+h;float tt=fract(t*.8+h.x*7.3+h.y*3.1);vec2 d=p-pos;float dl=length(d);float r=tt*1.1;float x=dl-r;float w=exp(-x*x*90.)*(1.-tt)*(1.-tt)*sin(x*38.);n+=d/(dl+1e-4)*w;}return n;}
void main(){
 if(vPos.y<uClipY)discard;
 int mat=int(vMat.x+.5);float rough=vMat.y;float ek=vMat.z;vec3 P=vPos;vec3 N=normalize(vN);vec3 V=normalize(uEye-P);
 if(dot(N,V)<0.&&mat!=1)N=-N;
 vec3 alb=vCol;float metal=0.;vec3 emis=vec3(0);float wet=0.,pud=0.,beads=0.;
 bool incar=P.x>4.98&&P.x<6.72&&P.z>-5.25&&P.z<-.75&&P.y<1.36&&mat!=11&&mat!=12;
 bool inside=P.x>-4.99&&P.x<2.49&&P.z>-5.98&&P.z<1.44&&P.y<3.31&&P.y>.1;
 bool inside2=P.x>-4.87&&P.x<1.07&&P.z>-5.87&&P.z<-.5&&P.y>4.28&&P.y<6.92;
 bool vin=P.z>1.5&&P.z<2.235&&P.x>-4.96&&P.x<-3.14&&P.y>.95&&P.y<1.9; // inside vending display recess: stays dry
 float sk=(mat!=7&&ek<-.05)?-ek:0.;bool sIn=sk>0.;float n1=fbm(P.xz*1.7+P.y*.7);
 if(mat==1){alb=vec3(.07,.072,.078)*(.7+.6*fbm(P.xz*3.))*(.85+.3*noise(P.xz*55.));rough=.9;}
 else if(mat==2){if(N.y>.5){float row=floor(P.z/.3);vec2 g=vec2(P.x/.3+.5*mod(row,2.),P.z/.3);vec2 f=fract(g);vec2 id=floor(g);float gr=smoothstep(0.,.05,f.x)*smoothstep(1.,.95,f.x)*smoothstep(0.,.06,f.y)*smoothstep(1.,.94,f.y);
   alb=vec3(.30,.30,.31)*(.7+.5*hash(id))*mix(.35,1.,gr)*(.8+.4*n1);rough=mix(.95,.55,gr);}else{alb=vec3(.42,.41,.39)*(.8+.3*n1);rough=.85;}}
 else if(mat==3||mat==9){vec2 q=abs(N.y)>.5?P.xz:vec2(P.x+P.z,P.y);float st=noise(vec2((P.x+P.z)*7.,P.y*.35));float n2=fbm(q*2.3);alb=vCol*(.7+.45*n2)*mix(1.,.72,smoothstep(.55,.9,st)*step(abs(N.y),.5));
   if(abs(N.y)<.5&&P.y<SWLINE)alb*=.8;rough=.9;if(mat==9)alb*=.9+.2*noise(q*20.);}
 else if(mat==4){metal=1.;alb=vCol*(.92+.1*n1);}
 else if(mat==5){alb=vCol*srgb(texture(uAtlas,vUV).rgb);}
 else if(mat==14){alb=vCol*srgb(texture(uAtlas2,vUV).rgb);}else if(mat==15){vec3 t=srgb(texture(uAtlas2,vUV).rgb);alb=t*.5;emis=t*ek;}
 else if(mat==6){vec3 t=srgb(texture(uAtlas,vUV).rgb);alb=t*.5;float k=ek>8.5?ek*uFlick:ek;emis=t*k;}
 else if(mat==7){alb=vCol*.4;float k=ek;if(ek<0.){int si=int(-ek-.5);if(si>=3){k=(si==3?5.:3.)*(si==3?uHL:1.);alb=vCol*.2;}else{k=si==0?uSig.x:si==1?uSig.y:uSig.z;alb=vCol*.03;}}emis=vCol*k;}
 else if(mat==11||mat==12){if(mat==12)alb=srgb(texture(uAtlas,vUV).rgb);rough=max(rough,.06);}
 else if(mat==8){vec2 g=P.xz/.45;vec2 f=fract(g);float gr=smoothstep(0.,.02,f.x)*smoothstep(1.,.98,f.x)*smoothstep(0.,.02,f.y)*smoothstep(1.,.98,f.y);alb=vec3(.72,.71,.68)*(.93+.1*hash(floor(g)))*mix(.6,1.,gr);rough=mix(.5,.12,gr);}
 else if(mat==10){vec2 lq=vec2(vUV.x-vUV.y,(vUV.x+vUV.y)*.5);float tri=1.-abs(2.*lq.y-1.);if(abs(lq.x)>pow(max(tri,0.),1.35)*.96||lq.y<.02)discard;alb=vCol*(.7+.55*lq.y)*(.88+.24*hash(floor(P.xz*6.)+floor(P.y*6.)))*(1.-.4*smoothstep(.09,0.,abs(lq.x)));rough=.45;}
 else if(mat==13){float rw=.16;float row=floor(P.z/rw);float off=hash(vec2(row,3.7))*1.3;float px=(P.x+off)/1.1;float col=floor(px);float h=hash(vec2(col,row));float fz=fract(P.z/rw),fx=fract(px);
  float gap=smoothstep(0.,.045,fz)*smoothstep(1.,.955,fz)*smoothstep(0.,.006,fx)*smoothstep(1.,.994,fx);float gr=fbm(vec2(px*2.2+h*9.,P.z*48.));
  vec3 wb=mix(vec3(.36,.22,.11),vec3(.52,.34,.18),h);alb=wb*(.72+.5*gr)*mix(.4,1.,gap);rough=mix(.5,.26,gap*h);}
 else{alb*=.9+.15*n1;}
 // ---- rain wetness ----
 if((mat==3||mat==9)&&abs(N.y)<.5&&!sIn){vec3 Tn=normalize(cross(vec3(0,1,0),N));vec3 Bn=cross(N,Tn);vec2 bq=vec2(P.x+P.z,P.y)*9.;float h0=fbm(bq);vec2 bg=vec2(fbm(bq+vec2(.35,0.))-h0,fbm(bq+vec2(0.,.35))-h0);N=normalize(N-(Tn*bg.x+Bn*bg.y)*.9);}
 bool up=N.y>.8;
 if(up&&!sIn&&!inside&&!inside2&&!vin&&!incar&&mat!=6&&mat!=7&&mat!=10&&mat!=11&&mat!=12){wet=1.;
  float pn=fbm(P.xz*.42+vec2(3.1,7.7));pud=smoothstep(.5,.6,pn+.08*noise(P.xz*4.));
  if(P.y<.05){float gut=max(smoothstep(.45,0.,abs(P.z-3.75))*step(P.x,4.6),smoothstep(.4,0.,abs(P.x-4.78))*step(P.z,3.6));pud=max(pud,gut*.95);}
  if(P.y>4.&&P.y<4.3)pud=max(pud,smoothstep(.45,.6,pn));
  alb*=mix(.5,.22,pud);rough=mix(min(rough,.5)*.55,.02,pud);
  vec2 rp=ripple(P.xz*2.6,uTime)+.7*ripple(P.xz*4.3+7.3,uTime*1.17);
  float amp=.04+pud*.4;N=normalize(vec3(-rp.x*amp+(noise(P.xz*30.)-.5)*.06*(1.-pud),1.,-rp.y*amp+(noise(P.xz*30.+9.)-.5)*.06*(1.-pud)));}
 else if(!sIn&&!inside&&!inside2&&!vin&&!incar&&abs(N.y)<.5&&mat!=6&&mat!=7&&mat!=11&&mat!=12){float dmp=smoothstep(.9,.0,P.y-SWLINE)*.35+.15;alb*=1.-dmp*.6;rough*=.75;}
 // ---- lighting ----
 vec3 F0=mix(vec3(.04),alb,metal);vec3 dif=alb*(1.-metal);float a=max(rough*rough,.003);float NoV=max(dot(N,V),1e-3);vec3 Lo=vec3(0);
 float spill=inside?1.:spillOut(P);bool paint=(mat==11);
 for(int i=0;i<48;i++){if(i>=uNL)break;float zn=uLC[i].w;float vis=zn>1.5?(inside2?1.:0.):(zn>.5?(inside?1.:(inside2?0.:spill)):(inside?.3:(inside2?0.:1.)));if(vis<.004)continue;vec3 Lv=uLP[i].xyz-P;float d2=dot(Lv,Lv);float d=sqrt(d2);vec3 L=Lv/d;float NoL=dot(N,L);if(NoL<=0.)continue;
  float att=vis*pow(clamp(1.-pow(d/uLP[i].w,4.),0.,1.),2.)/(d2+.3);vec3 Hh=normalize(L+V);float NoH=max(dot(N,Hh),0.);float VoH=max(dot(V,Hh),0.);
  vec3 F=F0+(1.-F0)*pow(1.-VoH,5.);float k=a*.5;float Gs=(NoV/(NoV*(1.-k)+k))*(NoL/(NoL*(1.-k)+k));vec3 spec=DG(NoH,a)*F*Gs/(4.*NoV*NoL+1e-4);
  Lo+=((dif/3.14159)*(1.-F)+spec)*uLC[i].rgb*NoL*att;
  if(paint){vec3 Fc=vec3(.04+.96*pow(1.-VoH,5.));Lo+=DG(NoH,.09)*Fc*Gs/(4.*NoV*NoL+1e-4)*uLC[i].rgb*NoL*att*.6;}}
 for(int i=0;i<4;i++){vec3 Lv=uSP[i]-P;float d2=dot(Lv,Lv);float d=sqrt(d2);vec3 L=Lv/d;float cone=smoothstep(uSC[i].w,uSC[i].w+.045,dot(-L,uSD[i]));float NoL=dot(N,L);if(cone<=0.||NoL<=0.)continue;
  float att=cone*pow(clamp(1.-pow(d/16.,4.),0.,1.),2.)/(d2+.3);vec3 Hh=normalize(L+V);float NoH=max(dot(N,Hh),0.);float VoH=max(dot(V,Hh),0.);
  vec3 F=F0+(1.-F0)*pow(1.-VoH,5.);float k=a*.5;float Gs=(NoV/(NoV*(1.-k)+k))*(NoL/(NoL*(1.-k)+k));vec3 spec=DG(NoH,a)*F*Gs/(4.*NoV*NoL+1e-4);
  Lo+=((dif/3.14159)*(1.-F)+spec)*uSC[i].rgb*NoL*att;}
 vec3 sky=vec3(.016,.024,.048),gnd=vec3(.010,.010,.014);
 vec3 amb=mix(gnd,sky,N.y*.5+.5)*dif*2.5;
 if(inside){float h=clamp((P.y-.1)/3.2,0.,1.);amb+=dif*vec3(1.,.95,.86)*(.2+.15*h);}
 if(vin)amb+=dif*vec3(.9,.95,1.)*.25;
 if(inside2)amb+=dif*vec3(1.,.84,.62)*.42;if(sIn)amb+=dif*vec3(1.,.95,.86)*.34*sk;
 vec3 R=reflect(-V,N);vec3 envA=(!inside&&!sIn&&!inside2&&wet<.5&&rough<.42&&mat!=11&&mat!=12)?envNeon(P,R,rough):mix(gnd,sky*1.6,R.y*.5+.5)*((inside||sIn)?6.:(inside2?3.:1.5));amb+=(F0+(1.-F0)*pow(1.-NoV,5.)*(1.-rough))*envA;
 vec3 col=Lo+amb+emis;
 if(mat==11||mat==12){vec3 R2=reflect(-V,N);float fr2=.05+.95*pow(1.-NoV,5.);vec3 env=envNeon(P,R2,rough);col+=env*fr2*1.1;}
 if(wet>0.&&uMirror==0&&P.y<.35){vec2 suv=gl_FragCoord.xy/uRes+N.xz*vec2(.06,-.06)*(.3+pud);float bl=mix(.05,.004,pud);vec3 r=vec3(0);float tw=0.;
  for(int i=0;i<9;i++){float s=float(i)/8.-.5;float w=1.-abs(s)*1.3;r+=texture(uRefl,suv+vec2(s*bl*.12,s*bl)).rgb*w;tw+=w;}r/=tw;
  float fr=pow(1.-NoV,3.);col+=r*mix(.22,.95,pud)*(.35+.65*fr+.25);}
 float dist=length(uEye-P);col=mix(col,vec3(.018,.024,.04),1.-exp(-dist*.0035));
 o=vec4(col,1.);}`.replace(/SWLINE/g,'0.4');
// ---------- glass with rain droplets (refraction from resolved scene) ----------
const glassVS=H+`layout(location=0) in vec3 aPos;layout(location=1) in vec3 aNrm;layout(location=2) in vec2 aUV;uniform mat4 uVP;uniform vec3 uOffset;out vec3 vPos;out vec3 vN;out vec2 vUV;
void main(){vPos=aPos+uOffset;vN=aNrm;vUV=aUV;gl_Position=uVP*vec4(vPos,1.);}`;
const glassFS=H+COMMON+NEON+`in vec3 vPos;in vec3 vN;in vec2 vUV;out vec4 o;uniform sampler2D uScene;uniform vec2 uRes;uniform float uTime,uWc;uniform vec3 uEye;
vec3 staticDrops(vec2 p,float cs,float t){vec2 c=floor(p/cs);vec2 h=hash2(c);float r=cs*(.12+.28*h.y*h.y);vec2 ctr=(c+.5+(h-.5)*.5)*cs;float life=fract(t*.05+h.x*13.);float on=step(.25,hash(c+7.1))*smoothstep(0.,.1,life)*smoothstep(1.,.75,life);
 vec2 d=(p-ctr)/r;float l=dot(d,d);if(l>1.||on<.5)return vec3(0);float hgt=sqrt(1.-l);return vec3(d*.9,on*smoothstep(1.,.75,l));}
float xAt(float yy,float col,float cw,float h){return (col+.5)*cw+sin(yy*9.+h*6.)*.025+sin(yy*23.+h)*.008;}
vec4 runner(vec2 p,float t){float cw=.16;float col=floor(p.x/cw);float h=hash(vec2(col,3.7));float h2=hash(vec2(col,9.1));if(h2<.35)return vec4(0);
 float Hh=3.2;float sp=.18+.35*h;float tt=t*sp+h*20.;float stick=floor(tt)+smoothstep(.2,.95,fract(tt));float y=Hh-mod(stick*.9+h*Hh,Hh+.6)+.3;
 float x=xAt(y,col,cw,h);vec2 d=p-vec2(x,y);float rx=.016+.008*h,ry=rx*1.35;vec2 e=d/vec2(rx,ry);if(e.y>0.)e.y*=.65;float l=dot(e,e);
 vec3 drop=l<1.?vec3(e*.95,1.-smoothstep(.7,1.,l)):vec3(0);float trail=0.;
 if(d.y>0.&&d.y<1.2&&abs(p.x-xAt(p.y,col,cw,h))<rx*.6){trail=1.-smoothstep(0.,1.2,d.y);vec2 q=p/.02;vec2 cq=floor(q);vec2 hq=hash2(cq+col);vec2 dd=(fract(q)-.5-(hq-.5)*.4)/(.18+.15*hq.x);float ll=dot(dd,dd);
  if(ll<1.&&hq.y>.35*(1.-trail)){drop.z=max(drop.z,(1.-smoothstep(.6,1.,ll))*trail);drop.xy+=dd*.8;}}
 return vec4(drop,trail);}
void main(){vec2 suv=gl_FragCoord.xy/uRes;vec3 V=normalize(uEye-vPos);float NoV=abs(dot(normalize(vN),V));
 vec2 p=vUV;float t=uTime;vec3 sd=staticDrops(p,.07,t);vec3 sd2=staticDrops(p+vec2(.031,.017),.045,t*1.3);vec4 rn=runner(p,t);vec4 rn2=runner(p+vec2(.08,1.3),t*1.11+3.);
 float clear=max(rn.w,rn2.w);sd*=1.-clear;sd2*=1.-clear;
 vec2 n=sd.xy*sd.z+sd2.xy*sd2.z+rn.xy*rn.z+rn2.xy*rn2.z;float m=clamp(sd.z+sd2.z+rn.z+rn2.z,0.,1.);
 bool inP=abs(vPos.x)<7.2&&abs(vPos.z)<7.2;bool vg=inP&&vPos.z>1.6&&vPos.x<-3.1;bool cg=inP&&vPos.x>4.9&&vPos.x<6.8&&vPos.z>-5.25&&vPos.z<-.75;if(vg||cg){n=vec2(0);m=0.;}
 if(vPos.x>4.95&&vPos.x<6.75&&vPos.z>-2.95&&vPos.z<-1.9&&vPos.y>.8&&abs(vN.y)>.3){float ds=length(vec2(vPos.y-.85,vPos.z+2.02));float clr=0.;
  for(int w=0;w<2;w++){float px=w==0?5.73:6.40;float dx=vPos.x-px;float r=length(vec2(dx,ds));float th=atan(ds,dx);float inR=step(.05,r)*step(r,.56);float sw=1.75,c2=0.;
   if(uWc<.7){float phi=3.1416-sw*smoothstep(0.,1.,uWc/.7);c2=step(phi,th);}else if(uWc<1.4){c2=step(3.1416-sw,th);}else c2=step(3.1416-sw,th)*(1.-smoothstep(1.4,3.2,uWc));
   clr=max(clr,c2*inR);}
  m*=1.-clr;n*=1.-clr;}
 float dist=length(uEye-vPos);float k=clamp(1.2/dist,.01,.2);
 vec2 off=-n*k*.12;vec3 sc=vec3(0);float film=vg?0.:(1.-m)*(.0012+.0006*noise(p*8.+t*.3));
 for(int i=0;i<5;i++){vec2 jj=vec2(cos(float(i)*2.4),sin(float(i)*2.4))*film*float(i>0);sc+=texture(uScene,suv+off+jj+vec2(0,vg?0.:(noise(vec2(p.x*30.,p.y*2.-t*.6))-.5)*.0015*(1.-m))).rgb;}sc/=5.;
 sc*=vg?vec3(.98):vec3(.9,.96,.95);
 float fr=.04+.96*pow(1.-NoV,5.);vec3 env=vec3(.03,.04,.07);sc=mix(sc,env,fr*.6)+env*.4;{vec3 Rg=reflect(-V,normalize(vN));sc+=(envNeon(vPos,Rg,.04)-vec3(.01,.012,.02))*fr*(vg?.0:1.1);}
 float edge=m*(1.-smoothstep(.0,.6,length(n)<.9?1.-length(n):0.));sc*=1.-.35*smoothstep(.55,1.,length(n))*m;
 float spec=pow(max(0.,dot(normalize(vec3(n,1.)),normalize(vec3(-.4,.6,1.)))),40.)*m;sc+=vec3(1.,.95,.85)*spec*1.6;
 if(cg){vec3 Nn=normalize(vN);vec3 R=reflect(-V,Nn);float f2=.08+.92*pow(1.-NoV,4.);vec3 env2=envNeon(vPos,R,.04);
  vec3 base=texture(uScene,suv).rgb*vec3(.3,.33,.36);sc=base+env2*f2*1.4;}
 o=vec4(sc,1.);}`;
// ---------- rain / drips / splashes ----------
const rainVS=H+`layout(location=0) in vec4 aSeed;layout(location=1) in vec2 aC;uniform mat4 uVP;uniform vec3 uEye;uniform float uTime;uniform int uMode;uniform vec4 uRL[10],uRC[10];uniform vec3 uSP[4],uSD[4],uEx;uniform vec4 uSC[4];uniform vec2 uROff;out vec2 vC;out vec3 vColr;out float vA;
float groundY(vec2 p){float y=0.;if(abs(p.x)>7.2||abs(p.y)>7.2){bool bd=(p.y>9.&&(p.x<2.6||p.x>9.))||(p.x>9.&&p.y<3.6)||(p.y<-8.5&&p.x<2.5)||(p.x<-7.&&p.y<1.5&&p.y>-8.5);return bd?99.:0.;}if(p.y>1.5&&p.y<3.6&&p.x<4.6)y=.15;if(p.x>2.5&&p.x<4.6&&p.y<1.5)y=.15;if(p.x<-5.&&p.y<1.5)y=.15;
 if(p.x>-5.05&&p.x<2.85&&p.y>-6.&&p.y<1.85)y=4.22;if(p.x>-5.05&&p.x<1.25&&p.y>-6.05&&p.y<-.35)y=7.35;if(p.x<-5.15&&p.y<-1.5)y=7.8;if(p.x<-5.15&&p.y>-1.5&&p.y<1.)y=3.35;
 if(p.x>5.05&&p.x<6.65&&p.y>-5.1&&p.y<-.9){float u=p.y+3.;y=u>1.?.8:u>.15?mix(1.31,.84,(u-.15)/.85):u>-.7?1.31:u>-1.9?mix(.92,1.29,(u+1.9)/1.2):.84;}if(p.x>2.65&&p.x<3.65&&p.y>1.73&&p.y<1.97)y=7.66;return y;}
vec3 lit(vec3 p){vec3 c=vec3(.03,.035,.05);for(int i=0;i<10;i++){vec3 d=uRL[i].xyz-p;c+=uRC[i].rgb*uRL[i].w/(dot(d,d)+.8);}for(int i=0;i<4;i++){vec3 d=p-uSP[i];float dl=length(d);c+=uSC[i].rgb*smoothstep(uSC[i].w,uSC[i].w+.04,dot(d/dl,uSD[i]))/(dl*dl+.5)*.35;}return c;}
void main(){vec3 p;vec3 dir=normalize(vec3(.1,-1.,.05));float len;float w;vA=1.;
 if(uMode==0){float Ht=12.;float sp=9.+aSeed.w*4.;float y=Ht-mod(uTime*sp+aSeed.z*Ht,Ht);p=vec3(aSeed.x-(Ht-y)*.1*0.+uROff.x,y,aSeed.y+uROff.y);float g=groundY(p.xz);if(y<g){gl_Position=vec4(9,9,9,1);return;}
  len=.3+aSeed.w*.35;w=.006;vA=smoothstep(g,g+.3,y)*.9;}
 else if(uMode==1){float per=1.4+aSeed.w*2.4;float tt=mod(uTime+aSeed.z*per,per);float top=3.28;float fall=.82;float y=top-4.9*tt*tt;
  if(tt>fall||y<.15){p=vec3(aSeed.x,top-.012,aSeed.y);len=.025;w=.009;vA=.8;dir=vec3(0,-1,0);}else{p=vec3(aSeed.x,y,aSeed.y);len=.04+tt*.28;w=.008;dir=vec3(0,-1,0);}}
 else if(uMode==3){float tt=fract(uTime/2.8+aSeed.z);p=uEx+vec3((aSeed.x-.5)*.12+(aSeed.w-.5)*tt*.5,tt*tt*.8+tt*.22,-tt*.75-aSeed.y*.08);
  float s=.05+tt*.28;vec3 toC=normalize(uEye-p);vec3 rt=normalize(cross(vec3(0,1,0),toC));vec3 upv=cross(toC,rt);
  vC=aC*2.-1.;{vec3 lp=lit(p);vColr=mix(lp,vec3(dot(lp,vec3(.33))),.75)*.7+vec3(.035);}vA=smoothstep(0.,.12,tt)*(1.-tt)*(.6+.4*aSeed.w);vec3 q=p+rt*vC.x*s+upv*vC.y*s;gl_Position=uVP*vec4(q,1.);return;}
 else{if(uROff==vec2(0)&&aSeed.x>4.95&&aSeed.x<6.75&&aSeed.y>-5.2&&aSeed.y<-.8){gl_Position=vec4(9,9,9,1);return;}float tt=fract(uTime*1.7+aSeed.z);float gy=groundY(aSeed.xy+uROff);if(gy>50.){gl_Position=vec4(9,9,9,1);return;}p=vec3(aSeed.x+uROff.x,gy+.012,aSeed.y+uROff.y);float s=.02+tt*.07*(.6+aSeed.w);vec3 toC=normalize(uEye-p);vec3 rt=normalize(cross(vec3(0,1,0),toC));vec3 upv=cross(toC,rt);
  vC=aC*2.-1.;vColr=lit(p)*.9;vA=(1.-tt)*(1.-tt);vec3 q=p+rt*vC.x*s+upv*(vC.y*s*.5+s*.3);gl_Position=uVP*vec4(q,1.);return;}
 vec3 toC=normalize(uEye-p);float dc=length(uEye-p);w=max(w,dc*.0009);vA*=min(1.,.006/w*1.6);vec3 rt=normalize(cross(dir,toC));
 vec3 q=p+rt*w*(aC.x*2.-1.)-dir*len*aC.y;vC=vec2(aC.x*2.-1.,aC.y);vColr=lit(p);gl_Position=uVP*vec4(q,1.);}`;
const rainFS=H+`in vec2 vC;in vec3 vColr;in float vA;out vec4 o;uniform int uMode;uniform float uGain;
void main(){float a;if(uMode<2){float x=1.-abs(vC.x);a=x*x*(1.-vC.y*.7)*vA;}else if(uMode==3){float r=length(vC);a=exp(-r*r*3.2)*(1.-smoothstep(.85,1.,r))*vA;}else{float r=length(vC);a=(smoothstep(.45,.85,r)*smoothstep(1.,.85,r)+(1.-smoothstep(0.,.35,r))*.5)*vA;}
 o=vec4(vColr*a*uGain,1.);}`;
// ---------- fullscreen passes ----------
const fsVS=H+`out vec2 vUV;void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);vUV=p;gl_Position=vec4(p*2.-1.,0,1);}`;
const ssaoFS=H+COMMON+`in vec2 vUV;out vec4 o;uniform sampler2D uDepth;uniform mat4 uP,uIP;uniform vec2 uTex;
vec3 vp(vec2 uv){float d=texture(uDepth,uv).r;vec4 v=uIP*vec4(uv*2.-1.,d*2.-1.,1.);return v.xyz/v.w;}
void main(){float d0=texture(uDepth,vUV).r;if(d0>=1.){o=vec4(1);return;}vec3 P=vp(vUV);vec3 px=vp(vUV+vec2(uTex.x,0))-P,nx=P-vp(vUV-vec2(uTex.x,0));vec3 py=vp(vUV+vec2(0,uTex.y))-P,ny=P-vp(vUV-vec2(0,uTex.y));
 vec3 dx=abs(px.z)<abs(nx.z)?px:nx;vec3 dy=abs(py.z)<abs(ny.z)?py:ny;vec3 N=normalize(cross(dx,dy));
 float occ=0.;float rad=.55;float rot=hash(gl_FragCoord.xy)*6.283;
 for(int i=0;i<14;i++){float fi=float(i);float z=fract(fi*.618+.1);float a=fi*2.399+rot;float r=sqrt(1.-z*z);vec3 dir=vec3(r*cos(a),r*sin(a),z);if(dot(dir,N)<0.)dir=-dir;float sc=mix(.15,1.,(fi+1.)/14.);vec3 s=P+dir*rad*sc*sc;
  vec4 c=uP*vec4(s,1.);vec2 su=c.xy/c.w*.5+.5;if(su.x<0.||su.y<0.||su.x>1.||su.y>1.)continue;float sz=vp(su).z;float rc=smoothstep(0.,1.,rad/abs(P.z-sz));occ+=(sz>=s.z+.03?1.:0.)*rc;}
 float ao=1.-occ/14.;o=vec4(vec3(pow(ao,1.6)),1.);}`;
const aoApplyFS=H+`in vec2 vUV;out vec4 o;uniform sampler2D uAO;uniform vec2 uTex;uniform float uK;void main(){float s=0.;for(int j=-2;j<=2;j++)for(int i=-2;i<=2;i++)s+=texture(uAO,vUV+vec2(i,j)*uTex).r;s/=25.;o=vec4(vec3(mix(1.,s,uK)),1.);}`;
const downFS=H+`in vec2 vUV;out vec4 o;uniform sampler2D uSrc;uniform vec2 uTex;uniform int uKaris;
vec3 s(vec2 d){return texture(uSrc,vUV+d*uTex).rgb;}float lw(vec3 c){return 1./(1.+dot(c,vec3(.2126,.7152,.0722)));}
void main(){vec3 a=s(vec2(-2,2)),b=s(vec2(0,2)),c=s(vec2(2,2)),d=s(vec2(-2,0)),e=s(vec2(0)),f=s(vec2(2,0)),g=s(vec2(-2,-2)),h=s(vec2(0,-2)),i=s(vec2(2,-2)),j=s(vec2(-1,1)),k=s(vec2(1,1)),l=s(vec2(-1,-1)),m=s(vec2(1,-1));
 vec3 r;if(uKaris==1){vec3 g0=(a+b+d+e)*.25,g1=(b+c+e+f)*.25,g2=(d+e+g+h)*.25,g3=(e+f+h+i)*.25,g4=(j+k+l+m)*.25;float w0=lw(g0),w1=lw(g1),w2=lw(g2),w3=lw(g3),w4=lw(g4);
  r=(g0*w0*.125+g1*w1*.125+g2*w2*.125+g3*w3*.125+g4*w4*.5)/(w0*.125+w1*.125+w2*.125+w3*.125+w4*.5);}
 else r=e*.125+(a+c+g+i)*.03125+(b+d+f+h)*.0625+(j+k+l+m)*.125;o=vec4(min(r,vec3(400.)),1.);}`;
const upFS=H+`in vec2 vUV;out vec4 o;uniform sampler2D uSrc;uniform vec2 uTex;uniform float uW;
void main(){vec3 r=vec3(0);for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){float w=(i==0?2.:1.)*(j==0?2.:1.);r+=texture(uSrc,vUV+vec2(i,j)*uTex).rgb*w;}o=vec4(r/16.*uW,1.);}`;
const compFS=H+COMMON+`in vec2 vUV;out vec4 o;uniform sampler2D uScene,uBloom,uBlur,uDepth;uniform float uExp,uTime,uFocus,uNear,uFar,uBloomK;uniform vec2 uRes;
float lin(float d){float z=d*2.-1.;return 2.*uNear*uFar/(uFar+uNear-z*(uFar-uNear));}
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
void main(){vec3 c=texture(uScene,vUV).rgb;float z=lin(texture(uDepth,vUV).r);float coc=clamp(abs(z-uFocus)/uFocus*.9-.45,0.,1.)*.55;
 vec3 bl=texture(uBlur,vUV).rgb;c=mix(c,bl,coc*.9);
 vec3 b=texture(uBloom,vUV).rgb;c+=b*uBloomK;
 vec2 q=vUV-.5;c*=1.-dot(q,q)*.9;
 c*=uExp;c=aces(c);float l=dot(c,vec3(.2126,.7152,.0722));c=mix(vec3(l),c,1.12);
 c=pow(c,vec3(1./2.2));c+=vec3(.0,.006,.018)*(1.-c);
 c+=(hash(vUV*uRes+fract(uTime)*91.)-.5)*.018;o=vec4(c,1.);}`;
const beamVS=H+`layout(location=0) in vec4 aP;uniform mat4 uVP;out float vT;out vec3 vW;void main(){vT=aP.w;vW=aP.xyz;gl_Position=uVP*vec4(aP.xyz,1.);}`;
const beamFS=H+COMMON+`in float vT;in vec3 vW;out vec4 o;uniform float uI,uTime;void main(){if(vW.y<.01)discard;float a=pow(1.-vT,1.7)*smoothstep(0.,.06,vT);float nz=.65+.35*noise(vW.xz*2.5+vec2(0.,-uTime*3.))*noise(vW.zy*4.+uTime);o=vec4(vec3(1.,.93,.8)*a*nz*uI*.045,1.);}`;
const P_BEAM=prog(beamVS,beamFS);
const P_MAIN=prog(mainVS,mainFS),P_GLASS=prog(glassVS,glassFS),P_RAIN=prog(rainVS,rainFS),P_AO=prog(fsVS,ssaoFS),P_AOA=prog(fsVS,aoApplyFS),P_DOWN=prog(fsVS,downFS),P_UP=prog(fsVS,upFS),P_COMP=prog(fsVS,compFS);
// ---------- buffers ----------
function vao(data){const v=gl.createVertexArray();gl.bindVertexArray(v);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
 const S=STRIDE*4;[[0,3,0],[1,3,12],[2,2,24],[3,3,32],[4,3,44]].forEach(([l,n,o])=>{gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,n,gl.FLOAT,false,S,o)});gl.bindVertexArray(null);return {v,n:data.length/STRIDE}}
const VA={g:vao(G.a),dl:vao(DOORL.a),dr:vao(DOORR.a),glass:vao(GLASS.a),gl_:vao(DOORGL.a),gr:vao(DOORGR.a)};
function particles(n,gen){const d=[];const C=[[0,0],[1,0],[1,1],[0,0],[1,1],[0,1]];for(let i=0;i<n;i++){const s=gen(i);for(const c of C)d.push(s[0],s[1],s[2],s[3],c[0],c[1])}
 const v=gl.createVertexArray();gl.bindVertexArray(v);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(d),gl.STATIC_DRAW);
 gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,4,gl.FLOAT,false,24,0);gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,2,gl.FLOAT,false,24,16);gl.bindVertexArray(null);return {v,n:n*6}}
const RAIN=particles(6500,()=>[-7.2+rnd()*14.4,-7.2+rnd()*14.4,rnd(),rnd()]);
const DRIP=particles(110,(i)=>i<70?[-5+rnd()*7.85,1.86,rnd(),rnd()]:[2.86,-6+rnd()*7.85,rnd(),rnd()]);
const SPL=particles(2600,()=>{let x,z;do{x=-6.95+rnd()*13.9;z=-6.95+rnd()*13.9}while(false);return [x,z,rnd(),rnd()]});
const EMPTY=gl.createVertexArray();
const STEAM=particles(90,()=>[rnd(),rnd(),rnd(),rnd()]);
const BEAMV=(()=>{const v=gl.createVertexArray();gl.bindVertexArray(v);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(BEAM),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,4,gl.FLOAT,false,16,0);gl.bindVertexArray(null);return {v,n:BEAM.length/4}})();
const WIP={v:gl.createVertexArray(),b:gl.createBuffer(),n:0};gl.bindVertexArray(WIP.v);gl.bindBuffer(gl.ARRAY_BUFFER,WIP.b);gl.bufferData(gl.ARRAY_BUFFER,4,gl.DYNAMIC_DRAW);
[[0,3,0],[1,3,12],[2,2,24],[3,3,32],[4,3,44]].forEach(([l,n,o])=>{gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,n,gl.FLOAT,false,STRIDE*4,o)});gl.bindVertexArray(null);
function wiperPhase(t){const c=t%3.2,ss=x=>x*x*(3-2*x);return {c,th:c<.7?Math.PI-1.75*ss(c/.7):c<1.4?Math.PI-1.75*(1-ss((c-.7)/.7)):Math.PI}}
function buildWipers(th){const g=new Geo(),keep=cur;cur=g;const X=[1,0,0],Sv=norm3([0,.47,-.82]),Nw=norm3([0,.82,.47]);const mA=M('#0c0c0d',0,.45);
 for(const pv of WIPER_PIV){const p0=[pv[0]+Nw[0]*.02,pv[1]+Nw[1]*.02,pv[2]+Nw[2]*.02];const d=[X[0]*Math.cos(th)+Sv[0]*Math.sin(th),X[1]*Math.cos(th)+Sv[1]*Math.sin(th),X[2]*Math.cos(th)+Sv[2]*Math.sin(th)];
  const P=t=>[p0[0]+d[0]*t,p0[1]+d[1]*t,p0[2]+d[2]*t];tube(P(0),P(.52),.007,mA,5);const b0=P(.1),b1=P(.53);tube([b0[0]+Nw[0]*.012,b0[1]+Nw[1]*.012,b0[2]+Nw[2]*.012],[b1[0]+Nw[0]*.012,b1[1]+Nw[1]*.012,b1[2]+Nw[2]*.012],.01,mA,5);cyl(pv[0],pv[1]-.01,pv[2],.018,.03,mA,8)}
 cur=keep;gl.bindBuffer(gl.ARRAY_BUFFER,WIP.b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(g.a),gl.DYNAMIC_DRAW);WIP.n=g.a.length/STRIDE}
// ---------- textures / targets ----------
const atlasTex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,atlasTex);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,atlasCanvas);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);
gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);if(aniso)gl.texParameterf(gl.TEXTURE_2D,aniso.TEXTURE_MAX_ANISOTROPY_EXT,8);
function tex(w,h,fmt=HALF,type=HTYPE,filter=gl.LINEAR){const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texStorage2D(gl.TEXTURE_2D,1,fmt,w,h);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,filter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,filter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t}
function fbo(color,depth){const f=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,f);if(color)gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,color,0);
 if(depth){if(depth.rb)gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,depth.rb);else gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,depth,0)}return f}
let T_={},RW=0,RH=0,SAMPLES=0;
function setup(w,h){RW=w;RH=h;for(const k in T_){const o=T_[k];if(o instanceof WebGLTexture)gl.deleteTexture(o);else if(o instanceof WebGLFramebuffer)gl.deleteFramebuffer(o);else if(o instanceof WebGLRenderbuffer)gl.deleteRenderbuffer(o)}T_={};
 SAMPLES=Math.min(QS>.8?4:2,gl.getParameter(gl.MAX_SAMPLES));
 const msC=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,msC);
 try{gl.renderbufferStorageMultisample(gl.RENDERBUFFER,SAMPLES,HALF,w,h)}catch(e){SAMPLES=0;gl.renderbufferStorage(gl.RENDERBUFFER,HALF,w,h)}
 const msD=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,msD);gl.renderbufferStorageMultisample(gl.RENDERBUFFER,SAMPLES,gl.DEPTH_COMPONENT24,w,h);
 const msF=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,msF);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.RENDERBUFFER,msC);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,msD);
 if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)console.warn('msaa fbo incomplete');
 const sc=tex(w,h),dt=tex(w,h,gl.DEPTH_COMPONENT24,gl.UNSIGNED_INT,gl.NEAREST);const resF=fbo(sc,dt);
 const mw=w>>1,mh=h>>1;const mt=tex(mw,mh);const mrb=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,mrb);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT24,mw,mh);const mF=fbo(mt,{rb:mrb});
 const at=tex(mw,mh,gl.RGBA8,gl.UNSIGNED_BYTE);const aF=fbo(at);
 const mips=[];let bw=w,bh=h;for(let i=0;i<7;i++){bw=Math.max(1,bw>>1);bh=Math.max(1,bh>>1);const t=tex(bw,bh);mips.push({t,f:fbo(t),w:bw,h:bh})}
 Object.assign(T_,{msC,msD,msF,sc,dt,resF,mt,mrb,mF,at,aF});mips.forEach((m,i)=>{T_['mt'+i]=m.t;T_['mf'+i]=m.f});T_.mips=mips;T_.mw=mw;T_.mh=mh;gl.bindFramebuffer(gl.FRAMEBUFFER,null)}
// ---------- math ----------
function m4mul(a,b){const r=new Float32Array(16);for(let c=0;c<4;c++)for(let rr=0;rr<4;rr++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+rr]*b[c*4+k];r[c*4+rr]=s}return r}
function persp(f,a,n,fa){const t=1/Math.tan(f/2),nf=1/(n-fa);return new Float32Array([t/a,0,0,0,0,t,0,0,0,0,(fa+n)*nf,-1,0,0,2*fa*n*nf,0])}
function lookAt(e,t){const z=norm3([e[0]-t[0],e[1]-t[1],e[2]-t[2]]),x=norm3(cross3([0,1,0],z)),y=cross3(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-(x[0]*e[0]+x[1]*e[1]+x[2]*e[2]),-(y[0]*e[0]+y[1]*e[1]+y[2]*e[2]),-(z[0]*e[0]+z[1]*e[1]+z[2]*e[2]),1])}
function m4inv(m){const a=m,inv=new Float32Array(16);
 inv[0]=a[5]*a[10]*a[15]-a[5]*a[11]*a[14]-a[9]*a[6]*a[15]+a[9]*a[7]*a[14]+a[13]*a[6]*a[11]-a[13]*a[7]*a[10];inv[4]=-a[4]*a[10]*a[15]+a[4]*a[11]*a[14]+a[8]*a[6]*a[15]-a[8]*a[7]*a[14]-a[12]*a[6]*a[11]+a[12]*a[7]*a[10];
 inv[8]=a[4]*a[9]*a[15]-a[4]*a[11]*a[13]-a[8]*a[5]*a[15]+a[8]*a[7]*a[13]+a[12]*a[5]*a[11]-a[12]*a[7]*a[9];inv[12]=-a[4]*a[9]*a[14]+a[4]*a[10]*a[13]+a[8]*a[5]*a[14]-a[8]*a[6]*a[13]-a[12]*a[5]*a[10]+a[12]*a[6]*a[9];
 inv[1]=-a[1]*a[10]*a[15]+a[1]*a[11]*a[14]+a[9]*a[2]*a[15]-a[9]*a[3]*a[14]-a[13]*a[2]*a[11]+a[13]*a[3]*a[10];inv[5]=a[0]*a[10]*a[15]-a[0]*a[11]*a[14]-a[8]*a[2]*a[15]+a[8]*a[3]*a[14]+a[12]*a[2]*a[11]-a[12]*a[3]*a[10];
 inv[9]=-a[0]*a[9]*a[15]+a[0]*a[11]*a[13]+a[8]*a[1]*a[15]-a[8]*a[3]*a[13]-a[12]*a[1]*a[11]+a[12]*a[3]*a[9];inv[13]=a[0]*a[9]*a[14]-a[0]*a[10]*a[13]-a[8]*a[1]*a[14]+a[8]*a[2]*a[13]+a[12]*a[1]*a[10]-a[12]*a[2]*a[9];
 inv[2]=a[1]*a[6]*a[15]-a[1]*a[7]*a[14]-a[5]*a[2]*a[15]+a[5]*a[3]*a[14]+a[13]*a[2]*a[7]-a[13]*a[3]*a[6];inv[6]=-a[0]*a[6]*a[15]+a[0]*a[7]*a[14]+a[4]*a[2]*a[15]-a[4]*a[3]*a[14]-a[12]*a[2]*a[7]+a[12]*a[3]*a[6];
 inv[10]=a[0]*a[5]*a[15]-a[0]*a[7]*a[13]-a[4]*a[1]*a[15]+a[4]*a[3]*a[13]+a[12]*a[1]*a[7]-a[12]*a[3]*a[5];inv[14]=-a[0]*a[5]*a[14]+a[0]*a[6]*a[13]+a[4]*a[1]*a[14]-a[4]*a[2]*a[13]-a[12]*a[1]*a[6]+a[12]*a[2]*a[5];
 inv[3]=-a[1]*a[6]*a[11]+a[1]*a[7]*a[10]+a[5]*a[2]*a[11]-a[5]*a[3]*a[10]-a[9]*a[2]*a[7]+a[9]*a[3]*a[6];inv[7]=a[0]*a[6]*a[11]-a[0]*a[7]*a[10]-a[4]*a[2]*a[11]+a[4]*a[3]*a[10]+a[8]*a[2]*a[7]-a[8]*a[3]*a[6];
 inv[11]=-a[0]*a[5]*a[11]+a[0]*a[7]*a[9]+a[4]*a[1]*a[11]-a[4]*a[3]*a[9]-a[8]*a[1]*a[7]+a[8]*a[3]*a[5];inv[15]=a[0]*a[5]*a[10]-a[0]*a[6]*a[9]-a[4]*a[1]*a[10]+a[4]*a[2]*a[9]+a[8]*a[1]*a[6]-a[8]*a[2]*a[5];
 const det=a[0]*inv[0]+a[1]*inv[4]+a[2]*inv[8]+a[3]*inv[12];for(let i=0;i<16;i++)inv[i]/=det;return inv}
// ---------- camera / input (no UI) ----------
const CAM0={yaw:.62,pitch:.55,dist:37,target:[-.3,2.6,0]};let cam=JSON.parse(JSON.stringify(CAM0));let goal=JSON.parse(JSON.stringify(CAM0));
const ptrs=new Map();let pinch=null;
canvas.addEventListener('contextmenu',e=>e.preventDefault());
canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY,b:e.button});pinch=null});
canvas.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;const o=ptrs.get(e.pointerId);const dx=e.clientX-o.x,dy=e.clientY-o.y;o.x=e.clientX;o.y=e.clientY;
 if(ptrs.size>=2){const p=[...ptrs.values()];const d=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);const mx=(p[0].x+p[1].x)/2,my=(p[0].y+p[1].y)/2;if(pinch){goal.dist=clampD(goal.dist*pinch.d/d);panBy(mx-pinch.x,my-pinch.y)}pinch={d,x:mx,y:my};return}
 if(o.b===2||o.b===1||e.shiftKey)panBy(dx,dy);else{goal.yaw-=dx*.005;goal.pitch=Math.max(.04,Math.min(1.35,goal.pitch+dy*.004))}});
const up_=e=>{ptrs.delete(e.pointerId);pinch=null};canvas.addEventListener('pointerup',up_);canvas.addEventListener('pointercancel',up_);
canvas.addEventListener('wheel',e=>{e.preventDefault();goal.dist=clampD(goal.dist*Math.exp(e.deltaY*.0012))},{passive:false});
canvas.addEventListener('dblclick',()=>{goal=JSON.parse(JSON.stringify(CAM0))});
function clampD(d){return Math.max(4,Math.min(70,d))}
function panBy(dx,dy){const s=goal.dist*.0011;const cy=Math.cos(goal.yaw),sy=Math.sin(goal.yaw);goal.target[0]-=cy*dx*s;goal.target[2]+=sy*dx*s;goal.target[1]=Math.max(-.5,Math.min(9,goal.target[1]+dy*s))}
// ---------- frame ----------
const LP=new Float32Array(192),LC=new Float32Array(192);
// ================= v4.2: one-key cruise (C) and cruise + record once (R) =================
// No on-screen UI. The manual camera code above is untouched: cruise only writes cam/goal each frame while active.
const CR=(()=>{
 // keyframes: yaw, pitch, dist, target x,y,z, seconds to next key. Closed loop (last key blends back into the first).
 const K=[
  [ .62,.55,37  ,-.30,2.60, 0.00,3.5], // 0 wide opening (same as the manual default view)
  [ .05,.42,25  ,-.80,2.50, 0.50,3.5], // 1 wide, front of the shop
  [ .35,.20, 7.0,-4.00,1.30, 2.00,3.5], // 2 vending machines
  [-.10,.22, 6.5,-0.90,1.45, 0.20,3.5], // 3 through the front glass into the shop
  [ .25,.38, 6.8,-2.10,5.40,-0.50,3.5], // 4 apartment, south windows
  [1.25,.42, 7.5, 0.40,5.30,-3.00,3.5], // 5 apartment, east window and door
  [ .95,.22, 9.0, 5.80,0.90,-1.50,3.5], // 6 AE86
  [ .80,.50,28  ,-.30,2.60, 0.00,3.0]  // 7 pull back, blends into key 0
 ];
 const n=K.length,V=K.map(k=>[k[0],k[1],Math.log(k[2]),k[3],k[4],k[5]]),D=K.map(k=>k[6]);
 const LOOP=D.reduce((a,b)=>a+b,0);
 const Mt=V.map((v,i)=>{const p=V[(i+n-1)%n],q=V[(i+1)%n],dd=D[(i+n-1)%n]+D[i];return v.map((_,j)=>(q[j]-p[j])/dd)});
 function pose(t){t=((t%LOOP)+LOOP)%LOOP;let i=0;while(t>=D[i]&&i<n-1){t-=D[i];i++}
  const j=(i+1)%n,d=D[i],u=t/d,u2=u*u,u3=u2*u,h00=2*u3-3*u2+1,h10=u3-2*u2+u,h01=-2*u3+3*u2,h11=u3-u2,r=[];
  for(let c=0;c<6;c++)r.push(h00*V[i][c]+h10*d*Mt[i][c]+h01*V[j][c]+h11*d*Mt[j][c]);
  return {yaw:r[0],pitch:Math.max(.06,Math.min(1.4,r[1])),dist:Math.exp(r[2]),target:[r[3],r[4],r[5]]}}
 const TIN=2.0;
 const o={on:false,mode:'loop',phase:'',tin:0,ct:0,last:0,from:null,recLen:LOOP,dtO:0,LOOP,pose,K,lastFile:null};
 const baseTitle=document.title;
 function setTitle(m){document.title=(m==='rec'?'\u25CF REC ':m==='run'?'\u25B6 ':'')+baseTitle}
 function apply(p){cam.yaw=goal.yaw=p.yaw;cam.pitch=goal.pitch=p.pitch;cam.dist=goal.dist=p.dist;for(let c=0;c<3;c++)cam.target[c]=goal.target[c]=p.target[c]}
 // ---------- recorder (records to memory, saves ONE file when the cruise loop ends) ----------
 let rec=null,prevFixQ;
 function pickMime(){if(!window.MediaRecorder||!MediaRecorder.isTypeSupported)return '';
  for(const m of ['video/mp4;codecs=avc1.640028','video/mp4;codecs=avc1.4D401F','video/mp4;codecs=avc1.42E01E','video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'])if(MediaRecorder.isTypeSupported(m))return m;return ''}
 function save(blob,mime){const ext=/mp4/.test(mime)?'mp4':'webm',d=new Date(),p2=x=>String(x).padStart(2,'0');
  const name='rainy-7eleven-cruise-'+d.getFullYear()+p2(d.getMonth()+1)+p2(d.getDate())+'-'+p2(d.getHours())+p2(d.getMinutes())+p2(d.getSeconds())+'.'+ext;
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.style.display='none';document.body.appendChild(a);a.click();
  o.lastFile={name,size:blob.size,type:blob.type};setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},15000)}
 function recStart(){
  if(!window.MediaRecorder||!canvas.captureStream){console.warn('MediaRecorder / captureStream unavailable: cruise only, nothing recorded');return false}
  const mt=pickMime(),stream=canvas.captureStream(30),bps=Math.round(Math.min(30e6,Math.max(6e6,canvas.width*canvas.height*30*.2)));
  let mr;try{mr=new MediaRecorder(stream,mt?{mimeType:mt,videoBitsPerSecond:bps}:{videoBitsPerSecond:bps})}catch(e){try{mr=new MediaRecorder(stream)}catch(e2){console.warn('MediaRecorder failed',e2);return false}}
  const r={mr,chunks:[],keep:true,mime:mr.mimeType||mt||'video/webm',w:canvas.width,h:canvas.height};
  mr.ondataavailable=e=>{if(e.data&&e.data.size)r.chunks.push(e.data)};
  mr.onstop=()=>{stream.getTracks().forEach(t=>t.stop());o.dbg={keep:r.keep,chunks:r.chunks.length,bytes:r.chunks.reduce((s,c)=>s+c.size,0),mime:r.mime,w:r.w,h:r.h};if(r.keep&&r.chunks.length)save(new Blob(r.chunks,{type:r.mime.split(';')[0]}),r.mime);else if(r.keep)console.warn('recording produced no data (nothing saved)')};
  prevFixQ=window.__fixQ;window.__fixQ=true;mr.start(1000);rec=r;setTitle('rec');return true}
 function recEnd(keep){if(!rec)return;const r=rec;rec=null;r.keep=keep;window.__fixQ=prevFixQ;try{if(r.mr.state!=='inactive')r.mr.stop()}catch(e){}}
 // ---------- control ----------
 o.start=function(mode){if(rec)recEnd(false);o.on=true;o.mode=mode;o.phase='in';o.tin=0;o.ct=0;o.last=performance.now()/1000;
  o.from={yaw:cam.yaw,pitch:cam.pitch,dist:cam.dist,target:cam.target.slice()};setTitle('run')};
 o.stop=function(){if(rec)recEnd(false);o.on=false;o.phase='';setTitle('');
  goal.yaw=cam.yaw;goal.pitch=cam.pitch;goal.dist=cam.dist;for(let c=0;c<3;c++)goal.target[c]=cam.target[c]};
 o.step=function(now){const dt=o.dtO>0?o.dtO:Math.min(.25,Math.max(0,now-o.last));o.last=now;
  if(o.phase==='in'){o.tin+=dt;const u=Math.min(1,o.tin/TIN),e=u*u*(3-2*u),a=o.from,b=pose(0);
   const y0=b.yaw+6.283185307*Math.round((a.yaw-b.yaw)/6.283185307);
   apply({yaw:a.yaw+(y0-a.yaw)*e,pitch:a.pitch+(b.pitch-a.pitch)*e,dist:Math.exp(Math.log(a.dist)+(Math.log(b.dist)-Math.log(a.dist))*e),target:[0,1,2].map(c=>a.target[c]+(b.target[c]-a.target[c])*e)});
   if(u>=1){o.phase='run';o.ct=0;if(o.mode==='rec'&&!recStart())o.mode='loop'}return}
  o.ct+=dt;
  if(o.mode==='rec'&&o.ct>=o.recLen){apply(pose(0));const r=rec;if(r)recEnd(true);o.on=false;o.phase='';setTitle('');return}
  apply(pose(o.ct))};
 o.recording=()=>!!rec;
 return o})();
window.__CR=CR;
addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;
 if(e.code==='KeyC'){if(CR.on)CR.stop();else CR.start('loop')}
 else if(e.code==='KeyR'){if(CR.on&&CR.mode==='rec')CR.stop();else CR.start(window.MediaRecorder?'rec':'loop')}
 else if(e.code==='Escape'){if(CR.on)CR.stop()}});
for(const ev of ['pointerdown','wheel','dblclick'])addEventListener(ev,()=>{if(CR.on)CR.stop()},{capture:true,passive:true});
addEventListener('resize',()=>{if(CR.recording())CR.stop()});
docOn('visibilitychange',()=>{if(document.hidden&&CR.recording())CR.stop()});
if(/#cruise/.test(location.hash))setTimeout(()=>CR.start('loop'),600);

// ---------- the neighbourhood around the block: only drawn in first person, so the orbit diorama is unchanged ----------
// The streets get their own 2048² texture atlas (material 14 = lit by the scene, 15 = self-lit), painted here:
// shop interiors and signboards, windows, balcony doors, office floors, tenant signs, lattice, vending fronts and more.
const ATL2=(()=>{
 let tr=7331;const Q=()=>{tr=(tr*16807)%2147483647;return (tr-1)/2147483646},qk=a=>a[Math.floor(Q()*a.length)],qr=(a,b)=>a+Q()*(b-a);
 const S=2048,SH=2304,cv=document.createElement('canvas');cv.width=S;cv.height=SH;const C=cv.getContext('2d');C.fillStyle='#808080';C.fillRect(0,0,S,SH);   // 2048 wide, 2304 tall
 let px=4,py=4,ph=0;const R2={};
 function al(name,w,h,fn){if(px+w+4>S){px=4;py+=ph+6;ph=0}const x=px,y=py;px+=w+6;ph=Math.max(ph,h);C.save();C.translate(x,y);C.beginPath();C.rect(0,0,w,h);C.clip();fn(C,w,h);C.restore();
  R2[name]=[(x+.5)/S,1-(y+h-.5)/SH,(x+w-.5)/S,1-(y+.5)/SH]}
 const fr=(X,x,y,w,h,c)=>{X.fillStyle=c;X.fillRect(x,y,w,h)};
 const gr=(X,x0,y0,x1,y1,st)=>{const g=X.createLinearGradient(x0,y0,x1,y1);st.forEach(([o,c])=>g.addColorStop(o,c));return g};
 const rg=(X,x,y,r,c0,c1)=>{const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,c0);g.addColorStop(1,c1);return g};
 const tx=(X,s,x,y,sz,c,wt='700',al_='center',f=JP)=>{X.font=wt+' '+sz+'px '+f;X.fillStyle=c;X.textAlign=al_;X.textBaseline='middle';X.fillText(s,x,y)};
 const vt=(X,s,x,y,sz,c)=>{[...s].forEach((ch,i)=>tx(X,ch,x,y+i*sz*1.05,sz,c))};
 const ell=(X,x,y,rx,ry,c)=>{X.fillStyle=c;X.beginPath();X.ellipse(x,y,rx,ry,0,0,6.2832);X.fill()};
 const hsl=(h,s,l)=>'hsl('+h+','+s+'%,'+l+'%)';
 const person=()=>{};   // no figures in the textures: silhouettes read as stray user icons
 // a lit room seen through shop glass: wall, ceiling lights, floor, glass sheen
 function room(X,w,h,wall,wall2,floor,lc='rgba(255,250,235,.95)'){X.fillStyle=gr(X,0,0,0,h,[[0,wall2],[.55,wall],[1,wall]]);X.fillRect(0,0,w,h);
  fr(X,0,0,w,h*.09,'rgba(0,0,0,.25)');for(let x=w*.08;x<w;x+=w*.22)fr(X,x,h*.025,w*.12,h*.03,lc);
  X.fillStyle=floor;X.beginPath();X.moveTo(0,h);X.lineTo(w,h);X.lineTo(w*.88,h*.8);X.lineTo(w*.12,h*.8);X.fill();
  X.strokeStyle='rgba(0,0,0,.12)';X.lineWidth=1;for(let i=1;i<6;i++){X.beginPath();X.moveTo(w*.12+i*w*.76/6,h*.8);X.lineTo(i*w/6,h);X.stroke()}}
 function sheen(X,w,h,sticker){X.fillStyle=gr(X,0,0,w,h,[[0,'rgba(255,255,255,0)'],[.42,'rgba(255,255,255,0)'],[.5,'rgba(255,255,255,.09)'],[.58,'rgba(255,255,255,0)'],[1,'rgba(255,255,255,0)']]);X.fillRect(0,0,w,h);
  fr(X,0,h-6,w,6,'rgba(0,0,0,.35)');if(sticker){fr(X,w*.06,h*.62,52,26,'rgba(255,255,255,.88)');tx(X,sticker,w*.06+26,h*.62+13,11,'#c0282d','700','center','sans-serif')}}
 // ---- 14 shop types: interior painter + signboard ----
 const SHOPS=[
  {name:'ラーメン 龍',sub:'RAMEN · RYU',bg:'#b3121f',fg:'#fff4e0',bd:'#ffd23a',lit:[1,.82,.6],p(X,w,h){room(X,w,h,'#7a4526','#9a5a32','#3b2a20');
   const m=['醤油','味噌','塩','豚骨','餃子','炒飯','つけ麺','替玉','ビール'];m.forEach((s,i)=>{const x=14+i*(w-28)/m.length;fr(X,x,h*.12,26,h*.36,'#f4ecd8');vt(X,s,x+13,h*.16,13,'#2a1a10')});
   fr(X,0,h*.58,w,h*.1,'#5a3a22');fr(X,0,h*.58,w,4,'#9a6a40');for(let x=30;x<w;x+=56){fr(X,x+8,h*.74,4,h*.14,'#222');ell(X,x+10,h*.72,16,6,'#c0282d');if(Q()<.5)person(X,x+10,h*.72,26)}sheen(X,w,h,'営業中')}},
  {name:'喫茶 月光',sub:'COFFEE & TEA',bg:'#1f3a2a',fg:'#f3e6c8',bd:'#c9a86a',lit:[1,.78,.52],p(X,w,h){room(X,w,h,'#4a3020','#2a1a12','#2a1c14','rgba(255,214,150,.6)');
   for(let x=50;x<w;x+=110){X.strokeStyle='#111';X.beginPath();X.moveTo(x,0);X.lineTo(x,h*.3);X.stroke();X.fillStyle=rg(X,x,h*.33,46,'rgba(255,210,140,.9)','rgba(255,210,140,0)');X.fillRect(x-46,h*.33-46,92,92);ell(X,x,h*.32,14,9,'#ffd9a0')}
   fr(X,w*.68,h*.18,w*.22,h*.3,'#1e2a22');tx(X,'COFFEE',w*.79,h*.25,18,'#f0eadc','700','center','serif');tx(X,'ブレンド ¥450',w*.79,h*.37,12,'#f0eadc');
   for(let x=40;x<w;x+=120){ell(X,x,h*.7,34,8,'#6b4a30');fr(X,x-3,h*.7,6,h*.18,'#3a2818');if(Q()<.6)person(X,x+28,h*.74,30,'#1b1410')}
   ell(X,12,h*.55,24,40,'#2d4a22');ell(X,w-14,h*.5,22,46,'#2d4a22');sheen(X,w,h,'OPEN')}},
  {name:'ドラッグ ミナト',sub:'DRUG MINATO',bg:'#ffffff',fg:'#1747b5',bd:'#e2232a',lit:[.92,.97,1],p(X,w,h){room(X,w,h,'#f2f5f8','#ffffff','#d9dde2');
   for(let y=h*.2;y<h*.76;y+=15){fr(X,0,y+11,w,3,'#c9ced4');for(let x=2;x<w;){const pw=5+Q()*9;fr(X,x,y,pw,11,hsl(Math.floor(Q()*360),60+Q()*30,45+Q()*20));x+=pw+1}}
   for(let i=0;i<6;i++){const x=Q()*(w-50),y=h*.2+Q()*h*.5;fr(X,x,y,44,18,'#ffe600');tx(X,'特価',x+22,y+9,12,'#e2232a')}fr(X,w*.25,h*.1,w*.5,20,'#e2232a');tx(X,'ポイント5倍デー',w*.5,h*.1+10,14,'#fff');
   person(X,w*.3,h*.86,36,'#2a2f36');person(X,w*.72,h*.88,40,'#2a2f36');sheen(X,w,h,'24H')}},
  {name:'コインランドリー',sub:'COIN LAUNDRY 24H',bg:'#1e6fd0',fg:'#ffffff',bd:'#9fd0ff',lit:[.9,.96,1],p(X,w,h){room(X,w,h,'#e6edf3','#f6f9fb','#c8d0d8');
   for(let r=0;r<2;r++)for(let x=8;x<w-60;x+=70){const y=h*.2+r*h*.3;fr(X,x,y,62,h*.28,'#f4f6f8');X.strokeStyle='#b8c0c8';X.strokeRect(x,y,62,h*.28);ell(X,x+31,y+h*.15,22,22,'#9aa3ab');ell(X,x+31,y+h*.15,17,17,'#3b4c5a');
    if(Q()<.5){X.strokeStyle=hsl(Math.floor(Q()*360),70,60);X.lineWidth=4;X.beginPath();X.arc(x+31,y+h*.15,10,Q()*6,Q()*6+3);X.stroke();X.lineWidth=1}fr(X,x+40,y+6,16,6,'#2bd47a')}
   tx(X,'COIN LAUNDRY 24H',w*.5,h*.12,16,'#1e6fd0','800','center','sans-serif');fr(X,w*.1,h*.82,w*.5,10,'#6b7480');person(X,w*.8,h*.9,38,'#30363d');sheen(X,w,h)}},
  {name:'ベーカリー 麦の穂',sub:'BOULANGERIE',bg:'#f2e3c6',fg:'#6b3b1a',bd:'#a8682a',lit:[1,.85,.62],p(X,w,h){room(X,w,h,'#d9a76a','#e8c08a','#6b4a30');
   for(let r=0;r<3;r++){const y=h*.28+r*h*.17;fr(X,10,y+16,w-20,6,'#7a4e2a');for(let x=18;x<w-20;x+=26+Q()*10)ell(X,x,y+9,11+Q()*5,7+Q()*2,qk(['#c98a3c','#a8682a','#e0b070','#8a5020']))}
   fr(X,w*.1,h*.8,w*.8,h*.12,'rgba(220,235,240,.5)');for(let x=w*.14;x<w*.86;x+=22)fr(X,x,h*.83,14,8,qk(['#f3d6e0','#fff','#e8c07a','#c0282d']));sheen(X,w,h,'焼きたて')}},
  {name:'古書 書林堂',sub:'SECOND-HAND BOOKS',bg:'#141414',fg:'#e8c86a',bd:'#6b5a2a',lit:[1,.82,.58],p(X,w,h){room(X,w,h,'#3a2c22','#4a3828','#2a2018','rgba(255,220,170,.8)');
   for(let r=0;r<5;r++){const y=h*.15+r*h*.13;fr(X,4,y+h*.11,w-8,4,'#5a4030');for(let x=6;x<w-6;){const bw=4+Q()*7,bh=h*.07+Q()*h*.04;fr(X,x,y+h*.11-bh,bw,bh,hsl(Math.floor(Q()*360),25+Q()*30,25+Q()*30));x+=bw+1}}
   fr(X,w*.3,h*.82,w*.4,h*.1,'#5a4030');for(let i=0;i<5;i++)fr(X,w*.32+i*w*.07,h*.76,w*.05,h*.06,hsl(Math.floor(Q()*360),30,40));person(X,w*.78,h*.9,40,'#120e0b');sheen(X,w,h)}},
  {name:'BARBER オカダ',sub:'HAIR SALON',bg:'#14284a',fg:'#ffffff',bd:'#e2232a',lit:[.95,.98,1],p(X,w,h){room(X,w,h,'#e9eef0','#f6f8f9','#222');
   for(let y=h*.8,i=0;i<5;i++)for(let x=0;x<w;x+=16)if((x/16+i)%2<1)fr(X,x,y+i*h*.04,16,h*.04,'#eee');
   for(let x=30;x<w-60;x+=110){fr(X,x,h*.18,70,h*.36,'#9fc4d6');X.strokeStyle='#5a6670';X.lineWidth=3;X.strokeRect(x,h*.18,70,h*.36);X.lineWidth=1;fr(X,x+15,h*.58,40,h*.18,'#7a1f25');fr(X,x+30,h*.76,10,h*.08,'#333');if(Q()<.5)person(X,x+35,h*.6,30,'#1a1a1a')}sheen(X,w,h,'OPEN')}},
  {name:'フラワー 花音',sub:'FLOWER SHOP',bg:'#ffb6c8',fg:'#ffffff',bd:'#2f6a46',lit:[1,.92,.85],p(X,w,h){room(X,w,h,'#24301f','#34442c','#3a3a34');
   for(let x=14;x<w;x+=40){fr(X,x,h*.7,28,h*.18,'#4a4e52');for(let k=0;k<10;k++){X.strokeStyle='#2f6a2a';X.beginPath();const fx=x+4+Q()*20,fy=h*.42+Q()*h*.26;X.moveTo(x+14,h*.7);X.lineTo(fx,fy);X.stroke();ell(X,fx,fy,4+Q()*4,4+Q()*4,qk(['#ff5a8a','#ffd23a','#ff8a3a','#c86bff','#ffffff','#ff3040','#ffb0d0']))}}
   for(let x=30;x<w;x+=90){X.strokeStyle='#333';X.beginPath();X.moveTo(x,0);X.lineTo(x,h*.12);X.stroke();ell(X,x,h*.18,22,14,'#3d6a2e')}sheen(X,w,h)}},
  {name:'不動産 あおば',sub:'賃貸・売買',bg:'#1f7a4a',fg:'#ffffff',bd:'#bfe8cf',lit:[.95,1,.96],p(X,w,h){room(X,w,h,'#cfd6dc','#e2e8ec','#9aa3ab');
   for(let r=0;r<3;r++)for(let c=0;c<7;c++){const x=8+c*(w-16)/7,y=h*.1+r*h*.27,cw=(w-16)/7-6,ch=h*.24;fr(X,x,y,cw,ch,'#fbfbf8');fr(X,x,y,cw,10,qk(['#1f7a4a','#1e6fd0','#e07a1a']));
    X.strokeStyle='#888';X.strokeRect(x+6,y+16,cw*.55,ch*.42);X.beginPath();X.moveTo(x+6+cw*.3,y+16);X.lineTo(x+6+cw*.3,y+16+ch*.42);X.stroke();tx(X,(3+Q()*9).toFixed(1)+'万',x+cw*.5,y+ch*.78,13,'#d0201a');tx(X,qk(['1K','1LDK','2DK','2LDK']),x+cw*.82,y+ch*.4,10,'#333')}sheen(X,w,h)}},
  {name:'カラオケ ルナ',sub:'KARAOKE',bg:'#3a0f5a',fg:'#ff6bd6',bd:'#35e0ff',lit:[.8,.5,1],p(X,w,h){room(X,w,h,'#2a1440','#120820','#140a1c','rgba(255,120,240,.7)');
   X.shadowBlur=12;for(const [c,y] of [['#ff4fd8',h*.22],['#35e0ff',h*.3]]){X.shadowColor=c;X.strokeStyle=c;X.lineWidth=3;X.beginPath();X.moveTo(10,y);X.lineTo(w-10,y);X.stroke()}
   X.shadowColor='#ff4fd8';tx(X,'KARAOKE',w*.5,h*.45,30,'#ffd0f4','800','center','sans-serif');X.shadowBlur=0;X.lineWidth=1;
   for(let i=0;i<4;i++)fr(X,20+i*(w-40)/4,h*.55,(w-40)/4-12,h*.2,hsl(Math.floor(Q()*360),60,45));fr(X,w*.3,h*.78,w*.4,h*.08,'#ff4fd8');sheen(X,w,h)}},
  {name:'BOUTIQUE リラ',sub:'SELECT SHOP',bg:'#0e0e0e',fg:'#d9b46a',bd:'#d9b46a',lit:[1,.9,.75],p(X,w,h){room(X,w,h,'#efe7dc','#fbf6ee','#c8bca8');
   for(const y of [h*.25,h*.5]){fr(X,10,y,w-20,3,'#555');for(let x=16;x<w-24;x+=14+Q()*8){X.fillStyle=hsl(Math.floor(Q()*360),20+Q()*40,30+Q()*40);X.beginPath();X.moveTo(x,y+3);X.lineTo(x+12,y+3);X.lineTo(x+14,y+h*.2);X.lineTo(x-2,y+h*.2);X.fill()}}
   for(const x of [w*.2,w*.8]){ell(X,x,h*.32,10,12,'#d8d4cc');fr(X,x-14,h*.38,28,h*.36,'#d8d4cc')}sheen(X,w,h,'SALE')}},
  {name:'ゲーム ネオン',sub:'GAME CENTER',bg:'#ffd200',fg:'#d0201a',bd:'#d0201a',lit:[1,.7,.9],p(X,w,h){room(X,w,h,'#140c24','#24123e','#0e0a16','rgba(255,90,200,.8)');
   for(let x=10;x<w-50;x+=78){const c=hsl(Math.floor(Q()*360),90,55);fr(X,x,h*.18,68,h*.68,c);fr(X,x+6,h*.24,56,h*.36,'rgba(200,240,255,.35)');for(let k=0;k<8;k++)ell(X,x+12+Q()*44,h*.5+Q()*h*.08,6,6,hsl(Math.floor(Q()*360),80,65));fr(X,x+6,h*.64,56,h*.12,'#111')}sheen(X,w,h)}},
  {name:'寿司 まる',sub:'SUSHI · MARU',bg:'#2a1c12',fg:'#ffffff',bd:'#c9a86a',lit:[1,.88,.7],p(X,w,h){room(X,w,h,'#c9b08a','#e0caa4','#5a4030');
   fr(X,0,h*.55,w,h*.12,'#e8d5b0');fr(X,0,h*.5,w,h*.05,'rgba(220,240,250,.6)');for(let x=20;x<w;x+=22)ell(X,x,h*.53,7,4,qk(['#ff7a4a','#f2f2f2','#c0282d','#ffcf6a']));
   for(let x=60;x<w;x+=140){}for(let x=30;x<w;x+=70)if(Q()<.6)person(X,x,h*.92,32)
   ;for(let x=40;x<w;x+=120){ell(X,x,h*.12,12,16,'#e8402a')}sheen(X,w,h,'営業中')}},
  {name:'BAR 夜鳴',sub:'COCKTAILS',bg:'#0d1428',fg:'#ffb84a',bd:'#ffb84a',lit:[1,.72,.42],p(X,w,h){room(X,w,h,'#1a120c','#2a1a10','#120c08','rgba(255,170,90,.5)');
   for(let r=0;r<3;r++){const y=h*.18+r*h*.14;fr(X,10,y+h*.1,w-20,3,'#ffb060');for(let x=16;x<w-16;x+=10+Q()*6){fr(X,x,y+h*.1-h*(.05+Q()*.04),6,h*.09,hsl(20+Q()*40,60,30+Q()*30));}}
   fr(X,0,h*.66,w,h*.08,'#3a2414');for(let x=40;x<w;x+=80)if(Q()<.6)person(X,x,h*.66,30,'#0a0705');sheen(X,w,h)}}];
 SHOPS.forEach((s,i)=>al('shop'+i,448,240,s.p));
 SHOPS.forEach((s,i)=>al('sign'+i,448,80,(X,w,h)=>{fr(X,0,0,w,h,s.bg);X.strokeStyle=s.bd;X.lineWidth=5;X.strokeRect(5,5,w-10,h-10);X.lineWidth=1;
  fr(X,0,0,w,h*.35,'rgba(255,255,255,.08)');tx(X,s.name,w/2,h*.42,36,s.fg,'800');tx(X,s.sub,w/2,h*.8,13,s.fg,'600','center','sans-serif')}));
 // ---- tall row: vertical tenant signs, lattice, vending fronts, barber pole, posters ----
 const TEN=['スナック','麻雀','歯科','整体','英会話','占い','ネイル','焼肉','バー','学習塾','司法書士','カフェ','鍼灸','写真館'];
 for(let i=0;i<6;i++)al('vs'+i,64,320,(X,w,h)=>{for(let k=0;k<4;k++){const y=k*80;fr(X,0,y,w,78,hsl(Math.floor(Q()*360),55+Q()*35,30+Q()*30));fr(X,3,y+3,w-6,72,'rgba(255,255,255,.1)');const s=qk(TEN),sz=Math.min(18,64/s.length);vt(X,s,w/2,y+8+sz/2,sz,'#ffffff')}});
 al('lattice',128,256,(X,w,h)=>{X.fillStyle=gr(X,0,0,0,h,[[0,'#ffe2b0'],[1,'#f0b870']]);X.fillRect(0,0,w,h);for(let x=0;x<w;x+=9)fr(X,x,0,4,h,'#2a1a10');for(let y=0;y<h;y+=64)fr(X,0,y,w,5,'#2a1a10');fr(X,0,0,w,6,'#2a1a10');fr(X,0,h-8,w,8,'#2a1a10')});
 for(let i=0;i<3;i++)al('vend'+i,128,256,(X,w,h)=>{const body=['#d8202a','#1e5fc0','#f2f2f0'][i];fr(X,0,0,w,h,body);fr(X,8,10,w-16,h*.5,'#eaf3ff');
  for(let r=0;r<3;r++)for(let c=0;c<6;c++){const x=12+c*(w-24)/6,y=18+r*h*.16;fr(X,x,y+6,(w-24)/6-4,h*.1,hsl(Math.floor(Q()*360),70,50));fr(X,x,y+h*.115,(w-24)/6-4,5,'#ffd23a')}
  fr(X,10,h*.6,w*.6,h*.1,'#111');tx(X,qk(['つめた〜い','あったか〜い']),w*.4,h*.65,10,i===0?'#3fc0ff':'#ff6a3a');fr(X,w*.72,h*.6,w*.18,h*.22,'#222');fr(X,10,h*.8,w-20,h*.14,'#1b1b1b')});
 al('barber',64,256,(X,w,h)=>{for(let y=-h;y<h*2;y+=36){X.fillStyle=['#e2232a','#ffffff','#1e5fc0','#ffffff'][Math.floor((y+h)/36)%4];X.beginPath();X.moveTo(0,y);X.lineTo(w,y-30);X.lineTo(w,y+6);X.lineTo(0,y+36);X.fill()}});
 const PST=[['夏祭り','8/12 SAT'],['LIVE','ライブハウス'],['入居者募集','TEL 0120']];
 PST.forEach((p,i)=>al('post'+i,128,176,(X,w,h)=>{const hue=[20,280,200][i];fr(X,0,0,w,h,hsl(hue,70,55));fr(X,8,8,w-16,h*.55,hsl(hue+40,60,75));ell(X,w/2,h*.33,30,30,hsl(hue+180,70,55));tx(X,p[0],w/2,h*.72,22,'#fff','800');tx(X,p[1],w/2,h*.88,12,'#fff')}));
 // ---- windows (lit and dark variants) ----
 const WIN=[(X,w,h)=>{X.fillStyle=rg(X,w*.5,h*.3,w*.8,'#ffe2b0','#a06a38');X.fillRect(0,0,w,h);for(const x0 of [0,w*.72]){fr(X,x0,0,w*.28,h,'#e8d2a8');for(let x=x0+4;x<x0+w*.28;x+=8)fr(X,x,0,2,h,'rgba(120,80,40,.25)')}},
  (X,w,h)=>{fr(X,0,0,w,h,'#dfe9f4');for(let y=0;y<h;y+=7)fr(X,0,y,w,4,'#f4f8ff')},
  (X,w,h)=>{X.fillStyle=gr(X,0,0,w,h,[[0,'#1a2230'],[.5,'#0d121a'],[1,'#141a24']]);X.fillRect(0,0,w,h);X.fillStyle='rgba(160,190,230,.12)';X.beginPath();X.moveTo(w*.2,0);X.lineTo(w*.45,0);X.lineTo(w*.1,h);X.lineTo(0,h);X.fill()},
  (X,w,h)=>{X.fillStyle=gr(X,0,0,0,h,[[0,'#ffcf8a'],[1,'#e8964a']]);X.fillRect(0,0,w,h);for(let x=0;x<w;x+=10)fr(X,x,0,3,h,'rgba(140,70,20,.2)')},
  (X,w,h)=>{fr(X,0,0,w,h,'#26324a');X.fillStyle=rg(X,w*.6,h*.5,w*.7,'rgba(120,170,255,.9)','rgba(40,60,120,0)');X.fillRect(0,0,w,h);fr(X,w*.1,h*.7,w*.5,h*.2,'#141a28')},
  (X,w,h)=>{fr(X,0,0,w,h,'#3a3a40');for(let x=0;x<w;x+=10)fr(X,x,0,4,h,'rgba(0,0,0,.25)')},
  (X,w,h)=>{X.fillStyle=rg(X,w*.5,h*.4,w*.8,'#ffe4ec','#c87a90');X.fillRect(0,0,w,h);fr(X,0,0,w*.3,h,'#f0a8bc');fr(X,w*.7,0,w*.3,h,'#f0a8bc')},
  (X,w,h)=>{fr(X,0,0,w,h,'#0e1420');for(let i=0;i<14;i++)ell(X,Q()*w,Q()*h,1.5,1.5,'rgba(255,220,160,.5)')},
  (X,w,h)=>{fr(X,0,0,w,h,'#eef8ee');fr(X,0,h*.55,w,h*.45,'#c8d4c8');for(let x=6;x<w;x+=30)fr(X,x,h*.6,24,h*.3,'#e8ece8')},
  (X,w,h)=>{X.fillStyle=rg(X,w*.5,h*.3,w*.8,'#ffe8c0','#b07840');X.fillRect(0,0,w,h);for(let x=8;x<w;x+=28){ell(X,x+10,h*.72,10,14,'#24381e');fr(X,x+4,h*.8,12,h*.2,'#3a2a1a')}}];
 WIN.forEach((f,i)=>al('w'+i,128,128,f));
 // balcony sliding doors: lit curtains, lace, dark, lit with clutter
 const BD=[(X,w,h)=>{X.fillStyle=rg(X,w*.5,h*.35,w*.7,'#ffe0b0','#a86a38');X.fillRect(0,0,w,h);fr(X,0,0,w*.32,h,'#d8b88a');fr(X,w*.68,0,w*.32,h,'#d8b88a')},
  (X,w,h)=>{fr(X,0,0,w,h,'#f4efe4');for(let x=0;x<w;x+=6)fr(X,x,0,2,h,'rgba(200,180,150,.35)');X.fillStyle=rg(X,w*.5,h*.4,w*.6,'rgba(255,230,190,.8)','rgba(255,230,190,0)');X.fillRect(0,0,w,h)},
  (X,w,h)=>{fr(X,0,0,w,h,'#10151e');X.fillStyle='rgba(150,180,220,.1)';X.beginPath();X.moveTo(w*.3,0);X.lineTo(w*.55,0);X.lineTo(w*.2,h);X.lineTo(0,h);X.fill()},
  (X,w,h)=>{X.fillStyle=rg(X,w*.4,h*.4,w*.7,'#fff0d0','#b88050');X.fillRect(0,0,w,h);fr(X,w*.55,h*.55,w*.3,h*.45,'#4a3828');ell(X,w*.2,h*.7,16,26,'#2d4a22')}];
 BD.forEach((f,i)=>al('bd'+i,192,160,(X,w,h)=>{f(X,w,h);fr(X,0,0,w,5,'#222');fr(X,w/2-3,0,6,h,'#222');fr(X,0,h-5,w,5,'#222')}));
 // ---- office floors, shutter, balcony rail, mailboxes, A-frame menus, AC fan ----
 for(let i=0;i<3;i++)al('off'+i,256,96,(X,w,h)=>{const on=i<2;fr(X,0,0,w,h,on?'#dfe7ee':'#0e131a');if(on){for(let x=8;x<w;x+=40)fr(X,x,4,26,4,i?'rgba(255,255,255,.6)':'#ffffff');
   for(let x=4;x<w;x+=32){fr(X,x,h*.55,26,h*.3,'#9aa6b0');if(Q()<.6)fr(X,x+6,h*.42,14,10,'#4a8ac8');if(Q()<.4)person(X,x+13,h*.72,18,'#2a3038')}if(i)fr(X,w*.55,0,w*.45,h,'rgba(14,19,26,.85)')}
  else{fr(X,w*.8,h*.1,20,10,'#2bd47a')}for(let x=0;x<w;x+=64)fr(X,x,0,3,h,'#2a2e34')});
 al('shutter',256,160,(X,w,h)=>{fr(X,0,0,w,h,'#9aa0a6');for(let y=0;y<h;y+=7){fr(X,0,y,w,2,'#7a8086');fr(X,0,y+2,w,1,'#c4c8cc')}fr(X,w*.45,h*.86,w*.1,h*.08,'#555');fr(X,w*.7,h*.3,40,52,'#f4f0e4');tx(X,'定休日',w*.7+20,h*.3+16,10,'#c0282d');tx(X,'水曜',w*.7+20,h*.3+34,10,'#333')});
 al('rail',256,64,(X,w,h)=>{fr(X,0,0,w,h,'#c9d0d6');X.fillStyle=gr(X,0,0,w,0,[[0,'rgba(255,255,255,.2)'],[.5,'rgba(255,255,255,.05)'],[1,'rgba(255,255,255,.25)']]);X.fillRect(0,0,w,h);for(let x=0;x<w;x+=64)fr(X,x,0,4,h,'#8a9096');fr(X,0,0,w,5,'#8a9096')});
 al('mail',128,96,(X,w,h)=>{fr(X,0,0,w,h,'#7a8088');for(let r=0;r<3;r++)for(let c=0;c<4;c++){const x=4+c*31,y=4+r*30;fr(X,x,y,28,27,'#b8bec6');fr(X,x+4,y+6,20,3,'#333');tx(X,String(101+r*100+c),x+14,y+18,9,'#222','600','center','sans-serif')}});
 for(let i=0;i<2;i++)al('menu'+i,128,150,(X,w,h)=>{fr(X,0,0,w,h,'#5a3a22');fr(X,6,6,w-12,h-12,'#1e2a22');tx(X,i?'本日のランチ':'おすすめ',w/2,22,15,'#fff3c8');
  for(let k=0;k<4;k++)tx(X,qk(['日替り定食 ¥850','ブレンド ¥450','醤油ラーメン ¥780','カレー ¥900','ケーキセット ¥650','生ビール ¥500']),w/2,50+k*22,11,qk(['#ffffff','#ffd0a0','#c8f0ff']));ell(X,w*.8,h*.86,10,8,'#ff8aa0')});
 al('ac',96,72,(X,w,h)=>{fr(X,0,0,w,h,'#d9dad6');ell(X,w*.36,h*.5,26,26,'#2b2d30');X.strokeStyle='#9aa0a6';for(let r=6;r<26;r+=5){X.beginPath();X.arc(w*.36,h*.5,r,0,6.2832);X.stroke()}fr(X,w*.72,h*.2,14,h*.6,'#c4c6c2')});
 // ---- small detail strips used on the 3D shop shelves (menu papers, book spines, product facings, bottles, washers, listings) ----
 al('strips',256,56,(X,w,h)=>{fr(X,0,0,w,h,'#5a3a22');const m=['醤油','味噌','塩','豚骨','餃子','炒飯','麺','ビール','替玉'];for(let i=0;i<9;i++){const x=2+i*28;fr(X,x,2,25,h-4,'#f4ecd8');vt(X,m[i].slice(0,2),x+12.5,12,12,'#2a1a10')}});
 al('spines',256,56,(X,w,h)=>{fr(X,0,0,w,h,'#2a1e16');for(let x=0;x<w;){const bw=4+Q()*6,bh=h*(.68+Q()*.3);fr(X,x,h-bh,bw-1,bh,hsl(Math.floor(Q()*360),18+Q()*30,22+Q()*30));fr(X,x+1,h-bh+6,bw-3,2,'rgba(240,220,170,.5)');x+=bw}});
 al('prodRow',256,48,(X,w,h)=>{fr(X,0,0,w,h,'#e9ecef');for(let x=1;x<w;){const pw=10+Q()*14,ph=h*(.55+Q()*.35),c=hsl(Math.floor(Q()*360),55+Q()*35,40+Q()*25);fr(X,x,h-8-ph,pw-2,ph,c);fr(X,x+2,h-8-ph*.6,pw-6,ph*.25,'rgba(255,255,255,.75)');x+=pw}
  fr(X,0,h-8,w,8,'#ffffff');for(let x=8;x<w;x+=36)fr(X,x,h-7,16,6,'#ffd200')});
 al('bottleRow',256,48,(X,w,h)=>{X.fillStyle=gr(X,0,0,0,h,[[0,'#3a1e0a'],[1,'#ffb060']]);X.fillRect(0,0,w,h);for(let x=3;x<w;x+=12+Q()*4){const c=hsl(20+Q()*100,50+Q()*30,25+Q()*30),bh=h*(.6+Q()*.3);fr(X,x,h-bh,8,bh,c);fr(X,x+2,h-bh-8,4,8,c);fr(X,x+1,h-bh+4,2,bh-8,'rgba(255,255,255,.35)')}});
 al('washer',56,56,(X,w,h)=>{fr(X,0,0,w,h,'#f4f6f8');fr(X,4,3,w-8,8,'#d8dde2');fr(X,w-16,5,8,4,'#2bd47a');ell(X,w/2,h*.6,19,19,'#9aa3ab');ell(X,w/2,h*.6,15,15,'#2b3a46');X.strokeStyle=hsl(Math.floor(Q()*360),60,60);X.lineWidth=3;X.beginPath();X.arc(w/2,h*.62,8,Q()*6,Q()*6+3);X.stroke();X.lineWidth=1});
 al('listing',48,56,(X,w,h)=>{fr(X,0,0,w,h,'#fbfbf8');fr(X,0,0,w,8,qk(['#1f7a4a','#1e6fd0','#e07a1a']));X.strokeStyle='#888';X.strokeRect(5,12,24,20);X.beginPath();X.moveTo(17,12);X.lineTo(17,32);X.stroke();tx(X,(3+Q()*9).toFixed(1)+'万',w/2,h-12,12,'#d0201a');tx(X,qk(['1K','1LDK','2DK']),w-9,22,7,'#333')});
 // upload as its own texture (unit 2 in the main shader)
 const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,cv);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);
 gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);if(aniso)gl.texParameterf(gl.TEXTURE_2D,aniso.TEXTURE_MAX_ANISOTROPY_EXT,8);
 if(py+ph>SH)console.warn('street atlas overflow',py+ph);
 return {tex:t,R:R2,SHOPS,used:py+ph}})();

// Every building is assembled from parts (storefront, balconies, ribbon windows, wooden house, parking, vending nook...)
// with its own colours, shop, signs and clutter, so no two neighbours match. Near pieces also get collision as plain
// boxes and flat walkways, and the nearest street lamps light the scene while you walk.
const SUR=(()=>{const g=new Geo(),keep=cur;cur=g;const boxes=[],flats=[],lights=[];
 let sr=20261026;const R=()=>{sr=(sr*16807)%2147483647;return (sr-1)/2147483646},pk=a=>a[Math.floor(R()*a.length)],rr=(a,b)=>a+R()*(b-a);
 const RT=ATL2.R,T2=(n,r=.6)=>M('#ffffff',14,r,0,RT[n]),E2=(n,k)=>M('#ffffff',15,.55,k,RT[n]);
 const G0=90,ROW=60,NEAR=11,TAU=6.283185307;
 const near=(x0,z0,x1,z1)=>x1>-NEAR&&x0<NEAR&&z1>-NEAR&&z0<NEAR;
 const solid=(x0,y0,z0,x1,y1,z1)=>{if(near(x0,z0,x1,z1))boxes.push([Math.min(x0,x1),y0,Math.min(z0,z1),Math.max(x0,x1),y1,Math.max(z0,z1)])};
 const mFr=M('#24272c',4,.4),mSv=M('#a9adb3',4,.35),mSill=M('#cfcbc2',0,.6),mCon=M('#8f8b84',3,.9),mPipe=M('#9a9890',0,.6),mBlk=M('#16181c',0,.5),mRoof=M('#2a2c31',0,.32);
 // ---- ground, sidewalks, markings ----
 for(const [a,b,c,d] of [[-G0,7,G0,G0],[-G0,-G0,G0,-7],[-G0,-7,-7,7],[7,-7,G0,7]])g.quad([a,0,d],[c,0,d],[c,0,b],[a,0,b],[0,1,0],mRoad);
 function walk(x0,z0,x1,z1,cf){BX(x0,0,z0,x1,SW,z1,mTile,Object.fromEntries(cf.map(f=>[f,mCurb])));if(near(x0,z0,x1,z1))flats.push([x0,z0,x1,z1,SW])}
 walk(-ROW,1.5,-7,3.6,['pz']);walk(-ROW,7,2.6,9,['nz']);walk(2.6,7,4.6,ROW,['px','nz']);walk(7,7,9,ROW,['nx','nz']);walk(9,7,ROW,9,['nz']);
 walk(7,-ROW,9,3.6,['nx','pz']);walk(2.5,-ROW,4.6,-7,['px']);
 const mLn=M('#d9d9d2',0,.55),mYl=M('#d8b23a',0,.55);
 for(let x=-G0+.4;x<-7;x+=1.6)BX(x,0,5.3,x+.9,.006,5.4,mYl);for(let x=7.4;x<G0;x+=1.6)BX(x,0,5.3,x+.9,.006,5.4,mYl);
 for(let z=-G0+.4;z<-7;z+=1.6)BX(5.8,0,z,5.9,.006,z+.9,mLn);for(let z=7.4;z<G0;z+=1.6)BX(5.8,0,z,5.9,.006,z+.9,mLn);
 BX(-ROW,0,3.68,-7,.006,3.78,mLn);BX(-ROW,0,6.82,-7,.006,6.92,mLn);BX(4.68,0,-ROW,4.78,.006,-7,mLn);BX(6.82,0,-ROW,6.92,.006,-7,mLn);
 for(let x=4.75;x<6.9;x+=.55)BX(x,0,9.6,x+.32,.006,11.2,mLn);for(let z=4.0;z<6.7;z+=.55)BX(-12.6,0,z,-11.0,.006,z+.32,mLn);   // crossings
 for(const [x,z] of [[-16,5.2],[-31,5.6],[14,5.0],[5.85,-15],[5.7,18],[-44,5.2]])panel(x,.005,z,.7,.7,'py',M('#ffffff',5,.35,0,T('manhole')));
 // ---- a facade line: local s runs along the street, o points out of the facade towards the street ----
 function Fac(face,f){const ax=face[1]==='z',sg=face[0]==='n'?1:-1,P=(s,o)=>ax?[s,f-sg*o]:[f-sg*o,s];
  const sPos=ax?'px':'pz',sNeg=ax?'nx':'nz';
  return {face,P,
   box(s0,s1,y0,y1,o0,o1,m,front,col){const a=P(s0,o0),b=P(s1,o1),x0=Math.min(a[0],b[0]),x1=Math.max(a[0],b[0]),z0=Math.min(a[1],b[1]),z1=Math.max(a[1],b[1]);
    BX(x0,y0,z0,x1,y1,z1,m,front?{[face]:front}:{});if(col)solid(x0,y0,z0,x1,y1,z1)},
   open(s0,s1,y0,y1,o0,o1,m){const a=P(s0,o0),b=P(s1,o1);BX(Math.min(a[0],b[0]),y0,Math.min(a[1],b[1]),Math.max(a[0],b[0]),y1,Math.max(a[1],b[1]),m,{},face)},
   pan(s,y,w,h,o,m){const p=P(s,o);panel(p[0],y,p[1],w,h,face,m)},
   side(s,y,w,h,o,m,pos){const p=P(s,o);panel(p[0],y,p[1],w,h,pos?sPos:sNeg,m)},
   slope(s0,s1,o0,y0,o1,y1,m){const a=P(s0,o0),b=P(s1,o0),c=P(s1,o1),d=P(s0,o1),A=[a[0],y0,a[1]],B=[b[0],y0,b[1]],C=[c[0],y1,c[1]],D=[d[0],y1,d[1]];
    let n=norm3(cross3([B[0]-A[0],B[1]-A[1],B[2]-A[2]],[D[0]-A[0],D[1]-A[1],D[2]-A[2]]));if(n[1]<0)n=n.map(v=>-v);g.quad(A,B,C,D,n,m)},
   tube(s0,y0,o0,s1,y1,o1,r,m,seg=6){const a=P(s0,o0),b=P(s1,o1);tube([a[0],y0,a[1]],[b[0],y1,b[1]],r,m,seg)},
   cyl(s,y,o,r,h,m,seg=10){const p=P(s,o);cyl(p[0],y,p[1],r,h,m,seg)},
   sol(s0,s1,y0,y1,o0,o1){const a=P(s0,o0),b=P(s1,o1);solid(a[0],y0,a[1],b[0],y1,b[1])}}}
 // ---- small props (all in facade space) ----
 function leaves(F,s,y,o,r,n,cols){for(let i=0;i<n;i++){const u=R()*TAU,v=Math.acos(2*R()-1),q=r*Math.cbrt(R()),pp=F.P(s+q*Math.sin(v)*Math.cos(u),o+q*Math.sin(v)*Math.sin(u)),p=[pp[0],y+Math.abs(q*Math.cos(v))*.9+r*.15,pp[1]];
  const sz=r*(.3+R()*.2),nr=norm3([R()-.5,.6,R()-.5]),t0=norm3(cross3(nr,[0,0,1])),b0=cross3(nr,t0),m={c:pk(cols),mat:10,rough:.55,emis:0,tex:null};
  const a=[p[0]-t0[0]*sz,p[1]-t0[1]*sz,p[2]-t0[2]*sz],b=[p[0]+b0[0]*sz*.6,p[1]+b0[1]*sz*.6,p[2]+b0[2]*sz*.6],c=[p[0]+t0[0]*sz,p[1]+t0[1]*sz,p[2]+t0[2]*sz],d=[p[0]-b0[0]*sz*.6,p[1]-b0[1]*sz*.6,p[2]-b0[2]*sz*.6];
  g.v(a,nr,[0,0],m);g.v(b,nr,[1,0],m);g.v(c,nr,[1,1],m);g.v(a,nr,[0,0],m);g.v(c,nr,[1,1],m);g.v(d,nr,[0,1],m)}}
 const GREEN=[[.05,.16,.05],[.08,.22,.06],[.04,.12,.05],[.12,.25,.08]],FLOWER=[[.9,.2,.35],[.95,.8,.15],[.95,.45,.15],[.7,.35,.9],[.95,.95,.95],[.9,.15,.15]];
 function plant(F,s,o,big){const h=big?.55:.35;F.cyl(s,SW,o,big?.24:.17,h,M(pk(['#6b6f75','#3a3d42','#8a5a3a','#d8d2c4']),0,.7),12);leaves(F,s,SW+h*.85,o,big?.42:.28,big?60:34,R()<.3?GREEN.concat(FLOWER):GREEN);
  const p=F.P(s,o);solid(p[0]-.25,0,p[1]-.25,p[0]+.25,1,p[1]+.25)}
 function bike(F,s,o){const c=M(pk(['#c0282d','#1e5fc0','#e8e8e8','#2a2a2a','#2f6a46','#d8b23a']),4,.4),t=M('#151515',0,.7),y=SW+.33;
  for(const ds of [-.52,.52]){const pts=[];for(let i=0;i<=18;i++){const a=i/18*TAU;const q=F.P(s+ds+Math.cos(a)*.31,o);pts.push([q[0],y+Math.sin(a)*.31,q[1]])}polyline(pts,.018,t,4)}
  F.tube(s-.52,y,o,s,y+.05,o,.016,c);F.tube(s,y+.05,o,s-.1,y+.45,o,.016,c);F.tube(s-.1,y+.45,o,s+.42,y+.42,o,.016,c);F.tube(s+.42,y+.42,o,s+.52,y,o,.016,c);F.tube(s,y+.05,o,s+.42,y+.42,o,.016,c);
  F.tube(s+.42,y+.42,o,s+.38,y+.62,o,.014,mSv);F.tube(s+.38,y+.62,o-.2,s+.38,y+.62,o+.2,.014,mSv);F.box(s-.2,s,y+.47,y+.52,o-.05,o+.05,t);
  if(R()<.5)F.box(s+.48,s+.78,y+.32,y+.5,o-.14,o+.14,mSv);const p=F.P(s,o);solid(p[0]-.8,0,p[1]-.8,p[0]+.8,1,p[1]+.8)}
 function bottle(x,y,z,li,kind,face){const l=LBL[li%LBL.length],rect=T('lbl'+(li%LBL.length)),lab=M('#ffffff',5,.25,-1.4,rect),cn=M('#8c9096',4,.3,-1.4);   // lit like the display they stand in
  if(kind==='can'){cyl(x,y,z,.026,.008,cn,10,.03,false);cylT(x,y+.008,z,.03,.096,lab,10,rect,face);cyl(x,y+.104,z,.03,.012,cn,10,.024,true);return}
  const liq=M(l[3],0,.12,-1.4),cap=M(l[1]==='#ffffff'?'#1747b5':l[1],0,.35,-1.4),pet=M('#dfe8ee',0,.08,-1.4),H2=kind==='small'?.16:.21;
  cyl(x,y,z,.027,.012,liq,10,.031,false);cyl(x,y+.012,z,.031,H2*.22,liq,10,null,false);cylT(x,y+.012+H2*.22,z,.0318,H2*.3,lab,10,rect,face);
  cyl(x,y+.012+H2*.52,z,.031,H2*.08,liq,10,null,false);cyl(x,y+.012+H2*.6,z,.031,H2*.26,pet,10,.013,false);cyl(x,y+.012+H2*.9,z,.0145,H2*.1,cap,8,null,true)}
 let vseed=0;
 function vending(F,s,o,k,lod){const body=['#d8202a','#1e5fc0','#f2f2f0'][k];
  if(lod){F.box(s-.45,s+.45,SW,SW+1.85,o-.7,o,M(body,0,.45),E2('vend'+k,1.05),true);F.box(s-.47,s+.47,SW+1.85,SW+1.92,o-.72,o+.02,mSv);return}
  const mB=M(body,0,.42),mBl=M('#141518',0,.55),mCh=M('#c9ccd0',4,.22),yb=SW,yW0=yb+.83,yW1=yb+1.59,yT=yb+1.77,x0=s-.45,x1=s+.45,wx0=x0+.04,wx1=x1-.2,rz=o-.32,n=SGN[F.face];
  const nv=F.face==='nz'?[0,-1]:F.face==='pz'?[0,1]:F.face==='nx'?[-1,0]:[1,0],fc=Math.atan2(nv[1],nv[0])-Math.PI;
  F.box(x0+.02,x1-.02,yb,yb+.06,o-.68,o-.04,mBl);F.open(x0,x1,yb+.06,yT,o-.7,o-.06,mB);F.box(x0-.006,x1+.006,yT-.03,yT,o-.706,o+.006,mB);
  F.box(x0,x1,yb+.06,yW0,o-.06,o,mB);F.box(x0,x1,yW1,yT,o-.06,o,mB);F.box(x0,wx0,yW0,yW1,o-.06,o,mB);F.box(wx1,x1,yW0,yW1,o-.06,o,mB);
  F.box(wx0+.02,wx1+.12,yW1+.02,yW1+.13,o,o+.012,mBl,E('#ffffff',4.5,'vmMarquee'));
  F.box(wx0,wx1,yW0,yW1,rz-.01,rz,mBl,E('#ffffff',1.6,'vmBack'));F.box(wx0,wx1,yW1-.03,yW1,rz,o-.06,E('#f4f9ff',6));
  F.box(wx0-.005,wx0,yW0,yW1,rz,o-.06,M('#f2f2ef',0,.3,-1.2));F.box(wx1,wx1+.005,yW0,yW1,rz,o-.06,M('#f2f2ef',0,.3,-1.2));
  const sd=vseed++*5;[[yW0+.02,'can'],[yW0+.255,'can'],[yW0+.49,'pet']].forEach(([ry,kd],ri)=>{F.box(wx0,wx1,ry-.012,ry,rz,o-.07,M('#d8dde2',4,.3,-1.2));
   F.box(wx0,wx1,ry-.012,ry+.04,o-.075,o-.055,M('#ffffff',5,.4,0,T('vmRail')),TX('vmRail',.35));
   for(let i=0;i<7;i++){const ss=wx0+(wx1-wx0)*(i+.5)/7,p=F.P(ss,o-.14),li=sd+i+ri*4;bottle(p[0],ry+.045,p[1],li,kd==='pet'?(i%4===3?'small':'pet'):'can',fc)}});
  const A=F.P(wx0,o-.015),Bq=F.P(wx1,o-.015);glassPane(SG,A[0],yW0,A[1],Bq[0],yW1,Bq[1],n);
  F.box(wx0-.01,wx1+.01,yW0-.01,yW0,o-.02,o+.004,mCh);F.box(wx0-.01,wx1+.01,yW1,yW1+.01,o-.02,o+.004,mCh);
  F.box(s-.3,s+.06,yb+.47,yb+.77,o,o+.008,mBl,TX('vmAd',.4));F.box(s+.22,s+.42,yb+.5,yb+.8,o,o+.03,mBl,TX('vmPanel',.3));F.box(s+.08,s+.18,yb+.66,yb+.76,o,o+.012,mBl,E('#ffffff',1.2,'vmIC'));
  F.box(s-.35,s+.12,yb+.12,yb+.34,o-.01,o+.006,mBl,TX('vmFlap',.4));F.side(x1+.002,yb+.95,.55,1.3,o-.38,TX('vmMascot',.45),true);
  const p=F.P(s,o-.35);solid(p[0]-.5,0,p[1]-.5,p[0]+.5,2,p[1]+.5)}
 function ac(F,s,y,o){F.box(s-.4,s+.4,y,y+.6,o,o+.3,M('#d9dad6',0,.5),T2('ac'));F.tube(s+.42,y+.3,o+.1,s+.42,y-1.2,o+.06,.012,mPipe,4)}
 function car(x,z,alongX,col){const m=M(col,11,.3),gl_=M('#0d1218',0,.08),L=4.3,Wd=1.7,Q=(a0,a1,y0,y1,b0,b1,mm)=>alongX?BX(x+a0,y0,z+b0,x+a1,y1,z+b1,mm):BX(x+b0,y0,z+a0,x+b1,y1,z+a1,mm);
  Q(-L/2,L/2,.32,.95,-Wd/2,Wd/2,m);Q(-1.05,.95,.95,1.42,-Wd/2+.08,Wd/2-.08,gl_);Q(-1.0,.9,1.42,1.47,-Wd/2+.1,Wd/2-.1,m);
  for(const a of [-1.35,1.35])for(const b of [-Wd/2,Wd/2]){const A=alongX?[x+a,.33,z+b-.12*Math.sign(b)]:[x+b-.12*Math.sign(b),.33,z+a],B=alongX?[x+a,.33,z+b+.06*Math.sign(b)]:[x+b+.06*Math.sign(b),.33,z+a];tube(A,B,.32,M('#111',0,.8),10)}
  Q(L/2-.02,L/2+.01,.7,.82,-Wd/2+.1,-Wd/2+.45,E('#fff4dc',3));Q(L/2-.02,L/2+.01,.7,.82,Wd/2-.45,Wd/2-.1,E('#fff4dc',3));Q(-L/2-.01,-L/2+.02,.72,.84,-Wd/2+.1,-Wd/2+.4,E('#ff2010',4));Q(-L/2-.01,-L/2+.02,.72,.84,Wd/2-.4,Wd/2-.1,E('#ff2010',4));
  alongX?solid(x-L/2,0,z-Wd/2,x+L/2,1.5,z+Wd/2):solid(x-Wd/2,0,z-L/2,x+Wd/2,1.5,z+L/2)}
 // ---- windows: frame, sill, recessed lit or dark glass ----
 const WLIT=[0,1,3,4,6,8,9],WDARK=[2,5,7];
 function win(F,s,y,w,h,litP,lod){const lit=R()<litP;if(!lod){const A=F.P(s-w/2,.03),B=F.P(s+w/2,.03);glassPane(SG,A[0],y,A[1],B[0],y+h,B[1],SGN[F.face])}F.pan(s,y+h/2,w,h,.005,lit?E2('w'+pk(WLIT),rr(.6,1.25)):E2('w'+pk(WDARK),.14));
  F.box(s-w/2-.06,s+w/2+.06,y+h,y+h+.06,0,.06,mFr);F.box(s-w/2-.06,s-w/2,y,y+h,0,.06,mFr);F.box(s+w/2,s+w/2+.06,y,y+h,0,.06,mFr);F.box(s-.02,s+.02,y,y+h,0,.04,mFr);F.box(s-w/2-.1,s+w/2+.1,y-.06,y,0,.14,mSill);return lit}
 const WALLC=[['#8f8b84',3],['#a8a092',3],['#b3ab9c',3],['#7f8288',9],['#6f6a63',3],['#c9c2b4',3],['#5f6670',0],['#8a7f72',3],['#d8d2c4',3],['#9a6f5a',3],['#5b5048',0],['#7d8a8f',4],['#b9a58a',3],['#4f5a52',0]];
 const wallM=()=>{const w=pk(WALLC);return M(w[0],w[1],.85)};
 let shopBag=[];const nextShop=()=>{if(!shopBag.length){shopBag=ATL2.SHOPS.map((_,i)=>i);for(let i=shopBag.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[shopBag[i],shopBag[j]]=[shopBag[j],shopBag[i]]}}return shopBag.pop()};
 function roofClutter(F,s0,s1,h,d,lod){F.box(s0,s1,h,h+.5,-.16,0,mCon);F.box(s0-.02,s1+.02,h+.5,h+.56,-.2,.03,mSill);if(lod)return;
  if(R()<.5){const s=rr(s0+1,s1-1);F.cyl(s,h,-d*.5,.7,1.4,M('#9aa0a6',4,.5),14)}if(R()<.5)for(let i=0;i<2;i++)F.box(s0+1+i*1.1,s0+1.85+i*1.1,h,h+.6,-1.4,-1.1,M('#d9dad6',0,.5));
  if(R()<.35)F.tube(s1-.8,h,-.8,s1-.8,h+2.5,-.8,.02,mSv,4)}
 function glow(F,s,y,o,c,I,r){const p=F.P(s,o);lights.push([p[0],y,p[1],r,c[0]*I,c[1]*I,c[2]*I])}
 // ---- real 3D shop interiors behind real glass (near shops only), built like the 7-Eleven's own ----
 // Interior materials carry a negative emission value: the main shader reads it as "inside a shop" (indoor ambient
 // light, stays dry), scaled by how brightly that kind of shop is lit.
 const SG=new Geo(),SGN={nz:[0,0,-1],pz:[0,0,1],nx:[-1,0,0],px:[1,0,0]};
 const IM=(c,mat=0,r=.6,k=1)=>M(c,mat,r,-k),IT=(n,k=1,r=.6)=>M('#ffffff',14,r,-k,RT[n]);
 const HUE=['#d8202a','#1e6fd0','#e8a21a','#2f8a4a','#8a3ac8','#e0602a','#f2f2f0','#2a2a2e','#c8c2b4','#5ab0e0'];
 // interiors stand on a floor raised to shop level (sidewalk + 1 cm), clear of the wet road surface underneath
 function lift(F,dy){return {face:F.face,P:F.P,sol:F.sol,
  box:(s0,s1,y0,y1,o0,o1,m,fr,col)=>F.box(s0,s1,y0+dy,y1+dy,o0,o1,m,fr,col),open:(s0,s1,y0,y1,o0,o1,m)=>F.open(s0,s1,y0+dy,y1+dy,o0,o1,m),
  pan:(s,y,w,h,o,m)=>F.pan(s,y+dy,w,h,o,m),side:(s,y,w,h,o,m,pos)=>F.side(s,y+dy,w,h,o,m,pos),
  slope:(s0,s1,o0,y0,o1,y1,m)=>F.slope(s0,s1,o0,y0+dy,o1,y1+dy,m),tube:(s0,y0,o0,s1,y1,o1,r,m,seg)=>F.tube(s0,y0+dy,o0,s1,y1+dy,o1,r,m,seg),
  cyl:(s,y,o,r,h,m,seg)=>F.cyl(s,y+dy,o,r,h,m,seg)}}
 function interior(F0,s0,s1,k){const Y0=SW+.012,F=lift(F0,Y0),lv=(s,y,o,r,n,c)=>leaves(F0,s,y+Y0,o,r,n,c);const a=s0+.3,b=s1-.3,W=b-a,mid=(a+b)/2,O0=-.32,O1=-3.9,H=2.62,sh=ATL2.SHOPS[k];
  const K=[.9,.55,1.1,1,.85,.7,1,.75,.9,.4,.9,.5,.8,.35][k];
  const WALL=['#e9dcc4','#6b4a32','#f4f6f8','#eef3f6','#f0dcc0','#4a3a2c','#eef2f3','#2f3a2a','#e8ecef','#2a1a3a','#f3ede4','#1a1226','#e8d8b8','#2a1a10'][k];
  const FL=[[13,'#ffffff'],[13,'#ffffff'],[8,'#ffffff'],[8,'#ffffff'],[13,'#ffffff'],[13,'#ffffff'],[8,'#ffffff'],[0,'#3a3a34'],[8,'#ffffff'],[0,'#1a1420'],[13,'#ffffff'],[0,'#120c18'],[13,'#ffffff'],[13,'#ffffff']][k];
  const LC=['#fff1d8','#ffd9a0','#ffffff','#f4f8ff','#fff0d8','#ffe0b0','#ffffff','#fff4e0','#ffffff','#ff7ae0','#fff4e6','#c890ff','#fff4e0','#ffb060'][k];
  const wl=IM(WALL,0,.6,K),wood=IM('#6b4a30',13,.45,K),dk=IM('#2a2a2e',0,.5,K),wh=IM('#eeeeea',0,.45,K),mt=IM('#b8bcc2',4,.35,K);
  F.box(a,b,-.02,.005,O1,O0,IM(FL[1],FL[0],.35,K));F.box(a,b,H,H+.06,O1,O0,IM('#f4f4f0',0,.7,K));
  F.box(a,b,0,H,O1-.1,O1,wl);F.box(a-.1,a,0,H,O1,O0,wl);F.box(b,b+.1,0,H,O1,O0,wl);
  if(k===1||k===9||k===13)for(let s=a+.7;s<b-.4;s+=1.5){F.tube(s,H,-1.7,s,H-.6,-1.7,.006,dk,4);F.cyl(s,H-.76,-1.7,.16,.16,E(LC,6),12)}
  else for(let s=a+.6;s<b-.3;s+=1.35)for(let o=-.9;o>O1+.4;o-=1.2)F.box(s-.45,s+.45,H-.025,H,o-.12,o+.12,E(LC,8));
  glow(F0,mid,2.2+Y0,-1.9,sh.lit,3.2*K,6.5);
  // strips of goods (atlas-2 detail textures) tiled at ~1.1 m so they keep their scale
  const strip=(s,y,w,o,n,h=.22,kk=K)=>{const c=Math.max(1,Math.round(w/1.1)),sw=w/c;for(let i=0;i<c;i++)F.pan(s-w/2+sw*(i+.5),y,sw,h,o,IT(n,kk))};
  const sstrip=(s,y,w,oc,n,pos,h=.22)=>{const c=Math.max(1,Math.round(w/1.1)),sw=w/c;for(let i=0;i<c;i++)F.side(s,y,sw,h,oc-w/2+sw*(i+.5),IT(n,K),pos)};
  function backShelves(n,levels,y0,dy,m,depth=.4){F.box(a+.05,b-.05,0,y0+levels*dy,O1,O1+.06,m);for(let l=0;l<levels;l++){const y=y0+l*dy;F.box(a+.05,b-.05,y-.03,y,O1,O1+depth,m);strip(mid,y+.13,W-.2,O1+depth*.55,n,dy*.75)}}
  function stool(s,o,c){F.cyl(s,0,o,.03,.62,dk,6);F.cyl(s,.62,o,.17,.06,IM(c,0,.4,K),12)}
  if(k===0){strip(mid,1.95,W-.4,O1+.07,'strips',.46);F.box(a+.2,b-.2,0,1.0,-2.6,-2.0,wood);F.box(a+.15,b-.15,1.0,1.05,-2.65,-1.9,IM('#c9a070',13,.3,K));F.box(a+.2,b-.2,1.05,1.25,-2.62,-2.5,wood);
   F.box(a+.2,b-.2,0,.9,O1+.6,O1,mt);for(let s=a+.5;s<b-.4;s+=.7)F.cyl(s,.9,O1+.3,.15,.24,mt,12);for(let s=a+.5;s<b-.3;s+=.62){stool(s,-1.55,'#c0282d');if(R()<.6)F.cyl(s,1.05,-2.25,.09,.06,wh,12)}}
  else if(k===1){F.box(a+.2,a+W*.45,0,1.0,O1+.8,O1+.15,wood);F.box(a+.25,a+.75,1.0,1.42,O1+.65,O1+.25,mt);F.box(a+.2,b-.2,1.5,1.53,O1,O1+.3,wood);for(let s=a+.3;s<b-.3;s+=.18)F.cyl(s,1.53,O1+.15,.04,.08,wh,8);
   F.pan(b-.6,1.5,.7,.9,O1+.07,IT('menu1',K*1.2));for(let s=a+W*.55;s<b-.4;s+=1.2){F.cyl(s,0,-1.5,.04,.72,dk,6);F.cyl(s,.72,-1.5,.36,.04,wood,16);for(const q of [-.55,.55]){F.box(s+q-.18,s+q+.18,.42,.46,-1.68,-1.32,wood);F.box(s+q*1.3-.02,s+q*1.3+.02,.46,.9,-1.68,-1.32,wood)}}
   lv(a+.35,.0,-.7,.45,50,GREEN);F.cyl(a+.35,0,-.7,.2,.35,IM('#8a5a3a',0,.6,K),10)}
  else if(k===2){backShelves('prodRow',5,.25,.33,wh);for(let s=a+1.1;s<b-.8;s+=1.6){const o0=O1+.7,o1=-.95,oc=(o0+o1)/2,len=o1-o0;F.box(s-.04,s+.04,0,1.55,o0,o1,wh);
    for(let l=0;l<4;l++){const y=.22+l*.36;F.box(s-.34,s+.34,y-.03,y,o0,o1,wh);sstrip(s+.33,y+.13,len,oc,'prodRow',true,.26);sstrip(s-.33,y+.13,len,oc,'prodRow',false,.26)}
    F.box(s-.12,s+.12,1.55,1.75,o1-.05,o1,E('#ffe600',1.6))}}
  else if(k===3){for(let s=a+.4;s<b-.3;s+=.68){F.box(s-.32,s+.32,0,.85,O1+.7,O1,wh,IT('washer',K));F.box(s-.32,s+.32,.88,1.73,O1+.7,O1,wh,IT('washer',K))}
   F.box(a+.5,Math.min(b-.5,a+2.2),0,.45,-1.65,-1.25,wood);F.box(b-1.6,b-.3,0,.85,-2.4,-1.8,wh);F.pan(b-.6,1.9,.5,.7,O1+.72,IT('post0',K))}
  else if(k===4){for(let l=0;l<3;l++){const y=.55+l*.42;F.box(a+.1,b-.1,y-.03,y,O1,O1+.45,wood);for(let s=a+.2;s<b-.2;s+=.13+R()*.05){const p=F.P(s,O1+.25);ball(p[0],Y0+y+.04,p[1],.065,.045,.055,IM(pk(['#c98a3c','#a8682a','#e0b070','#8a5020']),0,.6,K),7,4)}}
   F.box(a+.3,b-.3,0,.9,-1.55,-1.0,wh);F.box(a+.3,b-.3,.9,.93,-1.55,-1.0,IM('#d8e8ee',0,.1,K));for(let s=a+.5;s<b-.4;s+=.25)F.box(s-.07,s+.07,.93,1.0,-1.35,-1.2,IM(pk(['#f3d6e0','#ffffff','#e8c07a','#c0282d','#7a4a2a']),0,.5,K))}
  else if(k===5){backShelves('spines',6,.1,.38,wood,.32);for(const [s,pos] of [[a+.05,true],[b-.05,false]]){const o0=O1+.4,o1=-.8;F.box(pos?s:s-.3,pos?s+.3:s,0,2.3,o0,o1,wood);for(let l=0;l<6;l++)sstrip(pos?s+.31:s-.31,.23+l*.38,o1-o0,(o0+o1)/2,'spines',pos,.29)}
   F.box(mid-.7,mid+.7,0,.75,-2.1,-1.5,wood);for(let i=0;i<6;i++){const s=mid-.6+i*.24,hh=.05+R()*.12;F.box(s-.1,s+.1,.75,.75+hh,-1.95,-1.65,IM(pk(HUE),0,.6,K))}}
  else if(k===6){for(let s=a+.7;s<b-.5;s+=1.5){F.pan(s,1.55,.8,1.0,O1+.07,E('#9fc4d6',.35));F.box(s-.5,s+.5,.8,.84,O1,O1+.35,wh);const c=IM('#7a1f25',0,.35,K);F.cyl(s,0,-2.4,.22,.08,mt,12);F.cyl(s,.08,-2.4,.05,.38,mt,8);F.box(s-.28,s+.28,.46,.62,-2.65,-2.15,c);F.box(s-.28,s+.28,.62,1.25,-2.68,-2.58,c);F.box(s-.12,s+.12,1.27,1.45,-2.7,-2.6,c)}}
  else if(k===7){F.box(a+.2,b-.2,0,.3,O1+1.0,O1,wood);F.box(a+.2,b-.2,0,.62,O1+.5,O1,wood);
   for(const [y,o] of [[.3,O1+.75],[.62,O1+.25],[0,-.9]])for(let s=a+.4;s<b-.3;s+=.45){F.cyl(s,y,o,.13,.28,IM('#4a4e52',0,.5,K),10);lv(s,y+.18,o,.22,16,R()<.75?FLOWER:GREEN)}
   for(let s=a+.6;s<b-.4;s+=1.3){F.tube(s,H,-1.8,s,H-.5,-1.8,.005,dk,4);lv(s,H-.75,-1.8,.25,22,GREEN)}}
  else if(k===8){const cols=Math.floor((W-.2)/.36);for(let r=0;r<3;r++)for(let c=0;c<cols;c++)if(R()<.85)F.pan(a+.28+c*.36,.95+r*.42,.3,.36,-.35,IT('listing',1.1));
   for(let s=a+.8;s<b-.6;s+=1.6){F.box(s-.6,s+.6,.72,.76,-2.9,-2.2,wh);F.box(s-.55,s-.5,0,.72,-2.85,-2.25,mt);F.box(s+.5,s+.55,0,.72,-2.85,-2.25,mt);F.box(s-.2,s+.2,.76,1.06,-2.75,-2.7,dk,E('#8ac0ff',1.2));F.box(s-.22,s+.22,.42,.5,-2.1,-1.7,dk)}}
  else if(k===9){for(const [c,y] of [['#ff4fd8',2.3],['#35e0ff',2.2]]){F.box(a,b,y,y+.03,O1+.05,O1+.08,E(c,7));F.box(a,a+.03,y,y+.03,O1,O0,E(c,7))}
   F.box(a+.4,a+2.0,0,1.0,-2.4,-1.9,dk);F.box(a+.4,a+2.0,1.0,1.03,-2.42,-1.88,E('#ff4fd8',3));for(let i=0;i<3;i++)F.pan(a+2.6+i*.8,1.5,.6,.82,O1+.07,IT('post'+i,1.2));F.box(b-1.8,b-.2,0,.42,-1.4,-.8,IM('#5a1a6a',0,.5,K))}
  else if(k===10){for(const o of [-1.4,-2.8]){F.tube(a+.4,1.55,o,b-.4,1.55,o,.015,mt,6);for(const s of [a+.4,b-.4])F.tube(s,0,o,s,1.55,o,.015,mt,6);
    for(let s=a+.5;s<b-.5;s+=.09+R()*.05)F.box(s-.015,s+.015,.75+R()*.2,1.52,o-.22,o+.22,IM(pk(['#d8d2c4','#2a2a2e','#7a1f25','#2f5d8a','#c8b090','#e8e4dc','#5a6a4a']),0,.8,K))}
   for(const s of [a+.5,b-.5]){F.cyl(s,0,-.75,.12,1.35,IM('#eeeeea',0,.4,K),10);const p=F.P(s,-.75);ball(p[0],Y0+1.48,p[1],.1,.12,.1,IM('#eeeeea',0,.4,K),8,5)}}
  else if(k===11){for(let s=a+.55;s<b-.4;s+=1.1){const c=pk(HUE);F.box(s-.45,s+.45,0,.8,O1+1.0,O1+.15,IM(c,0,.4,K));F.box(s-.45,s+.45,.8,1.75,O1+1.0,O1+.15,IM('#1a1a1e',0,.2,K),E('#bfe8ff',.18));
    for(let i=0;i<5;i++){const p=F.P(s-.3+R()*.6,O1+.35+R()*.5);ball(p[0],Y0+.86,p[1],.09,.09,.09,M(pk(['#ffd23a','#ff7ab0','#7ae0ff','#ffffff','#9aff7a']),0,.6,-1.2),8,5)}
    F.box(s-.45,s+.45,1.75,1.95,O1+1.0,O1+.15,E(c,4));F.box(s-.45,s+.45,1.95,2.0,O1+1.05,O1+.1,E('#ffffff',3))}}
  else if(k===12){strip(mid,1.9,W-.4,O1+.07,'strips',.46);F.box(a+.2,b-.2,0,1.0,-2.5,-1.95,wood);F.box(a+.15,b-.15,1.0,1.04,-2.55,-1.85,IM('#e8d5b0',13,.3,K));F.box(a+.2,b-.2,1.04,1.24,-2.45,-2.25,IM('#dfeef2',0,.08,K));
   for(let s=a+.3;s<b-.3;s+=.11)F.box(s-.035,s+.035,1.04,1.07,-2.4,-2.3,IM(pk(['#ff7a4a','#f2f2f2','#c0282d','#ffcf6a']),0,.4,K));for(let s=a+.5;s<b-.3;s+=.62)stool(s,-1.5,'#5a3a22');
   for(let s=a+.8;s<b-.4;s+=1.4){F.tube(s,H,-1.2,s,H-.4,-1.2,.006,dk,4);F.cyl(s,H-.75,-1.2,.13,.32,E('#ff4a2a',3),12)}}
  else{for(let l=0;l<3;l++){const y=1.0+l*.42;F.box(a+.1,b-.1,y-.03,y,O1,O1+.3,IM('#3a2414',0,.4,K));for(let i=0;i<Math.round((W-.2)/1.1);i++){const sw=(W-.2)/Math.round((W-.2)/1.1);F.pan(a+.1+sw*(i+.5),y+.17,sw,.3,O1+.12,M('#ffffff',15,.5,1.3,RT.bottleRow))}}
   F.box(a+.2,b-.2,0,1.05,-2.3,-1.8,wood);F.box(a+.15,b-.15,1.05,1.1,-2.35,-1.7,IM('#3a2414',13,.25,K));for(let s=a+.5;s<b-.3;s+=.62)stool(s,-1.4,'#1a1a1e')}}
 function storeGlass(F,ms){const n=SGN[F.face];for(let i=0;i<ms.length-1;i++){const A=F.P(ms[i]+.03,-.255),B=F.P(ms[i+1]-.03,-.255);
  glassPane(SG,A[0],.22,A[1],B[0],2.18,B[1],n);glassPane(SG,A[0],2.24,A[1],B[0],2.68,B[1],n)}}
 // ---- storefront with interior, signboard and sidewalk clutter ----
 function storefront(F,s0,s1,wm,lod){const k=nextShop(),sh=ATL2.SHOPS[k],W=s1-s0,mid=(s0+s1)/2;
  F.box(s0,s0+.3,0,3.3,-.3,0,wm);F.box(s1-.3,s1,0,3.3,-.3,0,wm);F.box(s0+.3,s1-.3,2.7,3.3,-.3,0,wm);
  const ms=[];for(let s=s0+.3;s<=s1-.29;s+=(W-.6)/Math.max(2,Math.round((W-.6)/1.3)))ms.push(s);
  if(lod){const nb=Math.max(1,Math.round((W-.6)/2.8)),bw=(W-.6)/nb,em=rr(.6,.95);for(let i=0;i<nb;i++)F.pan(s0+.3+bw*(i+.5),1.4,bw,2.7,-.28,E2('shop'+k,em))}   // far away: painted interior, one per bay
  else{interior(F,s0,s1,k);storeGlass(F,ms)}                                                                                                 // near: the real thing
  for(const s of ms)F.box(s-.03,s+.03,0,2.7,-.29,-.22,k===6?mSv:mFr);
  F.box(s0+.3,s1-.3,2.18,2.24,-.29,-.22,mFr);F.box(s0+.3,s1-.3,0,.22,-.29,-.21,mFr);F.box(mid+.2,mid+.24,.85,1.55,-.21,-.17,mSv);
  F.box(s0+.12,s1-.12,2.76,3.28,0,.2,mBlk,E2('sign'+k,rr(1.3,2.1)));
  if(!lod)for(let s=s0+.8;s<s1-.5;s+=1.6){F.tube(s,3.38,0,s,3.5,.5,.015,mBlk,4);F.box(s-.07,s+.07,3.42,3.5,.45,.6,mBlk);F.box(s-.05,s+.05,3.41,3.42,.47,.58,E('#fff3dd',14))}
  if(R()<.5){const c1=pk(['#2f5d8a','#8a2f2f','#2f6a46','#c87a1a','#55585e']),A=M(c1,0,.6),B=M('#ece8de',0,.6),n=Math.max(4,Math.round((W-.4)/.4));
   for(let i=0;i<n;i++){const a=s0+.2+i*(W-.4)/n,b=a+(W-.4)/n;F.slope(a,b,.2,2.72,1.1,2.4,i%2?A:B)}F.box(s0+.2,s1-.2,2.2,2.4,1.08,1.12,A)}
  if(lod){glow(F,mid,1.6,1.2,sh.lit,3.2,5.5);return}
  if(k===6){const p=F.P(s0+.2,.3);cylT(p[0],1.0,p[1],.09,1.2,E2('barber',1.4),12,RT.barber);cyl(p[0],2.2,p[1],.1,.08,mSv,12);cyl(p[0],.92,p[1],.1,.08,mSv,12)}
  if([0,1,4,12].includes(k)){const s=s1-.7;F.box(s-.3,s+.3,SW,SW+.95,1.0,1.06,M('#5a3a22',0,.6),E2('menu'+(k%2),.5),true)}
  if(k===7||R()<.35){plant(F,s0+.5,.45,true);if(R()<.6)plant(F,s1-.5,.45,R()<.5)}
  if(R()<.4)for(let i=0;i<1+Math.floor(R()*3);i++)bike(F,s0+1+i*.75,1.3);
  if(R()<.25)vending(F,s1-.6,.75,Math.floor(R()*3),0)}
 // ---- building types ----
 function shophouse(F,s0,s1,lod){const wm=wallM(),floors=1+Math.floor(R()*3),fh=rr(2.8,3.1),h=3.3+floors*fh,d=rr(8,12),W=s1-s0;
  F.box(s0,s1,0,3.3,lod?-.3:-3.95,-d,wm);F.sol(s0,s1,0,3.3,-.3,-d);F.box(s0,s1,3.3,h,0,-d,wm,null,true);storefront(F,s0,s1,wm,lod);
  const bandM=M(pk(['#cfcbc2','#5a5e64','#9a8f80']),0,.7),nw=W<5?1:W<8.5?2:3,litP=rr(.25,.6);
  for(let f=0;f<floors;f++){const y=3.3+f*fh;F.box(s0,s1,y,y+.12,0,.06,bandM);
   const balc=!lod&&R()<.22;for(let i=0;i<nw;i++){const s=s0+W*(i+.5)/nw;win(F,s,y+.9,Math.min(1.3,W/nw-.7),1.3,litP,lod);if(!lod&&R()<.3)ac(F,s,y+.15,0)}
   if(balc){F.box(s0+.3,s1-.3,y+.05,y+.18,0,.8,mCon);for(let s=s0+.35;s<s1-.3;s+=.18)F.tube(s,y+.18,.76,s,y+1.05,.76,.01,mSv,4);F.tube(s0+.3,y+1.05,.76,s1-.3,y+1.05,.76,.02,mSv,4)}}
  if(!lod)F.tube(s1-.15,h,.1,s1-.15,0,.1,.045,mPipe,8);roofClutter(F,s0,s1,h,d,lod);return h}
 function apartment(F,s0,s1,lod){const wm=wallM(),floors=3+Math.floor(R()*4),fh=2.9,h=3.2+floors*fh,d=rr(9,13),W=s1-s0,units=Math.max(1,Math.round(W/3.4)),uw=W/units,litP=rr(.3,.65);
  F.box(s0,s1,0,h,0,-d,wm,null,true);
  const es=R()<.5?s0+1.4:s1-1.4;F.pan(es,1.25,1.8,2.4,.01,E('#cfdcec',.42));F.box(es-.03,es+.03,0,2.45,0,.06,mFr);F.box(es-.95,es+.95,2.4,2.46,0,.06,mFr);if(!lod){const A=F.P(es-.9,.03),Bq=F.P(es+.9,.03);glassPane(SG,A[0],.05,A[1],Bq[0],2.4,Bq[1],SGN[F.face])}   // lit lobby behind rain-streaked glassF.box(es-1,es+1,2.45,2.6,0,1.1,mCon);F.box(es-.95,es+.95,2.44,2.45,.1,1.0,E('#fff3dd',6));F.pan(es+1.35,1.3,.6,.45,.02,E2('mail',.4));
  glow(F,es,2.2,1.4,[.92,.96,1],2.2,4.5);
  if(!lod){const bs=es<(s0+s1)/2?s1-2.2:s0+2.2;F.box(bs-1.8,bs+1.8,2.2,2.3,.1,1.6,M('#6d7178',4,.5));for(const q of [-1.7,1.7])F.box(bs+q-.04,bs+q+.04,0,2.2,1.5,1.58,mSv,null,true);for(let i=0;i<3;i++)if(R()<.8)bike(F,bs-1.2+i*1.1,.9)}
  for(let f=0;f<floors;f++){const y=3.2+f*fh;for(let u=0;u<units;u++){const a=s0+u*uw,b=a+uw,c=(a+b)/2,lit=R()<litP;
   F.box(a+.05,b-.05,y,y+.14,0,1.0,mCon);F.box(a+.05,b-.05,y+.14,y+1.1,.95,1.0,mSv,lod?null:E2('rail',.1));
   F.pan(c,y+1.15,uw-.7,2.0,.005,lit?E2('bd'+pk([0,1,3]),rr(.7,1.15)):E2('bd2',.12));if(!lod){const A=F.P(c-(uw-.7)/2,.03),B=F.P(c+(uw-.7)/2,.03);glassPane(SG,A[0],y+.15,A[1],B[0],y+2.15,B[1],SGN[F.face])}
   if(!lod){F.box(a+.05,a+.1,y+.14,y+2.4,0,1.0,M('#cfd2d4',0,.6));if(R()<.6)F.box(b-.9,b-.15,y+.14,y+.72,.1,.38,M('#d9dad6',0,.5),T2('ac'));
    if(R()<.28){F.tube(a+.3,y+1.95,.75,b-.3,y+1.95,.75,.012,mSv,4);for(let s=a+.5;s<b-.4;s+=rr(.3,.6))F.box(s,s+rr(.2,.45),y+1.4,y+1.93,.73,.77,M(pk(['#f2f2f2','#e86a8a','#4a8ac8','#f2d23a','#9ad06a']),0,.9))}
    if(R()<.25)leaves(F,a+.5,y+.2,.6,.25,24,GREEN)}}}
  roofClutter(F,s0,s1,h,d,lod);if(!lod&&R()<.6)F.box(s0+1,s0+3.5,h,h+2.6,-d+1,-d+4,wm);return h}
 function office(F,s0,s1,lod){const wm=wallM(),floors=4+Math.floor(R()*5),fh=3.3,h=3.6+floors*fh,d=rr(10,14),W=s1-s0,bandM=M(pk(['#d8d2c4','#7f8288','#3a3d42','#b9a58a']),pk([0,3,4]),.6);
  F.box(s0,s1,0,h,0,-d,wm,null,true);{const nb=Math.max(1,Math.round((W-.4)/2.8)),bw=(W-.4)/nb;for(let i=0;i<nb;i++)F.pan(s0+.2+bw*(i+.5),1.6,bw,3.0,.01,E2('off0',.55))}for(let s=s0+.2;s<s1;s+=1.5)F.box(s-.04,s+.04,0,3.3,0,.08,mSv);F.box(s0,s1,3.1,3.6,0,.3,bandM);
  glow(F,(s0+s1)/2,2,1.5,[.9,.95,1],2.6,5);
  if(!lod&&R()<.6){vending(F,s1-.6,.75,Math.floor(R()*3),0);vending(F,s1-1.55,.75,Math.floor(R()*3),0)}
  for(let f=0;f<floors;f++){const y=3.6+f*fh,lit=R()<.55;F.box(s0,s1,y,y+.95,0,.08,bandM);F.pan((s0+s1)/2,y+.95+1.15,W-.3,2.3,.01,E2('off'+(lit?pk([0,0,1]):2),lit?rr(.6,1.1):.25));
   for(let s=s0+.15;s<s1;s+=1.25)F.box(s-.03,s+.03,y+.95,y+fh,0,.1,mSv)}
  if(W>5){const s=s0+.5,y0=3.8,y1=Math.min(h-1,y0+rr(5,8)),k=Math.floor(R()*6);F.box(s-.08,s+.08,y0,y1,.12,.9,mBlk);F.side(s+.081,(y0+y1)/2,.78,y1-y0,.51,E2('vs'+k,1.6),true);F.side(s-.081,(y0+y1)/2,.78,y1-y0,.51,E2('vs'+((k+3)%6),1.6),false)}
  roofClutter(F,s0,s1,h,d,lod);if(R()<.4){const k=Math.floor(R()*14);F.box(s0+.5,s1-.5,h+.6,h+.68,-1,-.6,mFr);for(const q of [s0+.8,s1-.8])F.box(q-.05,q+.05,h,h+2.6,-.85,-.75,mFr);F.box(s0+.6,s1-.6,h+.7,h+2.5,-.8,-.7,mBlk,E2('sign'+k,1.4))}return h}
 function wooden(F,s0,s1,lod){const wood=M(pk(['#3a2a1e','#4a3424','#2e2219']),0,.75),dk=M('#1c140e',0,.7),h=6.0,d=rr(8,10),W=s1-s0,mid=(s0+s1)/2,k=pk([12,13,0,1]);
  F.box(s0,s1,0,h,0,-d,wood,null,true);for(let s=s0+.1;s<s1;s+=.26)F.box(s,s+.04,3.1,5.6,0,.04,dk);
  F.pan(mid,1.15,Math.min(2.4,W-1.2),2.2,.03,E2('lattice',rr(.8,1.2)));F.box(mid-1.3,mid+1.3,2.25,2.35,0,.08,dk);
  F.pan(mid,1.95,Math.min(2.2,W-1.4),.65,.12,TX('noren',.6));const lp=F.P(s0+.45,.3);B(lp[0],1.9,lp[1],.34,.48,.34,E('#ffffff',3,'lantern'));
  F.box(mid-.7,mid+.7,2.45,2.85,.05,.12,dk,E2('sign'+k,1.5));glow(F,mid,1.6,1,[1,.75,.45],2.4,4.5);
  F.slope(s0-.1,s1+.1,0,3.15,.95,2.82,mRoof);F.box(s0-.1,s1+.1,2.78,2.84,.93,.98,dk);
  for(let i=0;i<Math.max(1,Math.floor(W/2.4));i++){const s=s0+W*(i+.5)/Math.max(1,Math.floor(W/2.4));F.pan(s,4.4,1.3,1.0,.02,R()<.5?E2('lattice',.5):E2('w7',.15));F.box(s-.7,s+.7,3.85,3.9,0,.12,dk)}
  F.slope(s0-.2,s1+.2,.6,h,-d/2,h+1.6,mRoof);F.box(s0-.2,s1+.2,h+1.55,h+1.7,-d/2-.1,-d/2+.1,dk);F.box(s0-.2,s1+.2,h-.05,h+.05,.55,.65,dk);
  if(!lod){plant(F,s1-.4,.4,false);if(R()<.5)plant(F,s0+.9,.4,false);if(R()<.4)bike(F,s1+.0-1.2,1.2)}return h+1.6}
 function pencil(F,s0,s1,lod){const wm=wallM(),floors=5+Math.floor(R()*4),fh=3,h=3.2+floors*fh,d=rr(8,11),mid=(s0+s1)/2,k=Math.floor(R()*6);
  F.box(s0,s1,0,h,0,-d,wm,null,true);F.pan(mid,1.1,1.0,2.1,.01,M('#3a2414',0,.6));F.pan(mid,1.45,.4,.5,.02,E('#ffb84a',2));F.box(mid-.9,mid+.9,2.4,2.9,0,.15,mBlk,E2('sign'+pk([9,13,10]),1.6));
  for(let f=0;f<floors;f++)win(F,mid,3.6+f*fh,Math.min(1.4,s1-s0-1.3),1.4,.45,lod);
  F.box(s1-.25,s1-.1,3.4,h-.5,.1,.85,mBlk);F.side(s1-.099,(3.4+h-.5)/2,.73,h-3.9,.48,E2('vs'+k,1.7),true);F.side(s1-.251,(3.4+h-.5)/2,.73,h-3.9,.48,E2('vs'+((k+2)%6),1.7),false);
  roofClutter(F,s0,s1,h,d,lod);return h}
 function parking(F,s0,s1,lod){const W=s1-s0;for(let s=s0+.3;s<=s1-.2;s+=2.5)F.box(s-.05,s+.05,.002,.008,-7.5,-.3,mLn);
  for(let s=s0+1.55;s<s1-1;s+=2.5){F.box(s-.5,s+.5,0,.12,-6.6,-6.4,mCon);if(R()<.55)(()=>{const p=F.P(s,-4);car(p[0],p[1],F.face[1]==='x',pk(['#e8e8e8','#1a1c20','#8a1a1a','#2a4a7a','#c0c4c8','#3a5a3a']))})()}
  const pp=F.P(s0+.5,.6);cyl(pp[0],0,pp[1],.06,4.2,mSv,8);B(pp[0],3.4,pp[1],.9,.9,.12,E('#ffffff',2.4,'park'));F.box(s1-1.2,s1-.6,0,1.4,-.9,-.5,M('#e8e4d8',0,.5),E('#cfe8ff',.8),true);
  F.box(s0,s1,0,.9,-8.2,-8,M('#6d7178',4,.5));for(let s=s0;s<=s1;s+=1.8)F.box(s-.04,s+.04,0,1.2,-8.2,-8,mSv);
  F.box(s0-.02,s0+.02,0,.6,-8,0,M('#c8c2b4',0,.6));glow(F,s0+.5,3.5,.6,[.9,.95,1],2,5);return 0}
 function nook(F,s0,s1,lod){const wm=wallM(),mid=(s0+s1)/2,h=3.4;F.box(s0,s1,0,h,-1.4,-7,wm,null,true);F.pan(mid,1.45,s1-s0-1,2.7,-1.39,T2('shutter',.7));F.box(s0,s1,2.9,3.05,-1.4,.3,M('#6d7178',4,.5));
  for(let i=0;i<3;i++)vending(F,s0+.9+i*.95,-.6,(i+Math.floor(R()*3))%3,lod);F.box(s1-1.2,s1-.4,SW,SW+.8,-1.0,-.4,M('#1e5fc0',0,.5),null,true);
  F.pan(s1-.4,2.2,.8,1.1,-1.39,E2('post'+Math.floor(R()*3),.5));glow(F,mid,2.6,.4,[.9,.97,1],2.2,4);return h}
 const TYPES=[[shophouse,.32],[apartment,.2],[office,.14],[wooden,.1],[pencil,.08],[parking,.07],[nook,.09]];
 const pickType=prev=>{for(let t=0;t<4;t++){let r=R(),i=0;while(i<TYPES.length-1&&r>TYPES[i][1]){r-=TYPES[i][1];i++}if(TYPES[i][0]!==prev)return TYPES[i][0]}return shophouse};
 function row(face,f,a,b){const F=Fac(face,f);let s=a,prev=null;while(s<b-2.5){const T=pickType(prev),w0=T===pencil?rr(3.4,4.4):T===parking?rr(7.5,12):T===nook?rr(3.6,4.6):T===office?rr(7,11):rr(5,9.5);
  let w=Math.min(b-s,w0);if(b-s-w<3)w=b-s;const c=F.P(s+w/2,0),lod=Math.hypot(c[0],c[1])>34?1:0;(w<3.4?nook:T)(F,s,s+w,lod);prev=T;s+=w}}
 row('nz',9,-ROW,2.6);row('nz',9,9,ROW);row('nx',9,22,ROW);row('nx',9,-ROW,3.6);row('pz',-8.5,-ROW,2.5);row('pz',1.5,-ROW,-7.05);
 // ---- street furniture: utility poles with wires, lamps ----
 const mPole=M('#9a978f',3,.8),mWire=M('#15161a',0,.6);
 function poles(pts){let last=null;for(const [x,z] of pts){cyl(x,SW,z,.15,9,mPole,12,.11);B(x,8.1,z,1.5,.1,.1,mSteel);B(x,7.5,z,1.1,.1,.1,mSteel);if(R()<.4)cyl(x+.3,6.4,z,.22,.7,M('#7a7f84',4,.5),12);
  panel(x,2.6,z+.16,.22,.6,'pz',TX('street',.4));solid(x-.17,0,z-.17,x+.17,9,z+.17);
  if(last)for(const dy of [8.15,7.55])for(const dx of [-.6,.6]){const a=[last[0]+dx,dy,last[1]],b=[x+dx,dy,z];polyline(catenary(a,b,.5,16),.011,mWire,4)}last=[x,z]}}
 const PZ=[];for(let x=-12;x>-ROW;x-=19)PZ.push([x,3.35]);poles(PZ);const PN=[];for(let x=-14;x>-ROW;x-=19)PN.push([x,7.3]);poles(PN);
 const PE=[];for(let z=-14;z>-ROW;z-=19)PE.push([7.3,z]);poles(PE);const PN2=[];for(let z=14;z<ROW;z+=19)PN2.push([7.3,z]);poles(PN2);
 const mPl=M('#4a4e55',4,.5);
 function lamp(x,z,dx,dz){cyl(x,SW,z,.06,5.6,mPl,8);tube([x,5.6,z],[x+dx,5.75,z+dz],.04,mPl,6);B(x+dx,5.62,z+dz,.42,.12,.22,E('#ffe2a8',26));solid(x-.08,0,z-.08,x+.08,5.7,z+.08);lights.push([x+dx,5.5,z+dz,11,1*20,.88*20,.66*20])}
 for(let x=-20;x>-ROW;x-=19)lamp(x,3.3,0,.8);for(let x=-24;x>-ROW;x-=19)lamp(x,7.35,0,-.8);for(let x=13;x<ROW;x+=17)lamp(x,7.35,0,-.8);
 for(let z=-22;z>-ROW;z-=19)lamp(7.35,z,-.8,0);for(let z=22;z<ROW;z+=19)lamp(7.35,z,-.8,0);for(let z=-12;z>-ROW;z-=17)lamp(4.3,z,.8,0);
 // parked cars along the kerbs
 car(-21,4.6,true,'#c0c4c8');car(16,6.0,true,'#1a1c20');car(6.2,-19,false,'#8a1a1a');car(5.4,21,false,'#e8e8e8');car(-36,6.0,true,'#2a4a7a');
 // ---- road-works barricades where the walkable area ends ----
 const mRd=M('#c8102e',0,.45),mWt=M('#ece8de',0,.45),mLeg=M('#3a3d42',4,.5);
 function barricade(ax,f,a,b){const seg=(s0,s1,y0,y1,m)=>ax==='x'?BX(f-.03,y0,s0,f+.03,y1,s1,m):BX(s0,y0,f-.03,s1,y1,f+.03,m);
  for(let s=a,i=0;s<b-.01;s+=.3,i++){const e=Math.min(b,s+.3),m=i%2?mRd:mWt;seg(s,e,.62,.82,m);seg(s,e,.98,1.1,m)}
  for(let s=a,i=0;s<=b+.01;s+=1.2,i++){seg(s-.03,s+.03,0,1.1,mLeg);if(i%2===0){const p=ax==='x'?[f,1.17,s]:[s,1.17,f];B(p[0],p[1],p[2],.09,.09,.09,E('#ff3a20',7))}}
  for(let s=a+.6;s<b;s+=2.4){const p=ax==='x'?[f+.5,s]:[s,f+.5];cyl(p[0],0,p[1],.2,.7,M('#ff5a1a',0,.5),10,.03);cyl(p[0],.28,p[1],.15,.12,M('#f4f4f0',0,.5),10)}
  ax==='x'?solid(f-.06,0,a,f+.06,1.2,b):solid(a,0,f-.06,b,1.2,f+.06)}
 barricade('x',-10.25,1.5,9);barricade('x',10.25,3.6,9);barricade('z',10.25,2.6,9);barricade('z',-10.25,2.5,9);
 // ---- distant skyline ----
 for(let i=0;i<46;i++){const a=i/46*TAU+R()*.08,r=70+R()*15,cx=Math.cos(a)*r,cz=Math.sin(a)*r,w=8+R()*12,d=8+R()*10,h=22+R()*48;
  BX(cx-w/2,0,cz-d/2,cx+w/2,h,cz+d/2,M(pk(['#1b2029','#20252e','#252a33']),0,.8));
  const fx=-Math.cos(a),fz=-Math.sin(a),face=Math.abs(fx)>Math.abs(fz)?(fx>0?'px':'nx'):(fz>0?'pz':'nz'),n=18+Math.floor(R()*40);
  for(let k=0;k<n;k++){const y=3+R()*(h-5),m=E(pk(['#ffd9a0','#fff1d6','#cfe0ff']),1.4+R()*1.4);
   if(face==='px')panel(cx+w/2+.05,y,cz+(R()-.5)*d*.85,.9,1.1,'px',m);else if(face==='nx')panel(cx-w/2-.05,y,cz+(R()-.5)*d*.85,.9,1.1,'nx',m);
   else if(face==='pz')panel(cx+(R()-.5)*w*.85,y,cz+d/2+.05,.9,1.1,'pz',m);else panel(cx+(R()-.5)*w*.85,y,cz-d/2-.05,.9,1.1,'nz',m)}
  if(R()<.6)B(cx,h,cz,.4,.4,.4,E('#ff2a10',10))}
 // keep the lights nearest the block for the spare light slots
 lights.sort((p,q)=>Math.hypot(p[0],p[2])-Math.hypot(q[0],q[2]));
 cur=keep;return {vao:vao(g.a),glass:vao(SG.a),boxes,flats,lights,tris:g.a.length/STRIDE/3}})();

// ================= Night Walk: first-person walk (FPV), shopping and the upstairs flat =================
// Like the cruise above, FPV only supplies its own eye / look target while on. V toggles back to the orbit view.
// Collision comes from the scene itself: every triangle is baked once into a 5 cm voxel grid over the 14 m block.

// ---------- sound: everything is synthesised, nothing is downloaded ----------
const SND=(()=>{let ctx=null,master=null,on=true,nb=null;
 function init(){if(ctx)return ctx;const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;ctx=new C();
  master=ctx.createGain();master.gain.value=on?1:0;master.connect(ctx.destination);
  nb=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return ctx}
 for(const ev of ['pointerdown','keydown'])addEventListener(ev,()=>{init();if(ctx&&ctx.state==='suspended')ctx.resume()},{capture:true});
 function now(){const c=init();if(!c||!on)return -1;if(c.state==='suspended')c.resume();return c.currentTime+.02}
 function tone(f,t,dur,vol,type='sine',f2){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+dur);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(master);o.start(t);o.stop(t+dur+.05)}
 function noise(t,dur,vol,type,freq,q=1,att=.005){const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=nb;f.type=type;f.frequency.value=freq;f.Q.value=q;
  g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+att);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(f).connect(g).connect(master);s.start(t,Math.random()*1.5);s.stop(t+dur+.05)}
 function bell(f,t,vol,len=1.6){tone(f,t,len,vol);tone(f*2.01,t,len*.55,vol*.3);tone(f*3.02,t,len*.3,vol*.12)}
 const fx={
  chime(){const t=now();if(t<0)return;bell(659.25,t,.12);bell(523.25,t+.45,.12,2)},                         // ding-dong at the shop door
  slide(){const t=now();if(t<0)return;noise(t,1.0,.05,'bandpass',520,.8,.25);tone(64,t,.95,.018,'sawtooth')},   // door motor + rubber seal
  step(k){const t=now();if(t<0)return;const v=.75+Math.random()*.5;
   if(k==='metal'){tone(170+Math.random()*30,t,.22,.035*v,'triangle');noise(t,.06,.05*v,'bandpass',1900,5)}
   else if(k==='tile'){noise(t,.045,.06*v,'bandpass',2600,2);tone(190,t,.04,.02*v)}
   else if(k==='wood'){noise(t,.07,.07*v,'lowpass',450);tone(105,t,.07,.03*v)}
   else{noise(t,.13,.05*v,'lowpass',850);noise(t+.02,.09,.025*v,'highpass',3200)}},                              // wet pavement
  pick(){const t=now();if(t<0)return;noise(t,.16,.05,'bandpass',3200,.9,.02);noise(t+.06,.1,.03,'bandpass',2200,.9)},
  scan(n){const t=now();if(t<0)return;for(let i=0;i<n;i++)tone(1900,t+i*.2,.08,.05,'square')},
  till(n){const t=now();if(t<0)return;const t2=t+n*.2+.15;noise(t2,.3,.06,'highpass',4500);bell(1568,t2+.05,.06,.8);bell(2093,t2+.14,.06,.9)},
  vend(){const t=now();if(t<0)return;tone(1250,t,.06,.05,'square');tone(1250,t+.1,.06,.05,'square');tone(95,t+.75,.3,.3,'sine',42);noise(t+.75,.22,.12,'lowpass',420);noise(t+.98,.18,.04,'bandpass',1500,3)},
  latch(){const t=now();if(t<0)return;tone(820,t,.03,.08,'square');noise(t,.05,.07,'highpass',2400);tone(260,t+.06,.45,.02,'sawtooth',170)},
  deny(){const t=now();if(t<0)return;tone(240,t,.13,.05,'square');tone(190,t+.15,.2,.05,'square')},
  meow(){const t=now();if(t<0)return;const o=ctx.createOscillator(),f=ctx.createBiquadFilter(),g=ctx.createGain();o.type='sawtooth';f.type='bandpass';f.frequency.value=1100;f.Q.value=2;
   o.frequency.setValueAtTime(520,t);o.frequency.linearRampToValueAtTime(880,t+.16);o.frequency.linearRampToValueAtTime(470,t+.55);
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+.6);o.connect(f).connect(g).connect(master);o.start(t);o.stop(t+.65)}};
 host.track(()=>{if(ctx)ctx.close()});
 return {fx,setOn(v){on=v;if(master)master.gain.value=v?1:0}}})();
// stopping the scene frees the GPU straight away
host.track(()=>{const x=gl.getExtension('WEBGL_lose_context');if(x)x.loseContext()});

// ---------- the upstairs entry door now opens: drawn from its own buffer, rebuilt when it swings ----------
const D2=(()=>{const d={v:gl.createVertexArray(),b:gl.createBuffer(),n:0,th:-1};gl.bindVertexArray(d.v);gl.bindBuffer(gl.ARRAY_BUFFER,d.b);gl.bufferData(gl.ARRAY_BUFFER,4,gl.DYNAMIC_DRAW);
 [[0,3,0],[1,3,12],[2,2,24],[3,3,32],[4,3,44]].forEach(([l,n,o])=>{gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,n,gl.FLOAT,false,STRIDE*4,o)});gl.bindVertexArray(null);return d})();
const D2H=[1.245,-4.9];   // hinge on the outer face, south jamb; the leaf swings out onto the terrace
function buildDoor2(th){if(Math.abs(th-D2.th)<1e-4)return;D2.th=th;const g=new Geo(),keep=cur;cur=g;
 BX(1.2,Y2,-4.9,1.245,F+2.05,-4.0,M('#46665a',4,.5),{nx:M('#85684a',0,.55)});
 BX(1.245,F+.95,-4.2,1.285,F+.98,-4.05,mMG);BX(1.165,F+.96,-4.18,1.2,F+.99,-4.02,mMG);
 panel(1.247,F+1.62,-4.45,.16,.08,'px',TX('plate201',.5));BX(1.245,F+1.15,-4.6,1.255,F+1.18,-4.3,mBk);
 cur=keep;const c=Math.cos(th),s=Math.sin(th),a=g.a;
 for(let i=0;i<a.length;i+=STRIDE){const rx=a[i]-D2H[0],rz=a[i+2]-D2H[1],nx=a[i+3],nz=a[i+5];
  a[i]=D2H[0]+rx*c+rz*s;a[i+2]=D2H[1]-rx*s+rz*c;a[i+3]=nx*c+nz*s;a[i+5]=-nx*s+nz*c}
 gl.bindBuffer(gl.ARRAY_BUFFER,D2.b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(a),gl.DYNAMIC_DRAW);D2.n=a.length/STRIDE}
buildDoor2(0);

const FP=(()=>{
 const CELL=.05,N=420,O=-10.5,YMIN=-.3,BIN=.05,NB=140,WD=5,K=8,YTOP=YMIN+NB*BIN;
 const KNEE=.45,HEAD=1.8,UP=.4,EYE=1.62,RAD=.22,LIM=10.1,TAU=6.283185307;
 const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const occ=new Uint32Array(N*N*WD),surf=new Float32Array(N*N*K),sn=new Uint8Array(N*N);
 const cell=(x,z)=>{const i=Math.floor((x-O)/CELL),j=Math.floor((z-O)/CELL);return i<0||j<0||i>=N||j>=N?-1:j*N+i};
 const bin=y=>Math.floor((y-YMIN)/BIN);
 function addSurf(c,y){const b=c*K,n=sn[c];for(let k=0;k<n;k++)if(Math.abs(surf[b+k]-y)<.03){if(y>surf[b+k])surf[b+k]=y;return}
  if(n<K){surf[b+n]=y;sn[c]=n+1;return}let m=0;for(let k=1;k<K;k++)if(surf[b+k]<surf[b+m])m=k;if(y>surf[b+m])surf[b+m]=y}
 // every sample marks its voxel as occupied; upward faces also become walkable heights for that column
 function bake(a){const S=STRIDE;for(let t=0;t+S*3<=a.length;t+=S*3){
  const ax=a[t],ay=a[t+1],az=a[t+2],bx=a[t+S],by=a[t+S+1],bz=a[t+S+2],cx=a[t+2*S],cy=a[t+2*S+1],cz=a[t+2*S+2];
  if(Math.max(ay,by,cy)<YMIN||Math.min(ay,by,cy)>=YTOP)continue;const up=a[t+4]>.7;
  const L=Math.max(Math.hypot(bx-ax,by-ay,bz-az),Math.hypot(cx-bx,cy-by,cz-bz),Math.hypot(ax-cx,ay-cy,az-cz)),n=Math.max(1,Math.ceil(L/(CELL*.5)));
  for(let i=0;i<=n;i++)for(let j=0;j<=n-i;j++){const u=i/n,v=j/n,w=1-u-v,y=ay*w+by*u+cy*v,c=cell(ax*w+bx*u+cx*v,az*w+bz*u+cz*v);if(c<0)continue;
   const q=bin(y);if(q>=0&&q<NB)occ[c*WD+(q>>5)]|=1<<(q&31);if(up)addSurf(c,y)}}}
 const T0b=performance.now();bake(G.a);bake(GLASS.a);
 // the surrounding streets: buildings, lamps and barricades as solid boxes, sidewalks as flat walkways
 const span=(a,b)=>[Math.max(0,Math.floor((a-O)/CELL)),Math.min(N-1,Math.floor((b-O)/CELL))];
 for(const [x0,y0,z0,x1,y1,z1] of SUR.boxes){const [i0,i1]=span(x0,x1),[j0,j1]=span(z0,z1),q0=Math.max(0,bin(y0)),q1=Math.min(NB-1,bin(y1));
  for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const c=j*N+i;for(let q=q0;q<=q1;q++)occ[c*WD+(q>>5)]|=1<<(q&31)}}
 for(const [x0,z0,x1,z1,h] of SUR.flats){const [i0,i1]=span(x0,x1),[j0,j1]=span(z0,z1);for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++)addSurf(j*N+i,h)}
 const bakeMs=Math.round(performance.now()-T0b);
 const hit=(c,q0,q1)=>{for(let q=Math.max(0,q0);q<=q1&&q<NB;q++)if(occ[c*WD+(q>>5)]&(1<<(q&31)))return true;return false};
 const RING=[0,0];for(const [r,k] of [[RAD,16],[RAD*.5,8]])for(let i=0;i<k;i++){const a=i/k*TAU;RING.push(Math.cos(a)*r,Math.sin(a)*r)}
 const FOOT=[0,0,.1,0,-.1,0,0,.1,0,-.1];
 // shop sliding doors (own buffers) block the doorway until they have slid open
 const DOOR=[-.9,.72,1.36,1.46],DC=[-.09,1.41];let dOpen=0;
 const SHOP={wallet:3000,cart:[],bag:[]};
 const o={on:false,x:-.4,z:5.4,fy:.2,y:0,vy:0,yaw:0,pitch:.04,vx:0,vz:0,bob:0,ph:0,focus:6,eye:[0,0,0],look:[0,0,-1],fwd:[0,0,-1],keys:new Set(),stick:[0,0],
  d2:0,d2t:0,near:false,zone:null,prompt:'',warnT:0,bakeMs,SHOP};
 function seg(px,pz,ax,az,bx,bz){const dx=bx-ax,dz=bz-az,t=Math.max(0,Math.min(1,((px-ax)*dx+(pz-az)*dz)/(dx*dx+dz*dz)));return Math.hypot(px-ax-dx*t,pz-az-dz*t)}
 function blocked(x,z,fy){if(x<-LIM||x>LIM||z<-LIM||z>LIM)return true;
  const q0=bin(fy+KNEE),q1=bin(fy+HEAD);
  for(let k=0;k<RING.length;k+=2){const c=cell(x+RING[k],z+RING[k+1]);if(c>=0&&hit(c,q0,q1))return true}
  if(fy<1&&Math.abs(x)<7&&Math.abs(z)<7){if(dOpen<.85&&x>DOOR[0]-RAD&&x<DOOR[1]+RAD&&z>DOOR[2]-RAD&&z<DOOR[3]+RAD)return true;
   // walking out with an unpaid basket: the clerk calls you back
   if(SHOP.cart.length&&o.z<=1.3&&z>1.3&&x>DOOR[0]&&x<DOOR[1]){if(performance.now()-o.warnT>2500){o.warnT=performance.now();SND.fx.deny();toast('Clerk: "Excuse me! Please pay at the register first."')}return true}}
  if(fy>3.5){const th=o.d2*1.75,c=Math.cos(th),s=Math.sin(th);if(seg(x,z,D2H[0]-.02*c,D2H[1]+.02*s,D2H[0]+.9*s-.02*c,D2H[1]+.9*c+.02*s)<RAD+.04)return true}
  return false}
 function floorAt(x,z,fy){let best=-1e9;for(let k=0;k<FOOT.length;k+=2){const c=cell(x+FOOT[k],z+FOOT[k+1]);if(c<0)continue;
  for(let i=0,b=c*K;i<sn[c];i++){const h=surf[b+i];if(h<=fy+UP&&h>best)best=h}}return best<-1e8?0:best}
 // spawn on the crossing, facing the shop front
 for(let r=0;blocked(o.x,o.z,o.fy)&&r<4;r+=.05)for(let a=0;a<TAU;a+=.4)if(!blocked(-.4+Math.cos(a)*r,5.4+Math.sin(a)*r,o.fy)){o.x=-.4+Math.cos(a)*r;o.z=5.4+Math.sin(a)*r;break}
 o.fy=floorAt(o.x,o.z,.3);o.y=o.fy+EYE;
 o.fov=asp=>asp<1?1.25:1.02;
 // rain boxes (14.4 m) repeated around the block so the surrounding streets are wet too
 o.nl=NLIGHT+Math.min(SUR.lights.length,48-NLIGHT);
 o.xl=function(LP,LC){for(let k=NLIGHT;k<o.nl;k++){const l=SUR.lights[k-NLIGHT];LP.set([l[0],l[1],l[2],l[3]],k*4);LC.set([l[4],l[5],l[6],0],k*4)}};
 o.rainTiles=[];for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++)if(i||j)o.rainTiles.push([i*14.4,j*14.4]);o.blocked=blocked;o.floorAt=floorAt;
 function view(){const s=Math.sin(o.yaw),c=Math.cos(o.yaw),cp=Math.cos(o.pitch);o.fwd=[-s*cp,Math.sin(o.pitch),-c*cp];
  o.eye=[o.x,o.y,o.z];o.look=[o.x+o.fwd[0],o.y+o.fwd[1],o.z+o.fwd[2]]}
 view();
 function ground(){if(o.fy>3.9)return o.x<1.05&&o.z<-.55&&o.z>-6?'wood':(o.z<-6||o.x>2.9?'metal':'out');
  if(o.x>2.9&&o.x<4.05&&o.z<-1.4&&o.fy>.2)return 'metal';if(o.x>-5&&o.x<2.5&&o.z>-6&&o.z<1.4)return 'tile';return 'out'}

 // ---------- messages to the Night Walk page (prompts, toasts, wallet) ----------
 function send(d){host.emit(d)}
 function post(){send({fpv:o.on,locked:document.pointerLockElement===canvas})}
 function toast(t){send({toast:t})}
 function postShop(){send({shop:{wallet:SHOP.wallet,cart:SHOP.cart.map(i=>i.slice()),bag:SHOP.bag.map(i=>i.slice())}})}
 const yen=n=>'¥'+n.toLocaleString('en-US');
 const any=l=>l[Math.floor(Math.random()*l.length)];

 // ---------- shop stock ----------
 const DRINKS=[['Green tea',160],['Cola',170],['Mineral water',110],['Café latte',180],['Sports drink',160],['Melon soda',150],['Royal milk tea',160],['Black coffee can',140]];
 const VEND=[['Hot canned coffee',130],['Corn soup can',130],['Green tea',150],['Lemon soda',150],['Calpis water',150],['Cola',160]];
 const SHELF={
  aS:[['Potato chips',150],['Chocolate biscuits',200],['Cup noodles',220],['Rice crackers',180]],
  aN:[['Cup noodles',220],['Instant yakisoba',230],['Pocky',160],['Gummy candy',130]],
  bN:[['Shrimp chips',150],['Butter cookies',200],['Soy sauce',250],['Dried squid',300]],
  bS:[['Tissue pack',120],['Toothbrush',250],['AA batteries',450],['Hand cream',450]],
  chill:[['Salmon onigiri',150],['Tuna mayo onigiri',140],['Egg sandwich',280],['Karaage bento',550],['Hamburg bento',600]],
  wall:[['Face towel',300],['Phone charger',1280],['Notebook',180],['Plastic umbrella',600]],
  ice:[['Vanilla ice cream',150],['Matcha ice bar',130],['Ice cream sandwich',160]],
  mags:[['Weekly manga',300],['Car magazine',680],['Fashion magazine',750]],
  oden:[['Oden set (daikon, egg, konnyaku)',300]],hot:[['Karaage-kun',238],['Nikuman',170],['Anman',160]],coffee:[['Hot coffee (R)',120],['Iced café latte',200]]};
 function take(item){if(SHOP.cart.length>=8){SND.fx.deny();toast('Your basket is full. Pay at the register first');return}
  SHOP.cart.push(item);SND.fx.pick();toast('Added '+item[0]+' ('+yen(item[1])+') · '+SHOP.cart.length+' in basket');postShop()}
 const cartTotal=()=>SHOP.cart.reduce((s,i)=>s+i[1],0);
 function pay(){const n=SHOP.cart.length;if(!n){SND.fx.deny();toast('Your basket is empty. Grab something from the shelves');return}
  const tot=cartTotal();if(tot>SHOP.wallet){SND.fx.deny();toast('Not enough cash ('+yen(tot)+'). Press Q to put back the last item');return}
  SHOP.wallet-=tot;SHOP.bag.push(...SHOP.cart);SHOP.cart=[];SND.fx.scan(n);SND.fx.till(n);
  setTimeout(()=>toast('Paid '+yen(tot)+' · "Arigatou gozaimashita!"'),n*200+250);postShop()}
 function putBack(){const it=SHOP.cart.pop();if(!it)return;SND.fx.pick();toast('Put back '+it[0]);postShop()}
 function vend(){const it=any(VEND);if(it[1]>SHOP.wallet){SND.fx.deny();toast('Not enough coins for the vending machine');return}
  SHOP.wallet-=it[1];SHOP.bag.push(it);SND.fx.vend();setTimeout(()=>toast('Ga-kon! '+it[0]+' drops out ('+yen(it[1])+')'),800);postShop()}
 function door2(){o.d2t=o.d2t?0:1;SND.fx.latch()}
 const CAT=['The cat purrs and leans into your hand','The cat blinks slowly at you','The cat ignores you and watches the rain'];

 // ---------- interaction spots: level (0 street/shop, 1 upstairs), area, the way you must face, prompt, action ----------
 const ZONES=[];
 function Z(lvl,x0,x1,z0,z1,fx,fz,label,act){ZONES.push({lvl,x0,x1,z0,z1,fx,fz,label,act})}
 Z(0,-4.6,.6,-3.98,-2.95,0,-1,'Take a drink from the cooler',()=>take(any(DRINKS)));
 Z(0,-3.95,-.45,-3.98,-3.08,0,1,'Pick up something from the shelf',()=>take(any(SHELF.aN)));
 Z(0,-3.95,-.45,-2.42,-1.6,0,-1,'Pick up something from the shelf',()=>take(any(SHELF.aS)));
 Z(0,-3.95,-.45,-2.2,-1.33,0,1,'Pick up something from the shelf',()=>take(any(SHELF.bN)));
 Z(0,-3.5,-.45,-.67,.3,0,-1,'Pick up something from the shelf',()=>take(any(SHELF.bS)));
 Z(0,.13,1.0,-2.62,-1.18,-1,0,'Take something from the chilled case',()=>take(any(SHELF.chill)));
 Z(0,.13,1.0,-2.55,-2.2,1,0,'Order a coffee at the counter',()=>take(any(SHELF.coffee)));
 Z(0,.13,1.0,-2.2,-1.45,1,0,()=>SHOP.cart.length?'Pay '+yen(cartTotal())+' at the register':'Register',pay);
 Z(0,.13,1.0,-1.4,-.5,1,0,'Order oden from the counter',()=>take(any(SHELF.oden)));
 Z(0,.13,1.0,-.45,.55,1,0,'Order hot food from the counter',()=>take(any(SHELF.hot)));
 Z(0,-4.35,-3.4,-3.9,-.4,-1,0,'Pick up something from the wall shelf',()=>take(any(SHELF.wall)));
 Z(0,-3.6,-2.6,-.4,.85,-1,0,'Open the ice cream freezer',()=>take(any(SHELF.ice)));
 Z(0,-3.3,-1.1,.2,.95,0,1,'Pick up a magazine',()=>take(any(SHELF.mags)));
 Z(0,-4.97,-3.13,2.22,3.4,0,-1,'Buy a drink from the vending machine',vend);
 Z(1,.2,2.2,-5.2,-3.7,0,0,()=>o.d2t?'Close the door':'Open the door',door2);
 Z(1,-3.8,-2.2,-1.7,-.6,0,1,'Pet the cat',()=>{SND.fx.meow();toast(any(CAT))});
 function findZone(){const lvl=o.fy>3.5?1:o.fy<1?0:-1,hx=-Math.sin(o.yaw),hz=-Math.cos(o.yaw);
  for(const zn of ZONES){if(zn.lvl!==lvl||o.x<zn.x0||o.x>zn.x1||o.z<zn.z0||o.z>zn.z1)continue;
   if(zn.fx||zn.fz){if(hx*zn.fx+hz*zn.fz<.45)continue}
   else{const dx=D2H[0]-o.x,dz=-4.45-o.z,l=Math.hypot(dx,dz)||1;if((hx*dx+hz*dz)/l<.4)continue}   // door: look at it
   return zn}return null}
 function setPrompt(){const zn=o.on?findZone():null;o.zone=zn;const t=zn?(typeof zn.label==='function'?zn.label():zn.label):'';if(t!==o.prompt){o.prompt=t;send({prompt:t})}}
 o.interact=function(){if(o.on&&o.zone)o.zone.act();setPrompt()};

 o.step=function(dt){const K_=o.keys,has=(...k)=>k.some(c=>K_.has(c));
  const kx=(has('KeyD','ArrowRight')?1:0)-(has('KeyA','ArrowLeft')?1:0)+o.stick[0],kz=(has('KeyW','ArrowUp')?1:0)-(has('KeyS','ArrowDown')?1:0)-o.stick[1];
  const il=Math.hypot(kx,kz),ix=il>1?kx/il:kx,iz=il>1?kz/il:kz,sp=has('ShiftLeft','ShiftRight')?4.2:2.1;
  const s=Math.sin(o.yaw),c=Math.cos(o.yaw),tx=(-s*iz+c*ix)*sp,tz=(-c*iz-s*ix)*sp,k=1-Math.exp(-dt*10);
  o.vx+=(tx-o.vx)*k;o.vz+=(tz-o.vz)*k;
  const nx=o.x+o.vx*dt;if(!blocked(nx,o.z,o.fy))o.x=nx;else o.vx=0;
  const nz=o.z+o.vz*dt;if(!blocked(o.x,nz,o.fy))o.z=nz;else o.vz=0;
  // step up onto anything within reach, otherwise fall to the next floor down
  const f=floorAt(o.x,o.z,o.fy);if(f>=o.fy){o.fy=f;o.vy=0}else{o.vy-=9.8*dt;o.fy+=o.vy*dt;if(o.fy<=f){o.fy=f;o.vy=0}}
  const v=Math.hypot(o.vx,o.vz),ph0=o.ph;o.ph+=dt*v*3.1;
  if(v>.5&&o.vy===0&&Math.floor(o.ph/Math.PI)!==Math.floor(ph0/Math.PI))SND.fx.step(ground());
  const bob=REDUCE?0:Math.sin(o.ph)*.028*Math.min(1,v/2.1);
  o.y+=(o.fy+EYE+bob-o.y)*(1-Math.exp(-dt*14));
  // upstairs door swing
  if(o.d2!==o.d2t){o.d2+=Math.sign(o.d2t-o.d2)*Math.min(Math.abs(o.d2t-o.d2),dt*1.6);const e=o.d2*o.d2*(3-2*o.d2);buildDoor2(e*1.75)}
  view();setPrompt();
  // autofocus: the first occupied voxel along the view ray drives the depth of field in the composite pass
  let d=.3;for(;d<30;d+=.1){const px=o.x+o.fwd[0]*d,py=o.y+o.fwd[1]*d,pz=o.z+o.fwd[2]*d,cc=cell(px,pz),q=bin(py);if(cc<0){d=30;break}if(q<0||(q<NB&&hit(cc,q,q)))break}
  o.focus+=(Math.max(1.2,d)-o.focus)*(1-Math.exp(-dt*4))};
 // automatic shop door: chimes and slides open while you stand near it
 o.door=function(dt){const near=o.fy<1&&Math.hypot(o.x-DC[0],o.z-DC[1])<2;
  if(near!==o.near){if(near&&dOpen<.3)SND.fx.chime();SND.fx.slide();o.near=near}
  dOpen+=((near?1:0)-dOpen)*(1-Math.exp(-dt*(near?3.2:2.2)));return dOpen*dOpen*(3-2*dOpen)};
 o.enter=function(){if(o.on)return;if(CR.on)CR.stop();o.on=true;canvas.style.cursor='crosshair';view();post();postShop()};
 // leaving FPV hands the orbit camera your current eye, so it flies back out to the overview from where you stood
 o.exit=function(){if(!o.on)return;o.on=false;o.keys.clear();o.stick=[0,0];ring.style.display='none';canvas.style.cursor='';
  if(document.pointerLockElement===canvas)document.exitPointerLock();setPrompt();
  cam.yaw=o.yaw-TAU*Math.round((o.yaw-CAM0.yaw)/TAU);cam.pitch=-o.pitch;cam.dist=2;cam.target=[o.x+o.fwd[0]*2,o.y+o.fwd[1]*2,o.z+o.fwd[2]*2];
  goal=JSON.parse(JSON.stringify(CAM0));post()};
 function turn(dx,dy,k){o.yaw-=dx*k;o.pitch=Math.max(-1.35,Math.min(1.35,o.pitch-dy*k))}
 // ---------- input: mouse look (pointer lock), WASD / arrows, Shift to run, E interact, Q put back, I bag; touch: left half moves, right half looks ----------
 addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.code==='KeyV'){if(!e.repeat)o.on?o.exit():o.enter();return}
  if(!o.on)return;
  if(e.code==='KeyC'||e.code==='KeyR'){o.exit();return}
  if(!e.repeat){if(e.code==='KeyE'||e.code==='Enter'){o.interact();return}if(e.code==='KeyQ'){putBack();return}if(e.code==='KeyI'||e.code==='Tab'){e.preventDefault();send({inv:1});return}}
  o.keys.add(e.code);if(/^Arrow|^Space$/.test(e.code))e.preventDefault()},{capture:true});
 addEventListener('keyup',e=>o.keys.delete(e.code));addEventListener('blur',()=>o.keys.clear());
 const ring=document.createElement('div');ring.style.cssText='position:fixed;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;border:1.5px solid rgba(255,255,255,.35);background:rgba(255,255,255,.06);pointer-events:none;display:none';
 const knob=document.createElement('i');knob.style.cssText='position:absolute;left:50%;top:50%;width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;background:rgba(255,255,255,.5)';
 ring.appendChild(knob);document.body.appendChild(ring);host.track(()=>ring.remove());
 let stickId=null,lookId=null,s0=[0,0],l0=[0,0];
 canvas.addEventListener('pointerdown',e=>{if(!o.on)return;
  if(e.pointerType==='mouse'){if(document.pointerLockElement!==canvas&&canvas.requestPointerLock){try{const p=canvas.requestPointerLock();if(p&&p.catch)p.catch(()=>{})}catch(err){}}return}
  if(e.clientX<canvas.getBoundingClientRect().left+canvas.clientWidth*.45&&stickId===null){stickId=e.pointerId;s0=[e.clientX,e.clientY];ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px';knob.style.transform='';ring.style.display='block'}
  else if(lookId===null){lookId=e.pointerId;l0=[e.clientX,e.clientY]}});
 canvas.addEventListener('pointermove',e=>{if(!o.on)return;
  if(document.pointerLockElement===canvas){turn(e.movementX,e.movementY,.0021);return}
  if(e.pointerType==='mouse'){if(e.buttons&1)turn(e.movementX,e.movementY,.0035);return}
  if(e.pointerId===stickId){let dx=e.clientX-s0[0],dy=e.clientY-s0[1];const l=Math.hypot(dx,dy),m=48;if(l>m){dx*=m/l;dy*=m/l}o.stick=[dx/m,dy/m];knob.style.transform='translate('+dx+'px,'+dy+'px)'}
  else if(e.pointerId===lookId){turn(e.clientX-l0[0],e.clientY-l0[1],.005);l0=[e.clientX,e.clientY]}});
 const lift=e=>{if(e.pointerId===stickId){stickId=null;o.stick=[0,0];ring.style.display='none'}if(e.pointerId===lookId)lookId=null};
 canvas.addEventListener('pointerup',lift);canvas.addEventListener('pointercancel',lift);
 docOn('pointerlockchange',post);
 // the Night Walk page drives the view toggle, sound, touch interaction, and pauses rendering while the scene is scrolled out of view
 host.ready(d=>{
  if('fpv' in d)d.fpv?o.enter():o.exit();if('pause' in d)window.__pause=!!d.pause;if('sound' in d)SND.setOn(!!d.sound);
  if(d.interact)o.interact();if(d.putBack)putBack();if(d.ping){post();postShop()}});
 if(new URLSearchParams(location.search).get('view')!=='orbit'&&!/#cruise/.test(location.hash))o.enter();
 return o})();
window.__FP=FP;

function drawFS(){gl.bindVertexArray(EMPTY);gl.drawArrays(gl.TRIANGLES,0,3)}
function useMain(VP,eye,t,clipY,mirror,res){const p=P_MAIN;gl.useProgram(p.p);gl.uniformMatrix4fv(p.u.uVP,false,VP);gl.uniform3fv(p.u.uEye,eye);gl.uniform1f(p.u.uTime,t);gl.uniform1f(p.u.uClipY,clipY);gl.uniform1i(p.u.uMirror,mirror);
 gl.uniform2f(p.u.uRes,res[0],res[1]);gl.uniform4fv(p.u.uLP,LP);gl.uniform4fv(p.u.uLC,LC);gl.uniform1i(p.u.uNL,FP.on?FP.nl:NLIGHT);gl.uniform1f(p.u.uFlick,FLICK);gl.uniform3fv(p.u.uSig,SIG);gl.uniform1f(p.u.uHL,HLF);gl.uniform3fv(p.u.uSP,SP);gl.uniform3fv(p.u.uSD,SD);gl.uniform4fv(p.u.uSC,SC);
 gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,atlasTex);gl.uniform1i(p.u.uAtlas,0);gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,mirror?null:T_.mt);gl.uniform1i(p.u.uRefl,1);gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,ATL2.tex);gl.uniform1i(p.u.uAtlas2,2);gl.activeTexture(gl.TEXTURE0)}
function drawScene(p,door){gl.uniform3f(p.u.uOffset,0,0,0);gl.bindVertexArray(VA.g.v);gl.drawArrays(gl.TRIANGLES,0,VA.g.n);
 gl.uniform3f(p.u.uOffset,-door,0,0);gl.bindVertexArray(VA.dl.v);gl.drawArrays(gl.TRIANGLES,0,VA.dl.n);gl.uniform3f(p.u.uOffset,door,0,0);gl.bindVertexArray(VA.dr.v);gl.drawArrays(gl.TRIANGLES,0,VA.dr.n);gl.uniform3f(p.u.uOffset,0,0,0);if(WIP.n){gl.bindVertexArray(WIP.v);gl.drawArrays(gl.TRIANGLES,0,WIP.n)}if(D2.n){gl.bindVertexArray(D2.v);gl.drawArrays(gl.TRIANGLES,0,D2.n)}if(FP.on){gl.bindVertexArray(SUR.vao.v);gl.drawArrays(gl.TRIANGLES,0,SUR.vao.n)}}
let FLICK=1,SIG=[0,0,0];const sigLight=LIGHTS.findIndex(l=>l.c[0]>.9&&l.c[1]<.1);
let last=performance.now()/1000,T0=last,perf=.016,QS=1,lastQ=0,qi=0,lastCamKey='',mirrorFrame=0;const QL=[1,.85,.72,.6];
function frame(){if(host.dead)return;if(window.__pause){last=performance.now()/1000;requestAnimationFrame(frame);return}const now=performance.now()/1000;const dt=Math.min(.05,now-last);last=now;const t=now-T0+(window.__tOff||0);
 perf=perf*.95+dt*.05;if(!window.__fixQ&&now-T0>3&&now-lastQ>2){if(perf>.034&&qi<QL.length-1){qi++;lastQ=now;perf=.025}else if(perf<.019&&qi>0&&now-lastQ>6){qi--;lastQ=now;perf=.025}QS=QL[qi]}const dpr=Math.min(window.devicePixelRatio||1,window.__dpr||1.5)*QS;const w=Math.max(2,Math.round(canvas.clientWidth*dpr)),h=Math.max(2,Math.round(canvas.clientHeight*dpr));if(w!==canvas.width||h!==canvas.height){canvas.width=w;canvas.height=h}if(w!==RW||h!==RH)setup(w,h);
 const k=1-Math.exp(-dt*9);cam.yaw+=(goal.yaw-cam.yaw)*k;cam.pitch+=(goal.pitch-cam.pitch)*k;cam.dist+=(goal.dist-cam.dist)*k;for(let i=0;i<3;i++)cam.target[i]+=(goal.target[i]-cam.target[i])*k;
 if(CR.on)CR.step(now);if(FP.on)FP.step(dt);
 const eye=FP.on?FP.eye:[cam.target[0]+cam.dist*Math.sin(cam.yaw)*Math.cos(cam.pitch),cam.target[1]+cam.dist*Math.sin(cam.pitch),cam.target[2]+cam.dist*Math.cos(cam.yaw)*Math.cos(cam.pitch)];
 const NEAR=FP.on?.05:Math.max(.1,cam.dist*.05),FAR=FP.on?140:cam.dist+60;const Pm=persp(FP.on?FP.fov(w/h):.52,w/h,NEAR,FAR),Vm=lookAt(eye,FP.on?FP.look:cam.target),VP=m4mul(Pm,Vm);
 FLICK=1+.025*Math.sin(t*3.1)+.01*Math.sin(t*17.)-((t%11.3)<.07||((t%11.3)>.14&&(t%11.3)<.19)?.45:0);
 const cyc=t%16;const sg=cyc<7?0:cyc<9?1:2;SIG=[sg===0?14:0,sg===1?14:0,sg===2?16:0];
 {const fc=t%9.5;HLF=(fc>4&&fc<4.12)||(fc>4.28&&fc<4.4)?1.8:1;}updSpots();
 const WP=wiperPhase(t);buildWipers(WP.th);
 const dc=t%13;let o=dc<2?0:dc<3.2?(dc-2)/1.2:dc<6?1:dc<7.2?1-(dc-6)/1.2:0;o=o*o*(3-2*o);const door=(FP.on?FP.door(dt):o)*.78;
 LIGHTS.forEach((L,i)=>{let I=L.i;if(i===sigLight)I=sg===2?3:0;if(L.c[2]>.9&&L.p[1]>3.5&&L.p[1]<4)I*=FLICK;LP.set([L.p[0],L.p[1],L.p[2],L.r],i*4);LC.set([L.c[0]*I,L.c[1]*I,L.c[2]*I,L.zone2?2:(L.indoor?1:0)],i*4)});
 if(FP.on)FP.xl(LP,LC);if(sigLight>=0){const c=sg===0?[.1,1,.75]:sg===1?[1,.7,.1]:[1,.15,.08];const x=sg===0?5.67:sg===1?6.1:6.53;LP.set([x,5.05,3.9,4.5],sigLight*4);LC.set([c[0]*3,c[1]*3,c[2]*3,0],sigLight*4)}
 gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.disable(gl.BLEND);gl.depthMask(true);
 const MY=.1;const Rm=new Float32Array([1,0,0,0,0,-1,0,0,0,0,1,0,0,2*MY,0,1]);const eyeM=[eye[0],2*MY-eye[1],eye[2]];
 const camKey=eye.map(v=>v.toFixed(3)).join(',');const camMoved=camKey!==lastCamKey;lastCamKey=camKey;
 if(camMoved||!T_.mirrorOk||((mirrorFrame++)&1)===0){T_.mirrorOk=true;
 gl.bindFramebuffer(gl.FRAMEBUFFER,T_.mF);gl.viewport(0,0,T_.mw,T_.mh);gl.clearColor(.012,.016,.028,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 useMain(m4mul(VP,Rm),eyeM,t,.16,1,[T_.mw,T_.mh]);drawScene(P_MAIN,door);}
 gl.bindFramebuffer(gl.FRAMEBUFFER,T_.msF);gl.viewport(0,0,w,h);gl.clearColor(.012,.016,.03,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 useMain(VP,eye,t,-100,0,[w,h]);drawScene(P_MAIN,door);
 gl.bindFramebuffer(gl.READ_FRAMEBUFFER,T_.msF);gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,T_.resF);gl.blitFramebuffer(0,0,w,h,0,0,w,h,gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT,gl.NEAREST);
 gl.disable(gl.DEPTH_TEST);gl.depthMask(false);gl.bindFramebuffer(gl.FRAMEBUFFER,T_.aF);gl.viewport(0,0,T_.mw,T_.mh);gl.useProgram(P_AO.p);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,T_.dt);gl.uniform1i(P_AO.u.uDepth,0);
 gl.uniformMatrix4fv(P_AO.u.uP,false,Pm);gl.uniformMatrix4fv(P_AO.u.uIP,false,m4inv(Pm));gl.uniform2f(P_AO.u.uTex,1/T_.mw,1/T_.mh);drawFS();
 gl.bindFramebuffer(gl.FRAMEBUFFER,T_.msF);gl.viewport(0,0,w,h);gl.enable(gl.BLEND);gl.blendFunc(gl.DST_COLOR,gl.ZERO);gl.useProgram(P_AOA.p);gl.bindTexture(gl.TEXTURE_2D,T_.at);gl.uniform1i(P_AOA.u.uAO,0);gl.uniform2f(P_AOA.u.uTex,1/T_.mw,1/T_.mh);gl.uniform1f(P_AOA.u.uK,.85);drawFS();
 gl.disable(gl.BLEND);
 gl.bindFramebuffer(gl.READ_FRAMEBUFFER,T_.msF);gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,T_.resF);gl.blitFramebuffer(0,0,w,h,0,0,w,h,gl.COLOR_BUFFER_BIT,gl.NEAREST);
 gl.bindFramebuffer(gl.FRAMEBUFFER,T_.msF);gl.enable(gl.DEPTH_TEST);gl.depthMask(false);
 const pg=P_GLASS;gl.useProgram(pg.p);gl.uniformMatrix4fv(pg.u.uVP,false,VP);gl.uniform2f(pg.u.uRes,w,h);gl.uniform1f(pg.u.uTime,t);gl.uniform3fv(pg.u.uEye,eye);gl.uniform1f(pg.u.uWc,WP.c);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,T_.sc);gl.uniform1i(pg.u.uScene,0);
 gl.uniform3f(pg.u.uOffset,0,0,0);gl.bindVertexArray(VA.glass.v);gl.drawArrays(gl.TRIANGLES,0,VA.glass.n);if(FP.on&&SUR.glass.n){gl.bindVertexArray(SUR.glass.v);gl.drawArrays(gl.TRIANGLES,0,SUR.glass.n)}
 gl.uniform3f(pg.u.uOffset,-door,0,0);gl.bindVertexArray(VA.gl_.v);gl.drawArrays(gl.TRIANGLES,0,VA.gl_.n);gl.uniform3f(pg.u.uOffset,door,0,0);gl.bindVertexArray(VA.gr.v);gl.drawArrays(gl.TRIANGLES,0,VA.gr.n);
 gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE);const pr=P_RAIN;gl.useProgram(pr.p);gl.uniformMatrix4fv(pr.u.uVP,false,VP);gl.uniform3fv(pr.u.uEye,eye);gl.uniform1f(pr.u.uTime,t);
 const RL=new Float32Array(40),RC=new Float32Array(40);const keyL=RAINIDX;keyL.forEach((li,j)=>{RL.set([LP[li*4],LP[li*4+1],LP[li*4+2],1],j*4);RC.set([LC[li*4],LC[li*4+1],LC[li*4+2],0],j*4)});
 gl.uniform4fv(pr.u.uRL,RL);gl.uniform4fv(pr.u.uRC,RC);gl.uniform3fv(pr.u.uSP,SP);gl.uniform3fv(pr.u.uSD,SD);gl.uniform4fv(pr.u.uSC,SC);gl.uniform3fv(pr.u.uEx,EXH);
 gl.uniform1i(pr.u.uMode,0);gl.uniform1f(pr.u.uGain,.11);gl.bindVertexArray(RAIN.v);gl.drawArrays(gl.TRIANGLES,0,RAIN.n);if(FP.on){for(const r of FP.rainTiles){gl.uniform2f(pr.u.uROff,r[0],r[1]);gl.drawArrays(gl.TRIANGLES,0,RAIN.n)}gl.uniform2f(pr.u.uROff,0,0)}
 gl.uniform1i(pr.u.uMode,1);gl.uniform1f(pr.u.uGain,.45);gl.bindVertexArray(DRIP.v);gl.drawArrays(gl.TRIANGLES,0,DRIP.n);
 gl.uniform1i(pr.u.uMode,2);gl.uniform1f(pr.u.uGain,.16);gl.bindVertexArray(SPL.v);gl.drawArrays(gl.TRIANGLES,0,SPL.n);if(FP.on){for(const r of FP.rainTiles){gl.uniform2f(pr.u.uROff,r[0],r[1]);gl.drawArrays(gl.TRIANGLES,0,SPL.n)}gl.uniform2f(pr.u.uROff,0,0)}
 gl.uniform1i(pr.u.uMode,3);gl.uniform1f(pr.u.uGain,.2);gl.bindVertexArray(STEAM.v);gl.drawArrays(gl.TRIANGLES,0,STEAM.n);
 if(window.__beam){gl.useProgram(P_BEAM.p);gl.uniformMatrix4fv(P_BEAM.u.uVP,false,VP);gl.uniform1f(P_BEAM.u.uTime,t);gl.uniform1f(P_BEAM.u.uI,window.__beam);gl.bindVertexArray(BEAMV.v);gl.drawArrays(gl.TRIANGLES,0,BEAMV.n);}

 gl.disable(gl.BLEND);gl.depthMask(true);
 gl.bindFramebuffer(gl.READ_FRAMEBUFFER,T_.msF);gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,T_.resF);gl.blitFramebuffer(0,0,w,h,0,0,w,h,gl.COLOR_BUFFER_BIT,gl.NEAREST);
 gl.disable(gl.DEPTH_TEST);const mips=T_.mips;gl.useProgram(P_DOWN.p);gl.uniform1i(P_DOWN.u.uSrc,0);
 let src=T_.sc,sw=w,shh=h;mips.forEach((m,i)=>{gl.bindFramebuffer(gl.FRAMEBUFFER,m.f);gl.viewport(0,0,m.w,m.h);gl.bindTexture(gl.TEXTURE_2D,src);gl.uniform2f(P_DOWN.u.uTex,1/sw,1/shh);gl.uniform1i(P_DOWN.u.uKaris,i===0?1:0);drawFS();src=m.t;sw=m.w;shh=m.h});
 if(!T_.blurT||T_.blurW!==mips[1].w){T_.blurT=tex(mips[1].w,mips[1].h);T_.blurF=fbo(T_.blurT);T_.blurW=mips[1].w}gl.bindFramebuffer(gl.READ_FRAMEBUFFER,mips[1].f);
 gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,T_.blurF);gl.blitFramebuffer(0,0,mips[1].w,mips[1].h,0,0,mips[1].w,mips[1].h,gl.COLOR_BUFFER_BIT,gl.LINEAR);
 gl.useProgram(P_UP.p);gl.uniform1i(P_UP.u.uSrc,0);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE);
 for(let i=mips.length-1;i>0;i--){const s=mips[i],d=mips[i-1];gl.bindFramebuffer(gl.FRAMEBUFFER,d.f);gl.viewport(0,0,d.w,d.h);gl.bindTexture(gl.TEXTURE_2D,s.t);gl.uniform2f(P_UP.u.uTex,1/s.w,1/s.h);gl.uniform1f(P_UP.u.uW,1.);drawFS()}
 gl.disable(gl.BLEND);
 gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,w,h);const pc=P_COMP;gl.useProgram(pc.p);
 gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,T_.sc);gl.uniform1i(pc.u.uScene,0);gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,mips[0].t);gl.uniform1i(pc.u.uBloom,1);
 gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,T_.blurT);gl.uniform1i(pc.u.uBlur,2);gl.activeTexture(gl.TEXTURE3);gl.bindTexture(gl.TEXTURE_2D,T_.dt);gl.uniform1i(pc.u.uDepth,3);gl.activeTexture(gl.TEXTURE0);
 gl.uniform1f(pc.u.uExp,window.__exp||.5);gl.uniform1f(pc.u.uTime,t);gl.uniform1f(pc.u.uFocus,FP.on?FP.focus:cam.dist);gl.uniform1f(pc.u.uNear,NEAR);gl.uniform1f(pc.u.uFar,FAR);gl.uniform1f(pc.u.uBloomK,window.__bloom||.022);gl.uniform2f(pc.u.uRes,w,h);drawFS();
 window.__frames=(window.__frames||0)+1;if(window.__snapReq){window.__snapReq=false;window.__snap=canvas.toDataURL('image/jpeg',.92)}
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
window.__cam=goal;window.__camNow=cam;

}).catch(e=>{console.error(e);host.fail('The scene could not start: '+((e&&e.message)||e))});
};
