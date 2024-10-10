
const CACHE_NAME = 'my-portfolio-cache-v0.0.1'; //first cache

const urlsToCache = [
  // HTML pages
  '/index.htm',
  '/contact.htm',
  '/portfolio.htm',
  '/service.htm',
  '/about.htm',
  '/offline.htm',

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
  '/assets/css/sections/index.css',
  '/assets/css/utilities/base.css',
  '/assets/css/utilities/index.css',
  '/assets/css/style.css',

  // Local Font Files
  '/assets/font/Sora/Sora-Bold.woff2',
  '/assets/font/Sora/Sora-ExtraBold.woff2',
  '/assets/font/Sora/Sora-ExtraLight.woff2',
  '/assets/font/Sora/Sora-Light.woff2',
  '/assets/font/Sora/Sora-Medium.woff2',
  '/assets/font/Sora/Sora-Regular.woff2',
  '/assets/font/Sora/Sora-SemiBold.woff2',
  '/assets/font/Sora/stylesheet.css',

  // External CSS
  'https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/hint.css/2.6.0/hint.min.css',

  // Local JavaScript Files
  '/assets/js/app.js',
  '/assets/js/portfolio.js',
  '/assets/js/contact.js',
  '/assets/js/animation.js',

  // Data files
  '/assets/data/behance-projects.json',

  // External JavaScript
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/mixitup/3.3.1/mixitup.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.umd.js',
  'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.9/jquery.inputmask.min.js',

  // Images files
  '/assets/img/logo.svg',
  '/assets/img/breadcrumb.png',
  '/assets/img/coming-soon.png',
  '/assets/img/coming-soon-thumbnail.png',
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
  '/assets/icons/phone.svg',
  '/assets/icons/php.svg',
  '/assets/icons/sass.svg',
  '/assets/icons/sql.svg',
  '/assets/icons/symfony.svg',
  '/assets/icons/tools.svg',
  '/assets/icons/ui-design.svg',
  '/assets/icons/user.svg',
  '/assets/icons/webpage-layout.svg',

  // Favicon files
  '/assets/favicon/apple-touch-icon.png',
  '/assets/favicon/favicon-32x32.png',
  '/assets/favicon/favicon-16x16.png',
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

// Fetch event: Serve from cache if available, fallback to network
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            if (networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      }).catch(() => caches.match('/offline.htm'))
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
