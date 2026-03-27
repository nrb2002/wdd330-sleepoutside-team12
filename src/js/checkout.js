import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
<<<<<<< Updated upstream
=======

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.addEventListener("DOMContentLoaded", () => {
  checkout.calculateOrderTotal();

  const zipInput = document.querySelector("input[name='zip']");
  if (zipInput) {
    zipInput.addEventListener("blur", () => {
      checkout.calculateOrderTotal();
    });
  }

  const form = document.querySelector("#checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        alert("Please fill all fields correctly.");
        return;
      }

      checkout.checkout(form);
    });
  }
});
>>>>>>> Stashed changes
