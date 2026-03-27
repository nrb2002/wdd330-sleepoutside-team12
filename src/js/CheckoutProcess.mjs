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

    const subtotalEl = document.querySelector(`${this.outputSelector} #subtotal`);
    if (subtotalEl) {
      subtotalEl.innerText = `$${this.itemTotal.toFixed(2)}`;
    }

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
    const taxEl = document.querySelector("#tax");
    const shippingEl = document.querySelector("#shipping");
    const totalEl = document.querySelector("#orderTotal");

    if (taxEl) taxEl.innerText = `$${this.tax.toFixed(2)}`;
    if (shippingEl) shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
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

    console.log("Sending order:", orderData);

    try {
      const result = await this.services.checkout(orderData);
      alert("Order successful!");

      localStorage.removeItem(this.key);
      console.log(result);

    } catch (err) {
      console.error("SERVER ERROR:", err);
      alert("Checkout failed! Check console.");
    }
  }
}