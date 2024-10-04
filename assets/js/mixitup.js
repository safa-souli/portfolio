$(document).ready(function () {

  const mixer = mixitup('#behance-projects', {
    selectors: {
      target: '.portfolio__item'
    },
    animation: {
      duration: 300
    }
  });


  $('.portfolio__filter-btn').on('click', function () {
    $('.portfolio__filter-btn').removeClass('active');
    $(this).addClass('active');
  });
});