const WHATSAPP_NUMBER = "50500000000";
const CURRENCY = "USD";

const motos = [
  {
    id: 1,
    nombre: "Honda CB 190R",
    marca: "Honda",
    precio: 2450,
    tipo: "Sport",
    cc: 190,
    desc: "Moto sport ligera ideal para ciudad y carretera.",
    img: "img/honda-cb190r.png",
    tags: ["Inyección", "LED", "5 cambios"]
  },
  {
    id: 2,
    nombre: "Yamaha FZ-S 150",
    marca: "Yamaha",
    precio: 2200,
    tipo: "Naked",
    cc: 150,
    desc: "Diseño urbano con excelente consumo.",
    img: "img/yamaha-fzs150.png",
    tags: ["Ciudad", "Económica", "Cómoda"]
  },
  {
    id: 3,
    nombre: "Suzuki GN 125",
    marca: "Suzuki",
    precio: 1550,
    tipo: "Clásica",
    cc: 125,
    desc: "Confiable y perfecta para trabajo diario.",
    img: "img/suzuki-gn125.png",
    tags: ["Duradera", "Bajo consumo", "Trabajo"]
  }
];

const $ = (sel) => document.querySelector(sel);

const formatMoney = (n) =>
  new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0
  }).format(n);

const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

function renderFeatured() {
  const m = motos[0];
  $("#featured").innerHTML = `
    <img class="featured__img" src="${m.img}" alt="${m.nombre}">
    <div class="featured__row">
      <div>
        <b>${m.nombre}</b>
        <div class="muted small">${m.marca} · ${m.cc}cc · ${m.tipo}</div>
      </div>
      <div class="price">${formatMoney(m.precio)}</div>
    </div>
    <div class="hero__actions">
      <a class="btn btn--primary" target="_blank" rel="noopener" href="${waLink(`Hola, me interesa la ${m.nombre}. ¿Está disponible?`)}">WhatsApp</a>
      <button class="btn btn--ghost" type="button" data-open="${m.id}">Ver detalle</button>
    </div>
  `;
}

function cardTemplate(m) {
  const msg = `Hola, me interesa la ${m.nombre} (${m.cc}cc). Precio: ${formatMoney(m.precio)}. ¿Me da información?`;
  return `
    <article class="card">
      <img src="${m.img}" alt="${m.nombre}">
      <div class="card__top">
        <b>${m.nombre}</b>
        <span class="chip">${m.marca}</span>
      </div>
      <div class="muted small">${m.tipo} · ${m.cc}cc</div>
      <div class="card__chips">
        ${m.tags.map(t => `<span class="chip">${t}</span>`).join("")}
      </div>
      <div class="card__actions">
        <a class="btn btn--primary" target="_blank" rel="noopener" href="${waLink(msg)}">WhatsApp</a>
        <button class="btn btn--ghost" type="button" data-open="${m.id}">Detalle</button>
      </div>
      <div class="price">${formatMoney(m.precio)}</div>
    </article>
  `;
}

function renderGrid(list) {
  $("#grid").innerHTML = list.map(cardTemplate).join("");
  $("#empty").hidden = list.length !== 0;
  $("#statTotal").textContent = motos.length;
}

function getBrands() {
  const set = new Set(motos.map(m => m.marca));
  return ["Todas", ...Array.from(set).sort()];
}

function applyFilters() {
  const q = $("#q").value.trim().toLowerCase();
  const brand = $("#brand").value;
  const maxPrice = Number($("#maxPrice").value || 0);

  let list = [...motos];

  if (q) {
    list = list.filter(m =>
      `${m.nombre} ${m.marca} ${m.tipo} ${m.cc}`.toLowerCase().includes(q)
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

function calcPayment() {
  const price = Number($("#p").value || 0);
  const down = Number($("#down").value || 0);
  const months = Number($("#months").value || 1);
  const ratePct = Number($("#rate").value || 0);

  const financed = Math.max(price - down, 0);
  const r = ratePct / 100;

  const payment = r === 0
    ? financed / months
    : financed * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);

  $("#fin").textContent = formatMoney(financed);
  $("#pay").textContent = formatMoney(Math.round(payment));

  const msg = `Hola, quiero información de financiamiento. Precio: ${formatMoney(price)} | Prima: ${formatMoney(down)} | Plazo: ${months} meses.`;
  $("#whatsFinance").href = waLink(msg);
}

function openModal(id) {
  const m = motos.find(x => x.id === id);
  if (!m) return;

  $("#mImg").src = m.img;
  $("#mImg").alt = m.nombre;
  $("#mTitle").textContent = m.nombre;
  $("#mDesc").textContent = m.desc;
  $("#mPrice").textContent = formatMoney(m.precio);

  $("#mChips").innerHTML = `
    <span class="chip">${m.marca}</span>
    <span class="chip">${m.tipo}</span>
    <span class="chip">${m.cc}cc</span>
    ${m.tags.map(t => `<span class="chip">${t}</span>`).join("")}
  `;

  $("#mWhats").href = waLink(`Hola, me interesa la ${m.nombre}. ¿Está disponible?`);

  $("#modal").classList.add("show");
  $("#modal").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  $("#modal").classList.remove("show");
  $("#modal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function setMobileMenu(open) {
  const nav = $("#nav");
  const overlay = $("#navOverlay");
  const btn = $("#menuBtn");
  if (!nav || !overlay || !btn) return;

  nav.classList.toggle("is-open", open);
  overlay.hidden = !open;
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.style.overflow = open ? "hidden" : "";
}

function toggleMobileMenu() {
  const nav = $("#nav");
  if (!nav) return;
  setMobileMenu(!nav.classList.contains("is-open"));
}

function init() {
  $("#brand").innerHTML = getBrands().map(b => `<option>${b}</option>`).join("");

  $("#apply").addEventListener("click", applyFilters);
  $("#reset").addEventListener("click", () => {
    $("#q").value = "";
    $("#brand").value = "Todas";
    $("#maxPrice").value = "";
    applyFilters();
  });

  $("#calcBtn").addEventListener("click", calcPayment);
  calcPayment();

  renderFeatured();
  renderGrid(motos);

  $("#year").textContent = new Date().getFullYear();
  $("#whatsText").textContent = `+${WHATSAPP_NUMBER}`;

  $("#closeModal").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      setMobileMenu(false);
    }
  });

  $("#menuBtn").addEventListener("click", toggleMobileMenu);
  $("#navOverlay").addEventListener("click", () => setMobileMenu(false));
  $("#nav").querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMobileMenu(false)));

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    const id = Number(btn.getAttribute("data-open"));
    openModal(id);
  });
}

init();
