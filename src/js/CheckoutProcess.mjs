import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
      0
    );

    const itemCount = this.list.reduce(
      (count, item) => count + (item.Quantity || 1),
      0
    );

    // display subtotal
    document.querySelector(`${this.outputSelector} #subtotal`)
      .innerText = `$${this.itemTotal.toFixed(2)}`;

    this.itemCount = itemCount;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    this.shipping =
      this.itemCount > 0 ? 10 + (this.itemCount - 1) * 2 : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector("#tax").innerText = `$${this.tax.toFixed(2)}`;
    document.querySelector("#shipping").innerText = `$${this.shipping.toFixed(2)}`;
    document.querySelector("#orderTotal").innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.Quantity || 1
    }));
  }

  async checkout(form) {
    this.calculateOrderTotal();

    const formData = new FormData(form);
    const orderData = {};

    formData.forEach((value, key) => {
      orderData[key] = value;
    });

    orderData.orderDate = new Date().toISOString();
    orderData.items = this.packageItems(this.list);
    orderData.orderTotal = this.orderTotal.toFixed(2);
    orderData.shipping = Number(this.shipping);
    orderData.tax = this.tax.toFixed(2);

    console.log("Sending order:", orderData); // 🔥 DEBUG

    try {
      const result = await this.services.checkout(orderData);
      //alert("Order successful!");
      localStorage.removeItem(this.key); //Clear the cart
      console.log(result);

      const btn = document.querySelector(".checkout-submit");
      btn.disabled = true;

      //redirect to success page
      window.location.href = "/checkout/success.html";

    } catch (err) {
      console.log("SERVER ERROR:", err.message);
      //alert("Checkout failed! Check console.");
      this.displayError(err.message);
    }
  }

  displayError(message) {
    const errorElement = document.querySelector("#error-message");

    if (!errorElement) return;

    errorElement.innerHTML = "";

    if (Array.isArray(message)) {
      message.forEach(err => {
        errorElement.innerHTML += `<p>${err}</p>`;
      });
    } else if (typeof message === "object") {
      errorElement.innerHTML += `<p>${JSON.stringify(message)}</p>`;
    } else {
      errorElement.innerHTML += `<p>${message}</p>`;
    }
  }
}