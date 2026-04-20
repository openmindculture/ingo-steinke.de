import { initVisibility } from './modules/visibility';
import { initNavigation } from './modules/navigation';
import { initContrast } from './modules/contrast';
import { initAnalytics } from './modules/analytics';
import { initForms } from './modules/forms';
import { initAccessibility } from './modules/accessibility';
import { initPdf } from './modules/pdf';

window.addEventListener('DOMContentLoaded', (): void => {
  initVisibility();
  initNavigation();
  initContrast();
  initAnalytics();
  initForms();
  initAccessibility();
  initPdf();
});
