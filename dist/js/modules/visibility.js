function checkIntersectionObserverSupport() {
    const supported = 'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
        'isIntersecting' in window.IntersectionObserverEntry.prototype;
    return { supported };
}
export function initVisibility() {
    // Progressive enhancement: DOM elements with visibility controlled by script
    // must always stay visible without javascript
    const hideables = Array.from(document.getElementsByClassName('scripted hideable'));
    hideables.forEach((hideable) => {
        hideable.className = hideable.className.replace('hideable', 'unsticky-hidden');
    });
    const stickyHeader = document.getElementById('sticky-header');
    const hideableHeadline = document.getElementById('sticky-headline');
    const { supported } = checkIntersectionObserverSupport();
    if (stickyHeader && hideableHeadline && supported) {
        const observer = new IntersectionObserver(([entry]) => {
            stickyHeader.classList.toggle('is-unstuck', entry.intersectionRatio >= 1);
        }, { threshold: [1] });
        observer.observe(stickyHeader);
    }
}
