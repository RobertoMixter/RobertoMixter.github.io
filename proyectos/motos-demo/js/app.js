// CONFIGURACION
const WHATSAPP_NUMBER = "50500000000"; // Cambia por tu numero sin +

const CURRENCY = "USD";

// DATA DEMO
const motos = [
  {
    id: 1,
    nombre: "Honda CB 190R",
    marca: "Honda",
    precio: 2450,
    tipo: "Sport",
    cc: 190,
    desc: "Moto sport ligera ideal para ciudad y carretera.",
    img: "img/honda-cb190r.jpg",
    tags: ["Inyección","LED","5 cambios"]
  },
  {
    id: 2,
    nombre: "Yamaha FZ-S 150",
    marca: "Yamaha",
    precio: 2200,
    tipo: "Naked",
    cc: 150,
    desc: "Diseño urbano con excelente consumo.",
    img: "img/yamaha-fzs150.jpg",
    tags: ["ABS","Ciudad","Económica"]
  },
  {
    id: 3,
    nombre: "Suzuki GN 125",
    marca: "Suzuki",
    precio: 1550,
    tipo: "Clásica",
    cc: 125,
    desc: "Confiable y perfecta para trabajo diario.",
    img: "img/suzuki-gn125.jpg",
    tags: ["Duradera","Bajo consumo","Trabajo"]
  }
];

// HELPERS
const $ = (sel) => document.querySelector(sel);

const formatMoney = (n) =>
  new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0
  }).format(n);

const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;


// FEATURED
function renderFeatured() {
  const m = motos[0];

  $("#featured").innerHTML = `
    <img class="featured__img" src="${m.img}">
    <div class="featured__row">
      <div>
        <b>${m.nombre}</b>
        <div class="muted small">${m.marca} • ${m.cc}cc</div>
      </div>
      <div class="price">${formatMoney(m.precio)}</div>
    </div>
    <div class="hero__actions">
      <a class="btn btn--primary" target="_blank"
      href="${waLink(`Hola, me interesa la ${m.nombre}`)}">WhatsApp</a>
    </div>
  `;
}


// GRID
function cardTemplate(m) {

  const msg = `Hola, me interesa la ${m.nombre}. Precio: ${formatMoney(m.precio)}`;

  return `
    <article class="card">
      <img src="${m.img}">
      <div class="card__top">
        <b>${m.nombre}</b>
        <span class="chip">${m.marca}</span>
      </div>

      <div class="muted small">${m.tipo} • ${m.cc}cc</div>

      <div class="card__chips">
        ${m.tags.map(t => `<span class="chip">${t}</span>`).join("")}
      </div>

      <div class="card__actions">
        <a class="btn btn--primary"
          target="_blank"
          href="${waLink(msg)}">
          WhatsApp
        </a>
      </div>

      <div class="price">${formatMoney(m.precio)}</div>

    </article>
  `;
}

function renderGrid(list) {

  $("#grid").innerHTML = list.map(cardTemplate).join("");

  $("#statTotal").textContent = motos.length;
}


// FILTROS
function getBrands() {

  const set = new Set(motos.map(m => m.marca));

  return ["Todas", ...Array.from(set)];
}

function applyFilters() {

  const q = $("#q").value.toLowerCase();
  const brand = $("#brand").value;
  const maxPrice = Number($("#maxPrice").value || 0);

  let list = [...motos];

  if (q) {
    list = list.filter(m =>
      `${m.nombre} ${m.marca}`.toLowerCase().includes(q)
    );
  }

  if (brand !== "Todas") {
    list = list.filter(m => m.marca === brand);
  }

  if (maxPrice > 0) {
    list = list.filter(m => m.precio <= maxPrice);
  }

  renderGrid(list);
}


// CALCULADORA
function calcPayment() {

  const price = Number($("#p").value || 0);
  const down = Number($("#down").value || 0);
  const months = Number($("#months").value || 1);
  const ratePct = Number($("#rate").value || 0);

  const financed = Math.max(price - down, 0);
  const r = ratePct / 100;

  const payment = financed / months * (1 + r);

  $("#fin").textContent = formatMoney(financed);
  $("#pay").textContent = formatMoney(Math.round(payment));
}


// FORM WHATSAPP
$("#form").addEventListener("submit", (e) => {

  e.preventDefault();

  const name = $("#name").value.trim();
  const msg = $("#msg").value.trim();

  const text = `Hola soy ${name}. ${msg}`;

  window.open(waLink(text), "_blank");

});


// INIT
function init() {

  $("#brand").innerHTML = getBrands().map(b => `<option>${b}</option>`).join("");

  $("#apply").addEventListener("click", applyFilters);

  $("#calcBtn").addEventListener("click", calcPayment);

  renderFeatured();
  renderGrid(motos);

}

init();
