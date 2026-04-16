import { initVisibility } from './modules/visibility';
import { initNavigation } from './modules/navigation';
import { initContrast } from './modules/contrast';
import { initDecoration } from './modules/decoration';
import { initAnalytics } from './modules/analytics';
import { initForms } from './modules/forms';
import { initAccessibility } from './modules/accessibility';
import { initPdf } from './modules/pdf';
window.addEventListener('DOMContentLoaded', () => {
    initVisibility();
    initNavigation();
    initContrast();
    initDecoration();
    initAnalytics();
    initForms();
    initAccessibility();
    initPdf();
});
