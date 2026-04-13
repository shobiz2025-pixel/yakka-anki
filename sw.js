const CACHE_NAME = 'yakka-v3';
const APP_SHELL = [
  './',
  './index.html',
  './dashboard.html',
  './export.html',
  './strategy.html',
  './data.js',
  './js/store.js',
  './js/app.js',
  './js/dashboard.js',
  './js/version_config.js',
  './js/qa_parser.js',
  './js/word_export.js',
  './js/strategy_data.js',
  './js/strategy.js',
  './js/qa_text_01.js',
  './js/qa_text_02.js',
  './js/qa_text_03.js',
  './js/qa_text_04.js',
  './js/qa_text_05.js',
  './js/qa_text_06.js',
  './js/qa_text_07.js',
  './js/qa_text_index.js',
  './css/style.css',
  './css/dashboard.css',
  './css/strategy.css',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

const SLIDE_CACHE = 'yakka-slides-v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME && k !== SLIDE_CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Slides: cache-first, runtime caching
  if (url.pathname.includes('/slides/')) {
    e.respondWith(
      caches.open(SLIDE_CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          if (cached) return cached;
          return fetch(e.request).then(resp => {
            if (resp.ok) cache.put(e.request, resp.clone());
            return resp;
          });
        })
      )
    );
    return;
  }

  // App shell: cache-first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
