self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        './route_trip/',
        './route_trip/index.html',
        './route_trip/favicon.ico',
        './route_trip/logo192.png',
        './route_trip/logo512.png',
        './route_trip/manifest.json',
        './route_trip/robots.txt',
        './route_trip/static/',
        './route_trip/static/css/',
        './route_trip/static/js/'
      ]);
    })
  );
});