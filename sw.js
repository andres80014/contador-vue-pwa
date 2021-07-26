const CACHE_NAME = "v1_cache_contador_app_vue"
const URLS_TO_CACHE =[
    "./",
    "./img/13.png",
    "./img/32.png",
    "./img/64.png",
    "./img/256.png",
    "./img/512.png",
    "./img/1024.png",
    "./js/mounthApp.js",
    "./js/main.js",
    "./css/styles.css",
    "https://unpkg.com/vue@next",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css"

]

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(URLS_TO_CACHE).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
})


self.addEventListener("activate", e => {
    const cacheWhiteList = [CACHE_NAME]
    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhiteList.indexOf(cacheName)===-1){
                                return caches.delete(cacheName)
                            }

                        } 
                    )
                )
            }
        ).then(
            ()=>self.clients.claim()
        )
    )
})

self.addEventListener("fetch",e=>{
    e.respondWith(
        caches.match(e.request).then(
            res=>{
                if(res){
                    return res
                }
                return fetch(e.request)
            }
          
        )
    )
})