import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        document.querySelector(".product-detail").innerHTML = "<p>Product not found.</p>";
        return;
      }
      this.renderProductDetails();

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

    // Brand and product name
    document.getElementById("product-title").textContent = product.Brand?.Name || "Brand";
    document.querySelector("h2").textContent = product.NameWithoutBrand || product.Name || "Product";

    // Product image
    const productImg = document.getElementById("product-img");
    productImg.src = product.Images?.PrimaryMedium || "placeholder.jpg";
    productImg.alt = product.NameWithoutBrand || product.Name || "Product";

    // Prices
    const finalPrice = product.FinalPrice ?? product.SuggestedRetailPrice ?? 0;
    const originalPrice = product.SuggestedRetailPrice ?? product.ListPrice ?? finalPrice;
    const discount = originalPrice - finalPrice;

    const priceContainer = document.getElementById("product-price");
    if (discount > 0) {
      // Show original price crossed out + final price
      priceContainer.innerHTML = `
        <span class="original-price" style="text-decoration: line-through; color: gray;">
          $${originalPrice.toFixed(2)}
        </span>
        <span class="final-price" style="margin-left: 0.5rem;">
          $${finalPrice.toFixed(2)}
        </span>
      `;
    } else {
      priceContainer.textContent = `$${finalPrice.toFixed(2)}`;
    }

    // Discount savings message
    document.getElementById("product-discount").textContent =
      discount > 0 ? `You save $${discount.toFixed(2)}!` : "";

    // Color
    document.getElementById("product-color").textContent = "Color: " + product.Colors?.[0]?.ColorName || "N/A";

    // Description
    document.getElementById("product-description").innerHTML = `<strong>Product Details: </strong>` +
      product.DescriptionHtmlSimple || "No description available";

    // Add to cart button dataset
    document.getElementById("addToCart").dataset.id = product.Id || product.id;
  }

  addProductToCart() {
    if (!this.product.Id && !this.product.id) return;

    const productId = this.product.Id || this.product.id;
    const cart = getLocalStorage("so-cart") || [];

    const existingProduct = cart.find((item) => item.Id === productId);
    if (existingProduct) {
      existingProduct.Quantity += 1;
    } else {
      // Store both original & final prices for proper cart calculations
      const finalPrice = this.product.FinalPrice ?? this.product.SuggestedRetailPrice ?? 0;
      const originalPrice = this.product.SuggestedRetailPrice ?? this.product.ListPrice ?? finalPrice;

      cart.push({
        Id: productId,
        Name: this.product.NameWithoutBrand || this.product.Name || "Product",
        Brand: this.product.Brand?.Name || "",
        Image: this.product.Images?.PrimaryMedium || "placeholder.jpg",
        FinalPrice: finalPrice,
        SuggestedRetailPrice: originalPrice,
        Quantity: 1,
      });
    }

    setLocalStorage("so-cart", cart);
    // Alert message
    alertMessage(`${this.product.NameWithoutBrand || this.product.Name} added to cart!`, false, "success")
  }
}