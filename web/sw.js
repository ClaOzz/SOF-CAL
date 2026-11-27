// SOF-CAL 5.0.1 — web.
const CACHE='sof-cal-v510-20261127-releases-images';
const FILES=["./liberaciones510/catalog.json","./plantillas502/FNC.pdf", "./plantillas502/FHC.pdf", "./plantillas502/templates.json","./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./plantillas501/FHC.pdf", "./plantillas501/FNC.pdf", "./plantillas501/equipment.xlsx", "./plantillas501/inspection-header.png", "./plantillas501/inspection-source.pdf", "./plantillas501/quality.xlsx", "./plantillas501/templates.json", "./vendor501/fonts.json", "./vendor501/jspdf.js", "./vendor501/jszip.js", "./vendor501/pdf-lib.js", "./vendor501/pdf.mjs", "./vendor501/pdf.worker.mjs", "./assets501/AQL.pdf", "./assets501/FHC.pdf", "./assets501/FNC.docx", "./assets501/FNC.pdf", "./assets501/RCA.xlsx", "./assets501/REC.pdf", "./assets501/SAL.pdf", "./assets501/fhc-background-0.png", "./assets501/fhc-background-1.png", "./assets501/fhc-background-2.png", "./assets501/help-cierre.jpg", "./assets501/help-controles.jpg", "./assets501/help-datos.jpg", "./assets501/help-inicio.jpg", "./assets501/help-materiales.jpg"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sof-cal-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||u.pathname.endsWith('/config.json'))return;
 const update=async cache=>{const r=await fetch(e.request);if(r.ok)await cache.put(e.request,r.clone());return r;};
 e.respondWith((async()=>{const cache=await caches.open(CACHE),hit=await cache.match(e.request);
 if(e.request.mode==='navigate'){const refresh=update(cache);if(hit){e.waitUntil(refresh.catch(()=>{}));return hit;}try{return await refresh;}catch{return await cache.match('./index.html')||Response.error();}}
 if(hit)return hit;return update(cache);
 })());
});
