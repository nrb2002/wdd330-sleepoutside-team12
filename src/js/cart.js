import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

let cart = getLocalStorage("so-cart") || [];

function cartItemTemplate(item) {
  if (!item) return "";

  const imgSrc = item.Image || "../images/placeholder.png";
  const name = item.Name || "Unnamed Product";
  const brand = item.Brand || "Unknown Brand";
  const price = item.FinalPrice ?? 0;
  const quantity = item.Quantity || 1;

  return `
    <li class="cart-card divider" data-id="${item.Id}">
      <a href="#" class="cart-card__image">
        <img src="${imgSrc}" alt="${name}" />
      </a>
      <div class="cart-card__info">
        <h4 class="cart-card__brand">${brand}</h4>
        <h2 class="cart-card__name">${name}</h2>
        <p class="cart-card__price">$${price.toFixed(2)}</p>
        <div class="cart-card__quantity-control">
          <button class="qty-btn decrease">-</button>
          <input type="number" class="qty-input" min="0" value="${quantity}">
          <button class="qty-btn increase">+</button>
        </div>
        <p class="cart-card__subtotal">Subtotal: $${(price * quantity).toFixed(2)}</p>
      </div>
    </li>
  `;
}

// Render the cart contents + grand total
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const container = document.querySelector(".product-list"); // matches your HTML
  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  // Render each item
  container.innerHTML = cartItems.map(cartItemTemplate).join("");

  // Add grand total at the bottom
  const grandTotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.FinalPrice) * (item.Quantity || 1),
    0,
  );

  const totalElement = document.getElementById("cart-total");
  if (totalElement) {
    totalElement.textContent = `$${grandTotal.toFixed(2)}`;
  }

  attachQuantityListeners(); // attach event listeners after rendering
}

// Attach event listeners to quantity inputs and buttons
function attachQuantityListeners() {
  const cartItems = document.querySelectorAll(".cart-card");

  cartItems.forEach((itemEl) => {
    const id = itemEl.dataset.id;
    const input = itemEl.querySelector(".qty-input");
    const decreaseBtn = itemEl.querySelector(".decrease");
    const increaseBtn = itemEl.querySelector(".increase");

    // Input change
    input.addEventListener("change", () => {
      let newQty = parseInt(input.value);
      if (isNaN(newQty) || newQty < 0) newQty = 0;

      const product = cart.find((p) => p.Id === id);
      if (product) {
        if (newQty === 0) {
          cart = cart.filter((p) => p.Id !== id);
        } else {
          product.Quantity = newQty;
        }

        setLocalStorage("so-cart", cart);
        renderCartContents();
      }
    });

    // Increase button
    increaseBtn.addEventListener("click", () => {
      const product = cart.find((p) => p.Id === id);

      if (product) {
        product.Quantity = (product.Quantity || 1) + 1;

        setLocalStorage("so-cart", cart);
        renderCartContents();
      }
    });

    //decrease button
    decreaseBtn.addEventListener("click", () => {
      const product = cart.find((p) => p.Id === id);
      if (product) {
        const newQty = (product.Quantity || 1) - 1;

        if (newQty <= 0) {
          // remove item
          cart = cart.filter((p) => p.Id !== id);
          setLocalStorage("so-cart", cart);

          // 🔥 FORCE FULL REFRESH (simple + reliable)
          location.reload();
          return;
        } else {
          product.Quantity = newQty;
        }

        setLocalStorage("so-cart", cart);
        renderCartContents();
      }
    });
  });
}

// Render cart on page load
document.addEventListener("DOMContentLoaded", renderCartContents);
