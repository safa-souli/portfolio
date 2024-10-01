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

  $('.scroll-to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });

  $(window).on('scroll', updateProgressBar);
});
