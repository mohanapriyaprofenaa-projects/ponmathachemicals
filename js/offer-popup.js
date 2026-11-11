/* ==========================================================================
   Ponmatha Chemicals – 20% discount offer popup
   - Opens 5 seconds after every page load.
   - After it is closed it opens again every 2 minutes (counted from closing).
   - No saved browser state is used, so it always behaves the same on every visit.
   - Submitting validates the form and opens WhatsApp with a prefilled message.
     The visitor must press Send in WhatsApp to deliver it.
   Change the timing in the OFFER object below.
   Needs: css/offer-popup.css (auto-added if missing) and js/whatsapp.js.
   ========================================================================== */
(function () {
  'use strict';

  /* Where this script lives, so the stylesheet can be found even if the page forgot to link it */
  var SCRIPT_SRC = (document.currentScript && document.currentScript.src) || '';

  var OFFER = {
    percent: 20,
    firstDelaySeconds: 5,     /* first popup, seconds after the page loads */
    repeatMinutes: 2          /* then again every N minutes after it is closed */
  };

  var CATEGORIES = [
    'R BRITE \u2013 Non-PVC Water Base',
    'Aquasol \u2013 Non-PVC Water Base',
    'Creative Non-PVC Water Base & Discharge',
    'R BRITE \u2013 Non-PVC Oil Base / Solvent Base',
    'R BRITE \u2013 Phthalate-Free Inks (PTF)',
    'R BRITE \u2013 Plastisol Inks',
    'Pigments',
    'R BRITE \u2013 Printing Accessories',
    'All Products / Not Sure Yet'
  ];

  var overlay, dialog, form, lastFocus, isOpen = false;

  /* Make sure css/offer-popup.css is present (auto-added if the page did not link it) */
  function ensureStyles() {
    if (document.querySelector('link[href*="offer-popup.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = SCRIPT_SRC ? SCRIPT_SRC.replace(/js\/offer-popup\.js.*$/, 'css/offer-popup.css') : 'css/offer-popup.css';
    document.head.appendChild(link);
  }

  /* ---------- validation ---------- */
  function normaliseMobile(v) {
    var d = String(v || '').replace(/[^\d]/g, '');
    if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
    if (d.length === 11 && d.charAt(0) === '0') d = d.slice(1);
    return /^[6-9]\d{9}$/.test(d) ? d : null;
  }
  function val(name) { return form.elements[name].value.trim(); }
  function setError(name, msg) {
    var f = form.elements[name], wrap = f.closest('.field'), out = wrap.querySelector('.field-error');
    wrap.classList.toggle('has-error', !!msg);
    if (msg) f.setAttribute('aria-invalid', 'true'); else f.removeAttribute('aria-invalid');
    out.textContent = msg || '';
  }
  function validate() {
    var bad = null;
    function check(name, ok, msg) {
      setError(name, ok ? '' : msg);
      if (!ok && !bad) bad = form.elements[name];
    }
    check('name', val('name').length >= 2, 'Please enter your full name.');
    check('mobile', normaliseMobile(val('mobile')) !== null, 'Enter a valid 10-digit mobile number.');
    check('city', val('city').length >= 2, 'Please enter your city or town.');
    if (bad) bad.focus();
    return !bad;
  }

  /* ---------- WhatsApp message ---------- */
  function buildMessage() {
    var none = 'Not provided';
    return [
      'Ponmatha Chemicals \u2013 ' + OFFER.percent + '% Discount Offer Claim',
      '',
      'Hello Ponmatha Chemicals, I would like to claim the ' + OFFER.percent + '% discount offer on all products shown on your website.',
      '',
      'Name: ' + val('name'),
      'Company: ' + (val('company') || none),
      'Mobile: ' + normaliseMobile(val('mobile')),
      'Email: ' + (val('email') || none),
      'City / Location: ' + val('city'),
      'Product Category: ' + (val('product') || 'All Products / Not Sure Yet'),
      'Requirement / Quantity: ' + (val('message') || none),
      '',
      'Please contact me to confirm the offer details and share the quotation.',
      '',
      'Thank you.'
    ].join('\n');
  }

  /* ---------- DOM: used only when the page does not already contain #offer-popup ---------- */
  function build() {
    var opts = CATEGORIES.map(function (c) { return '<option>' + c.replace(/&/g, '&amp;') + '</option>'; }).join('');
    overlay = document.createElement('div');
    overlay.className = 'offer-overlay';
    overlay.id = 'offer-popup';
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="offer-dialog" role="dialog" aria-modal="true" aria-labelledby="offer-title" aria-describedby="offer-desc" tabindex="-1">' +
      '<button type="button" class="offer-close" aria-label="Close offer window"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
      '<aside class="offer-side">' +
      '<p class="offer-brand">Ponmatha Chemicals</p>' +
      '<p class="offer-kicker">Special website offer</p>' +
      '<p class="offer-percent" aria-hidden="true">' + OFFER.percent + '<span>%</span><small>OFF</small></p>' +
      '<h2 id="offer-title">' + OFFER.percent + '% Discount on All Products</h2>' +
      '<p id="offer-desc">Share your details and our team will contact you on WhatsApp to confirm your offer.</p>' +
      '<ul class="offer-points">' +
      '<li><i class="fa-solid fa-circle-check" aria-hidden="true"></i> All 8 product categories</li>' +
      '<li><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Quick reply from our team</li>' +
      '</ul></aside>' +
      '<form class="offer-form" novalidate aria-label="Claim your discount">' +
      '<h3>Claim Your Offer</h3><div class="offer-grid">' +
      '<div class="field"><label for="o-name">Full Name <span class="req" aria-hidden="true">*</span></label><input id="o-name" name="name" type="text" autocomplete="name" required><span class="field-error" role="alert"></span></div>' +
      '<div class="field"><label for="o-mobile">Mobile Number <span class="req" aria-hidden="true">*</span></label><input id="o-mobile" name="mobile" type="tel" inputmode="tel" autocomplete="tel" placeholder="10-digit mobile" required><span class="field-error" role="alert"></span></div>' +
      '<div class="field"><label for="o-company">Company Name</label><input id="o-company" name="company" type="text" autocomplete="organization"><span class="field-error"></span></div>' +
      '<div class="field"><label for="o-city">City / Location <span class="req" aria-hidden="true">*</span></label><input id="o-city" name="city" type="text" autocomplete="address-level2" required><span class="field-error" role="alert"></span></div>' +
      '<div class="field"><label for="o-email">Email Address</label><input id="o-email" name="email" type="email" autocomplete="email"><span class="field-error"></span></div>' +
      '<div class="field"><label for="o-product">Product Category</label><select id="o-product" name="product"><option value="">Select a category</option>' + opts + '</select><span class="field-error"></span></div>' +
      '<div class="field full"><label for="o-message">Requirement / Quantity</label><textarea id="o-message" name="message" rows="2" placeholder="e.g. product names and approximate monthly quantity"></textarea><span class="field-error"></span></div>' +
      '</div>' +
      '<button class="btn btn-wa" type="submit"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Claim Offer via WhatsApp</button>' +
      '<p class="form-status" role="status" aria-live="polite"></p>' +
      '<p class="offer-note">WhatsApp opens with your details prefilled &mdash; press Send to deliver them. Offer details are confirmed by our team.</p>' +
      '</form></div>';
    document.body.appendChild(overlay);
  }

  /* ---------- DOM (markup lives in the page: see offer-popup.html) ---------- */
  function init() {
    ensureStyles();
    overlay = document.getElementById('offer-popup');
    if (!overlay) build();
    dialog = overlay.querySelector('.offer-dialog');
    form = overlay.querySelector('form');
    overlay.querySelector('.offer-close').addEventListener('click', close);
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
    form.addEventListener('submit', onSubmit);
    form.addEventListener('input', function (e) {
      if (e.target.name && form.elements[e.target.name]) setError(e.target.name, '');
    });
    overlay.addEventListener('keydown', trapFocus);
    return true;
  }

  function onSubmit(e) {
    e.preventDefault();
    var status = form.querySelector('.form-status');
    status.textContent = ''; status.className = 'form-status';
    if (!validate()) {
      status.textContent = 'Please fix the highlighted fields.';
      status.className = 'form-status is-error';
      return;
    }
    window.Ponmatha.openWhatsApp(buildMessage());
    status.textContent = 'WhatsApp has opened with your details. Please press Send to claim your offer.';
    status.className = 'form-status is-success';
    window.setTimeout(close, 3500);
  }

  /* ---------- open / close / focus ---------- */
  function focusables() {
    return dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  }
  function trapFocus(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = focusables(); if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function open() {
    if (isOpen) return;
    if (!form && !init()) return;
    isOpen = true;
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add('offer-open');
    window.requestAnimationFrame(function () {
      overlay.classList.add('is-open');
      dialog.focus();
    });
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    schedule(OFFER.repeatMinutes * 60 * 1000); /* next popup */
    overlay.classList.remove('is-open');
    document.body.classList.remove('offer-open');
    window.setTimeout(function () { overlay.hidden = true; }, 250);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- scheduler ---------- */
  var timer = null;
  function schedule(ms) {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      /* do not pop up over the open mobile menu or an already open popup: try again shortly */
      if (isOpen || document.body.classList.contains('menu-open')) { schedule(5000); return; }
      open();
    }, ms);
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!init()) return;
    schedule(OFFER.firstDelaySeconds * 1000);
  });

  /* manual control while testing, from the browser console: PonmathaOffer.open() */
  window.PonmathaOffer = { open: open, close: close, config: OFFER };
})();
