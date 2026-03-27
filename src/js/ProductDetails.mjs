import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
<<<<<<< Updated upstream
    this.productId = productId;       // ID of the product to display
    this.product = {};                // Will hold the fetched product data
    this.dataSource = dataSource;     // Instance of ProductData
=======
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
>>>>>>> Stashed changes
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
<<<<<<< Updated upstream
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
=======
    if (this.product) {
      this.renderProductDetails();
      const addBtn = document.getElementById("addToCart");
      if (addBtn) {
        addBtn.addEventListener("click", this.addProductToCart.bind(this));
      }
    }
>>>>>>> Stashed changes
  }

  addProductToCart() {
    if (!this.product.Id) return;

    const cart = getLocalStorage("so-cart") || [];

    const existingProduct = cart.find((item) => item.Id === this.product.Id);
    if (existingProduct) {
      existingProduct.Quantity += 1;
    } else {
      cart.push({
        Id: this.product.Id,
        Name: this.product.NameWithoutBrand || this.product.Name,
        Brand: this.product.Brand?.Name || "",
        Image: this.product.Image || "",
        FinalPrice: this.product.FinalPrice || 0,
        Quantity: 1,
      });
    }

    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    productInfoTemplate(this.product);
  }
}

function productInfoTemplate(product) {
  const pageTitle = document.getElementById("product-title");
  if (pageTitle) pageTitle.textContent = product.Name || "";

  const brandEl = document.querySelector("h3");
  if (brandEl) brandEl.textContent = product.Brand?.Name || "";

  const nameEl = document.querySelector("h2");
  if (nameEl) nameEl.textContent = product.NameWithoutBrand || product.Name || "";

  const productImg = document.getElementById("product-img");
  if (productImg) {
    productImg.src = product.Image || "";
    productImg.alt = product.NameWithoutBrand || product.Name || "";
  }

  const priceEl = document.getElementById("product-price");
  if (priceEl) priceEl.textContent = `$${product.FinalPrice ?? 0}`;

  const discountEl = document.getElementById("product-discount");
  const discount = (product.SuggestedRetailPrice ?? 0) - (product.FinalPrice ?? 0);
  if (discountEl && discount > 0) {
    discountEl.textContent = `You have a discount of $${discount.toFixed(2)}!`;
  }

  const colorEl = document.getElementById("product-color");
  if (colorEl && product.Colors?.[0]) {
    colorEl.textContent = product.Colors[0].ColorName || "";
  }

  const descEl = document.getElementById("product-description");
  if (descEl) descEl.innerHTML = product.DescriptionHtmlSimple || "";

  const addBtn = document.getElementById("addToCart");
  if (addBtn) addBtn.dataset.id = product.Id || "";
}