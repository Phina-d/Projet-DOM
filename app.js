document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");
  const totalPriceDisplay = document.querySelector(".total");
  const cards = document.querySelectorAll(".card");

  let totalItems = 0;
  let totalPrice = 0;

  function updateCart() {
    cartCount.textContent = totalItems;
    totalPriceDisplay.textContent = `${totalPrice} $`;
  }

  cards.forEach(card => {
    const plusBtn = card.querySelector(".fa-plus-circle");
    const minusBtn = card.querySelector(".fa-minus-circle");
    const quantitySpan = card.querySelector(".quantity");
    const unitPrice = parseFloat(card.querySelector(".unit-price").textContent);
    const trashBtn = card.querySelector(".fa-trash-alt");
    const heartBtn = card.querySelector(".fa-heart");

    // Ajouter produit
    plusBtn.addEventListener("click", () => {
      let quantity = parseInt(quantitySpan.textContent);
      quantity++;
      quantitySpan.textContent = quantity;
      totalItems++;
      totalPrice += unitPrice;
      updateCart();
    });

    // Retirer produit
    minusBtn.addEventListener("click", () => {
      let quantity = parseInt(quantitySpan.textContent);
      if (quantity > 0) {
        quantity--;
        quantitySpan.textContent = quantity;
        totalItems--;
        totalPrice -= unitPrice;
        updateCart();
      }
    });

    // Supprimer le produit
    trashBtn.addEventListener("click", () => {
      const quantity = parseInt(quantitySpan.textContent);
      totalItems -= quantity;
      totalPrice -= quantity * unitPrice;
      card.closest(".card-body").remove();
      updateCart();
    });

    // Ajouter aux favoris
    heartBtn.addEventListener("click", () => {
      heartBtn.classList.toggle("favorited");
      heartBtn.style.color = heartBtn.classList.contains("favorited") ? "red" : "black";
    });
  });
});
