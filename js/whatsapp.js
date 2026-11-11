/* ==========================================================================
   Ponmatha Chemicals – central configuration + WhatsApp helpers
   Change the WhatsApp number in ONE place: CONFIG.whatsappNumber
   (country code + number, digits only, no + or spaces)
   ========================================================================== */
(function () {
  'use strict';

  var CONFIG = {
    companyName: 'Ponmatha Chemicals',
    whatsappNumber: '919894444433',
    brochurePath: 'assets/documents/Ponmatha_Chemicals_Brochure_Final.pdf',
    phones: [
      { display: '989 44444 33', tel: '+919894444433' },
      { display: '994 44508 77', tel: '+919944450877' }
    ],
    email: 'ponmathachemicals@gmail.com',
    website: 'www.ponmathachemicals.com',
    addressLines: [
      'No. 20, Chellammal Colony,',
      '4th Street, Samundipuram,',
      'Gandhi Nagar Post,',
      'Tirupur - 641 603.'
    ],
    addressOneLine:
      'No. 20, Chellammal Colony, 4th Street, Samundipuram, Gandhi Nagar Post, Tirupur - 641 603'
  };

  /* Ready-made messages used by data-wa="key" buttons */
  var MESSAGES = {
    general:
      'Hello Ponmatha Chemicals, I visited your website and would like to know more about your printing dyes, chemicals and accessories. Please share further details.',
    quote:
      'Hello Ponmatha Chemicals, I would like to get a quote for your printing chemicals. Please contact me with details on availability and pricing.',
    contact:
      'Hello Ponmatha Chemicals, I would like to discuss my printing chemical requirement with your team. Please get in touch with me.',
    documentation:
      'Hello Ponmatha Chemicals, I would like to request product documentation (MSDS / TDS and available certification references) for the products I am interested in. Please share the details.',
    requirement:
      'Hello Ponmatha Chemicals, I would like to discuss my application requirements and understand which products would suit them. Please help me with suitable options.'
  };

  function buildLink(message) {
    return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(message);
  }

  function openWhatsApp(message) {
    window.open(buildLink(message), '_blank', 'noopener');
  }

  /* Point every [data-wa] / [data-wa-text] element at WhatsApp */
  function bindWhatsApp(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-wa], [data-wa-text]');
    Array.prototype.forEach.call(nodes, function (el) {
      var text = el.getAttribute('data-wa-text') || MESSAGES[el.getAttribute('data-wa')] || MESSAGES.general;
      el.setAttribute('href', buildLink(text));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  window.Ponmatha = {
    config: CONFIG,
    messages: MESSAGES,
    buildLink: buildLink,
    openWhatsApp: openWhatsApp,
    bindWhatsApp: bindWhatsApp
  };
})();
