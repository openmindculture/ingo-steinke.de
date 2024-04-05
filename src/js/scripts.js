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
  const supportsIntersectionObserver =  (('IntersectionObserver' in window) &&
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

  navCloser.addEventListener('click', (e) => {
    e.preventDefault();
    navMenu.setAttribute('aria-expanded', 'false')
    document.onclick = null;
  });

  languageSwitch.addEventListener('click', () => {
    languageSwitch.href += window.location.hash;
  });

  const classNameHighContrast = 'high-contrast';
  const prefersMoreContrastQuery = window.matchMedia('(prefers-contrast: more)');
  const prefersMoreContrast = (prefersMoreContrastQuery.matches);
  if (!prefersMoreContrast) {
    document.body.classList.remove(classNameHighContrast);
  }
  let contrastToggle = document.getElementById('contrast-toggle');
  if (contrastToggle) {
    contrastToggle.addEventListener('click',function(){
      if (document.body.className.indexOf(classNameHighContrast)>-1) {
        document.body.classList.remove(classNameHighContrast);
        if (contrastToggle.dataset.increasecaption) {
          contrastToggle.title = contrastToggle.dataset.increasecaption;
        }
      } else {
        document.body.classList.add(classNameHighContrast);
        if (contrastToggle.dataset.reducecaption) {
          contrastToggle.title = contrastToggle.dataset.reducecaption;
        }
      }
    });
    if (!prefersMoreContrast) {
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
    for (let i=0; i<randomProperties.length; i++) {
      decorationElement.style.setProperty(randomProperties[i], Math.random());
    }

    let decorationContainer = document.getElementById('decoration');
    // WCAG SC 2.2.2 Pause, Stop, Hide (Level A) makes stop button obsolete if animation stops before 5 seconds
    let animationStopperTimeout = window.setTimeout(function(){
      animationStopperCallback();
    },30000); // 1000ms initial (css) delay before animation fades in for the first time
    let animationStopperCallback = function() {
      if (decorationContainer) {
        document.getElementById('decoration').classList.add('decoration--fade-out');
      }
    }

    if (animationToggle) {
      animationToggle.addEventListener('click', () => {
        if (decorationContainer) {
          if (decorationContainer.style.display !=='none' && !decorationContainer.classList.contains('decoration--fade-out')) {
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
  (function() {
    let u="//www.ingo-steinke.de/matomo/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    let d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();

  /**
   * @function ajaxPost
   * @return void
   * @param form HTMLFormElement
   * @param callback function
   */
  const ajaxPost = function(form) {
    try {
      let url = form.action;
      let xhr = new XMLHttpRequest();
      let messageFormSending = form.querySelector('.contactform-message-sending');
      let messageFormSent = form.querySelector('.contactform-message-sent');
      let messageFormError = form.querySelector('.contactform-message-error');
      let submitRow = form.querySelector('.contactform-row-submit');
      if (!xhr || !messageFormSending || !messageFormSending.classList) { return; }
      /* only send data from known form fields */
      let params = '';
      if (document.getElementById('contactform-field-name')) {
        params += '&contactform-field-name='+encodeURIComponent(document.getElementById('contactform-field-name').value);
      }
      if (document.getElementById('contactform-field-emailfon')) {
        params += '&contactform-field-emailfon='+encodeURIComponent(document.getElementById('contactform-field-emailfon').value);
      }
      if (document.getElementById('contactform-field-message')) {
        params += '&contactform-field-message='+encodeURIComponent(document.getElementById('contactform-field-message').value);
      }
      if (document.getElementById('contactform-field-captcha')) {
        params += '&contactform-field-captcha='+encodeURIComponent(document.getElementById('contactform-field-captcha').value);
      }
      if (document.getElementById('contactform-field-homepage')) {
        params += '&contactform-field-homepage='+encodeURIComponent(document.getElementById('contactform-field-homepage').value);
      }

      xhr.open("POST", url);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("X-Requested-With", "xmlhttprequest");

      submitRow.classList.add('initially-hidden');
      messageFormError.classList.add('initially-hidden');
      messageFormSending.classList.remove('initially-hidden');

      xhr.onload = function(){
        messageFormSending.classList.add('initially-hidden');
        if (xhr.status == 200) {
          messageFormSent.classList.remove('initially-hidden');
          messageFormError.classList.add('initially-hidden');
        } else {
          messageFormError.classList.remove('initially-hidden');
          submitRow.classList.remove('initially-hidden');
        }
      }
      xhr.send(params);
      // TODO track matomo event: sent
      // TODO add classes for "deactivating" the send button
    } catch(e) {
      console.error(e);
      let messageFormError = form.querySelector('.contactform-message-error');
      if (messageFormError) {
        messageFormError.classList.remove('initially-hidden');
      }
      let submitRow = form.querySelector('.contactform-row-submit');
      if (submitRow) {
        submitRow.classList.remove('initially-hidden');
      }
    }
  };

  const contactforms = document.getElementsByClassName('contactform');
  for (let i=0; i < contactforms.length; i++) {
    contactforms.item(i).onsubmit = function(e) {
      e.preventDefault();
      // TODO track matomo event: ready to send
      ajaxPost(contactforms.item(i));
    };
  }

});
