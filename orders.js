
const ordersPlace = document.getElementById("orders-list");

if (ordersPlace) {
    const orders = JSON.parse(localStorage.getItem("foodHubOrders")) || [];

    if (orders.length === 0) {
        ordersPlace.innerHTML = "<p>You have no orders yet.</p>";
    } else {
        orders.reverse();

        orders.forEach(function (order) {
            let foodNames = "";

            order.items.forEach(function (item) {
                foodNames += item.name;

                if (item.option) {
                    foodNames += " (" + item.option + ")";
                }

                foodNames += " x " + item.quantity + ", ";
            });

            ordersPlace.innerHTML += `
                <div class="simple-box mb-3">
                    <h2>Order #${order.number}</h2>
                    <p>Date: ${order.date}</p>
                    <p>Food: ${foodNames}</p>
                    <p>Name: ${order.name}</p>
                    <p>Address: ${order.address}</p>
                    <p class="food-price">Total: ${formatPrice(order.total)}</p>
                </div>
            `;
        });
    }
}