export function initNavigation() {
    const navOpener = document.getElementById('main-menu-toggle');
    const navCloser = document.getElementById('main-menuClose');
    const navMenu = document.getElementById('main-menu');
    if (navOpener && navMenu) {
        navOpener.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.setAttribute('aria-expanded', 'true');
            if (typeof navMenu.scrollIntoView === 'function') {
                navMenu.scrollIntoView();
            }
            const handleOutsideClick = (e) => {
                const isClickInside = navOpener.contains(e.target);
                if (!isClickInside) {
                    navMenu?.setAttribute('aria-expanded', 'false');
                    document.removeEventListener('click', handleOutsideClick);
                }
            };
            document.addEventListener('click', handleOutsideClick);
        });
    }
    if (navCloser && navMenu) {
        navCloser.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.setAttribute('aria-expanded', 'false');
        });
    }
}
