const filesToCache = [
    '/login.html',
    '/css/login.css',
    '/js/login.js',
    '/profile.html',
    '/css/profile.css',
    '/js/profile.js',
    '/dogs.html',
    '/css/dogs.css',
    '/js/dogs.js',
    '/maps.html',
    '/css/maps.css',
    '/js/maps.js',
    '/battery_status.html',
    '/css/battery_status.css',
    '/js/battery_status.js',
    '/camera.html',
    '/css/camera.css',
    '/js/camera.js',
    '/asserts/coffee.gif',
    '/css/bootstrap.css',
    '/css/bootstrap-grid.css',
    '/css/bootstrap-reboot.css',
    '/icons/pwa_icon_128x128.png',
    '/icons/pwa_icon_256x256.png',
    '/js/bootstrap.bundle.js',
    '/js/bootstrap.js',
    '/js/jquery-3.5.1.min.js',
]

const staticCacheName = 'pages-cache-v2';


self.addEventListener ('install', event => {
    // Attemps to cache the static assets
    event.waitUntil (
        caches.open (staticCacheName)
            .then (cache => {
                return cache.addAll (filesToCache);
            })
    );
});

self.addEventListener ('fetch', function (event) {
    event.respondWith (
        caches.match (event.request).then (function (response) {
            console.log (event.request.url + " " + (response ? "in cache" : "not in cache"));
            return response || fetch (event.request);
        })
    );
});

self.addEventListener ('activate', function(event) {
    event.waitUntil (
        caches.keys().then (function (filesToCache) {
            return Promise.all (
                filesToCache.filter (function (cacheName) {
                    return true;
                }).map (function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
