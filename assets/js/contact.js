$(document).ready(function () {
  const $form = $('#contact-form');
  const $firstName = $('#first-name');
  const $lastName = $('#last-name');
  const $email = $('#email');
  const $phone = $('#phone');
  const $message = $('#message');
  const $subject = $('#subject');
  const regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regExPhone = /^[234579]\d{1}\s?\d{3}\s?\d{3}$/; // Adjust based on phone number format
  const $submitElement = $('.form__group--submit');
  let validSubmit = false;

  // Phone number input mask
  $("#phone").inputmask("99-999-999", {
    placeholder: "_",
    clearMaskOnLostFocus: true
  });

  // Validation function
  function validation() {
    validSubmit = true;
    validateField($firstName, 'Please enter a valid name');
    validateEmail($email, 'Please enter a valid email');
    validatePhone($phone, 'Please enter a valid phone number');
    validateField($message, 'Please enter a message so I can help you');
  }

  // General field validation
  function validateField($field, errorMessage) {
    if ($field.val().trim() === '') {
      $field.removeClass('valid');
      $field.addClass('invalid');
      removeSuccessIcon($field);
      addErrorIcon($field, errorMessage);
      validSubmit = false;
    } else {
      if ($field.hasClass('invalid')) {
        $field.removeClass('invalid');
        removeErrorIcon($field);
        $field.addClass('valid');
        addSuccessIcon($field);
      }
    }
  }

  // Email validation
  function validateEmail($field, errorMessage) {
    const emailValue = $field.val().trim();
    if (emailValue === '' || !regExEmail.test(emailValue)) {
      $field.removeClass('valid');
      $field.addClass('invalid');
      removeSuccessIcon($field);
      addErrorIcon($field, errorMessage);
      validSubmit = false;
    } else {
      if ($field.hasClass('invalid')) {
        $field.removeClass('invalid');
        removeErrorIcon($field);
        $field.addClass('valid');
        addSuccessIcon($field);
      }
    }
  }

  // Phone validation
  function validatePhone($field, errorMessage) {
    const phoneValue = $field.val().trim().replace(/-/g, '');
    if (phoneValue !== '' && !regExPhone.test(phoneValue)) {
      $field.removeClass('valid');
      $field.addClass('invalid');
      removeSuccessIcon($field);
      addErrorIcon($field, errorMessage);
      validSubmit = false;
    } else {
      if ($field.hasClass('invalid')) {
        $field.removeClass('invalid');
        removeErrorIcon($field);
        $field.addClass('valid');
        addSuccessIcon($field);
      }
    }
  }

  // Add error icon to field
  function addErrorIcon($input, errorMessage) {
    if ($input.siblings('.form__icon').length === 0) {
      $input.after(`
        <span class="hint--top-left hint--error form__icon" data-hint="${errorMessage}">
          <i class="icon icon--exclamation"></i>
        </span>
      `);
    } else {
      $input.siblings('.form__icon').attr('data-hint', errorMessage).show();
    }
  }

  // Remove error icon from field
  function removeErrorIcon($input) {
    $input.siblings('.form__icon').remove();
  }

  function addSuccessIcon($input) {
    if ($input.siblings('.form__icon').length === 0) {
      $input.after(`
        <span class="hint--top-left hint--success form__icon" data-hint="looks good!">
          <i class="icon icon--check"></i>
        </span>
      `);
    } else {
      $input.siblings('.form__icon').attr('data-hint', 'looks good!').show();
    }
  }

  function removeSuccessIcon($input) {
    $input.siblings('.form__icon').remove();
  }


  // Form submission
  $form.on('submit', function (e) {
    e.preventDefault();
    validation();

    if (validSubmit) {
      handleEmailSubmission();
    } else {
      highlightInvalidFields();
    }
  });

  // Handle email submission via EmailJS
  function handleEmailSubmission() {
    $submitElement.find('.cta__btn').addClass('disabled');
    $submitElement.append('<p class="form__loading">Sending<span class="dots"></span></p>');
    $submitElement.find('.form__error, .form__success').remove();

    emailjs.init("6Bp3l4e9EcjzFPEaZ");

    const templateParams = {
      from_name: `${$firstName.val()} ${$lastName.val()}`,
      from_email: $email.val(),
      phone_number: $phone.val(),
      message: $message.val(),
      subject: $subject.val()
    };

    emailjs.send('service_j49rkds', 'template_3034ad5', templateParams)
      .then(handleSuccess)
      .catch(handleError);
  }

  // Success handler
  function handleSuccess(response) {
    $submitElement.find('.form__loading').remove();
    $submitElement.append('<p class="form__success form__result"><i class="icon icon--check"></i> Your message has been sent. Thank you! We will get back to you shortly.</p>');
    setTimeout(() => {
      $submitElement.find('.form__success').addClass('show');
    }, 10);
    $submitElement.find('.cta__btn').removeClass('disabled');
    $form[0].reset();

    $('.valid').removeClass('valid');
    $('.hint--top-left').remove();
  }

  // Error handler
  function handleError(error) {
    $submitElement.find('.form__loading').remove();
    $submitElement.append('<p class="form__error form__result"><i class="icon icon--exclamation"></i> Something went wrong. Please reload the page and try again.</p>');
    setTimeout(() => {
      $submitElement.find('.form__error').addClass('show');
    }, 10);
    $submitElement.find('.cta__btn').removeClass('disabled');
    console.error('Email sending failed:', error);

    $('.valid').removeClass('valid');
    $('.hint--top-left').remove();
  }

  function highlightInvalidFields() {
    const $firstInvalid = $('.form__input.invalid').eq(0);
    const $fieldInvalids = $('.form__input.invalid');

    // Remove and reapply bounce class to trigger animation
    $firstInvalid.removeClass('bounce');

    $fieldInvalids.attr('autocomplete', 'off');

    // Use a small timeout to force reflow, then reapply the bounce class
    setTimeout(function () {
      $firstInvalid.addClass('bounce');
    }, 0);

    // Add bounce to the hint as well
    $firstInvalid.next('[class*="hint"]').addClass('bounce hint--always');
    $fieldInvalids.on('input', validation);
    // Optionally: Ensure the input field is focused (to draw user's attention)
    $firstInvalid.focus();
  }

});
