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
    console.log("%c[RESET] Сброс калькулятора", "color:#16a085;font-weight:bold");
    
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
    
    console.log("%c[RESET] Калькулятор полностью сброшен", "color:#16a085;font-weight:bold");
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
    console.log("%c[OPEN] Открытие калькулятора", "color:#16a085;font-weight:bold");
    resetCalculator();
    
    if (calculatorFullscreen) {
        calculatorFullscreen.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeCalculator() {
    console.log("%c[CLOSE] Закрытие калькулятора", "color:#16a085;font-weight:bold");
    
    if (calculatorFullscreen) {
        calculatorFullscreen.classList.remove("active");
        document.body.style.overflow = "";
    }
    
    resetCalculator();
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
        
        console.log("%c[TYPE] Выбран тип:", "color:#16a085", type);
        
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
        console.error("%c[ERROR] Тип автомобиля не выбран!", "color:#e74c3c");
        alert("Пожалуйста, сначала выберите тип автомобиля");
        return;
    }
    
    console.log("%c[MODAL] Открываем модальное окно моделей:", "color:#16a085", {
        brand: brand,
        selectedType: selectedType,
        allowedTypes: typeCategoryMapping[selectedType] || []
    });
    
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
        console.error("%c[ERROR] selectedType не установлен в renderModelsModal!", "color:#e74c3c", {
            selectedType: selectedType,
            brand: brand
        });
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
        console.log("%c[MODELS] Фильтрация моделей:", "color:#16a085", {
            selectedType: selectedType,
            allowedTypes: allowedTypes,
            brand: brand
        });
    } else {
        console.error("%c[ERROR] Тип не найден в маппинге:", "color:#e74c3c", {
            selectedType: selectedType,
            availableTypes: Object.keys(typeCategoryMapping)
        });
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
            console.error("%c[ERROR] Не удалось определить разрешенные типы!", "color:#e74c3c", {
                selectedType: selectedType
            });
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
                console.log("%c[FILTER] Пропущена модель (не соответствует типу):", "color:#e67e22", {
                    model: car.model,
                    type: car.type,
                    allowedTypes: allowedTypes
                });
                return;
            }
            
            // Модель соответствует типу - добавляем в Map
            // Если модель уже есть, приоритет отдаем той, которая лучше соответствует типу
            if (!modelsMap.has(car.model)) {
                // Модель еще не добавлена - добавляем
                modelsMap.set(car.model, car);
                console.log("%c[FILTER] Добавлена модель:", "color:#27ae60", {
                    model: car.model,
                    type: car.type
                });
            } else {
                // Если модель уже есть, проверяем, какая лучше соответствует типу
                const existing = modelsMap.get(car.model);
                
                // КРИТИЧЕСКАЯ ПРОВЕРКА: если существующая модель НЕ соответствует типу, заменяем её
                if (!allowedTypes.includes(existing.type)) {
                    console.warn("%c[FILTER] Заменена модель (существующая не соответствует типу):", "color:#f39c12", {
                        model: car.model,
                        oldType: existing.type,
                        newType: car.type
                    });
                    modelsMap.set(car.model, car);
                } else {
                    // Обе модели соответствуют типу - оставляем первую (обе правильные)
                    console.log("%c[FILTER] Модель уже есть (обе соответствуют типу):", "color:#3498db", {
                        model: car.model,
                        existingType: existing.type,
                        newType: car.type
                    });
                }
            }
        });
        
        // ФИНАЛЬНАЯ ПРОВЕРКА: убеждаемся, что все модели в результате соответствуют типу
        availableModels = Array.from(modelsMap.values())
            .filter(car => {
                // Дополнительная проверка - на всякий случай
                if (!allowedTypes.includes(car.type)) {
                    console.error("%c[ERROR] Обнаружена модель, не соответствующая типу после фильтрации!", "color:#e74c3c", {
                        model: car.model,
                        type: car.type,
                        selectedType: selectedType,
                        allowedTypes: allowedTypes,
                        brand: brand
                    });
                    return false;
                }
                // Дополнительная проверка: убеждаемся, что тип модели действительно соответствует выбранному типу
                if (car.type && !typeCategoryMapping[selectedType]?.includes(car.type)) {
                    console.error("%c[ERROR] Тип модели не найден в маппинге для выбранного типа!", "color:#e74c3c", {
                        model: car.model,
                        carType: car.type,
                        selectedType: selectedType,
                        mapping: typeCategoryMapping[selectedType]
                    });
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
        if (availableModels.length < 2) {
            console.warn("%c[WARNING] Мало моделей для выбранного типа:", "color:#f39c12", {
                filtered: availableModels.length,
                brand: brand,
                selectedType: selectedType,
                allowedTypes: allowedTypes
            });
            
            // Дополнительная проверка: может быть есть модели с похожими типами
            // Например, если выбрано "sedan", но есть только "sedan-small", показываем их
            // Но не показываем модели других категорий (minivan, pickup и т.д.)
        }
        
        console.log("%c[MODELS] Отфильтрованные модели:", "color:#16a085", {
            total: availableModels.length,
            selectedType: selectedType,
            brand: brand,
            models: availableModels.map(m => `${m.model} (${m.type})`)
        });
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
                console.warn("%c[WARNING] Несоответствие марки:", "color:#e74c3c", {
                    selectedBrand: selectedBrand,
                    chipBrand: brand
                });
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
        console.error("%c[ERROR] selectedType не установлен в selectModelUI!", "color:#e74c3c");
        alert("Ошибка: тип автомобиля не выбран. Пожалуйста, вернитесь к выбору типа.");
        return;
    }
    
    // КРИТИЧЕСКАЯ ПРОВЕРКА: проверяем, что выбранная модель соответствует типу
    const modelType = div.dataset.type || null;
    const allowedTypes = typeCategoryMapping[selectedType] || [];
    
    if (modelType && !allowedTypes.includes(modelType)) {
        console.error("%c[ERROR] Выбранная модель не соответствует типу авто!", "color:#e74c3c", {
            model: div.dataset.model,
            modelType: modelType,
            selectedType: selectedType,
            allowedTypes: allowedTypes
        });
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
        console.warn("%c[WARNING] Несоответствие марки в dataset:", "color:#e74c3c", {
            selectedBrand: selectedBrand,
            chipBrand: chipBrand
        });
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
                    console.warn("%c[WARNING] Тип модели не соответствует выбранному типу авто:", "color:#e74c3c", {
                        selectedType: selectedType,
                        modelType: car.type,
                        allowedTypes: allowedTypes
                    });
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
    if (car) {
        console.log("%c[MODEL] Выбрана модель:", "color:#16a085", {
            brand: selectedBrand,
            model: selectedModel,
            type: car.type,
            class: selectedClass,
            selectedType: selectedType,
            car: car
        });
        
        // Дополнительная проверка соответствия
        if (car.brand !== selectedBrand || car.model !== selectedModel) {
            console.error("%c[ERROR] Несоответствие данных:", "color:#e74c3c", {
                expected: { brand: selectedBrand, model: selectedModel },
                actual: { brand: car.brand, model: car.model }
            });
        }
    } else {
        console.warn("%c[WARNING] Автомобиль не найден в базе:", "color:#e74c3c", {
            brand: selectedBrand,
            model: selectedModel
        });
    }

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
    } else {
        console.warn("%c[WARNING] Не удалось определить класс для:", "color:#e74c3c", {
            brand: selectedBrand,
            model: selectedModel
        });
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

        // Закрыть калькулятор и открыть форму
        closeCalculator();
        
        setTimeout(() => {
            if (bookingModal) {
                bookingModal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        }, 300);
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

if (bookingClose) {
    bookingClose.addEventListener("click", () => {
        if (bookingModal) {
            bookingModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}

if (bookingModal) {
    const bookingOverlay = bookingModal.querySelector(".booking-overlay");
    const bookingContent = bookingModal.querySelector(".booking-content");
    
    if (bookingOverlay) {
        bookingOverlay.addEventListener("click", (e) => {
            if (e.target === bookingOverlay) {
                bookingModal.classList.remove("active");
                document.body.style.overflow = "";
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
        
        const userName = document.getElementById("userName")?.value || "";
        const userPhone = document.getElementById("userPhone")?.value || "";
        const userEmail = document.getElementById("userEmail")?.value || "";
        const userComment = document.getElementById("userComment")?.value || "";

        if (!userName || !userPhone) {
            alert("Заполните имя и телефон!");
            return;
        }

        // Здесь можно добавить отправку данных на сервер
        console.log("Отправка формы:", {
            name: userName,
            phone: userPhone,
            email: userEmail,
            comment: userComment,
            brand: selectedBrand,
            model: selectedModel,
            class: selectedClass,
            package: selectedPackage?.name,
            riskZones: selectedRiskZones,
            additionalServices: selectedAdditionalServices,
            totalPrice: totalPrice,
            summary: summaryData?.textContent
        });

        alert("Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.");
        
        if (bookingModal) {
            bookingModal.classList.remove("active");
            document.body.style.overflow = "";
        }
        
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
    console.log("%c[INIT] Калькулятор инициализирован", "color:#16a085;font-weight:bold");
    
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

