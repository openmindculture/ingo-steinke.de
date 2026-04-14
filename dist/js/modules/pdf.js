export function initPdf() {
    const pdfContainer = document.getElementById('pdf-container');
    if (!pdfContainer || !window.location.search || typeof URLSearchParams !== 'function') {
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('pdf') === 'embed') {
        const pdfObject = document.createElement('object');
        pdfObject.setAttribute('data', '/Shopware-6-Certified-Developer-Ingo-Steinke-de.pdf');
        pdfObject.setAttribute('width', '2480');
        pdfObject.setAttribute('height', '3508');
        pdfObject.setAttribute('type', 'application/pdf');
        pdfObject.classList.add('size-din-a4-portrait');
        pdfContainer.appendChild(pdfObject);
        pdfContainer.classList.remove('initially-hidden');
    }
}
