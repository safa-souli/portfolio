
const CACHE_NAME = 'my-portfolio-cache-v0.0.9';

const urlsToCache = [
  // HTML pages
  '/',
  '/index.htm',
  '/contact.htm',
  '/portfolio.htm',
  '/service.htm',
  '/about.htm',

  // Local CSS Files
  '/assets/css/components/buttons.css',
  '/assets/css/components/icons.css',
  '/assets/css/components/input.css',
  '/assets/css/components/typo.css',
  '/assets/css/components/index.css',
  '/assets/css/sections/breadcrumb.css',
  '/assets/css/sections/callout.css',
  '/assets/css/sections/coming-soon.css',
  '/assets/css/sections/contact.css',
  '/assets/css/sections/counter.css',
  '/assets/css/sections/footer.css',
  '/assets/css/sections/header.css',
  '/assets/css/sections/portfolio.css',
  '/assets/css/sections/hero.css',
  '/assets/css/sections/profile.css',
  '/assets/css/sections/service.css',
  '/assets/css/sections/skill.css',
  '/assets/css/sections/offline.css',
  '/assets/css/sections/index.css',
  '/assets/css/utilities/base.css',
  '/assets/css/utilities/index.css',
  '/assets/css/style.css',

  // External CSS Files
  '/assets/plugins/@fancyapps/ui/dist/fancybox/fancybox.css',
  '/assets/plugins/hint.css/hint.min.css',

  // Local Font Files
  '/assets/font/Sora/Sora-Bold.woff2',
  '/assets/font/Sora/Sora-BoldItalic.woff2',
  '/assets/font/Sora/Sora-ExtraBold.woff2',
  '/assets/font/Sora/Sora-ExtraBoldItalic.woff2',
  '/assets/font/Sora/Sora-ExtraLight.woff2',
  '/assets/font/Sora/Sora-ExtraLightItalic.woff2',
  '/assets/font/Sora/Sora-Italic.woff2',
  '/assets/font/Sora/Sora-Light.woff2',
  '/assets/font/Sora/Sora-LightItalic.woff2',
  '/assets/font/Sora/Sora-Medium.woff2',
  '/assets/font/Sora/Sora-MediumItalic.woff2',
  '/assets/font/Sora/Sora-Regular.woff2',
  '/assets/font/Sora/Sora-SemiBold.woff2',
  '/assets/font/Sora/Sora-SemiBoldItalic.woff2',
  '/assets/font/Sora/Sora-Thin.woff2',
  '/assets/font/Sora/Sora-ThinItalic.woff2',
  '/assets/font/Sora/stylesheet.css',

  // Local JavaScript Files
  '/assets/js/app.js',
  '/assets/js/portfolio.js',
  '/assets/js/contact.js',
  '/assets/js/animation.js',

  // External JavaScript Files
  '/assets/plugins/jquery/dist/jquery.min.js',
  '/assets/plugins/gsap/dist/gsap.min.js',
  '/assets/plugins/gsap/dist/ScrollTrigger.min.js',
  '/assets/plugins/mixitup/dist/mixitup.min.js',
  '/assets/plugins/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
  '/assets/plugins/@emailjs/browser/dist/email.min.js',
  '/assets/plugins/inputmask/dist/inputmask.min.js',

  // Data files
  '/assets/data/behance-projects.json',

  // Images files
  '/assets/img/logo.svg',
  '/assets/img/breadcrumb.jpg',
  '/assets/img/coming-soon.jpg',
  '/assets/img/coming-soon-thumbnail.jpg',
  '/assets/img/coming-soon-thumbnail-202.jpg',
  '/assets/img/coming-soon-thumbnail-404.jpg',
  '/assets/img/coming-soon-thumbnail-808.jpg',

  // Icon Files
  '/assets/icons/ai.svg',
  '/assets/icons/angle-down.svg',
  '/assets/icons/angle-up.svg',
  '/assets/icons/arrow-next-small.svg',
  '/assets/icons/arrow-next.svg',
  '/assets/icons/arrow-up-right-from-square.svg',
  '/assets/icons/book.svg',
  '/assets/icons/bootstrap.svg',
  '/assets/icons/briefcase.svg',
  '/assets/icons/bullseye-pointer.svg',
  '/assets/icons/check.svg',
  '/assets/icons/close.svg',
  '/assets/icons/comments.svg',
  '/assets/icons/computer-brush.svg',
  '/assets/icons/computer-code.svg',
  '/assets/icons/computer-gear.svg',
  '/assets/icons/computer-user.svg',
  '/assets/icons/css3.svg',
  '/assets/icons/display-chart-up.svg',
  '/assets/icons/download-file.svg',
  '/assets/icons/envelope.svg',
  '/assets/icons/exclamation.svg',
  '/assets/icons/eye.svg',
  '/assets/icons/figma.svg',
  '/assets/icons/framer.svg',
  '/assets/icons/git.svg',
  '/assets/icons/github.svg',
  '/assets/icons/graduation-cap.svg',
  '/assets/icons/home.svg',
  '/assets/icons/html5.svg',
  '/assets/icons/id-card-clip.svg',
  '/assets/icons/insight.svg',
  '/assets/icons/jquery.svg',
  '/assets/icons/js.svg',
  '/assets/icons/like.svg',
  '/assets/icons/mail.svg',
  '/assets/icons/map.svg',
  '/assets/icons/message.svg',
  '/assets/icons/off-btn.svg',
  '/assets/icons/phone.svg',
  '/assets/icons/php.svg',
  '/assets/icons/sass.svg',
  '/assets/icons/sql.svg',
  '/assets/icons/symfony.svg',
  '/assets/icons/tools.svg',
  '/assets/icons/ui-design.svg',
  '/assets/icons/user.svg',
  '/assets/icons/ux-design.svg',
  '/assets/icons/webpage-layout.svg',
  '/assets/icons/wifi-slash.svg',

  // Favicon files
  '/assets/favicon/android-chrome-192x192.png',
  '/assets/favicon/android-chrome-512x512.png',
  '/assets/favicon/apple-touch-icon.png',
  '/assets/favicon/favicon-16x16.png',
  '/assets/favicon/favicon-32x32.png',
  '/assets/favicon/favicon.ico',
  '/assets/favicon/site.webmanifest',

  // PDF files
  '/assets/pdf/resume.pdf',
];

