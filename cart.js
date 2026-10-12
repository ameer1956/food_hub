
const cartPlace = document.getElementById("cart-items");
const totalPlace = document.getElementById("cart-total");

// Show cart items
function displayCart() {
    const cart = getCart();

    if (cart.length === 0) {
        cartPlace.innerHTML = "<p>Your cart is empty.</p>";
        totalPlace.textContent = formatPrice(0);
        return;
    }

    cartPlace.innerHTML = "";
    let total = 0;

    cart.forEach(function (item) {
        total += item.price * item.quantity;

        let optionText = "";

        if (item.option) {
            optionText = "<p>Option: " + item.option + "</p>";
        }

        cartPlace.innerHTML += `
            <div class="cart-row">
                <img src="${item.image}" alt="${item.name}" class="cart-image">

                <div class="cart-details">
                    <h3>${item.name}</h3>
                    ${optionText}
                    <p>${formatPrice(item.price)} each</p>
                </div>

                <button class="quantity-button"
                    data-id="${item.id}" data-option="${item.option}"
                    data-change="-1">-</button>

                <span>${item.quantity}</span>

                <button class="quantity-button"
                    data-id="${item.id}" data-option="${item.option}"
                    data-change="1">+</button>

                <button class="remove-button"
                    data-id="${item.id}" data-option="${item.option}">
                    Remove
                </button>
            </div>
        `;
    });

    totalPlace.textContent = formatPrice(total);
}

if (cartPlace) {
    displayCart();

    cartPlace.addEventListener("click", function (event) {
        const id = Number(event.target.dataset.id);
        const option = event.target.dataset.option || "";

        // Change quantity
        if (event.target.classList.contains("quantity-button")) {
            const change = Number(event.target.dataset.change);
            const cart = getCart();

            cart.forEach(function (item) {
                if (item.id === id && (item.option || "") === option) {
                    item.quantity += change;
                }
            });

            const newCart = cart.filter(function (item) {
                return item.quantity > 0;
            });

            saveCart(newCart);
            displayCart();
        }

        // Remove an item
        if (event.target.classList.contains("remove-button")) {
            const cart = getCart();

            const newCart = cart.filter(function (item) {
                return !(item.id === id && (item.option || "") === option);
            });

            saveCart(newCart);
            displayCart();
        }
    });
}