$(document).ready(() => {
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
  const validation = () => {
    validSubmit = true;
    validateField($firstName, 'Please enter a valid name');
    validateEmail($email, 'Please enter a valid email');
    validatePhone($phone, 'Please enter a valid phone number');
    validateField($message, 'Please enter a message so I can help you');
  };

  // General field validation
  const validateField = ($field, errorMessage) => {
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
  };

  // Email validation
  const validateEmail = ($field, errorMessage) => {
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
  };

  // Phone validation
  const validatePhone = ($field, errorMessage) => {
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
  };

  // Add error icon to field
  const addErrorIcon = ($input, errorMessage) => {
    console.log("error icon length", $input.siblings('.form__icon').length);
    if ($input.siblings('.form__icon').length === 0) {
      const errorIcon = $(`
      <span class="hint--top-left hint--error form__icon" data-hint="${errorMessage}">
        <i class="icon icon--exclamation"></i>
      </span>
    `);
      $input.after(errorIcon);
      setTimeout(() => {
        errorIcon.addClass('show');
      }, 100);
    } else {
      $input.siblings('.form__icon').attr('data-hint', errorMessage).show();
    }
  };

  // Remove error icon from field
  const removeErrorIcon = ($input) => {
    $input.siblings('.form__icon.hint--error').remove();
  };

  const addSuccessIcon = ($input) => {
    console.log("error icon length", $input.siblings('.form__icon').length);
    if ($input.siblings('.form__icon').length === 0) {
      const successIcon = $(`
        <span class="hint--top-left hint--success form__icon" data-hint="looks good!">
          <i class="icon icon--check"></i>
        </span>
      `);
      $input.after(successIcon);
      setTimeout(() => {
        successIcon.addClass('show');
      }, 100);
    } else {
      $input.siblings('.form__icon').attr('data-hint', 'looks good!').show();
    }
  };

  const removeSuccessIcon = ($input) => {
    $input.siblings('.form__icon.hint--success').remove();
  };

  // Form submission
  $form.on('submit', (e) => {
    e.preventDefault();
    validation();

    if (validSubmit) {
      handleEmailSubmission();
    } else {
      highlightInvalidFields();
    }
  });

  // Handle email submission via EmailJS
  const handleEmailSubmission = () => {
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
  };

  // Success handler
  const handleSuccess = (response) => {
    $submitElement.find('.form__loading').remove();
    $submitElement.append('<p class="form__success form__result"><i class="icon icon--check"></i> Your message has been sent. Thank you! We will get back to you shortly.</p>');
    setTimeout(() => {
      $submitElement.find('.form__success').addClass('show');
    }, 10);
    $submitElement.find('.cta__btn').removeClass('disabled');
    $form[0].reset();

    $('.valid').removeClass('valid');
    $('.hint--top-left').remove();
  };

  // Error handler
  const handleError = (error) => {
    $submitElement.find('.form__loading').remove();
    $submitElement.append('<p class="form__error form__result"><i class="icon icon--exclamation"></i> Something went wrong. Please reload the page and try again.</p>');
    setTimeout(() => {
      $submitElement.find('.form__error').addClass('show');
    }, 10);
    $submitElement.find('.cta__btn').removeClass('disabled');
    console.error('Email sending failed:', error);

    $('.valid').removeClass('valid');
    $('.hint--top-left').remove();
  };

  const highlightInvalidFields = () => {
    const $firstInvalid = $('.form__input.invalid').eq(0);
    const $fieldInvalids = $('.form__input.invalid');

    $firstInvalid.removeClass('bounce');
    $fieldInvalids.attr('autocomplete', 'off');

    setTimeout(function () {
      $firstInvalid.addClass('bounce');
    }, 0);

    $firstInvalid.next('[class*="hint"]').addClass('bounce hint--always');
    $fieldInvalids.on('input', function () {
      $(this).next('[class*="hint"]').removeClass('hint--always');
      validation();
    });
    $fieldInvalids.on('blur', function () {
      $(this).next('[class*="hint"]').removeClass('hint--always');
    });

    // Set cursor to the first invalid field and move it to the end
    var input = $firstInvalid;
    input.focus();
    var value = input.val();
    input[0].setSelectionRange(value.length, value.length);  
  };
});