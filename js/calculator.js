/* =============================
   PROPellini Calculator Logic
   ============================= */

/* ЭЛЕМЕНТЫ */

const brandList = document.getElementById("brandList");
const modelList = document.getElementById("modelList");
const searchBrandInput = document.getElementById("searchBrand");

const carTypeSelect = document.getElementById("carTypeSelect");
const selectedClassText = document.getElementById("selectedClass");

const fullGlossCheckbox = document.getElementById("fullGloss");
const fullMatteCheckbox = document.getElementById("fullMatte");

const priceFullGloss = document.getElementById("priceFullGloss");
const priceFullMatte = document.getElementById("priceFullMatte");

const riskZonesContainer = document.getElementById("riskZones");

const finalPriceElement = document.getElementById("finalPrice");
const chosenPackage = document.getElementById("chosenPackage");
const chosenClass = document.getElementById("chosenClass");

const modal = document.getElementById("modalForm");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const summaryData = document.getElementById("summaryData");
const requestForm = document.getElementById("requestForm");

/* ТЕКУЩИЕ ДАННЫЕ */

let selectedType = null;
let selectedBrand = null;
let selectedModel = null;
let selectedClass = null;
let selectedPackage = null;
let selectedRiskZones = [];

let totalPrice = 0;


/* =============================
   1) Выбор типа авто
   ============================= */

carTypeSelect.addEventListener("click", (e) => {
    if (!e.target.classList.contains("chip")) return;

    document
        .querySelectorAll("#carTypeSelect .chip")
        .forEach(ch => ch.classList.remove("active"));

    e.target.classList.add("active");
    selectedType = Number(e.target.dataset.type);

    updatePriceBlocks();
    calculateTotal();
});




/* =============================
   2) Вывод брендов
   ============================= */

function renderBrands(filterText = "") {
    brandList.innerHTML = "";
    const brands = Object.keys(carDatabase);
    const filtered = filterText 
        ? brands.filter(brand => brand.toLowerCase().includes(filterText.toLowerCase()))
        : brands;

    filtered.forEach(brand => {
        const div = document.createElement("div");
        div.className = "chip";
        div.textContent = brand;
        div.onclick = () => selectBrand(brand);
        brandList.appendChild(div);
    });
}

renderBrands();

// Обработчик поиска брендов
searchBrandInput.addEventListener("input", (e) => {
    renderBrands(e.target.value);
});




/* =============================
   3) Выбор бренда → вывод моделей
   ============================= */

function selectBrand(brand) {
    selectedBrand = brand;
    selectedModel = null;

    document
        .querySelectorAll("#brandList .chip")
        .forEach(ch => ch.classList.remove("active"));

    [...brandList.children]
        .find(ch => ch.textContent === brand)
        ?.classList.add("active");

    renderModels(brand);
}

function renderModels(brand) {
    modelList.innerHTML = "";

    if (!carDatabase[brand]) return;

    carDatabase[brand].models.forEach(model => {
        const div = document.createElement("div");
        div.className = "chip";
        div.textContent = model;

        div.onclick = () => {
            selectedModel = model;
            selectModelUI(div);
        };

        modelList.appendChild(div);
    });
}

function selectModelUI(div) {
    document
        .querySelectorAll("#modelList .chip")
        .forEach(m => m.classList.remove("active"));

    div.classList.add("active");

    if (carDatabase[selectedBrand]) {
        selectedClass = carDatabase[selectedBrand].class;

        selectedClassText.textContent = `Класс авто: ${selectedClass}`;
        chosenClass.textContent = selectedClass;

        updatePriceBlocks();
        calculateTotal();
    }
}




/* =============================
   4) Пакеты услуг
   ============================= */

function renderPackages() {
    const container = document.getElementById("packageList");
    if (!container) return;

    packages.forEach(pkg => {
        const div = document.createElement("div");
        div.className = "package-item";
        div.dataset.id = pkg.id;

        div.innerHTML = `
            <strong>${pkg.name}</strong><br>
            <span class="price">${pkg.base[1]} ₽ — ${pkg.base[5]} ₽</span>
        `;

        div.onclick = () => {
            selectedPackage = pkg;

            document
                .querySelectorAll(".package-item")
                .forEach(p => p.classList.remove("active"));
            div.classList.add("active");

            chosenPackage.textContent = pkg.name;

            calculateTotal();
        };

        container.appendChild(div);
    });
}

renderPackages();




/* =============================
   5) Обновление цен
   ============================= */

function updatePriceBlocks() {
    if (!selectedClass) return;

    if (priceFullGloss) {
        priceFullGloss.textContent = fullWrapGloss[selectedClass] + " ₽";
    }
    if (priceFullMatte) {
        priceFullMatte.textContent = fullWrapMatte[selectedClass] + " ₽";
    }

    renderRiskZones();
}

// Обработчики чекбоксов полной оклейки
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
   6) Зоны риска
   ============================= */

function renderRiskZones() {
    if (!riskZonesContainer || !selectedClass) return;

    riskZonesContainer.innerHTML = "";
    selectedRiskZones = [];

    Object.keys(riskZonePrices).forEach(zone => {
        const div = document.createElement("label");
        div.className = "check";

        const id = "zone_" + zone.replace(/\s+/g, "_");

        div.innerHTML = `
            <input type="checkbox" id="${id}">
            <span>${zone}</span>
            <span class="price">${riskZonePrices[zone][selectedClass]} ₽</span>
        `;

        div.querySelector("input").addEventListener("change", (e) => {
            if (e.target.checked) {
                selectedRiskZones.push(zone);
            } else {
                selectedRiskZones = selectedRiskZones.filter(z => z !== zone);
            }

            calculateTotal();
        });

        riskZonesContainer.appendChild(div);
    });
}




/* =============================
   7) Расчёт итоговой цены
   ============================= */

function calculateTotal() {
    if (!selectedClass || !finalPriceElement) {
        if (finalPriceElement) {
            finalPriceElement.textContent = "0 ₽";
        }
        return;
    }

    let total = 0;

    if (selectedPackage && selectedPackage.base[selectedClass]) {
        total += selectedPackage.base[selectedClass];
    }

    if (fullGlossCheckbox && fullGlossCheckbox.checked) {
        total += fullWrapGloss[selectedClass];
    }
    if (fullMatteCheckbox && fullMatteCheckbox.checked) {
        total += fullWrapMatte[selectedClass];
    }

    selectedRiskZones.forEach(zone => {
        if (riskZonePrices[zone] && riskZonePrices[zone][selectedClass]) {
            total += riskZonePrices[zone][selectedClass];
        }
    });

    totalPrice = total;
    finalPriceElement.textContent = total.toLocaleString() + " ₽";
}




/* =============================
   8) Модалка
   ============================= */

if (openModalBtn) {
    openModalBtn.onclick = () => {
        if (totalPrice <= 0) {
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

Пакет: ${selectedPackage ? selectedPackage.name : "—"}

Полная оклейка глянец: ${fullGlossCheckbox && fullGlossCheckbox.checked ? "Да" : "Нет"}
Полная оклейка мат: ${fullMatteCheckbox && fullMatteCheckbox.checked ? "Да" : "Нет"}

Зоны риска:
${selectedRiskZones.length > 0 ? selectedRiskZones.join(", ") : "—"}

ИТОГО: ${totalPrice.toLocaleString()} ₽
            `;
        }
    };
}

if (closeModalBtn) {
    closeModalBtn.onclick = () => {
        if (modal) {
            modal.style.display = "none";
        }
    };
}

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

// Обработчик отправки формы
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

        // Здесь можно добавить отправку данных на сервер
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

