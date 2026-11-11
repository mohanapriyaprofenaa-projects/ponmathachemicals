/* ==========================================================================
   Ponmatha Chemicals – reusable enquiry form handler
   Used by the homepage form and the contact page form.
   Markup: <form data-enquiry-form data-variant="home|contact"> ... </form>
   No backend: the form validates, builds a message and opens WhatsApp.
   The visitor must press Send in WhatsApp to deliver the message.
   ========================================================================== */
(function () {
  'use strict';

  var NOT_PROVIDED = 'Not provided';

  /* Accepts 10-digit Indian mobiles (6-9 start), optionally prefixed by +91, 91 or 0 */
  function normaliseMobile(value) {
    var digits = String(value || '').replace(/[^\d]/g, '');
    if (digits.length === 12 && digits.indexOf('91') === 0) digits = digits.slice(2);
    if (digits.length === 11 && digits.charAt(0) === '0') digits = digits.slice(1);
    return /^[6-9]\d{9}$/.test(digits) ? digits : null;
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function val(form, name) {
    var el = form.elements[name];
    return el ? el.value.trim() : '';
  }

  function setError(form, name, message) {
    var field = form.elements[name];
    if (!field) return;
    var wrap = field.closest('.field');
    var msg = wrap && wrap.querySelector('.field-error');
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      if (wrap) wrap.classList.add('has-error');
      if (msg) msg.textContent = message;
    } else {
      field.removeAttribute('aria-invalid');
      if (wrap) wrap.classList.remove('has-error');
      if (msg) msg.textContent = '';
    }
  }

  function validate(form) {
    var ok = true;
    var firstBad = null;

    function check(name, cond, message) {
      if (!form.elements[name]) return;
      if (cond) {
        setError(form, name, '');
      } else {
        setError(form, name, message);
        ok = false;
        if (!firstBad) firstBad = form.elements[name];
      }
    }

    check('name', val(form, 'name').length >= 2, 'Please enter your full name.');
    check('mobile', normaliseMobile(val(form, 'mobile')) !== null, 'Enter a valid 10-digit mobile number.');
    var email = val(form, 'email');
    check('email', email === '' || isEmail(email), 'Enter a valid email address or leave it blank.');
    check('message', val(form, 'message').length >= 5, 'Please describe your requirement.');

    if (firstBad) firstBad.focus();
    return ok;
  }

  function buildMessage(form) {
    var variant = form.getAttribute('data-variant') || 'home';
    var name = val(form, 'name');
    var company = val(form, 'company') || NOT_PROVIDED;
    var mobile = normaliseMobile(val(form, 'mobile'));
    var email = val(form, 'email') || NOT_PROVIDED;
    var product = val(form, 'product') || 'General Enquiry';
    var message = val(form, 'message');

    if (variant === 'contact') {
      return [
        'Hello Ponmatha Chemicals,',
        '',
        'I am interested in your products and would like to enquire.',
        '',
        'Name: ' + name,
        'Company: ' + company,
        'Mobile: ' + mobile,
        'Email: ' + email,
        'Product Category: ' + product,
        'Requirement: ' + message,
        '',
        'Please contact me with further details.',
        '',
        'Thank you.'
      ].join('\n');
    }

    return [
      'Ponmatha Chemicals \u2013 Website Enquiry',
      '',
      'Name: ' + name,
      'Company: ' + company,
      'Mobile: ' + mobile,
      'Interested Product: ' + product,
      'Requirement: ' + message,
      '',
      'Please contact me regarding this enquiry.'
    ].join('\n');
  }

  function handleSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var status = form.querySelector('.form-status');
    if (status) { status.textContent = ''; status.className = 'form-status'; }

    if (!validate(form)) {
      if (status) {
        status.textContent = 'Please fix the highlighted fields and try again.';
        status.className = 'form-status is-error';
      }
      return;
    }

    window.Ponmatha.openWhatsApp(buildMessage(form));

    if (status) {
      status.textContent =
        'WhatsApp has opened with your enquiry. Please press Send in WhatsApp to deliver it to our team.';
      status.className = 'form-status is-success';
    }
  }

  /* Prefill the contact form from ?category=&product=&message= (used by Request Quote buttons) */
  function prefill(form) {
    var params = new URLSearchParams(window.location.search);
    var category = params.get('category');
    var product = params.get('product');
    var message = params.get('message');
    var sel = form.elements['product'];
    if (category && sel) {
      Array.prototype.forEach.call(sel.options, function (o) {
        if (o.text.trim() === category.trim()) sel.value = o.value || o.text;
      });
    }
    if (!message && product) {
      message = 'I would like to enquire about ' + product + (category ? ' under ' + category : '') +
        '. Please share the availability, product details and pricing.';
    }
    if (message && form.elements['message'] && !form.elements['message'].value) form.elements['message'].value = message;
    var note = document.getElementById('form-prefill');
    if (note && (product || category)) {
      note.textContent = 'Enquiry for: ' + (product || category);
      note.hidden = false;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var forms = document.querySelectorAll('form[data-enquiry-form]');
    Array.prototype.forEach.call(forms, function (form) {
      form.setAttribute('novalidate', 'novalidate');
      if (form.getAttribute('data-variant') === 'contact') prefill(form);
      form.addEventListener('submit', handleSubmit);
      /* clear an error as soon as the visitor edits the field */
      form.addEventListener('input', function (e) {
        if (e.target.name) setError(form, e.target.name, '');
      });
    });
  });
})();
