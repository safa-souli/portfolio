function applyAnimation(y, element, increment, maxViewportWidth) {
  function animate() {
    // Increment Y and check the bounds
    y += increment;
    if (y >= maxViewportWidth) {
      // Directly set the Y position to -74 without animation
      y = -maxViewportWidth;

      // Update the element's transform immediately to the new position
      element.css({
        "transition": "none", // Temporarily disable transitions
        "transform": `translate3d(${element.data('translateX')}vw, ${y}vw, ${element.data('translateZ')}vw)`
      });

      // Force reflow to immediately apply the styles
      element[0].offsetHeight;

      // Re-enable transitions for smooth animation afterward
      element.css("transition", "");
    } else {
      // Apply the transformation with the incremented Y value
      element.css({
        "transform": `translate3d(${element.data('translateX')}vw, ${y}vw, ${element.data('translateZ')}vw)`
      });
    }

    // Store the updated Y value in the element's data attribute for future reference
    element.data('translateY', y);

    // Call animate on the next frame
    requestAnimationFrame(animate);
  }

  // Start the animation loop
  requestAnimationFrame(animate);
}

function floatingProjectsAnimate() {
  const floatingProjectsTransform = {
    6: {
      darkness: 0.8,
      TranslateX: 35.5,
      TranslateY: -0.65103,
      TranslateZ: -25,
      Scale: 0.85
    },
    9: {
      darkness: 0.2,
      TranslateX: 45.5,
      TranslateY: -20.6385,
      TranslateZ: -5,
      Scale: 1.1
    },
    5: {
      darkness: 0.1,
      TranslateX: -2.5,
      TranslateY: -25.626,
      TranslateZ: -18,
      Scale: 0.86
    },
    4: {
      darkness: 0.6,
      TranslateX: 87.5,
      TranslateY: -31.6135,
      TranslateZ: -20,
      Scale: 0.9
    },
    3: {
      darkness: 0.4,
      TranslateX: 75.5,
      TranslateY: -1.60105,
      TranslateZ: -2,
      Scale: 0.8
    },
    1: {
      darkness: 0.5,
      TranslateX: 3.75,
      TranslateY: 18.6614,
      TranslateZ: -20,
      Scale: 0.95
    },
    7: {
      darkness: 0.7,
      TranslateX: 9.75,
      TranslateY: 71.1739,
      TranslateZ: 0,
      Scale: 1.15
    },
    8: {
      darkness: 0.7,
      TranslateX: 23.5,
      TranslateY: 48.4364,
      TranslateZ: -2,
      Scale: 0.92
    },
    2: {
      darkness: 0.7,
      TranslateX: 67.5,
      TranslateY: 39.9489,
      TranslateZ: -20,
      Scale: 1.05
    },
    10: {
      darkness: 0.5,
      TranslateX: 48.5,
      TranslateY: -63.0386,
      TranslateZ: -20,
      Scale: 0.87
    },
    11: {
      darkness: 0.4,
      TranslateX: 82,
      TranslateY: 64.4739,
      TranslateZ: -13.5,
      Scale: 1.08
    },
    12: {
      darkness: 0.6,
      TranslateX: 68,
      TranslateY: -62.5136,
      TranslateZ: 1,
      Scale: 0.88
    }
  };

  $(".floating-projects .floating-item").each(function (index) {
    // Convert the index to 1-based index to match with nth-of-type
    const nthOfType = index + 1;

    // Make sure the entry exists in the object
    if (floatingProjectsTransform[nthOfType]) {
      // Store the X, Y, and Z values in data attributes
      $(this).data('translateX', floatingProjectsTransform[nthOfType].TranslateX);
      $(this).data('translateY', floatingProjectsTransform[nthOfType].TranslateY);
      $(this).data('translateZ', floatingProjectsTransform[nthOfType].TranslateZ);

      // Apply initial styles including scale and darkness
      $(this).css({
        "--darkness": floatingProjectsTransform[nthOfType].darkness,
        "transform": `translate3d(${floatingProjectsTransform[nthOfType].TranslateX}vw, ${floatingProjectsTransform[nthOfType].TranslateY}vw, ${floatingProjectsTransform[nthOfType].TranslateZ}vw) scale(${floatingProjectsTransform[nthOfType].Scale})`
      });

      // Apply animation only to the Y value
      applyAnimation(floatingProjectsTransform[nthOfType].TranslateY, $(this), Math.random() * (0.1358 - 0.1000) + 0.1000, 60);
    }
  });
}

