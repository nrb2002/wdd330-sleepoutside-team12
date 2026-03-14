import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  if (!item) return "";

  const imgSrc = item.Images?.PrimaryLarge || "../images/placeholder.png";
  const name = item.Name || "Unnamed Product";
  const brand = item.Brand?.Name || "Unknown Brand";
  const price = item.FinalPrice ?? "0.00";
  const color = item.Colors?.[0]?.ColorName || "N/A";

  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${imgSrc}" alt="${name}" />
      </a>
      <div class="cart-card__info">
        <h4 class="cart-card__brand">${brand}</h4>
        <h2 class="cart-card__name">${name}</h2>
        <p class="cart-card__color">Color: ${color}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${price}</p>
      </div>
    </li>
  `;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // fallback to empty array
  const container = document.querySelector(".cart-contents"); // match your HTML
  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  container.innerHTML = cartItems.map(cartItemTemplate).join("");
}

// render on page load
document.addEventListener("DOMContentLoaded", renderCartContents);