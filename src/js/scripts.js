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
  if (stickyHeader && hideableHeadline) {
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
    navMenu.setAttribute('aria-expanded', 'true')
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

  if (animationToggle) {
    animationToggle.addEventListener('click', () => {
      document.getElementById('decoration').style.display = 'none';
    });
  }

  var decorationElement = document.getElementById('decoration');
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
    for (var i=0; i<randomProperties.length; i++) {
      decorationElement.style.setProperty(randomProperties[i], Math.random());}
  }

  var _paq = window._paq = window._paq || [];
  // tracker methods like "setCustomDimension" should be called before "trackPageView"
  _paq.push(["setDomains", ["*.ingo-steinke.com", "*.ingo-steinke.de"]]);
  _paq.push(["enableCrossDomainLinking"]);
  _paq.push(['trackPageView']);
  // _paq.push(['enableLinkTracking']); // disable link tracking
  (function() {
    var u="//www.ingo-steinke.de/matomo/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();

});
