
const navbar = document.getElementById("navbar");

navbar.innerHTML = `
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="index.html">Food Hub</a>

            <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#main-menu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="main-menu">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="menu.html">Menu</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="cart.html">
                            Cart (<span id="cart-count">0</span>)
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="orders.html">Orders</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact.html">Contact</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="login.html">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="register.html">Register</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
`;

const footer = document.getElementById("footer");

footer.innerHTML = `
    <footer class="footer">
        <p>Food Hub - Good food, simple choices.</p>
    </footer>
`;