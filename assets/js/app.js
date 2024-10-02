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
   * If the user is far enough down the page, also shows the "Scroll to top" button.
   * Additionally, adds or removes the "in-viewport" class from the header based on whether it is in the viewport or not.
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
      maskImage: 'radial-gradient(circle at 50% 20%, transparent 100%, var(--ss-body-bg) 2.1%)',
      ease: 'power1.out',
      onComplete: () => {
        gsap.delayedCall(0.1, () => {
          gsap.set($maskedCircle, { zIndex: -999 });
        });
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
      maskImage: 'radial-gradient(circle at 50% 20%, transparent 0%, var(--ss-body-bg) 0%)',
      ease: 'power1.in',
      onStart: () => gsap.set($maskedCircle, { zIndex: 999 }),
    });
  };

  /**
   * Handles clicks on links in the page by preventing the default behavior and
   * starting a page transition. Once the transition completes, the page will be
   * redirected to the link's target URL.
   * @param {Event} event The event object.
   */
  const handleLinkClick = (event) => {
    event.preventDefault();
    const targetUrl = $(event.currentTarget).attr('href');

    pageTransition().then(() => {
      window.location.href = targetUrl;
    });
  };


  /**
   * Registers event listeners for the page.
   * @private
   */
  const registerEventListeners = () => {
    $window.on('scroll', updateProgressBar);
    $scrollToTopBtn.on('click', scrollToTop);
    $('a.animate-page').on('click', handleLinkClick);
  };

  /**
   * Initializes the page by calling the content animation, updating the progress bar and
   * registering event listeners.
   */
  const init = () => {
    updateProgressBar();
    contentAnimation();
    registerEventListeners();
  };

  init();
});
