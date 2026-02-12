const WHATSAPP_NUMBER = "50500000000";
const CURRENCY = "USD";

const products = [
  { id: 1,  sku: "BA-001", name: "Vestido satinado", category: "Ropa", price: 38,  was: 48, tags: ["Nuevo", "Best seller"], img: "img/p1.jpg",  desc: "Corte elegante, ideal para ocasión o salida casual.", sizes: ["S","M","L"] },
  { id: 2,  sku: "BA-002", name: "Blusa minimal",    category: "Ropa", price: 22,  was: 0,  tags: ["Básico", "Ligero"],     img: "img/p2.jpg",  desc: "Blusa cómoda y fresca para uso diario.", sizes: ["S","M","L","XL"] },
  { id: 3,  sku: "BA-003", name: "Cartera clásica",  category: "Carteras", price: 28, was: 35, tags: ["Oferta", "Elegante"],  img: "img/p3.jpg",  desc: "Cartera compacta con acabado premium.", sizes: ["Única"] },
  { id: 4,  sku: "BA-004", name: "Bolso tote",       category: "Bolsos", price: 34,  was: 0,  tags: ["Nuevo", "Espacioso"],  img: "img/p4.jpg",  desc: "Bolso amplio, perfecto para diario.", sizes: ["Única"] },
  { id: 5,  sku: "BA-005", name: "Perfume floral",   category: "Perfumes", price: 29, was: 39, tags: ["Oferta", "Top"],       img: "img/p5.jpg",  desc: "Aroma floral suave con buena duración.", sizes: ["50ml"] },
  { id: 6,  sku: "BA-006", name: "Perfume amaderado",category: "Perfumes", price: 32, was: 0,  tags: ["Noche", "Intenso"],     img: "img/p6.jpg",  desc: "Notas amaderadas, ideal para ocasiones.", sizes: ["50ml"] },
  { id: 7,  sku: "BA-007", name: "Labial mate",      category: "Maquillaje", price: 12, was: 0, tags: ["Mate", "Larga duración"], img: "img/p7.jpg", desc: "Color uniforme con acabado mate.", sizes: ["Única"] },
  { id: 8,  sku: "BA-008", name: "Paleta nude",      category: "Maquillaje", price: 18, was: 24, tags: ["Oferta", "Nude"],     img: "img/p8.jpg",  desc: "Tonos nude para uso diario y eventos.", sizes: ["Única"] },
  { id: 9,  sku: "BA-009", name: "Aretes dorados",   category: "Accesorios", price: 9, was: 0,  tags: ["Minimal", "Regalo"],   img: "img/p9.jpg",  desc: "Aretes discretos con brillo elegante.", sizes: ["Única"] },
  { id: 10, sku: "BA-010", name: "Pulsera perla",    category: "Accesorios", price: 11, was: 0, tags: ["Clásico", "Delicado"], img: "img/p10.jpg", desc: "Pulsera fina, ideal para combinar.", sizes: ["Única"] },
  { id: 11, sku: "BA-011", name: "Cartera mini",     category: "Carteras", price: 19, was: 0, tags: ["Compacta", "Nuevo"],     img: "img/p11.jpg", desc: "Diseño pequeño, práctico y elegante.", sizes: ["Única"] },
  { id: 12, sku: "BA-012", name: "Bolso cruzado",    category: "Bolsos", price: 27, was: 33, tags: ["Oferta", "Diario"],       img: "img/p12.jpg", desc: "Bolso cruzado cómodo para salir.", sizes: ["Única"] }
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

function uniq(arr){ return Array.from(new Set(arr)); }

function renderFeatured(){
  const p = products[0];
  $("#featured").innerHTML = `
    <img class="featureImg" src="${p.img}" alt="${p.name}">
    <div class="featureRow">
      <div>
        <div class="pill">${p.category}</div>
        <div style="height:6px"></div>
        <div style="font-weight:900">${p.name}</div>
        <div class="muted small">${p.sizes[0]} · ${p.sku}</div>
      </div>
      <div style="text-align:right">
        <div class="price">${formatMoney(p.price)}</div>
        ${p.was ? `<div class="was">${formatMoney(p.was)}</div>` : `<div class="was" style="visibility:hidden">-</div>`}
      </div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <a class="btn btn--primary" target="_blank" rel="noopener"
         href="${waLink(`Hola, me interesa ${p.name} (${p.sku}). ¿Disponible?`)}">WhatsApp</a>
      <button class="btn btn--ghost" type="button" data-open="${p.id}">Ver detalle</button>
    </div>
  `;
}

function cardHTML(p){
  const msg = `Hola, me interesa ${p.name} (${p.sku}). Precio: ${formatMoney(p.price)}. ¿Disponible?`;
  const priceBlock = p.was
    ? `<div class="price">${formatMoney(p.price)} <span class="was">${formatMoney(p.was)}</span></div>`
    : `<div class="price">${formatMoney(p.price)}</div>`;

  return `
    <article class="card">
      <img class="cardImg" src="${p.img}" alt="${p.name}">
      <div class="cardBody">
        <div class="cardTop">
          <div>
            <div class="cardTitle">${p.name}</div>
            <div class="cardMeta">${p.category} · ${p.sizes[0]} · ${p.sku}</div>
          </div>
          <div style="text-align:right">${priceBlock}</div>
        </div>

        <div class="chips">
          ${p.tags.slice(0,3).map(t => `<span class="chip">${t}</span>`).join("")}
        </div>

        <div class="cardActions">
          <a class="btn btn--primary" target="_blank" rel="noopener" href="${waLink(msg)}">WhatsApp</a>
          <button class="btn btn--ghost" type="button" data-open="${p.id}">Detalle</button>
        </div>
      </div>
    </article>
  `;
}

function renderGrid(list, el){
  el.innerHTML = list.map(cardHTML).join("");
}

function getCategories(){
  return ["Todas", ...uniq(products.map(p => p.category)).sort()];
}

function getTags(){
  const tags = uniq(products.flatMap(p => p.tags)).sort();
  return ["Todas", ...tags];
}

function applyFilters(){
  const q = $("#q").value.trim().toLowerCase();
  const cat = $("#category").value;
  const tag = $("#tag").value;
  const max = Number($("#maxPrice").value || 0);

  let list = [...products];

  if(q){
    list = list.filter(p =>
      `${p.name} ${p.category} ${p.sku} ${p.tags.join(" ")}`.toLowerCase().includes(q)
    );
  }

  if(cat !== "Todas"){
    list = list.filter(p => p.category === cat);
  }

  if(tag !== "Todas"){
    list = list.filter(p => p.tags.includes(tag));
  }

  if(max > 0){
    list = list.filter(p => p.price <= max);
  }

  renderGrid(list, $("#grid"));
  $("#empty").hidden = list.length !== 0;
}

function pick3(category){
  return products.filter(p => p.category === category).slice(0,3);
}

function offers3(){
  const offers = products.filter(p => p.was && p.was > p.price);
  return offers.slice(0,3);
}

function openModal(id){
  const p = products.find(x => x.id === id);
  if(!p) return;

  $("#mImg").src = p.img;
  $("#mImg").alt = p.name;
  $("#mCat").textContent = p.category;
  $("#mSku").textContent = p.sku;
  $("#mTitle").textContent = p.name;
  $("#mDesc").textContent = p.desc;
  $("#mPrice").textContent = formatMoney(p.price);
  $("#mWas").textContent = p.was ? `Antes: ${formatMoney(p.was)}` : "";
  $("#mChips").innerHTML = `
    ${p.sizes.map(s => `<span class="chip">${s}</span>`).join("")}
    ${p.tags.map(t => `<span class="chip">${t}</span>`).join("")}
  `;

  $("#mWhats").href = waLink(`Hola, me interesa ${p.name} (${p.sku}). ¿Disponible?`);

  $("#modal").classList.add("show");
  $("#modal").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  $("#modal").classList.remove("show");
  $("#modal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function setMenu(open){
  const nav = $("#nav");
  const overlay = $("#overlay");
  const btn = $("#menuBtn");
  nav.classList.toggle("is-open", open);
  overlay.hidden = !open;
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.style.overflow = open ? "hidden" : "";
}

function init(){
  $("#statTotal").textContent = products.length;
  $("#year").textContent = new Date().getFullYear();
  $("#whatsText").textContent = `+${WHATSAPP_NUMBER}`;

  $("#category").innerHTML = getCategories().map(c => `<option>${c}</option>`).join("");
  $("#tag").innerHTML = getTags().map(t => `<option>${t}</option>`).join("");

  renderFeatured();

  renderGrid(offers3(), $("#offersGrid"));
  renderGrid(products, $("#grid"));

  renderGrid(pick3("Ropa"), $("#ropaGrid"));
  renderGrid(pick3("Carteras"), $("#carterasGrid"));
  renderGrid(pick3("Bolsos"), $("#bolsosGrid"));
  renderGrid(pick3("Perfumes"), $("#perfumesGrid"));
  renderGrid(pick3("Maquillaje"), $("#maquillajeGrid"));
  renderGrid(pick3("Accesorios"), $("#accesoriosGrid"));

  $("#apply").addEventListener("click", applyFilters);
  $("#reset").addEventListener("click", () => {
    $("#q").value = "";
    $("#category").value = "Todas";
    $("#tag").value = "Todas";
    $("#maxPrice").value = "";
    applyFilters();
  });

  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name").value.trim();
    const msg = $("#msg").value.trim();
    window.open(waLink(`Hola soy ${name}. ${msg}`), "_blank");
  });

  document.body.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open]");
    if(openBtn){
      openModal(Number(openBtn.getAttribute("data-open")));
      return;
    }

    const quick = e.target.closest("[data-quick]");
    if(quick){
      const cat = quick.getAttribute("data-quick");
      $("#category").value = cat;
      $("#tag").value = "Todas";
      $("#maxPrice").value = "";
      $("#q").value = "";
      applyFilters();
      return;
    }
  });

  $("#closeModal").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", (e) => { if(e.target.id === "modal") closeModal(); });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
      closeModal();
      setMenu(false);
    }
  });

  $("#menuBtn").addEventListener("click", () => setMenu(!$("#nav").classList.contains("is-open")));
  $("#overlay").addEventListener("click", () => setMenu(false));
  $("#nav").querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
}

init();
