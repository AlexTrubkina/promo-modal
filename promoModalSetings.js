const promoModalContainer = document.querySelector(".promo-modal-container");

window.addEventListener("DOMContentLoaded", (e) => {
    setTimeout(() => {
        promoModalContainer.style.visibility = "visible";
    }, 10000)
});

document.addEventListener("mouseleave", (e) => {
    
    promoModalContainer.style.visibility = "visible";
});

document.querySelector(".promo-modal-close-button").addEventListener("click", (e) => {
    promoModalContainer.style.visibility = "hidden";
});


