const promoModalContainer = document.querySelector(".promo-modal-container");
const promoModal = document.querySelector(".promo-modal");



let visitDate = new Date().toISOString();
let deltaTime;


window.addEventListener("DOMContentLoaded", (e) => {

    function showPromoModal() {
        let visitDate = new Date().toISOString();
        deltaTime = Math.abs(new Date(localStorage.getItem("whenPromoModalWasShown")) - new Date(visitDate))
        if (!localStorage.getItem("whenPromoModalWasShown")) {
            promoModalContainer.style.visibility = "visible";
            localStorage.setItem("whenPromoModalWasShown", new Date().toISOString());
        } else if (deltaTime > 86400000) {
            promoModalContainer.style.visibility = "visible";
            localStorage.setItem("whenPromoModalWasShown", new Date().toISOString());
        }
    }

    setTimeout(showPromoModal, 10000)

    promoModalContainer.addEventListener("click", (e) => {
        if (e.target === promoModalContainer) {
            promoModalContainer.style.visibility = "hidden";
        }
    })

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            promoModalContainer.style.visibility = "hidden";
        }
    })

    document.addEventListener("mouseleave", showPromoModal);

    document.querySelector(".promo-modal-close-button").addEventListener("click", (e) => {
        promoModalContainer.style.visibility = "hidden";
    });
});





