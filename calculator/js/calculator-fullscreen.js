'use strict';

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
   TOAST УВЕДОМЛЕНИЯ (Apple Standards)
   ============================= */

function showToast(message, type = 'error', duration = 3000) {
    // Проверяем, есть ли уже функция showToast в глобальной области (из index.html)
    if (typeof window.showToast === 'function') {
        window.showToast(message, type, duration);
        return;
    }
    
    // Создаем toast элемент
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    toast.textContent = message;
    
    // Добавляем стили если их нет
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                background: var(--propellini-dark-secondary, #111);
                color: var(--propellini-text, #fff);
                border: 1px solid var(--propellini-primary, #168491);
                border-radius: 8px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
                z-index: 10000;
                font-family: 'Montserrat', sans-serif;
                font-size: 14px;
                max-width: 400px;
                animation: toastSlideIn 0.3s ease-out;
            }
            .toast-error {
                border-color: #e74c3c;
            }
            .toast-success {
                border-color: #27ae60;
            }
            .toast.hiding {
                animation: toastSlideOut 0.3s ease-in forwards;
            }
            @keyframes toastSlideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes toastSlideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

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
    
    if (selectedClassTextModal) {
        selectedClassTextModal.innerHTML = 'Класс авто: <span>—</span>';
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

// Функции навигации по шагам
function nextStep() {
    if (canProceedToNextStep() && currentStep < totalSteps) {
        goToStep(currentStep + 1);
    } else {
        showToast("Заполните все обязательные поля!", 'error');
    }
}

function prevStep() {
    if (currentStep > 1) {
        goToStep(currentStep - 1);
    }
}

function goToStep(step) {
    // Валидация шага
    if (step < 1 || step > totalSteps) {
        return;
    }
    
    // Проверка возможности перехода вперед (только при переходе ВПЕРЕД)
    if (step > currentStep) {
        if (!canProceedToNextStep()) {
            showToast("Заполните все обязательные поля для перехода на следующий шаг!", 'error');
            return;
        }
    }
    // При переходе НАЗАД - всегда разрешаем
    
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
        
        // Анимация перехода
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
    
    // Логика для каждого шага
    switch(step) {
        case 1:
            // При возврате на шаг 1 - сбросить выбранную марку и модель
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
            
            if (selectedClassTextModal) {
                selectedClassTextModal.innerHTML = 'Класс авто: <span>—</span>';
            }
            break;
            
        case 2:
            // При переходе на шаг 2 - перерисовать бренды с учетом выбранного типа
            if (selectedBrand && carDatabase[selectedBrand]) {
                // Сбросить выбранную марку и модель, если они не соответствуют новому типу
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
                    
                    if (selectedClassTextModal) {
                        selectedClassTextModal.innerHTML = 'Класс авто: <span>—</span>';
                    }
                }
            }
            renderBrands();
            break;
            
        case 3:
            // При переходе на шаг 3 - убедиться, что цены обновлены
            if (selectedClass) {
                renderPackages();
                renderRiskZones();
                renderAdditionalServices();
                calculateTotal();
            }
            break;
            
        case 4:
            // При переходе на шаг 4 - обновить итоговую информацию
            calculateTotal();
            updateSummaryStep();
            break;
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
    // Получаем элементы каждый раз заново для надежности
    const btnBackEl = document.getElementById("btnBack");
    const btnNextEl = document.getElementById("btnNext");
    const btnBookEl = document.getElementById("btnBook");
    
    // Кнопка "Назад"
    if (btnBackEl) {
        if (currentStep === 1) {
            btnBackEl.style.setProperty("display", "none", "important");
        } else {
            btnBackEl.style.setProperty("display", "flex", "important");
            btnBackEl.style.setProperty("pointer-events", "auto", "important");
            btnBackEl.style.setProperty("cursor", "pointer", "important");
            btnBackEl.style.setProperty("z-index", "10002", "important");
            btnBackEl.style.setProperty("position", "relative", "important");
            // Убираем любые блокирующие стили
            btnBackEl.style.opacity = "1";
            btnBackEl.style.visibility = "visible";
        }
    }
    
    // Кнопка "Далее" / "Записаться"
    if (btnNextEl && btnBookEl) {
        if (currentStep === totalSteps) {
            // На последнем шаге (шаг 4) скрываем "Далее" и показываем "Записаться"
            btnNextEl.style.setProperty("display", "none", "important");
            if (totalPrice > 0) {
                btnBookEl.style.setProperty("display", "flex", "important");
                btnBookEl.style.setProperty("pointer-events", "auto", "important");
                btnBookEl.style.setProperty("cursor", "pointer", "important");
                btnBookEl.style.setProperty("z-index", "10002", "important");
                btnBookEl.style.setProperty("position", "relative", "important");
                btnBookEl.style.opacity = "1";
                btnBookEl.style.visibility = "visible";
            } else {
                btnBookEl.style.setProperty("display", "none", "important");
            }
        } else {
            // На других шагах показываем "Далее" и скрываем "Записаться"
            btnNextEl.style.setProperty("display", "flex", "important");
            btnNextEl.style.setProperty("pointer-events", "auto", "important");
            btnNextEl.style.setProperty("cursor", "pointer", "important");
            btnNextEl.style.setProperty("z-index", "10002", "important");
            btnNextEl.style.setProperty("position", "relative", "important");
            btnNextEl.style.opacity = "1";
            btnNextEl.style.visibility = "visible";
            btnBookEl.style.setProperty("display", "none", "important");
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
            // Можно перейти, если выбран пакет, зоны риска или дополнительные услуги
            return selectedPackage !== null || selectedRiskZones.length > 0 || selectedAdditionalServices.length > 0;
        case 4:
            return true;
        default:
            return false;
    }
}

/* =============================
   УНИВЕРСАЛЬНЫЕ ФУНКЦИИ ДЛЯ ЗАКРЫТИЯ
   ============================= */

// Универсальное скрытие всех overlay, модалок и блокировок
function hideAllOverlays() {
    // НЕ скрываем calculator-overlay если калькулятор активен
    const calculatorFullscreen = document.getElementById('calculatorFullscreen');
    const isCalculatorActive = calculatorFullscreen && calculatorFullscreen.classList.contains('active');
    
    const overlays = document.querySelectorAll('.overlay, .modal-overlay, .request-overlay, .calculator-overlay, .model-overlay, .dark-bg, .blur-bg, .backdrop, .modal-bg');
    overlays.forEach(el => {
        // Пропускаем calculator-overlay если калькулятор активен
        if (isCalculatorActive && el.classList.contains('calculator-overlay')) {
            return;
        }
        el.style.display = 'none';
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '-1';
        el.classList.remove('active');
    });
    
    // Восстанавливаем скролл только если калькулятор не активен
    if (!isCalculatorActive) {
        document.body.style.overflow = '';
        document.body.style.overflowX = '';
        document.body.style.overflowY = '';
        document.body.style.height = '';
        document.body.style.position = '';
        document.body.style.background = '';
        document.body.style.backgroundColor = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.background = '';
        document.documentElement.style.backgroundColor = '';
        
        // Убираем все inline стили
        document.body.removeAttribute("style");
    }
}

/* =============================
   ОТКРЫТИЕ/ЗАКРЫТИЕ КАЛЬКУЛЯТОРА
   ============================= */

// Переменные для ловушек фокуса
let previousActiveElement = null;
let focusableElements = null;

// Функция для получения фокусируемых элементов
function getFocusableElements(container) {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll(focusableSelectors)).filter(el => {
        return !el.disabled && el.offsetParent !== null;
    });
}

// Функция для установки ловушки фокуса
function trapFocus(container) {
    focusableElements = getFocusableElements(container);
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Фокусируем первый элемент
    firstElement.focus();
    
    // Обработчик для Tab
    const handleTab = (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    };
    
    // Сохраняем обработчик для последующего удаления
    container._focusTrapHandler = handleTab;
    container.addEventListener('keydown', handleTab);
    container.dataset.focusTrapHandler = 'true';
}

// Функция для снятия ловушки фокуса
function releaseFocus(container) {
    // Удаляем обработчик с контейнера
    if (container._focusTrapHandler) {
        container.removeEventListener('keydown', container._focusTrapHandler);
        delete container._focusTrapHandler;
        delete container.dataset.focusTrapHandler;
    }
    
    // Возвращаем фокус на предыдущий элемент
    if (previousActiveElement && previousActiveElement.focus) {
        previousActiveElement.focus();
    }
}

function openCalculator() {
    // ВАЖНО: Сбрасываем калькулятор при открытии
    resetCalculator();
    
    // Сохраняем текущий активный элемент
    previousActiveElement = document.activeElement;
    
    if (calculatorFullscreen) {
        calculatorFullscreen.classList.add("active");
        calculatorFullscreen.style.setProperty('display', 'block', 'important');
        calculatorFullscreen.style.setProperty('opacity', '1', 'important');
        calculatorFullscreen.style.setProperty('visibility', 'visible', 'important');
        calculatorFullscreen.style.setProperty('pointer-events', 'auto', 'important');
        calculatorFullscreen.style.setProperty('z-index', '9999', 'important');
        
        // Блокируем скролл фона (для мобильных и десктопа)
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.documentElement.style.overflow = "hidden";
        
        // Показываем overlay калькулятора
        if (calculatorOverlay) {
            calculatorOverlay.style.setProperty('display', 'block', 'important');
            calculatorOverlay.style.setProperty('opacity', '0.5', 'important');
            calculatorOverlay.style.setProperty('visibility', 'visible', 'important');
            calculatorOverlay.style.setProperty('pointer-events', 'auto', 'important');
            calculatorOverlay.style.setProperty('z-index', '10000', 'important');
            calculatorOverlay.classList.add("active");
        }
        
        // КРИТИЧЕСКИ ВАЖНО: Показываем calculator-modal
        const calculatorModal = calculatorFullscreen.querySelector('.calculator-modal');
        if (calculatorModal) {
            calculatorModal.style.setProperty('display', 'flex', 'important');
            calculatorModal.style.setProperty('opacity', '1', 'important');
            calculatorModal.style.setProperty('visibility', 'visible', 'important');
            calculatorModal.style.setProperty('pointer-events', 'auto', 'important');
            calculatorModal.style.setProperty('z-index', '10001', 'important');
            calculatorModal.style.setProperty('position', 'relative', 'important');
        }
        
        // Показываем calculator-content
        const calculatorContent = calculatorFullscreen.querySelector('.calculator-content');
        if (calculatorContent) {
            calculatorContent.style.setProperty('display', 'flex', 'important');
            calculatorContent.style.setProperty('opacity', '1', 'important');
            calculatorContent.style.setProperty('visibility', 'visible', 'important');
            calculatorContent.style.setProperty('z-index', '10002', 'important');
            calculatorContent.style.setProperty('pointer-events', 'auto', 'important');
        }
        
        // Убеждаемся что кнопка закрытия кликабельна
        if (calculatorClose) {
            calculatorClose.style.setProperty('z-index', '10003', 'important');
            calculatorClose.style.setProperty('pointer-events', 'auto', 'important');
        }
        
        // Устанавливаем ловушку фокуса
        setTimeout(() => {
            trapFocus(calculatorFullscreen);
        }, 100);
    }
}

// Универсальное закрытие калькулятора (кнопка Х в правом верхнем углу) - ТОЧНАЯ КОПИЯ ИЗ ОРИГИНАЛА
function closeCalculator() {
    // Снимаем ловушку фокуса
    if (calculatorFullscreen) {
        releaseFocus(calculatorFullscreen);
    }
    
    if (calculatorFullscreen) {
        calculatorFullscreen.classList.remove("active");
        calculatorFullscreen.style.setProperty('display', 'none', 'important');
        calculatorFullscreen.style.setProperty('opacity', '0', 'important');
        calculatorFullscreen.style.setProperty('visibility', 'hidden', 'important');
        calculatorFullscreen.style.setProperty('pointer-events', 'none', 'important');
        calculatorFullscreen.style.setProperty('z-index', '-1', 'important');
    }
    
    // Восстанавливаем скролл фона
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.documentElement.style.overflow = "";
    
    // ВАЖНО: Сбрасываем калькулятор при закрытии
    resetCalculator();
    
    // Возврат на главную страницу сайта (добавлено для нашего проекта)
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 100);
}

// Функция для привязки всех обработчиков кнопок
function attachButtonHandlers() {
    // Всегда перепривязываем обработчики для надежности

    // Обработчики закрытия
    const calcClose = document.getElementById("calculatorClose");
    if (calcClose && !calcClose.dataset.handlerAttached) {
        calcClose.dataset.handlerAttached = 'true';
        calcClose.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeCalculator();
        });
    }

    const calcOverlay = document.querySelector(".calculator-overlay");
    if (calcOverlay && !calcOverlay.dataset.handlerAttached) {
        calcOverlay.dataset.handlerAttached = 'true';
        calcOverlay.addEventListener("click", (e) => {
            if (e.target === calcOverlay) {
                e.preventDefault();
                e.stopPropagation();
                closeCalculator();
            }
        });
    }

    // Навигация по шагам - прямые обработчики на кнопки
    const backBtn = document.getElementById("btnBack");
    if (backBtn && !backBtn.dataset.clickHandler) {
        backBtn.dataset.clickHandler = 'true';
        backBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
            return false;
        };
        
        backBtn.ontouchend = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
            return false;
        };
    }

    const nextBtn = document.getElementById("btnNext");
    if (nextBtn && !nextBtn.dataset.clickHandler) {
        nextBtn.dataset.clickHandler = 'true';
        nextBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if (canProceedToNextStep() && currentStep < totalSteps) {
                goToStep(currentStep + 1);
            } else {
                showToast("Заполните все обязательные поля!", 'error');
            }
            return false;
        };
        
        nextBtn.ontouchend = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (canProceedToNextStep() && currentStep < totalSteps) {
                goToStep(currentStep + 1);
            } else {
                showToast("Заполните все обязательные поля!", 'error');
            }
            return false;
        };
    }

    const bookBtn = document.getElementById("btnBook");
    if (bookBtn && !bookBtn.dataset.clickHandler) {
        bookBtn.dataset.clickHandler = 'true';
        bookBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if (currentStep !== totalSteps) {
                return false;
            }
            
            if (totalPrice <= 0) {
                showToast("Сначала выберите автомобиль и услуги!", 'error');
                return false;
            }

            if (typeof window.openRequestForm === 'function') {
                window.openRequestForm();
            } else {
                const requestModal = document.getElementById('requestModal');
                if (requestModal) {
                    requestModal.classList.remove('hidden');
                    requestModal.style.display = 'flex';
                    requestModal.style.opacity = '1';
                    requestModal.style.visibility = 'visible';
                    requestModal.style.pointerEvents = 'auto';
                    requestModal.style.zIndex = '999999';
                    document.body.style.overflow = "hidden";
                }
            }
            return false;
        };
        
        bookBtn.ontouchend = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentStep === totalSteps && totalPrice > 0) {
                if (typeof window.openRequestForm === 'function') {
                    window.openRequestForm();
                }
            }
            return false;
        };
    }

}

