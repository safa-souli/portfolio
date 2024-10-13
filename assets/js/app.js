$(document).ready(function () {
  const $window = $(window);
  const $maskedCircle = $('.masked-circle');
  const $header = $('.header');
  let $fixedHeader;
  let lastScrollTop = 0;
  let mode = "dev";

  if ('serviceWorker' in navigator && mode === 'prod') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('https://safa-souli.github.io/portfolio/sw.js', { scope: '/portfolio/' })
        .then((registration) => {
          console.debug('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.debug('Service Worker registration failed:', error);
        });
    });
  } else {
    console.debug('Service Worker is not supported');
  }

  if (document.querySelector("[data-fancybox='gallery']")) {
    Fancybox.bind("[data-fancybox='gallery']", {});
  }

  function pollIframeLoad(node) {
    var pollInterval = setInterval(function () {
      if (node.contentWindow && node.contentDocument.readyState === 'complete') {
        clearInterval(pollInterval); // Stop polling once the iframe is loaded
        injectStylesInIframe(node);
      }
    }, 100); // Poll every 100ms
  }

  // Function to handle iframe load or start polling
  function handleIframe(node) {
    if (node.contentWindow && node.contentDocument.readyState === 'complete') {
      injectStylesInIframe(node); // If iframe is already loaded
    } else {
      pollIframeLoad(node); // Start polling as a fallback
    }
  }

  // Function to inject custom styles into the iframe once it's fully loaded
  function injectStylesInIframe(iframe) {
    try {
      var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      if (!iframeDoc) {
        console.error('Cannot access iframe document due to cross-origin restrictions.');
        return;
      }

      var customStyles = `
        :root {
          --ss-body-bg: #0d0d0d;
          --ss-body-color: #fff;
          --ss-body-font-family: 'Sora', system-ui;
          --ss-body-font-weight: 400;
          --ss-body-line-height: 2;
          --ss-heading-color: #f1f1f1;
          --ss-heading-font-family: 'Sora', system-ui;
          --ss-heading-font-weight: 700;
          --ss-heading-line-height: 1.1;
          --ss-card-bg: #1f1f1f;
          --ss-border-radius: 14px;
          --ss-dark: black;
          --ss-danger: #b34e4d;
          --ss-success: #458746;
          --ss-dark-rgb: 0, 0, 0;

          /* @link https://utopia.fyi/type/calculator?c=320,14,1.2,1240,16,1.32,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6|7|8|9|10|11|12,s-l&g=s,l,xl,12 */

          --ss-step--2: clamp(0.5739rem, 0.6194rem + -0.0586vw, 0.6076rem);
          --ss-step--1: clamp(0.7292rem, 0.7193rem + 0.0494vw, 0.7576rem);
          --ss-step-0: clamp(0.875rem, 0.8315rem + 0.2174vw, 1rem);
          --ss-step-1: clamp(1.05rem, 0.9561rem + 0.4696vw, 1.32rem);
          --ss-step-2: clamp(1.26rem, 1.0922rem + 0.839vw, 1.7424rem);
          --ss-step-3: clamp(1.512rem, 1.2379rem + 1.3704vw, 2.3rem);
          --ss-step-4: clamp(1.8144rem, 1.3895rem + 2.1244vw, 3.036rem);
          --ss-step-5: clamp(2.1773rem, 1.5407rem + 3.1829vw, 4.0075rem);


          /* @link https://utopia.fyi/space/calculator?c=320,14,1.2,1240,16,1.32,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6|7|8|9|10|11|12,s-l&g=s,l,xl,12 */

          --ss-space-3xs: clamp(0.25rem, 0.25rem + 0vw, 0.25rem);
          --ss-space-2xs: clamp(0.4375rem, 0.4158rem + 0.1087vw, 0.5rem);
          --ss-space-xs: clamp(0.6875rem, 0.6658rem + 0.1087vw, 0.75rem);
          --ss-space-s: clamp(0.875rem, 0.8315rem + 0.2174vw, 1rem);
          --ss-space-m: clamp(1.3125rem, 1.2473rem + 0.3261vw, 1.5rem);
          --ss-space-l: clamp(1.75rem, 1.663rem + 0.4348vw, 2rem);
          --ss-space-xl: clamp(2.625rem, 2.4946rem + 0.6522vw, 3rem);
          --ss-space-2xl: clamp(3.5rem, 3.3261rem + 0.8696vw, 4rem);
          --ss-space-3xl: clamp(5.25rem, 4.9891rem + 1.3043vw, 6rem);
          --ss-space-4xl: clamp(6.125rem, 5.8207rem + 1.5217vw, 7rem);
          --ss-space-5xl: clamp(7rem, 6.6522rem + 1.7391vw, 8rem);
          --ss-space-6xl: clamp(7.875rem, 7.4837rem + 1.9565vw, 9rem);
          --ss-space-7xl: clamp(8.75rem, 8.3152rem + 2.1739vw, 10rem);
          --ss-space-8xl: clamp(9.625rem, 9.1467rem + 2.3913vw, 11rem);
          --ss-space-9xl: clamp(10.5rem, 9.9783rem + 2.6087vw, 12rem);

          /* One-up pairs */
          --ss-space-3xs-2xs: clamp(0.25rem, 0.163rem + 0.4348vw, 0.5rem);
          --ss-space-2xs-xs: clamp(0.4375rem, 0.3288rem + 0.5435vw, 0.75rem);
          --ss-space-xs-s: clamp(0.6875rem, 0.5788rem + 0.5435vw, 1rem);
          --ss-space-s-m: clamp(0.875rem, 0.6576rem + 1.087vw, 1.5rem);
          --ss-space-m-l: clamp(1.3125rem, 1.0734rem + 1.1957vw, 2rem);
          --ss-space-l-xl: clamp(1.75rem, 1.3152rem + 2.1739vw, 3rem);
          --ss-space-xl-2xl: clamp(2.625rem, 2.1467rem + 2.3913vw, 4rem);
          --ss-space-2xl-3xl: clamp(3.5rem, 2.6304rem + 4.3478vw, 6rem);
          --ss-space-3xl-4xl: clamp(5.25rem, 4.6413rem + 3.0435vw, 7rem);
          --ss-space-4xl-5xl: clamp(6.125rem, 5.4728rem + 3.2609vw, 8rem);
          --ss-space-5xl-6xl: clamp(7rem, 6.3043rem + 3.4783vw, 9rem);
          --ss-space-6xl-7xl: clamp(7.875rem, 7.1359rem + 3.6957vw, 10rem);
          --ss-space-7xl-8xl: clamp(8.75rem, 7.9674rem + 3.913vw, 11rem);
          --ss-space-8xl-9xl: clamp(9.625rem, 8.7989rem + 4.1304vw, 12rem);

          /* Custom pairs */
          --ss-space-s-l: clamp(0.875rem, 0.4837rem + 1.9565vw, 2rem);

          /* @link https://utopia.fyi/grid/calculator?c=320,14,1.2,1600,16,1.32,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6|7|8|9|10|11|12,s-l&g=m,m,3xl,11 */

          --ss-grid-max-width: 84.00rem;
          --ss-grid-ultimate-width: 53.00rem;
          --ss-grid-gutter: var(--space-m-m, clamp(1.3125rem, 1.2539rem + 0.293vw, 1.5rem));
          --ss-grid-columns: 11;

          /* colors */
          --ss-accent-color: #43E29B;
          --ss-accent-color-rgb: 67,226,155;
          --ss-accent-color-hue: 153;
          --ss-accent-color-saturation: 73.3%;
          --ss-accent-color-lightness: 57.5%;

          --ss-accent-dark-color: hsl(var(--ss-accent-color-hue) calc(var(--ss-accent-color-saturation) - 20%) calc(var(--ss-accent-color-lightness) - 20%));
          --ss-accent-light-color: hsl(var(--ss-accent-color-hue) calc(var(--ss-accent-color-saturation) - 10%) calc(var(--ss-accent-color-lightness) + 20%));
          --ss-accent-subtle-color: hsl(calc(var(--ss-accent-color-hue) - 10) var(--ss-accent-color-saturation) calc(var(--ss-accent-color-lightness) - 10%));

          --ss-accent-gradient: linear-gradient(125deg, var(--ss-accent-color) 0%, var(--ss-accent-dark-color) 100%);

          /* buttons */
          --ss-btn-font-weight: 600;

        }        

        body.font-lato {
          color: var(--ss-body-color);
          font-family: var(--ss-body-font-family) !important;
          font-size: var(--ss-step-0) !important;
          font-weight: var(--ss-body-font-weight) !important;
          line-height: var(--ss-body-line-height) !important;       
        }

        body * {
          font-family: var(--ss-body-font-family) !important;
          line-height: 1.6;
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
          background: var(--ss-accent-gradient) !important;
          color: var(--ss-body-bg) !important;
          font-weight: 500;
        }
          
        .tawk-visitor-chat-bubble {
          background: transparent !important;
          color: var(--ss-body-color) !important;
          border: 1px solid #ffffff1f;
        }

        .tawk-max-container {
          border: 1px solid #e9e9e921;
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

        .tawk-overlay {
          border: 1px solid #171717e3;
        }

        .tawk-router-view {
          background-color: var(--ss-body-bg);
        }

        button {
          font-weight: 600;
        }

        .tawk-footer {
          border-color: #fff0;
        }

        .tawk-agent-name.tawk-text-truncate {
          font-weight: 600;
        }

        .ps__rail-y .ps__thumb-y {
          width: 3px !important;
          background: var(--ss-accent-color) !important;
        }

        .card-container:first-child::before,
        .tawk-card-primary {
          background: var(--ss-accent-gradient);
        }

        .tawk-chat-visible .tawk-overlay .tawk-overlay-header,
        .tawk-chat-visible .tawk-card-primary {
          background: var(--ss-card-bg) !important;
        }

        .tawk-chat-visible .tawk-overlay .tawk-overlay-header *,
        .tawk-chat-visible .tawk-card-primary * {
          color: var(--ss-body-color) !important;}

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

        .tawk-agent-image .tawk-avatar {
          border: 1px solid #040404fa;
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

        .tawk-agent-chat-bubble-dots {
          background: #6f6f6f !important;
        }

        .tawk-chat-message-container {
          padding-top: 24px;
        }

        .tawk-message-preview-close {
          margin-bottom: 0;
          background-color: var(--ss-card-bg);
          border: 1px solid #ffffff0f;
        }

        .tawk-timeago {
          font-family: var(--ss-body-font-family);
        }

        .card--chat .tawk-button {
          font-weight: 600;
        }

        .tawk-overlay-header.tawk-custom-color {
          border-radius: var(--ss-border-radius) var(--ss-border-radius) 0 0;
        }

        .tawk-max-container {
          border-radius: var(--ss-border-radius) !important;
          background: var(--ss-body-bg);
        } 

        .tawk-overlay {
          background-color: transparent;
        }

        .tawk-max-footer-actions-button.tawk-button.tawk-button-outline.tawk-button-outline-null {
          border-radius: 0 0 var(--ss-border-radius) var(--ss-border-radius);
        }

        .tawk-chat-visible .tawk-max-container.tawk-no-toolbar-elements .tawk-main-panel .tawk-chat-panel::before,
        .tawk-chat-visible .card-container:first-child::before {
          background: var(--ss-card-bg) !important;
        }

        .tawk-footer {
          border: 1px solid var(--ss-card-bg) !important;
          border-radius: 0 0 var(--ss-border-radius) var(--ss-border-radius) !important;
          transition: border 0.3s ease-in-out;
        }

        .tawk-footer[style*="box-shadow: rgba(0, 0, 0, 0.1) 0px -2px 8px;"] {
          border: 1px solid rgba(var(--ss-accent-color-rgb), 60%) !important;
        }

        .tawk-footer[style*="box-shadow: rgba(0, 0, 0, 0.1) 0px -2px 8px;"] .tawk-chatinput-button.tawk-chatinput-focused {
          color: #c1c1c1;
        }

        .tawk-chatinput-editor {
          font-family: var(--ss-body-font-family) !important;
        }

        .tawk-button.tawk-button-circle .tawk-min-chat-icon {
          transform: scaleX(1);
          transition: transform 0.3s ease-in-out;
        }

        .tawk-button.tawk-button-circle:hover .tawk-min-chat-icon {
          transform: scaleX(-1);
        }

        .tawk-button.tawk-button-circle {
          background: var(--ss-accent-gradient);
        }

        .tawk-header-text.tawk-button.tawk-tooltip:hover {
          background: #ffffff1a;
        }

      `;

      var fontFamily = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap');`;

      var combinedStyles = fontFamily + '\n' + customStyles;

      var $style = $('<style>').html(combinedStyles);

      $(iframeDoc.head).append($style);
      // Function to check visibility of all chat views
      function checkTawkChatVisibility() {
        var tawkChatViews = $(iframeDoc.body).find('.tawk-chat-view'); // Select all chat view elements
        var tawkMessagePreview = $(iframeDoc.body).find('#tawk-message-preview'); // Select all chat view elements

        // Loop through each .tawk-chat-view to see if any are NOT hidden (i.e., not display: none)
        var isChatViewVisible = false;
        tawkChatViews.each(function () {
          if ($(this).css('display') !== 'none') {
            isChatViewVisible = true; // If any element is NOT display: none, mark it as visible
            return false; // Break out of the loop if one is found
          }
        });

        var isMessagePreviewVisible = false;
        if (tawkMessagePreview.is(':visible')) {
          isMessagePreviewVisible = true; // If any element is NOT display: none, mark it as visible
        }

        // Add or remove class based on visibility of any .tawk-chat-view
        if (isChatViewVisible) {
          $(iframeDoc.body).addClass('tawk-chat-visible');
        } else {
          $(iframeDoc.body).removeClass('tawk-chat-visible');
        }

        if (isMessagePreviewVisible) {
          $("body").addClass('tawk-message-visible');
        }

        if (!isMessagePreviewVisible && tawkMessagePreview.length > 0 && !$('header').hasClass('in-viewport')) {
          $("body").removeClass('tawk-message-visible');
        }
      }

      // Run the visibility check at intervals
      setInterval(function () {
        checkTawkChatVisibility();
      }, 200); // Check visibility every 500ms (adjust as needed)

    } catch (e) {
      console.error('Cannot access iframe contents due to cross-origin restrictions.');
    }
  }

  // MutationObserver to detect new iframes
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.tagName === 'IFRAME') {
          setTimeout(function () {
            handleIframe(node);
          }, 200);
        }
      });
    });
  });


  // Start observing the document's body for added iframes
  observer.observe(document.body, { childList: true, subtree: true });


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

  const updateProgressBar = () => {
    const scrollTop = $window.scrollTop();
    $fixedHeader = $('#header-fixed');

    // Detect scroll direction
    if (scrollTop < lastScrollTop) {
      // User is scrolling up
      if (!isInTheViewport($header)) {
        // Slide down the fixed header if the original header is out of the viewport
        $fixedHeader.css({
          transform: 'translateY(0)',
          opacity: 1
        });
      }
    } else {
      // User is scrolling down
      $fixedHeader.css({
        transform: 'translateY(30px)',
        opacity: 0
      });
    }

    // Update the last scroll position
    lastScrollTop = scrollTop;
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
        $maskedCircle.html('');
        gsap.delayedCall(0, () => {
          gsap.set($maskedCircle, { zIndex: -2000000010 });
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
      onStart: () => gsap.set($maskedCircle, { zIndex: 2000000010 }),
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
    $('a.animate-page').on('click', handleLinkClick);
  };

  const removeLoader = () => {
    // Check if the user is online
    if (navigator.onLine) {
      // console.log("Connected to the internet");
      // console.log($('script[src*="https://embed.tawk.to"]').length === 0);
      // Check if the script is already loaded by searching for its URL
      if ($('script[src*="https://embed.tawk.to"]').length === 0) {
        var s1 = document.createElement("script"),
          s0 = document.getElementsByTagName("script")[0];

        s1.async = true;
        s1.src = 'https://embed.tawk.to/6701056537379df10df216e4/1i9dvq5s5';
        s1.charset = 'UTF-8';

        // Detect if the script is loaded successfully
        s1.onload = () => {
          $('body').removeClass('tawk-offline').addClass('tawk-online');
        };

        s0.parentNode.insertBefore(s1, s0);
      } else {
        // Script is already loaded, apply the class directly
        $('body').removeClass('tawk-offline').addClass('tawk-online');
      }

    } else {
      // User is offline - handle it gracefully
      // console.log("No internet connection. Live chat is unavailable.");
      // Optionally, show a message or UI indicating the live chat is unavailable
      $('body').addClass('tawk-offline'); // Example for styling offline state
      $('body iframe').hide();
    }

    // Perform the rest of the operations regardless of the connection state
    contentAnimation();
    $maskedCircle.removeClass('loading');
  };

  // Optional: Listen for network status changes
  window.addEventListener('online', removeLoader);
  window.addEventListener('offline', () => {
    $('body').removeClass('tawk-online').addClass('tawk-offline');
    $('body iframe').hide();
    // console.log("You are offline. Live chat is unavailable.");
    contentAnimation();
    $maskedCircle.removeClass('loading');
  });


  /**
   * Initializes the page by calling the content animation, updating the progress bar, and
   * registering event listeners. Hides the masked circle after the page is fully loaded.
   */
  const init = () => {
    updateProgressBar();
    registerEventListeners();
    $maskedCircle.addClass('loading');

    $('#cancelLoadingBtn').on('click', (event) => {
      event.preventDefault();
      removeLoader();
    });

    if (document.readyState === 'complete') {
      removeLoader();
    } else {
      $(window).on('load', () => {
        removeLoader();
      });
      setTimeout(() => {
        if (document.readyState === 'complete') {
          removeLoader();
        }
      }, 500);
    }
  };

  init();
});