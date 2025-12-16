// JavaScript для проекта тонировки Propellini

// Функция открытия калькулятора (доступна глобально)
window.openCalculator = function() {
    window.location.href = './calculator/index.html';
};

// Функции модального окна с ловушками фокуса
let modalFocusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;
let previousActiveElement = null;

function trapFocus(modal) {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    modalFocusableElements = Array.from(modal.querySelectorAll(focusableSelectors))
        .filter(el => !el.disabled && el.offsetParent !== null);
    
    if (modalFocusableElements.length === 0) return;
    
    firstFocusableElement = modalFocusableElements[0];
    lastFocusableElement = modalFocusableElements[modalFocusableElements.length - 1];
    previousActiveElement = document.activeElement;
    
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
}

function releaseFocus() {
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
    }
    previousActiveElement = null;
    modalFocusableElements = [];
    firstFocusableElement = null;
    lastFocusableElement = null;
}

window.openModal = function() {
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => trapFocus(modal), 100);
    }
};

window.closeModal = function() {
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        releaseFocus();
        const form = document.getElementById('applicationForm');
        if (form) form.reset();
    }
};

// Закрытие модального окна при клике вне его
document.addEventListener('click', (e) => {
    const modal = document.getElementById('applicationModal');
    if (modal && e.target === modal) {
        window.closeModal();
    }
});

// Закрытие модального окна по Escape и ловушка Tab
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('applicationModal');
    if (!modal || !modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        window.closeModal();
    } else if (e.key === 'Tab') {
        if (modalFocusableElements.length === 0) {
            trapFocus(modal);
        }
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                if (lastFocusableElement) lastFocusableElement.focus();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                if (firstFocusableElement) firstFocusableElement.focus();
            }
        }
    }
});

// Функция инициализации обработчиков
function initButtonHandlers() {
    // Гарантируем, что модальное окно закрыто при загрузке
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Обработчики для кнопок открытия калькулятора
    const calculatorNavBtn = document.getElementById('calculatorNavBtn');
    const calculatorMobileBtn = document.getElementById('calculatorMobileBtn');
    const openCalculatorBtn = document.getElementById('openCalculatorBtn');
    
    if (calculatorNavBtn) {
        calculatorNavBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.openCalculator) window.openCalculator();
        });
    }
    if (calculatorMobileBtn) {
        calculatorMobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Закрываем меню перед переходом
            const menu = document.getElementById('mobileMenu');
            const menuBtn = document.getElementById('mobileMenuBtn');
            if (menu && menuBtn) {
                menu.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
            // Открываем калькулятор
            if (window.openCalculator) window.openCalculator();
        });
    }
    if (openCalculatorBtn) {
        openCalculatorBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.openCalculator) window.openCalculator();
        });
    }
    
    // Кнопка калькулятора в секции pricing
    const openCalculatorPricingBtn = document.getElementById('openCalculatorPricingBtn');
    if (openCalculatorPricingBtn) {
        openCalculatorPricingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.openCalculator) window.openCalculator();
        });
    }
    
    // Дополнительные обработчики для альтернативных кнопок
    const calculatorNavBtnAlt = document.getElementById('calculatorNavBtnAlt');
    const calculatorMobileBtnAlt = document.getElementById('calculatorMobileBtnAlt');
    const openModalBtnAlt = document.getElementById('openModalBtnAlt');
    const openModalMobileBtnAlt = document.getElementById('openModalMobileBtnAlt');
    const openModalHeroBtnAlt = document.getElementById('openModalHeroBtnAlt');
    
    if (calculatorNavBtnAlt) {
        calculatorNavBtnAlt.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.openCalculator) window.openCalculator();
        });
    }
    if (calculatorMobileBtnAlt) {
        calculatorMobileBtnAlt.addEventListener('click', function(e) {
            e.preventDefault();
            const menu = document.getElementById('mobileMenu');
            const menuBtn = document.getElementById('mobileMenuBtn');
            if (menu && menuBtn) {
                menu.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
            if (window.openCalculator) window.openCalculator();
        });
    }
    if (openModalBtnAlt) {
        openModalBtnAlt.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.openModal) window.openModal();
        });
    }
    if (openModalMobileBtnAlt) {
        openModalMobileBtnAlt.addEventListener('click', function(e) {
            e.preventDefault();
            const menu = document.getElementById('mobileMenu');
            const menuBtn = document.getElementById('mobileMenuBtn');
            if (menu && menuBtn) {
                menu.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
            if (window.openModal) window.openModal();
        });
    }
    if (openModalHeroBtnAlt) {
        openModalHeroBtnAlt.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.openModal) window.openModal();
        });
    }
    
    // Обработчики для кнопок открытия модального окна
    const openModalBtn = document.getElementById('openModalBtn');
    const openModalMobileBtn = document.getElementById('openModalMobileBtn');
    const openModalHeroBtn = document.getElementById('openModalHeroBtn');
    
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.openModal) window.openModal();
        });
    }
    if (openModalMobileBtn) {
        openModalMobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Закрываем мобильное меню перед открытием модального окна
            const menu = document.getElementById('mobileMenu');
            const menuBtn = document.getElementById('mobileMenuBtn');
            if (menu && menuBtn) {
                menu.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
            // Открываем модальное окно
            if (window.openModal) window.openModal();
        });
    }
    if (openModalHeroBtn) {
        openModalHeroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.openModal) window.openModal();
        });
    }
    
    // Обработчик для кнопки закрытия модального окна
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.closeModal) window.closeModal();
        });
    }
}

// Инициализация обработчиков при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initButtonHandlers);
} else {
    // DOM уже загружен
    initButtonHandlers();
}
