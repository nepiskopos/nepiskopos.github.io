// Emergency Service Worker - Immediately Unregisters Itself
// This prevents 404 errors and removes all caching

self.addEventListener('install', function(event) {
    // Skip waiting to immediately activate
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    // Unregister this service worker immediately
    self.registration.unregister().then(function() {
        console.log('Service worker unregistered successfully');
    }).catch(function(error) {
        console.error('Error unregistering service worker:', error);
    });
});

// Don't cache anything - always fetch from network
self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request));
});
