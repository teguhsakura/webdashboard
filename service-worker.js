const CACHE_NAME = 'mppt-dashboard-v1.2';

const urlsToCache = [
  '/webdashboard/',
  '/webdashboard/index.html',
  '/webdashboard/mqtt.min.js',
  '/webdashboard/chart.js',
  '/webdashboard/icons/icon-192x192.png',
  '/webdashboard/icons/icon-512x512.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME)
            .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/webdashboard/')
  );
});
