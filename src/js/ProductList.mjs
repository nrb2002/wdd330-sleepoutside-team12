import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const discount = product.SuggestedRetailPrice - product.FinalPrice;
    const discountRounded = discount.toFixed(2);
    if (discountRounded > 0) {
        return `<li class="product-card">
                <a href="product_pages/?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
                <h2 class="card__brand">${product.Brand.Name}</h2>
                <h3 class="card__name">${product.NameWithoutBrand}</h3>
                <p class="product-card__price">$${product.FinalPrice}</p>
                <p class="product-card__discount">Has a discount of $${discountRounded}!</p>
                </a>
            </li>`;
    } else {
        return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
            </li>`;
    }
}

export default class ProductList {
    constructor(category, dataSource, listElement)
    {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init()
    {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").textContent = this.category;
    }

    renderList(list)
    {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}