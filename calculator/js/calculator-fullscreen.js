/* =============================
   PROPellini Calculator Fullscreen Logic
   ============================= */

/* =============================
   ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
   ============================= */

let currentStep = 1;
const totalSteps = 4;

let selectedType = null; // Теперь строка: "sedan", "suv", "pickup" и т.д.
let selectedBrand = null;
let selectedModel = null;
let selectedClass = null;
let selectedPackage = null;
let selectedRiskZones = [];
let selectedAdditionalServices = [];
let totalPrice = 0;

// Маппинг категорий к типам из базы данных
const typeCategoryMapping = {
    "sedan": ["sedan-small", "sedan-business", "sedan-premium", "sedan-luxury"],
    "hatchback": ["hatch-small", "hatch-medium"],
    "suv": ["suv-compact", "suv-medium", "suv-large", "suv-luxury"],
    "coupe": ["coupe", "coupe-sport", "supercar", "hypercar", "luxury"],
    "pickup": ["pickup-compact", "pickup-small", "pickup-medium", "pickup-large", "pickup-luxury"],
    "minivan": ["minivan-compact", "minivan-standard", "minivan", "minivan-business", "minivan-premium", "minivan-luxury", "minivan-electric"],
    "minibus": ["minibus", "minibus-premium"]
};

/* =============================
   ЭЛЕМЕНТЫ DOM
   ============================= */

const calculatorFullscreen = document.getElementById("calculatorFullscreen");
const calculatorClose = document.getElementById("calculatorClose");
const calculatorOverlay = document.querySelector(".calculator-overlay");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");

const brandList = document.getElementById("brandList");
const modelList = document.getElementById("modelList");
const modelListModal = document.getElementById("modelListModal");
const searchBrandInput = document.getElementById("searchBrand");
const modelsSection = document.getElementById("modelsSection");
const selectedClassText = document.getElementById("selectedClass");
const selectedClassTextModal = document.getElementById("selectedClassModal");

const modelModal = document.getElementById("modelModal");
const modelClose = document.getElementById("modelClose");
const modelOverlay = document.querySelector(".model-overlay");
const modelBrandName = document.getElementById("modelBrandName");

const carTypeSelect = document.getElementById("carTypeSelect");
const riskZonesContainer = document.getElementById("riskZones");
const riskZonesSection = document.getElementById("riskZonesSection");
const packageList = document.getElementById("packageList");
const additionalServicesContainer = document.getElementById("additionalServices");
const additionalServicesSection = document.getElementById("additionalServicesSection");

const finalPriceElement = document.getElementById("finalPrice");
const btnBack = document.getElementById("btnBack");
const btnNext = document.getElementById("btnNext");
const btnBook = document.getElementById("btnBook");

const stepsIndicator = document.getElementById("stepsIndicator");

const bookingModal = document.getElementById("bookingModal");
const bookingClose = document.getElementById("bookingClose");
const requestForm = document.getElementById("requestForm");
const summaryData = document.getElementById("summaryData");

const summaryBrand = document.getElementById("summaryBrand");
const summaryModel = document.getElementById("summaryModel");
const summaryClass = document.getElementById("summaryClass");
const summaryPackage = document.getElementById("summaryPackage");
const summaryZones = document.getElementById("summaryZones");
const summaryZonesValue = document.getElementById("summaryZonesValue");
const summaryAdditionalServices = document.getElementById("summaryAdditionalServices");
const summaryAdditionalServicesValue = document.getElementById("summaryAdditionalServicesValue");

/* =============================
   ФУНКЦИЯ RESET CALCULATOR
   ============================= */

function resetCalculator() {
    // Сброс переменных
    currentStep = 1;
    selectedType = null;
    selectedBrand = null;
    selectedModel = null;
    selectedClass = null;
    selectedPackage = null;
    selectedRiskZones = [];
    selectedAdditionalServices = [];
    totalPrice = 0;
    
    // Сброс UI элементов
    if (carTypeSelect) {
        carTypeSelect.querySelectorAll(".chip").forEach(ch => ch.classList.remove("active"));
    }
    
    if (brandList) {
        brandList.innerHTML = "";
    }
    
    if (modelList) {
        modelList.innerHTML = "";
    }
    
    if (modelsSection) {
        modelsSection.style.display = "none";
    }
    
    if (searchBrandInput) {
        searchBrandInput.value = "";
    }
    
    if (selectedClassText) {
        selectedClassText.innerHTML = 'Класс авто: <span>—</span>';
    }
    
    if (packageList) {
        packageList.querySelectorAll(".package-item").forEach(p => p.classList.remove("active"));
    }
    
    if (riskZonesContainer) {
        riskZonesContainer.innerHTML = "";
    }
    
    // Убрать подсветку зон пакета
    removePackageZonesHighlight();
    
    if (riskZonesSection) {
        riskZonesSection.style.display = "none";
    }
    
    if (additionalServicesContainer) {
        additionalServicesContainer.innerHTML = "";
    }
    
    if (additionalServicesSection) {
        additionalServicesSection.style.display = "none";
    }
    
    if (finalPriceElement) {
        finalPriceElement.textContent = "0 ₽";
    }
    
    // Сброс шагов
    goToStep(1);
    
    // Сброс скролла
    const stepsContainer = document.querySelector(".calculator-steps-container");
    if (stepsContainer) {
        stepsContainer.scrollTop = 0;
    }
    
    // Перерисовка брендов
    renderBrands();
}

/* =============================
   НАВИГАЦИЯ ПО ШАГАМ
   ============================= */

function goToStep(step) {
    if (step < 1 || step > totalSteps) return;
    
    const prevStep = currentStep;
    currentStep = step;
    
    // Скрыть все шаги
    [step1, step2, step3, step4].forEach(s => {
        if (s) {
            s.classList.remove("active", "slide-left", "slide-right");
        }
    });
    
    // Показать текущий шаг с анимацией
    const currentStepEl = document.getElementById(`step${step}`);
    if (currentStepEl) {
        currentStepEl.classList.add("active");
        
        if (step > prevStep) {
            currentStepEl.classList.add("slide-left");
        } else if (step < prevStep) {
            currentStepEl.classList.add("slide-right");
        }
        
        // Убрать классы анимации после завершения
        setTimeout(() => {
            currentStepEl.classList.remove("slide-left", "slide-right");
        }, 400);
    }
    
    // Обновить индикатор шагов
    updateStepsIndicator();
    
    // Обновить кнопки навигации
    updateNavigationButtons();
    
    // При переходе на шаг 2 - перерисовать бренды с учетом выбранного типа
    if (step === 2) {
        // Сбросить выбранную марку и модель, если они не соответствуют новому типу
        if (selectedBrand && carDatabase[selectedBrand]) {
            if (carDatabase[selectedBrand].class !== selectedType) {
                selectedBrand = null;
                selectedModel = null;
                selectedClass = null;
                if (modelsSection) {
                    modelsSection.style.display = "none";
                }
                if (modelList) {
                    modelList.innerHTML = "";
                }
                if (selectedClassText) {
                    selectedClassText.innerHTML = 'Класс авто: <span>—</span>';
                }
            }
        }
        renderBrands();
    }
    
    // При возврате на шаг 1 - сбросить выбранную марку и модель
    if (step === 1) {
        selectedBrand = null;
        selectedModel = null;
        selectedClass = null;
        if (modelsSection) {
            modelsSection.style.display = "none";
        }
        if (modelList) {
            modelList.innerHTML = "";
        }
        if (selectedClassText) {
            selectedClassText.innerHTML = 'Класс авто: <span>—</span>';
        }
    }
    
    // Прокрутить вверх
    const stepsContainer = document.querySelector(".calculator-steps-container");
    if (stepsContainer) {
        stepsContainer.scrollTop = 0;
    }
}

