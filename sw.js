const CACHE_NAME = 'nikolaos-portfolio-v1.2.0'; // Increment version for updates
const STATIC_CACHE = 'static-v1.2.0';
const DYNAMIC_CACHE = 'dynamic-v1.2.0';

const urlsToCache = [
  './',
  './index.html',
  './assets/css/style.css?v=1.2.0',
  './assets/css/fontawesome.css?v=1.2.0',
  './assets/js/script.js?v=1.2.0',
  './assets/img/favicon.svg',
  './assets/img/favicon.ico',
  './manifest.json',
  'https://avatars.githubusercontent.com/u/58558195?v=4'
];

// Network-first strategies for these resources (always try network first)
const networkFirstResources = [
  './index.html',
  './assets/js/script.js?v=1.2.0',
  './manifest.json',
  './assets/css/style.css?v=1.2.0', // Add CSS to network-first for immediate updates
  './assets/css/fontawesome.css?v=1.2.0'
];

// Cache-first strategies for these resources
const cacheFirstResources = [
  './assets/img/favicon.svg',
  './assets/img/favicon.ico'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('Cache installation failed:', error);
      })
  );
  // Force activation of new service worker
  self.skipWaiting();
});

// Enhanced fetch event with smart caching strategies
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const requestPath = url.pathname;

  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(
    handleFetchRequest(event.request, requestPath)
  );
});

// Smart fetch handling with different strategies
async function handleFetchRequest(request, requestPath) {
  try {
    // Network-first strategy for critical resources
    if (shouldUseNetworkFirst(requestPath)) {
      return await networkFirstStrategy(request);
    }

    // Cache-first strategy for static assets
    if (shouldUseCacheFirst(requestPath)) {
      return await cacheFirstStrategy(request);
    }

    // Default: Stale while revalidate
    return await staleWhileRevalidateStrategy(request);

  } catch (error) {
    console.warn('Fetch failed:', error);
    return await fallbackResponse(request);
  }
}

// Check if resource should use network-first strategy
function shouldUseNetworkFirst(path) {
  return networkFirstResources.some(resource => path.includes(resource.replace('./', ''))) ||
         path.includes('?v=') || // Cache-busting queries
         path.includes('_t=') || // Timestamp queries
         path.includes('?t='); // Time-based cache busting
}

// Check if resource should use cache-first strategy
function shouldUseCacheFirst(path) {
  return cacheFirstResources.some(resource => path.includes(resource.replace('./', '')));
}

// Network-first strategy: Try network, fallback to cache
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request.clone());

    if (networkResponse && networkResponse.status === 200) {
      // Update cache with fresh content
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.warn('Network request failed, using cache:', error);
  }

  // Fallback to cache
  const cachedResponse = await caches.match(request);
  return cachedResponse || await fallbackResponse(request);
}

// Cache-first strategy: Try cache, fallback to network
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request.clone());

    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.warn('Network request failed for static asset:', error);
  }

  return await fallbackResponse(request);
}

// Stale while revalidate: Return cache immediately, update in background
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);

  // Background fetch to update cache
  const fetchPromise = fetch(request.clone()).then(response => {
    if (response && response.status === 200) {
      const cache = caches.open(DYNAMIC_CACHE);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  }).catch(error => {
    console.warn('Background fetch failed:', error);
    return null;
  });

  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }

  // Otherwise wait for network
  return await fetchPromise || await fallbackResponse(request);
}

// Fallback response for failed requests
async function fallbackResponse(request) {
  if (request.destination === 'document') {
    // Return cached index.html for navigation requests
    return await caches.match('./index.html') || new Response('Offline', { status: 503 });
  }

  return new Response('Resource not available offline', {
    status: 503,
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        const validCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE];
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!validCaches.includes(cacheName)) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim()
    ])
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/assets/img/favicon.svg',
    badge: '/assets/img/favicon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/assets/img/favicon.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/img/favicon.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Nikolaos Episkopos Portfolio', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync function
function doBackgroundSync() {
  // Implement background sync logic here
  console.log('Background sync completed');
}

// Message handling for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Error handling
self.addEventListener('error', event => {
  console.error('Service Worker error:', event.error);
});

// Unhandled rejection handling
self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker unhandled rejection:', event.reason);
});