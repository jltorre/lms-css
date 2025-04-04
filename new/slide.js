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
      header.classList.add('header-transparent'); // al cargar

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

    if (!isHome || !isCustomCSS) return;
  
    const container = document.querySelector('div#region-main-box #region-main div.course-content');
    if (!container) return;
  
    const slides = [
      {
        title: "TE PRESENTAMOS <strong>HAZ</strong>, LA PLATAFORMA DE REFERENCIA DE TALENTO AUDIOVISUAL",
        desc: "Bienvenido a la experiencia Haz: Comienza tu camino en la plataforma referente en formación audiovisual.<p class='my-2'><strong>PIÉNSALO.</strong><br/><strong>APRÉNDELO.</strong></br><strong>HAZLO.</strong></p><p>LAS GRANDES IDEAS COMIENZAN AQUÍ.</br>FORMA PARTE DE LA COMUNIDAD HAZ.</p>",
        img: "https://assets.cdn.ethinkcloud.net/rtve/slide_home_new-01.png"
      },
      {        
        title: "DESCUBRE LOS ITINERARIOS DE ESPECIALIZACIÓN",
        desc: "Más de 15 rutas distintas.<p class='my-2'><strong>EXPLÓRALO</strong>.<br><strong>PERSONALÍZALO</strong>.</br><strong>DOMÍNALO.</strong></p><p>Descubre nuevas rutas de especialización.</p>",
        img: "https://images.pexels.com/photos/1516202/pexels-photo-1516202.jpeg"
      },
      {
        title: "¡QUE ESTA VEZ NO TE PILLE POR SORPRESA!",
        desc: "Próximas fechas para matriculación de cursos, ya abiertas.",
        img: "https://images.pexels.com/photos/212410/pexels-photo-212410.jpeg"
      }
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
  
    const indicatorsHTML = `
      <div class="slide-indicators">
        ${slides.map((_, i) => `<button data-slide="${i}" aria-label="Ir al slide ${i + 1}"></button>`).join('')}
      </div>
    `;
  
    wrapper.innerHTML = `
      <div class="carousel-track">
        ${slidesHTML}
      </div>
      ${indicatorsHTML}
    `;
  
    container.prepend(wrapper);
  
    const slidesEl = wrapper.querySelectorAll('.slide');
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
        clearInterval(interval); // detiene el slide automático al hacer clic
        showSlide(i);
        startAutoSlide(); // lo reinicia
      });
    });
  
    showSlide(0);
    startAutoSlide();

  })();

