# IndexArch 8STA Motorsport Connector Catalogue — Architecture & Logic

**Live demo:** https://paapatype.github.io/8sta-connector-catalogue/
**Repo:** https://github.com/paapatype/8sta-connector-catalogue
**Built by:** IndexArch (Sankalp) with Claude Code
**Last updated:** March 2026

---

## What This Is

An interactive web tool for the Souriau/Eaton 8STA motorsport connector series. It does three things:

1. **Catalog** — Browse, filter, compare, and quote 96 connector products with SVG pinout diagrams
2. **Spec Engine** — Enter wire requirements (count + current per group), get ranked connector matches
3. **Cross-Reference** — Enter a Deutsch AS connector, find the 8STA equivalent

Zero backend. Pure static HTML/CSS/JS. Deployable to GitHub Pages. All logic is deterministic — no AI in the critical path.

---

## File Structure

```
8sta-connector-catalogue/
├── index.html                 # Single page — all sections, modals, tab bar
├── css/
│   └── styles.css             # Dark/light theme, Swiss typography, mobile responsive
└── js/
    ├── data.js                # 96 products (PRODUCTS array) + decoder config
    ├── connector-database.js  # 84 layouts (CONNECTOR_DATABASE) + ratings + Deutsch AS data
    ├── svg-generators.js      # SVG connector face diagrams with MIL-DTL-38999 pin numbering
    ├── app.js                 # Catalog: filtering, comparison, quote builder, decoder
    └── spec-engine.js         # Spec Engine: wire matching, cross-reference, results UI
```

Script load order matters: `data.js` → `connector-database.js` → `svg-generators.js` → `app.js` → `spec-engine.js`

---

## Data Layer

### PRODUCTS (data.js) — 96 entries

Each product represents a specific orderable part number:

```javascript
{
  id: '8STA-001',
  partNumber: '8STA1-01-03SN',        // Real Souriau part number
  name: '8STA Shell 01 — 3 Pin Socket, Standard',
  shellSize: '01',                      // 01, 02, 04, 06, 08, 10, 12, 14, 16, 18, 20, 22, 24
  contactCount: 3,
  contactSize: '26',                    // Primary contact size
  wireGauge: 'AWG 26-30',
  orientation: 'Socket (Receptacle)',   // or 'Plug'
  density: 'Standard',                 // Standard, High Density, Double Density
  variant: 'Standard',                 // Standard, Hermetic, Fuel Immersible, PCB Mount, Coax
  bodyMaterial: 'Aluminium',
  plating: 'Black Zinc Nickel',
  matingCycles: 500,
  ipRating: 'IP67 (mated)',
  tempRange: '-55°C to +175°C',
  coupling: 'Push-Pull',               // or 'Quick Mating (Bayonet)' for shells 08+
  weight: 1,                            // grams
  description: 'Technical description...'
}
```

Part number format: `8STA[shellType]-[shellSize]-[layout][contactType][orientation]`
- Shell type: 0 = flange receptacle, 1 = inline, 6 = plug
- Contact type: P = pin, S = socket
- Orientation: N = red (standard), A = yellow, B = blue, etc.

### CONNECTOR_DATABASE (connector-database.js) — 84 entries

Each entry represents a physical contact layout (shell + insert arrangement):

```javascript
{
  shellSize: "10",
  layoutNumber: "35",
  serviceClass: "S",                    // Voltage rating class (see below)
  contacts: {                           // Count per MIL-DTL-38999 contact size
    "#26": 0, "#22D": 13, "#20": 0,
    "#16": 0, "#12": 0, "#8": 0, "#4": 0
  },
  totalContacts: 13,
  weight: 12,                           // grams
  panelCutout: 15.0,                    // mm
  shellDiameter: 21.5,                  // mm (plug outer diameter)
  variants: ["Standard", "Hermetic", "Fuel Immersible"],
  dimensions: { plugDiameter: 21.5, panelCutout: 15.0, diameter: 21.5 }
}
```

**This data was extracted from the real Souriau 8STA catalog (2025 edition), pages 6-11** (contact layouts) and pages 12-20 (dimensions). Every layout number, contact distribution, and service class comes directly from the catalog.

### CONTACT_CURRENT_RATINGS — confirmed from catalog page 17

