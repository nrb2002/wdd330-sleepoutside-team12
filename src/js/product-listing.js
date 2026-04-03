import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "tents";
const dataSource = new ExternalServices(category); //create an isntance of the ProductData (ExternalServices class)
const element = document.querySelector(".product-list"); //select the element to display the product in
const productsByCategory = new ProductList(category, dataSource, element); //Create an instance of the product list

productsByCategory.init(); //call the init method to display products matching the selected category. 
