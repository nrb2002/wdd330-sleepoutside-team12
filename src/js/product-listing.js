import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category") || "tents";
const dataSource = new ExternalServices(category); //create an isntance of the ProductData (ExternalServices class)
const element = document.querySelector(".product-list"); //select the element to display the product in
const productsByCategory = new ProductList(category, dataSource, element); //Create an instance of the product list

productsByCategory.init(); //call the init method to display products matching the selected category.

const priceButton = document.querySelector("#priceSort");
const nameButton = document.querySelector("#nameSort");
priceButton.addEventListener("click", (event) => {
  event.preventDefault();
  productsByCategory.sortPrice();
});
nameButton.addEventListener("click", (event) => {
  event.preventDefault();
  productsByCategory.sortName();
});