| Contact Size | Diameter (mm) | Max Current (A) | Usage |
|-------------|---------------|-----------------|-------|
| #26 | 0.4 | 3 | Signal (shell 01-06 only) |
| #22D | 0.6 | 5 | Signal |
| #20 | 1.0 | 7.5 | Signal / Light Power |
| #16 | 1.5 | 13 | Power |
| #12 | 2.0 | 23 | Power |
| #8 | 2.5 | 45 | High Power |
| #4 | 4.0 | 80 | High Power |

**IMPORTANT — Things that need F1 engineer validation:**
1. Are these ratings applied at full value, or do teams apply safety margins (70-80%)?
2. Are there derating factors for temperature? (catalog says -55°C to +175°C operating range)
3. Do unused contact positions need filler plugs for IP67 sealing?

### Service Class Voltage Ratings (from catalog page 11)

| Service Class | Sea Level (Vrms) | At 21,000m (Vrms) |
|--------------|------------------|--------------------|
| R | 400 | N/A |
| S | 1,000 | N/A |
| M | 1,300 | 800 |
| N | 1,000 | 600 |
| I | 1,800 | 1,000 |
| II | 2,300 | 1,000 |

### DEUTSCH_AS_DATABASE — 45 entries

Cross-reference data extracted from the TE Connectivity Deutsch Autosport catalog:

```javascript
{
  series: "AS",                // AS, ASDD, ASX, ASU, ASL, ASR, ASC
  shellSize: "10",
  layoutNumber: "98",
  contacts: { "#22": 13 },    // Note: Deutsch uses #22, 8STA uses #22D — functionally equivalent
  totalContacts: 13,
  maxCurrent: 5,               // Amps per contact
  rating: "I",                 // Voltage rating
  description: "AS Series, 13-way size 22"
}
```

Deutsch AS families included:
- **AS Series** (shells 08-24) — standard range, #22/#20/#16 contacts
- **ASDD** (shells 06-18) — double density, #24 contacts
- **AS Mini** (shell 07) — smaller shell with #22 and #20 contacts
- **ASX** (shell 02) — XtraLITE micro, #22/#24 contacts
- **ASU** (shell 03) — UltraLITE, #22/#24 contacts
- **ASL** (shell 06) — MicroLITE, #23 contacts
- **ASR** (shell 06) — Rally Micro, #23 contacts
- **ASC** (shell 05) — Composite, #22 contacts

