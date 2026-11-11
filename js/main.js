/* ==========================================================================
   Ponmatha Chemicals – shared components and site-wide interactions
   Depends on whatsapp.js (window.Ponmatha)
   ========================================================================== */
(function () {
  'use strict';

  var P = window.Ponmatha;
  var C = P.config;

  var NAV = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Products', href: 'products.html' },
    { label: 'Contact', href: 'contact.html' }
  ];

  function currentPage() {
    var file = window.location.pathname.split('/').pop();
    return file === '' ? 'index.html' : file;
  }

  /* ---------- Header ---------- */
  function renderHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;
    var page = currentPage();
    var links = NAV.map(function (item) {
      var active = item.href === page;
      return '<li><a class="nav-link' + (active ? ' is-active' : '') + '" href="' + item.href + '"' +
        (active ? ' aria-current="page"' : '') + '>' + item.label + '</a></li>';
    }).join('');

    host.className = 'site-header';
    host.innerHTML =
      '<div class="container header-inner">' +
        '<a class="brand" href="index.html" aria-label="Ponmatha Chemicals – Home">' +
          /* Logo: single replaceable path. Original proportions, no frame. */
          '<span class="brand-logo"><img src="assets/images/logo/ponmatha-logo.png" alt="Ponmatha Chemicals logo" width="60" height="77"></span>' +
          '<span class="brand-text"><strong>Ponmatha Chemicals</strong><small>Printing Dyes, Chemicals &amp; Accessories</small></span>' +
        '</a>' +
        '<button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav">' +
          '<span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span>' +
        '</button>' +
        '<nav class="primary-nav" id="primary-nav" aria-label="Main navigation">' +
          '<ul class="nav-list">' + links +
            '<li class="nav-cta-item"><a class="btn btn-gold btn-sm" data-wa="quote">Get a Quote</a></li>' +
          '</ul>' +
        '</nav>' +
      '</div>';

    var toggle = host.querySelector('.nav-toggle');
    var nav = host.querySelector('.primary-nav');

    function setMenu(open) {
      nav.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
    }

    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) setMenu(false);
    });
    window.addEventListener('scroll', function () {
      host.classList.toggle('is-scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;
    host.className = 'site-footer';
    var phones = C.phones.map(function (p) {
      return '<a href="tel:' + p.tel + '">' + p.display + '</a>';
    }).join('');
    var quick = NAV.map(function (n) {
      return '<li><a href="' + n.href + '">' + n.label + '</a></li>';
    }).join('');

    host.innerHTML =
      '<div class="container footer-grid">' +
        '<div class="footer-col footer-about">' +
          '<h3>Ponmatha Chemicals</h3>' +
          '<p class="footer-tag">Printing Dyes, Chemicals &amp; Accessories.</p>' +
          '<p>A reliable partner for your chemical requirements.</p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h3>Quick Links</h3>' +
          '<ul class="footer-links">' + quick + '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h3>Contact</h3>' +
          '<address class="footer-address">' + C.addressLines.join('<br>') + '</address>' +
          '<p class="footer-label">Phone</p>' +
          '<p class="footer-stack">' + phones + '</p>' +
          '<p class="footer-label">Email</p>' +
          '<p class="footer-stack"><a href="mailto:' + C.email + '">' + C.email + '</a></p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h3>Brochure</h3>' +
          '<p>Explore our complete product range.</p>' +
          '<a class="btn btn-gold btn-sm" href="' + C.brochurePath + '" download>' +
            '<i class="fa-solid fa-file-pdf" aria-hidden="true"></i> Download Brochure</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom"><div class="container footer-bottom-inner">' +
        '<p>&copy; <span id="year"></span> Ponmatha Chemicals. All Rights Reserved.</p>' +
        '<p><a href="https://' + C.website + '" target="_blank" rel="noopener">' + C.website + '</a></p>' +
      '</div></div>';

    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Floating WhatsApp + back to top ---------- */
  function renderFloaters() {
    var wa = document.createElement('a');
    wa.className = 'wa-float';
    wa.setAttribute('data-wa', 'general');
    wa.setAttribute('aria-label', 'Chat with Ponmatha Chemicals on WhatsApp');
    wa.innerHTML = '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span class="wa-tip">Chat with Us</span>';
    document.body.appendChild(wa);

    var top = document.createElement('button');
    top.type = 'button';
    top.className = 'to-top';
    top.setAttribute('aria-label', 'Back to top');
    top.innerHTML = '<i class="fa-solid fa-chevron-up" aria-hidden="true"></i>';
    document.body.appendChild(top);
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', function () {
      top.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ---------- Photo slots: show a tidy placeholder if the file is missing ---------- */
  function initImageSlots() {
    if (/[?&]slots/.test(window.location.search)) document.documentElement.classList.add('show-slots');

    function markMissing(img) {
      var slot = img.closest('.img-slot');
      if (slot) slot.classList.add('is-missing');
    }
    var imgs = document.querySelectorAll('.img-slot img');
    Array.prototype.forEach.call(imgs, function (img) {
      img.addEventListener('error', function () { markMissing(img); });
      if (img.complete && img.naturalWidth === 0) markMissing(img);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderFooter();
    renderFloaters();
    P.bindWhatsApp(document);
    initReveal();
    initImageSlots();
  });
})();
