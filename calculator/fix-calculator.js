// ===============================
// FIX ДЛЯ КАЛЬКУЛЯТОРА + ЗАЯВКИ
// ===============================

function hideAllOverlays() {
    const overlays = document.querySelectorAll(`
        .overlay,
        .modal-overlay,
        .request-overlay,
        .dark-bg,
        .blur-bg,
        .backdrop,
        .modal-bg
    `);

    overlays.forEach(el => el.style.display = 'none');

    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
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
    document.querySelectorAll(`
        .close-btn,
        .close,
        .modal-close,
        .btn-close,
        .close-icon,
        .x-btn
    `).forEach(btn => {
        btn.addEventListener('click', () => {
            closeRequestForm();
            closeCalculator();
        });
    });

    window.closeForm = closeRequestForm;
    window.closeCalc = closeCalculator;
}

document.addEventListener('DOMContentLoaded', () => {
    hideAllOverlays();
    attachCloseHandlers();
});

