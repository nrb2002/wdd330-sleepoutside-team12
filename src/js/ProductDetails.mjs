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

   // Add product to cart and update localStorage
  addProductToCart() {
    if (!this.product.Id) return;

    // Get existing cart from localStorage
    const cart = getLocalStorage("so-cart") || [];

    // Check if product is already in cart
    const existingProduct = cart.find((item) => item.Id === this.product.Id);
    if (existingProduct) {
      existingProduct.Quantity += 1; // increment quantity
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
    setLocalStorage("so-cart", cart);
    //alert(`${this.product.NameWithoutBrand} added to cart`);
  }

  renderProductDetails() {
    productInfoTemplate(this.product);
  }

// Attach click event to the add to cart button
  attachAddToCart() {
    const btn = document.querySelector("#addToCart");
    if (!btn) return;

    btn.addEventListener("click", () => this.addProductToCart());
  }
}
function productInfoTemplate(product) {
  const detailSection = document.querySelector(".product-detail");
  if (!detailSection) return;

  // Brand
  const brandEl = detailSection.querySelector("h3");
  if (brandEl) brandEl.textContent = product.Brand?.Name || "";

  // Product name
  const nameEl = detailSection.querySelector("h2");
  if (nameEl) nameEl.textContent = product.NameWithoutBrand || "";

  // Image
  const imgEl = detailSection.querySelector("img");
  if (imgEl) {
    imgEl.src = product.Image || "";
    imgEl.alt = product.Name || "Product image";
  }

  // Price
  const priceEl = detailSection.querySelector(".product-card__price");
  if (priceEl) {
    priceEl.textContent = `$${product.FinalPrice?.toFixed(2) || "0.00"}`;
  }

  // Color
  const colorEl = detailSection.querySelector(".product__color");
  if (colorEl) {
    colorEl.textContent = product.Colors?.[0]?.ColorName || "N/A";
  }

  // Description
  const descEl = detailSection.querySelector(".product__description");
  if (descEl) {
    descEl.innerHTML = product.DescriptionHtmlSimple || "";
  }
}

 

  
