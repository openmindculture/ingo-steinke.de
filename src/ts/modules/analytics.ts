declare global {
  /* eslint-disable no-unused-vars */
  interface Window {
    _paq?: Array<unknown[]>;
  }
}

export function initAnalytics(): void {
  const _paq = (window._paq = window._paq || []);

  _paq.push(['setDomains', ['*.ingo-steinke.com', '*.ingo-steinke.de']]);
  _paq.push(['enableCrossDomainLinking']);
  _paq.push(['trackPageView']);

  loadMatomoScript(_paq);
}

function loadMatomoScript(_paq: Array<unknown[]>): void {
  const u = '//www.ingo-steinke.de/matomo/';
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  _paq.push(['setSiteId', '1']);

  const document_ref = document;
  const g = document_ref.createElement('script');
  const s = document_ref.getElementsByTagName('script')[0];

  g.async = true;
  g.src = u + 'matomo.js';

  if (s && s.parentNode) {
    s.parentNode.insertBefore(g, s);
  }
}

export function trackEvent(category: string, action: string, name: string, value?: string): void {
  if (window._paq) {
    window._paq.push(['trackEvent', category, action, name, value]);
  }
}

export function trackGoal(goalId: number): void {
  if (window._paq) {
    window._paq.push(['trackGoal', goalId]);
  }
}
