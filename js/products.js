/* ==========================================================================
   Ponmatha Chemicals – product catalogue (products.html)
   Every product name and documentation badge below is taken from the
   company brochure (Ponmatha_Chemicals_Brochure_Final.pdf, pages 6-9).
   Badges appear ONLY where the brochure shows them against a product.
   ========================================================================== */
(function () {
  'use strict';

  var DOC_OEKO_ZDHC = ['OEKO-TEX', 'ZDHC', 'MSDS', 'TDS'];
  var DOC_GOTS = ['GOTS V-7.0', 'OEKO-TEX', 'MSDS', 'TDS'];
  var DOC_MSDS_TDS = ['MSDS', 'TDS'];

  /* p(name, docs) – docs optional */
  function p(name, docs) { return { name: name, docs: docs || [] }; }
  function list(names, docs) { return names.map(function (n) { return p(n, docs); }); }

  var CATEGORIES = [
    {
      id: 1, slug: 'r-brite-water-base', icon: 'fa-droplet',
      name: 'R BRITE \u2013 Non-PVC Water Base',
      shortName: 'R BRITE Water Base',
      desc: 'Our manufacturing brand: whites, clears, foam, black & pastes.',
      image: 'assets/images/products/non-pvc-water-base.jpg',
      alt: 'Water-based textile printing ink being prepared',
      cta: { title: 'Looking for the right R BRITE product?', text: 'Tell us your application \u2014 we will help you shortlist.', btn: 'Tell Us Your Application' },
      groups: [
        { title: 'R BRITE SERIES', items: list(['R BRITE SPL WHITE', 'R BRITE SPL CLEAR', 'R BRITE SMART WHITE', 'R BRITE SMART CLEAR', 'R BRITE NON PVC FOAM', 'R BRITE PALLET GUM', 'R BRITE NON PVC Colors']) },
        { title: 'R BRITE IMPORTED SERIES', items: list(['R1 WHITE', 'R1 CLEAR', 'R2 WHITE', 'R2 CLEAR']) },
        { title: 'AQUASOFT SERIES', items: list(['AQUASOFT E180 WHITE', 'AQUASOFT E180 CLEAR', 'AQUASOFT E150 WHITE', 'AQUASOFT E150 CLEAR']) },
        { title: 'ECOBRIGHT SERIES', items: list(['ECOBRIGHT FOIL PASTE', 'ECOBRIGHT GLITTER GEL', 'ECOBRIGHT SILVER PASTE', 'ECOBRIGHT GOLD PASTE']) }
      ]
    },
    {
      id: 2, slug: 'aquasol', icon: 'fa-flask',
      name: 'Aquasol \u2013 Non-PVC Water Base',
      shortName: 'Aquasol',
      desc: 'Rubber, aqua & flock systems with fixers and pastes.',
      image: 'assets/images/products/aquasol-water-base.jpg',
      alt: 'Rubber and flock textile printing on fabric',
      cta: { title: 'Need documentation for these products?', text: 'Ask us for the relevant OEKO-TEX / ZDHC / MSDS / TDS references.', btn: 'Request Documentation', wa: 'documentation' },
      groups: [
        {
          title: null, items: [].concat(
            list(['AQUASOL RUBBERLITE WHITE LX', 'AQUASOL RUBBERLITE CLEAR LX', 'AQUASOL AQUALITE WHITE', 'AQUASOL AQUALITE CLEAR', 'AQUASOL AQUAPLAS WHITE S (NEW)', 'AQUASOL AQUAPLAS CLEAR S (NEW)', 'AQUASOL RUBBER WHITE ATM', 'AQUASOL FIXER X', 'AQUASOL FLOCK PASTE', 'AQUASOL GLITTER PASTE'], DOC_OEKO_ZDHC),
            [p('AQUASOL ALL COLOURS', DOC_MSDS_TDS)],
            [p('AQUASOL ANTI MIGRATION SEALER G (POLY GREY)', DOC_OEKO_ZDHC)],
            list(['SILVER PASTE', 'GOLD PASTE', 'ORBISOL HB600 PUFF'])
          )
        }
      ]
    },
    {
      id: 3, slug: 'creative', icon: 'fa-shirt',
      name: 'Creative Non-PVC Water Base & Discharge',
      shortName: 'Creative & Discharge',
      desc: 'Deluxe, Dynamic & Premier series.',
      image: 'assets/images/products/nonpvcwaterbase.jpg',
      alt: 'Discharge and soft-touch fabric printing',
      cta: { title: 'Need documentation for these products?', text: 'Ask us for the relevant GOTS / OEKO-TEX / MSDS / TDS and certification references.', btn: 'Request Documentation', wa: 'documentation' },
      groups: [
        {
          title: null, items: [].concat(
            list(['DELUXE WHITE', 'DELUXE CLEAR', 'DYNAMIC WHITE', 'DYNAMIC CLEAR', 'PREMIER WHITE', 'PREMIER CLEAR', 'H2 BLACK', 'WB RFU ECO DISCHARGE WHITE', 'EB RFU SOFT TOUCH', 'WB RFU SOFT TOUCH WHITE (CONC)', 'WB RFU SOFT TOUCH SPL'], DOC_GOTS),
            [p('MO ACTIVATOR')],
            [p('H2 REDTAR (NON PVC ANTI CHOKE OIL)', DOC_GOTS)]
          )
        }
      ]
    },
    {
      id: 4, slug: 'oil-base', icon: 'fa-oil-can',
      name: 'R BRITE \u2013 Non-PVC Oil Base / Solvent Base',
      shortName: 'Oil Base',
      desc: 'Colours, bases, gels, reducers and process colours.',
      image: 'assets/images/products/non-pvc-oil-base.jpg',
      rangeDocs: { docs: DOC_MSDS_TDS, text: 'Documentation reference shown for this range in our brochure:' },
      cta: { title: 'Not sure which base or gel you need?', text: 'Share your requirement \u2014 our team will coordinate suitable options.', btn: 'Share Your Requirement', wa: 'requirement' },
      alt: 'Screen printing with solvent base inks',
      groups: [
        { title: null, items: list(['R BRITE WHITE', 'R BRITE ALL COLOURS', 'R BRITE HD BASE', 'R BRITE GEL', 'R BRITE SOFT BASE', 'R BRITE REDUCER', 'R BRITE FOAM BASE', 'R BRITE SPECIAL GEL', 'R BRITE POLY GREY', 'R BRITE METALLIC GOLD PASTE', 'R BRITE ALL FL COLOURS', 'R BRITE PROCESS COLOUR', 'THICKENER POWDER']) }
      ]
    },
    {
      id: 5, slug: 'ptf', icon: 'fa-leaf',
      name: 'R BRITE \u2013 Phthalate-Free Inks (PTF)',
      shortName: 'PTF Inks',
      desc: 'PTF series of colours, bases, gels and metallic gold paste.',
      image: 'assets/images/products/phthalate-free-inks.jpg',
      alt: 'Phthalate-free printing inks on a screen',
      rangeDocs: { docs: ['MSDS'], text: 'Documentation reference shown for this range in our brochure:' },
      cta: { title: 'Not sure which base or gel you need?', text: 'Share your requirement \u2014 our team will coordinate suitable options.', btn: 'Share Your Requirement', wa: 'requirement' },
      groups: [
        { title: null, items: list(['PTF WHITE', 'PTF ALL COLOURS', 'PTF HD BASE', 'PTF GEL', 'PTF SOFT BASE', 'PTF REDUCER', 'PTF FOAM BASE', 'PTF SPECIAL GEL', 'PTF POLY GREY', 'PTF METALLIC GOLD PASTE', 'PTF ALL FL COLOURS', 'PTF PROCESS COLOUR']) }
      ]
    },
    {
      id: 6, slug: 'plastisol', icon: 'fa-fill-drip',
      name: 'R BRITE \u2013 Plastisol Inks',
      shortName: 'Plastisol',
      desc: 'PVC whites, colours, fluorescents, gels, foam and glitter gel.',
      image: 'assets/images/products/platisol-inks.jpg',
      alt: 'Plastisol ink printed on a garment',
      cta: { title: 'Not sure which base or gel you need?', text: 'Share your requirement \u2014 our team will coordinate suitable options.', btn: 'Share Your Requirement', wa: 'requirement' },
      groups: [
        { title: null, items: list(['PVC WHITE', 'PVC ALL COLOURS', 'PVC ALL FL COLOURS', 'PVC HD BASE', 'PVC HD GEL', 'PVC FOAM BASE', 'PVC REDUCER', 'PVC GLITTER GEL', 'PVC POLY GREY']) }
      ]
    },
    {
      id: 7, slug: 'pigments', icon: 'fa-palette',
      name: 'Pigments',
      shortName: 'Pigments',
      desc: 'Pigments, binders, thickeners and fixers from leading names.',
      image: 'assets/images/products/pigments.jpg',
      alt: 'Coloured pigment powders',
      cta: { title: 'Need documentation for these products?', text: 'Ask us for the relevant GOTS / OEKO-TEX / MSDS / TDS and certification references.', btn: 'Request Documentation', wa: 'documentation' },
      groups: [
        { title: null, items: list(['PIDILITE ALL PIGMENT', 'PIDILITE BINDER', 'PIDILITE THICKENER', 'PIDILITE FIXER', 'SUDARSHAN ALL PIGMENTS'], DOC_GOTS) }
      ]
    },
    {
      id: 8, slug: 'accessories', icon: 'fa-toolbox',
      name: 'R BRITE \u2013 Printing Accessories',
      shortName: 'Accessories',
      desc: 'Emulsions, meshes, rubbers, adhesives, films, foils & glitters.',
      image: 'assets/images/products/printing-accessories.jpg',
      alt: 'Screen printing mesh frames and squeegees',
      cta: { title: 'Everything for your print room', text: 'Inks, meshes, rubbers and consumables \u2014 coordinated in one place.', btn: 'Discuss Your Requirement', wa: 'requirement' },
      groups: [
        { title: 'R BRITE PRINTING ACCESSORIES', items: list(['COATING EMULSION', 'HARDENER', 'GUM TAPE', 'ADHESIVE', 'FILMS', 'SCRAPER RUBBER', 'SQUEEZEE RUBBER']) },
        { title: 'MESHES, FOILS & MORE', items: list(['IMPORTED T MESH', 'MONO POLYESTER MESH', 'NYLON MESH', 'SPRAY GUM', 'PALLET PAPER', 'WHITE OIL', 'FOIL PAPERS', 'GLITTERS', 'ALUMINIUM COATING TROUGH']) }
      ]
    }
  ];

  var state = { category: 'all', query: '' };
  var els = {};

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function highlight(name, q) {
    if (!q) return esc(name);
    var i = name.toLowerCase().indexOf(q);
    if (i === -1) return esc(name);
    return esc(name.slice(0, i)) + '<mark>' + esc(name.slice(i, i + q.length)) + '</mark>' + esc(name.slice(i + q.length));
  }

  function countProducts(cat) {
    return cat.groups.reduce(function (n, g) { return n + g.items.length; }, 0);
  }

  function badges(docs) {
    if (!docs.length) return '';
    return '<ul class="doc-badges" aria-label="Documentation references">' +
      docs.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>';
  }

  /* Enquiries open the contact page form (no WhatsApp). The form reads these query values and prefills itself. */
  function contactLink(params) {
    var q = Object.keys(params).map(function (k) { return k + '=' + encodeURIComponent(params[k]); }).join('&');
    return 'contact.html?' + q + '#contact-form';
  }

  function productLink(product, cat) {
    return contactLink({ category: cat.name, product: product.name });
  }

  function categoryLink(cat) {
    var msg = cat.cta.wa === 'documentation'
      ? 'I would like to request product documentation (MSDS / TDS and available certification references) for products under ' + cat.name + '.'
      : 'I would like to enquire about products under ' + cat.name + '. Please help me with suitable options, availability and pricing.';
    return contactLink({ category: cat.name, message: msg });
  }

  /* ---------- Rendering ---------- */
  function renderChips() {
    var chips = CATEGORIES.map(function (c) {
      return { key: String(c.id), label: c.name };
    });
    els.chips.innerHTML = chips.map(function (c) {
      var active = String(state.category) === c.key;
      return '<button type="button" class="chip' + (active ? ' is-active' : '') + '" data-cat="' + c.key + '" aria-pressed="' + active + '">' +
        '<span class="chip-num">' + ('0' + c.key).slice(-2) + '</span>' + esc(c.label) + '</button>';
    }).join('');
  }

  function renderCatalogue() {
    var q = state.query.trim().toLowerCase();
    var total = 0;
    var html = '';

    CATEGORIES.forEach(function (cat) {
      if (state.category !== 'all' && String(cat.id) !== String(state.category)) return;

      var groupsHtml = '';
      var catCount = 0;

      cat.groups.forEach(function (g) {
        var items = g.items.filter(function (it) { return !q || it.name.toLowerCase().indexOf(q) !== -1; });
        /* Every product inherits its category's image. A series (group) may optionally override it with g.image. */
        var groupImage = g.image || cat.image;
        if (!items.length) return;
        catCount += items.length;
        groupsHtml +=
          '<div class="product-group">' +
            (g.title ? '<h4 class="group-title">' + esc(g.title) + '</h4>' : '') +
            '<ul class="product-grid">' +
              items.map(function (it) {
                var link = productLink(it, cat);
                return '<li class="product-card">' +
                  '<div class="product-thumb img-slot" data-slot="' + esc(groupImage) + '">' +
                    '<img src="' + groupImage + '" alt="' + esc(cat.alt) + '" loading="lazy">' +
                    '<span class="product-cat-tag">' + ('0' + cat.id).slice(-2) + ' \u00b7 ' + esc(cat.shortName || cat.name) + '</span>' +
                  '</div>' +
                  '<div class="product-body">' +
                    '<h5 class="product-name">' + highlight(it.name, q) + '</h5>' +
                    badges(it.docs) +
                  '</div>' +
                  '<a class="product-enquire" href="' + link + '" aria-label="Request a quote for ' + esc(it.name) + '">' +
                    '<i class="fa-solid fa-file-invoice" aria-hidden="true"></i> Request Quote <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>' +
                '</li>';
              }).join('') +
            '</ul>' +
          '</div>';
      });

      if (!catCount) return;
      total += catCount;

      var rangeDocs = cat.rangeDocs
        ? '<p class="range-docs">' + esc(cat.rangeDocs.text) + ' ' + cat.rangeDocs.docs.map(function (d) { return '<strong>' + esc(d) + '</strong>'; }).join(' / ') + '</p>'
        : '';

      var ctaLink = categoryLink(cat);

      html +=
        '<section class="catalogue-category" id="cat-' + cat.id + '" aria-labelledby="cat-' + cat.id + '-title">' +
          '<div class="category-banner img-slot" data-slot="' + esc(cat.image) + '">' +
            '<img src="' + cat.image + '" alt="' + esc(cat.alt) + '" loading="lazy">' +
            '<div class="category-banner-text">' +
              '<span class="category-num">Category ' + ('0' + cat.id).slice(-2) + '</span>' +
              '<h3 id="cat-' + cat.id + '-title">' + esc(cat.name) + '</h3>' +
              '<p>' + esc(cat.desc) + '</p>' +
              '<span class="category-count">' + countProducts(cat) + ' products listed</span>' +
            '</div>' +
          '</div>' +
          rangeDocs +
          groupsHtml +
          '<div class="category-cta">' +
            '<div><h4>' + esc(cat.cta.title) + '</h4><p>' + esc(cat.cta.text) + '</p></div>' +
            '<a class="btn btn-gold" href="' + ctaLink + '"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i> ' + esc(cat.cta.btn) + '</a>' +
          '</div>' +
        '</section>';
    });

    els.catalogue.innerHTML = html;
    els.empty.hidden = total !== 0;
    els.catalogue.hidden = total === 0;
    els.clear.hidden = state.query === '';

    var scope = state.category === 'all' ? 'all categories' : 'the selected category';
    els.count.textContent = total === 0
      ? ''
      : 'Showing ' + total + ' product' + (total === 1 ? '' : 's') + ' in ' + scope + (q ? ' matching \u201c' + state.query.trim() + '\u201d' : '') + '.';
    if (els.emptyQuery) els.emptyQuery.textContent = state.query.trim();

    /* re-run photo fallback for freshly created banners */
    Array.prototype.forEach.call(els.catalogue.querySelectorAll('.img-slot img'), function (img) {
      var slot = img.closest('.img-slot');
      img.addEventListener('error', function () { slot.classList.add('is-missing'); });
      if (img.complete && img.naturalWidth === 0) slot.classList.add('is-missing');
    });
  }

  function setCategory(key) {
    state.category = key;
    renderChips();
    renderCatalogue();
  }

  function clearAll() {
    state.query = '';
    els.search.value = '';
    setCategory('all');
    els.search.focus();
  }

  function categoryFromHash() {
    var m = /^#cat-(\d)$/.exec(window.location.hash);
    return m && CATEGORIES[Number(m[1]) - 1] ? m[1] : null;
  }

  document.addEventListener('DOMContentLoaded', function () {
    els.chips = document.getElementById('category-chips');
    els.catalogue = document.getElementById('catalogue');
    if (!els.chips || !els.catalogue) return; /* not the products page */

    els.search = document.getElementById('product-search');
    els.clear = document.getElementById('clear-search');
    els.count = document.getElementById('result-count');
    els.empty = document.getElementById('no-results');
    els.emptyQuery = document.getElementById('no-results-query');

    els.chips.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip');
      if (!btn) return;
      setCategory(btn.getAttribute('data-cat'));
      var top = document.getElementById('catalogue-top');
      if (top) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    els.search.addEventListener('input', function () {
      state.query = els.search.value;
      renderCatalogue();
    });
    els.clear.addEventListener('click', clearAll);
    var showAll = document.getElementById('show-all');
    if (showAll) showAll.addEventListener('click', function () { setCategory('all'); });
    var resetBtn = document.getElementById('reset-filters');
    if (resetBtn) resetBtn.addEventListener('click', clearAll);

    window.addEventListener('hashchange', function () {
      var c = categoryFromHash();
      if (c) { state.query = ''; els.search.value = ''; setCategory(c); }
    });

    var start = categoryFromHash();
    state.category = start || 'all';
    renderChips();
    renderCatalogue();
    if (start) {
      var top = document.getElementById('catalogue-top');
      if (top) setTimeout(function () { top.scrollIntoView({ block: 'start' }); }, 50);
    }
  });
})();
