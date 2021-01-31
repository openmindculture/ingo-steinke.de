window.addEventListener('DOMContentLoaded', () => {
  /* elements with visibility controlled by script, like sticky-header,
   * must always stay visible without javascript,
   * so we hide them by script when the document is ready
   */
  const hideables = Array.from(document.getElementsByClassName('scripted hideable'));
  hideables.forEach( hideable => {
    hideable.className = hideable.className.replace('hideable', 'visually-hidden');
  })

  // display sticky headline when header stuck on top
  const stickyHeader = document.getElementById('sticky-header');
  const hideableHeadline = document.getElementById('sticky-headline');
  if (stickyHeader && hideableHeadline) {
    const observer = new IntersectionObserver(
      ([e]) => hideableHeadline.classList.toggle("visually-hidden", e.intersectionRatio >= 1),
      { threshold: [1] }
    );

    observer.observe(stickyHeader);
  } else {
    console.log('no sticky-headline found');
  }
});