function updateStepsIndicator() {
    if (!stepsIndicator) return;
    
    stepsIndicator.querySelectorAll(".step-item").forEach((item, index) => {
        const stepNum = index + 1;
        item.classList.remove("active", "completed");
        
        if (stepNum === currentStep) {
            item.classList.add("active");
        } else if (stepNum < currentStep) {
            item.classList.add("completed");
        }
    });
}

function updateNavigationButtons() {
    // Кнопка "Назад"
    if (btnBack) {
        if (currentStep === 1) {
            btnBack.style.display = "none";
        } else {
            btnBack.style.display = "flex";
        }
    }
    
    // Кнопка "Далее" / "Записаться"
    if (btnNext && btnBook) {
        if (currentStep === totalSteps) {
            btnNext.style.display = "none";
            if (totalPrice > 0) {
                btnBook.style.display = "flex";
            } else {
                btnBook.style.display = "none";
            }
        } else {
            btnNext.style.display = "flex";
            btnBook.style.display = "none";
        }
    }
}

function canProceedToNextStep() {
    switch (currentStep) {
        case 1:
            return selectedType !== null;
        case 2:
            return selectedBrand !== null && selectedModel !== null && selectedClass !== null;
        case 3:
            return selectedPackage !== null || selectedRiskZones.length > 0;
        case 4:
            return true;
        default:
            return false;
    }
}

/* =============================
   ОТКРЫТИЕ/ЗАКРЫТИЕ КАЛЬКУЛЯТОРА
   ============================= */

