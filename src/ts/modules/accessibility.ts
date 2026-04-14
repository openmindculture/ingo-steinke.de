export function initAccessibility(): void {
  initLanguageSwitch();
  initTouchFlipBoxes();
}

function initLanguageSwitch(): void {
  const languageSwitch = document.getElementById('language-switch') as HTMLAnchorElement | null;

  if (languageSwitch) {
    languageSwitch.addEventListener('click', (): void => {
      if (window.location.hash && window.location.hash !== '#top') {
        const currentHrefParts = languageSwitch.href.split('#');
        languageSwitch.href = currentHrefParts[0] + window.location.hash;
      }
    });
  }
}

function initTouchFlipBoxes(): void {
  if (
    !window.matchMedia ||
    !window.matchMedia('(any-pointer: coarse)').matches ||
    !document.body.classList ||
    typeof document.body.classList.toggle !== 'function'
  ) {
    return;
  }

  const flipBoxRows = Array.from(document.getElementsByClassName('flip-box-row')) as HTMLElement[];

  flipBoxRows.forEach((row: HTMLElement): void => {
    row.addEventListener('touchend', (): void => {
      row.classList.toggle('active');
    });
  });
}
