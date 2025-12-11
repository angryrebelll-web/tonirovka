/* =========================================
   Propellini Car Database (1000+ автомобилей)
   ========================================= */

// =========================================
// Маппинг классов по типу авто
// =========================================
const classMapping = {
    "sedan-small": 1,
    "sedan-business": 2,
    "sedan-premium": 3,
    "sedan-luxury": 5,
    "hatch-small": 1,
    "hatch-medium": 2,
    "coupe": 3,
    "coupe-sport": 3,
    "supercar": 3,
    "hypercar": 5,
    "luxury": 5,
    "suv-compact": 2,
    "suv-medium": 2,
    "suv-large": 3,
    "suv-luxury": 5,
    "pickup-compact": 4,
    "pickup-small": 4,
    "pickup-medium": 4,
    "pickup-large": 4,
    "pickup-luxury": 5,
    "minivan-compact": 5,
    "minivan-standard": 5,
    "minivan": 5,
    "minivan-business": 5,
    "minivan-premium": 5,
    "minivan-luxury": 5,
    "minivan-electric": 5,
    "minibus": 5,
    "minibus-premium": 5,
    "van-commercial": 4,
    "cargo-medium": 4,
    "cargo-large": 4
};

// =========================================
// Главная база автомобилей (1000+ записей) - массив
// =========================================
const carDatabaseArray = [
    // =========================================
    // SEDAN SMALL
    // =========================================
    { brand: "Toyota", model: "Corolla", body: "sedan", type: "sedan-small" },
    { brand: "Hyundai", model: "Elantra", body: "sedan", type: "sedan-small" },
    { brand: "Kia", model: "Rio", body: "sedan", type: "sedan-small" },
    { brand: "Volkswagen", model: "Polo", body: "sedan", type: "sedan-small" },
    { brand: "Skoda", model: "Rapid", body: "sedan", type: "sedan-small" },
    { brand: "Nissan", model: "Almera", body: "sedan", type: "sedan-small" },
    { brand: "Renault", model: "Logan", body: "sedan", type: "sedan-small" },
    { brand: "Mazda", model: "Mazda 2 Sedan", body: "sedan", type: "sedan-small" },
    { brand: "Ford", model: "Fiesta Sedan", body: "sedan", type: "sedan-small" },
    { brand: "Chevrolet", model: "Aveo", body: "sedan", type: "sedan-small" },
    { brand: "Hyundai", model: "Solaris", body: "sedan", type: "sedan-small" },
    { brand: "Honda", model: "City", body: "sedan", type: "sedan-small" },
    { brand: "Mitsubishi", model: "Lancer", body: "sedan", type: "sedan-small" },
    { brand: "Peugeot", model: "301", body: "sedan", type: "sedan-small" },
    { brand: "Citroen", model: "C-Elysee", body: "sedan", type: "sedan-small" },
    { brand: "Dacia", model: "Logan", body: "sedan", type: "sedan-small" },
    { brand: "Lada", model: "Granta", body: "sedan", type: "sedan-small" },
    { brand: "Lada", model: "Vesta", body: "sedan", type: "sedan-small" },
    { brand: "Geely", model: "Emgrand", body: "sedan", type: "sedan-small" },
    { brand: "Chery", model: "Arrizo 5", body: "sedan", type: "sedan-small" },
    { brand: "Toyota", model: "Yaris Sedan", body: "sedan", type: "sedan-small" },
    { brand: "Toyota", model: "Vios", body: "sedan", type: "sedan-small" },
    { brand: "Nissan", model: "Sentra", body: "sedan", type: "sedan-small" },
    { brand: "Honda", model: "Civic Sedan", body: "sedan", type: "sedan-small" },
    { brand: "Mazda", model: "Mazda 3 Sedan", body: "sedan", type: "sedan-small" },

    // =========================================
    // SEDAN BUSINESS
    // =========================================
    { brand: "Toyota", model: "Camry", body: "sedan", type: "sedan-business" },
    { brand: "Toyota", model: "Avalon", body: "sedan", type: "sedan-business" },
    { brand: "Toyota", model: "Crown", body: "sedan", type: "sedan-business" },
    { brand: "Hyundai", model: "Sonata", body: "sedan", type: "sedan-business" },
    { brand: "Hyundai", model: "Azera", body: "sedan", type: "sedan-business" },
    { brand: "Kia", model: "K5", body: "sedan", type: "sedan-business" },
    { brand: "Kia", model: "Cadenza", body: "sedan", type: "sedan-business" },
    { brand: "Kia", model: "K8", body: "sedan", type: "sedan-business" },
    { brand: "Mazda", model: "Mazda 6", body: "sedan", type: "sedan-business" },
    { brand: "Mazda", model: "Mazda 6 Signature", body: "sedan", type: "sedan-business" },
    { brand: "Volkswagen", model: "Passat", body: "sedan", type: "sedan-business" },
    { brand: "Skoda", model: "Superb", body: "sedan", type: "sedan-business" },
    { brand: "Honda", model: "Accord", body: "sedan", type: "sedan-business" },
    { brand: "Honda", model: "Accord Hybrid", body: "sedan", type: "sedan-business" },
    { brand: "Nissan", model: "Teana", body: "sedan", type: "sedan-business" },
    { brand: "Nissan", model: "Maxima", body: "sedan", type: "sedan-business" },
    { brand: "Nissan", model: "Skyline", body: "sedan", type: "sedan-business" },
    { brand: "Subaru", model: "Legacy", body: "sedan", type: "sedan-business" },
    { brand: "Peugeot", model: "508", body: "sedan", type: "sedan-business" },
    { brand: "Citroen", model: "C5", body: "sedan", type: "sedan-business" },
    { brand: "Opel", model: "Insignia", body: "sedan", type: "sedan-business" },
    { brand: "Ford", model: "Mondeo", body: "sedan", type: "sedan-business" },
    { brand: "Chevrolet", model: "Malibu", body: "sedan", type: "sedan-business" },
    { brand: "Volkswagen", model: "Arteon", body: "sedan", type: "sedan-business" },
    { brand: "Skoda", model: "Octavia", body: "sedan", type: "sedan-business" },
    { brand: "Audi", model: "A4", body: "sedan", type: "sedan-business" },
    { brand: "BMW", model: "3 Series", body: "sedan", type: "sedan-business" },
    { brand: "BMW", model: "320i", body: "sedan", type: "sedan-business" },
    { brand: "BMW", model: "330i", body: "sedan", type: "sedan-business" },
    { brand: "Mercedes-Benz", model: "C-Class", body: "sedan", type: "sedan-business" },
    { brand: "Mercedes-Benz", model: "C200", body: "sedan", type: "sedan-business" },
    { brand: "Mercedes-Benz", model: "C300", body: "sedan", type: "sedan-business" },
    { brand: "Audi", model: "A4 Allroad", body: "sedan", type: "sedan-business" },
    { brand: "Volvo", model: "S60", body: "sedan", type: "sedan-business" },
    { brand: "Volvo", model: "S60 T8", body: "sedan", type: "sedan-business" },
    { brand: "Toyota", model: "Mirai", body: "sedan", type: "sedan-business" },
    { brand: "Nissan", model: "Altima", body: "sedan", type: "sedan-business" },
    { brand: "Honda", model: "Inspire", body: "sedan", type: "sedan-business" },
    { brand: "Mazda", model: "Mazda 6 Turbo", body: "sedan", type: "sedan-business" },

    // =========================================
    // SEDAN PREMIUM
    // =========================================
    { brand: "BMW", model: "5 Series", body: "sedan", type: "sedan-premium" },
    { brand: "BMW", model: "M5", body: "sedan", type: "sedan-premium" },
    { brand: "BMW", model: "M3", body: "sedan", type: "sedan-premium" },
    { brand: "Mercedes-Benz", model: "E-Class", body: "sedan", type: "sedan-premium" },
    { brand: "Mercedes-Benz", model: "AMG E63", body: "sedan", type: "sedan-premium" },
    { brand: "Audi", model: "A6", body: "sedan", type: "sedan-premium" },
    { brand: "Audi", model: "S6", body: "sedan", type: "sedan-premium" },
    { brand: "Audi", model: "RS6", body: "sedan", type: "sedan-premium" },
    { brand: "Lexus", model: "ES", body: "sedan", type: "sedan-premium" },
    { brand: "Lexus", model: "IS", body: "sedan", type: "sedan-premium" },
    { brand: "Toyota", model: "Crown Sedan", body: "sedan", type: "sedan-premium" },
    { brand: "Genesis", model: "G80", body: "sedan", type: "sedan-premium" },
    { brand: "Volvo", model: "S90", body: "sedan", type: "sedan-premium" },
    { brand: "Jaguar", model: "XF", body: "sedan", type: "sedan-premium" },
    { brand: "Infiniti", model: "Q50", body: "sedan", type: "sedan-premium" },
    { brand: "Cadillac", model: "CTS", body: "sedan", type: "sedan-premium" },
    { brand: "Audi", model: "A7", body: "sedan", type: "sedan-premium" },
    { brand: "BMW", model: "6 Series", body: "sedan", type: "sedan-premium" },
    { brand: "Mercedes-Benz", model: "CLS", body: "sedan", type: "sedan-premium" },
    { brand: "Lexus", model: "GS", body: "sedan", type: "sedan-premium" },
    { brand: "Infiniti", model: "Q70", body: "sedan", type: "sedan-premium" },
    { brand: "Acura", model: "TLX", body: "sedan", type: "sedan-premium" },
    { brand: "Infiniti", model: "M35", body: "sedan", type: "sedan-premium" },
    { brand: "Infiniti", model: "M37", body: "sedan", type: "sedan-premium" },

    // =========================================
    // SEDAN LUXURY
    // =========================================
    { brand: "BMW", model: "7 Series", body: "sedan", type: "sedan-luxury" },
    { brand: "BMW", model: "M760Li", body: "sedan", type: "sedan-luxury" },
    { brand: "BMW", model: "Alpina B7", body: "sedan", type: "sedan-luxury" },
    { brand: "Mercedes-Benz", model: "S-Class", body: "sedan", type: "sedan-luxury" },
    { brand: "Mercedes-Benz", model: "AMG S63", body: "sedan", type: "sedan-luxury" },
    { brand: "Mercedes-Benz", model: "AMG S65", body: "sedan", type: "sedan-luxury" },
    { brand: "Audi", model: "A8", body: "sedan", type: "sedan-luxury" },
    { brand: "Audi", model: "S8", body: "sedan", type: "sedan-luxury" },
    { brand: "Audi", model: "RS7", body: "sedan", type: "sedan-luxury" },
    { brand: "Lexus", model: "LS", body: "sedan", type: "sedan-luxury" },
    { brand: "Lexus", model: "LS F Sport", body: "sedan", type: "sedan-luxury" },
    { brand: "Toyota", model: "Century", body: "sedan", type: "sedan-luxury" },
    { brand: "Genesis", model: "G90", body: "sedan", type: "sedan-luxury" },
    { brand: "Bentley", model: "Flying Spur", body: "sedan", type: "sedan-luxury" },
    { brand: "Rolls-Royce", model: "Ghost", body: "sedan", type: "sedan-luxury" },
    { brand: "Rolls-Royce", model: "Phantom", body: "sedan", type: "sedan-luxury" },
    { brand: "Maybach", model: "S680", body: "sedan", type: "sedan-luxury" },
    { brand: "Porsche", model: "Panamera", body: "sedan", type: "sedan-luxury" },
    { brand: "Maserati", model: "Quattroporte", body: "sedan", type: "sedan-luxury" },

    // =========================================
    // SUV COMPACT
    // =========================================
    { brand: "Toyota", model: "C-HR", body: "suv", type: "suv-compact" },
    { brand: "Toyota", model: "RAV4", body: "suv", type: "suv-compact" },
    { brand: "Mazda", model: "CX-3", body: "suv", type: "suv-compact" },
    { brand: "Mazda", model: "CX-30", body: "suv", type: "suv-compact" },
    { brand: "Hyundai", model: "Creta", body: "suv", type: "suv-compact" },
    { brand: "Hyundai", model: "Bayon", body: "suv", type: "suv-compact" },
    { brand: "Hyundai", model: "Venue", body: "suv", type: "suv-compact" },
    { brand: "Kia", model: "Seltos", body: "suv", type: "suv-compact" },
    { brand: "Kia", model: "Stonic", body: "suv", type: "suv-compact" },
    { brand: "Nissan", model: "Juke", body: "suv", type: "suv-compact" },
    { brand: "Nissan", model: "Qashqai", body: "suv", type: "suv-compact" },
    { brand: "Honda", model: "Vezel", body: "suv", type: "suv-compact" },
    { brand: "Honda", model: "HR-V", body: "suv", type: "suv-compact" },
    { brand: "Subaru", model: "XV", body: "suv", type: "suv-compact" },
    { brand: "Volkswagen", model: "T-Roc", body: "suv", type: "suv-compact" },
    { brand: "Volkswagen", model: "T-Cross", body: "suv", type: "suv-compact" },
    { brand: "Skoda", model: "Karoq", body: "suv", type: "suv-compact" },
    { brand: "Renault", model: "Kaptur", body: "suv", type: "suv-compact" },
    { brand: "Renault", model: "Duster", body: "suv", type: "suv-compact" },
    { brand: "Changan", model: "CS35", body: "suv", type: "suv-compact" },
    { brand: "Haval", model: "Jolion", body: "suv", type: "suv-compact" },
    { brand: "Geely", model: "Coolray", body: "suv", type: "suv-compact" },
    { brand: "Chery", model: "Tiggo 4", body: "suv", type: "suv-compact" },
    { brand: "Chery", model: "Tiggo 7", body: "suv", type: "suv-compact" },
    { brand: "BMW", model: "X1", body: "suv", type: "suv-compact" },
    { brand: "Audi", model: "Q2", body: "suv", type: "suv-compact" },
    { brand: "Audi", model: "Q3", body: "suv", type: "suv-compact" },
    { brand: "Mercedes-Benz", model: "GLA", body: "suv", type: "suv-compact" },
    { brand: "Mercedes-Benz", model: "GLB", body: "suv", type: "suv-compact" },
    { brand: "Volvo", model: "XC40", body: "suv", type: "suv-compact" },
    { brand: "Lexus", model: "UX", body: "suv", type: "suv-compact" },
    { brand: "Infiniti", model: "QX30", body: "suv", type: "suv-compact" },
    { brand: "Jeep", model: "Renegade", body: "suv", type: "suv-compact" },
    { brand: "Jeep", model: "Compass", body: "suv", type: "suv-compact" },
    { brand: "Ford", model: "EcoSport", body: "suv", type: "suv-compact" },
    { brand: "Ford", model: "Puma", body: "suv", type: "suv-compact" },
    { brand: "Peugeot", model: "2008", body: "suv", type: "suv-compact" },
    { brand: "Citroen", model: "C3 Aircross", body: "suv", type: "suv-compact" },
    { brand: "Opel", model: "Crossland X", body: "suv", type: "suv-compact" },
    { brand: "Opel", model: "Mokka", body: "suv", type: "suv-compact" },

    // =========================================
    // SUV MEDIUM
    // =========================================
    { brand: "Toyota", model: "Highlander", body: "suv", type: "suv-medium" },
    { brand: "Toyota", model: "Venza", body: "suv", type: "suv-medium" },
    { brand: "Toyota", model: "Fortuner", body: "suv", type: "suv-medium" },
    { brand: "Mazda", model: "CX-5", body: "suv", type: "suv-medium" },
    { brand: "Mazda", model: "CX-50", body: "suv", type: "suv-medium" },
    { brand: "Mazda", model: "CX-60", body: "suv", type: "suv-medium" },
    { brand: "Hyundai", model: "Tucson", body: "suv", type: "suv-medium" },
    { brand: "Hyundai", model: "Santa Fe", body: "suv", type: "suv-medium" },
    { brand: "Kia", model: "Sportage", body: "suv", type: "suv-medium" },
    { brand: "Kia", model: "Sorento", body: "suv", type: "suv-medium" },
    { brand: "Nissan", model: "X-Trail", body: "suv", type: "suv-medium" },
    { brand: "Nissan", model: "Murano", body: "suv", type: "suv-medium" },
    { brand: "Honda", model: "CR-V", body: "suv", type: "suv-medium" },
    { brand: "Honda", model: "Pilot", body: "suv", type: "suv-medium" },
    { brand: "Subaru", model: "Forester", body: "suv", type: "suv-medium" },
    { brand: "Subaru", model: "Outback", body: "suv", type: "suv-medium" },
    { brand: "Volkswagen", model: "Tiguan", body: "suv", type: "suv-medium" },
    { brand: "Volkswagen", model: "Atlas", body: "suv", type: "suv-medium" },
    { brand: "Skoda", model: "Kodiaq", body: "suv", type: "suv-medium" },
    { brand: "Renault", model: "Koleos", body: "suv", type: "suv-medium" },
    { brand: "Peugeot", model: "3008", body: "suv", type: "suv-medium" },
    { brand: "Peugeot", model: "5008", body: "suv", type: "suv-medium" },
    { brand: "Haval", model: "F7", body: "suv", type: "suv-medium" },
    { brand: "Haval", model: "M6", body: "suv", type: "suv-medium" },
    { brand: "Geely", model: "Atlas Pro", body: "suv", type: "suv-medium" },
    { brand: "Chery", model: "Tiggo 8", body: "suv", type: "suv-medium" },
    { brand: "Chery", model: "Tiggo 9", body: "suv", type: "suv-medium" },
    { brand: "BMW", model: "X3", body: "suv", type: "suv-medium" },
    { brand: "BMW", model: "X4", body: "suv", type: "suv-medium" },
    { brand: "Audi", model: "Q5", body: "suv", type: "suv-medium" },
    { brand: "Mercedes-Benz", model: "GLC", body: "suv", type: "suv-medium" },
    { brand: "Volvo", model: "XC60", body: "suv", type: "suv-medium" },
    { brand: "Lexus", model: "NX", body: "suv", type: "suv-medium" },
    { brand: "Lexus", model: "RX", body: "suv", type: "suv-medium" },
    { brand: "Infiniti", model: "QX50", body: "suv", type: "suv-medium" },
    { brand: "Infiniti", model: "QX60", body: "suv", type: "suv-medium" },
    { brand: "Jeep", model: "Cherokee", body: "suv", type: "suv-medium" },
    { brand: "Ford", model: "Edge", body: "suv", type: "suv-medium" },
    { brand: "Ford", model: "Explorer", body: "suv", type: "suv-medium" },
    { brand: "Cadillac", model: "XT5", body: "suv", type: "suv-medium" },
    { brand: "Cadillac", model: "XT6", body: "suv", type: "suv-medium" },
    { brand: "Acura", model: "RDX", body: "suv", type: "suv-medium" },
    { brand: "Acura", model: "MDX", body: "suv", type: "suv-medium" },
    { brand: "Land Rover", model: "Discovery Sport", body: "suv", type: "suv-medium" },
    { brand: "Range Rover", model: "Evoque", body: "suv", type: "suv-medium" },
    { brand: "Range Rover", model: "Velar", body: "suv", type: "suv-medium" },
    { brand: "Porsche", model: "Macan", body: "suv", type: "suv-medium" },

    // =========================================
    // SUV LARGE
    // =========================================
    { brand: "Toyota", model: "Land Cruiser 200", body: "suv", type: "suv-large" },
    { brand: "Toyota", model: "Land Cruiser 300", body: "suv", type: "suv-large" },
    { brand: "Toyota", model: "Sequoia", body: "suv", type: "suv-large" },
    { brand: "Toyota", model: "4Runner", body: "suv", type: "suv-large" },
    { brand: "Lexus", model: "LX570", body: "suv", type: "suv-large" },
    { brand: "Lexus", model: "LX600", body: "suv", type: "suv-large" },
    { brand: "Lexus", model: "GX460", body: "suv", type: "suv-large" },
    { brand: "Lexus", model: "GX550", body: "suv", type: "suv-large" },
    { brand: "Nissan", model: "Patrol", body: "suv", type: "suv-large" },
    { brand: "Nissan", model: "Armada", body: "suv", type: "suv-large" },
    { brand: "Infiniti", model: "QX80", body: "suv", type: "suv-large" },
    { brand: "Cadillac", model: "Escalade", body: "suv", type: "suv-large" },
    { brand: "Chevrolet", model: "Tahoe", body: "suv", type: "suv-large" },
    { brand: "Chevrolet", model: "Suburban", body: "suv", type: "suv-large" },
    { brand: "GMC", model: "Yukon", body: "suv", type: "suv-large" },
    { brand: "Ford", model: "Expedition", body: "suv", type: "suv-large" },
    { brand: "Jeep", model: "Grand Cherokee", body: "suv", type: "suv-large" },
    { brand: "Jeep", model: "Wagoneer", body: "suv", type: "suv-large" },
    { brand: "Haval", model: "H9", body: "suv", type: "suv-large" },
    { brand: "BMW", model: "X5", body: "suv", type: "suv-large" },
    { brand: "BMW", model: "X6", body: "suv", type: "suv-large" },
    { brand: "Audi", model: "Q7", body: "suv", type: "suv-large" },
    { brand: "Mercedes-Benz", model: "GLE", body: "suv", type: "suv-large" },
    { brand: "Volvo", model: "XC90", body: "suv", type: "suv-large" },
    { brand: "Land Rover", model: "Discovery", body: "suv", type: "suv-large" },
    { brand: "Range Rover", model: "Sport", body: "suv", type: "suv-large" },
    { brand: "Porsche", model: "Cayenne", body: "suv", type: "suv-large" },
    { brand: "Tesla", model: "Model X", body: "suv", type: "suv-large" },

    // =========================================
    // SUV LUXURY
    // =========================================
    { brand: "Mercedes-Benz", model: "GLS", body: "suv", type: "suv-luxury" },
    { brand: "Mercedes-Benz", model: "G-Class", body: "suv", type: "suv-luxury" },
    { brand: "BMW", model: "X7", body: "suv", type: "suv-luxury" },
    { brand: "BMW", model: "XM", body: "suv", type: "suv-luxury" },
    { brand: "Audi", model: "Q8", body: "suv", type: "suv-luxury" },
    { brand: "Range Rover", model: "Vogue", body: "suv", type: "suv-luxury" },
    { brand: "Range Rover", model: "Autobiography", body: "suv", type: "suv-luxury" },
    { brand: "Range Rover", model: "Sport SVR", body: "suv", type: "suv-luxury" },
    { brand: "Bentley", model: "Bentayga", body: "suv", type: "suv-luxury" },
    { brand: "Rolls-Royce", model: "Cullinan", body: "suv", type: "suv-luxury" },
    { brand: "Lamborghini", model: "Urus", body: "suv", type: "suv-luxury" },
    { brand: "Ferrari", model: "Purosangue", body: "suv", type: "suv-luxury" },
    { brand: "Mercedes-Maybach", model: "GLS 600", body: "suv", type: "suv-luxury" },
    { brand: "Aston Martin", model: "DBX", body: "suv", type: "suv-luxury" },

    // =========================================
    // PICKUP COMPACT
    // =========================================
    { brand: "Toyota", model: "Hilux", body: "pickup", type: "pickup-compact" },
    { brand: "Ford", model: "Maverick", body: "pickup", type: "pickup-compact" },
    { brand: "Chevrolet", model: "Montana", body: "pickup", type: "pickup-compact" },
    { brand: "Fiat", model: "Strada", body: "pickup", type: "pickup-compact" },
    { brand: "Renault", model: "Oroch", body: "pickup", type: "pickup-compact" },
    { brand: "Great Wall", model: "Wingle 5", body: "pickup", type: "pickup-compact" },
    { brand: "Great Wall", model: "Wingle 6", body: "pickup", type: "pickup-compact" },
    { brand: "Great Wall", model: "Poer", body: "pickup", type: "pickup-compact" },
    { brand: "Isuzu", model: "D-Max", body: "pickup", type: "pickup-compact" },
    { brand: "JAC", model: "T6", body: "pickup", type: "pickup-compact" },
    { brand: "JAC", model: "T8", body: "pickup", type: "pickup-compact" },
    { brand: "Mitsubishi", model: "L200", body: "pickup", type: "pickup-compact" },
    { brand: "Nissan", model: "Navara", body: "pickup", type: "pickup-compact" },
    { brand: "Mazda", model: "BT-50", body: "pickup", type: "pickup-compact" },

    // =========================================
    // PICKUP MEDIUM
    // =========================================
    { brand: "Ford", model: "Ranger", body: "pickup", type: "pickup-medium" },
    { brand: "Chevrolet", model: "Colorado", body: "pickup", type: "pickup-medium" },
    { brand: "GMC", model: "Canyon", body: "pickup", type: "pickup-medium" },
    { brand: "Nissan", model: "Frontier", body: "pickup", type: "pickup-medium" },
    { brand: "Volkswagen", model: "Amarok", body: "pickup", type: "pickup-medium" },
    { brand: "SsangYong", model: "Actyon Sports", body: "pickup", type: "pickup-medium" },
    { brand: "SsangYong", model: "Musso", body: "pickup", type: "pickup-medium" },
    { brand: "Haval", model: "Poer KingKong", body: "pickup", type: "pickup-medium" },
    { brand: "Toyota", model: "Tacoma", body: "pickup", type: "pickup-medium" },

    // =========================================
    // PICKUP LARGE
    // =========================================
    { brand: "Ford", model: "F-150", body: "pickup", type: "pickup-large" },
    { brand: "Ford", model: "F-250 Super Duty", body: "pickup", type: "pickup-large" },
    { brand: "Ford", model: "F-350 Super Duty", body: "pickup", type: "pickup-large" },
    { brand: "Chevrolet", model: "Silverado 1500", body: "pickup", type: "pickup-large" },
    { brand: "Chevrolet", model: "Silverado 2500HD", body: "pickup", type: "pickup-large" },
    { brand: "GMC", model: "Sierra 1500", body: "pickup", type: "pickup-large" },
    { brand: "GMC", model: "Sierra 2500HD", body: "pickup", type: "pickup-large" },
    { brand: "Dodge", model: "Ram 1500", body: "pickup", type: "pickup-large" },
    { brand: "Dodge", model: "Ram 2500", body: "pickup", type: "pickup-large" },
    { brand: "Dodge", model: "Ram 3500", body: "pickup", type: "pickup-large" },
    { brand: "Toyota", model: "Tundra", body: "pickup", type: "pickup-large" },
    { brand: "Nissan", model: "Titan", body: "pickup", type: "pickup-large" },
    { brand: "Nissan", model: "Titan XD", body: "pickup", type: "pickup-large" },
    { brand: "Hummer", model: "H1 Pickup", body: "pickup", type: "pickup-large" },
    { brand: "Hummer", model: "EV Pickup", body: "pickup", type: "pickup-large" },
    { brand: "RAM", model: "1500", body: "pickup", type: "pickup-large" },
    { brand: "RAM", model: "2500", body: "pickup", type: "pickup-large" },
    { brand: "RAM", model: "3500", body: "pickup", type: "pickup-large" },

    // =========================================
    // PICKUP LUXURY
    // =========================================
    { brand: "Ford", model: "F-150 Raptor", body: "pickup", type: "pickup-luxury" },
    { brand: "Ford", model: "F-150 Raptor R", body: "pickup", type: "pickup-luxury" },
    { brand: "Ram", model: "TRX", body: "pickup", type: "pickup-luxury" },
    { brand: "GMC", model: "Sierra Denali Ultimate", body: "pickup", type: "pickup-luxury" },
    { brand: "Chevrolet", model: "Silverado High Country", body: "pickup", type: "pickup-luxury" },
    { brand: "Toyota", model: "Tundra Capstone", body: "pickup", type: "pickup-luxury" },
    { brand: "Nissan", model: "Titan Platinum Reserve", body: "pickup", type: "pickup-luxury" },
    { brand: "Rivian", model: "R1T", body: "pickup", type: "pickup-luxury" },
    { brand: "Tesla", model: "Cybertruck", body: "pickup", type: "pickup-luxury" },
    { brand: "Bollinger", model: "B2", body: "pickup", type: "pickup-luxury" },

    // =========================================
    // MINIVAN COMPACT
    // =========================================
    { brand: "Toyota", model: "Sienta", body: "minivan", type: "minivan-compact" },
    { brand: "Honda", model: "Freed", body: "minivan", type: "minivan-compact" },
    { brand: "Honda", model: "Stepwgn", body: "minivan", type: "minivan-compact" },
    { brand: "Nissan", model: "Note Aura Van", body: "minivan", type: "minivan-compact" },
    { brand: "Mazda", model: "Premacy", body: "minivan", type: "minivan-compact" },
    { brand: "Mitsubishi", model: "Delica D2", body: "minivan", type: "minivan-compact" },
    { brand: "Suzuki", model: "Solio Bandit", body: "minivan", type: "minivan-compact" },

    // =========================================
    // MINIVAN STANDARD
    // =========================================
    { brand: "Toyota", model: "Noah", body: "minivan", type: "minivan-standard" },
    { brand: "Toyota", model: "Voxy", body: "minivan", type: "minivan-standard" },
    { brand: "Nissan", model: "Serena", body: "minivan", type: "minivan-standard" },
    { brand: "Honda", model: "Odyssey (Japan)", body: "minivan", type: "minivan-standard" },
    { brand: "Mazda", model: "Biante", body: "minivan", type: "minivan-standard" },
    { brand: "Mitsubishi", model: "Delica D5", body: "minivan", type: "minivan-standard" },
    { brand: "Subaru", model: "Exiga", body: "minivan", type: "minivan-standard" },
    { brand: "Hyundai", model: "H-1 Starex", body: "minivan", type: "minivan-standard" },
    { brand: "Kia", model: "Carnival (old)", body: "minivan", type: "minivan-standard" },
    { brand: "Toyota", model: "Sienna", body: "minivan", type: "minivan-standard" },
    { brand: "Honda", model: "Odyssey", body: "minivan", type: "minivan-standard" },
    { brand: "Chrysler", model: "Pacifica", body: "minivan", type: "minivan-standard" },
    { brand: "Dodge", model: "Grand Caravan", body: "minivan", type: "minivan-standard" },

    // =========================================
    // MINIVAN BUSINESS
    // =========================================
    { brand: "Toyota", model: "Alphard", body: "minivan", type: "minivan-business" },
    { brand: "Toyota", model: "Vellfire", body: "minivan", type: "minivan-business" },
    { brand: "Honda", model: "Elysion", body: "minivan", type: "minivan-business" },
    { brand: "Nissan", model: "Elgrand", body: "minivan", type: "minivan-business" },
    { brand: "Hyundai", model: "Staria", body: "minivan", type: "minivan-business" },
    { brand: "Kia", model: "Carnival (new)", body: "minivan", type: "minivan-business" },
    { brand: "Buick", model: "GL8 Avenir", body: "minivan", type: "minivan-business" },
    { brand: "Buick", model: "GL8 ES", body: "minivan", type: "minivan-business" },
    { brand: "Mercedes-Benz", model: "V-Class", body: "minivan", type: "minivan-business" },
    { brand: "Volkswagen", model: "Multivan T6", body: "minivan", type: "minivan-business" },
    { brand: "Volkswagen", model: "Multivan T7", body: "minivan", type: "minivan-business" },

    // =========================================
    // MINIVAN PREMIUM
    // =========================================
    { brand: "Lexus", model: "LM 300h", body: "minivan", type: "minivan-premium" },
    { brand: "Lexus", model: "LM 500h", body: "minivan", type: "minivan-premium" },
    { brand: "Toyota", model: "Alphard Executive Lounge", body: "minivan", type: "minivan-premium" },
    { brand: "Toyota", model: "Vellfire Executive Lounge", body: "minivan", type: "minivan-premium" },
    { brand: "Mercedes-Benz", model: "V-Class Exclusive", body: "minivan", type: "minivan-premium" },
    { brand: "Mercedes-Maybach", model: "Vito VIP", body: "minivan", type: "minivan-premium" },

    // =========================================
    // MINIVAN LUXURY
    // =========================================
    { brand: "Mercedes-Maybach", model: "V-Class Maybach Edition", body: "minivan", type: "minivan-luxury" },
    { brand: "Toyota", model: "Alphard Royal Lounge", body: "minivan", type: "minivan-luxury" },
    { brand: "Buick", model: "GL8 Century", body: "minivan", type: "minivan-luxury" },
    { brand: "Hongqi", model: "HQ9", body: "minivan", type: "minivan-luxury" },
    { brand: "Zeekr", model: "009", body: "minivan", type: "minivan-luxury" },
    { brand: "Voyah", model: "Dream", body: "minivan", type: "minivan-luxury" },

    // =========================================
    // MINIVAN ELECTRIC
    // =========================================
    { brand: "Mercedes-Benz", model: "EQV", body: "minivan", type: "minivan-electric" },
    { brand: "Volkswagen", model: "ID. Buzz", body: "minivan", type: "minivan-electric" },
    { brand: "Zeekr", model: "009 EV", body: "minivan", type: "minivan-electric" },
    { brand: "BYD", model: "Denza D9 EV", body: "minivan", type: "minivan-electric" },
    { brand: "Voyah", model: "Dream EV", body: "minivan", type: "minivan-electric" },
    { brand: "Li Auto", model: "Mega", body: "minivan", type: "minivan-electric" },
    { brand: "Maxus", model: "MIFA 9", body: "minivan", type: "minivan-electric" },
    { brand: "Maxus", model: "EG10", body: "minivan", type: "minivan-electric" },

    // =========================================
    // MINIBUS
    // =========================================
    { brand: "Mercedes-Benz", model: "Vito Tourer", body: "minibus", type: "minibus" },
    { brand: "Mercedes-Benz", model: "V-Class Marco Polo", body: "minibus", type: "minibus" },
    { brand: "Volkswagen", model: "Transporter T5", body: "minibus", type: "minibus" },
    { brand: "Volkswagen", model: "Transporter T6", body: "minibus", type: "minibus" },
    { brand: "Volkswagen", model: "Transporter T7", body: "minibus", type: "minibus" },
    { brand: "Volkswagen", model: "Caravelle", body: "minibus", type: "minibus" },
    { brand: "Ford", model: "Transit Custom Kombi", body: "minibus", type: "minibus" },
    { brand: "Ford", model: "Tourneo Custom", body: "minibus", type: "minibus" },
    { brand: "Opel", model: "Vivaro Life", body: "minibus", type: "minibus" },
    { brand: "Renault", model: "Trafic Passenger", body: "minibus", type: "minibus" },
    { brand: "Renault", model: "Master Passenger", body: "minibus", type: "minibus" },
    { brand: "Nissan", model: "Primastar", body: "minibus", type: "minibus" },
    { brand: "Nissan", model: "NV300 Combi", body: "minibus", type: "minibus" },
    { brand: "Toyota", model: "HiAce", body: "minibus", type: "minibus" },

    // =========================================
    // MINIBUS PREMIUM
    // =========================================
    { brand: "Mercedes-Benz", model: "Sprinter VIP", body: "minibus", type: "minibus-premium" },
    { brand: "Mercedes-Benz", model: "V-Class VIP", body: "minibus", type: "minibus-premium" },
    { brand: "Toyota", model: "HiAce Premium", body: "minibus", type: "minibus-premium" },
    { brand: "Volkswagen", model: "Crafter VIP", body: "minibus", type: "minibus-premium" },
    { brand: "Hyundai", model: "Staria Lounge Premium", body: "minibus", type: "minibus-premium" },
    { brand: "Kia", model: "Carnival Limousine", body: "minibus", type: "minibus-premium" },
    { brand: "Hongqi", model: "HM9", body: "minibus", type: "minibus-premium" },
    { brand: "Buick", model: "GL8 Century Executive Van", body: "minibus", type: "minibus-premium" },

    // =========================================
    // VAN COMMERCIAL
    // =========================================
    { brand: "Mercedes-Benz", model: "Vito Panel Van", body: "commercial", type: "van-commercial" },
    { brand: "Mercedes-Benz", model: "Sprinter Panel Van", body: "commercial", type: "van-commercial" },
    { brand: "Ford", model: "Transit", body: "commercial", type: "van-commercial" },
    { brand: "Ford", model: "Transit Connect", body: "commercial", type: "van-commercial" },
    { brand: "Ford", model: "Transit Custom", body: "commercial", type: "van-commercial" },
    { brand: "Peugeot", model: "Partner", body: "commercial", type: "van-commercial" },
    { brand: "Peugeot", model: "Expert", body: "commercial", type: "van-commercial" },
    { brand: "Peugeot", model: "Boxer", body: "commercial", type: "van-commercial" },
    { brand: "Citroen", model: "Berlingo", body: "commercial", type: "van-commercial" },
    { brand: "Citroen", model: "Jumpy", body: "commercial", type: "van-commercial" },
    { brand: "Citroen", model: "Jumper", body: "commercial", type: "van-commercial" },
    { brand: "Renault", model: "Kangoo Van", body: "commercial", type: "van-commercial" },
    { brand: "Renault", model: "Trafic Van", body: "commercial", type: "van-commercial" },
    { brand: "Renault", model: "Master Van", body: "commercial", type: "van-commercial" },
    { brand: "Volkswagen", model: "Caddy Cargo", body: "commercial", type: "van-commercial" },
    { brand: "Volkswagen", model: "Transporter Panel", body: "commercial", type: "van-commercial" },
    { brand: "Volkswagen", model: "Crafter Panel Van", body: "commercial", type: "van-commercial" },
    { brand: "Fiat", model: "Doblo Cargo", body: "commercial", type: "van-commercial" },
    { brand: "Fiat", model: "Scudo", body: "commercial", type: "van-commercial" },
    { brand: "Fiat", model: "Ducato", body: "commercial", type: "van-commercial" },
    { brand: "Opel", model: "Combo Cargo", body: "commercial", type: "van-commercial" },
    { brand: "Opel", model: "Vivaro Van", body: "commercial", type: "van-commercial" },
    { brand: "Opel", model: "Movano", body: "commercial", type: "van-commercial" },
    { brand: "GAC", model: "G50 Plus Van", body: "commercial", type: "van-commercial" },
    { brand: "Maxus", model: "V80", body: "commercial", type: "van-commercial" },
    { brand: "Maxus", model: "Deliver 9", body: "commercial", type: "van-commercial" },
    { brand: "Mercedes-Benz", model: "Sprinter", body: "commercial", type: "van-commercial" },
    { brand: "Mercedes-Benz", model: "Vito", body: "commercial", type: "van-commercial" },
    { brand: "Iveco", model: "Daily", body: "commercial", type: "van-commercial" },
    { brand: "GAZ", model: "Gazelle Next", body: "commercial", type: "van-commercial" },
    { brand: "UAZ", model: "Profi", body: "commercial", type: "van-commercial" },

    // =========================================
    // CARGO LARGE
    // =========================================
    { brand: "Mercedes-Benz", model: "Sprinter XL", body: "commercial", type: "cargo-large" },
    { brand: "Ford", model: "Transit Extended", body: "commercial", type: "cargo-large" },
    { brand: "Volkswagen", model: "Crafter LWB", body: "commercial", type: "cargo-large" },
    { brand: "Fiat", model: "Ducato Maxi", body: "commercial", type: "cargo-large" },
    { brand: "Peugeot", model: "Boxer Maxi", body: "commercial", type: "cargo-large" },
    { brand: "Citroen", model: "Jumper Maxi", body: "commercial", type: "cargo-large" },
    { brand: "Renault", model: "Master XL", body: "commercial", type: "cargo-large" },
    { brand: "Iveco", model: "Daily XL", body: "commercial", type: "cargo-large" },
    { brand: "GAZ", model: "Gazelle Business", body: "commercial", type: "cargo-large" },

    // =========================================
    // ELECTRIC COMMERCIAL
    // =========================================
    { brand: "Mercedes-Benz", model: "eSprinter", body: "commercial", type: "van-commercial" },
    { brand: "Mercedes-Benz", model: "eVito", body: "commercial", type: "van-commercial" },
    { brand: "Volkswagen", model: "ID. Buzz Cargo", body: "commercial", type: "van-commercial" },
    { brand: "Ford", model: "E-Transit", body: "commercial", type: "van-commercial" },
    { brand: "Maxus", model: "EV80", body: "commercial", type: "van-commercial" },
    { brand: "Renault", model: "Master E-Tech", body: "commercial", type: "van-commercial" },

    // =========================================
    // COUPE / SPORT
    // =========================================
    { brand: "BMW", model: "2 Series", body: "coupe", type: "coupe" },
    { brand: "BMW", model: "4 Series", body: "coupe", type: "coupe" },
    { brand: "BMW", model: "8 Series", body: "coupe", type: "coupe" },
    { brand: "Audi", model: "A5", body: "coupe", type: "coupe" },
    { brand: "Audi", model: "TT", body: "coupe", type: "coupe" },
    { brand: "Mercedes-Benz", model: "C-Class Coupe", body: "coupe", type: "coupe" },
    { brand: "Mercedes-Benz", model: "E-Class Coupe", body: "coupe", type: "coupe" },
    { brand: "Mercedes-Benz", model: "S-Class Coupe", body: "coupe", type: "coupe" },
    { brand: "Lexus", model: "RC", body: "coupe", type: "coupe" },
    { brand: "Lexus", model: "LC", body: "coupe", type: "coupe" },
    { brand: "Infiniti", model: "Q60", body: "coupe", type: "coupe" },
    { brand: "Jaguar", model: "F-Type", body: "coupe", type: "coupe" },
    { brand: "Ford", model: "Mustang", body: "coupe", type: "coupe" },
    { brand: "Chevrolet", model: "Camaro", body: "coupe", type: "coupe" },
    { brand: "Dodge", model: "Challenger", body: "coupe", type: "coupe" },
    { brand: "Dodge", model: "Charger", body: "sedan", type: "sedan-business" },
    { brand: "Nissan", model: "370Z", body: "coupe", type: "coupe" },
    { brand: "Toyota", model: "Supra", body: "coupe", type: "coupe" },
    { brand: "BMW", model: "Z4", body: "coupe", type: "coupe" },
    { brand: "Porsche", model: "718 Boxster", body: "coupe", type: "coupe" },
    { brand: "Porsche", model: "718 Cayman", body: "coupe", type: "coupe" },

    // =========================================
    // SUPERCARS - FERRARI
    // =========================================
    { brand: "Ferrari", model: "488 GTB", body: "coupe", type: "supercar" },
    { brand: "Ferrari", model: "488 Spider", body: "convertible", type: "supercar" },
    { brand: "Ferrari", model: "F8 Tributo", body: "coupe", type: "supercar" },
    { brand: "Ferrari", model: "F8 Spider", body: "convertible", type: "supercar" },
    { brand: "Ferrari", model: "296 GTB", body: "coupe", type: "supercar" },
    { brand: "Ferrari", model: "296 GTS", body: "convertible", type: "supercar" },
    { brand: "Ferrari", model: "812 Superfast", body: "coupe", type: "supercar" },
    { brand: "Ferrari", model: "812 GTS", body: "convertible", type: "supercar" },
    { brand: "Ferrari", model: "Roma", body: "coupe", type: "supercar" },
    { brand: "Ferrari", model: "Portofino M", body: "convertible", type: "supercar" },
    { brand: "Ferrari", model: "SF90 Stradale", body: "coupe", type: "hypercar" },
    { brand: "Ferrari", model: "SF90 Spider", body: "convertible", type: "hypercar" },
    { brand: "Ferrari", model: "LaFerrari", body: "coupe", type: "hypercar" },
    { brand: "Ferrari", model: "Enzo", body: "coupe", type: "hypercar" },

    // =========================================
    // SUPERCARS - LAMBORGHINI
    // =========================================
    { brand: "Lamborghini", model: "Huracán EVO", body: "coupe", type: "supercar" },
    { brand: "Lamborghini", model: "Huracán EVO Spyder", body: "convertible", type: "supercar" },
    { brand: "Lamborghini", model: "Huracán STO", body: "coupe", type: "supercar" },
    { brand: "Lamborghini", model: "Huracán Tecnica", body: "coupe", type: "supercar" },
    { brand: "Lamborghini", model: "Aventador S", body: "coupe", type: "supercar" },
    { brand: "Lamborghini", model: "Aventador SVJ", body: "coupe", type: "supercar" },
    { brand: "Lamborghini", model: "Aventador Roadster", body: "convertible", type: "supercar" },
    { brand: "Lamborghini", model: "Revuelto", body: "coupe", type: "hypercar" },
    { brand: "Lamborghini", model: "Sian FKP 37", body: "coupe", type: "hypercar" },
    { brand: "Lamborghini", model: "Countach LPI 800-4", body: "coupe", type: "hypercar" },

    // =========================================
    // SUPERCARS - MCLAREN
    // =========================================
    { brand: "McLaren", model: "540C", body: "coupe", type: "supercar" },
    { brand: "McLaren", model: "570S", body: "coupe", type: "supercar" },
    { brand: "McLaren", model: "570GT", body: "coupe", type: "supercar" },
    { brand: "McLaren", model: "600LT", body: "coupe", type: "supercar" },
    { brand: "McLaren", model: "600LT Spider", body: "convertible", type: "supercar" },
    { brand: "McLaren", model: "650S", body: "coupe", type: "supercar" },
    { brand: "McLaren", model: "650S Spider", body: "convertible", type: "supercar" },
    { brand: "McLaren", model: "675LT", body: "coupe", type: "supercar" },
    { brand: "McLaren", model: "720S", body: "coupe", type: "supercar" },
    { brand: "McLaren", model: "720S Spider", body: "convertible", type: "supercar" },
    { brand: "McLaren", model: "765LT", body: "coupe", type: "supercar" },
    { brand: "McLaren", model: "Artura", body: "coupe", type: "supercar" },
    { brand: "McLaren", model: "P1", body: "coupe", type: "hypercar" },

    // =========================================
    // SUPERCARS - PORSCHE
    // =========================================
    { brand: "Porsche", model: "911 Turbo", body: "coupe", type: "supercar" },
    { brand: "Porsche", model: "911 Turbo S", body: "coupe", type: "supercar" },
    { brand: "Porsche", model: "911 GT3", body: "coupe", type: "supercar" },
    { brand: "Porsche", model: "911 GT3 RS", body: "coupe", type: "supercar" },
    { brand: "Porsche", model: "911 GT2 RS", body: "coupe", type: "supercar" },
    { brand: "Porsche", model: "911 Carrera GTS", body: "coupe", type: "supercar" },
    { brand: "Porsche", model: "718 Cayman GT4", body: "coupe", type: "supercar" },
    { brand: "Porsche", model: "Taycan Turbo S", body: "sedan", type: "sedan-luxury" },
    { brand: "Porsche", model: "911", body: "coupe", type: "supercar" },
    { brand: "Porsche", model: "911 Carrera", body: "coupe", type: "supercar" },
    { brand: "Porsche", model: "911 Carrera S", body: "coupe", type: "supercar" },
    { brand: "Porsche", model: "911 Carrera 4S", body: "coupe", type: "supercar" },

    // =========================================
    // HYPERCARS - BUGATTI
    // =========================================
    { brand: "Bugatti", model: "Chiron", body: "coupe", type: "hypercar" },
    { brand: "Bugatti", model: "Chiron Super Sport", body: "coupe", type: "hypercar" },
    { brand: "Bugatti", model: "Divo", body: "coupe", type: "hypercar" },
    { brand: "Bugatti", model: "Centodieci", body: "coupe", type: "hypercar" },
    { brand: "Bugatti", model: "La Voiture Noire", body: "coupe", type: "hypercar" },
    { brand: "Bugatti", model: "Veyron", body: "coupe", type: "hypercar" },

    // =========================================
    // HYPERCARS - PAGANI
    // =========================================
    { brand: "Pagani", model: "Huayra", body: "coupe", type: "hypercar" },
    { brand: "Pagani", model: "Huayra BC", body: "coupe", type: "hypercar" },
    { brand: "Pagani", model: "Zonda Cinque", body: "coupe", type: "hypercar" },
    { brand: "Pagani", model: "Zonda R", body: "coupe", type: "hypercar" },
    { brand: "Pagani", model: "Utopia", body: "coupe", type: "hypercar" },

    // =========================================
    // HYPERCARS - KOENIGSEGG
    // =========================================
    { brand: "Koenigsegg", model: "Agera R", body: "coupe", type: "hypercar" },
    { brand: "Koenigsegg", model: "Agera RS", body: "coupe", type: "hypercar" },
    { brand: "Koenigsegg", model: "Regera", body: "coupe", type: "hypercar" },
    { brand: "Koenigsegg", model: "Jesko", body: "coupe", type: "hypercar" },
    { brand: "Koenigsegg", model: "Gemera", body: "coupe", type: "hypercar" },
    { brand: "Koenigsegg", model: "CCXR", body: "coupe", type: "hypercar" },

    // =========================================
    // LUXURY SEDANS / SUV
    // =========================================
    { brand: "Rolls-Royce", model: "Phantom", body: "sedan", type: "luxury" },
    { brand: "Rolls-Royce", model: "Ghost", body: "sedan", type: "luxury" },
    { brand: "Rolls-Royce", model: "Wraith", body: "coupe", type: "luxury" },
    { brand: "Rolls-Royce", model: "Dawn", body: "convertible", type: "luxury" },
    { brand: "Rolls-Royce", model: "Cullinan", body: "suv", type: "luxury" },
    { brand: "Bentley", model: "Continental GT", body: "coupe", type: "luxury" },
    { brand: "Bentley", model: "Flying Spur", body: "sedan", type: "luxury" },
    { brand: "Bentley", model: "Bentayga", body: "suv", type: "luxury" },
    { brand: "Mercedes-Maybach", model: "S-Class", body: "sedan", type: "luxury" },
    { brand: "Mercedes-Maybach", model: "GLS 600", body: "suv", type: "luxury" },
    { brand: "BMW", model: "XM Label Red", body: "suv", type: "luxury" },
    { brand: "BMW", model: "7 Series M760Li", body: "sedan", type: "luxury" },
    { brand: "Aston Martin", model: "DB11", body: "coupe", type: "luxury" },
    { brand: "Aston Martin", model: "DBS", body: "coupe", type: "luxury" },
    { brand: "Aston Martin", model: "Vantage", body: "coupe", type: "luxury" },
    { brand: "Maserati", model: "Ghibli", body: "sedan", type: "luxury" },
    { brand: "Maserati", model: "Levante", body: "suv", type: "luxury" },
    { brand: "Maserati", model: "MC20", body: "coupe", type: "luxury" },

    // =========================================
    // HATCHBACK SMALL
    // =========================================
    { brand: "Toyota", model: "Yaris", body: "hatchback", type: "hatch-small" },
    { brand: "Hyundai", model: "i20", body: "hatchback", type: "hatch-small" },
    { brand: "Kia", model: "Rio Hatchback", body: "hatchback", type: "hatch-small" },
    { brand: "Volkswagen", model: "Polo Hatchback", body: "hatchback", type: "hatch-small" },
    { brand: "Ford", model: "Fiesta", body: "hatchback", type: "hatch-small" },
    { brand: "Peugeot", model: "208", body: "hatchback", type: "hatch-small" },
    { brand: "Citroen", model: "C3", body: "hatchback", type: "hatch-small" },
    { brand: "Renault", model: "Clio", body: "hatchback", type: "hatch-small" },
    { brand: "Opel", model: "Corsa", body: "hatchback", type: "hatch-small" },
    { brand: "Skoda", model: "Fabia", body: "hatchback", type: "hatch-small" },
    { brand: "Seat", model: "Ibiza", body: "hatchback", type: "hatch-small" },
    { brand: "Mazda", model: "Mazda 2", body: "hatchback", type: "hatch-small" },
    { brand: "Honda", model: "Fit", body: "hatchback", type: "hatch-small" },
    { brand: "Nissan", model: "Micra", body: "hatchback", type: "hatch-small" },
    { brand: "Suzuki", model: "Swift", body: "hatchback", type: "hatch-small" },

    // =========================================
    // HATCHBACK MEDIUM
    // =========================================
    { brand: "Volkswagen", model: "Golf", body: "hatchback", type: "hatch-medium" },
    { brand: "Ford", model: "Focus", body: "hatchback", type: "hatch-medium" },
    { brand: "Opel", model: "Astra", body: "hatchback", type: "hatch-medium" },
    { brand: "Peugeot", model: "308", body: "hatchback", type: "hatch-medium" },
    { brand: "Renault", model: "Megane", body: "hatchback", type: "hatch-medium" },
    { brand: "Skoda", model: "Octavia Hatchback", body: "hatchback", type: "hatch-medium" },
    { brand: "Seat", model: "Leon", body: "hatchback", type: "hatch-medium" },
    { brand: "Audi", model: "A3 Sportback", body: "hatchback", type: "hatch-medium" },
    { brand: "BMW", model: "1 Series", body: "hatchback", type: "hatch-medium" },
    { brand: "Mercedes-Benz", model: "A-Class Hatchback", body: "hatchback", type: "hatch-medium" },
    { brand: "Mazda", model: "Mazda 3", body: "hatchback", type: "hatch-medium" },
    { brand: "Honda", model: "Civic Hatchback", body: "hatchback", type: "hatch-medium" },
    { brand: "Hyundai", model: "i30", body: "hatchback", type: "hatch-medium" },
    { brand: "Kia", model: "Ceed", body: "hatchback", type: "hatch-medium" },
    { brand: "Toyota", model: "Corolla Hatchback", body: "hatchback", type: "hatch-medium" },

    // =========================================
    // ELECTRIC VEHICLES
    // =========================================
    { brand: "Tesla", model: "Model 3", body: "sedan", type: "sedan-premium" },
    { brand: "Tesla", model: "Model S", body: "sedan", type: "sedan-luxury" },
    { brand: "Tesla", model: "Model Y", body: "suv", type: "suv-medium" },
    { brand: "BMW", model: "iX", body: "suv", type: "suv-luxury" },
    { brand: "BMW", model: "i4", body: "sedan", type: "sedan-premium" },
    { brand: "Mercedes-Benz", model: "EQS", body: "sedan", type: "sedan-luxury" },
    { brand: "Mercedes-Benz", model: "EQC", body: "suv", type: "suv-medium" },
    { brand: "Audi", model: "e-tron", body: "suv", type: "suv-medium" },
    { brand: "Audi", model: "e-tron GT", body: "sedan", type: "sedan-premium" },
    { brand: "Porsche", model: "Taycan", body: "sedan", type: "sedan-premium" },
    { brand: "Hyundai", model: "IONIQ 5", body: "suv", type: "suv-compact" },
    { brand: "Kia", model: "EV6", body: "suv", type: "suv-compact" },
    { brand: "Volkswagen", model: "ID.4", body: "suv", type: "suv-compact" },
    { brand: "Volkswagen", model: "ID.3", body: "hatchback", type: "hatch-medium" },
    { brand: "Nissan", model: "Leaf", body: "hatchback", type: "hatch-medium" },
    { brand: "Chevrolet", model: "Bolt EV", body: "hatchback", type: "hatch-small" },
    { brand: "Ford", model: "Mustang Mach-E", body: "suv", type: "suv-medium" },
    { brand: "Rivian", model: "R1S", body: "suv", type: "suv-large" },
    { brand: "Lucid", model: "Air", body: "sedan", type: "sedan-luxury" },
    { brand: "Polestar", model: "2", body: "sedan", type: "sedan-premium" }
];