function openCalculator() {
    resetCalculator();
    
    if (calculatorFullscreen) {
        calculatorFullscreen.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeCalculator() {
    // Закрываем все модальные окна
    if (modelModal) {
        modelModal.classList.remove("active");
    }
    if (bookingModal) {
        bookingModal.classList.remove("active");
    }
    
    // Убираем активный класс с калькулятора
    if (calculatorFullscreen) {
        calculatorFullscreen.classList.remove("active");
    }
    
    // Восстанавливаем overflow для body
    document.body.style.overflow = "";
    document.body.style.overflowX = "";
    document.body.style.overflowY = "";
    
    // Убираем все inline стили, которые могли быть установлены
    document.body.removeAttribute("style");
    
    // Сбрасываем калькулятор
    resetCalculator();
    
    // Возврат на главную страницу при закрытии
    // Проверяем, что мы не на главной странице (если есть referrer или путь указывает на калькулятор)
    if (window.location.pathname.includes('/calculator/') || window.location.pathname.includes('/calculator')) {
        // Небольшая задержка для плавного закрытия, затем возврат
        setTimeout(() => {
            try {
                if (document.referrer && document.referrer.includes(window.location.origin) && !document.referrer.includes('/calculator')) {
                    window.history.back();
                } else {
                    window.location.href = '../';
                }
            } catch (e) {
                // Если history.back() не работает, используем прямой переход
                window.location.href = '../';
            }
        }, 300);
    }
}

// Обработчики закрытия
if (calculatorClose) {
    calculatorClose.addEventListener("click", closeCalculator);
}

if (calculatorOverlay) {
    calculatorOverlay.addEventListener("click", (e) => {
        if (e.target === calculatorOverlay) {
            closeCalculator();
        }
    });
}

// Навигация по шагам
if (btnBack) {
    btnBack.addEventListener("click", () => {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    });
}

if (btnNext) {
    btnNext.addEventListener("click", () => {
        if (canProceedToNextStep() && currentStep < totalSteps) {
            goToStep(currentStep + 1);
        } else {
            alert("Заполните все обязательные поля!");
        }
    });
}

/* =============================
   1) ВЫБОР ТИПА АВТО
   ============================= */

if (carTypeSelect) {
    carTypeSelect.addEventListener("click", (e) => {
        if (!e.target.closest(".chip")) return;
        
        const chip = e.target.closest(".chip");
        const type = chip.dataset.type; // Теперь строка: "sedan", "suv" и т.д.
        
        if (!type) return;
        
        // Сброс предыдущего выбора
        carTypeSelect.querySelectorAll(".chip").forEach(ch => ch.classList.remove("active"));
        chip.classList.add("active");
        
        selectedType = type;
        selectedBrand = null;
        selectedModel = null;
        selectedClass = null;
        
        updatePopularBrands(type);
        
        // Обновляем список брендов с фильтрацией по типу
        renderBrands();
        
        // Автоматический переход на следующий шаг
        setTimeout(() => {
            goToStep(2);
        }, 300);
    });
}

/* =============================
   2) ВЫВОД БРЕНДОВ
   ============================= */

function renderBrands(filterText = "") {
    if (!brandList) return;
    
    brandList.innerHTML = "";
    
    // Если выбран тип, фильтруем бренды по типам из базы данных
    let availableBrands = [];
    
    if (selectedType && typeCategoryMapping[selectedType]) {
        // Получаем все типы для выбранной категории
        const allowedTypes = typeCategoryMapping[selectedType];
        
        // Получаем уникальные бренды из carDatabaseArray, которые имеют модели с нужными типами
        const brandsSet = new Set();
        if (typeof carDatabaseArray !== 'undefined') {
            carDatabaseArray.forEach(car => {
                if (allowedTypes.includes(car.type)) {
                    brandsSet.add(car.brand);
                }
            });
            availableBrands = Array.from(brandsSet).sort();
        } else {
            // Fallback на старый формат
            availableBrands = Object.keys(carDatabase).sort();
        }
    } else {
        // Если тип не выбран, показываем все бренды
        availableBrands = Object.keys(carDatabase).sort();
    }
    
    // Применяем текстовый фильтр
    const filtered = filterText 
        ? availableBrands.filter(brand => brand.toLowerCase().includes(filterText.toLowerCase()))
        : availableBrands;

    filtered.forEach(brand => {
        const div = document.createElement("div");
        div.className = "chip";
        div.innerHTML = `
            <div class="chip-text">
                <strong>${brand}</strong>
            </div>
        `;
        div.onclick = () => selectBrand(brand);
        brandList.appendChild(div);
    });
    
    // Если нет марок для выбранного типа, показать сообщение
    if (filtered.length === 0 && selectedType !== null) {
        brandList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.5);">
                <p>Для выбранного типа авто марки не найдены</p>
            </div>
        `;
    }
}

// Популярные марки (топ-6)
const popularBrands = ["Toyota", "BMW", "Mercedes-Benz", "Audi", "Lexus", "Volkswagen"];

// Популярные марки по типу кузова
const popularBrandsByBodyType = {
    sedan: [
        "Toyota", "Lexus", "BMW",
        "Mercedes-Benz", "Audi", "Kia", "Hyundai"
    ],
    hatchback: [
        "Volkswagen", "Kia", "Hyundai",
        "Ford", "BMW", "Audi", "Opel"
    ],
    suv: [
        "Toyota", "Lexus", "BMW",
        "Mercedes-Benz", "Audi", "Volkswagen", "Mazda"
    ],
    coupe: [
        "BMW", "Mercedes-Benz", "Audi",
        "Lexus", "Porsche", "Ford", "Chevrolet"
    ],
    pickup: [
        "Toyota", "Ford", "Nissan",
        "Mitsubishi", "Chevrolet", "RAM", "GMC"
    ],
    minivan: [
        "Toyota", "Kia", "Hyundai",
        "Mercedes-Benz", "Volkswagen", "Honda", "Nissan"
    ],
    microbus: [
        "Mercedes-Benz", "Ford", "Volkswagen",
        "Fiat", "Peugeot", "Citroën", "Renault"
    ]
};

// Синхронизация популярных марок с общей базой авто
function syncPopularBrandsWithDatabase() {
    if (typeof carDatabaseArray === 'undefined') return;
    
    // Собираем все уникальные марки из popularBrandsByBodyType
    const allPopularBrands = new Set();
    Object.values(popularBrandsByBodyType).forEach(brands => {
        brands.forEach(brand => allPopularBrands.add(brand));
    });
    
    // Получаем все марки, которые уже есть в базе
    const existingBrands = new Set();
    carDatabaseArray.forEach(car => {
        existingBrands.add(car.brand);
    });
    
    // Добавляем недостающие марки в базу (без моделей, как указано в требованиях)
    allPopularBrands.forEach(brand => {
        if (!existingBrands.has(brand)) {
            // Определяем тип по первому вхождению марки в popularBrandsByBodyType
            let defaultBodyType = "sedan";
            let defaultType = "sedan-small";
            
            for (const [bodyType, brands] of Object.entries(popularBrandsByBodyType)) {
                if (brands.includes(brand)) {
                    defaultBodyType = bodyType;
                    // Определяем тип по маппингу
                    const typeMapping = typeCategoryMapping[bodyType];
                    if (typeMapping && typeMapping.length > 0) {
                        defaultType = typeMapping[0];
                    }
                    break;
                }
            }
            
            // Добавляем марку в carDatabaseArray с минимальной структурой (без моделей)
            // Это позволит марке появиться в списке марок, но при выборе будет показано "модели не найдены"
            carDatabaseArray.push({
                brand: brand,
                model: "", // Пустая модель, как указано в требованиях
                body: defaultBodyType,
                type: defaultType
            });
        }
    });
}

// Рендер популярных марок
function renderPopularBrands() {
    const popularBrandsList = document.getElementById("popularBrandsList");
    if (!popularBrandsList) return;
    
    popularBrandsList.innerHTML = "";
    
    popularBrands.forEach(brand => {
        const chip = document.createElement("div");
        chip.className = "popular-chip";
        chip.textContent = brand;
        chip.onclick = () => {
            if (searchBrandInput) {
                searchBrandInput.value = brand;
                renderBrands(brand);
            }
            selectBrand(brand);
        };
        popularBrandsList.appendChild(chip);
    });
}

// Обновление популярных марок по типу кузова
function updatePopularBrands(bodyType) {
    const container = document.querySelector(".popular-brands");
    if (!container) return;

    const popularBrandsList = document.getElementById("popularBrandsList");
    if (!popularBrandsList) return;

    popularBrandsList.innerHTML = "";

    const brands = popularBrandsByBodyType[bodyType] || [];

    brands.forEach(brand => {
        const item = document.createElement("div");
        item.classList.add("popular-brand-chip");
        item.innerText = brand;
        // Добавляем обработчик клика для выбора марки
        item.addEventListener("click", () => {
            if (searchBrandInput) {
                searchBrandInput.value = brand;
                renderBrands(brand);
            }
            selectBrand(brand);
        });
        popularBrandsList.appendChild(item);
    });
}

// Обработчик поиска брендов
if (searchBrandInput) {
    searchBrandInput.addEventListener("input", (e) => {
        const value = e.target.value;
        renderBrands(value);
        
        // Показать/скрыть кнопку очистки
        const searchClear = document.getElementById("searchClear");
        if (searchClear) {
            searchClear.style.display = value ? "flex" : "none";
        }
        
        // Показать/скрыть популярные марки
        const popularBrandsEl = document.getElementById("popularBrands");
        if (popularBrandsEl) {
            popularBrandsEl.style.display = value ? "none" : "flex";
        }
    });
    
    // Очистка поиска
    const searchClear = document.getElementById("searchClear");
    if (searchClear) {
        searchClear.addEventListener("click", () => {
            if (searchBrandInput) {
                searchBrandInput.value = "";
                renderBrands("");
            }
            searchClear.style.display = "none";
            const popularBrandsEl = document.getElementById("popularBrands");
            if (popularBrandsEl) {
                popularBrandsEl.style.display = "flex";
            }
            if (searchBrandInput) {
                searchBrandInput.focus();
            }
        });
    }
}

/* =============================
   3) ВЫБОР БРЕНДА → ВЫВОД МОДЕЛЕЙ
   ============================= */

function selectBrand(brand) {
    selectedBrand = brand;
    selectedModel = null;

    if (brandList) {
        brandList.querySelectorAll(".chip").forEach(ch => ch.classList.remove("active"));
        [...brandList.children]
            .find(ch => ch.textContent.includes(brand))
            ?.classList.add("active");
    }

    // Открываем модальное окно для выбора модели
    openModelModal(brand);
}

function openModelModal(brand) {
    if (!modelModal || !modelBrandName) return;
    
    // Проверяем, что тип выбран
    if (!selectedType) {
        alert("Пожалуйста, сначала выберите тип автомобиля");
        return;
    }
    
    // Сначала открываем модальное окно для мгновенного отображения
    modelModal.classList.add("active");
    document.body.style.overflow = "hidden";
    
    // Устанавливаем название марки в заголовок
    modelBrandName.textContent = brand;
    
    // Рендерим модели в модальное окно (после открытия для лучшей производительности)
    // Используем requestAnimationFrame для плавности
    requestAnimationFrame(() => {
        renderModelsModal(brand);
    });
}

function closeModelModal() {
    if (!modelModal) return;
    modelModal.classList.remove("active");
    document.body.style.overflow = "";
}

function renderModels(brand) {
    // Старая функция для обратной совместимости
    renderModelsModal(brand);
}

function renderModelsModal(brand) {
    const targetList = modelListModal || modelList;
    if (!targetList) return;
    
    targetList.innerHTML = "";

    // КРИТИЧЕСКАЯ ПРОВЕРКА: selectedType должен быть установлен
    if (!selectedType) {
        targetList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.5);">
                <p>Ошибка: тип автомобиля не выбран</p>
                <p style="font-size: 12px; margin-top: 10px; opacity: 0.7;">Пожалуйста, вернитесь к выбору типа</p>
            </div>
        `;
        return;
    }

    // Получаем модели из базы данных - ФИЛЬТРУЕМ строго по выбранному типу
    let availableModels = [];
    
    // Получаем разрешенные типы для выбранной категории
    let allowedTypes = [];
    if (selectedType && typeCategoryMapping[selectedType]) {
        allowedTypes = typeCategoryMapping[selectedType];
    } else {
        targetList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.5);">
                <p>Ошибка: неизвестный тип автомобиля "${selectedType}"</p>
            </div>
        `;
        return;
    }
    
    // Используем новый формат базы данных, если доступен
    if (typeof carDatabaseArray !== 'undefined') {
        // СТРОГАЯ фильтрация: только модели, которые соответствуют выбранному типу
        const modelsMap = new Map();
        
        if (allowedTypes.length === 0) {
            targetList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.5);">
                    <p>Ошибка: тип автомобиля не выбран</p>
                </div>
            `;
            return;
        }
        
        // СТРОГАЯ фильтрация: проходим по всем автомобилям и фильтруем только те, что соответствуют типу
        carDatabaseArray.forEach(car => {
            // Проверяем марку
            if (car.brand !== brand) return;
            
            // СТРОГАЯ проверка: тип модели ДОЛЖЕН быть в списке разрешенных типов
            if (!allowedTypes.includes(car.type)) {
                // Пропускаем эту модель - она не соответствует выбранному типу
                return;
            }
            
            // Модель соответствует типу - добавляем в Map
            // Если модель уже есть, приоритет отдаем той, которая лучше соответствует типу
            if (!modelsMap.has(car.model)) {
                // Модель еще не добавлена - добавляем
                modelsMap.set(car.model, car);
            } else {
                // Если модель уже есть, проверяем, какая лучше соответствует типу
                const existing = modelsMap.get(car.model);
                
                // КРИТИЧЕСКАЯ ПРОВЕРКА: если существующая модель НЕ соответствует типу, заменяем её
                if (!allowedTypes.includes(existing.type)) {
                    modelsMap.set(car.model, car);
                }
            }
        });
        
        // ФИНАЛЬНАЯ ПРОВЕРКА: убеждаемся, что все модели в результате соответствуют типу
        availableModels = Array.from(modelsMap.values())
            .filter(car => {
                // Дополнительная проверка - на всякий случай
                if (!allowedTypes.includes(car.type)) {
                    return false;
                }
                // Дополнительная проверка: убеждаемся, что тип модели действительно соответствует выбранному типу
                if (car.type && !typeCategoryMapping[selectedType]?.includes(car.type)) {
                    return false;
                }
                return true;
            })
            .map(car => ({
                model: car.model,
                type: car.type,
                body: car.body
            }));
        
        // Если моделей очень мало (меньше 2), проверяем, может быть есть модели в смежных категориях
        // Но все равно показываем только те, что соответствуют выбранному типу
    } else if (carDatabase[brand]) {
        // Fallback на старый формат
        availableModels = carDatabase[brand].models.map(model => ({
            model: model,
            type: null,
            body: null
        }));
    } else {
        return; // Марка не найдена
    }

    // Если моделей не найдено, показываем сообщение
    if (availableModels.length === 0) {
        targetList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.5);">
                <p>Для выбранного типа "${selectedType}" и марки "${brand}" модели не найдены</p>
                <p style="font-size: 12px; margin-top: 10px; opacity: 0.7;">Попробуйте выбрать другую марку или тип автомобиля</p>
            </div>
        `;
        return;
    }

    // Сортируем модели
    availableModels.sort((a, b) => a.model.localeCompare(b.model));

    availableModels.forEach(carData => {
        const div = document.createElement("div");
        div.className = "chip";
        div.innerHTML = `
            <div class="chip-text">
                <strong>${carData.model}</strong>
            </div>
        `;
        
        // Сохраняем данные автомобиля в dataset
        div.dataset.model = carData.model;
        div.dataset.type = carData.type || "";
        div.dataset.body = carData.body || "";
        div.dataset.brand = brand; // Сохраняем марку для проверки

        div.onclick = () => {
            // Убеждаемся, что марка совпадает
            if (selectedBrand !== brand) {
                selectedBrand = brand;
            }
            
            selectedModel = carData.model;
            selectModelUI(div);
            // Закрываем модальное окно после выбора модели
            closeModelModal();
        };

        targetList.appendChild(div);
    });
}

function selectModelUI(div) {
    // КРИТИЧЕСКАЯ ПРОВЕРКА: selectedType должен быть установлен
    if (!selectedType) {
        alert("Ошибка: тип автомобиля не выбран. Пожалуйста, вернитесь к выбору типа.");
        return;
    }
    
    // КРИТИЧЕСКАЯ ПРОВЕРКА: проверяем, что выбранная модель соответствует типу
    const modelType = div.dataset.type || null;
    const allowedTypes = typeCategoryMapping[selectedType] || [];
    
    if (modelType && !allowedTypes.includes(modelType)) {
        alert(`Ошибка: модель "${div.dataset.model}" не соответствует выбранному типу "${selectedType}". Пожалуйста, выберите другую модель.`);
        return;
    }
    
    // Обновляем активное состояние в модальном окне
    if (modelListModal) {
        modelListModal.querySelectorAll(".chip").forEach(m => m.classList.remove("active"));
        const modalChip = modelListModal.querySelector(`[data-model="${div.dataset.model}"]`);
        if (modalChip) {
            modalChip.classList.add("active");
        }
    }
    
    // Обновляем активное состояние в основном списке (если используется)
    if (modelList) {
        modelList.querySelectorAll(".chip").forEach(m => m.classList.remove("active"));
        const mainChip = modelList.querySelector(`[data-model="${div.dataset.model}"]`);
        if (mainChip) {
            mainChip.classList.add("active");
        }
    }
    
    div.classList.add("active");

    // Определяем класс автомобиля из базы данных
    // Приоритет: ищем точное совпадение марка + модель + (если возможно) тип
    let car = null;
    let carType = div.dataset.type || null;
    const chipBrand = div.dataset.brand || selectedBrand;
    
    // Убеждаемся, что марка совпадает
    if (chipBrand && chipBrand !== selectedBrand) {
        selectedBrand = chipBrand;
    }
    
    if (typeof carDatabaseArray !== 'undefined') {
        // Если есть тип из dataset и выбран тип авто, ищем с учетом типа
        if (carType && selectedType && typeCategoryMapping[selectedType]) {
            const allowedTypes = typeCategoryMapping[selectedType];
            // Ищем модель, которая соответствует и марке, и модели, и типу
            car = carDatabaseArray.find(c => 
                c.brand === selectedBrand && 
                c.model === selectedModel &&
                allowedTypes.includes(c.type)
            );
        }
        
        // Если не нашли с учетом типа, ищем любую запись с маркой и моделью
        if (!car) {
            const allMatches = carDatabaseArray.filter(c => 
                c.brand === selectedBrand && 
                c.model === selectedModel
            );
            
            // Если найдено несколько записей, выбираем ту, которая соответствует выбранному типу
            if (allMatches.length > 1 && selectedType && typeCategoryMapping[selectedType]) {
                const allowedTypes = typeCategoryMapping[selectedType];
                car = allMatches.find(c => allowedTypes.includes(c.type)) || allMatches[0];
            } else if (allMatches.length > 0) {
                car = allMatches[0];
            }
        }
        
        // Если нашли запись, используем её тип для определения класса
        if (car && car.type && typeof classMapping !== 'undefined' && classMapping[car.type]) {
            carType = car.type;
            selectedClass = classMapping[car.type];
            
            // Дополнительная проверка: убеждаемся, что тип модели соответствует выбранному типу авто
            if (selectedType && typeCategoryMapping[selectedType]) {
                const allowedTypes = typeCategoryMapping[selectedType];
                if (!allowedTypes.includes(car.type)) {
                    // Ищем правильную запись с учетом типа
                    const correctCar = carDatabaseArray.find(c => 
                        c.brand === selectedBrand && 
                        c.model === selectedModel &&
                        allowedTypes.includes(c.type)
                    );
                    if (correctCar) {
                        car = correctCar;
                        carType = correctCar.type;
                        selectedClass = classMapping[correctCar.type];
                    }
                }
            }
        }
    }
    
    // Если не удалось определить через новую базу, пробуем старый формат
    if (!selectedClass && carDatabase[selectedBrand]) {
        selectedClass = carDatabase[selectedBrand].class;
    }
    
    // Если всё ещё не определили класс, используем тип из dataset
    if (!selectedClass && carType && typeof classMapping !== 'undefined' && classMapping[carType]) {
        selectedClass = classMapping[carType];
    }
    
    // Проверяем, что все данные совпадают

    if (selectedClassText) {
        selectedClassText.innerHTML = `Класс авто: <span>${selectedClass || "—"}</span>`;
    }
    
    if (selectedClassTextModal) {
        selectedClassTextModal.innerHTML = `Класс авто: <span>${selectedClass || "—"}</span>`;
    }

    // Обновляем цены только если класс определен
    if (selectedClass) {
        updatePriceBlocks();
        calculateTotal();
        
        // Автоматический переход на следующий шаг
        setTimeout(() => {
            goToStep(3);
        }, 300);
    }
}

/* =============================
   4) ПАКЕТЫ УСЛУГ
   ============================= */

function renderPackages() {
    if (!packageList) return;

    packages.forEach(pkg => {
        const div = document.createElement("div");
        div.className = "package-item";
        div.dataset.id = pkg.id;

        // Получаем минимальную и максимальную цену
        const prices = Object.values(pkg.base);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        
        // Формируем список зон для отображения
        let zonesList = '';
        if (pkg.zones && pkg.zones.length > 0) {
            zonesList = '<ul>';
            pkg.zones.forEach(zone => {
                zonesList += `<li>${zone}</li>`;
            });
            zonesList += '</ul>';
        } else {
            // Если зон нет, показываем общую информацию
            zonesList = '<ul><li>Все зоны кузова</li></ul>';
        }

        div.innerHTML = `
            <header class="package-header">
                <h3 class="package-name">${pkg.name}</h3>
                <p class="package-desc">${pkg.id === 'risk' ? 'Защита основных зон' : pkg.id.includes('full') ? 'Полная защита кузова' : 'Комплексная защита'}</p>
                <div class="package-cost">${minPrice === maxPrice ? minPrice : `${minPrice} — ${maxPrice}`}</div>
            </header>
            <section class="package-features">
                ${zonesList}
            </section>
            <footer class="package-footer">
                <button class="package-button">
                    <div class="button-outer">
                        <div class="button-inner">
                            <span>Выбрать пакет</span>
                        </div>
                    </div>
                </button>
            </footer>
        `;

        div.onclick = () => {
            // Сброс зон риска при выборе пакета
            selectedRiskZones = [];
            if (riskZonesContainer) {
                riskZonesContainer.querySelectorAll("input[type='checkbox']").forEach(cb => {
                    cb.checked = false;
                });
            }
            
            // Сброс дополнительных услуг при выборе пакета
            selectedAdditionalServices = [];
            if (additionalServicesContainer) {
                additionalServicesContainer.querySelectorAll("input[type='checkbox']").forEach(cb => {
                    cb.checked = false;
                });
            }
            
            selectedPackage = pkg;

            packageList.querySelectorAll(".package-item").forEach(p => p.classList.remove("active"));
            div.classList.add("active");

            // Подсветка зон риска для всех пакетов, у которых есть zones
            if (pkg.zones && pkg.zones.length > 0 && riskZonesContainer) {
                highlightPackageZones();
            } else {
                removePackageZonesHighlight();
            }

            calculateTotal();
        };

        packageList.appendChild(div);
    });
}

renderPackages();

/* =============================
   5) ОБНОВЛЕНИЕ ЦЕН
   ============================= */

function updatePriceBlocks() {
    if (!selectedClass) return;

    renderRiskZones();
    renderAdditionalServices();
    
    // Показать секции
    if (riskZonesSection) {
        riskZonesSection.style.display = "block";
    }
    
    if (additionalServicesSection) {
        additionalServicesSection.style.display = "block";
    }
    
    // Если выбран пакет с зонами, подсветить зоны
    if (selectedPackage && selectedPackage.zones && selectedPackage.zones.length > 0) {
        setTimeout(() => {
            highlightPackageZones();
        }, 100);
    }
}

/* =============================
   5.5) ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
   ============================= */

function renderAdditionalServices() {
    if (!additionalServicesContainer || !selectedClass) return;

    additionalServicesContainer.innerHTML = "";
    
    // Дополнительные услуги
    const additionalServicesList = [
        {
            id: "fullVinyl",
            name: "Полная оклейка виниловой пленкой",
            price: fullWrapVinyl
        },
        {
            id: "displayWrap",
            name: "Оклейка дисплеев автомобиля",
            price: displayWrap
        },
        {
            id: "interiorGloss",
            name: "Оклейка глянцевых элементов салона",
            price: interiorGlossWrap
        },
        {
            id: "elementByElement",
            name: "Поэлементная оклейка защитной пленкой",
            price: elementByElementWrap
        },
        {
            id: "filmRemoval",
            name: "Снятие пленки с одного элемента",
            price: filmRemoval
        }
    ];

    additionalServicesList.forEach(service => {
        const label = document.createElement("label");
        label.className = "check";

        const id = "service_" + service.id;

        label.innerHTML = `
            <input type="checkbox" id="${id}">
            <span>${service.name}</span>
            <span class="price">${service.price[selectedClass]} ₽</span>
        `;

        const checkbox = label.querySelector("input");
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                selectedAdditionalServices.push(service.id);
                // Сброс пакета при выборе дополнительных услуг
                selectedPackage = null;
                if (packageList) {
                    packageList.querySelectorAll(".package-item").forEach(p => p.classList.remove("active"));
                }
                removePackageZonesHighlight();
            } else {
                selectedAdditionalServices = selectedAdditionalServices.filter(s => s !== service.id);
            }

            calculateTotal();
        });

        additionalServicesContainer.appendChild(label);
    });
}

/* =============================
   6) ЗОНЫ РИСКА
   ============================= */

// Функция подсветки зон риска пакета
function highlightPackageZones() {
    if (!riskZonesContainer || !selectedPackage) return;
    
    // Только зоны, входящие в пакет
    const packageZones = selectedPackage.zones || [];
    
    if (packageZones.length === 0) {
        // Если нет массива zones, убрать все подсветки
        removePackageZonesHighlight();
        return;
    }
    
    riskZonesContainer.querySelectorAll("label").forEach(label => {
        const zone = label.dataset.zone;
        if (zone && packageZones.includes(zone)) {
            label.classList.add("package-zone-highlight");
        } else {
            // Убрать подсветку с зон, не входящих в пакет
            label.classList.remove("package-zone-highlight");
        }
    });
}

// Функция удаления подсветки зон риска пакета
function removePackageZonesHighlight() {
    if (!riskZonesContainer) return;
    
    riskZonesContainer.querySelectorAll("label").forEach(label => {
        label.classList.remove("package-zone-highlight");
    });
}

function renderRiskZones() {
    if (!riskZonesContainer || !selectedClass) return;

    riskZonesContainer.innerHTML = "";
    selectedRiskZones = [];

    Object.keys(riskZonePrices).forEach(zone => {
        const label = document.createElement("label");
        label.className = "check";

        const id = "zone_" + zone.replace(/\s+/g, "_");

        label.innerHTML = `
            <input type="checkbox" id="${id}">
            <span>${zone}</span>
            <span class="price">${riskZonePrices[zone][selectedClass]} ₽</span>
        `;

        const checkbox = label.querySelector("input");
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                selectedRiskZones.push(zone);
                // Сброс пакетов
                selectedPackage = null;
                if (packageList) {
                    packageList.querySelectorAll(".package-item").forEach(p => p.classList.remove("active"));
                }
                // Убрать подсветку зон пакета
                removePackageZonesHighlight();
            } else {
                selectedRiskZones = selectedRiskZones.filter(z => z !== zone);
            }

            calculateTotal();
        });
        
        // Сохранить ссылку на label для подсветки
        label.dataset.zone = zone;

        riskZonesContainer.appendChild(label);
    });
}

/* =============================
   7) РАСЧЁТ ИТОГОВОЙ ЦЕНЫ
   ============================= */

function calculateTotal() {
    if (!selectedClass || !finalPriceElement) {
        if (finalPriceElement) {
            finalPriceElement.textContent = "0 ₽";
        }
        updateNavigationButtons();
        return;
    }

    let total = 0;

    if (selectedPackage && selectedPackage.base[selectedClass]) {
        total += selectedPackage.base[selectedClass];
    }

    selectedRiskZones.forEach(zone => {
        if (riskZonePrices[zone] && riskZonePrices[zone][selectedClass]) {
            total += riskZonePrices[zone][selectedClass];
        }
    });

    // Дополнительные услуги
    selectedAdditionalServices.forEach(serviceId => {
        let servicePrice = 0;
        
        switch(serviceId) {
            case "fullVinyl":
                servicePrice = fullWrapVinyl[selectedClass] || 0;
                break;
            case "displayWrap":
                servicePrice = displayWrap[selectedClass] || 0;
                break;
            case "interiorGloss":
                servicePrice = interiorGlossWrap[selectedClass] || 0;
                break;
            case "elementByElement":
                servicePrice = elementByElementWrap[selectedClass] || 0;
                break;
            case "filmRemoval":
                servicePrice = filmRemoval[selectedClass] || 0;
                break;
        }
        
        total += servicePrice;
    });

    totalPrice = total;
    finalPriceElement.textContent = total.toLocaleString("ru-RU") + " ₽";
    
    // Обновить итоговый шаг
    updateSummaryStep();
    
    // Обновить кнопки навигации
    updateNavigationButtons();
}

function updateSummaryStep() {
    if (summaryBrand) {
        summaryBrand.textContent = selectedBrand || "—";
    }
    if (summaryModel) {
        summaryModel.textContent = selectedModel || "—";
    }
    if (summaryClass) {
        summaryClass.textContent = selectedClass || "—";
    }
    if (summaryPackage) {
        summaryPackage.textContent = selectedPackage ? selectedPackage.name : "—";
    }
    
    // Зоны риска
    if (summaryZones) {
        summaryZones.style.display = selectedRiskZones.length > 0 ? "flex" : "none";
    }
    if (summaryZonesValue) {
        summaryZonesValue.textContent = selectedRiskZones.length > 0 
            ? selectedRiskZones.join(", ") 
            : "—";
    }
    
    // Дополнительные услуги
    if (summaryAdditionalServices) {
        summaryAdditionalServices.style.display = selectedAdditionalServices.length > 0 ? "flex" : "none";
    }
    if (summaryAdditionalServicesValue) {
        const serviceNamesMap = {
            "fullVinyl": "Полная оклейка виниловой пленкой",
            "displayWrap": "Оклейка дисплеев автомобиля",
            "interiorGloss": "Оклейка глянцевых элементов салона",
            "elementByElement": "Поэлементная оклейка защитной пленкой",
            "filmRemoval": "Снятие пленки с одного элемента"
        };
        const serviceNames = selectedAdditionalServices.map(id => serviceNamesMap[id] || id);
        summaryAdditionalServicesValue.textContent = selectedAdditionalServices.length > 0 
            ? serviceNames.join(", ") 
            : "—";
    }
}

/* =============================
   8) ФОРМА ЗАПИСИ
   ============================= */

if (btnBook) {
    btnBook.addEventListener("click", () => {
        if (totalPrice <= 0) {
            alert("Сначала выберите автомобиль и услуги!");
            return;
        }

        // Обновить данные в форме
        if (summaryData) {
            const serviceNamesMap = {
                "fullVinyl": "Полная оклейка виниловой пленкой",
                "displayWrap": "Оклейка дисплеев автомобиля",
                "interiorGloss": "Оклейка глянцевых элементов салона",
                "elementByElement": "Поэлементная оклейка защитной пленкой",
                "filmRemoval": "Снятие пленки с одного элемента"
            };
            const additionalServicesNames = selectedAdditionalServices.map(id => serviceNamesMap[id] || id);
            
            summaryData.textContent = `
