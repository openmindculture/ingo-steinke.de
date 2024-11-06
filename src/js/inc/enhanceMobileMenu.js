export function enhanceMobileMenu() {
  const navOpener = document.getElementById('main-menu-toggle');
  const navCloser = document.getElementById('main-menuClose');
  const navMenu = document.getElementById('main-menu');

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
}
