window.addEventListener('DOMContentLoaded', () => {

  const hideables = Array.from(document.getElementsByClassName('scripted hideable'));
  const stickyHeader = document.getElementById('sticky-header');
  const hideableHeadline = document.getElementById('sticky-headline');
  const navOpener = document.getElementById('main-menu-toggle');
  const navCloser = document.getElementById('main-menu-close');
  const navMenu = document.getElementById('main-menu');

  /* elements with visibility controlled by script, like sticky-header,
   * must always stay visible without javascript,
   * so we hide them by script when the document is ready
   */

  hideables.forEach( hideable => {
    hideable.className = hideable.className.replace(
      'hideable',
      'unsticky-hidden'
    );
  })

  // display sticky headline when header stuck on top

  if (stickyHeader && hideableHeadline) {
    const observer = new IntersectionObserver(
      ([e]) => stickyHeader.classList.toggle(
        "is-unstuck",
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
      const isClickInside = navMenu.contains(e.target) || navOpener.contains(e.target);
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
});
