import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

// Initialize CheckoutProcess
// Pass the localStorage key AND the container for order summary
const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

// Calculate totals immediately on page load
document.addEventListener("DOMContentLoaded", () => {
  checkout.calculateOrderTotal();
});

// Recalculate totals after ZIP is entered (optional if shipping changes)
const zipInput = document.querySelector("input[name='zip']");
zipInput.addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

// Handle form submission
const form = document.querySelector("#checkout-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    alert("Please fill all fields correctly.");
    return;
  }

  // Use CheckoutProcess to handle checkout logic
  checkout.checkout(form);
});
