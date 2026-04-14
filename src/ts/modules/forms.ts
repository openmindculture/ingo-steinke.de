import { trackEvent, trackGoal } from './analytics';

interface FormStatus {
  initial: string;
  sending: string;
  sent: string;
  error: string;
  errorCatch: string;
}

const FORM_STATUS: FormStatus = {
  initial: 'status-initial',
  sending: 'status-sending',
  sent: 'status-sent',
  error: 'status-error',
  errorCatch: 'status-error-catch',
};

export function initForms(): void {
  const contactForms = Array.from(document.getElementsByClassName('contactform')) as HTMLFormElement[];

  contactForms.forEach((form: HTMLFormElement): void => {
    form.onsubmit = (e: SubmitEvent): void => {
      e.preventDefault();
      trackEvent('actions', 'contact', 'send');
      ajaxPost(form);
    };
  });

  // Track contact link clicks
  const contactLinks = Array.from(document.getElementsByClassName('contact-link')) as HTMLElement[];

  contactLinks.forEach((link: HTMLElement): void => {
    link.addEventListener('click', (): void => {
      const linkText = link.innerText || '';
      trackEvent('click', '#contact', linkText);
      console.log('tracked button link click with text ' + linkText);
    });
  });
}

function ajaxPost(form: HTMLFormElement): void {
  try {
    const url = getFormSubmitUrl();
    const xhr = new XMLHttpRequest();

    if (!xhr) {
      return;
    }

    const params = buildFormParams(form);

    if (params.length === 0) {
      return;
    }

    setFormStatus(form, FORM_STATUS.sending);

    xhr.open('POST', url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequesT');

    xhr.onload = (): void => {
      if (xhr.status === 200) {
        setFormStatus(form, FORM_STATUS.sent);
        trackGoal(1);
      } else {
        setFormStatus(form, FORM_STATUS.error);
      }
    };

    xhr.send(params);
    trackEvent('actions', 'contact', 'sent');
  } catch (e) {
    console.error('form send error', e);
    setFormStatus(form, FORM_STATUS.error, FORM_STATUS.errorCatch);

    let errorText = 'error';
    if (e instanceof Error) {
      errorText = e.message;
    }
    trackEvent('actions', 'contact', 'error', errorText);
  }
}

function getFormSubmitUrl(): string {
  const isDomain = window.location.hostname?.includes('.de');
  return isDomain
    ? 'https://www.ingo-steinke.de/contact/send/index.php'
    : 'https://www.ingo-steinke.com/contact/send/index.php';
}

function buildFormParams(form: HTMLFormElement): string {
  const params: string[] = [];

  const fields = [
    { selector: '.contactform-field-name', paramName: 'contactform-field-name' },
    { selector: '.contactform-field-emailfon', paramName: 'contactform-field-emailfon' },
    { selector: '.contactform-field-message', paramName: 'contactform-field-message' },
    { selector: '.contactform-field-captcha', paramName: 'contactform-field-captcha' },
    { selector: '.contactform-field-homepage', paramName: 'contactform-field-homepage' },
  ];

  fields.forEach(({ selector, paramName }, index): void => {
    const element = form.querySelector(selector) as HTMLInputElement | null;
    if (element?.value) {
      const prefix = index === 0 ? '' : '&';
      params.push(`${prefix}${paramName}=${encodeURIComponent(element.value)}`);
    }
  });

  if (document.referrer) {
    params.push(`&referrer=${encodeURIComponent(document.referrer)}`);
  }

  return params.join('');
}

function setFormStatus(form: HTMLFormElement, status: string, additionalStatus?: string): void {
  Object.values(FORM_STATUS).forEach((statusClass: string): void => {
    form.classList.remove(statusClass);
  });

  form.classList.add(status);
  if (additionalStatus) {
    form.classList.add(additionalStatus);
  }
}
