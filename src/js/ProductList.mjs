import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    // Safe access for missing fields
    const imageUrl = product.Images?.PrimaryMedium || "placeholder.jpg";
    const name = product.NameWithoutBrand || product.Name || "Product";
    const brand = product.Brand?.Name || "";
    const price = product.FinalPrice?.toFixed(2) || "0.00";
    const discount = product.RetailPrice && product.RetailPrice > product.FinalPrice
        ? `<p class="product-card__discount">-${Math.round((1 - product.FinalPrice / product.RetailPrice) * 100)}%</p>`
        : "";

    return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
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
            //If no product found, return a message
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
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}