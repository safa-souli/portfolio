document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const animateCounter = (element, targetNumber) => {
      gsap.fromTo(element,
        { innerText: 0 },
        {
          innerText: targetNumber,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          snap: { innerText: 1 },
          onUpdate: function () {
            let currentValue = Math.ceil(this.targets()[0].innerText);
            let formattedValue = currentValue < 10 ? `0${currentValue}` : currentValue;
            element.innerText = `${formattedValue}+`;
          }
        });
    };

    document.querySelectorAll('.counter__number').forEach(counter => {
      const targetNumber = parseInt(counter.getAttribute('data-target'));
      animateCounter(counter, targetNumber);
    });
  });

  // Service Section
  gsap.from('.service .fade-up', {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.service__header',
      start: "top 90%",
      toggleActions: "play none none none",
    }
  });

  gsap.from(".service .fade-up--item", {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".service__body",
      start: "top 70%",
      toggleActions: "play none none none",
    }
  });

  // Portfolio Section
  gsap.from('.portfolio .fade-up', {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.portfolio__header',
      start: "top 90%",
      toggleActions: "play none none none",
    }
  });

  // Callout Section
  gsap.from(".callout .fade-up", {
    opacity: 0,
    y: 200,
    duration: 2,
    ease: "power2.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".callout__wrapper",
      start: "top 70%",
      toggleActions: "play none none none",
    }
  });

  // Profile Section
  gsap.from('.profile .fade-left', {
    opacity: 0,
    x: 100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.profile__header',
      start: "top 80%",
      toggleActions: "play none none none",
    }
  });

  gsap.from(".profile--experience .fade-left--item", {
    opacity: 0,
    x: 40,
    duration: 1,
    ease: "power2.out",
    stagger: 0.4,
    scrollTrigger: {
      trigger: ".profile--experience .profile__list",
      start: "top 20%",
      toggleActions: "play none none none",
    }
  });

  gsap.from(".profile--education .fade-left--item", {
    opacity: 0,
    x: 40,
    duration: 1,
    ease: "power2.out",
    stagger: 0.4,
    scrollTrigger: {
      trigger: ".profile--education .profile__list",
      start: "top 20%",
      toggleActions: "play none none none",
    }
  });

  // Skill Section
  gsap.from('.skill .fade-up', {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.skill__header',
      start: "top 80%",
      toggleActions: "play none none none",
    }
  });

  gsap.from(".skill .fade-up--item", {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".skill__list",
      start: "top 20%",
      toggleActions: "play none none none",
    }
  });

  // Contact Section
  gsap.from(".contact .fade-left--item", {
    opacity: 0,
    x: 40,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".contact__wrapper",
      start: "top 20%",
      toggleActions: "play none none none",
    }
  });
});
