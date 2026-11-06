// Application version remains 4.4.0; cache revision only.
const CACHE='sof-cal-v440-20261106-audit-20261106';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
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
