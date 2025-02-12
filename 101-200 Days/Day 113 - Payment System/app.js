// Grab form elements
const paymentForm = document.getElementById("paymentForm");
const cardName = document.getElementById("cardName");
const cardNumber = document.getElementById("cardNumber");
const cardExpiry = document.getElementById("cardExpiry");
const cardCVC = document.getElementById("cardCVC");
const messageContainer = document.getElementById("message");

// Add card number formatting with spaces
function formatCardNumber(value) {
  return value
    .replace(/\D/g, "") // Remove all non-digits
    .replace(/(\d{4})(?=\d)/g, "$1 "); // Add space after every 4 digits
}

// Handle card number input formatting
cardNumber.addEventListener("input", function (e) {
  const target = e.target;
  const position = target.selectionStart; // Get current cursor position
  const formatted = formatCardNumber(target.value);

  // Update value and preserve cursor position
  target.value = formatted;

  // Adjust cursor position accounting for added spaces
  const originalCleaned = target.value
    .replace(/\D/g, "")
    .substring(0, position);
  let newPosition = 0;
  let digitCount = 0;

  for (let i = 0; i < formatted.length; i++) {
    if (formatted[i] !== " ") digitCount++;
    if (digitCount === originalCleaned.length) {
      newPosition = i + 1;
      break;
    }
  }

  target.setSelectionRange(newPosition, newPosition);
});

// Rest of your existing code remains unchanged below...
// [Keep all your existing functions: showMessage, validatePaymentDetails, processPayment, and the form submit handler]
var stripe = Stripe ( //Stripe Account required
  "pk_test_iO0OmHJjHiksR0HjyoUOSMNS0017Q3B9xA"
)

document.getElementById("checkout").addEventListener("click", function () {
  Stripe.redirectToCheckout({
    lineItems: [
      {
        price: "", // for Price API ID
        quantity: 1,
      },
    ],
    mode: "subscription",
    successUrl: "https://www.google.com/",
    cancleUrl: "https://www.x.com/",
  }).then(function(result){
    alert(result)
  });
})
