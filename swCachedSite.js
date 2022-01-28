const cacheNamee = 'v2'


// call install event
self.addEventListener('install', (e)=> {
    console.log("service worker installed")
  
})

// call activate event
self.addEventListener('activate', (e)=> {
    console.log("service worker activated")

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache != cacheNamee){
                        console.log('service worker: clearing old cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

// call fetch event

self.addEventListener("fetch", (e)=> {
    console.log('service worker: fetching')

    e.respondWith(
        fetch(e.request)
        .then(res=> {
            // make clone of response
            const resClone = res.clone()

            caches.open(cacheNamee)
            .then(cache => {
                cache.put(e.request, resClone)
            })
            return res;
        }).catch(err=> {
            caches.match(e.request)
            .then(res=> {
                return res
            })
        })
    )
})