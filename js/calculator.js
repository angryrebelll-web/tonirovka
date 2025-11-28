/* =============================
   PROPellini Calculator Logic
   Вариант B: 4 шага
   ============================= */

/* ЭЛЕМЕНТЫ */

const step1Container = document.getElementById("step1");
const step2Container = document.getElementById("step2");
const step3Container = document.getElementById("step3");
const step4Container = document.getElementById("step4");

const brandListContainer = document.getElementById("brandList");
const modelListContainer = document.getElementById("modelList");
const searchBrandInput = document.getElementById("searchBrand");

const selectedClassText = document.getElementById("selectedClass");
const classIndicator = document.getElementById("classIndicator");

const packageListContainer = document.getElementById("packageList");
const fullGlossCheckbox = document.getElementById("fullGloss");
const fullMatteCheckbox = document.getElementById("fullMatte");
const priceFullGloss = document.getElementById("priceFullGloss");
const priceFullMatte = document.getElementById("priceFullMatte");
const riskZonesContainer = document.getElementById("riskZones");

const finalPriceElement = document.getElementById("finalPrice");
const chosenPackage = document.getElementById("chosenPackage");
const chosenClass = document.getElementById("chosenClass");
const chosenBrand = document.getElementById("chosenBrand");
const chosenModel = document.getElementById("chosenModel");

const modal = document.getElementById("modalForm");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const summaryData = document.getElementById("summaryData");
const requestForm = document.getElementById("requestForm");

/* ТЕКУЩИЕ ДАННЫЕ */

let currentStep = 1;
let selectedType = null;
let selectedBrand = null;
let selectedModel = null;
let selectedClass = null;
let selectedPackage = null;
let selectedRiskZones = [];
let totalPrice = 0;

/* =============================
   ШАГ 1: Выбор типа авто
   ============================= */

const handleTypeSelect = (typeId) => {
    selectedType = Number(typeId);
    selectedBrand = null;
    selectedModel = null;
    selectedClass = null;
    selectedPackage = null;
    selectedRiskZones = [];
    
    document.querySelectorAll("#step1 .type-chip").forEach(chip => {
        chip.classList.remove("active");
    });
    
    const clickedChip = document.querySelector(`#step1 .type-chip[data-type="${typeId}"]`);
    if (clickedChip) {
        clickedChip.classList.add("active");
    }
    
    renderStep1();
    goToStep(2);
    renderBrands();
};

const renderStep1 = () => {
    if (!step1Container) return;
    
    step1Container.innerHTML = "";
    
    Object.keys(carTypes).forEach(typeId => {
        const type = carTypes[typeId];
        const chip = document.createElement("div");
        chip.className = "type-chip";
        chip.dataset.type = typeId;
        
        if (selectedType === Number(typeId)) {
            chip.classList.add("active");
        }
        
        chip.innerHTML = `
            <div class="type-chip-title">${type.name}</div>
            <div class="type-chip-desc">${type.description}</div>
        `;
        
        chip.addEventListener("click", () => handleTypeSelect(typeId));
        step1Container.appendChild(chip);
    });
};

/* =============================
   ШАГ 2: Выбор марки
   ============================= */

const renderBrands = (filterText = "") => {
    if (!brandListContainer) return;
    
    brandListContainer.innerHTML = "";
    
    const brands = selectedType 
        ? filterBrandsByType(selectedType)
        : getAllBrands();
    
    const filtered = filterText 
        ? brands.filter(brand => brand.toLowerCase().includes(filterText.toLowerCase()))
        : brands;
    
    if (filtered.length === 0) {
        brandListContainer.innerHTML = '<div class="empty-state">Марки не найдены</div>';
        return;
    }
    
    filtered.forEach(brand => {
        const chip = document.createElement("div");
        chip.className = "brand-chip";
        chip.textContent = brand;
        
        if (selectedBrand === brand) {
            chip.classList.add("active");
        }
        
        chip.addEventListener("click", () => handleBrandSelect(brand));
        brandListContainer.appendChild(chip);
    });
};

const handleBrandSelect = (brand) => {
    selectedBrand = brand;
    selectedModel = null;
    selectedClass = null;
    
    document.querySelectorAll("#brandList .brand-chip").forEach(chip => {
        chip.classList.remove("active");
    });
    
    const clickedChip = [...brandListContainer.children].find(
        ch => ch.textContent === brand
    );
    if (clickedChip) {
        clickedChip.classList.add("active");
    }
    
    renderModels();
    goToStep(3);
};

if (searchBrandInput) {
    searchBrandInput.addEventListener("input", (e) => {
        renderBrands(e.target.value);
    });
}

