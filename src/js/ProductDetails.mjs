import { qs, getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = null;
    this.dataSource = dataSource;
  }

  async init() {
    if (!this.productId) {
      console.error("No product ID in URL");
      return;
    }

    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      console.error("Product not found for ID:", this.productId);
      return;
    }

    this.renderProductDetails();

    const addBtn = qs("#addToCart");
    if (addBtn) addBtn.addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    if (!this.product) return;

    let cart = getLocalStorage("so-cart") || [];
    // avoid duplicates
    if (!cart.find(p => p.Id === this.product.Id)) cart.push(this.product);
    setLocalStorage("so-cart", cart);

    console.log("Product added to cart:", this.product);
  }

  renderProductDetails() {
    const section = qs(".product-detail");
    if (!section || !this.product) return;

    section.querySelector("h3").textContent = this.product.Brand?.Name || "Unknown Brand";
    section.querySelector("h2.divider").textContent = this.product.Name || "Unknown Product";

    const img = section.querySelector("img.divider");
    if (img) {
      img.src = this.product.Images?.PrimaryLarge || "/images/placeholder.png";
      img.alt = this.product.Name || "Product Image";
    }

    section.querySelector(".product-card__price").textContent =
      `$${this.product.FinalPrice ?? "0.00"}`;

    section.querySelector(".product__color").textContent =
      this.product.Colors?.[0]?.ColorName || "N/A";

    section.querySelector(".product__description").innerHTML =
      this.product.DescriptionHtmlSimple || "";

    const addButton = section.querySelector("#addToCart");
    if (addButton) addButton.dataset.id = this.product.Id;
  }
}