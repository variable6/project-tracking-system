//  ---->>>>>>>>>>>>> static keys
const version = 1.1
const cacheName = `site-static-${version}`

const assets = [
  '/',
  '/index.html',
  '/employees',
  '/projects'
]

// ----> insatll service worker
this.addEventListener('install', event => {
  console.log('sw has been installed')
  caches.open(cacheName)
    .then(cache => {
      cache.addAll(assets)
    })
})


// ----> Activating sw
this.addEventListener('activate', evt => {
  console.log('sw has been activated')
})

// =====> fetch event
this.addEventListener('fetch', evt => {

})
