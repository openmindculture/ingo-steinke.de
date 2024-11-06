export function handleContrastToggles() {
  const classNameHighContrast = 'high-contrast';
  const prefersMoreContrastQuery = window.matchMedia('(prefers-contrast: more)');
  const prefersMoreContrast = (prefersMoreContrastQuery.matches);
  let activatedMoreContrast = false;
  if (localStorage) {
    activatedMoreContrast = localStorage.getItem('highContrast');
  }
  if (!prefersMoreContrast && !activatedMoreContrast) {
    document.body.classList.remove(classNameHighContrast);
  }
  let contrastToggle = document.getElementById('contrast-toggle');
  if (contrastToggle) {
    contrastToggle.addEventListener('click', function () {
      if (document.body.className.indexOf(classNameHighContrast) > -1) {
        document.body.classList.remove(classNameHighContrast);
        if (localStorage) {
          localStorage.removeItem('highContrast');
        }
        if (contrastToggle.dataset.increasecaption) {
          contrastToggle.title = contrastToggle.dataset.increasecaption;
        }
      } else {
        document.body.classList.add(classNameHighContrast);
        if (localStorage) {
          localStorage.setItem('highContrast', 'true');
        }
        if (contrastToggle.dataset.reducecaption) {
          contrastToggle.title = contrastToggle.dataset.reducecaption;
        }
      }
    });
    if (!prefersMoreContrast && !activatedMoreContrast) {
      contrastToggle.title = contrastToggle.dataset.increasecaption;
    }
  }
}
