const CLASS_NAME_HIGH_CONTRAST = 'high-contrast';
export function initContrast() {
    const prefersMoreContrastQuery = window.matchMedia('(prefers-contrast: more)');
    const prefersMoreContrast = prefersMoreContrastQuery.matches;
    let activatedMoreContrast = false;
    if (localStorage) {
        const stored = localStorage.getItem('highContrast');
        activatedMoreContrast = stored === 'true';
    }
    if (!prefersMoreContrast && !activatedMoreContrast) {
        document.body.classList.remove(CLASS_NAME_HIGH_CONTRAST);
    }
    const contrastToggle = document.getElementById('contrast-toggle');
    if (contrastToggle) {
        contrastToggle.addEventListener('click', () => {
            const isHighContrast = document.body.className.includes(CLASS_NAME_HIGH_CONTRAST);
            if (isHighContrast) {
                document.body.classList.remove(CLASS_NAME_HIGH_CONTRAST);
                localStorage?.removeItem('highContrast');
                if (contrastToggle.dataset.increasecaption) {
                    contrastToggle.title = contrastToggle.dataset.increasecaption;
                }
            }
            else {
                document.body.classList.add(CLASS_NAME_HIGH_CONTRAST);
                localStorage?.setItem('highContrast', 'true');
                if (contrastToggle.dataset.reducecaption) {
                    contrastToggle.title = contrastToggle.dataset.reducecaption;
                }
            }
        });
        if (!prefersMoreContrast && !activatedMoreContrast && contrastToggle.dataset.increasecaption) {
            contrastToggle.title = contrastToggle.dataset.increasecaption;
        }
    }
}
