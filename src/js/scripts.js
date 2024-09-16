window.addEventListener('DOMContentLoaded', () => {

  /** @var {Array.<HTMLElement>} */
  const hideables = Array.from(document.getElementsByClassName('scripted hideable'));
  const stickyHeader = document.getElementById('sticky-header');
  const hideableHeadline = document.getElementById('sticky-headline');
  const navOpener = document.getElementById('main-menu-toggle');
  const navCloser = document.getElementById('main-menuClose');
  const navMenu = document.getElementById('main-menu');
  const languageSwitch = document.getElementById('language-switch');
  const animationToggle = document.getElementById('animation-toggle');
  const supportsIntersectionObserver = (('IntersectionObserver' in window) &&
    ('IntersectionObserverEntry' in window) &&
    ('intersectionRatio' in window.IntersectionObserverEntry.prototype) &&
    ('isIntersecting' in window.IntersectionObserverEntry.prototype)
  );

  /* Progressive enhancement:
   * DOM elements with visibility controlled by script, like sticky-header,
   * must always stay visible without javascript,
   * so we hide them by script when the document is ready
   */

  hideables.forEach(hideable => {
    hideable.className = hideable.className.replace(
      'hideable',
      'unsticky-hidden'
    );
  })

  // display sticky headline when header stuck on top
  if (stickyHeader && hideableHeadline && supportsIntersectionObserver) {
    const observer = new IntersectionObserver(
      ([e]) => stickyHeader.classList.toggle(
        'is-unstuck',
        e.intersectionRatio >= 1
      ),
      {
        threshold: [1]
      }
    );
    observer.observe(stickyHeader);
  }

  if (navOpener) {
    navOpener.addEventListener('click', (e) => {
      e.preventDefault();
      navMenu.setAttribute('aria-expanded', 'true');
      if (typeof navMenu.scrollIntoView === 'function') {
        navMenu.scrollIntoView();
      }
      document.addEventListener('click', (e) => {
        const isClickInside = navOpener.contains(e.target);
        if (!isClickInside) {
          navMenu.setAttribute('aria-expanded', 'false');
          document.onclick = null;
        }
      });
    });
  }

  if (navCloser) {
    navCloser.addEventListener('click', (e) => {
      e.preventDefault();
      navMenu.setAttribute('aria-expanded', 'false')
      document.onclick = null;
    });
  }

  if (languageSwitch) {
    languageSwitch.addEventListener('click', () => {
      languageSwitch.href += window.location.hash;
    });
  }

  const classNameHighContrast = 'high-contrast';
  const prefersMoreContrastQuery = window.matchMedia('(prefers-contrast: more)');
  const prefersMoreContrast = (prefersMoreContrastQuery.matches);
  let activatedMoreContrast = false;
  if (localStorage) {
    activatedMoreContrast = localStorage.getItem('highContrast');
  }
  if (!prefersMoreContrast && !activatedMoreContrast) {
    document.body.classList.remove(classNameHighContrast);
  }
  let contrastToggle = document.getElementById('contrast-toggle');
  if (contrastToggle) {
    contrastToggle.addEventListener('click', function () {
      if (document.body.className.indexOf(classNameHighContrast) > -1) {
        document.body.classList.remove(classNameHighContrast);
        if (localStorage) {
          localStorage.removeItem('highContrast');
        }
        if (contrastToggle.dataset.increasecaption) {
          contrastToggle.title = contrastToggle.dataset.increasecaption;
        }
      } else {
        document.body.classList.add(classNameHighContrast);
        if (localStorage) {
          localStorage.setItem('highContrast', 'true');
        }
        if (contrastToggle.dataset.reducecaption) {
          contrastToggle.title = contrastToggle.dataset.reducecaption;
        }
      }
    });
    if (!prefersMoreContrast && !activatedMoreContrast) {
      contrastToggle.title = contrastToggle.dataset.increasecaption;
    }
  }

  let decorationElement = document.getElementById('decoration');
  if (decorationElement) {
    var randomProperties = [
      '--random-factor-grow-max',
      '--random-factor-grow-delay-top-right',
      '--random-factor-grow-delay-bottom-right',
      '--random-factor-grow-delay-bottom-left',
      '--random-factor-bottom-delay-bottom-left',
      '--random-factor-left-delay-bottom-left',
      '--random-factor-position-left',
      '--random-factor-position-bottom',
    ];
    for (let i = 0; i < randomProperties.length; i++) {
      decorationElement.style.setProperty(randomProperties[i], Math.random());
    }

    let decorationContainer = document.getElementById('decoration');
    // WCAG SC 2.2.2 Pause, Stop, Hide (Level A) makes stop button obsolete if animation stops before 5 seconds
    let animationStopperTimeout = window.setTimeout(function () {
      animationStopperCallback();
    }, 30000); // 1000ms initial (css) delay before animation fades in for the first time
    let animationStopperCallback = function () {
      if (decorationContainer) {
        document.getElementById('decoration').classList.add('decoration--fade-out');
      }
    }

    if (animationToggle) {
      animationToggle.addEventListener('click', () => {
        if (decorationContainer) {
          if (decorationContainer.style.display !== 'none' && !decorationContainer.classList.contains('decoration--fade-out')) {
            document.getElementById('decoration').style.display = 'none';
            window.clearTimeout(animationStopperTimeout);
          } else {
            // no delay before fading in when triggered by user interaction
            document.getElementById('decoration').classList.remove('decoration--fade-out');
            document.getElementById('decoration').style.animationDelay = '0s';
            document.getElementById('decoration').style.display = 'block';
            window.clearTimeout(animationStopperTimeout);
          }
        }
      });
    }
  }

  let _paq = window._paq = window._paq || [];
  // tracker methods like "setCustomDimension" should be called before "trackPageView"
  _paq.push(["setDomains", ["*.ingo-steinke.com", "*.ingo-steinke.de"]]);
  _paq.push(["enableCrossDomainLinking"]);
  _paq.push(['trackPageView']);
  // _paq.push(['enableLinkTracking']); // disable link tracking
  (function () {
    let u = "//www.ingo-steinke.de/matomo/";
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '1']);
    let d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = u + 'matomo.js';
    s.parentNode.insertBefore(g, s);
  })();

  /**
   * @function ajaxPost
   * @return void
   * @param form HTMLFormElement
   */
  const ajaxPost = function (form) {
    try {
      let url = window.location.hostname && window.location.hostname.indexOf('.de') > -1
        ? 'https://www.ingo-steinke.de/contact/send/index.php'
        : 'https://www.ingo-steinke.com/contact/send/index.php';
      let xhr = new XMLHttpRequest();
      if (!xhr) {
        return;
      }

      /** @var {String[]} params */
      let params = [];
      let nameFieldElement = form.querySelector('.contactform-field-name');
      if (nameFieldElement && nameFieldElement.value) {
        params.push('contactform-field-name=' + encodeURIComponent(nameFieldElement.value));
      }
      let emailfonFieldElement = form.querySelector('.contactform-field-emailfon');
      if (emailfonFieldElement && emailfonFieldElement.value) {
        params.push('&contactform-field-emailfon=' + encodeURIComponent(emailfonFieldElement.value));
      }
      let messageFieldElement = form.querySelector('.contactform-field-message');
      if (messageFieldElement && messageFieldElement.value) {
        params.push('&contactform-field-message=' + encodeURIComponent(messageFieldElement.value));
      }
      let messageFieldCaptcha = form.querySelector('.contactform-field-captcha');
      if (messageFieldCaptcha && messageFieldCaptcha.value) {
        params.push('&contactform-field-captcha=' + encodeURIComponent(messageFieldCaptcha.value));
      }
      let messageFieldHomepage = form.querySelector('.contactform-field-homepage');
      if (messageFieldHomepage && messageFieldHomepage.value) {
        params.push('&contactform-field-homepage=' + encodeURIComponent(messageFieldHomepage.value));
      }
      if (params.length === 0) {
        return;
      }
      const paramString = params.join('&');

      xhr.open("POST", url);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("X-Requested-With", "xmlhttprequest");

      form.classList.remove('status-initial', 'status-sent', 'status-error');
      form.classList.add('status-sending');

      xhr.onload = function () {
        if (xhr.status == 200) {
          form.classList.remove('status-initial', 'status-sending', 'status-error');
          form.classList.add('status-sent');
        } else {
          form.classList.remove('status-initial', 'status-sending', 'status-sent');
          form.classList.add('status-error');
        }
      }
      xhr.send(paramString);
      if (window._paq) {
        window._paq.push(['trackEvent', 'actions', 'contact', 'sent']);
      }
    } catch (e) {
      console.error('form send error', e);
      form.classList.remove('status-initial', 'status-sending', 'status-sent');
      form.classList.add('status-error');
      form.classList.add('status-error-catch');
      if (window._paq) {
        let errorText = 'error';
        if (typeof e.toString === 'function') {
          errorText = e.toString();
        }
        window._paq.push(['trackEvent', 'actions', 'contact', 'error', errorText]);
      }
    }
  };

  const contactforms = document.getElementsByClassName('contactform');
  for (let i = 0; i < contactforms.length; i++) {
    contactforms.item(i).onsubmit = function (e) {
      e.preventDefault();
      if (window._paq) {
        window._paq.push(['trackEvent', 'actions', 'contact', 'send']);
      }
      ajaxPost(contactforms.item(i));
    };
  }

  if (
    window.matchMedia &&
    window.matchMedia("(any-pointer: coarse)").matches &&
    document.body.classList &&
    typeof document.body.classList.toggle === 'function'
  ) {
    let flipBoxRows = document.getElementsByClassName('flip-box-row');
    for (let i = 0; i < flipBoxRows.length; i++) {
      flipBoxRows[i].addEventListener('touch', event => {
        event.currentTarget.classList.toggle('active');
      });
    }
  }

  let pdfContainerElement = document.getElementById('pdf-container');
  console.log('pdfContainerElement', pdfContainerElement);
  if (pdfContainerElement) {
    if (window.location.search && typeof URLSearchParams === 'function') {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (urlParams && urlParams.get('pdf') == 'embed') {
        console.log('trying to embed a prepared PDF ...');
        let pdfObjectElement = document.createElement('object');
        pdfObjectElement.setAttribute('data', '/Shopware-6-Certified-Developer-Ingo-Steinke-de.pdf');
        pdfObjectElement.setAttribute('width', '2480');
        pdfObjectElement.setAttribute('height', '3508');
        pdfObjectElement.setAttribute('type', 'application/pdf');
        pdfObjectElement.classList.add('size-din-a4-portrait');
        pdfContainerElement.appendChild(pdfObjectElement);
        pdfContainerElement.classList.remove('initially-hidden');
        console.log('... done embedding!');
      }
    }
  }
});


