(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const section4 = document.getElementById('section4');
const section5 = document.getElementById('section5');
const section6 = document.getElementById('section6');
const section7 = document.getElementById('section7');
const section8 = document.getElementById('section8');
const section9 = document.getElementById('section9');
const section10 = document.getElementById('section10');
const section11 = document.getElementById('section11');
const link1 = document.getElementById('link1');
const link2 = document.getElementById('link2');
const link3 = document.getElementById('link3');
const link4 = document.getElementById('link4');
const link5 = document.getElementById('link5');
const link6 = document.getElementById('link6');
const link7 = document.getElementById('link7');
const link8 = document.getElementById('link8');
const link9 = document.getElementById('link9');
const link10 = document.getElementById('link10');
const link11 = document.getElementById('link11');

link1.addEventListener('click', (event) => {
  event.preventDefault();
  section1.classList.remove('hidden');
  section2.classList.add('hidden');
  section3.classList.add('hidden');
  section4.classList.add('hidden');
  section5.classList.add('hidden');
  section6.classList.add('hidden');
  section7.classList.add('hidden');
  section8.classList.add('hidden');
  section9.classList.add('hidden');
  section10.classList.add('hidden');
  section11.classList.add('hidden');
});

link2.addEventListener('click', (event) => {
  event.preventDefault();
  section1.classList.add('hidden');
  section2.classList.remove('hidden');
  section3.classList.add('hidden');
  section4.classList.add('hidden');
  section5.classList.add('hidden');
  section6.classList.add('hidden');
  section7.classList.add('hidden');
  section8.classList.add('hidden');
  section9.classList.add('hidden');
  section10.classList.add('hidden');
  section11.classList.add('hidden');
});

link3.addEventListener('click', (event) => {
  event.preventDefault();
  section1.classList.add('hidden');
  section2.classList.add('hidden');
  section3.classList.remove('hidden');
  section4.classList.add('hidden');
  section5.classList.add('hidden');
  section6.classList.add('hidden');
  section7.classList.add('hidden');
  section8.classList.add('hidden');
  section9.classList.add('hidden');
  section10.classList.add('hidden');
  section11.classList.add('hidden');
});

link4.addEventListener('click', (event) => {
  event.preventDefault();
  section1.classList.add('hidden');
  section2.classList.add('hidden');
  section3.classList.add('hidden');
  section4.classList.remove('hidden');
  section5.classList.add('hidden');
  section6.classList.add('hidden');
  section7.classList.add('hidden');
  section8.classList.add('hidden');
  section9.classList.add('hidden');
  section10.classList.add('hidden');
  section11.classList.add('hidden');
});

link5.addEventListener('click', (event) => {
  event.preventDefault();
  section1.classList.add('hidden');
  section2.classList.add('hidden');
  section3.classList.add('hidden');
  section4.classList.add('hidden');
  section5.classList.remove('hidden');
  section6.classList.add('hidden');
  section7.classList.add('hidden');
  section8.classList.add('hidden');
  section9.classList.add('hidden');
  section10.classList.add('hidden');
  section11.classList.add('hidden');
});

link6.addEventListener('click', (event) => {
  event.preventDefault();
  section1.classList.add('hidden');
  section2.classList.add('hidden');
  section3.classList.add('hidden');
  section4.classList.add('hidden');
  section5.classList.add('hidden');
  section6.classList.remove('hidden');
  section7.classList.add('hidden');
  section8.classList.add('hidden');
  section9.classList.add('hidden');
  section10.classList.add('hidden');
  section11.classList.add('hidden');
});

link7.addEventListener('click', (event) => {
  event.preventDefault();
  section1.classList.add('hidden');
  section2.classList.add('hidden');
  section3.classList.add('hidden');
  section4.classList.add('hidden');
  section5.classList.add('hidden');
  section6.classList.add('hidden');
  section7.classList.remove('hidden');
  section8.classList.add('hidden');
  section9.classList.add('hidden');
  section10.classList.add('hidden');
  section11.classList.add('hidden');
});

link8.addEventListener('click', (event) => {
  event.preventDefault();
  section1.classList.add('hidden');
  section2.classList.add('hidden');
  section3.classList.add('hidden');
  section4.classList.add('hidden');
  section5.classList.add('hidden');
  section6.classList.add('hidden');
  section7.classList.add('hidden');
  section8.classList.remove('hidden');
  section9.classList.add('hidden');
  section10.classList.add('hidden');
  section11.classList.add('hidden');
});

link9.addEventListener('click', (event) => {
  event.preventDefault();
  section1.classList.add('hidden');
  section2.classList.add('hidden');
  section3.classList.add('hidden');
  section4.classList.add('hidden');
  section5.classList.add('hidden');
  section6.classList.add('hidden');
  section7.classList.add('hidden');
  section8.classList.add('hidden');
  section9.classList.remove('hidden');
  section10.classList.add('hidden');
  section11.classList.add('hidden');
});

link10.addEventListener('click', (event) => {
  event.preventDefault();
  section1.classList.add('hidden');
  section2.classList.add('hidden');
  section3.classList.add('hidden');
  section4.classList.add('hidden');
  section5.classList.add('hidden');
  section6.classList.add('hidden');
  section7.classList.add('hidden');
  section8.classList.add('hidden');
  section9.classList.add('hidden');
  section10.classList.remove('hidden');
  section11.classList.add('hidden');
});

link11.addEventListener('click', (event) => {
  event.preventDefault();
  section1.classList.add('hidden');
  section2.classList.add('hidden');
  section3.classList.add('hidden');
  section4.classList.add('hidden');
  section5.classList.add('hidden');
  section6.classList.add('hidden');
  section7.classList.add('hidden');
  section8.classList.add('hidden');
  section9.classList.add('hidden');
  section10.classList.add('hidden');
  section11.classList.remove('hidden');
});

const links = document.querySelectorAll('.papers .col-sm-4 a');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      // Remove active class from all links
      links.forEach(otherLink => {
        otherLink.classList.remove('active-link');
      });

      // Add active class to the clicked link
      link.classList.add('active-link');
    });
  });