// ===============================
// FIX ДЛЯ КАЛЬКУЛЯТОРА + ЗАЯВКИ
// ===============================

function hideAllOverlays() {
    // НЕ скрываем calculator-overlay если калькулятор активен
    const calculatorFullscreen = document.getElementById('calculatorFullscreen');
    const isCalculatorActive = calculatorFullscreen && calculatorFullscreen.classList.contains('active');
    
    const overlays = document.querySelectorAll(`
        .overlay,
        .modal-overlay,
        .request-overlay,
        .dark-bg,
        .blur-bg,
        .backdrop,
        .modal-bg
    `);

    overlays.forEach(el => {
        // Пропускаем calculator-overlay если калькулятор активен
        if (isCalculatorActive && el.classList.contains('calculator-overlay')) {
            return;
        }
        el.style.display = 'none';
    });

    // Восстанавливаем скролл только если калькулятор не активен
    if (!isCalculatorActive) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
}

function closeRequestForm() {
    const modal =
        document.getElementById('requestModal') ||
        document.querySelector('.request-modal') ||
        document.querySelector('[data-modal="request"]') ||
        document.querySelector('.modal-request');

    if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
    }

    hideAllOverlays();

    setTimeout(() => {
        window.location.href = '/landpadge/';
    }, 80);
}

function closeCalculator() {
    const calc =
        document.getElementById('calculatorContainer') ||
        document.querySelector('.calculator-wrapper') ||
        document.querySelector('.calc-container') ||
        document.querySelector('#calculator');

    if (calc) calc.style.display = 'none';

    hideAllOverlays();

    setTimeout(() => {
        window.location.href = '/landpadge/';
    }, 80);
}

function attachCloseHandlers() {
    // Привязываем обработчики ТОЛЬКО к кнопкам закрытия, НЕ к кнопкам навигации
    document.querySelectorAll(`
        .close-btn,
        .close,
        .modal-close,
        .btn-close,
        .close-icon,
        .x-btn,
        .calculator-close,
        .request-close
    `).forEach(btn => {
        // Проверяем, что это не кнопка навигации
        if (btn.id !== 'btnNext' && btn.id !== 'btnBack' && !btn.classList.contains('btn-primary') && !btn.classList.contains('btn-secondary')) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeRequestForm();
                closeCalculator();
            });
        }
    });

    window.closeForm = closeRequestForm;
    window.closeCalc = closeCalculator;
}

document.addEventListener('DOMContentLoaded', () => {
    // НЕ вызываем hideAllOverlays() при загрузке - это скрывает калькулятор
    // hideAllOverlays() вызывается только при закрытии
    attachCloseHandlers();
    
    // Убеждаемся, что калькулятор открывается правильно
    setTimeout(() => {
        const calc = document.getElementById('calculatorFullscreen');
        if (calc && calc.classList.contains('active')) {
            // Калькулятор активен - не скрываем overlay
            const overlay = calc.querySelector('.calculator-overlay');
            if (overlay) {
                overlay.style.display = 'block';
                overlay.style.opacity = '0.5';
                overlay.style.visibility = 'visible';
            }
        }
    }, 100);
});

