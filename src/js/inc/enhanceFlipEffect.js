export function enhanceFlipEffect() {
  if (
    window.matchMedia &&
    window.matchMedia("(any-pointer: coarse)").matches &&
    document.body.classList &&
    typeof document.body.classList.toggle === 'function'
  ) {
    let flipBoxRows = document.getElementsByClassName('flip-box-row');
    for (let i = 0; i < flipBoxRows.length; i++) {
      flipBoxRows[i].addEventListener('touch', event => {
        event.currentTarget.classList.toggle('active');
      });
    }
  }
}
