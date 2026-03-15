/**
 * 8STA Connector SVG Generator
 * Generates front-face view SVG illustrations of circular connectors
 * showing contact pin/socket layout patterns
 */

const ConnectorSVG = (function() {
  'use strict';

  // Contact layout rings per contact count
  // Each ring: { n: number of contacts, r: radius from center (in SVG units) }
  const CONTACT_LAYOUTS = {
    2:  [{ n: 2, r: 22 }],
    5:  [{ n: 1, r: 0 }, { n: 4, r: 26 }],
    6:  [{ n: 6, r: 26 }],
    7:  [{ n: 1, r: 0 }, { n: 6, r: 26 }],
    10: [{ n: 4, r: 15 }, { n: 6, r: 32 }],
    12: [{ n: 4, r: 14 }, { n: 8, r: 30 }],
    19: [{ n: 1, r: 0 }, { n: 6, r: 17 }, { n: 12, r: 33 }],
    22: [{ n: 6, r: 14 }, { n: 16, r: 32 }],
    26: [{ n: 2, r: 7 }, { n: 8, r: 20 }, { n: 16, r: 34 }],
    39: [{ n: 1, r: 0 }, { n: 6, r: 11 }, { n: 12, r: 23 }, { n: 20, r: 35 }],
    61: [{ n: 1, r: 0 }, { n: 6, r: 8 }, { n: 12, r: 16 }, { n: 18, r: 26 }, { n: 24, r: 36 }]
  };

  // Colors — read from CSS custom properties for theme support
  function getColors() {
    const s = getComputedStyle(document.documentElement);
    return {
      bodyOuter: s.getPropertyValue('--svg-body-outer').trim() || '#3a3a44',
      bodyInner: s.getPropertyValue('--svg-body-inner').trim() || '#28282f',
      bodyStroke: s.getPropertyValue('--svg-body-stroke').trim() || '#4a4a54',
      innerStroke: s.getPropertyValue('--svg-inner-stroke').trim() || '#353540',
      keyway: s.getPropertyValue('--svg-keyway').trim() || '#2a2a32',
      gold: s.getPropertyValue('--svg-gold').trim() || '#C8A84E',
      goldStroke: s.getPropertyValue('--svg-gold-stroke').trim() || '#A8883A'
    };
  }

  function getLayout(contactCount) {
    return CONTACT_LAYOUTS[contactCount] || generateFallbackLayout(contactCount);
  }

  function generateFallbackLayout(count) {
    if (count <= 1) return [{ n: 1, r: 0 }];
    if (count <= 8) return [{ n: count, r: 26 }];

    const rings = [];
    let remaining = count;
    let hasCenter = count % 2 === 1;

    if (hasCenter) {
      rings.push({ n: 1, r: 0 });
      remaining--;
    }

    let ringNum = 0;
    let ringSize = 6;
    while (remaining > 0) {
      const n = Math.min(ringSize, remaining);
      const maxR = 36;
      const minR = hasCenter ? 10 : 14;
      const totalRings = Math.ceil(Math.log2(remaining + ringSize));
      const r = minR + (maxR - minR) * (ringNum / Math.max(1, totalRings));
      rings.push({ n, r: Math.min(r, maxR) });
      remaining -= n;
      ringSize += 6;
      ringNum++;
    }
    return rings;
  }

  function generate(product) {
    const { contactCount, orientation } = product;
    const isSocket = orientation.includes('Socket');
    const c = getColors();

    const size = 200;
    const cx = size / 2;
    const cy = size / 2;
    const outerR = 80;
    const innerR = 66;

    const layout = getLayout(contactCount);
    // Calculate pin radius based on the most crowded ring
    let minSpacing = Infinity;
    for (const ring of layout) {
      if (ring.r > 0 && ring.n > 1) {
        const spacing = (2 * Math.PI * ring.r) / ring.n;
        minSpacing = Math.min(minSpacing, spacing);
      }
    }
    const pinR = Math.max(1.5, Math.min(5, (minSpacing || 10) * 0.4));

    let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" class="connector-svg">`;

    // Outer body ring
    svg += `<circle cx="${cx}" cy="${cy}" r="${outerR}" fill="${c.bodyOuter}" stroke="${c.bodyStroke}" stroke-width="1.5"/>`;

    // Inner face
    svg += `<circle cx="${cx}" cy="${cy}" r="${innerR}" fill="${c.bodyInner}" stroke="${c.innerStroke}" stroke-width="1"/>`;

    // Keyway notch at 12 o'clock
    svg += `<rect x="${cx - 5}" y="${cy - outerR - 1}" width="10" height="16" rx="2" fill="${c.keyway}" stroke="${c.bodyStroke}" stroke-width="1"/>`;

    // Alignment mark
    svg += `<line x1="${cx}" y1="${cy - outerR + 15}" x2="${cx}" y2="${cy - innerR - 2}" stroke="${c.innerStroke}" stroke-width="1.5"/>`;

    // Contacts
    for (const ring of layout) {
      for (let i = 0; i < ring.n; i++) {
        let x, y;
        if (ring.r === 0) {
          x = cx;
          y = cy;
        } else {
          const startAngle = -Math.PI / 2;
          const angle = startAngle + (2 * Math.PI * i) / ring.n;
          x = cx + ring.r * Math.cos(angle);
          y = cy + ring.r * Math.sin(angle);
        }

        if (isSocket) {
          svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${pinR.toFixed(1)}" fill="none" stroke="${c.gold}" stroke-width="1.2"/>`;
          svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(pinR * 0.3).toFixed(1)}" fill="${c.goldStroke}" opacity="0.5"/>`;
        } else {
          svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${pinR.toFixed(1)}" fill="${c.gold}" stroke="${c.goldStroke}" stroke-width="0.5"/>`;
          svg += `<circle cx="${(x - pinR * 0.2).toFixed(1)}" cy="${(y - pinR * 0.2).toFixed(1)}" r="${(pinR * 0.3).toFixed(1)}" fill="rgba(255,255,255,0.25)"/>`;
        }
      }
    }

    // Shell size label ring (subtle)
    svg += `<circle cx="${cx}" cy="${cy}" r="${outerR}" fill="none" stroke="${c.bodyStroke}" stroke-width="0.5" stroke-dasharray="2,4"/>`;

    svg += '</svg>';
    return svg;
  }

  return { generate };
})();
