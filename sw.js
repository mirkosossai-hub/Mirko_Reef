const C='reeflog-v39';
const CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','jspdf.umd.min.js','i18n-en.js'];
const CDN='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE).then(()=>c.add(CDN).catch(()=>{}))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
