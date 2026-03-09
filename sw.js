self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("state-ai-cache-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/icons/icon-192.png",
        "/icons/icon-512.png",
        "/icons/icon-maskable.png",
        "/icons/apple-touch-icon.png",
        "/icons/favicon.ico"
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== 'state-ai-cache-v1').map(k => caches.delete(k))
    ))
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Bypass non-GET and cross-origin requests
  if (event.request.method !== 'GET' || url.origin !== location.origin) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open("state-ai-cache-v1").then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
