import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

<<<<<<< Updated upstream
HEAD;
productList.init();
=======
if (element) {
  const productList = new ProductList("Tents", dataSource, element);
  productList.init();
}
>>>>>>> Stashed changes
