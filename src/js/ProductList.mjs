import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
<<<<<<< Updated upstream
  return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
=======
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image || ''}" alt="Image of ${product.Name || ''}">
      <h2 class="card__brand">${product.Brand?.Name || ''}</h2>
      <h3 class="card__name">${product.NameWithoutBrand || product.Name || ''}</h3>
      <p class="product-card__price">$${product.FinalPrice ?? 0}</p>
    </a>
  </li>`;
>>>>>>> Stashed changes
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
<<<<<<< Updated upstream
     // You passed in this information to make the class as reusable as possible.
     // Being able to define these things when you use the class will make it very flexible
=======
>>>>>>> Stashed changes
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
<<<<<<< Updated upstream
     // the dataSource will return a Promise...so you can use await to resolve it.
    const list = await this.dataSource.getData();
    // next, render the list - ** future **
    this.renderList(list);
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

=======
    const list = await this.dataSource.getData();
    if (list && this.listElement) {
      this.renderList(list);
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
>>>>>>> Stashed changes
}