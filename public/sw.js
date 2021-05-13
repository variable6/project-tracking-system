//  ---->>>>>>>>>>>>> static keys
const version = '2.0.8'
const CACHE_NAME = `site-assets-${version}`

const dbURL = 'https://pts-001.herokuapp.com/api/'

const assets = [
  '/',
  '/manifest.json',
  '/favicon.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&family=Open+Sans:wght@300;400;600;700;800&display=swap',
  '/static/js/2.e4491b21.chunk.js',
  '/static/js/main.de39bd5d.chunk.js',
  '/static/js/runtime-main.7c1fe055.js',
  '/static/js/3.cf220627.chunk.js',
  '/static/css/main.3706c7f9.chunk.css'
]

// ----> insatll service worker
this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(assets))
  )
})


// ----> Activating sw
this.addEventListener('activate', evt => {
  let cacheWhiteList = [CACHE_NAME]
  evt.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      ))
  )
})

// =====> fetch event
this.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          const res = response.clone()
          if (!res.url.includes(dbURL))
            cache.put(event.request, res);
          return response;
        });
      });
    })
  );
});