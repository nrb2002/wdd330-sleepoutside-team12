import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";

loadHeaderFooter();

// Load existing cart or initialize
let cart = getLocalStorage("so-cart") || [];

// 🛒 Template for each cart item
function cartItemTemplate(item) {
  if (!item) return "";

  const imgSrc = item.Image || "../images/placeholder.png";
  const name = item.Name || "Unnamed Product";
  const brand = item.Brand || "Unknown Brand";

  // Ensure we have both original and final prices
  const originalPrice =
    item.ListPrice ?? item.SuggestedRetailPrice ?? item.FinalPrice ?? 0;
  const finalPrice = item.FinalPrice ?? originalPrice;

  const quantity = item.Quantity || 1;

  // Calculate discount & subtotal
  const discountAmount = originalPrice - finalPrice;
  const subtotal = finalPrice * quantity;
  const savings = discountAmount * quantity;

  return `
    <li class="cart-card divider" data-id="${item.Id}">
      <a href="#" class="cart-card__image">
        <img src="${imgSrc}" alt="${name}" />
      </a>
      <div class="cart-card__info">
        <h4 class="cart-card__brand">${brand}</h4>
        <h2 class="cart-card__name">${name}</h2>

        <p class="cart-card__price">
          ${
            discountAmount > 0
              ? `<span class="original-price">$${originalPrice.toFixed(2)}</span>`
              : ""
          }
          <span class="final-price">$${finalPrice.toFixed(2)}</span>
        </p>

        <div class="cart-card__quantity-control">
          <button class="qty-btn decrease">-</button>
          <input type="number" class="qty-input" min="0" value="${quantity}">
          <button class="qty-btn increase">+</button>
        </div>

        <p class="cart-card__subtotal">
          Subtotal: $${subtotal.toFixed(2)}<br>
          ${
            savings > 0
              ? `<small>You saved: $${savings.toFixed(2)}</small>`
              : ""
          }
        </p>
      </div>
    </li>
  `;
}

// 🛒 Render cart items + total
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const container = document.querySelector(".product-list");
  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-total")?.classList.add("hidden");
    document.getElementById("cart-savings")?.classList.add("hidden");
    return;
  }

  // Render each item
  container.innerHTML = cartItems.map(cartItemTemplate).join("");

  // Calculate grand total
  let grandTotal = 0;
  let totalSavings = 0;

  cartItems.forEach((item) => {
    const originalPrice =
      item.ListPrice ?? item.SuggestedRetailPrice ?? item.FinalPrice ?? 0;
    const finalPrice = item.FinalPrice ?? originalPrice;
    const quantity = item.Quantity ?? 1;

    grandTotal += finalPrice * quantity;
    totalSavings += (originalPrice - finalPrice) * quantity;
  });

  // Show totals
  const totalElement = document.getElementById("cart-total");
  if (totalElement) {
    totalElement.textContent = `$${grandTotal.toFixed(2)}`;
    totalElement.classList.remove("hidden");
  }

  const savingsElement = document.getElementById("cart-savings");
  if (savingsElement) {
    if (totalSavings > 0) {
      savingsElement.textContent = `You saved $${totalSavings.toFixed(2)} in total!`;
      savingsElement.classList.remove("hidden");
    } else {
      savingsElement.classList.add("hidden");
    }
  }

  attachQuantityListeners();
}

// 🛠️ Attach buttons + input listeners
function attachQuantityListeners() {
  const cartItems = document.querySelectorAll(".cart-card");

  cartItems.forEach((itemEl) => {
    const id = itemEl.dataset.id;
    const input = itemEl.querySelector(".qty-input");
    const decreaseBtn = itemEl.querySelector(".decrease");
    const increaseBtn = itemEl.querySelector(".increase");

    // Quantity input change
    input.addEventListener("change", () => {
      let newQty = parseInt(input.value);
      if (isNaN(newQty) || newQty < 0) newQty = 0;

      const product = cart.find((p) => p.Id === id);
      if (!product) return;

      if (newQty === 0) {
        cart = cart.filter((p) => p.Id !== id);
      } else {
        product.Quantity = newQty;
      }

      setLocalStorage("so-cart", cart);
      renderCartContents();
    });

    // Increase button
    increaseBtn.addEventListener("click", () => {
      const product = cart.find((p) => p.Id === id);
      if (!product) return;

      product.Quantity = (product.Quantity || 1) + 1;
      setLocalStorage("so-cart", cart);
      renderCartContents();
    });

    // Decrease button
    decreaseBtn.addEventListener("click", () => {
      const product = cart.find((p) => p.Id === id);
      if (!product) return;

      const newQty = (product.Quantity || 1) - 1;
      if (newQty <= 0) {
        cart = cart.filter((p) => p.Id !== id);
      } else {
        product.Quantity = newQty;
      }

      setLocalStorage("so-cart", cart);
      renderCartContents();
    });
  });
}

// 📦 Render cart on page load
document.addEventListener("DOMContentLoaded", renderCartContents);
