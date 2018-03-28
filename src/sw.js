// SERVICE WORKER SCRIPT

var cacheName = 'quizninja-cache';

// Beware that index.html may also be requested as /
var filesToCache = [
  '/quizninja/',
  '/quizninja/index.html',
  '/quizninja/play.html',

  '/quizninja/js/main.js',
  '/quizninja/js/helper.js',

  '/quizninja/css/style.css',

  '/quizninja/media/logo.svg',
  '/quizninja/media/sfx-countdown.mp3',
  '/quizninja/media/sfx-invalid-tone.mp3',
  '/quizninja/media/sfx-katana.mp3',
  '/quizninja/media/sfx-valid-tone.mp3',
  '/quizninja/media/soundtrack-end.mp3',
  '/quizninja/media/soundtrack-main.mp3'

  /*
  'pages/offline.html',
  'pages/404.html'
  */
];

/*
 * CACHE THE APP SHELL
 */

// When the service worker is registered, an 'install' event is triggered the
// first time the user visits the page
self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      // Takes a list of URLs, then fetches them from the server and adds the
      // response to the cache. This method is atomic and if any of the files
      // fail, the entire cache step fails
      return cache.addAll(filesToCache);
    })
  );
});







// The 'activate' event is fired when the service worker starts up
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  // Logic to update the cache whenever any of the app shell files change
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

/*
 * SERVE FILES FROM THE CACHE
 */

// We've cached the app shell components, but we still need to load them from
// the local cache.
self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache

    }).catch(function(error) {

      // TODO 6 - Respond with custom offline page

    })
  );
});