// Привязываем обработчики сразу (если элементы уже загружены)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachButtonHandlers);
} else {
    attachButtonHandlers();
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
        showToast("Пожалуйста, сначала выберите тип автомобиля", 'error');
        return;
    }
    
    // Сохраняем текущий активный элемент
    previousActiveElement = document.activeElement;
    
    // Сначала открываем модальное окно для мгновенного отображения
    modelModal.classList.add("active");
    document.body.style.overflow = "hidden";
    
    // Устанавливаем название марки в заголовок
    modelBrandName.textContent = brand;
    
    // Рендерим модели в модальное окно (после открытия для лучшей производительности)
    // Используем requestAnimationFrame для плавности
    requestAnimationFrame(() => {
        renderModelsModal(brand);
        
        // Устанавливаем ловушку фокуса
        setTimeout(() => {
            trapFocus(modelModal);
        }, 100);
    });
}

function closeModelModal() {
    if (!modelModal) return;
    
    // Снимаем ловушку фокуса
    releaseFocus(modelModal);
    
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
        showToast("Ошибка: тип автомобиля не выбран. Пожалуйста, вернитесь к выбору типа.", 'error');
        return;
    }
    
    // КРИТИЧЕСКАЯ ПРОВЕРКА: проверяем, что выбранная модель соответствует типу
    const modelType = div.dataset.type || null;
    const allowedTypes = typeCategoryMapping[selectedType] || [];
    
    if (modelType && !allowedTypes.includes(modelType)) {
        showToast(`Ошибка: модель "${div.dataset.model}" не соответствует выбранному типу "${selectedType}". Пожалуйста, выберите другую модель.`, 'error');
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
    
    // Маппинг классов для отображения
    const classDisplayNames = {
        1: "1 класс",
        2: "2 класс",
        3: "3 класс",
        4: "4 класс"
    };
    
    const classDisplayName = selectedClass ? classDisplayNames[selectedClass] || `Класс ${selectedClass}` : "—";

    if (selectedClassText) {
        selectedClassText.innerHTML = `Класс авто: <span>${classDisplayName}</span>`;
    }
    
    if (selectedClassTextModal) {
        selectedClassTextModal.innerHTML = `Класс авто: <span>${classDisplayName}</span>`;
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

// Флаг для предотвращения повторного рендеринга
let isRenderingPackages = false;

function renderPackages() {
    if (!packageList) return;
    
    // Защита от повторного вызова
    if (isRenderingPackages) {
        return;
    }
    
    isRenderingPackages = true;
    
    // ОЧИСТКА перед рендерингом - убираем дублирование
    packageList.innerHTML = '';

    packages.forEach(pkg => {
        const div = document.createElement("div");
        div.className = "package-item";
        div.dataset.id = pkg.id;

        // Получаем цену с учетом минивэна
        let displayPrice = pkg.base[selectedClass] || 0;
        const isMinivan = selectedType === 'minivan';
        
        // Для минивэнов применяем надбавку к пакету (так как пакет включает заднюю полусферу)
        if (isMinivan) {
            displayPrice = Math.round(displayPrice * 1.3);
        }
        
        // Формируем список услуг из description
        let servicesList = '';
        if (pkg.description) {
            const services = pkg.description.split(' + ').map(s => s.trim()).filter(s => s);
            if (services.length > 0) {
                servicesList = '<ul>';
                services.forEach(service => {
                    servicesList += `<li>${service}</li>`;
                });
                servicesList += '</ul>';
            }
        }

        div.innerHTML = `
            <header class="package-header">
                <h3 class="package-name">${pkg.name}</h3>
                <div class="package-cost">
                    ${displayPrice.toLocaleString('ru-RU')} ₽
                    ${isMinivan ? '<span style="font-size: 12px; opacity: 0.7; display: block; margin-top: 4px;">(базовая: ' + (pkg.base[selectedClass] || 0).toLocaleString('ru-RU') + ' ₽)</span>' : ''}
                </div>
            </header>
            <section class="package-features">
                ${servicesList}
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

            // КРИТИЧЕСКИ ВАЖНО: Обновляем кнопки навигации после выбора пакета
            calculateTotal();
            
            // Небольшая задержка для гарантии обновления DOM
            setTimeout(() => {
                updateNavigationButtons();
                
                // Дополнительно убеждаемся что кнопки кликабельны
                const btnNextEl = document.getElementById("btnNext");
                const btnBackEl = document.getElementById("btnBack");
                if (btnNextEl) {
                    btnNextEl.style.setProperty("pointer-events", "auto", "important");
                    btnNextEl.style.setProperty("cursor", "pointer", "important");
                    btnNextEl.style.setProperty("z-index", "10002", "important");
                    btnNextEl.style.setProperty("position", "relative", "important");
                    btnNextEl.style.opacity = "1";
                    btnNextEl.style.visibility = "visible";
                }
                if (btnBackEl && currentStep > 1) {
                    btnBackEl.style.setProperty("pointer-events", "auto", "important");
                    btnBackEl.style.setProperty("cursor", "pointer", "important");
                    btnBackEl.style.setProperty("z-index", "10002", "important");
                    btnBackEl.style.setProperty("position", "relative", "important");
                    btnBackEl.style.opacity = "1";
                    btnBackEl.style.visibility = "visible";
                }
            }, 50);
        };

        packageList.appendChild(div);
    });
    
    // Сбрасываем флаг после завершения рендеринга
    isRenderingPackages = false;
}

// renderPackages() вызывается при переходе на шаг 3, не нужно вызывать здесь

/* =============================
   5) ОБНОВЛЕНИЕ ЦЕН
   ============================= */

function updatePriceBlocks() {
    if (!selectedClass) return;

    // Перерисовываем пакеты с новыми ценами
    renderPackages();
    renderRiskZones();
    renderAdditionalServices();
    
    // Показать секцию дополнительных услуг
    if (additionalServicesSection) {
        additionalServicesSection.style.display = "block";
    }
    
    // Секция зон риска скрыта для тонировки (если нет riskZonePrices)
    if (riskZonesSection && typeof riskZonePrices !== 'undefined' && Object.keys(riskZonePrices).length > 0) {
        riskZonesSection.style.display = "block";
    } else if (riskZonesSection) {
        riskZonesSection.style.display = "none";
    }
    
    // Если выбран пакет с зонами, подсветить зоны
    if (selectedPackage && selectedPackage.zones && selectedPackage.zones.length > 0) {
        setTimeout(() => {
            highlightPackageZones();
        }, 100);
    }
    
    // Пересчитываем итоговую цену
    calculateTotal();
}

/* =============================
   5.5) ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
   ============================= */

function renderAdditionalServices() {
    if (!additionalServicesContainer || !selectedClass) return;

    additionalServicesContainer.innerHTML = "";
    
    // Дополнительные услуги для тонировки
    const additionalServicesList = typeof additionalServices !== 'undefined' ? additionalServices : [];
    
    const isMinivan = selectedType === 'minivan';
    // Список услуг, к которым НЕ применяется надбавка для минивэнов
    const minivanExcludedServices = [
        'koreaFront',
        'koreaPremiumFront', 
        'llumarFront',
        'koreaAthermalWindshield',
        'koreaChameleonWindshield',
        'windshieldArmor'
    ];

    additionalServicesList.forEach(service => {
        const label = document.createElement("label");
        label.className = "check";

        const id = "service_" + service.id;

        // Получаем базовую цену
        const basePrice = service.price[selectedClass] || 0;
        
        // Применяем надбавку для минивэнов (если не в списке исключений)
        let displayPrice = basePrice;
        if (isMinivan && !minivanExcludedServices.includes(service.id)) {
            displayPrice = Math.round(basePrice * 1.3);
        }
        
        // Формируем текст цены с учетом минивэна
        let priceText = `${displayPrice.toLocaleString('ru-RU')} ₽`;
        if (isMinivan && !minivanExcludedServices.includes(service.id)) {
            priceText += ` <span style="font-size: 11px; opacity: 0.7;">(базовая: ${basePrice.toLocaleString('ru-RU')} ₽)</span>`;
        }
        
        label.innerHTML = `
            <input type="checkbox" id="${id}">
            <span>${service.name}</span>
            <span class="price">${priceText}</span>
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
            
            // Обновляем кнопки навигации после изменения дополнительных услуг
            setTimeout(() => {
                updateNavigationButtons();
            }, 50);
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

    // Для тонировки зоны риска не используются, скрываем секцию
    if (riskZonesSection) {
        riskZonesSection.style.display = "none";
    }
    
    // Если есть riskZonePrices (для обратной совместимости), показываем их
    if (typeof riskZonePrices !== 'undefined' && Object.keys(riskZonePrices).length > 0) {
        if (riskZonesSection) {
            riskZonesSection.style.display = "block";
        }
        
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
                
                // Обновляем кнопки навигации после изменения зон
                setTimeout(() => {
                    updateNavigationButtons();
                }, 50);
            });
            
            // Сохранить ссылку на label для подсветки
            label.dataset.zone = zone;

            riskZonesContainer.appendChild(label);
        });
    }
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
    
    // Проверяем, является ли автомобиль минивэном
    const isMinivan = selectedType === 'minivan';
    
    // Список услуг, к которым НЕ применяется надбавка для минивэнов
    const minivanExcludedServices = [
        'koreaFront',
        'koreaPremiumFront', 
        'llumarFront',
        'koreaAthermalWindshield',
        'koreaChameleonWindshield',
        'windshieldArmor'
    ];

    if (selectedPackage && selectedPackage.base[selectedClass]) {
        let packagePrice = selectedPackage.base[selectedClass];
        
        // Для минивэнов +30% к пакету (так как пакет включает заднюю полусферу)
        if (isMinivan) {
            packagePrice = Math.round(packagePrice * 1.3);
        }
        
        total += packagePrice;
    }

    // Зоны риска (если используются)
    if (typeof riskZonePrices !== 'undefined') {
        selectedRiskZones.forEach(zone => {
            if (riskZonePrices[zone] && riskZonePrices[zone][selectedClass]) {
                let zonePrice = riskZonePrices[zone][selectedClass];
                
                // Для минивэнов +30% к зонам риска
                if (isMinivan) {
                    zonePrice = Math.round(zonePrice * 1.3);
                }
                
                total += zonePrice;
            }
        });
    }

    // Дополнительные услуги для тонировки
    selectedAdditionalServices.forEach(serviceId => {
        let servicePrice = 0;
        
        // Используем дополнительные услуги из prices.js
        if (typeof additionalServices !== 'undefined') {
            const service = additionalServices.find(s => s.id === serviceId);
            if (service && service.price && service.price[selectedClass]) {
                servicePrice = service.price[selectedClass];
                
                // Для минивэнов +30% только если услуга не в списке исключений
                if (isMinivan && !minivanExcludedServices.includes(serviceId)) {
                    servicePrice = Math.round(servicePrice * 1.3);
                }
            }
        } else {
            // Fallback на старые услуги (для обратной совместимости)
            switch(serviceId) {
                case "koreaRear":
                    servicePrice = typeof koreaRear !== 'undefined' ? (koreaRear[selectedClass] || 0) : 0;
                    if (isMinivan) servicePrice = Math.round(servicePrice * 1.3);
                    break;
                case "koreaPremiumRear":
                    servicePrice = typeof koreaPremiumRear !== 'undefined' ? (koreaPremiumRear[selectedClass] || 0) : 0;
                    if (isMinivan) servicePrice = Math.round(servicePrice * 1.3);
                    break;
                case "llumarRear":
                    servicePrice = typeof llumarRear !== 'undefined' ? (llumarRear[selectedClass] || 0) : 0;
                    if (isMinivan) servicePrice = Math.round(servicePrice * 1.3);
                    break;
                case "koreaFront":
                    servicePrice = typeof koreaFront !== 'undefined' ? (koreaFront[selectedClass] || 0) : 0;
                    // Не применяем надбавку для минивэнов
                    break;
                case "koreaPremiumFront":
                    servicePrice = typeof koreaPremiumFront !== 'undefined' ? (koreaPremiumFront[selectedClass] || 0) : 0;
                    // Не применяем надбавку для минивэнов
                    break;
                case "llumarFront":
                    servicePrice = typeof llumarFront !== 'undefined' ? (llumarFront[selectedClass] || 0) : 0;
                    // Не применяем надбавку для минивэнов
                    break;
                case "koreaAthermalWindshield":
                case "koreaChameleonWindshield":
                    servicePrice = typeof koreaAthermalWindshield !== 'undefined' ? (koreaAthermalWindshield[selectedClass] || 0) : 0;
                    if (serviceId === "koreaChameleonWindshield" && typeof koreaChameleonWindshield !== 'undefined') {
                        servicePrice = koreaChameleonWindshield[selectedClass] || 0;
                    }
                    // Не применяем надбавку для минивэнов
                    break;
                case "windshieldArmor":
                    servicePrice = typeof windshieldArmor !== 'undefined' ? (windshieldArmor[selectedClass] || 0) : 0;
                    // Не применяем надбавку для минивэнов
                    break;
                // Остальные услуги (передние боковые, задняя полусфера целиком) - применяем надбавку для минивэнов
                default:
                    // Для обратной совместимости со старыми ID
                    if (serviceId.includes("Rear") || serviceId.includes("Sides") || serviceId === "rearFull") {
                        // Пытаемся найти цену через additionalServices
                        if (typeof additionalServices !== 'undefined') {
                            const service = additionalServices.find(s => s.id === serviceId);
                            if (service && service.price && service.price[selectedClass]) {
                                servicePrice = service.price[selectedClass];
                                if (isMinivan) servicePrice = Math.round(servicePrice * 1.3);
                            }
                        }
                    }
                    break;
            }
        }
        
        total += servicePrice;
    });

    totalPrice = total;
    finalPriceElement.textContent = total.toLocaleString("ru-RU") + " ₽";
    
    // Обновление aria-live для итоговой цены (Apple Standards)
    const ariaLiveElement = document.getElementById('calculatorSummaryAria');
    const ariaLiveText = document.getElementById('calculatorSummaryText');
    if (ariaLiveElement && ariaLiveText) {
        const brandText = selectedBrand || "не выбрана";
        const modelText = selectedModel || "не выбрана";
        const classDisplayNames = {
            1: "1 класс",
            2: "2 класс",
            3: "3 класс",
            4: "4 класс"
        };
        const classText = selectedClass ? classDisplayNames[selectedClass] || `Класс ${selectedClass}` : "не выбран";
        const packageText = selectedPackage ? selectedPackage.name : "не выбран";
        const priceText = total > 0 ? `${total.toLocaleString("ru-RU")} рублей` : "0 рублей";
        
        ariaLiveText.textContent = `Итоговая стоимость: Марка ${brandText}, Модель ${modelText}, Класс ${classText}, Пакет ${packageText}, Итого ${priceText}`;
    }
    
    // Обновить итоговый шаг
    updateSummaryStep();
    
    // Обновить кнопки навигации с небольшой задержкой для гарантии
    setTimeout(() => {
        updateNavigationButtons();
    }, 10);
}