Марка: ${selectedBrand || "—"}
Модель: ${selectedModel || "—"}
Класс: ${selectedClass || "—"}

Пакет: ${selectedPackage ? selectedPackage.name : "—"}

Зоны риска:
${selectedRiskZones.length > 0 ? selectedRiskZones.join(", ") : "—"}

Дополнительные услуги:
${selectedAdditionalServices.length > 0 ? additionalServicesNames.join(", ") : "—"}

ИТОГО: ${totalPrice.toLocaleString("ru-RU")} ₽
            `;
        }

        // НЕ скрываем калькулятор - форма должна быть видна внутри него
        // Убеждаемся, что calculator-fullscreen активен
        if (calculatorFullscreen) {
            calculatorFullscreen.classList.add("active");
            // Скрываем только калькуляторный контент, но оставляем overlay для формы
            const calculatorModal = calculatorFullscreen.querySelector(".calculator-modal");
            if (calculatorModal) {
                calculatorModal.style.display = "none";
            }
        }
        
        // Открыть модальное окно формы с небольшой задержкой для плавности
        setTimeout(() => {
            // Перепроверяем наличие модального окна
            const modal = document.getElementById("bookingModal");
            const summaryDataEl = document.getElementById("summaryData");
            
            // Отладка
            if (!modal) {
                alert("Ошибка: модальное окно формы не найдено!");
                return;
            }
            
            if (modal) {
                // Показываем калькуляторный overlay для формы
                if (calculatorOverlay) {
                    calculatorOverlay.style.display = "block";
                    calculatorOverlay.style.opacity = "1";
                    calculatorOverlay.style.visibility = "visible";
                    calculatorOverlay.style.pointerEvents = "auto";
                    calculatorOverlay.style.zIndex = "10000";
                }
                
                // Убеждаемся, что данные обновлены
                if (summaryDataEl && !summaryDataEl.textContent.trim()) {
                    // Если данные не были обновлены, обновляем их сейчас
                    const serviceNamesMap = {
                        "fullVinyl": "Полная оклейка виниловой пленкой",
                        "displayWrap": "Оклейка дисплеев автомобиля",
                        "interiorGloss": "Оклейка глянцевых элементов салона",
                        "elementByElement": "Поэлементная оклейка защитной пленкой",
                        "filmRemoval": "Снятие пленки с одного элемента"
                    };
                    const additionalServicesNames = selectedAdditionalServices.map(id => serviceNamesMap[id] || id);
                    
                    summaryDataEl.textContent = `
