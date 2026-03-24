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
    alert(`${this.product.NameWithoutBrand} added to cart`);
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
  const pageTitle = document.getElementById("product-title");
  pageTitle.textContent = product.Name;

  document.querySelector("h3").textContent = product.Brand.Name;
  document.querySelector("h2").textContent = product.NameWithoutBrand;

  const productImg = document.getElementById("product-img");
  productImg.src = product.Image;
  productImg.alt = product.NameWithoutBrand;

  document.getElementById("product-price").textContent = `$${product.FinalPrice}`;

  const discount = product.SuggestedRetailPrice - product.FinalPrice;
  const discountRounded = discount.toFixed(2);
  if (discountRounded > 0) {
    document.getElementById("product-discount").textContent = `You have a discount of $${discountRounded}!`;
  }

  document.getElementById("product-color").textContent = product.Colors[0].ColorName;
  document.getElementById("product-description").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}

 

  