function updateSummaryStep() {
    // Маппинг классов для отображения
    const classDisplayNames = {
        1: "1 класс",
        2: "2 класс",
        3: "3 класс",
        4: "4 класс"
    };
    
    if (summaryBrand) {
        summaryBrand.textContent = selectedBrand || "—";
    }
    if (summaryModel) {
        summaryModel.textContent = selectedModel || "—";
    }
    if (summaryClass) {
        const classDisplayName = selectedClass ? classDisplayNames[selectedClass] || `Класс ${selectedClass}` : "—";
        summaryClass.textContent = classDisplayName;
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
        // Получаем названия услуг из additionalServices или используем маппинг
        let serviceNames = [];
        if (typeof additionalServices !== 'undefined') {
            serviceNames = selectedAdditionalServices.map(id => {
                const service = additionalServices.find(s => s.id === id);
                return service ? service.name : id;
            });
        } else {
            const serviceNamesMap = {
                "koreaAthermal": "Тонировка передней полусферы (Корея, атермальная)",
                "koreaChameleon": "Тонировка передней полусферы (Корея, хамелеон)"
            };
            serviceNames = selectedAdditionalServices.map(id => serviceNamesMap[id] || id);
        }
        summaryAdditionalServicesValue.textContent = selectedAdditionalServices.length > 0 
            ? serviceNames.join(", ") 
            : "—";
    }
    
    // Обновление aria-live региона для screen readers (Apple Standards)
    const ariaLiveElement = document.getElementById('calculatorSummaryAria');
    const ariaLiveText = document.getElementById('calculatorSummaryText');
    if (ariaLiveElement && ariaLiveText) {
        const brandText = selectedBrand || "не выбрана";
        const modelText = selectedModel || "не выбрана";
        const classText = selectedClass ? classDisplayNames[selectedClass] || `Класс ${selectedClass}` : "не выбран";
        const packageText = selectedPackage ? selectedPackage.name : "не выбран";
        const priceText = totalPrice > 0 ? `${totalPrice.toLocaleString("ru-RU")} рублей` : "0 рублей";
        
        ariaLiveText.textContent = `Итоговая стоимость: Марка ${brandText}, Модель ${modelText}, Класс ${classText}, Пакет ${packageText}, Итого ${priceText}`;
    }
}

