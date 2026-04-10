import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

// Initialize CheckoutProcess
// Pass the localStorage key AND the container for order summary
const myCheckout = new CheckoutProcess("so-cart", ".order-summary");
myCheckout.init();

// Calculate totals immediately on page load
document.addEventListener("DOMContentLoaded", () => {
  myCheckout.calculateOrderTotal();
});

// Recalculate totals after ZIP is entered (optional if shipping changes)
const zipInput = document.querySelector("input[name='zip']");

if (zipInput) {
  zipInput.addEventListener("blur", () => {
    myCheckout.calculateOrderTotal();
  });
}

// Handle form submission
const form = document.querySelector("#checkout-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    //alert("Please fill all fields correctly.");
    form.reportValidity(); //better UX than alert
    return;
  }

  // Use CheckoutProcess to handle checkout logic
  myCheckout.checkout(form);
});
