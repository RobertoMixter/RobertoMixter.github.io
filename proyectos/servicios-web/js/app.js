const WHATSAPP_NUMBER = "50589362396";

const $ = (sel) => document.querySelector(sel);

function waLink(text){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
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

function initMenu(){
  $("#menuBtn").addEventListener("click", () => setMenu(!$("#nav").classList.contains("is-open")));
  $("#overlay").addEventListener("click", () => setMenu(false));
  $("#nav").querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
}

function initFaq(){
  const faq = $("#faq");
  if(!faq) return;

  const items = Array.from(faq.querySelectorAll(".faq__item"));
  items.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const isOpen = panel.style.display === "block";

      items.forEach((b) => {
        const p = b.nextElementSibling;
        p.style.display = "none";
        b.querySelector(".faq__icon").textContent = "+";
      });

      panel.style.display = isOpen ? "none" : "block";
      btn.querySelector(".faq__icon").textContent = isOpen ? "+" : "−";
    });
  });
}

function initPlans(){
  document.body.addEventListener("click", (e) => {
    const b = e.target.closest("[data-plan]");
    if(!b) return;

    const plan = b.getAttribute("data-plan");
    const text = `Hola, me interesa el plan ${plan}. Quiero una web similar a las demos. ¿Qué necesito enviar para iniciar y cuándo pueden entregarla?`;
    window.open(waLink(text), "_blank");
  });
}

function initForm(){
  $("#whatsText").textContent = `+${WHATSAPP_NUMBER}`;
  $("#year").textContent = new Date().getFullYear();

  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name").value.trim();
    const biz = $("#biz").value.trim();
    const msg = $("#msg").value.trim();
    const text = `Hola, soy ${name}. Mi negocio es: ${biz}. ${msg}`;
    window.open(waLink(text), "_blank");
  });

  const waFloat = $("#waFloat");
  if(waFloat){
    waFloat.href = waLink("Hola, quiero cotizar una página web.");
  }
}

initMenu();
initFaq();
initPlans();
initForm();
