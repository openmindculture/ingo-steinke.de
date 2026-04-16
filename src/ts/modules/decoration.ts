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

export function initDecoration(): void {
  const decorationElement = document.getElementById('decoration') as HTMLElement | null;

  if (!decorationElement) {
    return;
  }

  // Set random CSS custom properties
  RANDOM_PROPERTIES.forEach((property: string): void => {
    decorationElement.style.setProperty(property, Math.random().toString());
  });

  let animationStopperTimeout = window.setTimeout((): void => {
    stopAnimation(decorationElement);
  }, ANIMATION_TIMEOUT_DURATION);

  const animationToggles = Array.from(document.getElementsByClassName('animation-toggle')) as HTMLElement[];

  animationToggles.forEach((toggle: HTMLElement): void => {
    toggle.addEventListener('click', (): void => {
      handleAnimationToggle(decorationElement, animationStopperTimeout);
      animationStopperTimeout = window.setTimeout((): void => {
        stopAnimation(decorationElement);
      }, ANIMATION_TIMEOUT_DURATION);
    });
  });
}

function stopAnimation(decorationElement: HTMLElement): void {
  decorationElement.classList.add('decoration--fade-out');
}

function handleAnimationToggle(decorationElement: HTMLElement, timeout: number): void {
  const isHidden = decorationElement.style.display === 'none';
  const isFadingOut = decorationElement.classList.contains('decoration--fade-out');

  if (!isHidden && !isFadingOut) {
    decorationElement.style.display = 'none';
    window.clearTimeout(timeout);
  } else {
    decorationElement.classList.remove('decoration--fade-out');
    decorationElement.style.animationDelay = '0s';
    decorationElement.style.display = 'block';
    window.clearTimeout(timeout);
  }
}
