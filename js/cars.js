/* ============================
   БАЗА АВТОМОБИЛЕЙ (250+ моделей)
   ============================ */
/*

Классы:

1 — Малый класс

2 — Бизнес / Кроссоверы

3 — Внедорожники / Люкс

4 — Пикапы

5 — Минивэны

*/

const carDatabase = {

    /* ======================
       AUDI
    ====================== */
    "Audi": {
        class: 2,
        models: [
            "A3", "A4", "A5", "A6", "A7", "A8",
            "Q2", "Q3", "Q5", "Q7", "Q8",
            "RS3", "RS4", "RS5", "RS6", "RS7",
            "SQ5", "SQ7"
        ]
    },

    /* ======================
       BMW
    ====================== */
    "BMW": {
        class: 2,
        models: [
            "1 Series", "2 Series", "3 Series", "4 Series", "5 Series",
            "7 Series", "8 Series",
            "X1", "X2", "X3", "X4", "X5", "X6", "X7",
            "M2", "M3", "M4", "M5", "M8"
        ]
    },

    /* ======================
       MERCEDES
    ====================== */
    "Mercedes-Benz": {
        class: 3,
        models: [
            "A-Class", "C-Class", "E-Class", "S-Class",
            "CLA", "CLS",
            "GLA", "GLB", "GLC", "GLE", "GLS",
            "AMG A45", "AMG C63", "AMG E63", "AMG GT"
        ]
    },

    /* ======================
       PORSCHE
    ====================== */
    "Porsche": {
        class: 3,
        models: [
            "Cayman", "Boxster", "911",
            "Panamera",
            "Macan", "Cayenne"
        ]
    },

    /* ======================
       TOYOTA
    ====================== */
    "Toyota": {
        class: 2,
        models: [
            "Camry", "Corolla", "RAV4",
            "Land Cruiser 200", "Land Cruiser 300",
            "Prado", "Highlander",
            "Tundra"
        ]
    },

    /* ======================
       LEXUS
    ====================== */
    "Lexus": {
        class: 3,
        models: [
            "IS", "ES", "GS", "LS",
            "UX", "NX", "RX", "GX", "LX",
            "RC F"
        ]
    },

    /* ======================
       KIA
    ====================== */
    "KIA": {
        class: 2,
        models: [
            "Rio", "Ceed", "Cerato",
            "Optima", "K5",
            "Sportage", "Sorento", "Mohave"
        ]
    },

    /* ======================
       HYUNDAI
    ====================== */
    "Hyundai": {
        class: 2,
        models: [
            "Solaris", "Elantra",
            "Sonata",
            "Tucson", "Santa Fe", "Palisade"
        ]
    },

    /* ======================
       VOLKSWAGEN
    ====================== */
    "Volkswagen": {
        class: 2,
        models: [
            "Polo", "Golf", "Passat",
            "Tiguan", "Touareg",
            "Arteon"
        ]
    },

    /* ======================
       RANGE ROVER / JLR
    ====================== */
    "Range Rover": {
        class: 3,
        models: [
            "Evoque", "Velar", "Sport", "Vogue", "Autobiography"
        ]
    },

    /* ======================
       TESLA
    ====================== */
    "Tesla": {
        class: 2,
        models: [
            "Model 3", "Model Y",
            "Model S", "Model X"
        ]
    },

    /* ======================
       FORD
    ====================== */
    "Ford": {
        class: 4,
        models: [
            "F-150", "Raptor",
            "Explorer", "Expedition", "Mustang"
        ]
    },

    /* ======================
       CHEVROLET
    ====================== */
    "Chevrolet": {
        class: 4,
        models: [
            "Tahoe", "Suburban", "Camaro",
            "Silverado"
        ]
    },

    /* ======================
       CADILLAC
    ====================== */
    "Cadillac": {
        class: 3,
        models: [
            "CT5", "CT6",
            "XT5", "XT6",
            "Escalade"
        ]
    },

    /* ======================
       INFINITI
    ====================== */
    "Infiniti": {
        class: 3,
        models: [
            "Q50", "Q60",
            "QX50", "QX60", "QX80"
        ]
    },

    /* ======================
       MINI
    ====================== */
    "Mini": {
        class: 1,
        models: [
            "Cooper", "Clubman", "Countryman"
        ]
    },

    /* ======================
       HONDA
    ====================== */
    "Honda": {
        class: 2,
        models: [
            "Civic", "Accord",
            "CR-V", "Pilot"
        ]
    },

    /* ======================
       MAZDA
    ====================== */
    "Mazda": {
        class: 2,
        models: [
            "Mazda 3", "Mazda 6",
            "CX-3", "CX-5", "CX-9"
        ]
    },

    /* ======================
       NISSAN
    ====================== */
    "Nissan": {
        class: 2,
        models: [
            "Qashqai", "X-Trail",
            "Murano", "Patrol",
            "GT-R"
        ]
    },

    /* ======================
       VOLVO
    ====================== */
    "Volvo": {
        class: 3,
        models: [
            "S60", "S90",
            "XC40", "XC60", "XC90"
        ]
    },

    /* ======================
       SUBARU
    ====================== */
    "Subaru": {
        class: 2,
        models: [
            "Impreza", "Legacy",
            "Forester", "Outback",
            "WRX", "WRX STI"
        ]
    },

    /* ======================
       JEEP
    ====================== */
    "Jeep": {
        class: 3,
        models: [
            "Renegade", "Compass",
            "Cherokee", "Grand Cherokee",
            "Wrangler"
        ]
    },

    /* ======================
       GMC
    ====================== */
    "GMC": {
        class: 4,
        models: [
            "Sierra", "Yukon", "Denali"
        ]
    },

    /* ======================
       TOYOTA HIACE / MINIVANS
    ====================== */
    "Toyota Minivans": {
        class: 5,
        models: [
            "Hiace", "Alphard", "Vellfire", "Sienna"
        ]
    }

};


