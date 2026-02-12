const WHATSAPP_NUMBER="50500000000"
const CURRENCY="USD"

const motos=[
{
id:1,
nombre:"Honda CB 190R",
marca:"Honda",
precio:2450,
tipo:"Sport",
cc:190,
desc:"Moto sport ligera ideal para ciudad y carretera.",
img:"img/honda-cb190r.png",
tags:["Inyección","LED","5 cambios"]
},
{
id:2,
nombre:"Yamaha FZ-S 150",
marca:"Yamaha",
precio:2200,
tipo:"Naked",
cc:150,
desc:"Diseño urbano con excelente consumo.",
img:"img/yamaha-fzs150.png",
tags:["ABS","Ciudad","Económica"]
},
{
id:3,
nombre:"Suzuki GN 125",
marca:"Suzuki",
precio:1550,
tipo:"Clásica",
cc:125,
desc:"Confiable y perfecta para trabajo diario.",
img:"img/suzuki-gn125.png",
tags:["Duradera","Bajo consumo","Trabajo"]
}
]

const $=s=>document.querySelector(s)

const formatMoney=n=>new Intl.NumberFormat("es-NI",{style:"currency",currency:CURRENCY,maximumFractionDigits:0}).format(n)

const waLink=t=>`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t)}`

function renderGrid(list){
$("#grid").innerHTML=list.map(m=>`
<article class="card">
<img src="${m.img}">
<b>${m.nombre}</b>
<div>${m.tipo} · ${m.cc}cc</div>
<a class="btn btn--primary" target="_blank" href="${waLink(`Hola, me interesa la ${m.nombre}`)}">WhatsApp</a>
<div>${formatMoney(m.precio)}</div>
</article>
`).join("")
}

function init(){
renderGrid(motos)

const menuBtn=$("#menuBtn")
const nav=$("#nav")

if(menuBtn&&nav){
menuBtn.addEventListener("click",()=>{
nav.style.display=nav.style.display==="flex"?"none":"flex"
nav.style.flexDirection="column"
nav.style.position="absolute"
nav.style.top="62px"
nav.style.right="4%"
nav.style.padding="12px"
nav.style.background="rgba(11,15,23,.95)"
})
}
}

init()
