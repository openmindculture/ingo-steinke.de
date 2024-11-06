export function handleAnimationToggles() {
  const animationToggles = document.getElementsByClassName('animation-toggle');

  let decorationElement = document.getElementById('decoration');
  if (decorationElement) {
    var randomProperties = [
      '--random-factor-grow-max',
      '--random-factor-grow-delay-top-right',
      '--random-factor-grow-delay-bottom-right',
      '--random-factor-grow-delay-bottom-left',
      '--random-factor-bottom-delay-bottom-left',
      '--random-factor-left-delay-bottom-left',
      '--random-factor-position-left',
      '--random-factor-position-bottom',
    ];
    for (let i = 0; i < randomProperties.length; i++) {
      decorationElement.style.setProperty(randomProperties[i], Math.random());
    }

    let decorationContainer = document.getElementById('decoration');
    // WCAG SC 2.2.2 Pause, Stop, Hide (Level A) makes stop button obsolete if animation stops before 5 seconds
    let animationStopperTimeout = window.setTimeout(function () {
      animationStopperCallback();
    }, 30000); // 1000ms initial (css) delay before animation fades in for the first time
    let animationStopperCallback = function () {
      if (decorationContainer) {
        document.getElementById('decoration').classList.add('decoration--fade-out');
      }
    }

    for (let a = 0; a < animationToggles.length; a++) {
      let animationToggle = animationToggles[a];
      animationToggle.addEventListener('click', () => {
        if (decorationContainer) {
          if (decorationContainer.style.display !== 'none' && !decorationContainer.classList.contains('decoration--fade-out')) {
            document.getElementById('decoration').style.display = 'none';
            window.clearTimeout(animationStopperTimeout);
          } else {
            // no delay before fading in when triggered by user interaction
            document.getElementById('decoration').classList.remove('decoration--fade-out');
            document.getElementById('decoration').style.animationDelay = '0s';
            document.getElementById('decoration').style.display = 'block';
            window.clearTimeout(animationStopperTimeout);
          }
        }
      });
    }
  }
}
