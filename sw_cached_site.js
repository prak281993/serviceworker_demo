const cacheName = "v2";

const cacheAssets = [
  "index.html",
  "about.html",
  "/css/style.css",
  "/js/main.js",
];

// Call Install Event
self.addEventListener("install", (e) => {});

// Call Activate Event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all[
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing old Cache");
            return caches.delete(cache);
          }
        })
      ];
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("Service worker: Fetching");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cache
        caches.open(cacheName).then((cache) => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
