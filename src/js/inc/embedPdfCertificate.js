export function embedPdfCertificate() {
  let pdfContainerElement = document.getElementById('pdf-container');
  if (pdfContainerElement) {
    if (window.location.search && typeof URLSearchParams === 'function') {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (urlParams && urlParams.get('pdf') == 'embed') {
        let pdfObjectElement = document.createElement('object');
        pdfObjectElement.setAttribute('data', '/Shopware-6-Certified-Developer-Ingo-Steinke-de.pdf');
        pdfObjectElement.setAttribute('width', '2480');
        pdfObjectElement.setAttribute('height', '3508');
        pdfObjectElement.setAttribute('type', 'application/pdf');
        pdfObjectElement.classList.add('size-din-a4-portrait');
        pdfContainerElement.appendChild(pdfObjectElement);
        pdfContainerElement.classList.remove('initially-hidden');
      }
    }
  }
}
