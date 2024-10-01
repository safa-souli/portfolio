$(document).ready(function () {
  const $window = $(window);
  const $document = $(document);
  const $progressBar = $('#progress-bar');
  const $scrollToTopBtn = $('.scroll-to-top');
  const $maskedCircle = $('.masked-circle');
  const $header = $('.header');

  const isInTheViewport = ($element) => {
    const elementTop = $element.offset().top;
    const elementBottom = elementTop + $element.outerHeight();

    const viewportTop = $window.scrollTop();
    const viewportBottom = viewportTop + $window.height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

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

  const scrollToTop = () => {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  };

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

  const pageTransition = () => {
    return gsap.to($maskedCircle, {
      duration: 1,
      maskImage: 'radial-gradient(circle at 50% 20%, transparent 0%, var(--ss-body-bg) 0%)',
      ease: 'power1.in',
      onStart: () => gsap.set($maskedCircle, { zIndex: 1 }),
    });
  };

  const handleLinkClick = (event) => {
    event.preventDefault();
    const targetUrl = $(event.currentTarget).attr('href');

    pageTransition().then(() => {
      window.location.href = targetUrl;
    });
  };

  const registerEventListeners = () => {
    $window.on('scroll', updateProgressBar);
    $scrollToTopBtn.on('click', scrollToTop);
    $('a.animate-page').on('click', handleLinkClick);
  };

  const init = () => {
    updateProgressBar();
    contentAnimation();
    registerEventListeners();
  };

  init();
});
