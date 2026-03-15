/**
 * 8STA Connector Database — Contact Layout Data & Current Ratings
 * Based on the Souriau 8STA catalogue (pages 6-20)
 * Real contact arrangements, service classes, and dimensional data
 */

const CONTACT_CURRENT_RATINGS = {
  "#26":  { diameter: 0.4, maxCurrent: 3,    description: "Signal (shell 01-06 only)" },
  "#22D": { diameter: 0.6, maxCurrent: 5,    description: "Signal" },
  "#20":  { diameter: 1.0, maxCurrent: 7.5,  description: "Signal / Light Power" },
  "#16":  { diameter: 1.5, maxCurrent: 13,   description: "Power" },
  "#12":  { diameter: 2.0, maxCurrent: 23,   description: "Power" },
  "#8":   { diameter: 2.5, maxCurrent: 45,   description: "High Power" },
  "#4":   { diameter: 4.0, maxCurrent: 80,   description: "High Power" }
};

/**
 * Contact size hierarchy — ordered smallest to largest.
 * A larger contact can always substitute for a smaller one.
 */
const CONTACT_SIZE_ORDER = ["#26", "#22D", "#20", "#16", "#12", "#8", "#4"];

/**
 * Service class voltage ratings (page 11):
 *   R  = 400V sea level
 *   S  = 1000V sea level
 *   M  = 1300V sea level / 800V at 21 000m
 *   N  = 1000V sea level / 600V at 21 000m
 *   I  = 1800V sea level / 1000V at 21 000m
 *   II = 2300V sea level / 1000V at 21 000m
 */

