
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
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

/*language*/

// Added the following code to handle language toggle
document.addEventListener('DOMContentLoaded', function () {
  let currentLanguage = 'es';

  function updateContent() {
    const aboutContentEn = document.getElementById('about-content-en');
    const aboutContentEs = document.getElementById('about-content-es');
    const servicesContentEn = document.getElementById('services-content-en');
    const servicesContentEs = document.getElementById('services-content-es');
    const contactContentEn = document.getElementById('contact-content-en');
    const contactContentEs = document.getElementById('contact-content-es');
    const heroContentEn = document.getElementById('hero-content-en');
    const heroContentEs = document.getElementById('hero-content-es');
    const navContentEn = document.getElementById('nav-content-en');
    const navContentEs = document.getElementById('nav-content-es');
    const footerContentEn = document.getElementById('footer-content-en');
    const footerContentEs = document.getElementById('footer-content-es');

    if (currentLanguage === 'en') {
      aboutContentEn.style.display = 'block';
      aboutContentEs.style.display = 'none';
      servicesContentEn.style.display = 'block';
      servicesContentEs.style.display = 'none';
      contactContentEn.style.display = 'block';
      contactContentEs.style.display = 'none';
      heroContentEn.style.display = 'block';
      heroContentEs.style.display = 'none';
      navContentEn.style.display = 'block';
      navContentEs.style.display = 'none';
      footerContentEn.style.display = 'block';
      footerContentEs.style.display = 'none';
    } else {
      aboutContentEn.style.display = 'none';
      aboutContentEs.style.display = 'block';
      servicesContentEn.style.display = 'none';
      servicesContentEs.style.display = 'block';
      contactContentEn.style.display = 'none';
      contactContentEs.style.display = 'block';
      heroContentEn.style.display = 'none';
      heroContentEs.style.display = 'block';
      navContentEn.style.display = 'none';
      navContentEs.style.display = 'block';
      footerContentEn.style.display = 'none';
      footerContentEs.style.display = 'block';
    }
  }

  function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    updateContent();
  }

  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) {
    languageToggle.addEventListener('change', toggleLanguage);
  }

  updateContent();
});

document.addEventListener('DOMContentLoaded', function() {
  const envelopeIcon = document.querySelector('.envelope');
  envelopeIcon.addEventListener('click', function(event) {
      event.preventDefault();
      const emailAddress = this.getAttribute('href').replace('mailto:', '');
      window.location.href = `mailto:${emailAddress}`;
  });
});
