const cacheName = '10LM-News-0.0.1'
self.addEventListener('install', (evt) => {
  const loadPromise = caches
  .open(cacheName)
  .then((cache => {
     return cache.addAll([
       'index.html',
       'main.js',
       'reset.css',
       'style.css'
     ])
   })
  ).then(()=>{
    return self.skipWaiting();
  })
  evt.waitUntil(loadPromise)
})
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
   self.clients.claim()
   .then(_ =>caches.keys())
   .then(keys=>{
     keys.forEach(key=>{
       if(key!== cacheName){
         caches.delete(key)
       }
     })
   })
  )

})
self.addEventListener('fetch', (evt) => {
  if (!navigator.onLine) {
    const headers = {headers: {'Content-Type': 'text/html;charset-utf-8'}}
    evt.respondWith(new Response('<h2>Pas de connexion internet, vous êtes offline</h2>', headers))
  }
  console.log(evt.request.url)
  evt.respondWith(
   caches.match(evt.request).then(res => {
     if (res) {return res}
     return fetch(evt.request).then((response)=>{
       return caches.open(cacheName)
       .then(cache=>{
         cache.put(evt.request, response.clone())
       }).then(()=>{
         return response;
       })
     })
   })
  )
})
