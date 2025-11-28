/* ============================
   БАЗА АВТОМОБИЛЕЙ
   Структура: марка → модель → класс
   ============================

Классы:
1 — Малый класс
2 — Бизнес / Кроссоверы
3 — Внедорожники / Люкс
4 — Пикапы
5 — Минивэны

*/

const carDatabase = {
    "Audi": {
        "A3": 2, "A4": 2, "A5": 2, "A6": 2, "A7": 2, "A8": 2,
        "Q2": 2, "Q3": 2, "Q5": 2, "Q7": 3, "Q8": 3,
        "RS3": 2, "RS4": 2, "RS5": 2, "RS6": 2, "RS7": 2,
        "SQ5": 2, "SQ7": 3
    },
    "BMW": {
        "1 Series": 2, "2 Series": 2, "3 Series": 2, "4 Series": 2, "5 Series": 2,
        "7 Series": 3, "8 Series": 3,
        "X1": 2, "X2": 2, "X3": 2, "X4": 2, "X5": 3, "X6": 3, "X7": 3,
        "M2": 2, "M3": 2, "M4": 2, "M5": 2, "M8": 3
    },
    "Mercedes-Benz": {
        "A-Class": 2, "C-Class": 2, "E-Class": 2, "S-Class": 3,
        "CLA": 2, "CLS": 2,
        "GLA": 2, "GLB": 2, "GLC": 2, "GLE": 3, "GLS": 3,
        "AMG A45": 2, "AMG C63": 2, "AMG E63": 2, "AMG GT": 3
    },
    "Porsche": {
        "Cayman": 3, "Boxster": 3, "911": 3,
        "Panamera": 3,
        "Macan": 3, "Cayenne": 3
    },
    "Toyota": {
        "Camry": 2, "Corolla": 1, "RAV4": 2,
        "Land Cruiser 200": 3, "Land Cruiser 300": 3,
        "Prado": 3, "Highlander": 2,
        "Tundra": 4
    },
    "Lexus": {
        "IS": 3, "ES": 3, "GS": 3, "LS": 3,
        "UX": 2, "NX": 2, "RX": 3, "GX": 3, "LX": 3,
        "RC F": 3
    },
    "KIA": {
        "Rio": 1, "Ceed": 1, "Cerato": 1,
        "Optima": 2, "K5": 2,
        "Sportage": 2, "Sorento": 2, "Mohave": 3
    },
    "Hyundai": {
        "Solaris": 1, "Elantra": 1,
        "Sonata": 2,
        "Tucson": 2, "Santa Fe": 2, "Palisade": 3
    },
    "Volkswagen": {
        "Polo": 1, "Golf": 1, "Passat": 2,
        "Tiguan": 2, "Touareg": 3,
        "Arteon": 2
    },
    "Range Rover": {
        "Evoque": 2, "Velar": 3, "Sport": 3, "Vogue": 3, "Autobiography": 3
    },
    "Tesla": {
        "Model 3": 2, "Model Y": 2,
        "Model S": 3, "Model X": 3
    },
    "Ford": {
        "F-150": 4, "Raptor": 4,
        "Explorer": 2, "Expedition": 3, "Mustang": 2
    },
    "Chevrolet": {
        "Tahoe": 3, "Suburban": 3, "Camaro": 2,
        "Silverado": 4
    },
    "Cadillac": {
        "CT5": 3, "CT6": 3,
        "XT5": 3, "XT6": 3,
        "Escalade": 3
    },
    "Infiniti": {
        "Q50": 3, "Q60": 3,
        "QX50": 2, "QX60": 3, "QX80": 3
    },
    "Mini": {
        "Cooper": 1, "Clubman": 1, "Countryman": 1
    },
    "Honda": {
        "Civic": 1, "Accord": 2,
        "CR-V": 2, "Pilot": 2
    },
    "Mazda": {
        "Mazda 3": 1, "Mazda 6": 2,
        "CX-3": 1, "CX-5": 2, "CX-9": 2
    },
    "Nissan": {
        "Qashqai": 2, "X-Trail": 2,
        "Murano": 2, "Patrol": 3,
        "GT-R": 3
    },
    "Volvo": {
        "S60": 3, "S90": 3,
        "XC40": 2, "XC60": 3, "XC90": 3
    },
    "Subaru": {
        "Impreza": 1, "Legacy": 2,
        "Forester": 2, "Outback": 2,
        "WRX": 2, "WRX STI": 2
    },
    "Jeep": {
        "Renegade": 2, "Compass": 2,
        "Cherokee": 2, "Grand Cherokee": 3,
        "Wrangler": 3
    },
    "GMC": {
        "Sierra": 4, "Yukon": 3, "Denali": 3
    },
    "Toyota Minivans": {
        "Hiace": 5, "Alphard": 5, "Vellfire": 5, "Sienna": 5
    }
};

/* ============================
   ФУНКЦИИ ФИЛЬТРАЦИИ
   ============================ */

const filterBrandsByType = (typeId) => {
    if (!typeId) return Object.keys(carDatabase);
    
    const allowedClasses = getClassesByType(typeId);
    if (!allowedClasses || allowedClasses.length === 0) return [];
    
    const brands = [];
    Object.keys(carDatabase).forEach(brand => {
        const models = carDatabase[brand];
        const hasMatchingModel = Object.values(models).some(modelClass => 
            allowedClasses.includes(modelClass)
        );
        if (hasMatchingModel) {
            brands.push(brand);
        }
    });
    
    return brands;
};

const filterModelsByType = (brand, typeId) => {
    if (!brand || !carDatabase[brand]) return [];
    
    if (!typeId) return Object.keys(carDatabase[brand]);
    
    const allowedClasses = getClassesByType(typeId);
    if (!allowedClasses || allowedClasses.length === 0) return [];
    
    const models = [];
    Object.keys(carDatabase[brand]).forEach(model => {
        const modelClass = carDatabase[brand][model];
        if (allowedClasses.includes(modelClass)) {
            models.push(model);
        }
    });
    
    return models;
};

const getClassByModel = (brand, model) => {
    if (!brand || !model || !carDatabase[brand]) return null;
    return carDatabase[brand][model] || null;
};

const getAllBrands = () => {
    return Object.keys(carDatabase);
};

const getModelsByBrand = (brand) => {
    if (!brand || !carDatabase[brand]) return [];
    return Object.keys(carDatabase[brand]);
};
