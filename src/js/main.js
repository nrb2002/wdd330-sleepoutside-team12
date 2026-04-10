import categories from "../json/categories.json";
import {
  qs,
  loadHeaderFooter,
  renderListWithTemplate,
  categoryTemplate,
  alertMessage,
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

alertMessage(
  "Purchase now and save money! Up to 65% off.",
  false,
  "announcement",
);
