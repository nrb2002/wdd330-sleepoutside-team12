import { loadHeaderFooter } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

<<<<<<< Updated upstream
const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
=======
const productId = getParam("product");
if (productId) {
  const dataSource = new ExternalServices("tents");
  const product = new ProductDetails(productId, dataSource);
  product.init();
}
>>>>>>> Stashed changes
