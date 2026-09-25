const CACHE_NAME = "colirzon-installer-v2";

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

            caches.keys()
                .then(keys => {

                    return Promise.all(

                        keys
                            .filter(key =>
                                key !== CACHE_NAME
                            )
                            .map(key =>
                                caches.delete(key)
                            )

                    );

                })

        );

        self.clients.claim();

    }
);


self.addEventListener(
    "fetch",
    event => {

        /*
            Per il jailbreak principale lasciamo
            che Safari/GitHub Pages effettui
            normalmente la richiesta.

            Il Service Worker gestisce soltanto
            le risorse dell'installer.
        */

        const request =
            event.request;

        const url =
            new URL(request.url);


        if (
            url.pathname.includes(
                "/Corilzon-Jailbreak-IOS/installer/"
            )
        ) {

            event.respondWith(

                caches.match(request)
                    .then(cached => {

                        return cached ||
                            fetch(request);

                    })

            );

        }

    }
);