export function enhanceLanguageSwitch() {
  const languageSwitch = document.getElementById('language-switch');
  if (languageSwitch) {
    languageSwitch.addEventListener('click', () => {
      if (window.location.hash && window.location.hash != '#top') {
        var currentHrefParts = languageSwitch.href.split('#');
        languageSwitch.href = currentHrefParts[0] + window.location.hash;
      }
    });
  }
}
