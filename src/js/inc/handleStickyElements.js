/*
 * Progressive enhancement:
 * DOM elements with visibility controlled by script, like sticky-header,
 * must always stay visible without javascript,
 * so we hide them by script when the document is ready
 */

export function handleStickyElements() {
  /** @var {Array.<HTMLElement>} */
  const hideables = Array.from(document.getElementsByClassName('scripted hideable'));
  const stickyHeader = document.getElementById('sticky-header');
  const hideableHeadline = document.getElementById('sticky-headline');
  const supportsIntersectionObserver = (('IntersectionObserver' in window) &&
    ('IntersectionObserverEntry' in window) &&
    ('intersectionRatio' in window.IntersectionObserverEntry.prototype) &&
    ('isIntersecting' in window.IntersectionObserverEntry.prototype)
  );

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
}
