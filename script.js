// ================================
// GUHAYA INNOVATION
// script.js
// ================================


// Smooth Scroll

document.querySelectorAll('nav a').forEach(anchor => {

anchor.addEventListener('click', function(e){

e.preventDefault();

const target = document.querySelector(this.getAttribute('href'));

target.scrollIntoView({

behavior:'smooth'

});

});

});




// Fade In Animation on Scroll

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:0.15

}

);



document.querySelectorAll(

".card,.service-card,.industry,.contact-box"

).forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});




// Hero Animation

window.addEventListener("load",()=>{

const hero=document.querySelector(".hero-content");

hero.style.opacity="0";

hero.style.transform="translateY(40px)";



setTimeout(()=>{

hero.style.transition="all 1s ease";

hero.style.opacity="1";

hero.style.transform="translateY(0)";

},300);

});




// Service Card Hover Effect

const cards=document.querySelectorAll(".service-card");



cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px) scale(1.03)";

});



card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0) scale(1)";

});

});




// Floating WhatsApp Pulse

const whatsapp=document.querySelector(".float");



setInterval(()=>{

whatsapp.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.1)"

},

{

transform:"scale(1)"

}

],{

duration:1000

});

},2500);




console.log(

"GUHAYA INNOVATION WEBSITE LOADED SUCCESSFULLY"

);
