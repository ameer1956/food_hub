
function getCart() {
    return JSON.parse(localStorage.getItem("foodHubCart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("foodHubCart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countPlace = document.getElementById("cart-count");

    if (countPlace) {
        let count = 0;
        const cart = getCart();

        cart.forEach(function (item) {
            count = count + item.quantity;
        });

        countPlace.textContent = count;
    }
}

function formatPrice(price) {
    return price.toFixed(2) + " €";
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});

// Demo contact form
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        document.getElementById("contact-result").textContent =
            "Thank you! Your demo message was received.";

        contactForm.reset();
    });
}