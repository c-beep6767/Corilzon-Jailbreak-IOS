const CACHE_NAME = "colirzon-installer-v1";

const FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./installer.js",
    "./manifest.json"
];


self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(FILES);
                })
        );

        self.skipWaiting();
    }
);


self.addEventListener(
    "activate",
    event => {

        event.waitUntil(
            self.clients.claim()
        );
    }
);


self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(event.request)
                .then(response => {

                    return response ||
                           fetch(event.request);
                })
        );
    }
);