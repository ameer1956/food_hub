
const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {
    const totalPlace = document.getElementById("checkout-total");
    const message = document.getElementById("checkout-message");

    // Show the total
    function showTotal() {
        let total = 0;
        const cart = getCart();

        cart.forEach(function (item) {
            total += item.price * item.quantity;
        });

        totalPlace.textContent = formatPrice(total);
    }

    showTotal();

    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const cart = getCart();

        if (cart.length === 0) {
            message.textContent = "Your cart is empty.";
            return;
        }

        const name = document.getElementById("checkout-name").value;
        const address = document.getElementById("checkout-address").value;

        let total = 0;

        cart.forEach(function (item) {
            total += item.price * item.quantity;
        });

        const orders = JSON.parse(localStorage.getItem("foodHubOrders")) || [];

        const order = {
            number: Date.now(),
            name: name,
            address: address,
            items: cart,
            total: total,
            date: new Date().toLocaleString()
        };

        orders.push(order);

        localStorage.setItem("foodHubOrders", JSON.stringify(orders));
        saveCart([]);

        checkoutForm.reset();
        showTotal();

        message.textContent = "Order placed! Visit the Orders page to see it.";
    });
}