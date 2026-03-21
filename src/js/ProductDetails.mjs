import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    }
    
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
    
  addProductToCart(product) {
    const existingCart = getLocalStorage("so-cart") || [];
    existingCart.push(this.product);
    setLocalStorage("so-cart", existingCart);
  }

  renderProductDetails() {
    productInfoTemplate(this.product);
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

  document.getElementById("product-price").textContent = product.FinalPrice;
  document.getElementById("product-color").textContent = product.Colors[0].ColorName;
  document.getElementById("product-description").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}