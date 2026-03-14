// main.js

// 1. Import your modules
import ProductData from './ProductData.js';       // make sure the file name is exactly ProductData.js
import ProductList from './ProductList.mjs';     // default export

// 2. Create an instance of ProductData
const productData = new ProductData();
const products = productData.getProducts();     // get the array of products

// 3. Select the container in HTML (<ul class="product-list">)
const container = document.querySelector('.product-list');

// 4. Create a ProductList instance
const productList = new ProductList(container);

// 5. Render the products
productList.render(products);
// main.js

import ProductData from './ProductData.js';
import ProductList from './ProductList.mjs'; // default export

// 1. Create instance of ProductData
const ProductData = new ProductData();
const Products = productData.getProducts(); // get the array of products

// 2. Select the <ul> container in HTML
const Container = document.querySelector('.product-list'); // make sure <ul class="product-list"> exists

// 3. Create a ProductList instance
const ProductList = new ProductList(container);

// 4. Render the products
productList.render(products);