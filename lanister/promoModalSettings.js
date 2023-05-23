const promoModalContainer = document.querySelector(".promo-modal-container");
const promoModal = document.querySelector(".promo-modal");

const promoModalFormContainer = document.querySelector(".promo-modal-form-container");
const successMessage = document.querySelector(".enroll-success");

const promoModalButtons = document.querySelectorAll(".promo-modal-btn");

let visitDate = new Date().toISOString();
let deltaTime;


window.addEventListener("DOMContentLoaded", (e) => {

    function hideBodyScroll() {
        if ((!('ontouchstart' in window) ||
            (navigator.maxTouchPoints === 0) ||
            (navigator.msMaxTouchPoints === 0)) && document.body.scrollHeight > window.innerHeight) {
            document.body.classList.add("hide-body-scroll");
        }

    }

    function showPromoModalOnceDay () {
        let visitDate = new Date().toISOString();
        deltaTime = Math.abs(new Date(localStorage.getItem("whenPromoModalWasShown")) - new Date(visitDate))
        if (!localStorage.getItem("whenPromoModalWasShown")) {
            promoModalContainer.classList.remove("hidden");
            hideBodyScroll();
            localStorage.setItem("whenPromoModalWasShown", new Date().toISOString());
        } else if (deltaTime > 86400000) {
            promoModalContainer.classList.remove("hidden");
            hideBodyScroll();
            localStorage.setItem("whenPromoModalWasShown", new Date().toISOString());
        }
    }

    function closePromoModal() {
        promoModalContainer.classList.add("hidden");
        promoModalFormContainer.classList.remove("hidden");
        successMessage.classList.add("hidden");
        document.body.classList.remove("hide-body-scroll");
    }

    setTimeout(showPromoModalOnceDay, 10000)

    promoModalContainer.addEventListener("click", (e) => {
        if (e.target === promoModalContainer) {
            closePromoModal();
        }
    })

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closePromoModal();
        }
    })

    document.addEventListener("mouseleave", showPromoModalOnceDay);

    document.querySelector(".promo-modal-close-button").addEventListener("click", (e) => {
        closePromoModal();
    });

    promoModalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            promoModalContainer.classList.remove("hidden");
            hideBodyScroll();
        })
    })
});


// Валидация формы

const submitButton = document.querySelector(".promo-modal-form-btn");

const nameInput = document.querySelector("#name");
const telInput = document.querySelector("#mobile");
const warning = document.querySelector(".enroll-warning");


const mobileRegex = /\(\d{3}\)\s\d{3}-\d{2}-\d{2}/;

// function postRequest(name, mobile) {
//     fetch("", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id: 1, name: name, mobile: mobile }),
//     });
// }

submitButton.onclick = (e) => {
    e.preventDefault();
    if (nameInput.value !== "" && mobileRegex.test(telInput.value)) {
        warning.classList.add("hidden");
        promoModalFormContainer.classList.add("hidden");
        successMessage.classList.remove("hidden");
        // postRequest(nameInput.value, telInput.value.replace(/\D/g, ""));
        nameInput.value = "";
        telInput.value = "";
    } else {
        warning.classList.remove("hidden");
    }
};

const getInputNumbersValue = (input) => {
    return input.value.replace(/\D/g, "");
};

const onPhoneInput = (e) => {
	
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";

    if (!inputNumbersValue) {
        return (input.value = "");
    }

    if (input.value.length != selectionStart) {
        // для редактирования номера в середине
        if (e.data && /\D/g.test(e.data)) {
            // при попытке записать не числовой символ
            input.value = inputNumbersValue;
        }
        return;
    }

    // замена первого числа на 7ку

    if (inputNumbersValue[0] !== "7" && inputNumbersValue[0] !== "8")
        inputNumbersValue = "7" + inputNumbersValue;
    const firstSymbols = (inputNumbersValue[0] = "+7");
    formattedInputValue = input.value = firstSymbols + " ";

    // маска номера

    if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
    }
    input.value = formattedInputValue;
};

const onPhonePaste = (e) => {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
    const pasted = e.clipboardData || window.СlipboardData;
    if (pasted) {
        const pastedText = pasted.getData("Text");
        if (/\D/g.test(pastedText)) {
            // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
            // formatting will be in onPhoneInput handler
            input.value = inputNumbersValue;
            return;
        }
    }
};

telInput.addEventListener("input", onPhoneInput);

telInput.addEventListener("paste", onPhonePaste);