$(document).ready(function () {
  const jsonProject = `assets/data/behance-projects.json`;

  // Function to check if a project is "new" based on published date
  function isNewProject(publishedDate) {
    const currentDate = new Date();
    const publishedAt = new Date(publishedDate);
    const diffTime = Math.abs(currentDate - publishedAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }


  $.getJSON(jsonProject, function (data) {
    let $projectsContainer = $('#behance-projects');
    let $floatingContainer = $('#floating-projects'); // New container for floating projects

    data.projects.forEach(function (project, index) {
      const hasBehanceUrl = project.url;
      const hasStats = project.stats && (project.stats.views || project.appreciations || project.stats.comments);

      index++;
      // Determine if the project is new
      if (isNewProject(project.published_at)) {
        project.label = "new";
      } else {
        project.label = "none";
      }

      if (project.actif) {
        // Regular portfolio items
        const projectElement = `
          <div class="portfolio__item bg-blur ${project.fields.map(field => field.replace(/\s+/g, '-').replace(/[^\w-]/g, '-')).join(' ')}" data-label="${project.label}" data-label="${project.label}">
            <a class="portfolio__link" href="${project.covers['original']}" data-fancybox="gallery" data-caption="${project.name}">
              <picture class="portfolio__picture portfolio__picture--${project.theme}" style="aspect-ratio: 404/316">
                <source srcset="${project.covers['202']} 202w, ${project.covers['404']} 404w, ${project.covers['808']} 808w" type="image/jpg">
                <img sizes="404px" src="${project.covers['404']}" class="portfolio__image" alt="Behance Thumbnail Image of ${project.name} Project" draggable="false">
              </picture>
            </a>
            <div class="portfolio__content">
              <div class="portfolio__content-box bg-blur">
                <h4 class="portfolio__item-title">${project.name}
                  <span class="portfolio__tags">
                    ${project.fields.map(field => `<tag class="btn__tag">${field}</tag>`).join('')}
                  </span>
                </h4>

                ${project.description ? `<p class="portfolio__item-text">${project.description}</p>` : ''}

                ${hasBehanceUrl || hasStats ? '<hr>' : ''}  <!-- Conditionally add <hr> -->

                ${hasBehanceUrl ? `
                  <a id="viewOnBehance" class="cta__link" href="${project.url}" target="_blank">
                    View on Behance <i class="icon icon--arrow-up-right-from-square"></i>
                  </a>
                ` : ''}

                ${project.tools && project.tools.length > 0 ? `
                  <div class="portfolio__tools">
                    <p class="portfolio__tools-text">
                      Tools: ${project.tools.map(tool => `<span class="portfolio__tool-item">${tool}</span>`).join('')}
                    </p>
                  </div>
                ` : ''}

                ${hasStats ? `
                  <div class="portfolio__stats">
                    ${project.stats.views ? `<span class="portfolio__stat-item"><i class="icon icon--eye"></i> ${project.stats.views}</span>` : ''}
                    ${project.appreciations ? `<span class="portfolio__stat-item"><i class="icon icon--like"></i> ${project.appreciations}</span>` : ''}
                    ${project.stats.comments ? `<span class="portfolio__stat-item"><i class="icon icon--comments"></i> ${project.stats.comments}</span>` : ''}
                  </div>
                ` : ''}
                
              </div>
            </div>
          </div>
        `;

        // Append the created HTML to the portfolio container
        $projectsContainer.append(projectElement);
      }

      if (project.promoted && project.actif) {
        const floatingElement = `
          <div class="floating-item">
            <div class="floating-item__content">
              <figure class="floating-item__image" style="aspect-ratio: 4/3">
                <img src="${project.covers['404']}" alt="${project.name}">
              </figure>
              ${hasStats ? `
                <div class="portfolio__stats">
                  ${project.stats.views ? `<span class="portfolio__stat-item"><i class="icon icon--eye"></i> ${project.stats.views}</span>` : ''}
                  ${project.appreciations ? `<span class="portfolio__stat-item"><i class="icon icon--like"></i> ${project.appreciations}</span>` : ''}
                  ${project.stats.comments ? `<span class="portfolio__stat-item"><i class="icon icon--comments"></i> ${project.stats.comments}</span>` : ''}
                </div>
              ` : ''}
            </div>
          </div>
        `;

        // Append the floating project HTML to the floating container
        $floatingContainer.append(floatingElement);
      }

      if (index === data.projects.length) {
        floatingProjectsAnimate();
      }

      $('#viewOnBehance').on('click', function (event) {
        if (!navigator.onLine) {
          event.preventDefault();
          window.location.href = 'offline.htm';
        }
      });
    });

    // Initialize MixItUp after projects are appended
    mixitup('#behance-projects', {
      selectors: {
        target: '.portfolio__item'
      },
      animation: {
        duration: 300
      }
    });

    // Filter button active state
    var $activeBtn = $('.portfolio__filter-btn.active');
    updateHighlightPosition($activeBtn);

    // On button click, move the highlight
    $('.portfolio__filter-btn').on('click', function () {
      // Remove the 'active' class from all buttons
      $('.portfolio__filter-btn').removeClass('active');
      // Add the 'active' class to the clicked button
      $(this).addClass('active');

      // Update highlight position
      updateHighlightPosition($(this));
    });

    // Function to update the highlight position and size
    function updateHighlightPosition($element) {
      var btnPosition = $element.position();
      var btnWidth = $element.outerWidth();
      var btnHeight = $element.outerHeight();

      // Move and resize the highlight
      $('.highlight').css({
        left: btnPosition.left + 'px',
        top: btnPosition.top + 'px',
        width: btnWidth + 'px',
        height: btnHeight + 'px'
      });
    }
  });

  Fancybox.bind("[data-fancybox='gallery']", {});
});