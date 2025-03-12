// this code creates a popup
// alert('hello');
/*
console.log(2+2);
console.log('sign' + 'in');

// variables
let variable = 3;
console.log(variable);

let calculation = 2 + 2;
console.log(calculation);
console.log(calculation+2);

let result = calculation + 2;
console.log(result);

let message = 'hello';
console.log(message); console.log(';');

variable = 5;
console.log(variable);


variable + 1;
console.log(variable);
*/

// let cartQuantity = 0;
// const cartDisplay = document.getElementById('cart-display');

// function updateCartDisplay() {
//     cartDisplay.textContent = 'Cart Items: ' + cartQuantity;
// }

// function showQuantity() {
//     alert('Cart Quantity: ' + cartQuantity);
// }

// function addToCart(amount) {
//     cartQuantity += amount;
//     updateCartDisplay();
// }

// function resetCart() {
//     cartQuantity = 0;
//     updateCartDisplay();
// }


let cartQuantity = 0;

// Override console.log to display logs on the frontend
const originalConsoleLog = console.log;
console.log = function (message) {
    originalConsoleLog(message); // Keep original console functionality

    let logContainer = document.getElementById('log-container');

    // If log-container doesn't exist, create one
    if (!logContainer) {
        logContainer = document.createElement('div');
        logContainer.id = 'log-container';
        logContainer.style.cssText = `
            text-align: left;
            width: 80%;
            max-height: 200px;
            overflow-y: auto;
            background-color: #222;
            color: #0f0;
            padding: 10px;
            margin: 20px auto;
            border-radius: 8px;
            font-family: monospace;
        `;
        document.body.appendChild(logContainer);
    }

    // Append new log message
    const logMessage = document.createElement('div');
    logMessage.textContent = message;
    logContainer.appendChild(logMessage);

    // Scroll to the latest log
    logContainer.scrollTop = logContainer.scrollHeight;

    // Update Cart Items div
    const cartDisplay = document.getElementById('cart-display');
    if (cartDisplay) {
        cartDisplay.textContent = 'Cart Items: ' + cartQuantity;
    }
};


