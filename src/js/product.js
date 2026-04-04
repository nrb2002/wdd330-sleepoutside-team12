import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header and footer
loadHeaderFooter();

// Get query parameters
const productId = getParam("product");
const category = getParam("category") || "tents"; // fallback if missing

// Only proceed if a product ID is present
if (productId) {
  // Create data source for the correct category
  const dataSource = new ExternalServices(category);

  // Initialize product details
  const product = new ProductDetails(productId, dataSource);
  product.init();
} else {
  const container = document.querySelector(".product-detail");
  if (container) container.innerHTML = "<p>No product selected.</p>";
}