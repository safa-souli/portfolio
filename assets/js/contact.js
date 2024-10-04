$(document).ready(function () {
  const $form = $('#contact-form');
  const $firstName = $('#first-name');
  const $lastName = $('#last-name');
  const $email = $('#email');
  const $phone = $('#phone');
  const $message = $('#message');
  const $subject = $('#subject');
  const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regExPhone = /^[234579]\d{1}\s?\d{3}\s?\d{3}$/;
  var $submitElement = $('.form__group--submit');
  var validSubmit;

  function validation() {
    validSubmit = true;

    // First Name validation
    if ($firstName.val().trim() === '') {
      $firstName.addClass('invalid');
      addErrorIcon($firstName, 'Please enter valid name');
      validSubmit = false;
    } else {
      $firstName.removeClass('invalid');
      removeErrorIcon($firstName);
    }

    // Email validation
    if ($email.val().trim() === '') {
      $email.addClass('invalid');
      addErrorIcon($email, 'Please enter valid email');
      validSubmit = false;
    } else if (!regExEmail.test($email.val().trim())) {
      $email.addClass('invalid');
      addErrorIcon($email, 'Please enter valid email format');
      validSubmit = false;
    } else {
      $email.removeClass('invalid');
      removeErrorIcon($email);
    }

    if ($message.val().trim() === '') {
      $message.addClass('invalid');
      addErrorIcon($message, 'Please enter a message so i can help you');
      validSubmit = false;
    } else {
      $message.removeClass('invalid');
      removeErrorIcon($message);
    }
  }

  function addErrorIcon($input, errorMessage) {
    let $errorIcon = $input.siblings('.form__icon');

    // If the error icon doesn't exist, add it
    if ($errorIcon.length === 0) {
      $input.after(`
        <span class="hint--top-left form__icon" data-hint="${errorMessage}">
          <i class="icon icon--exclamation"></i>
        </span>`);
    } else {
      // If the icon exists, update the error message
      $errorIcon.attr('data-hint', errorMessage).show();
    }
  }

  function removeErrorIcon($input) {
    $input.siblings('.form__icon').remove();
  }

  $form.on('submit', function (e) {
    e.preventDefault();
    $('.bounce').removeClass('bounce');
    validation();

    if (validSubmit) {
      // Send email
      $submitElement.find('.cta__btn').addClass('disabled');
      $submitElement.append('<p class="form__loading"> Sending...</p>');
      $submitElement.find('.form__error, .form__success').remove();
      emailjs.init("6Bp3l4e9EcjzFPEaZ");
      const templateParams = {
        from_name: $firstName.val() + ' ' + $lastName.val(),
        from_email: $email.val(),
        phone_number: $phone.val(),
        message: $message.val(),
        subject: $subject.val()
      };

      emailjs.send('service_j49rkds', 'template_3034ad5', templateParams)
        .then(function (response) {
          $submitElement.find('.form__loading').remove();
          $submitElement.append('<p class="form__success"><i class="icon icon--check"></i> Your message has been sent. Thank you! We will get back to you shortly.</p>');
          $submitElement.find('.cta__btn').removeClass('disabled');
        }, function (error) {
          // console.log('FAILED...', error);
          $submitElement.find('.form__loading').remove();
          $submitElement.append('<p class="form__error"><i class="icon icon--exclamation"></i> Something went wrong. Please reload the page and try again.</p>');
          $submitElement.find('.cta__btn').removeClass('disabled');
        });
    } else {
      $('.form__input.invalid').eq(0).addClass('bounce');
      $('.form__input.invalid').eq(0).next('[class*="hint"]').addClass('bounce');
      $('.form__input.invalid').on('input', function () {
        validation();
      });
    }
  });
});
