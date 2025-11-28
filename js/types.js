/* ============================
   ТИПЫ АВТОМОБИЛЕЙ → КЛАССЫ
   ============================

Структура: тип авто → массив классов

*/

const carTypes = {
    1: {
        name: "Малый класс",
        description: "Компактные автомобили",
        classes: [1]
    },
    2: {
        name: "Бизнес класс / Кроссоверы",
        description: "Бизнес-седаны и кроссоверы",
        classes: [2]
    },
    3: {
        name: "Внедорожники / Люкс",
        description: "Премиум внедорожники и люксовые авто",
        classes: [3]
    },
    4: {
        name: "Большие пикапы",
        description: "Пикапы и большие внедорожники",
        classes: [4]
    },
    5: {
        name: "Автобусы / Минивэны",
        description: "Минивэны и автобусы",
        classes: [5]
    }
};

/* ============================
   ФУНКЦИИ РАБОТЫ С ТИПАМИ
   ============================ */

const getTypeById = (typeId) => {
    return carTypes[typeId] || null;
};

const getClassesByType = (typeId) => {
    const type = getTypeById(typeId);
    return type ? type.classes : [];
};

const getTypeName = (typeId) => {
    const type = getTypeById(typeId);
    return type ? type.name : "—";
};

