export function enhanceFormSubmit() {
  /**
   * @function ajaxPost
   * @return void
   * @param form HTMLFormElement
   */
  const ajaxPost = function (form) {
    try {
      let url = window.location.hostname && window.location.hostname.indexOf('.de') > -1
        ? 'https://www.ingo-steinke.de/contact/send/index.php'
        : 'https://www.ingo-steinke.com/contact/send/index.php';
      let xhr = new XMLHttpRequest();
      if (!xhr) {
        return;
      }

      /** @var {String[]} params */
      let params = [];
      let nameFieldElement = form.querySelector('.contactform-field-name');
      if (nameFieldElement && nameFieldElement.value) {
        params.push('contactform-field-name=' + encodeURIComponent(nameFieldElement.value));
      }
      let emailfonFieldElement = form.querySelector('.contactform-field-emailfon');
      if (emailfonFieldElement && emailfonFieldElement.value) {
        params.push('&contactform-field-emailfon=' + encodeURIComponent(emailfonFieldElement.value));
      }
      let messageFieldElement = form.querySelector('.contactform-field-message');
      if (messageFieldElement && messageFieldElement.value) {
        params.push('&contactform-field-message=' + encodeURIComponent(messageFieldElement.value));
      }
      let messageFieldCaptcha = form.querySelector('.contactform-field-captcha');
      if (messageFieldCaptcha && messageFieldCaptcha.value) {
        params.push('&contactform-field-captcha=' + encodeURIComponent(messageFieldCaptcha.value));
      }
      let messageFieldHomepage = form.querySelector('.contactform-field-homepage');
      if (messageFieldHomepage && messageFieldHomepage.value) {
        params.push('&contactform-field-homepage=' + encodeURIComponent(messageFieldHomepage.value));
      }
      if (params.length === 0) {
        return;
      }
      const paramString = params.join('&');

      xhr.open("POST", url);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("X-Requested-With", "xmlhttprequest");

      form.classList.remove('status-initial', 'status-sent', 'status-error');
      form.classList.add('status-sending');

      xhr.onload = function () {
        if (xhr.status == 200) {
          form.classList.remove('status-initial', 'status-sending', 'status-error');
          form.classList.add('status-sent');
        } else {
          form.classList.remove('status-initial', 'status-sending', 'status-sent');
          form.classList.add('status-error');
        }
      }
      xhr.send(paramString);
      if (window._paq) {
        window._paq.push(['trackEvent', 'actions', 'contact', 'sent']);
      }
    } catch (e) {
      console.error('form send error', e);
      form.classList.remove('status-initial', 'status-sending', 'status-sent');
      form.classList.add('status-error');
      form.classList.add('status-error-catch');
      if (window._paq) {
        let errorText = 'error';
        if (typeof e.toString === 'function') {
          errorText = e.toString();
        }
        window._paq.push(['trackEvent', 'actions', 'contact', 'error', errorText]);
      }
    }
  };

  const contactforms = document.getElementsByClassName('contactform');
  for (let i = 0; i < contactforms.length; i++) {
    contactforms.item(i).onsubmit = function (e) {
      e.preventDefault();
      if (window._paq) {
        window._paq.push(['trackEvent', 'actions', 'contact', 'send']);
      }
      ajaxPost(contactforms.item(i));
    };
  }
}
