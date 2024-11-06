import {embedPdfCertificate} from './inc/embedPdfCertificate';
import {enhanceFlipEffect} from './inc/enhanceFlipEffect';
import {enhanceFormSubmit} from './inc/enhanceFormSubmit';
import {enhanceLanguageSwitch} from './inc/enhanceLanguageSwitch';
import {enhanceMobileMenu} from './inc/enhanceMobileMenu';
import {handleAnimationToggles} from './inc/handleAnimationToggles';
import {handleContrastToggles} from './inc/handleContrastToggles';
import {handleStickyElements} from './inc/handleStickyElements';
import {trackPageVisit} from "./inc/trackPageVisit";

window.addEventListener('DOMContentLoaded', () => {
  enhanceMobileMenu();
  enhanceLanguageSwitch();
  handleStickyElements();
  handleAnimationToggles();
  handleContrastToggles();
  enhanceFlipEffect();
  enhanceFormSubmit();
  embedPdfCertificate();
  trackPageVisit();
});


