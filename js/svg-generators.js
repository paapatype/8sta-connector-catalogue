/**
 * 8STA Connector SVG Generator
 * Generates front-face view SVG illustrations of circular connectors
 * with MIL-DTL-38999 standard pin numbering.
 *
 * Pin numbering convention (MIL-DTL-38999):
 * - Viewed from mating face (front view of male insulator for sizes 04-24)
 * - Pin 1 starts near the keyway (12 o'clock)
 * - Numbering proceeds clockwise
 * - Inner rings (center) are numbered first, then outer rings
 * - Sizes 01-02: rear view of receptacle, opposite marking plug/receptacle
 */

const ConnectorSVG = (function() {
  'use strict';

  // Contact layout rings per contact count
  // Each ring: { n: number of contacts, r: radius from center (in SVG units) }
  // Rings ordered inside-out (center first) — matches MIL numbering order
  const CONTACT_LAYOUTS = {
    1:  [{ n: 1, r: 0 }],
    2:  [{ n: 2, r: 22 }],
    3:  [{ n: 3, r: 22 }],
    4:  [{ n: 4, r: 22 }],
    5:  [{ n: 1, r: 0 }, { n: 4, r: 26 }],
    6:  [{ n: 6, r: 26 }],
    7:  [{ n: 1, r: 0 }, { n: 6, r: 26 }],
    8:  [{ n: 2, r: 12 }, { n: 6, r: 28 }],
    9:  [{ n: 3, r: 12 }, { n: 6, r: 28 }],
    10: [{ n: 4, r: 15 }, { n: 6, r: 32 }],
    11: [{ n: 5, r: 14 }, { n: 6, r: 30 }],
    12: [{ n: 4, r: 14 }, { n: 8, r: 30 }],
    13: [{ n: 1, r: 0 }, { n: 6, r: 16 }, { n: 6, r: 32 }],
    14: [{ n: 2, r: 10 }, { n: 6, r: 22 }, { n: 6, r: 34 }],
    16: [{ n: 4, r: 12 }, { n: 12, r: 30 }],
    18: [{ n: 6, r: 14 }, { n: 12, r: 32 }],
    19: [{ n: 1, r: 0 }, { n: 6, r: 17 }, { n: 12, r: 33 }],
    21: [{ n: 3, r: 10 }, { n: 6, r: 22 }, { n: 12, r: 34 }],
    22: [{ n: 4, r: 10 }, { n: 6, r: 22 }, { n: 12, r: 34 }],
    23: [{ n: 5, r: 10 }, { n: 6, r: 22 }, { n: 12, r: 34 }],
    26: [{ n: 2, r: 7 }, { n: 8, r: 20 }, { n: 16, r: 34 }],
    29: [{ n: 5, r: 10 }, { n: 8, r: 22 }, { n: 16, r: 34 }],
    32: [{ n: 2, r: 7 }, { n: 6, r: 16 }, { n: 12, r: 27 }, { n: 12, r: 36 }],
    37: [{ n: 1, r: 0 }, { n: 6, r: 12 }, { n: 12, r: 24 }, { n: 18, r: 35 }],
    39: [{ n: 1, r: 0 }, { n: 6, r: 11 }, { n: 12, r: 23 }, { n: 20, r: 35 }],
    41: [{ n: 1, r: 0 }, { n: 8, r: 12 }, { n: 14, r: 24 }, { n: 18, r: 35 }],
    43: [{ n: 1, r: 0 }, { n: 6, r: 10 }, { n: 12, r: 20 }, { n: 24, r: 34 }],
    48: [{ n: 6, r: 8 }, { n: 12, r: 18 }, { n: 12, r: 28 }, { n: 18, r: 36 }],
    53: [{ n: 1, r: 0 }, { n: 6, r: 8 }, { n: 12, r: 17 }, { n: 16, r: 27 }, { n: 18, r: 36 }],
    55: [{ n: 1, r: 0 }, { n: 6, r: 8 }, { n: 12, r: 17 }, { n: 18, r: 27 }, { n: 18, r: 36 }],
    61: [{ n: 1, r: 0 }, { n: 6, r: 8 }, { n: 12, r: 16 }, { n: 18, r: 26 }, { n: 24, r: 36 }],
    66: [{ n: 6, r: 6 }, { n: 12, r: 14 }, { n: 18, r: 24 }, { n: 18, r: 33 }, { n: 12, r: 38 }],
    68: [{ n: 2, r: 5 }, { n: 6, r: 12 }, { n: 12, r: 20 }, { n: 18, r: 28 }, { n: 18, r: 35 }, { n: 12, r: 38 }],
    79: [{ n: 1, r: 0 }, { n: 6, r: 6 }, { n: 12, r: 13 }, { n: 18, r: 21 }, { n: 18, r: 29 }, { n: 24, r: 37 }],
    97: [{ n: 1, r: 0 }, { n: 6, r: 5 }, { n: 12, r: 11 }, { n: 18, r: 18 }, { n: 24, r: 25 }, { n: 24, r: 32 }, { n: 12, r: 37 }],
    100:[{ n: 4, r: 4 }, { n: 8, r: 10 }, { n: 12, r: 16 }, { n: 18, r: 23 }, { n: 24, r: 30 }, { n: 22, r: 36 }, { n: 12, r: 38 }],
    128:[{ n: 2, r: 3 }, { n: 6, r: 7 }, { n: 12, r: 12 }, { n: 18, r: 18 }, { n: 24, r: 24 }, { n: 24, r: 30 }, { n: 24, r: 35 }, { n: 18, r: 38 }]
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
    const hasCenter = remaining % 2 === 1;
    if (hasCenter) { rings.push({ n: 1, r: 0 }); remaining--; }
    let ringNum = 0;
    let ringSize = 6;
    while (remaining > 0) {
      const n = Math.min(ringSize, remaining);
      const maxR = 37;
      const minR = hasCenter ? 8 : 12;
      const totalRings = Math.ceil(Math.log2(remaining + ringSize));
      const r = minR + (maxR - minR) * (ringNum / Math.max(1, totalRings));
      rings.push({ n, r: Math.min(r, maxR) });
      remaining -= n;
      ringSize += 6;
      ringNum++;
    }
    return rings;
  }

  /**
   * Get all contact positions with pin numbers.
   * MIL-DTL-38999: inner rings first, clockwise from keyway (12 o'clock).
   */
  function getContactPositions(contactCount, cx, cy) {
    const layout = getLayout(contactCount);
    const positions = [];
    let pinNum = 1;

    for (const ring of layout) {
      for (let i = 0; i < ring.n; i++) {
        let x, y;
        if (ring.r === 0) {
          x = cx;
          y = cy;
        } else {
          // Start at 12 o'clock (-PI/2), go clockwise
          const startAngle = -Math.PI / 2;
          const angle = startAngle + (2 * Math.PI * i) / ring.n;
          x = cx + ring.r * Math.cos(angle);
          y = cy + ring.r * Math.sin(angle);
        }
        positions.push({ x, y, pin: pinNum, ringR: ring.r });
        pinNum++;
      }
    }
    return positions;
  }

  /**
   * Generate compact SVG for card thumbnails (no pin numbers).
   */
  function generate(product) {
    const { contactCount, orientation } = product;
    const isSocket = orientation.includes('Socket');
    const c = getColors();

    const size = 200;
    const cx = size / 2, cy = size / 2;
    const outerR = 80, innerR = 66;

    const positions = getContactPositions(contactCount, cx, cy);

    // Pin radius based on crowding
    let minSpacing = Infinity;
    const layout = getLayout(contactCount);
    for (const ring of layout) {
      if (ring.r > 0 && ring.n > 1) {
        const spacing = (2 * Math.PI * ring.r) / ring.n;
        minSpacing = Math.min(minSpacing, spacing);
      }
    }
    const pinR = Math.max(1.5, Math.min(5, (minSpacing || 10) * 0.4));

    let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" class="connector-svg">`;
    svg += `<circle cx="${cx}" cy="${cy}" r="${outerR}" fill="${c.bodyOuter}" stroke="${c.bodyStroke}" stroke-width="1.5"/>`;
    svg += `<circle cx="${cx}" cy="${cy}" r="${innerR}" fill="${c.bodyInner}" stroke="${c.innerStroke}" stroke-width="1"/>`;
    svg += `<rect x="${cx - 5}" y="${cy - outerR - 1}" width="10" height="16" rx="2" fill="${c.keyway}" stroke="${c.bodyStroke}" stroke-width="1"/>`;
    svg += `<line x1="${cx}" y1="${cy - outerR + 15}" x2="${cx}" y2="${cy - innerR - 2}" stroke="${c.innerStroke}" stroke-width="1.5"/>`;

    for (const pos of positions) {
      if (isSocket) {
        svg += `<circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="${pinR.toFixed(1)}" fill="none" stroke="${c.gold}" stroke-width="1.2"/>`;
        svg += `<circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="${(pinR * 0.3).toFixed(1)}" fill="${c.goldStroke}" opacity="0.5"/>`;
      } else {
        svg += `<circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="${pinR.toFixed(1)}" fill="${c.gold}" stroke="${c.goldStroke}" stroke-width="0.5"/>`;
        svg += `<circle cx="${(pos.x - pinR * 0.2).toFixed(1)}" cy="${(pos.y - pinR * 0.2).toFixed(1)}" r="${(pinR * 0.3).toFixed(1)}" fill="rgba(255,255,255,0.25)"/>`;
      }
    }

    svg += `<circle cx="${cx}" cy="${cy}" r="${outerR}" fill="none" stroke="${c.bodyStroke}" stroke-width="0.5" stroke-dasharray="2,4"/>`;
    svg += '</svg>';
    return svg;
  }

  /**
   * Generate detailed SVG with MIL-DTL-38999 pin numbering.
   * Numbers rendered directly inside each contact position.
   */
  function generateDetailed(product) {
    const { contactCount, orientation, shellSize } = product;
    const isSocket = orientation ? orientation.includes('Socket') : true;
    const c = getColors();

    const size = 360;
    const cx = size / 2, cy = size / 2;
    const outerR = 150;
    const innerR = 124;

    // Scale contact positions from the 200×200 base to this larger canvas
    const scale = outerR / 80;
    const positions = getContactPositions(contactCount, cx, cy);
    const scaledPositions = positions.map(p => ({
      x: cx + (p.x - 100) * scale,
      y: cy + (p.y - 100) * scale,
      pin: p.pin
    }));

    // Contact radius — make them large enough to hold a number inside
    let minSpacing = Infinity;
    const layout = getLayout(contactCount);
    for (const ring of layout) {
      if (ring.r > 0 && ring.n > 1) {
        const spacing = (2 * Math.PI * ring.r * scale) / ring.n;
        minSpacing = Math.min(minSpacing, spacing);
      }
    }
    // Contacts sized to nearly touch their neighbors — numbers sit inside
    const pinR = Math.max(5, Math.min(12, (minSpacing || 20) * 0.44));
    const fontSize = Math.max(5, Math.min(9.5, pinR * 0.88));

    const isSmallShell = shellSize === '01' || shellSize === '02';
    const viewLabel = isSmallShell
      ? 'Rear view of receptacle'
      : 'Front view of male insulator';

    let svg = `<svg viewBox="0 0 ${size} ${size + 26}" xmlns="http://www.w3.org/2000/svg" class="connector-svg-detailed">`;

    // Outer body
    svg += `<circle cx="${cx}" cy="${cy}" r="${outerR}" fill="${c.bodyOuter}" stroke="${c.bodyStroke}" stroke-width="2"/>`;
    // Inner face
    svg += `<circle cx="${cx}" cy="${cy}" r="${innerR}" fill="${c.bodyInner}" stroke="${c.innerStroke}" stroke-width="1.5"/>`;

    // Keyway notch at 12 o'clock
    svg += `<rect x="${cx - 9}" y="${cy - outerR - 2}" width="18" height="28" rx="3" fill="${c.keyway}" stroke="${c.bodyStroke}" stroke-width="1.5"/>`;
    svg += `<line x1="${cx}" y1="${cy - outerR + 26}" x2="${cx}" y2="${cy - innerR - 3}" stroke="${c.innerStroke}" stroke-width="2"/>`;

    // Draw each contact with its pin number inside
    for (const pos of scaledPositions) {
      const px = pos.x.toFixed(1);
      const py = pos.y.toFixed(1);

      // Contact circle — filled background so number is readable
      svg += `<circle cx="${px}" cy="${py}" r="${pinR.toFixed(1)}" fill="${c.bodyInner}" stroke="${c.gold}" stroke-width="1.5"/>`;

      // Pin number centered inside the contact
      svg += `<text x="${px}" y="${(pos.y + fontSize * 0.35).toFixed(1)}" text-anchor="middle" font-family="'Inter','Helvetica',sans-serif" font-size="${fontSize.toFixed(1)}" font-weight="600" fill="${c.gold}" style="pointer-events:none">${pos.pin}</text>`;
    }

    // Subtle dashed outer ring
    svg += `<circle cx="${cx}" cy="${cy}" r="${outerR}" fill="none" stroke="${c.bodyStroke}" stroke-width="0.7" stroke-dasharray="3,6"/>`;

    // "PIN 1" label above keyway
    svg += `<text x="${cx}" y="${cy - outerR - 8}" text-anchor="middle" font-family="'Inter','Helvetica',sans-serif" font-size="8.5" font-weight="600" fill="${c.gold}" letter-spacing="0.5">PIN 1</text>`;

    // View orientation label at bottom
    svg += `<text x="${cx}" y="${size + 16}" text-anchor="middle" font-family="'Inter','Helvetica',sans-serif" font-size="7.5" fill="${c.bodyStroke}" letter-spacing="0.3">${viewLabel} · Clockwise from keyway</text>`;

    svg += '</svg>';
    return svg;
  }

  return { generate, generateDetailed, getContactPositions };
})();