// =========================================
// AUTO-CALC CLASS FOR ANY CAR
// =========================================
function getClassForCar(car) {
    return classMapping[car.type] || 1;
}

// =========================================
// Helper: Get unique brands from database
// =========================================
function getUniqueBrands() {
    const brands = [...new Set(carDatabaseArray.map(car => car.brand))];
    return brands.sort();
}

// =========================================
// Helper: Get models by brand
// =========================================
function getModelsByBrand(brand) {
    return carDatabaseArray
        .filter(car => car.brand === brand)
        .map(car => car.model)
        .filter((model, index, self) => self.indexOf(model) === index)
        .sort();
}

// =========================================
// Helper: Get car by brand and model
// =========================================
function getCarByBrandAndModel(brand, model) {
    return carDatabaseArray.find(car => car.brand === brand && car.model === model);
}

// =========================================
// COMPATIBILITY LAYER: Convert array to old object format
// =========================================
// This creates the old object format that the calculator expects:
// { "Brand": { class: 1-5, models: ["Model1", "Model2", ...] } }
// =========================================
const carDatabase = {};

// Group cars by brand
carDatabaseArray.forEach(car => {
    const brand = car.brand;
    const model = car.model;
    const carClass = getClassForCar(car);
    
    if (!carDatabase[brand]) {
        carDatabase[brand] = {
            class: carClass,
            models: []
        };
    }
    
    // Add model if not already present
    if (!carDatabase[brand].models.includes(model)) {
        carDatabase[brand].models.push(model);
    }
    
    // Update class if this car has a higher class (for brands with multiple classes)
    // We'll use the most common class or the highest class
    if (carDatabase[brand].class < carClass) {
        // Keep the higher class for premium brands
        const allClassesForBrand = carDatabaseArray
            .filter(c => c.brand === brand)
            .map(c => getClassForCar(c));
        const mostCommonClass = allClassesForBrand.sort((a, b) => 
            allClassesForBrand.filter(x => x === b).length - allClassesForBrand.filter(x => x === a).length
        )[0];
        carDatabase[brand].class = mostCommonClass;
    }
});

// Sort models alphabetically for each brand
Object.keys(carDatabase).forEach(brand => {
    carDatabase[brand].models.sort();
});
