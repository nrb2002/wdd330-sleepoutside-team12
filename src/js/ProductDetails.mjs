// js/ProductDetails.mjs
import ProductData from "./ProductData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;       // ID of the product to display
    this.product = {};                // Will hold the fetched product data
    this.dataSource = dataSource;     // Instance of ProductData
  }

  // Initialize: fetch the product and render
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    if (!this.product) {
      console.error(`Product with ID ${this.productId} not found`);
      return;
    }
    this.renderProductDetails();
    this.attachAddToCart();
  }

  // Render the product details in the HTML
  renderProductDetails() {
    const detailSection = document.querySelector(".product-detail");
    if (!detailSection) return;

    // Brand
    const brandEl = detailSection.querySelector("h3");
    if (brandEl) brandEl.textContent = this.product.Brand?.Name || "";

    // Product name
    const nameEl = detailSection.querySelector("h2");
    if (nameEl) nameEl.textContent = this.product.NameWithoutBrand || "";

    // Image
    const imgEl = detailSection.querySelector("img");
    if (imgEl) {
      imgEl.src = this.product.Image || "";
      imgEl.alt = this.product.Name || "Product image";
    }

    // Price
    const priceEl = detailSection.querySelector(".product-card__price");
    if (priceEl) priceEl.textContent = `$${this.product.FinalPrice?.toFixed(2) || "0.00"}`;

    // Color
    const colorEl = detailSection.querySelector(".product__color");
    if (colorEl) colorEl.textContent = this.product.Colors?.[0]?.ColorName || "N/A";

    // Description
    const descEl = detailSection.querySelector(".product__description");
    if (descEl) descEl.innerHTML = this.product.DescriptionHtmlSimple || "";
  }

  // Add product to cart and update localStorage
  addProductToCart() {
    if (!this.product.Id) return;

    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product is already in cart
    const existing = cart.find((item) => item.Id === this.product.Id);
    if (existing) {
      existing.Quantity += 1; // increment quantity
    } else {
      cart.push({
        Id: this.product.Id,
        Name: this.product.NameWithoutBrand,
        Brand: this.product.Brand?.Name || "",
        Image: this.product.Image,
        FinalPrice: this.product.FinalPrice,
        Quantity: 1,
      });
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${this.product.NameWithoutBrand} added to cart`);
  }

  // Attach click event to the add to cart button
  attachAddToCart() {
    const btn = document.querySelector("#addToCart");
    if (!btn) return;

    btn.addEventListener("click", () => this.addProductToCart());
  }
}