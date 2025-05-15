let cart = JSON.parse(localStorage.getItem('cart')) || {};

function updateCartDisplay() {
  const cartCount = document.getElementById('cart-count');
  let totalCount = 0;
  for (let item in cart) {
    totalCount += cart[item].quantity;
  }
  if (cartCount) cartCount.textContent = totalCount;
}

function updateTotalPrice() {
  let total = 0;
  for (let item in cart) {
    total += cart[item].quantity * cart[item].price;
  }
  const totalElement = document.querySelector('.total');
  if (totalElement) totalElement.textContent = total + ' $';
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function displayCartItems() {
  if (!window.location.pathname.includes('panier.html')) return;
  const cartList = document.querySelector('#cart-items ul');
  if (!cartList) return;

  cartList.innerHTML = '';

  for (let item in cart) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const itemTotal = cart[item].quantity * cart[item].price;

    li.innerHTML = `
      <div>
        <strong>${item}</strong> — ${cart[item].quantity} x ${cart[item].price} $ = ${itemTotal} $
      </div>
      <button class="btn btn-sm btn-danger" data-remove="${item}">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    cartList.appendChild(li);
  }

  document.querySelectorAll('[data-remove]').forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.getAttribute('data-remove');
      delete cart[itemName];
      updateCartDisplay();
      updateTotalPrice();
      displayCartItems();
      saveCartToLocalStorage();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const categoryButtons = document.querySelectorAll('.total-price .btn');
  const productCards = document.querySelectorAll('[data-category]');

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.textContent.trim().toLowerCase();
      saveCartToLocalStorage();

      productCards.forEach(card => {
        const productCategory = card.dataset.category;
        card.style.display = (category === 'tous' || category === productCategory) ? 'block' : 'none';
      });
    });
  });

  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('.card-title').textContent;
    const price = parseFloat(card.querySelector('.unit-price').textContent);
    const image = card.querySelector('img').getAttribute('src');

    card.querySelector('.fa-plus-circle').addEventListener('click', () => {
      if (!cart[title]) cart[title] = { quantity: 0, price, image };
      cart[title].quantity++;
      card.querySelector('.quantity').textContent = cart[title].quantity;
      updateCartDisplay();
      updateTotalPrice();
      displayCartItems();
      saveCartToLocalStorage();
    });

    card.querySelector('.fa-minus-circle').addEventListener('click', () => {
      if (cart[title] && cart[title].quantity > 0) {
        cart[title].quantity--;
        if (cart[title].quantity === 0) delete cart[title];
        card.querySelector('.quantity').textContent = cart[title]?.quantity || 0;
        updateCartDisplay();
        updateTotalPrice();
        displayCartItems();
        saveCartToLocalStorage();
      }
    });

    card.querySelector('.fa-trash-alt').addEventListener('click', () => {
      delete cart[title];
      card.querySelector('.quantity').textContent = 0;
      updateCartDisplay();
      updateTotalPrice();
      displayCartItems();
      saveCartToLocalStorage();
    });
  });

  document.querySelectorAll('.fa-heart').forEach(heart => {
    heart.addEventListener('click', () => {
      heart.classList.toggle('text-danger');
    });
  });

  updateCartDisplay();
  updateTotalPrice();
  displayCartItems();
});
