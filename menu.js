
const menuPlace = document.getElementById("menu-items");
const searchBox = document.getElementById("menu-search");
const categoryBox = document.getElementById("menu-category");

// Show the food
function displayMenu(items) {
    if (items.length === 0) {
        menuPlace.innerHTML = "<p>No food found.</p>";
        return;
    }

    menuPlace.innerHTML = "";

    items.forEach(function (food) {
        let choices = "";

        if (food.options) {
            choices = "<p>Choose an option:</p><div class='option-list'>";

            food.options.forEach(function (option, index) {
                let active = "";

                if (index === 0) {
                    active = "active";
                }

                choices += `
                    <button class="option-button ${active}"
                        data-option="${option}" type="button">
                        ${option}
                    </button>
                `;
            });

            choices += "</div>";
        }

        menuPlace.innerHTML += `
            <div class="col-md-4">
                <div class="food-card" data-id="${food.id}">
                    <img src="${food.image}" alt="${food.name}">
                    <h3>${food.name}</h3>
                    <p>${food.description}</p>
                    <p class="food-price">${formatPrice(food.price)}</p>
                    ${choices}
                    <button class="btn btn-food add-button" type="button">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
}

// Search and filter food
function filterMenu() {
    const search = searchBox.value.toLowerCase();
    const category = categoryBox.value;

    const results = foodItems.filter(function (food) {
        const nameMatches = food.name.toLowerCase().includes(search);
        const categoryMatches = category === "All" || food.category === category;

        return nameMatches && categoryMatches;
    });

    displayMenu(results);
}

if (menuPlace) {
    displayMenu(foodItems);

    searchBox.addEventListener("input", filterMenu);
    categoryBox.addEventListener("change", filterMenu);

    menuPlace.addEventListener("click", function (event) {
        // Select an option
        if (event.target.classList.contains("option-button")) {
            const card = event.target.closest(".food-card");
            const buttons = card.querySelectorAll(".option-button");

            buttons.forEach(function (button) {
                button.classList.remove("active");
            });

            event.target.classList.add("active");
        }

        // Add food to cart
        if (event.target.classList.contains("add-button")) {
            const card = event.target.closest(".food-card");
            const id = Number(card.dataset.id);

            const food = foodItems.find(function (item) {
                return item.id === id;
            });

            const selected = card.querySelector(".option-button.active");
            let option = "";

            if (selected) {
                option = selected.dataset.option;
            }

            const cart = getCart();

            const existing = cart.find(function (item) {
                return item.id === id && item.option === option;
            });

            if (existing) {
                existing.quantity++;
            } else {
                cart.push({
                    id: food.id,
                    name: food.name,
                    option: option,
                    image: food.image,
                    price: food.price,
                    quantity: 1
                });
            }

            saveCart(cart);
            event.target.textContent = "Added!";
        }
    });
}