(function () {
    const isHome = document.body.id === 'page-site-index';
    const params = new URLSearchParams(window.location.search);
    const isCustomCSS = params.get('customcss') === 'true';

    /* TRANSPARENT HEADER */
    const header = document.querySelector('nav.navbar.fixed-top');
    const scrollContainer = document.querySelector('div#page.drawers.drag-container');
    const excludedIds = [
      'page-mod-assign',
      'page-login-index',
      'page-login-signup',
      'page-h5p-embed',
      'page-login-forgot_password'
    ];

    const bodyId = document.body.id;
    const isAllowed = !excludedIds.includes(bodyId);

    if (header && scrollContainer && isAllowed) {
        header.classList.add('header-transparent');

        function updateHeaderTransparency() {
            const scrollY = scrollContainer.scrollTop;
            if (scrollY <= 50) {
                header.classList.add('header-transparent');
            } else {
                header.classList.remove('header-transparent');
            }
        }

        updateHeaderTransparency();
        scrollContainer.addEventListener('scroll', updateHeaderTransparency);
    }

    /* NO SEC NAV */
    var secondaryNav = document.querySelector("#topofscroll .secondary-navigation");
    if (!secondaryNav) {
        document.body.classList.add("no-secondary-nav");
    }

    /* SLIDES */
    if (!isHome || !isCustomCSS) return;

    const container = document.querySelector('div#region-main-box #region-main div.course-content');
    if (!container) return;

    const slides = [
        {
            title: "Fórmate. Avanza. Hazlo.",
            desc: "",
            img: "https://haz.institutortve.com/wp-content/uploads/2025/05/BG.jpg"
        }
        /*
        ,{
            title: "Slide 2",
            desc: "Texto slide 2",
            img: "URL"
        }
        */
    ];

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-carousel';

    const slidesHTML = slides.map(slide => `
        <div class="slide" style="background-image: url('${slide.img}')">
            <div class="overlay">
                <div class="overlay-content">
                    <h2>${slide.title}</h2>
                    <p>${slide.desc}</p>
                </div>
            </div>
        </div>
    `).join('');

    // Solo generar indicadores si hay más de un slide
    const indicatorsHTML = slides.length > 1
        ? `<div class="slide-indicators">
            ${slides.map((_, i) => `<button data-slide="${i}" aria-label="Ir al slide ${i + 1}"></button>`).join('')}
          </div>`
        : '';

    wrapper.innerHTML = `
        <div class="carousel-track">
            ${slidesHTML}
        </div>
        ${indicatorsHTML}
    `;

    container.prepend(wrapper);

    const slidesEl = wrapper.querySelectorAll('.slide');

    // Solo si hay más de un slide
    if (slides.length > 1) {
        const indicators = wrapper.querySelectorAll('.slide-indicators button');
        let current = 0;
        let interval;

        function showSlide(index) {
            slidesEl.forEach((el, i) => {
                el.classList.toggle('active', i === index);
                indicators[i].classList.toggle('active', i === index);
            });
            current = index;
        }

        function startAutoSlide() {
            interval = setInterval(() => {
                const next = (current + 1) % slides.length;
                showSlide(next);
            }, 4000);
        }

        indicators.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                clearInterval(interval);
                showSlide(i);
                startAutoSlide();
            });
        });

        showSlide(0);
        startAutoSlide();
    } else {
        slidesEl[0].classList.add('active');
    }

})();