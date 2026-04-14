export function initAccessibility() {
    initLanguageSwitch();
    initTouchFlipBoxes();
}
function initLanguageSwitch() {
    const languageSwitch = document.getElementById('language-switch');
    if (languageSwitch) {
        languageSwitch.addEventListener('click', () => {
            if (window.location.hash && window.location.hash !== '#top') {
                const currentHrefParts = languageSwitch.href.split('#');
                languageSwitch.href = currentHrefParts[0] + window.location.hash;
            }
        });
    }
}
function initTouchFlipBoxes() {
    if (!window.matchMedia ||
        !window.matchMedia('(any-pointer: coarse)').matches ||
        !document.body.classList ||
        typeof document.body.classList.toggle !== 'function') {
        return;
    }
    const flipBoxRows = Array.from(document.getElementsByClassName('flip-box-row'));
    flipBoxRows.forEach((row) => {
        row.addEventListener('touchend', () => {
            row.classList.toggle('active');
        });
    });
}
