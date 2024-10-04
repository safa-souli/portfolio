$(document).ready(function () {
  const jsonProject = `assets/data/behance-projects.json`;

  $.getJSON(jsonProject, function (data) {
    let $projectsContainer = $('#behance-projects');

    data.projects.forEach(function (project) {
      const hasBehanceUrl = project.url;
      const hasStats = project.stats && (project.stats.views || project.appreciations || project.stats.comments);

      const projectElement = `
        <div class="portfolio__item ${project.fields.map(field => field.replace(/\s+/g, '-').replace(/[^\w-]/g, '-')).join(' ')}">
          <a class="portfolio__link" href="${project.covers['404']}" data-fancybox="gallery" data-caption="${project.name}">
            <picture class="portfolio__picture" style="aspect-ratio: 404/316">
              <source srcset="" type="image/webp">
              <source srcset="${project.covers['202']} 202w, ${project.covers['404']} 404w, ${project.covers['808']} 808w" type="image/jpg">
              <img sizes="404px" src="${project.covers['404']}" class="portfolio__image" alt="${project.name}" draggable="false">
            </picture>
          </a>
          <div class="portfolio__content">
            <div class="portfolio__content-box">
              <h4 class="portfolio__item-title">${project.name}
                <span class="portfolio__tags">
                  ${project.fields.map(field => `<tag class="btn__tag">${field}</tag>`).join('')}
                </span>
              </h4>

              ${project.description ? `<p class="portfolio__item-text">${project.description}</p>` : ''}

              ${hasBehanceUrl || hasStats ? '<hr>' : ''}  <!-- Conditionally add <hr> -->

              ${hasBehanceUrl ? `
                <a class="cta__btn" href="${project.url}" target="_blank">
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

      // Append the created HTML to the container
      $projectsContainer.append(projectElement);
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
    $('.portfolio__filter-btn').on('click', function () {
      $('.portfolio__filter-btn').removeClass('active');
      $(this).addClass('active');
    });
  });
});