/* =============================
   ШАГ 3: Выбор модели
   ============================= */

const renderModels = () => {
    if (!modelListContainer || !selectedBrand) return;
    
    modelListContainer.innerHTML = "";
    
    const models = selectedType && selectedBrand
        ? filterModelsByType(selectedBrand, selectedType)
        : getModelsByBrand(selectedBrand);
    
    if (models.length === 0) {
        modelListContainer.innerHTML = '<div class="empty-state">Модели не найдены</div>';
        return;
    }
    
    models.forEach(model => {
        const tile = document.createElement("div");
        tile.className = "model-tile";
        tile.textContent = model;
        
        if (selectedModel === model) {
            tile.classList.add("active");
        }
        
        tile.addEventListener("click", () => handleModelSelect(model));
        modelListContainer.appendChild(tile);
    });
};

const handleModelSelect = (model) => {
    selectedModel = model;
    selectedClass = getClassByModel(selectedBrand, model);
    
    document.querySelectorAll("#modelList .model-tile").forEach(tile => {
        tile.classList.remove("active");
    });
    
    const clickedTile = [...modelListContainer.children].find(
        t => t.textContent === model
    );
    if (clickedTile) {
        clickedTile.classList.add("active");
    }
    
    updateClassIndicator();
    renderPackages();
    renderRiskZones();
    calculateTotal();
    goToStep(4);
};

const updateClassIndicator = () => {
    if (selectedClassText) {
        selectedClassText.textContent = `Класс авто: ${selectedClass || "—"}`;
    }
    
    if (chosenClass) {
        chosenClass.textContent = selectedClass || "—";
    }
    
    if (classIndicator) {
        classIndicator.textContent = selectedClass 
            ? `Класс ${selectedClass}` 
            : "—";
        classIndicator.className = selectedClass 
            ? `class-indicator class-${selectedClass}` 
            : "class-indicator";
    }
    
    updatePriceBlocks();
};

/* =============================
   ШАГ 4: Пакеты и итог
   ============================= */

const renderPackages = () => {
    if (!packageListContainer) return;
    
    packageListContainer.innerHTML = "";
    
    packages.forEach(pkg => {
        const div = document.createElement("div");
        div.className = "package-item";
        div.dataset.id = pkg.id;
        
        const price = selectedClass ? (pkg.base[selectedClass] || 0) : 0;
        
        div.innerHTML = `
            <div class="package-item-content">
                <strong>${pkg.name}</strong>
                <span class="package-price">${price.toLocaleString()} ₽</span>
            </div>
        `;
        
        if (selectedPackage && selectedPackage.id === pkg.id) {
            div.classList.add("active");
        }
        
        div.addEventListener("click", () => {
            selectedPackage = pkg;
            
            document.querySelectorAll(".package-item").forEach(p => {
                p.classList.remove("active");
            });
            div.classList.add("active");
            
            if (chosenPackage) {
                chosenPackage.textContent = pkg.name;
            }
            
            calculateTotal();
        });
        
        packageListContainer.appendChild(div);
    });
};

const updatePriceBlocks = () => {
    if (!selectedClass) return;
    
    const prices = getPricesByClass(selectedClass);
    if (!prices) return;
    
    if (priceFullGloss) {
        priceFullGloss.textContent = prices.fullWrapGloss.toLocaleString() + " ₽";
    }
    if (priceFullMatte) {
        priceFullMatte.textContent = prices.fullWrapMatte.toLocaleString() + " ₽";
    }
};

const renderRiskZones = () => {
    if (!riskZonesContainer || !selectedClass) return;
    
    riskZonesContainer.innerHTML = "";
    selectedRiskZones = [];
    
    Object.keys(riskZonePrices).forEach(zone => {
        const label = document.createElement("label");
        label.className = "check";
        
        const id = "zone_" + zone.replace(/\s+/g, "_");
        const price = getRiskZonePrice(zone, selectedClass);
        
        label.innerHTML = `
            <input type="checkbox" id="${id}" data-zone="${zone}">
            <span>${zone}</span>
            <span class="price">${price.toLocaleString()} ₽</span>
        `;
        
        const checkbox = label.querySelector("input");
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                selectedRiskZones.push(zone);
            } else {
                selectedRiskZones = selectedRiskZones.filter(z => z !== zone);
            }
            calculateTotal();
        });
        
        riskZonesContainer.appendChild(label);
    });
};

if (fullGlossCheckbox) {
    fullGlossCheckbox.addEventListener("change", () => {
        calculateTotal();
    });
}

if (fullMatteCheckbox) {
    fullMatteCheckbox.addEventListener("change", () => {
        calculateTotal();
    });
}

