import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;       // ID of the product to display
    this.product = {};                // Will hold the fetched product data
    this.dataSource = dataSource;     // Instance of ExternalServices
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        document.querySelector(".product-detail").innerHTML = "<p>Product not found.</p>";
        return;
      }
      this.renderProductDetails();

      // Add to cart button listener
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addProductToCart.bind(this));
      
    } catch (err) {
      console.error("Failed to load product:", err);
      document.querySelector(".product-detail").innerHTML = "<p>Error loading product.</p>";
    }
  }

  renderProductDetails() {
    const product = this.product;

    // Brand and name
    document.getElementById("product-title").textContent = product.Brand?.Name || "Brand";
    document.querySelector("h2").textContent = product.NameWithoutBrand || product.Name || "Product";

    // Image
    const productImg = document.getElementById("product-img");
    productImg.src = product.Images?.PrimaryMedium || "placeholder.jpg";
    productImg.alt = product.NameWithoutBrand || product.Name || "Product";

    // Price
    document.getElementById("product-price").textContent = `$${(product.FinalPrice || 0).toFixed(2)}`;

    // Discount
    const discount = (product.SuggestedRetailPrice || 0) - (product.FinalPrice || 0);
    document.getElementById("product-discount").textContent = discount > 0
      ? `You save $${discount.toFixed(2)}!`
      : "";

    // Color
    document.getElementById("product-color").textContent = product.Colors?.[0]?.ColorName || "N/A";

    // Description
    document.getElementById("product-description").innerHTML = product.DescriptionHtmlSimple || "No description available";

    // Add to cart button dataset
    document.getElementById("addToCart").dataset.id = product.Id || product.id;
  }

  addProductToCart() {
    if (!this.product.Id && !this.product.id) return;

    const productId = this.product.Id || this.product.id;

    // Get existing cart from localStorage
    const cart = getLocalStorage("so-cart") || [];

    // Check if product is already in cart
    const existingProduct = cart.find((item) => item.Id === productId);
    if (existingProduct) {
      existingProduct.Quantity += 1;
    } else {
      cart.push({
        Id: productId,
        Name: this.product.NameWithoutBrand || this.product.Name || "Product",
        Brand: this.product.Brand?.Name || "",
        Image: this.product.Images?.PrimaryMedium || "placeholder.jpg",
        FinalPrice: this.product.FinalPrice || 0,
        Quantity: 1,
      });
    }

    // Save updated cart
    setLocalStorage("so-cart", cart);
    alert(`${this.product.NameWithoutBrand || this.product.Name} added to cart!`);
  }

  
}