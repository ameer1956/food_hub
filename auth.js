
const registerForm = document.getElementById("register-form");

// Register an account
if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value.toLowerCase();
        const password = document.getElementById("register-password").value;
        const message = document.getElementById("auth-message");

        const users = JSON.parse(localStorage.getItem("foodHubUsers")) || [];

        const existingUser = users.find(function (user) {
            return user.email === email;
        });

        if (existingUser) {
            message.textContent = "This email is already registered.";
            return;
        }

        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem("foodHubUsers", JSON.stringify(users));

        message.textContent = "Account created! You can now log in.";
        registerForm.reset();
    });
}

const loginForm = document.getElementById("login-form");

// Log in to an account
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("login-email").value.toLowerCase();
        const password = document.getElementById("login-password").value;
        const message = document.getElementById("auth-message");

        const users = JSON.parse(localStorage.getItem("foodHubUsers")) || [];

        const user = users.find(function (savedUser) {
            return savedUser.email === email && savedUser.password === password;
        });

        if (user) {
            message.textContent = "Welcome back, " + user.name + "!";
        } else {
            message.textContent = "Email or password is incorrect.";
        }
    });
}