/* =============================
   РАСЧЁТ ИТОГОВОЙ ЦЕНЫ
   ============================= */

const calculateTotal = () => {
    if (!selectedClass || !finalPriceElement) {
        if (finalPriceElement) {
            finalPriceElement.textContent = "0 ₽";
        }
        return;
    }
    
    let total = 0;
    
    if (selectedPackage) {
        const packagePrice = getPackagePrice(selectedPackage.id, selectedClass);
        total += packagePrice;
    }
    
    if (fullGlossCheckbox && fullGlossCheckbox.checked) {
        const prices = getPricesByClass(selectedClass);
        if (prices) {
            total += prices.fullWrapGloss;
        }
    }
    
    if (fullMatteCheckbox && fullMatteCheckbox.checked) {
        const prices = getPricesByClass(selectedClass);
        if (prices) {
            total += prices.fullWrapMatte;
        }
    }
    
    selectedRiskZones.forEach(zone => {
        total += getRiskZonePrice(zone, selectedClass);
    });
    
    totalPrice = total;
    finalPriceElement.textContent = total.toLocaleString() + " ₽";
    
    if (chosenBrand) {
        chosenBrand.textContent = selectedBrand || "—";
    }
    if (chosenModel) {
        chosenModel.textContent = selectedModel || "—";
    }
};

/* =============================
   УПРАВЛЕНИЕ ШАГАМИ
   ============================= */

const goToStep = (step) => {
    currentStep = step;
    
    const containers = [step1Container, step2Container, step3Container, step4Container];
    
    containers.forEach((container, index) => {
        if (container) {
            const stepNum = index + 1;
            if (stepNum <= step) {
                container.classList.add("visible");
            } else {
                container.classList.remove("visible");
            }
        }
    });
    
    if (step >= 4 && selectedClass) {
        calculateTotal();
    }
    
    setTimeout(() => {
        const activeContainer = containers[step - 1];
        if (activeContainer) {
            activeContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
};

const resetCalculator = () => {
    currentStep = 1;
    selectedType = null;
    selectedBrand = null;
    selectedModel = null;
    selectedClass = null;
    selectedPackage = null;
    selectedRiskZones = [];
    totalPrice = 0;
    
    if (searchBrandInput) searchBrandInput.value = "";
    if (fullGlossCheckbox) fullGlossCheckbox.checked = false;
    if (fullMatteCheckbox) fullMatteCheckbox.checked = false;
    
    renderStep1();
    renderBrands();
    goToStep(1);
    calculateTotal();
};

/* =============================
   МОДАЛЬНОЕ ОКНО
   ============================= */

if (openModalBtn) {
    openModalBtn.addEventListener("click", () => {
        if (totalPrice <= 0 || !selectedClass) {
            alert("Сначала выберите автомобиль и пакет услуг!");
            return;
        }
        
        if (modal) {
            modal.style.display = "block";
        }
        
        if (summaryData) {
            summaryData.textContent = `
Марка: ${selectedBrand || "—"}
Модель: ${selectedModel || "—"}
Класс: ${selectedClass || "—"}
Тип: ${selectedType ? getTypeName(selectedType) : "—"}

Пакет: ${selectedPackage ? selectedPackage.name : "—"}

Полная оклейка глянец: ${fullGlossCheckbox && fullGlossCheckbox.checked ? "Да" : "Нет"}
Полная оклейка мат: ${fullMatteCheckbox && fullMatteCheckbox.checked ? "Да" : "Нет"}

Зоны риска:
${selectedRiskZones.length > 0 ? selectedRiskZones.join(", ") : "—"}

ИТОГО: ${totalPrice.toLocaleString()} ₽
            `;
        }
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        if (modal) {
            modal.style.display = "none";
        }
    });
}

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

if (requestForm) {
    requestForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const userName = document.getElementById("userName")?.value || "";
        const userPhone = document.getElementById("userPhone")?.value || "";
        const userComment = document.getElementById("userComment")?.value || "";
        
        if (!userName || !userPhone) {
            alert("Заполните имя и телефон!");
            return;
        }
        
        console.log("Отправка формы:", {
            name: userName,
            phone: userPhone,
            comment: userComment,
            summary: summaryData?.textContent
        });
        
        alert("Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.");
        
        if (modal) {
            modal.style.display = "none";
        }
        
        requestForm.reset();
    });
}

/* =============================
   ИНИЦИАЛИЗАЦИЯ
   ============================= */

const initCalculator = () => {
    renderStep1();
    renderBrands();
    goToStep(1);
    calculateTotal();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
} else {
    initCalculator();
}
