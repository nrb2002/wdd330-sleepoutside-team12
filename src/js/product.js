import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// get product ID from URL
const productId = getParam("product");

// create data source for tents
const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const existingCart = getLocalStorage("so-cart") || [];
  existingCart.push(product);
  setLocalStorage("so-cart", existingCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// initialize page
product.init();
