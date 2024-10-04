$(document).ready(function () {
  const $form = $('#contact-form');
  const $firstName = $('#first-name');
  const $lastName = $('#last-name');
  const $email = $('#email');
  const $phone = $('#phone');
  const $message = $('#message');
  const $subject = $('#subject');
  const regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simpler regex for email validation
  const regExPhone = /^[234579]\d{1}\s?\d{3}\s?\d{3}$/;
  const $submitElement = $('.form__group--submit');
  let validSubmit = false; // Use `let` for reassignable variables

  // Perform form validation
  function validation() {
    validSubmit = true;

    validateField($firstName, 'Please enter a valid name');
    validateEmail($email);
    validateField($message, 'Please enter a message so I can help you');
  }

  // General field validation function
  function validateField($field, errorMessage) {
    if ($field.val().trim() === '') {
      $field.addClass('invalid');
      addErrorIcon($field, errorMessage);
      validSubmit = false;
    } else {
      $field.removeClass('invalid');
      removeErrorIcon($field);
    }
  }

  // Email validation function
  function validateEmail($email) {
    const emailVal = $email.val().trim();
    if (emailVal === '') {
      $email.addClass('invalid');
      addErrorIcon($email, 'Please enter a valid email');
      validSubmit = false;
    } else if (!regExEmail.test(emailVal)) {
      $email.addClass('invalid');
      addErrorIcon($email, 'Please enter a valid email format');
      validSubmit = false;
    } else {
      $email.removeClass('invalid');
      removeErrorIcon($email);
    }
  }

  // Add an error icon with a message
  function addErrorIcon($input, errorMessage) {
    if ($input.siblings('.form__icon').length === 0) {
      $input.after(`
        <span class="hint--top-left form__icon" data-hint="${errorMessage}">
          <i class="icon icon--exclamation"></i>
        </span>
      `);
    } else {
      $input.siblings('.form__icon').attr('data-hint', errorMessage).show();
    }
  }

  // Remove error icon
  function removeErrorIcon($input) {
    $input.siblings('.form__icon').remove();
  }

  // Handle form submission
  $form.on('submit', function (e) {
    e.preventDefault();
    $('.bounce').removeClass('bounce');
    validation();

    if (validSubmit) {
      handleEmailSubmission();
    } else {
      highlightInvalidFields();
    }
  });

  // Handle email submission with EmailJS
  function handleEmailSubmission() {
    $submitElement.find('.cta__btn').addClass('disabled');
    $submitElement.append('<p class="form__loading"> Sending...</p>');
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

  // Handle successful email submission
  function handleSuccess(response) {
    $submitElement.find('.form__loading').remove();
    $submitElement.append('<p class="form__success form__result"><i class="icon icon--check"></i> Your message has been sent. Thank you! We will get back to you shortly.</p>');
    setTimeout(() => {
      $submitElement.find('.form__success').addClass('show');
    }, 10);
    $submitElement.find('.cta__btn').removeClass('disabled');
    $form[0].reset();
  }

  // Handle email submission error
  function handleError(error) {
    $submitElement.find('.form__loading').remove();
    $submitElement.append('<p class="form__error form__result"><i class="icon icon--exclamation"></i> Something went wrong. Please reload the page and try again.</p>');

    setTimeout(() => {
      $submitElement.find('.form__error').addClass('show');
    }, 10);

    $submitElement.find('.cta__btn').removeClass('disabled');
    console.error('Email sending failed:', error);
  }


  // Highlight invalid fields
  function highlightInvalidFields() {
    const $firstInvalid = $('.form__input.invalid').eq(0);
    $firstInvalid.addClass('bounce');
    $firstInvalid.next('[class*="hint"]').addClass('bounce');
    $firstInvalid.on('input', validation);
  }
});
