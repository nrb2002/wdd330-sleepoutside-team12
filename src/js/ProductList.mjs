import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product, category) {
  const imageUrl = product.Images?.PrimaryMedium || "placeholder.jpg";
  const name = product.NameWithoutBrand || product.Name || "Product";
  const brand = product.Brand?.Name || "";
  const price = product.FinalPrice?.toFixed(2) || "0.00";
  const discount = product.RetailPrice && product.RetailPrice > product.FinalPrice
      ? `<p class="product-card__discount">-${Math.round((1 - product.FinalPrice / product.RetailPrice) * 100)}%</p>`
      : "";

  const productId = product.Id || product.id;

  return `
    <li class="product-card">
      <a href="../product_pages/index.html?category=${category}&product=${productId}">
        <img src="${imageUrl}" alt="Image of ${name}">
        <h2 class="card__brand">${brand}</h2>
        <h3 class="card__name">${name}</h3>
        <p class="product-card__price">$${price}</p>
        ${discount}
      </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      if (!list || list.length === 0) {
        this.listElement.innerHTML = "<p>No products found.</p>";
        return;
      }
      this.renderList(list);
    } catch (err) {
      console.error("Error loading products:", err);
      this.listElement.innerHTML = "<p>Failed to load products.</p>";
    }
  }

  renderList(list) {
      // Pass the category as the second argument to the template
      renderListWithTemplate(
          (product) => productCardTemplate(product, this.category), 
          this.listElement, 
          list, 
          "afterbegin", 
          true
      );
  }
  
  async sortPrice() {
    const list = await this.dataSource.getData(this.category);
      if (!list || list.length === 0) {
        this.listElement.innerHTML = "<p>No products found.</p>";
        return;
    }
    const priceList = list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    this.renderList(priceList);

  }

  async sortName() {
    const list = await this.dataSource.getData(this.category);
      if (!list || list.length === 0) {
        this.listElement.innerHTML = "<p>No products found.</p>";
        return;
    }
    const nameList = list.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
    this.renderList(nameList);
  }
}