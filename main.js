//  make sure service are supported

if("serviceWorker" in navigator){
    window.addEventListener('load', ()=> {
        navigator.serviceWorker
        .register('./swCachedSite.js')
        .then(reg => console.log('service worker: registered'))
        .catch(err=> console.log(`Service worker error ${err}`))
    })
}