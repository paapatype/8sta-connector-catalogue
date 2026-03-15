/**
 * 8STA Motorsport Connector Catalogue — Application Logic
 * Faceted filtering, comparison, quote builder, part number decoder
 */

(function () {
  'use strict';

  // === STATE ===
  const state = {
    filters: {
      shellSize: [],
      orientation: [],
      density: [],
      variant: []
    },
    searchQuery: '',
    filteredProducts: [],
    compareList: [],      // product IDs, max 3
    quoteBasket: [],       // { productId, quantity }
    highlightedProduct: null
  };

  const MAX_COMPARE = 3;
  let searchDebounce = null;

  // === INITIALIZATION ===
  function init() {
    initTheme();
    state.filteredProducts = [...PRODUCTS];
    renderFilters();
    renderProducts();
    initPartNumberDecoder();
    loadQuoteFromStorage();
    handleHashOnLoad();
    setupEventListeners();
    updateProductCount();
  }

  // === THEME ===
  function initTheme() {
    const saved = localStorage.getItem('8sta-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('8sta-theme', next);
    // Re-render products to update SVG colors
    renderProducts();
  }

  // === FILTER RENDERING ===
  function getUniqueValues(field) {
    const values = [...new Set(PRODUCTS.map(p => p[field]))];
    if (field === 'shellSize') {
      return values.sort((a, b) => parseInt(a) - parseInt(b));
    }
    return values.sort();
  }

  function renderFilters() {
    const container = document.getElementById('filter-groups');
    const filterConfig = [
      { key: 'shellSize', label: 'Shell Size' },
      { key: 'orientation', label: 'Orientation' },
      { key: 'density', label: 'Density' },
      { key: 'variant', label: 'Variant' }
    ];

    let html = '';
    for (const cfg of filterConfig) {
      const values = getUniqueValues(cfg.key);
      html += `<div class="filter-group">
        <span class="filter-group-label">${cfg.label}</span>
        <div class="filter-chips">`;
      for (const val of values) {
        let label = val;
        if (cfg.key === 'shellSize') label = `Shell ${val}`;
        else if (cfg.key === 'orientation' && val.includes('Socket')) label = 'Socket';
        html += `<button class="filter-chip" data-dimension="${cfg.key}" data-value="${val}">${label}</button>`;
      }
      html += '</div></div>';
    }

    container.innerHTML = html;

    // Attach click handlers
    container.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const dim = chip.dataset.dimension;
        const val = chip.dataset.value;
        toggleFilter(dim, val);
        chip.classList.toggle('active');
        applyFiltersAndSearch();
      });
    });
  }

  function toggleFilter(dimension, value) {
    const arr = state.filters[dimension];
    const idx = arr.indexOf(value);
    if (idx >= 0) {
      arr.splice(idx, 1);
    } else {
      arr.push(value);
    }
    updateFilterBadge();
  }

  function clearAllFilters(skipRender) {
    for (const key of Object.keys(state.filters)) {
      state.filters[key] = [];
    }
    state.searchQuery = '';
    document.getElementById('search-input').value = '';

    document.querySelectorAll('.filter-chip.active').forEach(c => c.classList.remove('active'));
    updateFilterBadge();
    if (!skipRender) applyFiltersAndSearch();
  }

  function getActiveFilterCount() {
    return Object.values(state.filters).reduce((sum, arr) => sum + arr.length, 0);
  }

  function updateFilterBadge() {
    const count = getActiveFilterCount();
    const badge = document.getElementById('filter-badge');
    const clearBtn = document.getElementById('btn-clear-filters');

    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'inline-flex';
      clearBtn.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
      clearBtn.style.display = 'none';
    }
  }

  // === FILTER & SEARCH LOGIC ===
  function filterProducts(products) {
    return products.filter(p => {
      for (const [key, values] of Object.entries(state.filters)) {
        if (values.length === 0) continue;
        if (!values.includes(p[key])) return false;
      }
      return true;
    });
  }

  function searchProducts(products, query) {
    if (!query) return products;
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return products.filter(p => {
      const str = [
        p.partNumber, p.name, p.description, p.shellSize,
        p.orientation, p.density, p.variant, p.wireGauge,
        p.contactCount + ' contacts', p.bodyMaterial, p.plating
      ].join(' ').toLowerCase();
      return tokens.every(t => str.includes(t));
    });
  }

  function applyFiltersAndSearch() {
    const filtered = filterProducts(PRODUCTS);
    state.filteredProducts = searchProducts(filtered, state.searchQuery);
    renderProducts();
    updateProductCount();
    updateHash();
  }

  // === PRODUCT RENDERING ===
  function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    if (state.filteredProducts.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#9678;</div>
          <div class="empty-state-text">No connectors match your filters</div>
          <div class="empty-state-sub">Try removing some filters or adjusting your search</div>
        </div>`;
      return;
    }

    state.filteredProducts.forEach((product, i) => {
      grid.appendChild(createProductCard(product, i));
    });
  }

  function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${Math.min(index, 11) * 0.04}s`;

    if (state.highlightedProduct === product.id) {
      card.classList.add('highlight');
    }

    const isCompared = state.compareList.includes(product.id);
    const inQuote = state.quoteBasket.some(item => item.productId === product.id);
    const isSocket = product.orientation.includes('Socket');
    const orientClass = isSocket ? 'socket' : 'plug';
    const orientLabel = isSocket ? 'Socket' : 'Plug';

    card.innerHTML = `
      <div class="card-image">
        ${ConnectorSVG.generate(product)}
        <span class="card-shell-badge">Shell ${product.shellSize}</span>
      </div>
      <div class="card-body">
        <div class="card-part-number">${product.partNumber}</div>
        <div class="card-name">${product.name}</div>
        <div class="card-specs">
          <span class="spec-tag">${product.contactCount} contacts</span>
          <span class="spec-tag">${product.wireGauge}</span>
          ${product.density !== 'Standard' ? `<span class="spec-tag accent">${product.density}</span>` : ''}
          ${product.variant !== 'Standard' ? `<span class="spec-tag accent">${product.variant}</span>` : ''}
        </div>
        <div class="card-meta">
          <span class="card-weight">${product.weight}g</span>
          <span class="card-orientation ${orientClass}">${orientLabel}</span>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn-compare ${isCompared ? 'active' : ''}" data-action="compare" data-id="${product.id}">
          &#x229E; Compare
        </button>
        <button class="btn-quote ${inQuote ? 'active' : ''}" data-action="quote" data-id="${product.id}">
          + Quote
        </button>
      </div>`;

    // Card click -> detail modal (not on buttons)
    card.addEventListener('click', (e) => {
      if (!e.target.closest('[data-action]')) {
        openProductModal(product);
      }
    });

    // Button clicks
    card.querySelector('[data-action="compare"]').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCompare(product.id);
    });

    card.querySelector('[data-action="quote"]').addEventListener('click', (e) => {
      e.stopPropagation();
      addToQuote(product.id);
    });

    return card;
  }

  function updateProductCount() {
    const el = document.getElementById('product-count');
    const total = PRODUCTS.length;
    const shown = state.filteredProducts.length;
    el.textContent = shown === total ? `${total} products` : `${shown} / ${total} products`;
  }

  // === PRODUCT DETAIL MODAL ===
  function openProductModal(product) {
    const modal = document.getElementById('product-modal');
    const isCompared = state.compareList.includes(product.id);
    const inQuote = state.quoteBasket.some(item => item.productId === product.id);

    const specs = [
      ['Shell Size', product.shellSize],
      ['Contacts', product.contactCount],
      ['Contact Size', `Size ${product.contactSize} (${getContactDiameter(product.contactSize)})`],
      ['Wire Gauge', product.wireGauge],
      ['Orientation', product.orientation],
      ['Density', product.density],
      ['Variant', product.variant],
      ['Body Material', product.bodyMaterial],
      ['Plating', product.plating],
      ['Mating Cycles', product.matingCycles],
      ['IP Rating', product.ipRating],
      ['Temp Range', product.tempRange],
      ['Coupling', product.coupling],
      ['Weight', `${product.weight}g`]
    ];

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title">${product.partNumber}</span>
          <button class="modal-close" data-close>&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-grid">
            <div class="detail-svg-wrap">
              ${ConnectorSVG.generate(product)}
            </div>
            <div class="detail-info">
              <div class="detail-part-number">${product.partNumber}</div>
              <div class="detail-description">${product.description}</div>
              <div class="detail-specs">
                ${specs.map(([label, value]) => `
                  <div class="detail-spec">
                    <span class="detail-spec-label">${label}</span>
                    <span class="detail-spec-value">${value}</span>
                  </div>
                `).join('')}
              </div>
              <div class="detail-actions">
                <button class="btn-action btn-action-primary" data-action="detail-quote" data-id="${product.id}">
                  ${inQuote ? '&#10003; In Quote' : '+ Add to Quote'}
                </button>
                <button class="btn-action btn-action-secondary ${isCompared ? 'active' : ''}" data-action="detail-compare" data-id="${product.id}">
                  &#x229E; ${isCompared ? 'Comparing' : 'Compare'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    modal.querySelector('[data-close]').addEventListener('click', () => closeModal('product-modal'));
    modal.querySelector('[data-action="detail-quote"]').addEventListener('click', () => {
      addToQuote(product.id);
      openProductModal(product); // re-render
    });
    modal.querySelector('[data-action="detail-compare"]').addEventListener('click', () => {
      toggleCompare(product.id);
      openProductModal(product); // re-render
    });

    openModal('product-modal');
  }

  function getContactDiameter(size) {
    const map = { '26': '0.4mm', '24': '0.6mm', '20': '1.0mm', '16': '1.5mm', '12': '2.0mm', '08': '2.5mm', '04': '4.0mm' };
    return map[size] || size;
  }

  // === MODAL HELPERS ===
  function openModal(id) {
    const el = document.getElementById(id);
    el.style.display = 'flex';
    requestAnimationFrame(() => el.classList.add('open'));
    document.body.style.overflow = 'hidden';

    // Close on overlay click
    el.addEventListener('click', function handler(e) {
      if (e.target === el) {
        closeModal(id);
        el.removeEventListener('click', handler);
      }
    });
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    el.classList.remove('open');
    setTimeout(() => {
      el.style.display = 'none';
      // Restore scroll if no other modals open
      const anyOpen = document.querySelector('.modal-overlay.open');
      if (!anyOpen) document.body.style.overflow = '';
    }, 250);
  }

  // === COMPARISON ===
  function toggleCompare(productId) {
    const idx = state.compareList.indexOf(productId);
    if (idx >= 0) {
      state.compareList.splice(idx, 1);
    } else {
      if (state.compareList.length >= MAX_COMPARE) {
        state.compareList.shift(); // remove oldest
      }
      state.compareList.push(productId);
    }
    updateCompareTray();
    renderProducts(); // refresh card active states
  }

  function updateCompareTray() {
    const tray = document.getElementById('compare-tray');
    if (state.compareList.length === 0) {
      tray.classList.remove('visible');
      return;
    }

    tray.classList.add('visible');
    const items = state.compareList.map(id => {
      const p = PRODUCTS.find(p => p.id === id);
      return `<span class="compare-thumb">
        ${p.partNumber}
        <span class="remove" data-remove-compare="${id}">&times;</span>
      </span>`;
    }).join('');

    tray.innerHTML = `
      <div class="compare-tray-inner">
        <div class="compare-items">${items}</div>
        <div class="compare-tray-actions">
          <button class="btn-compare-open" ${state.compareList.length < 2 ? 'disabled' : ''} id="btn-open-compare">
            Compare (${state.compareList.length})
          </button>
          <button class="btn-compare-clear" id="btn-clear-compare">Clear</button>
        </div>
      </div>`;

    // Event listeners
    tray.querySelectorAll('[data-remove-compare]').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleCompare(btn.dataset.removeCompare);
      });
    });

    const openBtn = document.getElementById('btn-open-compare');
    if (openBtn) openBtn.addEventListener('click', openCompareModal);

    const clearBtn = document.getElementById('btn-clear-compare');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      state.compareList = [];
      updateCompareTray();
      renderProducts();
    });
  }

  function openCompareModal() {
    if (state.compareList.length < 2) return;

    const products = state.compareList.map(id => PRODUCTS.find(p => p.id === id));
    const modal = document.getElementById('compare-modal');

    const specRows = [
      { label: 'Part Number', key: 'partNumber', mono: true },
      { label: 'Shell Size', key: 'shellSize' },
      { label: 'Contacts', key: 'contactCount' },
      { label: 'Contact Size', fn: p => `Size ${p.contactSize} (${getContactDiameter(p.contactSize)})` },
      { label: 'Wire Gauge', key: 'wireGauge' },
      { label: 'Orientation', key: 'orientation' },
      { label: 'Density', key: 'density' },
      { label: 'Variant', key: 'variant' },
      { label: 'Plating', key: 'plating' },
      { label: 'IP Rating', key: 'ipRating' },
      { label: 'Temp Range', key: 'tempRange' },
      { label: 'Coupling', key: 'coupling' },
      { label: 'Weight', fn: p => `${p.weight}g` },
      { label: 'Mating Cycles', key: 'matingCycles' }
    ];

    let tableHTML = '';

    // Header row with SVGs
    tableHTML += `<div class="comparison-row header-row">
      <div class="comparison-label"></div>
      ${products.map(p => `
        <div class="comparison-cell" style="text-align:center;">
          <div style="width:80px;height:80px;margin:0 auto 8px;">${ConnectorSVG.generate(p)}</div>
          <div class="part-num">${p.partNumber}</div>
        </div>
      `).join('')}
    </div>`;

    // Spec rows
    for (const row of specRows) {
      const values = products.map(p => row.fn ? row.fn(p) : String(p[row.key]));
      const allSame = values.every(v => v === values[0]);
      const diffClass = allSame ? '' : ' diff';

      tableHTML += `<div class="comparison-row${diffClass}">
        <div class="comparison-label">${row.label}</div>
        ${values.map(v => `<div class="comparison-cell"><span class="cell-value">${v}</span></div>`).join('')}
      </div>`;
    }

    modal.innerHTML = `
      <div class="modal-content wide">
        <div class="modal-header">
          <span class="modal-title">Compare Connectors</span>
          <button class="modal-close" data-close>&times;</button>
        </div>
        <div class="modal-body" style="padding:0;">
          <div class="comparison-table">${tableHTML}</div>
        </div>
      </div>`;

    modal.querySelector('[data-close]').addEventListener('click', () => closeModal('compare-modal'));
    openModal('compare-modal');
  }

  // === QUOTE BUILDER ===
  function addToQuote(productId) {
    const existing = state.quoteBasket.find(item => item.productId === productId);
    if (existing) {
      existing.quantity++;
    } else {
      state.quoteBasket.push({ productId, quantity: 1 });
    }
    saveQuoteToStorage();
    updateQuoteBadge();
    renderProducts();
  }

  function removeFromQuote(productId) {
    state.quoteBasket = state.quoteBasket.filter(item => item.productId !== productId);
    saveQuoteToStorage();
    updateQuoteBadge();
    renderProducts();
  }

  function updateQuoteBadge() {
    const badge = document.getElementById('quote-badge');
    const total = state.quoteBasket.reduce((sum, item) => sum + item.quantity, 0);
    if (total > 0) {
      badge.textContent = total;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }

  function saveQuoteToStorage() {
    try {
      sessionStorage.setItem('8sta-quote', JSON.stringify(state.quoteBasket));
    } catch (e) { /* ignore */ }
  }

  function loadQuoteFromStorage() {
    try {
      const saved = sessionStorage.getItem('8sta-quote');
      if (saved) {
        state.quoteBasket = JSON.parse(saved);
        updateQuoteBadge();
      }
    } catch (e) { /* ignore */ }
  }

  function openQuoteModal() {
    const modal = document.getElementById('quote-modal');

    if (state.quoteBasket.length === 0) {
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <span class="modal-title">Quote Request</span>
            <button class="modal-close" data-close>&times;</button>
          </div>
          <div class="modal-body">
            <div class="empty-state">
              <div class="empty-state-icon">&#128203;</div>
              <div class="empty-state-text">Your quote list is empty</div>
              <div class="empty-state-sub">Add connectors using the "+ Quote" button on any product card</div>
            </div>
          </div>
        </div>`;
      modal.querySelector('[data-close]').addEventListener('click', () => closeModal('quote-modal'));
      openModal('quote-modal');
      return;
    }

    const items = state.quoteBasket.map(item => {
      const p = PRODUCTS.find(pr => pr.id === item.productId);
      if (!p) return '';
      return `
        <div class="quote-item" data-quote-id="${p.id}">
          <div class="quote-item-info">
            <div class="quote-item-part">${p.partNumber}</div>
            <div class="quote-item-desc">${p.name} &middot; ${p.contactCount} contacts &middot; ${p.wireGauge}</div>
          </div>
          <div class="quote-item-qty">
            <label>Qty</label>
            <input type="number" class="quote-qty-input" value="${item.quantity}" min="1" max="99999"
              data-qty-id="${p.id}">
          </div>
          <button class="quote-item-remove" data-remove-quote="${p.id}">&times;</button>
        </div>`;
    }).join('');

    const totalQty = state.quoteBasket.reduce((sum, item) => sum + item.quantity, 0);

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title">Quote Request (${state.quoteBasket.length} items)</span>
          <button class="modal-close" data-close>&times;</button>
        </div>
        <div class="modal-body">
          <div class="quote-items">${items}</div>
          <div class="quote-footer">
            <span class="quote-total">${totalQty} total units across ${state.quoteBasket.length} parts</span>
            <div class="quote-submit-actions">
              <button class="btn-clear-quote" id="btn-clear-quote">Clear All</button>
              <button class="btn-submit-inquiry" id="btn-submit-inquiry">Submit Inquiry</button>
            </div>
          </div>
        </div>
      </div>`;

    // Events
    modal.querySelector('[data-close]').addEventListener('click', () => closeModal('quote-modal'));

    modal.querySelectorAll('[data-remove-quote]').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromQuote(btn.dataset.removeQuote);
        openQuoteModal(); // re-render
      });
    });

    modal.querySelectorAll('[data-qty-id]').forEach(input => {
      input.addEventListener('change', () => {
        const item = state.quoteBasket.find(i => i.productId === input.dataset.qtyId);
        if (item) {
          item.quantity = Math.max(1, parseInt(input.value) || 1);
          saveQuoteToStorage();
          updateQuoteBadge();
        }
      });
    });

    const clearBtn = document.getElementById('btn-clear-quote');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      state.quoteBasket = [];
      saveQuoteToStorage();
      updateQuoteBadge();
      renderProducts();
      openQuoteModal(); // re-render
    });

    const submitBtn = document.getElementById('btn-submit-inquiry');
    if (submitBtn) submitBtn.addEventListener('click', submitQuoteInquiry);

    openModal('quote-modal');
  }

  function submitQuoteInquiry() {
    const modal = document.getElementById('quote-modal');

    // Build summary
    const lines = state.quoteBasket.map(item => {
      const p = PRODUCTS.find(pr => pr.id === item.productId);
      return p ? `${p.partNumber} (${p.name}) x ${item.quantity}` : '';
    }).filter(Boolean);

    modal.querySelector('.modal-body').innerHTML = `
      <div class="confirmation">
        <div class="confirmation-icon">&#10003;</div>
        <div class="confirmation-title">Inquiry Received</div>
        <div class="confirmation-text">
          Your quote request for ${lines.length} part(s) has been submitted.
          A distributor representative will respond within 24 hours.
        </div>
        <div class="confirmation-note">
          Demo — in production this sends to the configured distributor or sales team via email / CRM integration.
        </div>
      </div>`;
  }

  // === PART NUMBER DECODER ===
  function initPartNumberDecoder() {
    const body = document.getElementById('decoder-body');

    // Build controls
    const controls = document.querySelector('.decoder-controls');
    controls.innerHTML = `
      <div class="decoder-select-group">
        <label>Shell Size</label>
        <select class="decoder-select" id="dec-shell">
          ${DECODER_CONFIG.shellSize.options.map(o =>
      `<option value="${o.value}" data-series="${o.series}">${o.label}</option>`
    ).join('')}
        </select>
      </div>
      <span class="decoder-separator">-</span>
      <div class="decoder-select-group">
        <label>Insert Arr.</label>
        <select class="decoder-select" id="dec-arrangement">
          ${DECODER_CONFIG.arrangement.options.map(o =>
      `<option value="${o.value}">${o.label}</option>`
    ).join('')}
        </select>
      </div>
      <div class="decoder-select-group">
        <label>Contact Type</label>
        <select class="decoder-select" id="dec-type">
          ${DECODER_CONFIG.contactType.options.map(o =>
      `<option value="${o.value}">${o.label}</option>`
    ).join('')}
        </select>
      </div>
      <span class="decoder-separator">-</span>
      <div class="decoder-select-group">
        <label>Variant</label>
        <select class="decoder-select" id="dec-variant">
          ${DECODER_CONFIG.variant.options.map(o =>
      `<option value="${o.value}">${o.label}</option>`
    ).join('')}
        </select>
      </div>`;

    // Attach change handlers
    controls.querySelectorAll('.decoder-select').forEach(sel => {
      sel.addEventListener('change', updateDecodedPartNumber);
    });

    // Toggle open/close
    const header = document.querySelector('.decoder-header');
    const toggle = document.querySelector('.decoder-toggle');
    header.addEventListener('click', () => {
      body.classList.toggle('open');
      toggle.classList.toggle('open');
    });

    // Start open by default (killer feature — show it off)
    body.classList.add('open');
    toggle.classList.add('open');

    // Initial decode
    updateDecodedPartNumber();
  }

  function updateDecodedPartNumber() {
    const shell = document.getElementById('dec-shell');
    const shellVal = shell.value;
    const series = shell.selectedOptions[0].dataset.series;
    const arr = document.getElementById('dec-arrangement').value;
    const type = document.getElementById('dec-type').value;
    const variant = document.getElementById('dec-variant').value;

    const partNumber = `8STA${series}-${shellVal}-${arr}${type}${variant ? '-' + variant : ''}`;

    // Render with colored segments
    const resultEl = document.getElementById('decoder-result');
    resultEl.innerHTML = `
      <span class="decoded-part">
        <span class="seg seg-series">8STA${series}</span><span class="seg">-</span><span class="seg seg-shell">${shellVal}</span><span class="seg">-</span><span class="seg seg-arr">${arr}</span><span class="seg seg-type">${type}</span>${variant ? `<span class="seg">-</span><span class="seg seg-variant">${variant}</span>` : ''}
      </span>
      <span class="decoder-match-area" id="decoder-match-area"></span>`;

    // Check for matching product
    const match = PRODUCTS.find(p => p.partNumber === partNumber);
    const matchArea = document.getElementById('decoder-match-area');

    if (match) {
      matchArea.innerHTML = `<button class="decoder-match found" data-goto="${match.id}">&#10003; Match found — view product</button>`;
      matchArea.querySelector('[data-goto]').addEventListener('click', () => {
        highlightProduct(match.id);
      });
    } else {
      matchArea.innerHTML = `<span class="decoder-match not-found">Not in demo catalog</span>`;
    }
  }

  function highlightProduct(productId) {
    // Clear filters to show all products (skip render, we'll render below)
    clearAllFilters(true);
    state.highlightedProduct = productId;
    applyFiltersAndSearch();

    // Scroll to the card
    requestAnimationFrame(() => {
      const card = document.querySelector(`.product-card.highlight`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Remove highlight after animation
        setTimeout(() => {
          state.highlightedProduct = null;
        }, 3000);
      }
    });
  }

  // === URL HASH ===
  function updateHash() {
    const parts = [];
    for (const [key, values] of Object.entries(state.filters)) {
      if (values.length > 0) {
        parts.push(`${key}=${values.join(',')}`);
      }
    }
    if (state.searchQuery) {
      parts.push(`q=${encodeURIComponent(state.searchQuery)}`);
    }
    const hash = parts.length > 0 ? '#' + parts.join('&') : '';
    history.replaceState(null, '', location.pathname + hash);
  }

  function handleHashOnLoad() {
    const hash = location.hash.slice(1);
    if (!hash) return;

    const params = {};
    hash.split('&').forEach(pair => {
      const [key, val] = pair.split('=');
      if (key && val) params[key] = decodeURIComponent(val);
    });

    // Restore filters
    for (const key of Object.keys(state.filters)) {
      if (params[key]) {
        state.filters[key] = params[key].split(',');
      }
    }

    // Restore search
    if (params.q) {
      state.searchQuery = params.q;
      document.getElementById('search-input').value = params.q;
    }

    // Update UI
    document.querySelectorAll('.filter-chip').forEach(chip => {
      const dim = chip.dataset.dimension;
      const val = chip.dataset.value;
      if (state.filters[dim] && state.filters[dim].includes(val)) {
        chip.classList.add('active');
      }
    });

    updateFilterBadge();
    applyFiltersAndSearch();
  }

  // === EVENT LISTENERS ===
  function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        state.searchQuery = searchInput.value.trim();
        applyFiltersAndSearch();
      }, 200);
    });

    // Clear filters
    document.getElementById('btn-clear-filters').addEventListener('click', clearAllFilters);

    // Mobile filters toggle
    document.getElementById('btn-filters-toggle').addEventListener('click', () => {
      const section = document.getElementById('filters-section');
      section.classList.toggle('collapsed');
    });

    // Theme toggle
    document.getElementById('btn-theme').addEventListener('click', toggleTheme);

    // Quote button
    document.getElementById('btn-quote').addEventListener('click', openQuoteModal);

    // Escape to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ['product-modal', 'compare-modal', 'quote-modal'].forEach(id => {
          const el = document.getElementById(id);
          if (el && el.classList.contains('open')) {
            closeModal(id);
          }
        });
      }
    });
  }

  // === BOOT ===
  document.addEventListener('DOMContentLoaded', init);

})();
