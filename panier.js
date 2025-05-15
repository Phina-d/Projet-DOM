
document.addEventListener('DOMContentLoaded', function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const cartContainer = document.getElementById('cart-container');
  const cartTotal = document.getElementById('cart-total');

  if (Object.keys(cart).length === 0) {
    cartContainer.innerHTML = '<p>Votre panier est vide.</p>';
    cartTotal.textContent = '0';
    return;
  }

  let total = 0;
  for (let item in cart) {
    const div = document.createElement('div');
    div.className = 'mb-3';
    const itemTotal = cart[item].price * cart[item].quantity;
    total += itemTotal;
    div.innerHTML = `
      <strong>${item}</strong> — ${cart[item].quantity} × ${cart[item].price} $ = ${itemTotal} $
    `;
    cartContainer.appendChild(div);
  }

  cartTotal.textContent = total.toFixed(2);
});

