const CACHE = 'fasten-v3';

// Network-first strategy: always try fresh content, fall back to cache
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Delete ALL old caches
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first: try network, cache the result, fall back to cache if offline
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Cache the fresh response
        const clone = response.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return response;
      })
      .catch(() => {
        // Offline: serve from cache
        return caches.match(e.request);
      })
  );
});

// Handle notification clicks — open the app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(cls => {
      if (cls.length > 0) return cls[0].focus();
      return clients.openWindow('/');
    })
  );
});

// Listen for messages from main page to show notifications
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SHOW_NOTIF') {
    self.registration.showNotification('💧 Fasten Companion', {
      body: e.data.body,
      icon: '💧',
      tag: 'fasten-motiv',
      renotify: true,
      vibrate: [200, 100, 200]
    });
  }
});
