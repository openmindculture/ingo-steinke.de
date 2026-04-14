export function initNavigation(): void {
  const navOpener = document.getElementById('main-menu-toggle');
  const navCloser = document.getElementById('main-menuClose');
  const navMenu = document.getElementById('main-menu');

  if (navOpener && navMenu) {
    navOpener.addEventListener('click', (e: MouseEvent): void => {
      e.preventDefault();
      navMenu.setAttribute('aria-expanded', 'true');

      if (typeof navMenu.scrollIntoView === 'function') {
        navMenu.scrollIntoView();
      }

      const handleOutsideClick = (e: MouseEvent): void => {
        const isClickInside = navOpener.contains(e.target as Node);
        if (!isClickInside) {
          navMenu?.setAttribute('aria-expanded', 'false');
          document.removeEventListener('click', handleOutsideClick);
        }
      };

      document.addEventListener('click', handleOutsideClick);
    });
  }

  if (navCloser && navMenu) {
    navCloser.addEventListener('click', (e: MouseEvent): void => {
      e.preventDefault();
      navMenu.setAttribute('aria-expanded', 'false');
    });
  }
}
