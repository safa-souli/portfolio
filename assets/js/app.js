$(document).ready(function () {

  /**
   * Updates the progress bar based on the user's scroll position.
   * Additionally, shows or hides the "Scroll to top" button based on whether the user has scrolled more than 100 pixels from the top of the page.
   */
  function updateProgressBar() {
    var scrollTop = $(window).scrollTop();
    var scrollHeight = $(document).height() - $(window).height();
    var scrollPercentage = (scrollTop / scrollHeight) * 100;
    $('#progress-bar').css('width', scrollPercentage + '%');

    if (scrollTop > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  }

  function pageTransition() {
    return gsap.to("#content", {
      duration: 0.8,
      scale: 0.8,
      rotateX: 180,
      opacity: 0,
      x: "100vw",
      filter: "blur(30px)",
      backgroundColor: "#ff7f50",
      ease: "power2.inOut"
    });
  }

  function contentAnimation() {
    gsap.from("#content", {
      duration: 1.2,
      scale: 1.2,
      rotateX: -180,
      opacity: 0,
      x: "-100vw",
      filter: "blur(30px)",
      backgroundColor: "#fff",
      ease: "power2.out",
      delay: 0.5
    });
  }

  $('.nav-link').on('click', function (event) {
    event.preventDefault();
    const targetUrl = $(this).attr('href');
    pageTransition().then(() => {
      window.location.href = targetUrl;
    });
  });

  $('.scroll-to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });

  $(window).on('scroll', updateProgressBar);

  contentAnimation();
});
