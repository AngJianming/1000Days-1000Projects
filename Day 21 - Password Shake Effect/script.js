function validatePassword() {
    const passwordInput = document.getElementById("password");
    const message = document.getElementById("message");

    const correctPassword = "12345"; // Set your correct password here

    if (passwordInput.value === correctPassword) {
        message.textContent = "Login successful!";
        message.style.color = "green";
        passwordInput.classList.remove("shake");
    } else {
        message.textContent = "Incorrect password!";
        passwordInput.classList.add("shake");

        setTimeout(() => {
            passwordInput.classList.remove("shake");
        }, 500);
    }
}