const CONNECTOR_DATABASE = [

  // =========================================================================
  // Shell Size 01  (page 12)
  // Miniature push-pull, no bayonet coupling
  // =========================================================================
  {
    shellSize: "01",
    layoutNumber: "03",
    serviceClass: "R",
    contacts: { "#26": 3, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    weight: 1,
    panelCutout: null,
    shellDiameter: 5.7,
    variants: ["Standard"],
    dimensions: { plugDiameter: 5.7, length: 16.3, diameter: 5.7 }
  },
  {
    shellSize: "01",
    layoutNumber: "05",
    serviceClass: "R",
    contacts: { "#26": 5, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 1,
    panelCutout: null,
    shellDiameter: 6.6,
    variants: ["Standard"],
    dimensions: { plugDiameter: 6.6, length: 16.7, diameter: 6.6 }
  },

  // =========================================================================
  // Shell Size 02  (pages 6, 14)
  // =========================================================================
  {
    shellSize: "02",
    layoutNumber: "05",
    serviceClass: "R",
    contacts: { "#26": 5, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 2,
    panelCutout: null,
    shellDiameter: 7.3,
    variants: ["Standard", "Hermetic", "High Density"],
    dimensions: { plugDiameter: 7.3, length: 16.3, diameter: 7.3 }
  },
  {
    shellSize: "02",
    layoutNumber: "06",
    serviceClass: "R",
    contacts: { "#26": 6, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 6,
    weight: 2,
    panelCutout: null,
    shellDiameter: 7.7,
    variants: ["Standard", "High Density"],
    dimensions: { plugDiameter: 7.7, length: 16.7, diameter: 7.7 }
  },
  {
    shellSize: "02",
    layoutNumber: "35",
    serviceClass: "S",
    contacts: { "#26": 0, "#22D": 3, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    weight: 2,
    panelCutout: null,
    shellDiameter: 7.3,
    variants: ["Standard", "Hermetic"],
    dimensions: { plugDiameter: 7.3, length: 17.6, diameter: 7.3 }
  },

  // =========================================================================
  // Shell Size 04  (page 6)
  // =========================================================================
  {
    shellSize: "04",
    layoutNumber: "05",
    serviceClass: "M",
    contacts: { "#26": 5, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 3,
    panelCutout: null,
    shellDiameter: 8.6,
    variants: ["Standard"],
    dimensions: { plugDiameter: 8.6, length: 18.3, diameter: 8.6 }
  },
  {
    shellSize: "04",
    layoutNumber: "35",
    serviceClass: "S",
    contacts: { "#26": 0, "#22D": 3, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    weight: 3,
    panelCutout: null,
    shellDiameter: 8.6,
    variants: ["Standard", "Fuel Immersible"],
    dimensions: { plugDiameter: 8.6, length: 18.3, diameter: 8.6 }
  },

  // =========================================================================
  // Shell Size 06  (page 6)
  // =========================================================================
  {
    shellSize: "06",
    layoutNumber: "05",
    serviceClass: "R",
    contacts: { "#26": 5, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 5,
    panelCutout: null,
    shellDiameter: 10.4,
    variants: ["Standard", "Fuel Immersible"],
    dimensions: { plugDiameter: 10.4, length: 23.3, diameter: 10.4 }
  },
  {
    shellSize: "06",
    layoutNumber: "06",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 6, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 6,
    weight: 5,
    panelCutout: null,
    shellDiameter: 10.4,
    variants: ["Standard", "Fuel Immersible"],
    dimensions: { plugDiameter: 10.4, length: 23.3, diameter: 10.4 }
  },
  {
    shellSize: "06",
    layoutNumber: "09",
    serviceClass: "R",
    contacts: { "#26": 9, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 9,
    weight: 5,
    panelCutout: null,
    shellDiameter: 10.4,
    variants: ["Standard", "High Density"],
    dimensions: { plugDiameter: 10.4, length: 23.3, diameter: 10.4 }
  },
  {
    shellSize: "06",
    layoutNumber: "12",
    serviceClass: "R",
    contacts: { "#26": 12, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 12,
    weight: 5,
    panelCutout: null,
    shellDiameter: 10.4,
    variants: ["Standard", "High Density"],
    dimensions: { plugDiameter: 10.4, length: 23.3, diameter: 10.4 }
  },
  {
    shellSize: "06",
    layoutNumber: "35",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 5, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 5,
    panelCutout: null,
    shellDiameter: 10.4,
    variants: ["Standard"],
    dimensions: { plugDiameter: 10.4, length: 23.3, diameter: 10.4 }
  },
  {
    shellSize: "06",
    layoutNumber: "98",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 3, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    weight: 5,
    panelCutout: null,
    shellDiameter: 10.4,
    variants: ["Standard", "Fuel Immersible"],
    dimensions: { plugDiameter: 10.4, length: 23.3, diameter: 10.4 }
  },

  // =========================================================================
  // Shell Size 08  (page 6)
  // Bayonet coupling from shell 08 upwards
  // =========================================================================
  {
    shellSize: "08",
    layoutNumber: "01",
    serviceClass: "II",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 1, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 1,
    weight: 8,
    panelCutout: 12.0,
    shellDiameter: 18.70,
    variants: ["Crimp"],
    dimensions: { plugDiameter: 18.70, panelCutout: 12.0, diameter: 18.70 }
  },

  // =========================================================================
  // Shell Size 10  (page 7)
  // =========================================================================
  {
    shellSize: "10",
    layoutNumber: "01",
    serviceClass: "II",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 1, "#8": 0, "#4": 0 },
    totalContacts: 1,
    weight: 12,
    panelCutout: 15.0,
    shellDiameter: 21.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 21.50, panelCutout: 15.0, diameter: 21.50 }
  },
  {
    shellSize: "10",
    layoutNumber: "02",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 2, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 2,
    weight: 12,
    panelCutout: 15.0,
    shellDiameter: 21.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 21.50, panelCutout: 15.0, diameter: 21.50 }
  },
  {
    shellSize: "10",
    layoutNumber: "04",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 4, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 4,
    weight: 12,
    panelCutout: 15.0,
    shellDiameter: 21.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 21.50, panelCutout: 15.0, diameter: 21.50 }
  },
  {
    shellSize: "10",
    layoutNumber: "05",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 5, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 12,
    panelCutout: 15.0,
    shellDiameter: 21.50,
    variants: ["Standard", "Fuel Immersible"],
    dimensions: { plugDiameter: 21.50, panelCutout: 15.0, diameter: 21.50 }
  },
  {
    shellSize: "10",
    layoutNumber: "22",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 4, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 4,
    weight: 12,
    panelCutout: 15.0,
    shellDiameter: 21.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 21.50, panelCutout: 15.0, diameter: 21.50 }
  },
  {
    shellSize: "10",
    layoutNumber: "26",
    serviceClass: "R",
    contacts: { "#26": 26, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 26,
    weight: 12,
    panelCutout: 15.0,
    shellDiameter: 21.50,
    variants: ["Standard", "High Density"],
    dimensions: { plugDiameter: 21.50, panelCutout: 15.0, diameter: 21.50 }
  },
  {
    shellSize: "10",
    layoutNumber: "35",
    serviceClass: "S",
    contacts: { "#26": 0, "#22D": 13, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 13,
    weight: 12,
    panelCutout: 15.0,
    shellDiameter: 21.50,
    variants: ["Standard", "Hermetic", "Fuel Immersible"],
    dimensions: { plugDiameter: 21.50, panelCutout: 15.0, diameter: 21.50 }
  },
  {
    shellSize: "10",
    layoutNumber: "80",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 1, "#4": 0 },
    totalContacts: 1,
    weight: 12,
    panelCutout: 15.0,
    shellDiameter: 21.50,
    variants: ["Crimp"],
    dimensions: { plugDiameter: 21.50, panelCutout: 15.0, diameter: 21.50 }
  },
  {
    shellSize: "10",
    layoutNumber: "98",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 6, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 6,
    weight: 12,
    panelCutout: 15.0,
    shellDiameter: 21.50,
    variants: ["Standard", "Hermetic", "Fuel Immersible"],
    dimensions: { plugDiameter: 21.50, panelCutout: 15.0, diameter: 21.50 }
  },
  {
    shellSize: "10",
    layoutNumber: "99",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 7, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 7,
    weight: 12,
    panelCutout: 15.0,
    shellDiameter: 21.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 21.50, panelCutout: 15.0, diameter: 21.50 }
  },

  // =========================================================================
  // Shell Size 12  (page 7)
  // =========================================================================
  {
    shellSize: "12",
    layoutNumber: "01",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 1 },
    totalContacts: 1,
    weight: 18,
    panelCutout: 19.05,
    shellDiameter: 25.10,
    variants: ["PCB Mount"],
    dimensions: { plugDiameter: 25.10, panelCutout: 19.05, diameter: 25.10 }
  },
  {
    shellSize: "12",
    layoutNumber: "03",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 3, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    weight: 18,
    panelCutout: 19.05,
    shellDiameter: 25.10,
    variants: ["Standard"],
    dimensions: { plugDiameter: 25.10, panelCutout: 19.05, diameter: 25.10 }
  },
  {
    shellSize: "12",
    layoutNumber: "04",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 4, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 4,
    weight: 18,
    panelCutout: 19.05,
    shellDiameter: 25.10,
    variants: ["Standard", "Hermetic"],
    dimensions: { plugDiameter: 25.10, panelCutout: 19.05, diameter: 25.10 }
  },
  {
    shellSize: "12",
    layoutNumber: "08",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 8, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 8,
    weight: 18,
    panelCutout: 19.05,
    shellDiameter: 25.10,
    variants: ["Standard"],
    dimensions: { plugDiameter: 25.10, panelCutout: 19.05, diameter: 25.10 }
  },
  {
    shellSize: "12",
    layoutNumber: "26",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 6, "#20": 0, "#16": 0, "#12": 2, "#8": 0, "#4": 0 },
    totalContacts: 8,
    weight: 18,
    panelCutout: 19.05,
    shellDiameter: 25.10,
    variants: ["Standard"],
    dimensions: { plugDiameter: 25.10, panelCutout: 19.05, diameter: 25.10 }
  },
  {
    shellSize: "12",
    layoutNumber: "35",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 22, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 22,
    weight: 18,
    panelCutout: 19.05,
    shellDiameter: 25.10,
    variants: ["Standard", "Hermetic"],
    dimensions: { plugDiameter: 25.10, panelCutout: 19.05, diameter: 25.10 }
  },
  {
    shellSize: "12",
    layoutNumber: "43",
    serviceClass: "R",
    contacts: { "#26": 43, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 43,
    weight: 18,
    panelCutout: 19.05,
    shellDiameter: 25.10,
    variants: ["Standard", "High Density"],
    dimensions: { plugDiameter: 25.10, panelCutout: 19.05, diameter: 25.10 }
  },
  {
    shellSize: "12",
    layoutNumber: "98",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 10, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 10,
    weight: 18,
    panelCutout: 19.05,
    shellDiameter: 25.10,
    variants: ["Standard", "Hermetic", "Fuel Immersible"],
    dimensions: { plugDiameter: 25.10, panelCutout: 19.05, diameter: 25.10 }
  },

  // =========================================================================
  // Shell Size 14  (page 8)
  // =========================================================================
  {
    shellSize: "14",
    layoutNumber: "05",
    serviceClass: "II",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 5, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    weight: 24,
    panelCutout: 22.22,
    shellDiameter: 29.00,
    variants: ["Standard"],
    dimensions: { plugDiameter: 29.00, panelCutout: 22.22, diameter: 29.00 }
  },
  {
    shellSize: "14",
    layoutNumber: "15",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 14, "#16": 1, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 15,
    weight: 24,
    panelCutout: 22.22,
    shellDiameter: 29.00,
    variants: ["Standard"],
    dimensions: { plugDiameter: 29.00, panelCutout: 22.22, diameter: 29.00 }
  },
  {
    shellSize: "14",
    layoutNumber: "18",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 18, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 18,
    weight: 24,
    panelCutout: 22.22,
    shellDiameter: 29.00,
    variants: ["Standard"],
    dimensions: { plugDiameter: 29.00, panelCutout: 22.22, diameter: 29.00 }
  },
  {
    shellSize: "14",
    layoutNumber: "19",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 19, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 19,
    weight: 24,
    panelCutout: 22.22,
    shellDiameter: 29.00,
    variants: ["Standard"],
    dimensions: { plugDiameter: 29.00, panelCutout: 22.22, diameter: 29.00 }
  },
  {
    shellSize: "14",
    layoutNumber: "35",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 37, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 37,
    weight: 24,
    panelCutout: 22.22,
    shellDiameter: 29.00,
    variants: ["Standard", "Hermetic", "Fuel Immersible"],
    dimensions: { plugDiameter: 29.00, panelCutout: 22.22, diameter: 29.00 }
  },
  {
    shellSize: "14",
    layoutNumber: "68",
    serviceClass: "R",
    contacts: { "#26": 68, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 68,
    weight: 24,
    panelCutout: 22.22,
    shellDiameter: 29.00,
    variants: ["Standard", "High Density"],
    dimensions: { plugDiameter: 29.00, panelCutout: 22.22, diameter: 29.00 }
  },
  {
    shellSize: "14",
    layoutNumber: "97",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 8, "#16": 4, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 12,
    weight: 24,
    panelCutout: 22.22,
    shellDiameter: 29.00,
    variants: ["Standard", "Hermetic"],
    dimensions: { plugDiameter: 29.00, panelCutout: 22.22, diameter: 29.00 }
  },

  // =========================================================================
  // Shell Size 16  (page 9)
  // =========================================================================
  {
    shellSize: "16",
    layoutNumber: "02",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 6, "#8": 0, "#4": 0 },
    totalContacts: 6,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },
  {
    shellSize: "16",
    layoutNumber: "06",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 38, "#20": 0, "#16": 0, "#12": 0, "#8": 1, "#4": 0 },
    totalContacts: 39,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Standard", "Crimp"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },
  {
    shellSize: "16",
    layoutNumber: "08",
    serviceClass: "II",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 8, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 8,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },
  {
    shellSize: "16",
    layoutNumber: "11",
    serviceClass: "II",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 11, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 11,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },
  {
    shellSize: "16",
    layoutNumber: "18",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 14, "#20": 0, "#16": 0, "#12": 0, "#8": 4, "#4": 0 },
    totalContacts: 18,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Standard", "Crimp"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },
  {
    shellSize: "16",
    layoutNumber: "22",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 2, "#8": 2, "#4": 0 },
    totalContacts: 4,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Standard", "Crimp"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },
  {
    shellSize: "16",
    layoutNumber: "26",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 26, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 26,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },
  {
    shellSize: "16",
    layoutNumber: "28",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 26, "#16": 2, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 28,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },
  {
    shellSize: "16",
    layoutNumber: "32",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 32, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 32,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },
  {
    shellSize: "16",
    layoutNumber: "35",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 55, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 55,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },
  {
    shellSize: "16",
    layoutNumber: "75",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 2, "#4": 0 },
    totalContacts: 2,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Crimp"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },
  {
    shellSize: "16",
    layoutNumber: "99",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 21, "#16": 2, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 23,
    weight: 32,
    panelCutout: 25.4,
    shellDiameter: 32.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 32.20, panelCutout: 25.4, diameter: 32.20 }
  },

  // =========================================================================
  // Shell Size 18  (pages 9-10)
  // =========================================================================
  {
    shellSize: "18",
    layoutNumber: "16",
    serviceClass: "II",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 16, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 16,
    weight: 40,
    panelCutout: 28.57,
    shellDiameter: 35.40,
    variants: ["Standard"],
    dimensions: { plugDiameter: 35.40, panelCutout: 28.57, diameter: 35.40 }
  },
  {
    shellSize: "18",
    layoutNumber: "20",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 0, "#20": 18, "#16": 0, "#12": 0, "#8": 2, "#4": 0 },
    totalContacts: 20,
    weight: 40,
    panelCutout: 28.57,
    shellDiameter: 35.40,
    variants: ["Standard", "Crimp"],
    dimensions: { plugDiameter: 35.40, panelCutout: 28.57, diameter: 35.40 }
  },
  {
    shellSize: "18",
    layoutNumber: "35",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 66, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 66,
    weight: 40,
    panelCutout: 28.57,
    shellDiameter: 35.40,
    variants: ["Standard"],
    dimensions: { plugDiameter: 35.40, panelCutout: 28.57, diameter: 35.40 }
  },
  {
    shellSize: "18",
    layoutNumber: "39",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 37, "#16": 2, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 39,
    weight: 40,
    panelCutout: 28.57,
    shellDiameter: 35.40,
    variants: ["Standard"],
    dimensions: { plugDiameter: 35.40, panelCutout: 28.57, diameter: 35.40 }
  },
  {
    shellSize: "18",
    layoutNumber: "41",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 41, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 41,
    weight: 40,
    panelCutout: 28.57,
    shellDiameter: 35.40,
    variants: ["Standard"],
    dimensions: { plugDiameter: 35.40, panelCutout: 28.57, diameter: 35.40 }
  },
  {
    shellSize: "18",
    layoutNumber: "42",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 2 },
    totalContacts: 2,
    weight: 40,
    panelCutout: 28.57,
    shellDiameter: 35.40,
    variants: ["PCB Mount"],
    dimensions: { plugDiameter: 35.40, panelCutout: 28.57, diameter: 35.40 }
  },
  {
    shellSize: "18",
    layoutNumber: "77",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 17, "#20": 0, "#16": 0, "#12": 0, "#8": 2, "#4": 0 },
    totalContacts: 19,
    weight: 40,
    panelCutout: 28.57,
    shellDiameter: 35.40,
    variants: ["Standard", "Crimp"],
    dimensions: { plugDiameter: 35.40, panelCutout: 28.57, diameter: 35.40 }
  },

  // =========================================================================
  // Shell Size 20  (page 10)
  // =========================================================================
  {
    shellSize: "20",
    layoutNumber: "06",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 6, "#4": 0 },
    totalContacts: 6,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["Crimp"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },
  {
    shellSize: "20",
    layoutNumber: "11",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 11, "#8": 0, "#4": 0 },
    totalContacts: 11,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },
  {
    shellSize: "20",
    layoutNumber: "21",
    serviceClass: "II",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 21, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 21,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },
  {
    shellSize: "20",
    layoutNumber: "32",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 32, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 32,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },
  {
    shellSize: "20",
    layoutNumber: "35",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 79, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 79,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },
  {
    shellSize: "20",
    layoutNumber: "48",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 4, "#4": 0 },
    totalContacts: 4,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["PCB Mount"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },
  {
    shellSize: "20",
    layoutNumber: "53",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 53, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 53,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },
  {
    shellSize: "20",
    layoutNumber: "54",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 40, "#20": 0, "#16": 9, "#12": 4, "#8": 0, "#4": 0 },
    totalContacts: 53,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },
  {
    shellSize: "20",
    layoutNumber: "55",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 55, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 55,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["Standard"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },
  {
    shellSize: "20",
    layoutNumber: "59",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 55, "#20": 0, "#16": 0, "#12": 4, "#8": 0, "#4": 0 },
    totalContacts: 59,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["Standard", "Crimp"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },
  {
    shellSize: "20",
    layoutNumber: "72",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 6, "#12": 0, "#8": 0, "#4": 2 },
    totalContacts: 8,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["Standard", "PCB Mount"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },
  {
    shellSize: "20",
    layoutNumber: "75",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 4, "#4": 0 },
    totalContacts: 4,
    weight: 50,
    panelCutout: 31.75,
    shellDiameter: 38.20,
    variants: ["Crimp"],
    dimensions: { plugDiameter: 38.20, panelCutout: 31.75, diameter: 38.20 }
  },

  // =========================================================================
  // Shell Size 22  (page 10)
  // =========================================================================
  {
    shellSize: "22",
    layoutNumber: "35",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 100, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 100,
    weight: 60,
    panelCutout: 34.92,
    shellDiameter: 41.30,
    variants: ["Standard"],
    dimensions: { plugDiameter: 41.30, panelCutout: 34.92, diameter: 41.30 }
  },

  // =========================================================================
  // Shell Size 24  (page 11)
  // =========================================================================
  {
    shellSize: "24",
    layoutNumber: "04",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 48, "#16": 8, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 56,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "07",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 97, "#20": 0, "#16": 0, "#12": 0, "#8": 2, "#4": 0 },
    totalContacts: 99,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard", "Crimp"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "08",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 8, "#4": 0 },
    totalContacts: 8,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Crimp"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "19",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 0, "#12": 19, "#8": 0, "#4": 0 },
    totalContacts: 19,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "24",
    serviceClass: "II",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 12, "#12": 12, "#8": 0, "#4": 0 },
    totalContacts: 24,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "29",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 29, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 29,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "35",
    serviceClass: "M",
    contacts: { "#26": 0, "#22D": 128, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 128,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "37",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 37, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 37,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "41",
    serviceClass: "N",
    contacts: { "#26": 0, "#22D": 22, "#20": 3, "#16": 11, "#12": 2, "#8": 3, "#4": 0 },
    totalContacts: 41,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard", "Crimp"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "43",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 4, "#12": 0, "#8": 0, "#4": 4 },
    totalContacts: 8,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard", "PCB Mount"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "44",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 23, "#16": 20, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 43,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "46",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 40, "#16": 4, "#12": 0, "#8": 2, "#4": 0 },
    totalContacts: 46,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard", "Crimp"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  },
  {
    shellSize: "24",
    layoutNumber: "61",
    serviceClass: "I",
    contacts: { "#26": 0, "#22D": 0, "#20": 61, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 61,
    weight: 72,
    panelCutout: 38.1,
    shellDiameter: 44.50,
    variants: ["Standard"],
    dimensions: { plugDiameter: 44.50, panelCutout: 38.1, diameter: 44.50 }
  }
];


/**
 * Deutsch AS cross-reference database
 * Deutsch AS Series connectors (Amphenol) — equivalent contact sizes:
 *   Deutsch #22  = 8STA #22D (5A)
 *   Deutsch #20  = 8STA #20  (7.5A)
 *   Deutsch #16  = 8STA #16  (20A in Deutsch, 13A in 8STA)
 *
 * Includes standard AS, ASDD (Double Density), AS Mini, and Micro variants.
 * Contact counts mapped to 8STA-equivalent contact size keys for cross-ref.
 */
const DEUTSCH_AS_DATABASE = [

  // -----------------------------------------------------------------------
  // AS Series — Shell 08
  // -----------------------------------------------------------------------
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "08",
    layoutNumber: "98",
    contacts: { "#26": 0, "#22D": 6, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 6,
    maxCurrent: 5,
    rating: "I",
    description: "AS Series, 6-way size 22"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "08",
    layoutNumber: "35",
    contacts: { "#26": 0, "#22D": 0, "#20": 3, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    maxCurrent: 7.5,
    rating: "M",
    description: "AS Series, 3-way size 20"
  },

  // -----------------------------------------------------------------------
  // AS Series — Shell 10
  // -----------------------------------------------------------------------
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "10",
    layoutNumber: "98",
    contacts: { "#26": 0, "#22D": 13, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 13,
    maxCurrent: 5,
    rating: "I",
    description: "AS Series, 13-way size 22"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "10",
    layoutNumber: "35",
    contacts: { "#26": 0, "#22D": 0, "#20": 6, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 6,
    maxCurrent: 7.5,
    rating: "M",
    description: "AS Series, 6-way size 20"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "10",
    layoutNumber: "02",
    contacts: { "#26": 0, "#22D": 0, "#20": 2, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 2,
    maxCurrent: 7.5,
    rating: "I",
    description: "AS Series, 2-way size 20"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "10",
    layoutNumber: "03",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 3, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    maxCurrent: 20,
    rating: "I",
    description: "AS Series, 3-way size 16"
  },

  // -----------------------------------------------------------------------
  // AS Series — Shell 12
  // -----------------------------------------------------------------------
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "12",
    layoutNumber: "98",
    contacts: { "#26": 0, "#22D": 22, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 22,
    maxCurrent: 5,
    rating: "I",
    description: "AS Series, 22-way size 22"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "12",
    layoutNumber: "35",
    contacts: { "#26": 0, "#22D": 0, "#20": 10, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 10,
    maxCurrent: 7.5,
    rating: "M",
    description: "AS Series, 10-way size 20"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "12",
    layoutNumber: "04",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 4, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 4,
    maxCurrent: 20,
    rating: "I",
    description: "AS Series, 4-way size 16"
  },

  // -----------------------------------------------------------------------
  // AS Series — Shell 14
  // -----------------------------------------------------------------------
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "14",
    layoutNumber: "97",
    contacts: { "#26": 0, "#22D": 37, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 37,
    maxCurrent: 5,
    rating: "I",
    description: "AS Series, 37-way size 22"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "14",
    layoutNumber: "35",
    contacts: { "#26": 0, "#22D": 0, "#20": 19, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 19,
    maxCurrent: 7.5,
    rating: "M",
    description: "AS Series, 19-way size 20"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "14",
    layoutNumber: "19",
    contacts: { "#26": 0, "#22D": 0, "#20": 8, "#16": 4, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 12,
    maxCurrent: 20,
    rating: "I",
    description: "AS Series, 8-way size 20 + 4-way size 16 (mixed)"
  },

  // -----------------------------------------------------------------------
  // AS Series — Shell 16
  // -----------------------------------------------------------------------
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "16",
    layoutNumber: "08",
    contacts: { "#26": 0, "#22D": 55, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 55,
    maxCurrent: 5,
    rating: "I",
    description: "AS Series, 55-way size 22"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "16",
    layoutNumber: "26",
    contacts: { "#26": 0, "#22D": 0, "#20": 26, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 26,
    maxCurrent: 7.5,
    rating: "I",
    description: "AS Series, 26-way size 20"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "16",
    layoutNumber: "35",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 8, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 8,
    maxCurrent: 20,
    rating: "M",
    description: "AS Series, 8-way size 16"
  },

  // -----------------------------------------------------------------------
  // AS Series — Shell 18
  // -----------------------------------------------------------------------
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "18",
    layoutNumber: "32",
    contacts: { "#26": 0, "#22D": 66, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 66,
    maxCurrent: 5,
    rating: "I",
    description: "AS Series, 66-way size 22"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "18",
    layoutNumber: "35",
    contacts: { "#26": 0, "#22D": 0, "#20": 32, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 32,
    maxCurrent: 7.5,
    rating: "M",
    description: "AS Series, 32-way size 20"
  },

  // -----------------------------------------------------------------------
  // AS Series — Shell 20
  // -----------------------------------------------------------------------
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "20",
    layoutNumber: "39",
    contacts: { "#26": 0, "#22D": 79, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 79,
    maxCurrent: 5,
    rating: "I",
    description: "AS Series, 79-way size 22"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "20",
    layoutNumber: "41",
    contacts: { "#26": 0, "#22D": 0, "#20": 37, "#16": 2, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 39,
    maxCurrent: 7.5,
    rating: "I",
    description: "AS Series, 37-way size 20 + 2-way size 16 (mixed)"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "20",
    layoutNumber: "35",
    contacts: { "#26": 0, "#22D": 0, "#20": 41, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 41,
    maxCurrent: 7.5,
    rating: "M",
    description: "AS Series, 41-way size 20"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "20",
    layoutNumber: "16",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 16, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 16,
    maxCurrent: 20,
    rating: "I",
    description: "AS Series, 16-way size 16"
  },

  // -----------------------------------------------------------------------
  // AS Series — Shell 22
  // -----------------------------------------------------------------------
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "22",
    layoutNumber: "35",
    contacts: { "#26": 0, "#22D": 100, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 100,
    maxCurrent: 5,
    rating: "M",
    description: "AS Series, 100-way size 22"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "22",
    layoutNumber: "55",
    contacts: { "#26": 0, "#22D": 0, "#20": 55, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 55,
    maxCurrent: 7.5,
    rating: "I",
    description: "AS Series, 55-way size 20"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "22",
    layoutNumber: "21",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 21, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 21,
    maxCurrent: 20,
    rating: "I",
    description: "AS Series, 21-way size 16"
  },

  // -----------------------------------------------------------------------
  // AS Series — Shell 24
  // -----------------------------------------------------------------------
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "24",
    layoutNumber: "35",
    contacts: { "#26": 0, "#22D": 128, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 128,
    maxCurrent: 5,
    rating: "M",
    description: "AS Series, 128-way size 22"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "24",
    layoutNumber: "61",
    contacts: { "#26": 0, "#22D": 0, "#20": 61, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 61,
    maxCurrent: 7.5,
    rating: "I",
    description: "AS Series, 61-way size 20"
  },
  {
    series: "AS",
    manufacturer: "Deutsch AS",
    partSeries: "AS",
    shellSize: "24",
    layoutNumber: "29",
    contacts: { "#26": 0, "#22D": 0, "#20": 0, "#16": 29, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 29,
    maxCurrent: 20,
    rating: "I",
    description: "AS Series, 29-way size 16"
  },

  // -----------------------------------------------------------------------
  // ASDD (Double Density) Series — #24 contacts, 3A
  // -----------------------------------------------------------------------
  {
    series: "ASDD",
    manufacturer: "Deutsch AS",
    partSeries: "ASDD",
    shellSize: "06",
    layoutNumber: "09",
    contacts: { "#26": 9, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 9,
    maxCurrent: 3,
    rating: "R",
    description: "ASDD Double Density, 9-way size 24 (3A)"
  },
  {
    series: "ASDD",
    manufacturer: "Deutsch AS",
    partSeries: "ASDD",
    shellSize: "07",
    layoutNumber: "11",
    contacts: { "#26": 11, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 11,
    maxCurrent: 3,
    rating: "R",
    description: "ASDD Double Density, 11-way size 24 (3A)"
  },
  {
    series: "ASDD",
    manufacturer: "Deutsch AS",
    partSeries: "ASDD",
    shellSize: "08",
    layoutNumber: "11",
    contacts: { "#26": 11, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 11,
    maxCurrent: 3,
    rating: "R",
    description: "ASDD Double Density, 11-way size 24 (3A)"
  },
  {
    series: "ASDD",
    manufacturer: "Deutsch AS",
    partSeries: "ASDD",
    shellSize: "10",
    layoutNumber: "23",
    contacts: { "#26": 23, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 23,
    maxCurrent: 3,
    rating: "R",
    description: "ASDD Double Density, 23-way size 24 (3A)"
  },
  {
    series: "ASDD",
    manufacturer: "Deutsch AS",
    partSeries: "ASDD",
    shellSize: "12",
    layoutNumber: "41",
    contacts: { "#26": 41, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 41,
    maxCurrent: 3,
    rating: "R",
    description: "ASDD Double Density, 41-way size 24 (3A)"
  },
  {
    series: "ASDD",
    manufacturer: "Deutsch AS",
    partSeries: "ASDD",
    shellSize: "14",
    layoutNumber: "64",
    contacts: { "#26": 64, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 64,
    maxCurrent: 3,
    rating: "R",
    description: "ASDD Double Density, 64-way size 24 (3A)"
  },
  {
    series: "ASDD",
    manufacturer: "Deutsch AS",
    partSeries: "ASDD",
    shellSize: "16",
    layoutNumber: "93",
    contacts: { "#26": 93, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 93,
    maxCurrent: 3,
    rating: "R",
    description: "ASDD Double Density, 93-way size 24 (3A)"
  },
  {
    series: "ASDD",
    manufacturer: "Deutsch AS",
    partSeries: "ASDD",
    shellSize: "18",
    layoutNumber: "118",
    contacts: { "#26": 118, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 118,
    maxCurrent: 3,
    rating: "R",
    description: "ASDD Double Density, 118-way size 24 (3A)"
  },

  // -----------------------------------------------------------------------
  // AS Mini (Shell 07) — compact motorsport connectors
  // -----------------------------------------------------------------------
  {
    series: "AS Mini",
    manufacturer: "Deutsch AS",
    partSeries: "AS Mini",
    shellSize: "07",
    layoutNumber: "98",
    contacts: { "#26": 0, "#22D": 0, "#20": 3, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    maxCurrent: 7.5,
    rating: "M",
    description: "AS Mini, 3-way size 20 (7.5A)"
  },
  {
    series: "AS Mini",
    manufacturer: "Deutsch AS",
    partSeries: "AS Mini",
    shellSize: "07",
    layoutNumber: "35",
    contacts: { "#26": 0, "#22D": 6, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 6,
    maxCurrent: 5,
    rating: "I",
    description: "AS Mini, 6-way size 22 (5A)"
  },

  // -----------------------------------------------------------------------
  // AS Micro (ASX, ASU, ASL, ASR, ASC) — ultra-miniature connectors
  // -----------------------------------------------------------------------
  {
    series: "ASX",
    manufacturer: "Deutsch AS",
    partSeries: "ASX",
    shellSize: "02",
    layoutNumber: "03",
    contacts: { "#26": 0, "#22D": 3, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    maxCurrent: 5,
    rating: "S",
    description: "AS Micro XtraLITE, 3-way size 22 (5A)"
  },
  {
    series: "ASX",
    manufacturer: "Deutsch AS",
    partSeries: "ASX",
    shellSize: "02",
    layoutNumber: "05",
    contacts: { "#26": 5, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    maxCurrent: 3,
    rating: "R",
    description: "AS Micro XtraLITE, 5-way size 24 (3A)"
  },
  {
    series: "ASX",
    manufacturer: "Deutsch AS",
    partSeries: "ASX",
    shellSize: "02",
    layoutNumber: "06",
    contacts: { "#26": 6, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 6,
    maxCurrent: 3,
    rating: "R",
    description: "AS Micro XtraLITE, 6-way size 24 (3A)"
  },
  {
    series: "ASU",
    manufacturer: "Deutsch AS",
    partSeries: "ASU",
    shellSize: "03",
    layoutNumber: "03",
    contacts: { "#26": 0, "#22D": 3, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 3,
    maxCurrent: 5,
    rating: "S",
    description: "AS UltraLITE, 3-way size 22 (5A)"
  },
  {
    series: "ASU",
    manufacturer: "Deutsch AS",
    partSeries: "ASU",
    shellSize: "03",
    layoutNumber: "05",
    contacts: { "#26": 5, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    maxCurrent: 3,
    rating: "R",
    description: "AS UltraLITE, 5-way size 24 (3A)"
  },
  {
    series: "ASL",
    manufacturer: "Deutsch AS",
    partSeries: "ASL",
    shellSize: "06",
    layoutNumber: "05",
    contacts: { "#26": 5, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    maxCurrent: 3,
    rating: "R",
    description: "AS MicroLITE, 5-way size 23 (3A)"
  },
  {
    series: "ASR",
    manufacturer: "Deutsch AS",
    partSeries: "ASR",
    shellSize: "06",
    layoutNumber: "05",
    contacts: { "#26": 5, "#22D": 0, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 5,
    maxCurrent: 3,
    rating: "R",
    description: "AS Rally Micro, 5-way size 23 (3A)"
  },
  {
    series: "ASC",
    manufacturer: "Deutsch AS",
    partSeries: "ASC",
    shellSize: "05",
    layoutNumber: "06",
    contacts: { "#26": 0, "#22D": 6, "#20": 0, "#16": 0, "#12": 0, "#8": 0, "#4": 0 },
    totalContacts: 6,
    maxCurrent: 5,
    rating: "S",
    description: "AS Composite, 6-way size 22 (5A)"
  }
];