**IMPORTANT — Key unknown for cross-reference:**
Both Deutsch AS and Souriau 8STA derive from MIL-DTL-38999. Contact sizes and current ratings are standardized across both. However, layout numbers may NOT be directly interchangeable — e.g., Deutsch AS shell 14 layout 19 (8×#20 + 4×#16) corresponds to Souriau 8STA shell 14 layout 97 (8×#20 + 4×#16). Same contacts, different layout number. The cross-reference engine handles this by matching on contact distribution, not layout number.

---

## Spec Engine — Matching Algorithm

### Input
User enters wire groups via an add-row interface. Each row has:
- **Wire Count** (integer, ≥ 1)
- **Current per Wire** (amps, ≥ 0.1)

Example: "8 signal wires at 3A" + "2 power wires at 25A"

### Step 1: Map currents to contact sizes

```
getMinimumContactSize(currentAmps):
  Sort all contact sizes by maxCurrent ascending
  Return the first size where maxCurrent >= currentAmps
  Return null if nothing is large enough (max is 80A for #4)
```

Example:
- 3A → #26 (rated 3A — exact match)
- 25A → #12 (rated 23A is too low, so #8 at 45A... wait)

Actually the algorithm finds the **minimum** size that can handle the current:
- 3A → #26 (3A ≥ 3A ✓)
- 5A → #22D (5A ≥ 5A ✓)
- 6A → #20 (7.5A ≥ 6A ✓)
- 25A → #8 (45A ≥ 25A ✓, because #12 at 23A < 25A ✗)

So "8 wires at 3A + 2 wires at 25A" becomes: need 8× #26 + 2× #8.

### Step 2: Find matching layouts (greedy allocation)

For each of the 84 layouts in CONNECTOR_DATABASE:

```
allocateContacts(layout, requiredContacts):
  Build a pool of available contacts from the layout
  Sort required sizes LARGEST FIRST (they have fewer substitution options)

  For each required size:
    Try exact-size match first (take from pool)
    Then try progressively LARGER contacts as substitutes
    A #20 contact (rated 7.5A) CAN carry a 3A signal
    A #26 contact (rated 3A) CANNOT carry a 25A load

  If all requirements satisfied: match ✓
  If any requirement can't be filled: no match ✗
```

**Key principle: larger contacts can always substitute for smaller ones.**
A size #8 contact cavity (rated 45A) can accept a wire carrying 3A — it's physically larger and electrically more capable. But a size #26 cavity (rated 3A) cannot accept a wire needing 25A.

### Step 3: Rank results

For each matching layout, calculate:
- **Utilization** = (total required contacts / total layout contacts) × 100
- **Spare contacts** = total layout contacts - total required contacts
- **Fit tag**:
  - ≥ 90% utilization → "Exact Fit" (green)
  - 60-89% utilization → "Recommended" (orange)
  - < 60% utilization → "Oversized" (grey)

Sort order:
1. Exact Fit first, then Recommended, then Oversized
2. Within same tier: fewest spare contacts first (tighter fit = lighter connector)
3. Within same spare count: lightest weight first

### Step 4: Display results

Each result card shows:
- Shell size + layout number
- Fit tag badge
- Contact utilization bar (visual: orange used / grey spare)
- Specs: total contacts, spare contacts, weight, utilization %, diameter, contact breakdown
- Matching catalog products (clickable)
- "Show Reasoning" expandable section showing:
  - Your requirement: e.g., "8 × #26 (3A), 2 × #8 (45A)"
  - This layout provides: e.g., "6 × #22D, 2 × #12"
  - Contact substitutions: e.g., "2 × #12 used as #8 (rated 23A, need 45A max)" — wait, this wouldn't happen. The substitution only goes upward (larger for smaller).
  - Spare contacts count and headroom %

---

## Cross-Reference Engine

### Input
- Manufacturer: "Deutsch AS" (currently the only option)
- Shell size: e.g., "12"
- Layout number: e.g., "35"

### Algorithm

1. Look up the Deutsch AS entry in `DEUTSCH_AS_DATABASE`
2. Get its contact distribution (e.g., AS 12-35 has 10× #20)
3. Search `CONNECTOR_DATABASE` for 8STA layouts with the same contact distribution

**Confidence tiers:**
- **Exact Equivalent** — same shell size, same layout number, same contact distribution
- **Near Match** — same contact distribution but different shell size or layout number
- **No Direct Match** — no layout with identical contacts; shows closest alternatives in the same shell size

### Why this works
Both Deutsch AS and Souriau 8STA implement MIL-DTL-38999. Contact sizes (#22, #20, #16) are standardized across both manufacturers. A Deutsch AS size 22 contact and a Souriau 8STA size 22D contact have the same physical dimensions and electrical ratings — they're both implementations of the same military specification.

The layout numbers may differ (Deutsch AS 14-19 = 8×#20 + 4×#16, Souriau 8STA 14-97 = 8×#20 + 4×#16 — same contacts, different catalog numbers). The engine matches on **contact distribution**, not catalog number.

---

## SVG Pin Diagrams

### MIL-DTL-38999 Pin Numbering Convention

From the Souriau catalog (pages 6-7):

- **Sizes 01 and 02:** "Marking on shell. Rear view of receptacle for male and female insulator. Opposite marking between plug and receptacle."
- **Sizes 04 to 24:** "Marking on insulator. Front view of male insulator for plug and receptacle. Opposite marking between male and female insulator."

Pin numbering rules:
1. **Pin 1** starts at the keyway (12 o'clock position)
2. Numbering goes **clockwise** when viewed from the mating face
3. **Inner rings numbered first**, then outer rings
4. Center contact (if present) is always Pin 1

### Two rendering modes

1. **`generate(product)`** — compact thumbnail for product card grid (no pin numbers, too small to read)
2. **`generateDetailed(product)`** — large diagram for product detail modal, with numbered pins inside each contact circle, "PIN 1" label above keyway, and view orientation note at bottom

Contact layouts are defined as concentric rings in `CONTACT_LAYOUTS`:
```javascript
// Example: 19 contacts = center + inner ring of 6 + outer ring of 12
19: [{ n: 1, r: 0 }, { n: 6, r: 17 }, { n: 12, r: 33 }]
```

The SVG renders contacts as gold-bordered dark discs with the pin number in gold text inside. Socket contacts are hollow (stroke only); plug contacts are filled.

---

## Catalog Features

### Faceted Filtering
- **Shell Size:** 01, 02, 04, 06, 08, 10, 12, 14, 16, 18, 20, 22, 24
- **Orientation:** Socket (Receptacle) / Plug
- **Density:** Standard / High Density / Double Density
- **Variant:** Standard / Hermetic / Fuel Immersible / PCB Mount / Coax / Clinch Nut

Filters use AND logic across dimensions, OR within a dimension. Active filter count shown in badge.

### Text Search
Debounced at 200ms. Searches across: part number, name, description, shell size, orientation, density, variant, wire gauge, contact count, body material, plating.

### Side-by-Side Comparison
- Compare up to 3 connectors
- Fixed bottom tray shows selected items
- Comparison table highlights rows where values differ (orange background)
- 14 spec fields compared

### Quote Builder
- Cart-like interface with per-item quantity
- Persists to sessionStorage (survives page refresh)
- "Submit Inquiry" shows demo confirmation
- Works from both catalog cards and spec engine results

### Part Number Decoder
- Interactive widget with dropdowns: Shell Size → Insert Arrangement → Contact Type → Variant
- Builds the part number in real-time with color-coded segments
- Shows "Match found" if the decoded number exists in the product catalog

### Theme
- Dark mode (default) — motorsport aesthetic
- Light mode — toggle in header
- Respects `prefers-color-scheme` system preference
- SVG colors adapt to theme via CSS custom properties

### URL Hash State
Filter and search state encoded in URL hash for shareable/bookmarkable views.

---

## What Needs Validation Before Production

These are the critical questions from the vision doc (Part 4) that determine whether the matching logic is 100% accurate:

### Current Ratings & Derating
1. Are the catalog current ratings (#26=3A, #22D=5A, etc.) the values engineers actually use for selection?
2. Do teams apply safety margins? (e.g., if a wire carries 3A, do they spec a contact rated for 4A? 5A?)
3. Are there temperature derating factors? The catalog says -55°C to +175°C range.
4. Are the derating factors linear or stepped? (e.g., at 125°C, is a #20 contact still rated 7.5A or is it derated to 5A?)

### Contact Substitution
5. In practice, do engineers use larger contacts for lower-current wires? (Our algorithm assumes yes — a #20 cavity can carry a 3A signal.)
6. Is there a practical downside to this? (e.g., crimp tool compatibility, wire gauge mismatch in the contact barrel)

### Spare Contacts & Sealing
7. Do unused contact positions need filler plugs for IP67 sealing?
8. If yes, does every spare position get a filler plug, or only in certain applications?
9. Does this affect the "spare contacts" metric? (Spare contacts = future expansion room vs. spare contacts = extra cost for filler plugs)

### Service Class
10. Does the service class (voltage rating) affect connector selection in practice, or is it always driven by contact count and current?
11. In motorsport, what service classes are typically used? (Most layouts seem to be Service I or M)

### Cross-Reference Accuracy
12. Are Deutsch AS and Souriau 8STA shell sizes physically identical? (Same panel cutout, same mating dimensions?)
13. Can a Deutsch AS plug mate with a Souriau 8STA receptacle of the same shell size?
14. Are there any contact compatibility issues? (Deutsch #22 vs. Souriau #22D — same spec?)

### Real-World Workflow
15. When an engineer needs a connector, what's their actual process? Do they start with wire count + current, or with a specific shell size?
16. How often do engineers cross-reference between Deutsch AS and Souriau 8STA?
17. What information is missing from this tool that engineers need to make a final selection?

---

## Tech Stack

- **Vanilla HTML/CSS/JS** — no frameworks, no build tools, no dependencies
- **Inter** (Google Fonts) — body text
- **JetBrains Mono** (Google Fonts) — part numbers, technical data
- **GitHub Pages** — static deployment
- **sessionStorage** — quote basket persistence
- **CSS custom properties** — theming (dark/light)
- **SVG** — connector diagrams generated in JavaScript

Total: ~5,700 lines across 7 files. No `node_modules`, no `package.json`, no build step.

---

## How to Run Locally

```bash
cd 8sta-connector-catalogue
python3 -m http.server 8765
open http://localhost:8765
```

Or just open `index.html` directly in a browser.