/* =============================
   8) ФОРМА ЗАПИСИ
   ============================= */

// Функция открытия формы заявки
window.openRequestForm = function() {
    // Проверяем что мы на последнем шаге
    if (currentStep !== totalSteps) {
        // Переходим на последний шаг если не на нем
        goToStep(totalSteps);
        return;
    }
    
    if (totalPrice <= 0) {
        showToast("Сначала выберите автомобиль и услуги!", 'error');
        return;
    }

    const modal = document.getElementById('requestModal');
    if (!modal) {
        // Форма должна быть в DOM, если её нет - это критическая ошибка структуры
        return;
    }

    // Обновить данные в форме
    const summaryDataEl = document.getElementById('summaryData');
    const summaryDataContainer = document.getElementById('summaryDataContainer');
    
    if (summaryDataEl) {
        // Получаем названия услуг из additionalServices или используем маппинг
        let additionalServicesNames = [];
        if (typeof additionalServices !== 'undefined') {
            additionalServicesNames = selectedAdditionalServices.map(id => {
                const service = additionalServices.find(s => s.id === id);
                return service ? service.name : id;
            });
        } else {
            const serviceNamesMap = {
                "koreaAthermal": "Тонировка передней полусферы (Корея, атермальная)",
                "koreaChameleon": "Тонировка передней полусферы (Корея, хамелеон)"
            };
            additionalServicesNames = selectedAdditionalServices.map(id => serviceNamesMap[id] || id);
        }
        
        // Формируем информацию о пакете или зонах
        let packageOrZonesInfo = "—";
        if (selectedPackage) {
            packageOrZonesInfo = selectedPackage.name;
        } else if (selectedRiskZones.length > 0) {
            packageOrZonesInfo = "Выбранные зоны: " + selectedRiskZones.join(", ");
        }
        
        // Получаем правильное отображение класса
        const classDisplayNames = {
            1: "1 класс",
            2: "2 класс",
            3: "3 класс",
            4: "4 класс"
        };
        const classDisplayName = selectedClass ? classDisplayNames[selectedClass] || `Класс ${selectedClass}` : "—";
        
        summaryDataEl.textContent = `
Марка: ${selectedBrand || "—"}
Модель: ${selectedModel || "—"}
Класс: ${classDisplayName}

${selectedPackage ? "Пакет:" : "Зоны/Услуги:"} ${packageOrZonesInfo}

${selectedAdditionalServices.length > 0 ? "Дополнительные услуги:\n" + additionalServicesNames.join(", ") + "\n" : ""}
ИТОГО: ${totalPrice.toLocaleString("ru-RU")} ₽
        `;
        
        if (summaryDataContainer) {
            summaryDataContainer.style.display = "block";
        }
    }

    // Открываем модалку - убираем hidden и показываем явно с высоким z-index
    modal.classList.remove('hidden');
    modal.style.setProperty('display', 'flex', 'important');
    modal.style.setProperty('opacity', '1', 'important');
    modal.style.setProperty('visibility', 'visible', 'important');
    modal.style.setProperty('pointer-events', 'auto', 'important');
    modal.style.setProperty('z-index', '999999', 'important');
    
    // Блокируем скролл фона
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    // Фокус на первое поле
    setTimeout(() => {
        const nameInput = document.getElementById('userName');
        if (nameInput) {
            nameInput.focus();
        }
    }, 200);
};

