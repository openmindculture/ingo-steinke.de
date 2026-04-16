const RANDOM_PROPERTIES = [
    '--random-factor-grow-max',
    '--random-factor-grow-delay-top-right',
    '--random-factor-grow-delay-bottom-right',
    '--random-factor-grow-delay-bottom-left',
    '--random-factor-bottom-delay-bottom-left',
    '--random-factor-left-delay-bottom-left',
    '--random-factor-position-left',
    '--random-factor-position-bottom',
];
const ANIMATION_TIMEOUT_DURATION = 30000;
export function initDecoration() {
    const decorationElement = document.getElementById('decoration');
    if (!decorationElement) {
        return;
    }
    // Set random CSS custom properties
    RANDOM_PROPERTIES.forEach((property) => {
        decorationElement.style.setProperty(property, Math.random().toString());
    });
    let animationStopperTimeout = window.setTimeout(() => {
        stopAnimation(decorationElement);
    }, ANIMATION_TIMEOUT_DURATION);
    const animationToggles = Array.from(document.getElementsByClassName('animation-toggle'));
    animationToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            handleAnimationToggle(decorationElement, animationStopperTimeout);
            animationStopperTimeout = window.setTimeout(() => {
                stopAnimation(decorationElement);
            }, ANIMATION_TIMEOUT_DURATION);
        });
    });
}
function stopAnimation(decorationElement) {
    decorationElement.classList.add('decoration--fade-out');
}
function handleAnimationToggle(decorationElement, timeout) {
    const isHidden = decorationElement.style.display === 'none';
    const isFadingOut = decorationElement.classList.contains('decoration--fade-out');
    if (!isHidden && !isFadingOut) {
        decorationElement.style.display = 'none';
        window.clearTimeout(timeout);
    }
    else {
        decorationElement.classList.remove('decoration--fade-out');
        decorationElement.style.animationDelay = '0s';
        decorationElement.style.display = 'block';
        window.clearTimeout(timeout);
    }
}
