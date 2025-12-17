/* ============================
   Propellini - Главный JavaScript
   ============================ */

// Перенесенные скрипты из index.html для улучшения CSP

// Инициализация калькулятора
document.addEventListener("DOMContentLoaded", () => {
    // Открытие калькулятора при клике на кнопки
    const calculatorButtons = [
        document.getElementById('calculatorNavBtnAlt'),
        document.getElementById('calculatorMobileBtnAlt'),
        document.getElementById('openCalculatorPricingBtn')
    ];
    
    calculatorButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                window.location.href = './calculator/index.html';
            });
        }
    });
    
    // Открытие модального окна для всех кнопок "Записаться"
    const modalButtons = [
        document.getElementById('openModalBtnAlt'),
        document.getElementById('openModalHeroBtnAlt'),
        document.getElementById('openModalMobileBtnAlt'),
        document.getElementById('openModalNavBtn')
    ];
    
    const modal = document.getElementById('applicationModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    modalButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });
    
    // Закрытие модального окна
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Обработка форм
    const applicationForm = document.getElementById('applicationForm');
    const contactForm = document.getElementById('contactForm');
    
    // Функция отправки формы
    async function handleFormSubmit(e, formType) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.formType = formType;
        
        try {
            const response = await fetch('api/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showToast('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
                e.target.reset();
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            } else {
                showToast('Ошибка отправки. Пожалуйста, попробуйте позже или позвоните нам.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showToast('Ошибка отправки. Пожалуйста, попробуйте позже или позвоните нам.', 'error');
        }
    }
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', (e) => handleFormSubmit(e, 'application'));
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact'));
    }
    
    // Toast уведомления
    function showToast(message, type = 'success', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    // Сделаем showToast глобальной для использования в других скриптах
    window.showToast = showToast;
    
    // Мобильное меню
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
        
        // Закрытие при клике на ссылку
        mobileMenu.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#hero') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer для анимаций
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.slide-up').forEach(el => {
        observer.observe(el);
    });
    
    // Lazy loading для изображений
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback для старых браузеров
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