// Функция закрытия формы заявки
window.closeRequestForm = function() {
    const modal = document.getElementById('requestModal') ||
        document.querySelector('.request-modal') ||
        document.querySelector('[data-modal="request"]') ||
        document.querySelector('.modal-request');
    
    // Снимаем ловушку фокуса
    if (modal) {
        releaseFocus(modal);
        modal.style.display = 'none';
        modal.classList.add('hidden');
    }
    
    hideAllOverlays();
    
    document.body.style.overflow = '';
    
    // Возврат на шаг 4 калькулятора
    if (currentStep !== 4) {
        goToStep(4);
    }
    
    // Показываем калькуляторный контент снова
    if (calculatorFullscreen) {
        const calculatorModal = calculatorFullscreen.querySelector(".calculator-modal");
        if (calculatorModal) {
            calculatorModal.style.display = "";
        }
    }
};

// Функция для привязки обработчиков закрытия (для обратной совместимости)
function attachCloseHandlers() {
    // Привязываем только к общим кнопкам закрытия, которые не имеют своих обработчиков
    document.querySelectorAll(`
        .close-btn:not(.calculator-close):not(.request-close),
        .close:not(.calculator-close):not(.request-close),
        .modal-close:not(.calculator-close):not(.request-close),
        .btn-close:not(.calculator-close):not(.request-close),
        .close-icon:not(.calculator-close):not(.request-close),
        .x-btn:not(.calculator-close):not(.request-close)
    `).forEach(btn => {
        // Проверяем, что это не кнопка навигации и обработчик еще не привязан
        if (btn.id !== 'btnNext' && btn.id !== 'btnBack' && 
            !btn.classList.contains('btn-primary') && 
            !btn.classList.contains('btn-secondary') &&
            !btn.dataset.closeHandlerAttached) {
            btn.dataset.closeHandlerAttached = 'true';
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.closeRequestForm();
                if (typeof window.closeCalculator === 'function') {
                    window.closeCalculator();
                }
            });
        }
    });
}

