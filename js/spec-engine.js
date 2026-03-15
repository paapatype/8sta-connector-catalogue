/**
 * 8STA Spec Engine — Connector Selection by Wire Requirements & Cross-Reference
 * Deterministic matching algorithm: no AI, no randomness
 */

(function () {
  'use strict';

  // === STATE ===
  var wireGroups = [{ count: '', current: '' }];
  var specResults = [];
  var crossRefResults = null;
  var activeSpecTab = 'requirements'; // 'requirements' | 'crossref'

  // === INITIALIZATION ===
  function initSpecEngine() {
    renderWireGroups();
    renderSpecResults();
    setupSpecTabs();
    renderCrossRefForm();
  }

  // === TAB BAR (Catalog vs Spec Engine) ===
  function initMainTabs() {
    var tabBtns = document.querySelectorAll('.main-tab-btn');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.dataset.tab;
        switchMainTab(target);
      });
    });
  }

  function switchMainTab(target) {
    // Update tab buttons
    document.querySelectorAll('.main-tab-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tab === target);
    });

    // Toggle sections
    var catalogSections = document.querySelectorAll('.catalog-view');
    var specSection = document.getElementById('spec-engine-section');

    if (target === 'catalog') {
      catalogSections.forEach(function (el) { el.style.display = ''; });
      if (specSection) specSection.style.display = 'none';
    } else {
      catalogSections.forEach(function (el) { el.style.display = 'none'; });
      if (specSection) specSection.style.display = '';
    }
  }

  // === SPEC ENGINE SUB-TABS ===
  function setupSpecTabs() {
    var container = document.getElementById('spec-engine-section');
    if (!container) return;

    container.addEventListener('click', function (e) {
      var tabBtn = e.target.closest('.spec-tab-btn');
      if (!tabBtn) return;
      activeSpecTab = tabBtn.dataset.spectab;
      container.querySelectorAll('.spec-tab-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.spectab === activeSpecTab);
      });
      document.getElementById('spec-requirements-panel').style.display =
        activeSpecTab === 'requirements' ? '' : 'none';
      document.getElementById('spec-crossref-panel').style.display =
        activeSpecTab === 'crossref' ? '' : 'none';
    });
  }

  // === WIRE GROUPS FORM ===
  function renderWireGroups() {
    var container = document.getElementById('wire-groups-body');
    if (!container) return;

    var html = '';
    wireGroups.forEach(function (group, i) {
      html += '<div class="wire-group-row" data-index="' + i + '">' +
        '<div class="wire-group-field">' +
          '<label>Wire Count</label>' +
          '<input type="number" class="wire-group-input wg-count" min="1" step="1" ' +
            'value="' + (group.count || '') + '" placeholder="e.g. 4" data-field="count" data-index="' + i + '">' +
        '</div>' +
        '<div class="wire-group-field">' +
          '<label>Current per Wire (A)</label>' +
          '<input type="number" class="wire-group-input wg-current" min="0.1" step="0.1" ' +
            'value="' + (group.current || '') + '" placeholder="e.g. 3" data-field="current" data-index="' + i + '">' +
        '</div>' +
        '<button class="wire-group-remove" data-remove="' + i + '" title="Remove group">&times;</button>' +
      '</div>';
    });

    container.innerHTML = html;

    // Attach input handlers
    container.querySelectorAll('.wire-group-input').forEach(function (input) {
      input.addEventListener('input', function () {
        var idx = parseInt(input.dataset.index, 10);
        var field = input.dataset.field;
        wireGroups[idx][field] = input.value;
        updateWireGroupSummary();
      });
    });

    // Attach remove handlers
    container.querySelectorAll('.wire-group-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.dataset.remove, 10);
        if (wireGroups.length <= 1) return;
        wireGroups.splice(idx, 1);
        renderWireGroups();
      });
    });

    updateWireGroupSummary();
  }

  function addWireGroup() {
    wireGroups.push({ count: '', current: '' });
    renderWireGroups();
    // Focus the new count input
    var rows = document.querySelectorAll('.wire-group-row');
    if (rows.length > 0) {
      var last = rows[rows.length - 1];
      var input = last.querySelector('.wg-count');
      if (input) input.focus();
    }
  }

  function updateWireGroupSummary() {
    var summary = document.getElementById('wire-group-summary');
    if (!summary) return;
    var totalWires = 0;
    var groups = 0;
    wireGroups.forEach(function (g) {
      var c = parseInt(g.count, 10);
      if (c > 0) {
        totalWires += c;
        groups++;
      }
    });
    summary.textContent = 'Total wires: ' + totalWires + ' | Groups: ' + groups;
  }

  // === MATCHING ALGORITHM ===

  /**
   * Find the smallest contact size that can handle the given current.
   */
  function getMinimumContactSize(currentAmps) {
    var sizes = Object.entries(CONTACT_CURRENT_RATINGS)
      .sort(function (a, b) { return a[1].maxCurrent - b[1].maxCurrent; });
    for (var i = 0; i < sizes.length; i++) {
      if (sizes[i][1].maxCurrent >= currentAmps) return sizes[i][0];
    }
    return null;
  }

  /**
   * For a given layout, count all contacts of the target size OR LARGER.
   * A #20 contact (rated 13A) CAN carry a 3A signal, so it counts for #26 needs.
   */
  function getAvailableForSize(layout, targetSize) {
    var targetIdx = CONTACT_SIZE_ORDER.indexOf(targetSize);
    if (targetIdx < 0) return 0;
    var total = 0;
    for (var i = targetIdx; i < CONTACT_SIZE_ORDER.length; i++) {
      var size = CONTACT_SIZE_ORDER[i];
      total += (layout.contacts[size] || 0);
    }
    return total;
  }

  /**
   * Greedy allocation: assigns required contacts to layout contacts,
   * preferring exact-size matches first, then using larger contacts as substitutes.
   * Returns { success: boolean, allocation: {...} } with per-size usage details.
   */
  function allocateContacts(layout, requiredContacts) {
    // Build a pool of available contacts keyed by size
    var pool = {};
    CONTACT_SIZE_ORDER.forEach(function (size) {
      pool[size] = layout.contacts[size] || 0;
    });

    var allocation = {};
    var requiredSizes = Object.keys(requiredContacts).sort(function (a, b) {
      // Allocate largest requirements first (they have fewer substitution options)
      return CONTACT_SIZE_ORDER.indexOf(b) - CONTACT_SIZE_ORDER.indexOf(a);
    });

    for (var r = 0; r < requiredSizes.length; r++) {
      var reqSize = requiredSizes[r];
      var needed = requiredContacts[reqSize];
      if (needed <= 0) continue;

      var reqIdx = CONTACT_SIZE_ORDER.indexOf(reqSize);
      var allocated = 0;
      allocation[reqSize] = { needed: needed, sources: {} };

      // Try exact match first, then progressively larger
      for (var i = reqIdx; i < CONTACT_SIZE_ORDER.length; i++) {
        var poolSize = CONTACT_SIZE_ORDER[i];
        var canTake = Math.min(pool[poolSize], needed - allocated);
        if (canTake > 0) {
          pool[poolSize] -= canTake;
          allocated += canTake;
          allocation[reqSize].sources[poolSize] = canTake;
        }
        if (allocated >= needed) break;
      }

      if (allocated < needed) {
        return { success: false, allocation: allocation };
      }
    }

    return { success: true, allocation: allocation, remainingPool: pool };
  }

  function findMatchingConnectors(groups) {
    // 1. Map each wire group to minimum contact size
    var requiredContacts = {};
    for (var g = 0; g < groups.length; g++) {
      var count = parseInt(groups[g].count, 10);
      var current = parseFloat(groups[g].current);
      if (isNaN(count) || count <= 0 || isNaN(current) || current <= 0) continue;

      var contactSize = getMinimumContactSize(current);
      if (!contactSize) {
        return { error: 'No contact size rated for ' + current + 'A. Maximum rating is ' +
          CONTACT_CURRENT_RATINGS['#4'].maxCurrent + 'A (#4 contact).' };
      }
      requiredContacts[contactSize] = (requiredContacts[contactSize] || 0) + count;
    }

    if (Object.keys(requiredContacts).length === 0) {
      return { error: 'Please enter at least one valid wire group.' };
    }

    var totalRequired = 0;
    Object.values(requiredContacts).forEach(function (v) { totalRequired += v; });

    // 2. Find all layouts that can accommodate via greedy allocation
    var matches = [];
    CONNECTOR_DATABASE.forEach(function (layout) {
      var result = allocateContacts(layout, requiredContacts);
      if (result.success) {
        matches.push({ layout: layout, allocation: result.allocation, remaining: result.remainingPool });
      }
    });

    // 3. Calculate utilization and rank
    var results = matches.map(function (match) {
      var layout = match.layout;
      var spareContacts = layout.totalContacts - totalRequired;
      var utilizationPct = Math.round((totalRequired / layout.totalContacts) * 100);

      var fitTag;
      if (utilizationPct >= 90) fitTag = 'Exact Fit';
      else if (utilizationPct >= 60) fitTag = 'Recommended';
      else fitTag = 'Oversized';

      // Find matching products from catalog
      var matchingProducts = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.filter(function (p) {
        return p.shellSize === layout.shellSize;
      }) : [];

      return {
        layout: layout,
        allocation: match.allocation,
        remaining: match.remaining,
        spareContacts: spareContacts,
        utilizationPct: utilizationPct,
        fitTag: fitTag,
        requiredContacts: requiredContacts,
        totalRequired: totalRequired,
        matchingProducts: matchingProducts
      };
    });

    // Sort: Exact Fit first, then by spare contacts ASC, then by weight ASC
    var fitOrder = { 'Exact Fit': 0, 'Recommended': 1, 'Oversized': 2 };
    results.sort(function (a, b) {
      if (fitOrder[a.fitTag] !== fitOrder[b.fitTag]) return fitOrder[a.fitTag] - fitOrder[b.fitTag];
      if (a.spareContacts !== b.spareContacts) return a.spareContacts - b.spareContacts;
      return a.layout.weight - b.layout.weight;
    });

    return { results: results, requiredContacts: requiredContacts };
  }

  // === SEARCH HANDLER ===
  function handleFindConnectors() {
    // Validate
    var validGroups = wireGroups.filter(function (g) {
      return parseInt(g.count, 10) > 0 && parseFloat(g.current) > 0;
    });

    if (validGroups.length === 0) {
      specResults = [];
      renderSpecResults({ error: 'Please enter at least one wire group with count and current.' });
      return;
    }

    var result = findMatchingConnectors(validGroups);
    if (result.error) {
      specResults = [];
      renderSpecResults({ error: result.error });
    } else {
      specResults = result.results;
      renderSpecResults({ results: result.results, requiredContacts: result.requiredContacts });
    }
  }

  // === RESULTS RENDERING ===
  function renderSpecResults(data) {
    var container = document.getElementById('spec-results');
    if (!container) return;

    if (!data) {
      container.innerHTML = '<div class="spec-empty-state">' +
        '<div class="spec-empty-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>' +
        '<div class="spec-empty-text">Add your wire requirements and click "Find Matching Connectors"</div>' +
      '</div>';
      return;
    }

    if (data.error) {
      container.innerHTML = '<div class="spec-empty-state">' +
        '<div class="spec-empty-icon" style="color:var(--red)"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>' +
        '<div class="spec-empty-text" style="color:var(--red)">' + escapeHtml(data.error) + '</div>' +
      '</div>';
      return;
    }

    if (!data.results || data.results.length === 0) {
      container.innerHTML = '<div class="spec-empty-state">' +
        '<div class="spec-empty-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg></div>' +
        '<div class="spec-empty-text">No matching connectors found for these requirements</div>' +
        '<div class="spec-empty-sub">Try reducing wire count or current requirements</div>' +
      '</div>';
      return;
    }

    var html = '<div class="spec-results-header">' +
      '<span class="spec-results-count">' + data.results.length + ' matching layout' +
      (data.results.length !== 1 ? 's' : '') + '</span>' +
      '<span class="spec-results-req">Requiring: ' + formatRequired(data.requiredContacts) + '</span>' +
    '</div>';

    html += '<div class="spec-results-list">';
    data.results.forEach(function (r, idx) {
      html += renderResultCard(r, idx);
    });
    html += '</div>';

    container.innerHTML = html;

    // Attach event listeners
    container.querySelectorAll('.spec-reasoning-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var detail = btn.parentElement.querySelector('.spec-reasoning-detail');
        var isOpen = detail.style.display !== 'none';
        detail.style.display = isOpen ? 'none' : 'block';
        btn.textContent = isOpen ? 'Show Reasoning' : 'Hide Reasoning';
      });
    });

    container.querySelectorAll('.spec-add-quote').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var productId = btn.dataset.productId;
        if (productId && typeof addToQuoteFromSpec === 'function') {
          addToQuoteFromSpec(productId);
          btn.textContent = 'Added';
          btn.disabled = true;
        }
      });
    });
  }

  function renderResultCard(r, idx) {
    var layout = r.layout;
    var fitClass = r.fitTag === 'Exact Fit' ? 'fit-exact' :
                   r.fitTag === 'Recommended' ? 'fit-recommended' : 'fit-oversized';

    // Contact distribution bar
    var barSegments = '';
    var usedCount = r.totalRequired;
    var spareCount = r.spareContacts;
    var total = layout.totalContacts;
    var usedPct = total > 0 ? Math.round((usedCount / total) * 100) : 0;
    var sparePct = 100 - usedPct;

    barSegments = '<div class="contact-bar">' +
      '<div class="contact-bar-used" style="width:' + usedPct + '%">' +
        (usedPct > 15 ? usedCount + ' used' : '') +
      '</div>' +
      '<div class="contact-bar-spare" style="width:' + sparePct + '%">' +
        (sparePct > 15 ? spareCount + ' spare' : '') +
      '</div>' +
    '</div>';

    // Contact breakdown for layout
    var layoutContactList = [];
    CONTACT_SIZE_ORDER.forEach(function (size) {
      if (layout.contacts[size] > 0) {
        layoutContactList.push(layout.contacts[size] + ' x ' + size);
      }
    });

    // Required contacts breakdown
    var reqList = [];
    CONTACT_SIZE_ORDER.forEach(function (size) {
      if (r.requiredContacts[size] > 0) {
        reqList.push(r.requiredContacts[size] + ' x ' + size);
      }
    });

    // Reasoning
    var reasoning = '<div class="spec-reasoning-detail" style="display:none">' +
      '<div class="reasoning-row"><span class="reasoning-label">Your requirement:</span> ' + reqList.join(', ') + '</div>' +
      '<div class="reasoning-row"><span class="reasoning-label">This layout provides:</span> ' + layoutContactList.join(', ') + '</div>' +
      '<div class="reasoning-row"><span class="reasoning-label">Spare contacts:</span> ' + r.spareContacts + ' (' + (100 - r.utilizationPct) + '% headroom)</div>';

    // Show substitution info if any larger contacts are used for smaller needs
    var substitutions = [];
    Object.keys(r.allocation).forEach(function (reqSize) {
      var alloc = r.allocation[reqSize];
      Object.keys(alloc.sources).forEach(function (srcSize) {
        if (srcSize !== reqSize) {
          substitutions.push(alloc.sources[srcSize] + ' x ' + srcSize + ' used as ' + reqSize +
            ' (rated ' + CONTACT_CURRENT_RATINGS[srcSize].maxCurrent + 'A, need ' +
            CONTACT_CURRENT_RATINGS[reqSize].maxCurrent + 'A max)');
        }
      });
    });

    if (substitutions.length > 0) {
      reasoning += '<div class="reasoning-row"><span class="reasoning-label">Contact substitutions:</span> ' +
        substitutions.join('; ') + '</div>';
    }

    reasoning += '</div>';

    // Matching catalog product
    var catalogLink = '';
    if (r.matchingProducts && r.matchingProducts.length > 0) {
      catalogLink = '<div class="spec-catalog-match">';
      r.matchingProducts.slice(0, 2).forEach(function (p) {
        catalogLink += '<span class="spec-catalog-pn">' + escapeHtml(p.partNumber) + '</span>';
      });
      if (r.matchingProducts.length > 2) {
        catalogLink += '<span class="spec-catalog-more">+' + (r.matchingProducts.length - 2) + ' more</span>';
      }
      catalogLink += '</div>';
    }

    // Quote buttons for matching products
    var quoteButtons = '';
    if (r.matchingProducts && r.matchingProducts.length > 0) {
      quoteButtons = '<div class="spec-card-actions">';
      r.matchingProducts.slice(0, 2).forEach(function (p) {
        quoteButtons += '<button class="spec-add-quote" data-product-id="' + p.id + '">' +
          '+ Quote ' + escapeHtml(p.partNumber) + '</button>';
      });
      quoteButtons += '</div>';
    }

    return '<div class="result-card">' +
      '<div class="result-card-header">' +
        '<div class="result-card-id">' +
          '<span class="result-shell">Shell ' + escapeHtml(layout.shellSize) + '</span>' +
          '<span class="result-layout">Layout ' + escapeHtml(layout.layoutNumber) + '</span>' +
        '</div>' +
        '<span class="fit-tag ' + fitClass + '">' + r.fitTag + '</span>' +
      '</div>' +
      barSegments +
      '<div class="result-card-specs">' +
        '<div class="result-spec"><span class="result-spec-label">Total</span><span class="result-spec-value">' + layout.totalContacts + ' contacts</span></div>' +
        '<div class="result-spec"><span class="result-spec-label">Spare</span><span class="result-spec-value">' + r.spareContacts + '</span></div>' +
        '<div class="result-spec"><span class="result-spec-label">Weight</span><span class="result-spec-value">' + layout.weight + 'g</span></div>' +
        '<div class="result-spec"><span class="result-spec-label">Utilization</span><span class="result-spec-value">' + r.utilizationPct + '%</span></div>' +
        '<div class="result-spec"><span class="result-spec-label">Size</span><span class="result-spec-value">' + layout.dimensions.diameter + 'mm dia</span></div>' +
        '<div class="result-spec"><span class="result-spec-label">Contacts</span><span class="result-spec-value">' + layoutContactList.join(', ') + '</span></div>' +
      '</div>' +
      catalogLink +
      '<div class="spec-reasoning">' +
        '<button class="spec-reasoning-toggle">Show Reasoning</button>' +
        reasoning +
      '</div>' +
      quoteButtons +
    '</div>';
  }

  function formatRequired(requiredContacts) {
    var parts = [];
    CONTACT_SIZE_ORDER.forEach(function (size) {
      if (requiredContacts[size] > 0) {
        var rating = CONTACT_CURRENT_RATINGS[size];
        parts.push(requiredContacts[size] + ' x ' + size + ' (' + rating.maxCurrent + 'A)');
      }
    });
    return parts.join(', ');
  }

  // === CROSS-REFERENCE ===
  function renderCrossRefForm() {
    var container = document.getElementById('crossref-results');
    if (!container) return;
    container.innerHTML = '<div class="spec-empty-state">' +
      '<div class="spec-empty-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg></div>' +
      '<div class="spec-empty-text">Enter a competitor connector to find the 8STA equivalent</div>' +
    '</div>';
  }

  function handleCrossReference() {
    var shellInput = document.getElementById('crossref-shell');
    var layoutInput = document.getElementById('crossref-layout');
    if (!shellInput || !layoutInput) return;

    var shellSize = shellInput.value.trim();
    var layoutNumber = layoutInput.value.trim();

    if (!shellSize || !layoutNumber) {
      renderCrossRefResults({ error: 'Please enter both shell size and layout number.' });
      return;
    }

    // Find in Deutsch AS database
    var deutschMatch = DEUTSCH_AS_DATABASE.find(function (d) {
      return d.shellSize === shellSize && d.layoutNumber === layoutNumber;
    });

    if (!deutschMatch) {
      // No Deutsch entry — try to find 8STA matches for the given shell + layout anyway
      var directMatches = CONNECTOR_DATABASE.filter(function (c) {
        return c.shellSize === shellSize && c.layoutNumber === layoutNumber;
      });

      if (directMatches.length > 0) {
        renderCrossRefResults({
          confidence: 'Near Match',
          note: 'No Deutsch AS entry found for Shell ' + shellSize + ' Layout ' + layoutNumber +
            ', but 8STA has a connector with the same designation.',
          matches: directMatches.map(function (m) {
            return { layout: m, confidence: 'Near Match' };
          })
        });
      } else {
        // Find closest by shell size
        var sameShell = CONNECTOR_DATABASE.filter(function (c) {
          return c.shellSize === shellSize;
        });
        if (sameShell.length > 0) {
          renderCrossRefResults({
            confidence: 'No Direct Match',
            note: 'No exact match found. Showing 8STA connectors in the same shell size (' + shellSize + ').',
            matches: sameShell.map(function (m) {
              return { layout: m, confidence: 'No Direct Match' };
            })
          });
        } else {
          renderCrossRefResults({
            error: 'No 8STA connectors found for shell size ' + shellSize + '.'
          });
        }
      }
      return;
    }

    // We have a Deutsch match — now find 8STA equivalents
    var results = [];

    // Exact match: same shell, same layout, same contacts
    CONNECTOR_DATABASE.forEach(function (layout) {
      var sameShell = layout.shellSize === deutschMatch.shellSize;
      var sameLayout = layout.layoutNumber === deutschMatch.layoutNumber;
      var sameContacts = contactsMatch(layout.contacts, deutschMatch.contacts);

      if (sameShell && sameLayout && sameContacts) {
        results.push({ layout: layout, confidence: 'Exact Equivalent' });
      } else if (sameContacts && sameShell) {
        results.push({ layout: layout, confidence: 'Near Match' });
      } else if (sameContacts) {
        results.push({ layout: layout, confidence: 'Near Match' });
      }
    });

    // If no exact or near matches, show same shell
    if (results.length === 0) {
      var sameShell = CONNECTOR_DATABASE.filter(function (c) {
        return c.shellSize === deutschMatch.shellSize;
      });
      results = sameShell.map(function (m) {
        return { layout: m, confidence: 'No Direct Match' };
      });
    }

    // Sort: Exact first, then Near, then No Direct
    var confOrder = { 'Exact Equivalent': 0, 'Near Match': 1, 'No Direct Match': 2 };
    results.sort(function (a, b) {
      return (confOrder[a.confidence] || 9) - (confOrder[b.confidence] || 9);
    });

    renderCrossRefResults({
      confidence: results[0] ? results[0].confidence : 'No Direct Match',
      note: 'Deutsch AS D38999 Shell ' + shellSize + ' Layout ' + layoutNumber +
        ' (' + deutschMatch.totalContacts + ' contacts)',
      matches: results
    });
  }

  function contactsMatch(a, b) {
    for (var i = 0; i < CONTACT_SIZE_ORDER.length; i++) {
      var size = CONTACT_SIZE_ORDER[i];
      if ((a[size] || 0) !== (b[size] || 0)) return false;
    }
    return true;
  }

  function renderCrossRefResults(data) {
    var container = document.getElementById('crossref-results');
    if (!container) return;

    if (data.error) {
      container.innerHTML = '<div class="spec-empty-state">' +
        '<div class="spec-empty-icon" style="color:var(--red)"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>' +
        '<div class="spec-empty-text" style="color:var(--red)">' + escapeHtml(data.error) + '</div>' +
      '</div>';
      return;
    }

    var html = '<div class="crossref-results-header">' +
      '<span class="crossref-source">' + escapeHtml(data.note) + '</span>' +
    '</div>';

    html += '<div class="spec-results-list">';
    data.matches.forEach(function (m) {
      var layout = m.layout;
      var confClass = m.confidence === 'Exact Equivalent' ? 'fit-exact' :
                      m.confidence === 'Near Match' ? 'fit-recommended' : 'fit-oversized';

      var contactList = [];
      CONTACT_SIZE_ORDER.forEach(function (size) {
        if (layout.contacts[size] > 0) {
          contactList.push(layout.contacts[size] + ' x ' + size);
        }
      });

      // Check for matching catalog products
      var matchingProducts = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.filter(function (p) {
        return p.shellSize === layout.shellSize;
      }) : [];

      var catalogLink = '';
      if (matchingProducts.length > 0) {
        catalogLink = '<div class="spec-catalog-match">';
        matchingProducts.slice(0, 2).forEach(function (p) {
          catalogLink += '<span class="spec-catalog-pn">' + escapeHtml(p.partNumber) + '</span>';
        });
        if (matchingProducts.length > 2) {
          catalogLink += '<span class="spec-catalog-more">+' + (matchingProducts.length - 2) + ' more</span>';
        }
        catalogLink += '</div>';
      }

      var quoteButtons = '';
      if (matchingProducts.length > 0) {
        quoteButtons = '<div class="spec-card-actions">';
        matchingProducts.slice(0, 2).forEach(function (p) {
          quoteButtons += '<button class="spec-add-quote" data-product-id="' + p.id + '">' +
            '+ Quote ' + escapeHtml(p.partNumber) + '</button>';
        });
        quoteButtons += '</div>';
      }

      html += '<div class="result-card">' +
        '<div class="result-card-header">' +
          '<div class="result-card-id">' +
            '<span class="result-shell">Shell ' + escapeHtml(layout.shellSize) + '</span>' +
            '<span class="result-layout">Layout ' + escapeHtml(layout.layoutNumber) + '</span>' +
          '</div>' +
          '<span class="fit-tag ' + confClass + '">' + escapeHtml(m.confidence) + '</span>' +
        '</div>' +
        '<div class="result-card-specs">' +
          '<div class="result-spec"><span class="result-spec-label">Total</span><span class="result-spec-value">' + layout.totalContacts + ' contacts</span></div>' +
          '<div class="result-spec"><span class="result-spec-label">Contacts</span><span class="result-spec-value">' + contactList.join(', ') + '</span></div>' +
          '<div class="result-spec"><span class="result-spec-label">Weight</span><span class="result-spec-value">' + layout.weight + 'g</span></div>' +
          '<div class="result-spec"><span class="result-spec-label">Size</span><span class="result-spec-value">' + layout.dimensions.diameter + 'mm dia</span></div>' +
          '<div class="result-spec"><span class="result-spec-label">Variants</span><span class="result-spec-value">' + layout.variants.join(', ') + '</span></div>' +
        '</div>' +
        catalogLink +
        quoteButtons +
      '</div>';
    });
    html += '</div>';

    container.innerHTML = html;

    // Attach quote button handlers
    container.querySelectorAll('.spec-add-quote').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var productId = btn.dataset.productId;
        if (productId && typeof addToQuoteFromSpec === 'function') {
          addToQuoteFromSpec(productId);
          btn.textContent = 'Added';
          btn.disabled = true;
        }
      });
    });
  }

  // === QUOTE INTEGRATION ===
  // This function adds to the quote basket managed in app.js
  // We dispatch a custom event that app.js can listen to
  function addToQuoteFromSpec(productId) {
    // Try direct access to the quote badge to check if the integration works
    var existing = null;
    try {
      var stored = sessionStorage.getItem('8sta-quote');
      var basket = stored ? JSON.parse(stored) : [];
      existing = basket.find(function (item) { return item.productId === productId; });
      if (existing) {
        existing.quantity++;
      } else {
        basket.push({ productId: productId, quantity: 1 });
      }
      sessionStorage.setItem('8sta-quote', JSON.stringify(basket));

      // Update badge
      var badge = document.getElementById('quote-badge');
      var total = basket.reduce(function (sum, item) { return sum + item.quantity; }, 0);
      if (badge) {
        badge.textContent = total;
        badge.style.display = 'inline-flex';
      }
    } catch (e) {
      // Fallback: dispatch custom event
      document.dispatchEvent(new CustomEvent('spec-engine-add-quote', {
        detail: { productId: productId }
      }));
    }
  }

  // Make addToQuoteFromSpec accessible
  window.addToQuoteFromSpec = addToQuoteFromSpec;

  // === UTILITY ===
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // === BOOT ===
  document.addEventListener('DOMContentLoaded', function () {
    initMainTabs();

    // Only init spec engine if the section exists
    if (document.getElementById('spec-engine-section')) {
      initSpecEngine();
    }

    // Add wire group button
    var addBtn = document.getElementById('btn-add-wire-group');
    if (addBtn) {
      addBtn.addEventListener('click', addWireGroup);
    }

    // Find matching button
    var findBtn = document.getElementById('btn-find-matching');
    if (findBtn) {
      findBtn.addEventListener('click', handleFindConnectors);
    }

    // Cross-reference button
    var crossRefBtn = document.getElementById('btn-find-equivalent');
    if (crossRefBtn) {
      crossRefBtn.addEventListener('click', handleCrossReference);
    }

    // Default: show catalog
    switchMainTab('catalog');
  });

})();
