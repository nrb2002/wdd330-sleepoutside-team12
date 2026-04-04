import categories from "../json/categories.json";
import {
  qs,
  loadHeaderFooter,
  renderListWithTemplate,
  categoryTemplate,
} from "./utils.mjs";

//Display dynamic header and footer
loadHeaderFooter();

//Display categories
const container = qs(".product-categories");

if (container) {
  renderListWithTemplate(
    categoryTemplate,
    container,
    categories,
    "afterbegin",
    true,
  );
}
