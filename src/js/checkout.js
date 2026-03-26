import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

// initialize checkout process
const checkout = new CheckoutProcess("so-cart", "body");
checkout.init();

// calculate totals AFTER zip is entered
document
  .querySelector("input[name='zip']")
  .addEventListener("blur", () => {
    checkout.calculateOrderTotal();
  });

// handle form submission
document
  .querySelector("#checkout-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;

    if (!form.checkValidity()) {
      alert("Please fill all fields correctly.");
      return;
    }

    checkout.checkout(form);
  });