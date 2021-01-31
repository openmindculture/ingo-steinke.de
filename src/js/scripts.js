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

  navOpener.onclick = (e) => {
    e.preventDefault();
    navMenu.ariaExpanded = 'true';
  }
  navCloser.onclick = (e) => {
    e.preventDefault();
    navMenu.ariaExpanded = 'false';
  }
});



