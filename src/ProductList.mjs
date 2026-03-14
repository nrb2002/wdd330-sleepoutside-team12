// ProductList.mjs

// This function takes an array of products and a container element
// and generates HTML for each product dynamically
export function renderProductList(products, container) {
    // Clear existing content
    container.innerHTML = '';

    products.forEach(product => {
        // Check if product is discounted
        const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

        // Create HTML for a product card
        const productHTML = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        ${isDiscounted ? `<span class="sale">SALE!</span>` : ''}
        <p class="price">
          ${isDiscounted ? `<span class="old-price">$${product.SuggestedRetailPrice}</span>` : ''}
          $${product.FinalPrice}
        </p>
      </div>
    `;

        // Append product card to the container
        container.innerHTML += productHTML;
    });
}
// ProductList.mjs

export default class ProductList {
    constructor(container) {
        // The container where product cards will be rendered
        this.container = container;
    }

    // Method to render an array of products
    render(products) {
        // Clear any existing content
        this.container.innerHTML = '';

        products.forEach(product => {
            const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

            // Wrap each product in an <li> for the <ul> container
            const productHTML = `
        <li class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          ${isDiscounted ? `<span class="sale">SALE!</span>` : ''}
          <p class="price">
            ${isDiscounted ? `<span class="old-price">$${product.SuggestedRetailPrice}</span>` : ''}
            $${product.FinalPrice}
          </p>
        </li>
      `;

            this.container.innerHTML += productHTML;
        });
    }
}
export default class ProductList {
    constructor(container) {
        this.container = container;
    }

    render(products) {
        this.container.innerHTML = '';
        products.forEach(product => {
            const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
            const productHTML = `
        <li class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          ${isDiscounted ? `<span class="sale">SALE!</span>` : ''}
          <p class="price">
            ${isDiscounted ? `<span class="old-price">$${product.SuggestedRetailPrice}</span>` : ''}
            $${product.FinalPrice}
          </p>
        </li>
      `;
            this.container.innerHTML += productHTML;
        });
    }
}