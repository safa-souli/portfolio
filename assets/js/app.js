$(document).ready(function () {
  const $window = $(window);
  const $document = $(document);
  const $progressBar = $('#progress-bar');
  const $scrollToTopBtn = $('.scroll-to-top');
  const $maskedCircle = $('.masked-circle');
  const $header = $('.header');

  /**
   * Returns true if the given element is in the viewport, false otherwise.
   * @param {jQuery} $element - The element to check.
   * @returns {boolean} True if the element is in the viewport, false otherwise.
   */
  const isInTheViewport = ($element) => {
    const elementTop = $element.offset().top;
    const elementBottom = elementTop + $element.outerHeight();

    const viewportTop = $window.scrollTop();
    const viewportBottom = viewportTop + $window.height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  /**
   * Updates the progress bar based on the current scroll position.
   */
  const updateProgressBar = () => {
    const scrollTop = $window.scrollTop();
    const scrollHeight = $document.height() - $window.height();
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    $progressBar.css('width', `${scrollPercentage}%`);

    const fadeInThreshold = $window.height();

    scrollTop > fadeInThreshold ? $scrollToTopBtn.fadeIn() : $scrollToTopBtn.fadeOut();

    if (isInTheViewport($header)) {
      $header.addClass('in-viewport');
    } else {
      $header.removeClass('in-viewport');
    }
  };

  /**
   * Scrolls the page to the top with an animation.
   */
  const scrollToTop = () => {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  };

  /**
   * Animates the masked circle to reveal the content.
   * @returns {GSAP} The animation object.
   */
  const contentAnimation = () => {
    gsap.to($maskedCircle, {
      duration: 1,
      maskImage: 'radial-gradient(circle at center center, transparent 100%, var(--ss-body-bg) 0%)',
      ease: 'power1.out',
      onComplete: () => {
        gsap.delayedCall(0, () => {
          gsap.set($maskedCircle, { zIndex: -999 });
        });
        $maskedCircle.removeClass('loading');
      },
    });
  };

  /**
   * Animates the masked circle to cover the content, effectively creating a page transition.
   * @returns {GSAP} The animation object.
   */
  const pageTransition = () => {
    return gsap.to($maskedCircle, {
      duration: 1,
      maskImage: 'radial-gradient(circle at center center, transparent 0%, var(--ss-body-bg) 0%)',
      ease: 'power1.in',
      onStart: () => gsap.set($maskedCircle, { zIndex: 999 }),
    });
  };

  /**
   * Handles clicks on links in the page by preventing the default behavior,
   * showing the masked circle as a loading screen, starting a page transition, 
   * and navigating to the next page.
   * @param {Event} event - The event object.
   */
  const handleLinkClick = (event) => {
    event.preventDefault();
    const targetUrl = $(event.currentTarget).attr('href');

    // Show the masked circle loading screen
    gsap.set($maskedCircle, { display: 'block', zIndex: 1000, opacity: 1 });

    // Start the page transition
    pageTransition().then(() => {
      // After the transition, navigate to the next page
      window.location.href = targetUrl;
    });
  };

  /**
   * Registers event listeners for the page.
   */
  const registerEventListeners = () => {
    $window.on('scroll', updateProgressBar);
    $scrollToTopBtn.on('click', scrollToTop);
    $('a.animate-page').on('click', handleLinkClick);
  };

  /**
   * Initializes the page by calling the content animation, updating the progress bar, and
   * registering event listeners. Hides the masked circle after the page is fully loaded.
   */const init = () => {
    updateProgressBar();
    registerEventListeners();
    $maskedCircle.addClass('loading');

    // Ensure DOM readiness before executing any DOM-related operations
    $(document).ready(() => {
      console.log('DOM is ready');
    });

    // Check if the page is already fully loaded (handles fast page load)
    if (document.readyState === 'complete') {
      // Trigger contentAnimation immediately if page is already loaded
      contentAnimation();
      console.log('Page already fully loaded');
      $maskedCircle.removeClass('loading');
    } else {
      // Wait for the page to fully load (normal scenario)
      $(window).on('load', () => {
        contentAnimation();
        console.log('Page fully loaded');
        $maskedCircle.removeClass('loading');
      });

      // Fallback in case the load event is missed due to fast loading
      setTimeout(() => {
        if (document.readyState === 'complete') {
          contentAnimation();
          console.log('Fallback: Page load detected after timeout');
          $maskedCircle.removeClass('loading');
        }
      }, 500); // Adjust this timeout duration if necessary
    }
  };

  // Initialize the page
  init();
});