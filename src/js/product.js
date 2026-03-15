import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// get product ID from URL
const productId = getParam("product");

// create data source for tents
const dataSource = new ProductData("tents");

// create product details instance
const productPage = new ProductDetails(productId, dataSource);

// initialize page
productPage.init();