// Глобальные функции для обратной совместимости
window.closeForm = window.closeRequestForm;
window.closeCalc = function() {
    if (typeof window.closeCalculator === 'function') {
        window.closeCalculator();
    }
};

// Обработчик кнопки "Записаться" - перенесен в DOMContentLoaded для надежности

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

// Старая функция закрытия - использует новую универсальную логику
function closeBookingModal() {
    // Используем универсальное закрытие формы
    closeRequestForm();
}

if (bookingModal) {
    const bookingContent = bookingModal.querySelector(".booking-content");
    
    // Обработчик закрытия формы по крестику
    if (bookingClose) {
        bookingClose.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeBookingModal();
        });
    }
    
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

// Обработчик отправки формы - удалён отсюда, перенесён в DOMContentLoaded
// чтобы избежать дублирования обработчиков

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
    
    // Привязываем обработчики (если еще не привязаны)
    attachButtonHandlers();
    
    // Привязываем обработчики закрытия
    attachCloseHandlers();
    
    // Дополнительная привязка обработчиков после небольшой задержки для гарантии
    setTimeout(() => {
        attachButtonHandlers();
        attachCloseHandlers();
        
        // Убеждаемся, что калькулятор открывается правильно
        const calc = document.getElementById('calculatorFullscreen');
        if (calc && calc.classList.contains('active')) {
            const overlay = calc.querySelector('.calculator-overlay');
            if (overlay) {
                overlay.style.display = 'block';
                overlay.style.opacity = '0.5';
                overlay.style.visibility = 'visible';
            }
        }
    }, 200);
    
    // Обработка Escape для закрытия модальных окон
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
            // Закрываем форму заявки если открыта
            const requestModal = document.getElementById('requestModal');
            if (requestModal && !requestModal.classList.contains('hidden')) {
                window.closeRequestForm();
                return;
            }
            
            // Закрываем модальное окно выбора модели если открыто
            const modelModal = document.getElementById('modelModal');
            if (modelModal && modelModal.classList.contains('active')) {
                closeModelModal();
                return;
            }
            
            // Закрываем калькулятор если открыт
            const calculator = document.getElementById('calculatorFullscreen');
            if (calculator && calculator.classList.contains('active')) {
                closeCalculator();
            }
        }
    });
    
    // Инициализация новой формы заявки
    const requestCloseBtn = document.getElementById('requestCloseBtn');
    if (requestCloseBtn) {
        requestCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeRequestForm();
        });
    }
    
    const requestOverlay = document.querySelector('.request-overlay');
    if (requestOverlay) {
        requestOverlay.addEventListener('click', (e) => {
            if (e.target === requestOverlay) {
                closeRequestForm();
            }
        });
    }
    
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userNameInput = document.getElementById('userName');
            const userPhoneInput = document.getElementById('userPhone');
            const userEmailInput = document.getElementById('userEmail');
            const userCommentInput = document.getElementById('userComment');
            
            const userName = userNameInput?.value?.trim() || '';
            const userPhone = userPhoneInput?.value?.trim() || '';
            const userEmail = userEmailInput?.value?.trim() || '';
            const userComment = userCommentInput?.value?.trim() || '';
            
            // Улучшенная валидация
            let errorMessage = '';
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
                showToast(errorMessage, 'error');
                return;
            }
            
            // Здесь можно добавить отправку данных на сервер
            showToast("Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.", 'success');
            
            // Закрываем форму
            closeRequestForm();
            
            // Сбрасываем форму
            this.reset();
        });
    }
    
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

