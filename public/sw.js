//  ---->>>>>>>>>>>>> static keys
const version = 1.1
const CACHE_NAME = `site-static-${version}`

const dbURL = 'https://pts-001.herokuapp.com/api/'

const assets = [
  '/',
  '/manifest.json',
  '/favicon.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&family=Open+Sans:wght@300;400;600;700;800&display=swap',
  `/static/js/2.ecf38f78.chunk.js`,
  '/static/js/main.32234dc4.chunk.js',
  '/static/js/3.61151f9e.chunk.js',
  '/static/js/runtime-main.f4b790b9.js',
  '/static/css/main.3e6a0a69.chunk.css'
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
this.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(res => res ? res : fetch(evt.request))
  )
})

if (navigator.onLine) {
  console.log('ok')
}