// Install event: Cache the resources
self.addEventListener('install', event => {
  console.debug('Service Worker installing.');

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache)
        .then(() => {
          console.debug('All static assets are cached');
          // After caching the static files, fetch the JSON and cache images
          return cacheImagesFromJson('/assets/data/behance-projects.json');
        })
        .catch(error => {
          console.error('Error while caching assets', error);
        });
    })
  );
});

// Activate event: Clean up old caches if necessary
self.addEventListener('activate', event => {
  console.debug('Service Worker activating.');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.debug('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event: Handle normal fetch and cache urlsToCache resources if not already cached
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    console.debug(event.request.url);

    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          console.debug('Serving from cache:', event.request.url);
          return response; // Serve from cache if available
        }

        console.debug('Fetching from network:', event.request.url);
        return fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            // Cache the requested URL if the response is successful
            if (networkResponse.status === 200) {
              console.debug('Caching new resource:', event.request.url);
              cache.put(event.request, networkResponse.clone());
            }

            // Check if offline.htm is already cached before fetching
            return caches.match('/offline.htm').then(cachedOfflinePage => {
              if (!cachedOfflinePage) {
                // Fetch and cache offline.htm only if it's not already cached
                return fetch('/offline.htm').then(offlineResponse => {
                  if (offlineResponse.status === 200) {
                    console.debug('Caching offline.htm for the first time');
                    cache.put('/offline.htm', offlineResponse.clone());
                  }
                }).catch(error => {
                  console.error('Failed to fetch offline.htm:', error);
                });
              } else {
                console.debug('offline.htm is already cached');
              }
            }).then(() => {
              return networkResponse; // Return the network response
            });
          });
        });

      }).catch(() => {
        console.debug('Offline, serving fallback page for:', event.request.url);
        return caches.match('/offline.htm'); // Serve offline.htm as the fallback
      })
    );
  }
});

/**
 * Fetch the JSON file, extract image URLs, and cache the images.
 */
function cacheImagesFromJson(jsonUrl) {
  return fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      const imageUrls = [];

      // Loop through each project and collect the image URLs
      data.projects.forEach(project => {
        for (const key in project.covers) {
          if (project.covers.hasOwnProperty(key)) {
            imageUrls.push(project.covers[key]);
          }
        }
      });

      // Cache all the image URLs
      return caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(imageUrls).then(() => {
          console.debug('All images from JSON are cached');
        });
      });
    })
    .catch(error => {
      console.error('Error fetching JSON or caching images:', error);
    });
}