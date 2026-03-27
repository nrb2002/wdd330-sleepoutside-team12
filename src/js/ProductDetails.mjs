import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;       // ID of the product to display
    this.product = {};                // Will hold the fetched product data
    this.dataSource = dataSource;     // Instance of ExternalServices
  }
    
  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
    
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
}

function productInfoTemplate(product) {
  const pageTitle = document.getElementById("product-title");
  console.log(product);
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