Марка: ${selectedBrand || "—"}
Модель: ${selectedModel || "—"}
Класс: ${selectedClass || "—"}

Пакет: ${selectedPackage ? selectedPackage.name : "—"}

Зоны риска:
${selectedRiskZones.length > 0 ? selectedRiskZones.join(", ") : "—"}

Дополнительные услуги:
${selectedAdditionalServices.length > 0 ? additionalServicesNames.join(", ") : "—"}

ИТОГО: ${totalPrice.toLocaleString("ru-RU")} ₽
                    `;
                }
                
                // Принудительно показываем форму
                modal.classList.add("active");
                modal.style.display = "block !important";
                modal.style.opacity = "1 !important";
                modal.style.visibility = "visible !important";
                modal.style.pointerEvents = "auto !important";
                modal.style.zIndex = "10001 !important";
                modal.style.position = "fixed !important";
                modal.style.top = "0 !important";
                modal.style.left = "0 !important";
                modal.style.width = "100% !important";
                modal.style.height = "100% !important";
                
                // Убеждаемся, что booking-content тоже виден
                const bookingContent = modal.querySelector(".booking-content");
                if (bookingContent) {
                    bookingContent.style.display = "block !important";
                    bookingContent.style.opacity = "1 !important";
                    bookingContent.style.visibility = "visible !important";
                    bookingContent.style.pointerEvents = "auto !important";
                }
                
                document.body.style.overflow = "hidden";
                
                // Убеждаемся, что поля формы доступны для ввода
                const userNameInput = document.getElementById("userName");
                const userPhoneInput = document.getElementById("userPhone");
                const userEmailInput = document.getElementById("userEmail");
                const userCommentInput = document.getElementById("userComment");
                
                // Убираем блокировки с полей
                if (userNameInput) {
                    userNameInput.disabled = false;
                    userNameInput.readOnly = false;
                    userNameInput.style.pointerEvents = "auto";
                }
                if (userPhoneInput) {
                    userPhoneInput.disabled = false;
                    userPhoneInput.readOnly = false;
                    userPhoneInput.style.pointerEvents = "auto";
                }
                if (userEmailInput) {
                    userEmailInput.disabled = false;
                    userEmailInput.readOnly = false;
                    userEmailInput.style.pointerEvents = "auto";
                }
                if (userCommentInput) {
                    userCommentInput.disabled = false;
                    userCommentInput.readOnly = false;
                    userCommentInput.style.pointerEvents = "auto";
                }
                
                // Фокус на первое поле после небольшой задержки
                setTimeout(() => {
                    if (userNameInput) {
                        userNameInput.focus();
                    }
                }, 200);
            } else {
                // Если модальное окно не найдено, показываем alert
                alert("Ошибка: модальное окно не найдено. Пожалуйста, обновите страницу.");
            }
        }, 150);
    });
}

// Обработчики закрытия модального окна выбора модели
if (modelClose) {
    modelClose.addEventListener("click", closeModelModal);
}

if (modelOverlay) {
    modelOverlay.addEventListener("click", (e) => {
        if (e.target === modelOverlay) {
            closeModelModal();
        }
    });
}

// Функция закрытия модального окна формы заявки
function closeBookingModal() {
    if (!bookingModal) return;
    
    // 1. Принудительно скрываем модальное окно формы
    bookingModal.classList.remove("active");
    bookingModal.style.display = "none";
    bookingModal.style.opacity = "0";
    bookingModal.style.visibility = "hidden";
    bookingModal.style.pointerEvents = "none";
    bookingModal.style.zIndex = "-1";
    
    // 2. Скрываем калькуляторный overlay
    if (calculatorOverlay) {
        calculatorOverlay.style.display = "none";
        calculatorOverlay.style.opacity = "0";
        calculatorOverlay.style.visibility = "hidden";
        calculatorOverlay.style.pointerEvents = "none";
        calculatorOverlay.style.zIndex = "-1";
        calculatorOverlay.style.filter = "none";
        calculatorOverlay.style.backdropFilter = "none";
        calculatorOverlay.style.webkitBackdropFilter = "none";
    }
    
    // 3. Ищем и скрываем глобальный overlay из index.html (если есть)
    const globalOverlay = document.querySelector(".modal-overlay");
    if (globalOverlay) {
        globalOverlay.style.display = "none";
        globalOverlay.style.opacity = "0";
        globalOverlay.style.visibility = "hidden";
        globalOverlay.style.pointerEvents = "none";
        globalOverlay.style.zIndex = "-1";
        globalOverlay.style.filter = "none";
        globalOverlay.style.backdropFilter = "none";
        globalOverlay.style.webkitBackdropFilter = "none";
        globalOverlay.classList.remove("active");
    }
    
    // 4. Отключаем все системные backdrop псевдоэлементы
    // Ищем все dialog элементы и закрываем их
    const dialogs = document.querySelectorAll("dialog");
    dialogs.forEach(dialog => {
        if (dialog.open) {
            dialog.close();
        }
        dialog.style.display = "none";
        dialog.style.backdropFilter = "none";
        dialog.style.webkitBackdropFilter = "none";
    });
    
    // Ищем все элементы с role="dialog"
    const dialogElements = document.querySelectorAll('[role="dialog"], [role="alertdialog"], [role="alert"]');
    dialogElements.forEach(element => {
        element.style.display = "none";
        element.style.backdropFilter = "none";
        element.style.webkitBackdropFilter = "none";
        element.removeAttribute("open");
    });
    
    // 5. Убираем blur/filter с body и калькулятора
    document.body.style.filter = "none";
    document.body.style.backdropFilter = "none";
    document.body.style.webkitBackdropFilter = "none";
    if (calculatorFullscreen) {
        calculatorFullscreen.style.filter = "none";
        calculatorFullscreen.style.backdropFilter = "none";
        calculatorFullscreen.style.webkitBackdropFilter = "none";
    }
    
    // 6. Принудительно отключаем backdrop-filter для всех элементов
    const allElements = document.querySelectorAll("*");
    allElements.forEach(element => {
        if (element.style.backdropFilter || element.style.webkitBackdropFilter) {
            element.style.backdropFilter = "none";
            element.style.webkitBackdropFilter = "none";
        }
    });
    
    // 7. Полностью восстанавливаем body
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "auto";
    document.body.style.overflowY = "auto";
    document.body.style.height = "auto";
    document.body.style.position = "static";
    
    // 8. Полностью очищаем все inline стили с body
    document.body.removeAttribute("style");
    
    // 9. Всегда возвращаемся на главную страницу после закрытия формы
    // (так как калькулятор был скрыт при открытии формы)
    if (window.location.pathname.includes('/calculator/') || window.location.pathname.includes('/calculator')) {
        // Небольшая задержка для полного сброса overlay, затем возврат
        setTimeout(() => {
            try {
                window.location.href = '/';
            } catch (e) {
                window.location.href = '/';
            }
        }, 50);
    }
}

if (bookingModal) {
    const bookingContent = bookingModal.querySelector(".booking-content");
    
    // Клик по калькуляторному overlay закрывает форму
    if (calculatorOverlay) {
        calculatorOverlay.addEventListener("click", (e) => {
            if (bookingModal && bookingModal.classList.contains("active")) {
                if (e.target === calculatorOverlay) {
                    closeBookingModal();
                }
            }
        });
    }
    
    // Предотвращаем перетаскивание формы на мобильных
    if (bookingContent) {
        let isDragging = false;
        let startY = 0;
        let startX = 0;
        
        bookingContent.addEventListener("touchstart", (e) => {
            // Разрешаем перетаскивание только для скролла
            if (e.target.closest('.booking-content') && bookingContent.scrollTop === 0) {
                // Если в начале скролла, разрешаем только вертикальный скролл
                return;
            }
        }, { passive: true });
        
        bookingContent.addEventListener("touchmove", (e) => {
            // Предотвращаем горизонтальное перетаскивание
            if (Math.abs(e.touches[0].clientX - startX) > Math.abs(e.touches[0].clientY - startY)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Предотвращаем перетаскивание всей формы
        bookingContent.addEventListener("mousedown", (e) => {
            if (e.target === bookingContent || e.target.closest('.booking-content') === bookingContent) {
                e.preventDefault();
            }
        });
    }
}

// Обработчик отправки формы
if (requestForm) {
    requestForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const userNameInput = document.getElementById("userName");
        const userPhoneInput = document.getElementById("userPhone");
        const userEmailInput = document.getElementById("userEmail");
        const userCommentInput = document.getElementById("userComment");
        
        const userName = userNameInput?.value?.trim() || "";
        const userPhone = userPhoneInput?.value?.trim() || "";
        const userEmail = userEmailInput?.value?.trim() || "";
        const userComment = userCommentInput?.value?.trim() || "";

        // Улучшенная валидация
        let errorMessage = "";
        if (!userName) {
            errorMessage = "Пожалуйста, заполните поле 'Ваше имя'";
            if (userNameInput) {
                userNameInput.focus();
                userNameInput.style.borderColor = "#e74c3c";
                setTimeout(() => {
                    if (userNameInput) userNameInput.style.borderColor = "";
                }, 3000);
            }
        } else if (!userPhone) {
            errorMessage = "Пожалуйста, заполните поле 'Телефон'";
            if (userPhoneInput) {
                userPhoneInput.focus();
                userPhoneInput.style.borderColor = "#e74c3c";
                setTimeout(() => {
                    if (userPhoneInput) userPhoneInput.style.borderColor = "";
                }, 3000);
            }
        } else if (userPhone && userPhone.replace(/\D/g, '').length < 10) {
            errorMessage = "Пожалуйста, введите корректный номер телефона (минимум 10 цифр)";
            if (userPhoneInput) {
                userPhoneInput.focus();
                userPhoneInput.style.borderColor = "#e74c3c";
                setTimeout(() => {
                    if (userPhoneInput) userPhoneInput.style.borderColor = "";
                }, 3000);
            }
        }
        
        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        // Здесь можно добавить отправку данных на сервер
        alert("Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.");
        
        // Закрыть модальное окно формы
        closeBookingModal();
        
        requestForm.reset();
        
        // Сброс калькулятора после отправки
        resetCalculator();
    });
}

/* =============================
   ГЛОБАЛЬНЫЕ ФУНКЦИИ
   ============================= */

// Делаем функции доступными глобально
window.openCalculator = openCalculator;
window.closeCalculator = closeCalculator;
window.resetCalculator = resetCalculator;

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
    // Синхронизация популярных марок с базой
    syncPopularBrandsWithDatabase();
    
    // Инициализация популярных марок
    renderPopularBrands();
    
    // Инициализация брендов (если тип не выбран, показываем все)
    if (!selectedType) {
        renderBrands();
    }
    
    updateNavigationButtons();
    updateStepsIndicator();
    
    // Автоматическое открытие калькулятора
    setTimeout(() => {
        if (typeof openCalculator === 'function') {
            openCalculator();
        } else if (calculatorFullscreen) {
            calculatorFullscreen.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    }, 200);
    
    // Инициализация blob-эффекта для кнопок и чипсов
    initBlobEffect();
});

// =============================
// BLOB EFFECT - Интерактивное свечение
// =============================

function initBlobEffect() {
    // Применяем эффект к кнопкам
    document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
        button.onmousemove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty("--x", `${x}px`);
            button.style.setProperty("--y", `${y}px`);
            button.style.setProperty("--height", `${rect.height}px`);
            button.style.setProperty("--width", `${rect.width}px`);
        };
    });
    
    // Применяем эффект к чипсам (только на десктопе для лучшей производительности)
    if (window.innerWidth >= 1024) {
        document.querySelectorAll(".chip, .popular-chip").forEach((chip) => {
            chip.onmousemove = (e) => {
                const rect = chip.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                chip.style.setProperty("--x", `${x}px`);
                chip.style.setProperty("--y", `${y}px`);
                chip.style.setProperty("--height", `${rect.height}px`);
                chip.style.setProperty("--width", `${rect.width}px`);
            };
        });
    }
    
    // Применяем эффект к новым чипсам, которые добавляются динамически
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.classList) {
                    if (node.classList.contains("chip") || node.classList.contains("popular-chip")) {
                        if (window.innerWidth >= 1024) {
                            node.onmousemove = (e) => {
                                const rect = node.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                node.style.setProperty("--x", `${x}px`);
                                node.style.setProperty("--y", `${y}px`);
                                node.style.setProperty("--height", `${rect.height}px`);
                                node.style.setProperty("--width", `${rect.width}px`);
                            };
                        }
                    }
                }
            });
        });
    });
    
    // Наблюдаем за изменениями в контейнерах с чипсами
    const chipContainers = document.querySelectorAll(".chips, #brandList, #modelList, #carTypeSelect");
    chipContainers.forEach((container) => {
        if (container) {
            observer.observe(container, { childList: true, subtree: true });
        }
    });
}

