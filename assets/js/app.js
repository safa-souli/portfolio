$(document).ready(function () {
  const $window = $(window);
  const $document = $(document);
  const $progressBar = $('#progress-bar');
  const $scrollToTopBtn = $('.scroll-to-top');
  const $maskedCircle = $('.masked-circle');
  const $header = $('.header');

  // Function to inject custom styles into the iframe once it's fully loaded
  function injectStylesInIframe(iframe) {
    try {
      var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      // Function to extract all computed styles from the root and apply them as CSS variables in the iframe
      function getRootComputedStyles() {
        // Ensure we're targeting the root element (document.documentElement or :root)
        var rootElement = document.documentElement;
        var rootComputedStyles = window.getComputedStyle(rootElement); // Get computed styles from <html>
        var cssVariables = '';

        // Iterate over all computed styles and look for CSS variables (properties starting with "--")
        for (var i = 0; i < rootComputedStyles.length; i++) {
          var propertyName = rootComputedStyles[i];
          var propertyValue = rootComputedStyles.getPropertyValue(propertyName);

          // Only include CSS variables (those that start with "--")
          if (propertyName.startsWith('--')) {
            cssVariables += `${propertyName}: ${propertyValue.trim()};\n`; // Trimming the value to avoid extra spaces
          }
        }

        return cssVariables; // Return all root variables as a string
      }


      // Call the function to get CSS variables from root
      var rootStyles = `
            :root {
                ${getRootComputedStyles()}
            }
        `;

      // Define your custom styles that use the root variables
      var customStyles = `

        body.font-lato {
          color: var(--ss-body-color);
          font-family: var(--ss-body-font-family) !important;
          font-size: var(--ss-step-0) !important;
          font-weight: var(--ss-body-font-weight) !important;
          line-height: var(--ss-body-line-height) !important;       
        }

        .tawk-chat-view .tawk-chat-panel {
          background-color: var(--ss-body-bg) !important;
        }

        .tawk-avatar .tawk-avatar-image > img {
          height: 100%;
          width: 100%;
        }

        .tawk-avatar-small {
          height: 40px;
          width: 40px;
          border-radius: 100vmax;
        }

        .tawk-agent-chat-bubble {
          background: var(--ss-card-bg) !important;
        }

        .tawk-visitor-chat-bubble {
          background: var(--ss-accent-color) !important;
        }

        .tawk-max-container {
          border: hidden;
        }

        .tawk-card div:first-child {
          padding: 0 !important;
        }

        .tawk-icon.tawk-icon-thumbs-up.tawk-chatinput-rating {
          line-height: 1;
        }

        div.tawk-flex-column:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > button:nth-child(2) > span:nth-child(2) {
          display: none;
        }

        .tawk-card .tawk-flex.tawk-flex-center.tawk-text-center.tawk-padding-small {
          display: none !important;
        }

        input, textarea {
          font: inherit !important;
          font-size: var(--ss-step-0) !important;
          line-height: 1 !important;
          color: var(--ss-body-color);
        }

        .tawk-chatinput-editor {
          background: transparent;
        }

        .tawk-card-inverse {
          background-color: var(--ss-card-bg);
        }

        .tawk-toolbar-agent-name.tawk-text-truncate {
          font-weight: 600;
          line-height: 1;
          margin-bottom: 8px;
        }

        .tawk-toolbar-agent-avatars .tawk-avatar {
          height: 40px;
          width: 40px;
        }

        .tawk-avatar {
          border-radius: 100vmax;
          border-color: var(--ss-body-bg);
          border-radius: 100vmax;
          border-width: 1px;
        }

        .tawk-text-truncate {
          line-height: 1;
        }


        .tawk-min-container .tawk-button-circle.tawk-button-large {
          width: 56px;
          height: 56px;
        }

        svg.tawk-min-chat-icon[alt="Close icon"] {
          height: 18px;
        }

        .tawk-footer {          
          border-color: #ffffff2b;
        }

        .tawk-agent-name.tawk-text-truncate {
          font-weight: 600;
        }

        .ps__rail-y .ps__thumb-y {
          width: 3px !important;
          background: var(--ss-accent-color) !important;
        }

        .tawk-card-primary {
          background: var(--ss-accent-gradient);
        }

        .tawk-message-preview-content .tawk-message {
          background: var(--ss-accent-gradient);
        }

        .tawk-text-grey-2 {
          color: var(--ss-body-bg) !important;
          opacity: 0.7;
        }

        .tawk-has-avatar::after, .tawk-has-avatar::before {
          content: "";
          right: 100%;
          bottom: 10px;
          pointer-events: none;
          height: 0;
          width: 0;
          border-color: transparent;
        }

        .tawk-has-avatar::after {
          border-right-color: var(--ss-accent-color);
        }

        .tawk-has-avatar::before {
          border-right-color: var(--ss-accent-color);
        }

        .tawk-chatinput-container {
          background-color: var(--ss-body-bg);
          border: 1px solid #ffffff1c;
        }

        .tawk-margin-small-bottom.tawk-flex.tawk-flex-bottom.tawk-message-block:last-child {
          margin-bottom: var(--ss-space-l-xl) !important;
        }

        .tawk-avatar {
          border: none;
          background-color: transparent !important;
          border: 3px solid #ffffff21;
        }

        .tawk-icon.tawk-icon-hamburger-menu {
          color: var(--ss-body-bg);
        }

        .tawk-dropdown-menu {
          background-color: var(--ss-card-bg);
          border: 1px solid #ffffff1c;
        }

        .tawk-toolbar-menu .tawk-dropdown-menu .tawk-button {
          color: var(--ss-body-color);
        }

        .tawk-toolbar-menu .tawk-dropdown-menu .tawk-button:focus, .tawk-toolbar-menu .tawk-dropdown-menu .tawk-button:hover {
          background-color: var(--ss-body-bg);
        }

        .tawk-toolbar-menu .tawk-dropdown-menu::after, .tawk-toolbar-menu .tawk-dropdown-menu::before {
          border-bottom-color: var(--ss-card-bg);
        }

        .tawk-chatinput-ratings {
          background: var(--ss-card-bg);
        }

        #tawk-chatinput-container {
          padding: 20px 1rem;
        }

        .card--heading .tawk-text-bold-4 {
          font-size: var(--ss-step-3);
        }

        .tawk-main-panel {
          background-color: var(--ss-body-bg);
        }

        .tawk-main-panel .tawk-chat-panel {
          background-color: var(--ss-body-bg);
        }

        .card-container .tawk-card, .card-container .tawk-kb-search {
          border: 1px solid #9090901c;
        }

        .tawk-padding-small.tawk-text-regular-4 {
          color: var(--ss-body-color);
        }

        .tawk-card-inverse {
          color: var(--ss-body-color);
        }

        .tawk-input, .tawk-select, .tawk-textarea {
          background: var(--ss-dark);
        }

        .tawk-box-shadow-xsmall {
          box-shadow: 0 2px 3px rgba(17, 14, 14, 0.08);
        }


        .tawk-margin-xsmall-bottom.tawk-text-truncate.tawk-text-grey-2 {
          color: var(--ss-body-color) !important;
        }

        .tawk-text-truncate.tawk-text-grey-2 {
          color: var(--ss-body-color) !important;
          opacity: 1;
        }

        .tawk-home-list.tawk-home-list-hover>li:not(.tawk-home-list-divider):focus,
        .tawk-home-list.tawk-home-list-hover>li:not(.tawk-home-list-divider):hover {
          background: var(--ss-dark);
        }

        .tawk-search-wrapper {
          background: #ffffff36;
        }

        .tawk-input,
        .tawk-select,
        .tawk-textarea {
          color: var(--ss-body-color);
        }

        .tawk-input:focus,
        .tawk-select:focus,
        .tawk-textarea:focus {
          background-color: var(--ss-card-bg);
        }

        .tawk-search-button-close {
          background: var(--ss-card-bg) !important;
          color: var(--ss-body-color) !important;
        }

        .tawk-search-dropdown {
          background-color: var(--ss-card-bg);
        }

        .tawk-loader-animation {
          background: linear-gradient(90deg,#46464a 8%,#424242 18%,#424242 33%);
        }

        .tawk-text-left.tawk-flex.tawk-flex-middle.tawk-button.tawk-button-text.tawk-button-small:nth-child(4) {
          display: none !important;
        }

        .tawk-main-panel .tawk-header {
          padding-bottom: 0;
        }

        .tawk-form-input {
          border-left: none !important;
        }

        .tawk-input,
        .tawk-select,
        .tawk-textarea {
          border: 1px solid #d9dbe43d;
        }

        .tawk-cancel-button {
          background-color: var(--ss-card-bg) !important;
          color: #777 !important;
          border-color: #d9dbe424 !important;
        }

        .tawk-form-wrapper .tawk-input+.tawk-form-label.tawk-active,
        .tawk-form-wrapper .tawk-textarea+.tawk-form-label.tawk-active {
          transform: translate(-15px, -24px) scale(.9);
          background-color: var(--ss-card-bg);
        }

        .tawk-chatinput-send {
          color: var(--ss-accent-color);
        }      
          
        .tawk-emoji-picker {
          border: 1px solid #d9dbe424;
          background: var(--ss-card-bg);
        }

        .tawk-emoji-preview {
          background: var(--ss-card-bg);
        }
      `;

      var fontFamily = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap');`;

      // Combine root styles and custom styles
      var combinedStyles = fontFamily + '\n' + rootStyles + customStyles;

      // Create a style element with the combined styles
      var $style = $('<style>').html(combinedStyles);

      // Append the combined styles to the iframe's head
      $(iframeDoc.head).append($style);
    } catch (e) {
      // Handle cross-origin issues (e.g., trying to access an iframe from a different domain)
      console.error('Cannot access iframe contents due to cross-origin restrictions.');
    }
  }

  // Create a MutationObserver to watch for changes in the DOM
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        // Check if the added node is an iframe
        if (node.tagName === 'IFRAME') {
          // Once the iframe is found, wait for it to load its final content
          $(node).on('load', function () {
            // Once the iframe has loaded, try injecting styles
            injectStylesInIframe(node);
          });
        }
      });
    });
  });

  // Start observing the document's body for added iframes
  observer.observe(document.body, { childList: true, subtree: true });

  // Embed the Tawk.to chat script as usual
  var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6701056537379df10df216e4/1i9dvq5s5';
    s1.charset = 'UTF-8';
    s0.parentNode.insertBefore(s1, s0);
  })();

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
    gsap.set($maskedCircle, { display: 'block', zIndex: 1000, opacity: 1 });
    pageTransition().then(() => {
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
   */
  const init = () => {
    updateProgressBar();
    registerEventListeners();
    $maskedCircle.addClass('loading');
    if (document.readyState === 'complete') {
      contentAnimation();
      $maskedCircle.removeClass('loading');
    } else {
      $(window).on('load', () => {
        contentAnimation();
        $maskedCircle.removeClass('loading');
      });
      setTimeout(() => {
        if (document.readyState === 'complete') {
          contentAnimation();
          $maskedCircle.removeClass('loading');
        }
      }, 500);
    }
  };

  init();
});
