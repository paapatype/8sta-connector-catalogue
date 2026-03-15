/**
 * 8STA Connector Database — Contact Layout Data & Current Ratings
 * Based on MIL-DTL-38999 standard contact arrangements
 * Representative data for the Souriau 8STA series
 */

const CONTACT_CURRENT_RATINGS = {
  "#26":  { diameter: 0.4, maxCurrent: 3,   description: "Signal" },
  "#22D": { diameter: 0.6, maxCurrent: 5,   description: "Signal" },
  "#20":  { diameter: 1.0, maxCurrent: 13,  description: "Power/Signal" },
  "#16":  { diameter: 1.5, maxCurrent: 23,  description: "Power" },
  "#12":  { diameter: 2.0, maxCurrent: 32,  description: "Power" },
  "#8":   { diameter: 2.5, maxCurrent: 46,  description: "Power" },
  "#4":   { diameter: 4.0, maxCurrent: 100, description: "High Power" }
};

/**
 * Contact size hierarchy — ordered smallest to largest.
 * A larger contact can always substitute for a smaller one.
 */
const CONTACT_SIZE_ORDER = ["#26", "#22D", "#20", "#16", "#12", "#8", "#4"];

const CONNECTOR_DATABASE = [
  // === Shell Size 01 ===
  {
    shellSize: "01",
    layoutNumber: "35",
    serviceClass: "R",
    contacts: { "#26": 1, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 1,
    weight: 1,
    panelCutout: 7.9,
    variants: ["Standard"],
    dimensions: { length: 18.0, diameter: 9.5 }
  },
  // === Shell Size 02 ===
  {
    shellSize: "02",
    layoutNumber: "35",
    serviceClass: "R",
    contacts: { "#26": 2, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 2,
    weight: 2,
    panelCutout: 9.5,
    variants: ["Standard"],
    dimensions: { length: 22.0, diameter: 11.0 }
  },
  {
    shellSize: "02",
    layoutNumber: "98",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 1, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 1,
    weight: 2,
    panelCutout: 9.5,
    variants: ["Standard"],
    dimensions: { length: 22.0, diameter: 11.0 }
  },
  // === Shell Size 06 ===
  {
    shellSize: "06",
    layoutNumber: "35",
    serviceClass: "R",
    contacts: { "#26": 6, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 6,
    weight: 5,
    panelCutout: 11.1,
    variants: ["Standard"],
    dimensions: { length: 24.0, diameter: 13.5 }
  },
  {
    shellSize: "06",
    layoutNumber: "98",
    serviceClass: "R",
    contacts: { "#26": 4, "#22D": 0, "#20": 1, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 5,
    panelCutout: 11.1,
    variants: ["Standard"],
    dimensions: { length: 24.0, diameter: 13.5 }
  },
  {
    shellSize: "06",
    layoutNumber: "05",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 3, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    weight: 5,
    panelCutout: 11.1,
    variants: ["Standard"],
    dimensions: { length: 24.0, diameter: 13.5 }
  },
  // === Shell Size 08 ===
  {
    shellSize: "08",
    layoutNumber: "35",
    serviceClass: "R",
    contacts: { "#26": 7, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 7,
    weight: 8,
    panelCutout: 12.7,
    variants: ["Standard", "Hermetic"],
    dimensions: { length: 28.5, diameter: 15.8 }
  },
  {
    shellSize: "08",
    layoutNumber: "33",
    serviceClass: "R",
    contacts: { "#26": 12, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 12,
    weight: 8,
    panelCutout: 12.7,
    variants: ["Standard"],
    dimensions: { length: 28.5, diameter: 15.8 }
  },
  {
    shellSize: "08",
    layoutNumber: "98",
    serviceClass: "R",
    contacts: { "#26": 3, "#22D": 0, "#20": 2, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 8,
    panelCutout: 12.7,
    variants: ["Standard"],
    dimensions: { length: 28.5, diameter: 15.8 }
  },
  {
    shellSize: "08",
    layoutNumber: "04",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 4, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 4,
    weight: 8,
    panelCutout: 12.7,
    variants: ["Standard"],
    dimensions: { length: 28.5, diameter: 15.8 }
  },
  {
    shellSize: "08",
    layoutNumber: "06",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 2, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 2,
    weight: 8,
    panelCutout: 12.7,
    variants: ["Standard"],
    dimensions: { length: 28.5, diameter: 15.8 }
  },
  // === Shell Size 10 ===
  {
    shellSize: "10",
    layoutNumber: "35",
    serviceClass: "R",
    contacts: { "#26": 5, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 12,
    panelCutout: 15.9,
    variants: ["Standard"],
    dimensions: { length: 30.0, diameter: 19.0 }
  },
  {
    shellSize: "10",
    layoutNumber: "06",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 5, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 12,
    panelCutout: 15.9,
    variants: ["Standard"],
    dimensions: { length: 30.0, diameter: 19.0 }
  },
  {
    shellSize: "10",
    layoutNumber: "98",
    serviceClass: "R",
    contacts: { "#26": 3, "#22D": 0, "#20": 2, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 12,
    panelCutout: 15.9,
    variants: ["Standard"],
    dimensions: { length: 30.0, diameter: 19.0 }
  },
  {
    shellSize: "10",
    layoutNumber: "33",
    serviceClass: "R",
    contacts: { "#26": 26, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 26,
    weight: 12,
    panelCutout: 15.9,
    variants: ["Standard"],
    dimensions: { length: 30.0, diameter: 19.0 }
  },
  {
    shellSize: "10",
    layoutNumber: "41",
    serviceClass: "R",
    contacts: { "#26": 8, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 8,
    weight: 12,
    panelCutout: 15.9,
    variants: ["Standard"],
    dimensions: { length: 30.0, diameter: 19.0 }
  },
  {
    shellSize: "10",
    layoutNumber: "02",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 3, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    weight: 12,
    panelCutout: 15.9,
    variants: ["Standard"],
    dimensions: { length: 30.0, diameter: 19.0 }
  },
  {
    shellSize: "10",
    layoutNumber: "99",
    serviceClass: "R",
    contacts: { "#26": 2, "#22D": 0, "#20": 0, "#16": 2, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 4,
    weight: 12,
    panelCutout: 15.9,
    variants: ["Standard"],
    dimensions: { length: 30.0, diameter: 19.0 }
  },
  {
    shellSize: "10",
    layoutNumber: "07",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 2, "#8": 0, "#4": 0 },
    totalContacts: 2,
    weight: 12,
    panelCutout: 15.9,
    variants: ["Standard"],
    dimensions: { length: 30.0, diameter: 19.0 }
  },
  // === Shell Size 12 ===
  {
    shellSize: "12",
    layoutNumber: "35",
    serviceClass: "R",
    contacts: { "#26": 10, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 10,
    weight: 16,
    panelCutout: 19.1,
    variants: ["Standard", "Hermetic"],
    dimensions: { length: 32.0, diameter: 22.2 }
  },
  {
    shellSize: "12",
    layoutNumber: "33",
    serviceClass: "R",
    contacts: { "#26": 32, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 32,
    weight: 16,
    panelCutout: 19.1,
    variants: ["Standard"],
    dimensions: { length: 32.0, diameter: 22.2 }
  },
  {
    shellSize: "12",
    layoutNumber: "10",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 8, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 8,
    weight: 16,
    panelCutout: 19.1,
    variants: ["Standard"],
    dimensions: { length: 32.0, diameter: 22.2 }
  },
  {
    shellSize: "12",
    layoutNumber: "98",
    serviceClass: "R",
    contacts: { "#26": 6, "#22D": 0, "#20": 2, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 8,
    weight: 16,
    panelCutout: 19.1,
    variants: ["Standard"],
    dimensions: { length: 32.0, diameter: 22.2 }
  },
  {
    shellSize: "12",
    layoutNumber: "03",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 4, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 4,
    weight: 16,
    panelCutout: 19.1,
    variants: ["Standard"],
    dimensions: { length: 32.0, diameter: 22.2 }
  },
  {
    shellSize: "12",
    layoutNumber: "99",
    serviceClass: "R",
    contacts: { "#26": 4, "#22D": 0, "#20": 0, "#16": 2, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 6,
    weight: 16,
    panelCutout: 19.1,
    variants: ["Standard"],
    dimensions: { length: 32.0, diameter: 22.2 }
  },
  {
    shellSize: "12",
    layoutNumber: "07",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 3, "#8": 0, "#4": 0 },
    totalContacts: 3,
    weight: 16,
    panelCutout: 19.1,
    variants: ["Standard"],
    dimensions: { length: 32.0, diameter: 22.2 }
  },
  // === Shell Size 14 ===
  {
    shellSize: "14",
    layoutNumber: "35",
    serviceClass: "R",
    contacts: { "#26": 19, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 19,
    weight: 22,
    panelCutout: 22.2,
    variants: ["Standard", "Hermetic"],
    dimensions: { length: 36.0, diameter: 25.4 }
  },
  {
    shellSize: "14",
    layoutNumber: "15",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 12, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 12,
    weight: 22,
    panelCutout: 22.2,
    variants: ["Standard"],
    dimensions: { length: 36.0, diameter: 25.4 }
  },
  {
    shellSize: "14",
    layoutNumber: "98",
    serviceClass: "R",
    contacts: { "#26": 12, "#22D": 0, "#20": 3, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 15,
    weight: 22,
    panelCutout: 22.2,
    variants: ["Standard"],
    dimensions: { length: 36.0, diameter: 25.4 }
  },
  {
    shellSize: "14",
    layoutNumber: "05",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 6, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 6,
    weight: 22,
    panelCutout: 22.2,
    variants: ["Standard"],
    dimensions: { length: 36.0, diameter: 25.4 }
  },
  {
    shellSize: "14",
    layoutNumber: "99",
    serviceClass: "R",
    contacts: { "#26": 10, "#22D": 0, "#20": 0, "#16": 3, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 13,
    weight: 22,
    panelCutout: 22.2,
    variants: ["Standard"],
    dimensions: { length: 36.0, diameter: 25.4 }
  },
  {
    shellSize: "14",
    layoutNumber: "09",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 6, "#16": 0, "#12": 2, "#8": 0, "#4": 0 },
    totalContacts: 8,
    weight: 22,
    panelCutout: 22.2,
    variants: ["Standard"],
    dimensions: { length: 36.0, diameter: 25.4 }
  },
  {
    shellSize: "14",
    layoutNumber: "07",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 4, "#8": 0, "#4": 0 },
    totalContacts: 4,
    weight: 22,
    panelCutout: 22.2,
    variants: ["Standard"],
    dimensions: { length: 36.0, diameter: 25.4 }
  },
  // === Shell Size 16 ===
  {
    shellSize: "16",
    layoutNumber: "35",
    serviceClass: "R",
    contacts: { "#26": 22, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 22,
    weight: 28,
    panelCutout: 25.4,
    variants: ["Standard", "Hermetic"],
    dimensions: { length: 38.0, diameter: 28.6 }
  },
  {
    shellSize: "16",
    layoutNumber: "26",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 16, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 16,
    weight: 28,
    panelCutout: 25.4,
    variants: ["Standard"],
    dimensions: { length: 38.0, diameter: 28.6 }
  },
  {
    shellSize: "16",
    layoutNumber: "98",
    serviceClass: "R",
    contacts: { "#26": 12, "#22D": 0, "#20": 4, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 16,
    weight: 28,
    panelCutout: 25.4,
    variants: ["Standard"],
    dimensions: { length: 38.0, diameter: 28.6 }
  },
  {
    shellSize: "16",
    layoutNumber: "08",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 8, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 8,
    weight: 28,
    panelCutout: 25.4,
    variants: ["Standard"],
    dimensions: { length: 38.0, diameter: 28.6 }
  },
  {
    shellSize: "16",
    layoutNumber: "99",
    serviceClass: "R",
    contacts: { "#26": 8, "#22D": 0, "#20": 4, "#16": 2, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 14,
    weight: 28,
    panelCutout: 25.4,
    variants: ["Standard"],
    dimensions: { length: 38.0, diameter: 28.6 }
  },
  {
    shellSize: "16",
    layoutNumber: "11",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 4, "#8": 0, "#4": 0 },
    totalContacts: 4,
    weight: 28,
    panelCutout: 25.4,
    variants: ["Standard"],
    dimensions: { length: 38.0, diameter: 28.6 }
  },
  {
    shellSize: "16",
    layoutNumber: "09",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 8, "#16": 0, "#12": 2, "#8": 0, "#4": 0 },
    totalContacts: 10,
    weight: 28,
    panelCutout: 25.4,
    variants: ["Standard"],
    dimensions: { length: 38.0, diameter: 28.6 }
  },
  // === Shell Size 20 ===
  {
    shellSize: "20",
    layoutNumber: "35",
    serviceClass: "R",
    contacts: { "#26": 39, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 39,
    weight: 38,
    panelCutout: 31.8,
    variants: ["Standard", "Fuel Immersible"],
    dimensions: { length: 44.0, diameter: 34.9 }
  },
  {
    shellSize: "20",
    layoutNumber: "16",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 22, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 22,
    weight: 38,
    panelCutout: 31.8,
    variants: ["Standard"],
    dimensions: { length: 44.0, diameter: 34.9 }
  },
  {
    shellSize: "20",
    layoutNumber: "98",
    serviceClass: "R",
    contacts: { "#26": 22, "#22D": 0, "#20": 6, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 28,
    weight: 38,
    panelCutout: 31.8,
    variants: ["Standard"],
    dimensions: { length: 44.0, diameter: 34.9 }
  },
  {
    shellSize: "20",
    layoutNumber: "04",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 12, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 12,
    weight: 38,
    panelCutout: 31.8,
    variants: ["Standard"],
    dimensions: { length: 44.0, diameter: 34.9 }
  },
  {
    shellSize: "20",
    layoutNumber: "99",
    serviceClass: "R",
    contacts: { "#26": 18, "#22D": 0, "#20": 6, "#16": 3, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 27,
    weight: 38,
    panelCutout: 31.8,
    variants: ["Standard"],
    dimensions: { length: 44.0, diameter: 34.9 }
  },
  {
    shellSize: "20",
    layoutNumber: "09",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 12, "#16": 0, "#12": 3, "#8": 0, "#4": 0 },
    totalContacts: 15,
    weight: 38,
    panelCutout: 31.8,
    variants: ["Standard"],
    dimensions: { length: 44.0, diameter: 34.9 }
  },
  {
    shellSize: "20",
    layoutNumber: "11",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 7, "#8": 0, "#4": 0 },
    totalContacts: 7,
    weight: 38,
    panelCutout: 31.8,
    variants: ["Standard"],
    dimensions: { length: 44.0, diameter: 34.9 }
  },
  {
    shellSize: "20",
    layoutNumber: "41",
    serviceClass: "R",
    contacts: { "#26": 30, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 30,
    weight: 38,
    panelCutout: 31.8,
    variants: ["Standard"],
    dimensions: { length: 44.0, diameter: 34.9 }
  },
  // === Shell Size 24 ===
  {
    shellSize: "24",
    layoutNumber: "35",
    serviceClass: "R",
    contacts: { "#26": 61, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 61,
    weight: 52,
    panelCutout: 38.1,
    variants: ["Standard", "Hermetic"],
    dimensions: { length: 50.0, diameter: 41.3 }
  },
  {
    shellSize: "24",
    layoutNumber: "61",
    serviceClass: "R",
    contacts: { "#26": 61, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 61,
    weight: 52,
    panelCutout: 38.1,
    variants: ["Standard", "Hermetic"],
    dimensions: { length: 50.0, diameter: 41.3 }
  },
  {
    shellSize: "24",
    layoutNumber: "16",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 32, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 32,
    weight: 52,
    panelCutout: 38.1,
    variants: ["Standard"],
    dimensions: { length: 50.0, diameter: 41.3 }
  },
  {
    shellSize: "24",
    layoutNumber: "98",
    serviceClass: "R",
    contacts: { "#26": 30, "#22D": 0, "#20": 10, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 40,
    weight: 52,
    panelCutout: 38.1,
    variants: ["Standard"],
    dimensions: { length: 50.0, diameter: 41.3 }
  },
  {
    shellSize: "24",
    layoutNumber: "04",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 16, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 16,
    weight: 52,
    panelCutout: 38.1,
    variants: ["Standard"],
    dimensions: { length: 50.0, diameter: 41.3 }
  },
  {
    shellSize: "24",
    layoutNumber: "99",
    serviceClass: "R",
    contacts: { "#26": 24, "#22D": 0, "#20": 8, "#16": 4, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 36,
    weight: 52,
    panelCutout: 38.1,
    variants: ["Standard"],
    dimensions: { length: 50.0, diameter: 41.3 }
  },
  {
    shellSize: "24",
    layoutNumber: "09",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 16, "#16": 0, "#12": 4, "#8": 0, "#4": 0 },
    totalContacts: 20,
    weight: 52,
    panelCutout: 38.1,
    variants: ["Standard"],
    dimensions: { length: 50.0, diameter: 41.3 }
  },
  {
    shellSize: "24",
    layoutNumber: "11",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 10, "#8": 0, "#4": 0 },
    totalContacts: 10,
    weight: 52,
    panelCutout: 38.1,
    variants: ["Standard"],
    dimensions: { length: 50.0, diameter: 41.3 }
  },
  {
    shellSize: "24",
    layoutNumber: "12",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 8, "#12": 0, "#8": 2, "#4": 0 },
    totalContacts: 10,
    weight: 52,
    panelCutout: 38.1,
    variants: ["Standard"],
    dimensions: { length: 50.0, diameter: 41.3 }
  },
  {
    shellSize: "24",
    layoutNumber: "21",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 4, "#4": 0 },
    totalContacts: 4,
    weight: 52,
    panelCutout: 38.1,
    variants: ["Standard"],
    dimensions: { length: 50.0, diameter: 41.3 }
  },
  {
    shellSize: "24",
    layoutNumber: "22",
    serviceClass: "R",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 2 },
    totalContacts: 2,
    weight: 52,
    panelCutout: 38.1,
    variants: ["Standard"],
    dimensions: { length: 50.0, diameter: 41.3 }
  }
];

/**
 * Deutsch AS cross-reference database
 * Deutsch AS (Amphenol/TE) uses the same MIL-DTL-38999 standard
 */
const DEUTSCH_AS_DATABASE = [
  {
    manufacturer: "Deutsch AS",
    partSeries: "D38999",
    shellSize: "08",
    layoutNumber: "35",
    contacts: { "#26": 7, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 7
  },
  {
    manufacturer: "Deutsch AS",
    partSeries: "D38999",
    shellSize: "10",
    layoutNumber: "06",
    contacts: { "#26": 0, "#22D": 0, "#20": 5, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5
  },
  {
    manufacturer: "Deutsch AS",
    partSeries: "D38999",
    shellSize: "10",
    layoutNumber: "35",
    contacts: { "#26": 5, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5
  },
  {
    manufacturer: "Deutsch AS",
    partSeries: "D38999",
    shellSize: "12",
    layoutNumber: "35",
    contacts: { "#26": 10, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 10
  },
  {
    manufacturer: "Deutsch AS",
    partSeries: "D38999",
    shellSize: "12",
    layoutNumber: "10",
    contacts: { "#26": 0, "#22D": 0, "#20": 8, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 8
  },
  {
    manufacturer: "Deutsch AS",
    partSeries: "D38999",
    shellSize: "14",
    layoutNumber: "35",
    contacts: { "#26": 19, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 19
  },
  {
    manufacturer: "Deutsch AS",
    partSeries: "D38999",
    shellSize: "16",
    layoutNumber: "35",
    contacts: { "#26": 22, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 22
  },
  {
    manufacturer: "Deutsch AS",
    partSeries: "D38999",
    shellSize: "20",
    layoutNumber: "35",
    contacts: { "#26": 39, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 39
  },
  {
    manufacturer: "Deutsch AS",
    partSeries: "D38999",
    shellSize: "20",
    layoutNumber: "99",
    contacts: { "#26": 18, "#22D": 0, "#20": 6, "#16": 3, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 27
  },
  {
    manufacturer: "Deutsch AS",
    partSeries: "D38999",
    shellSize: "24",
    layoutNumber: "35",
    contacts: { "#26": 61, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 61
  }
];
