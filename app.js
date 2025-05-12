
  const categoryButtons = document.querySelectorAll('.total-price .btn');
  const productCards = document.querySelectorAll('[data-category]');
  const products = document.querySelectorAll('[data-category]');

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.textContent.trim().toLowerCase();
      
      productCards.forEach(card => {
        const productCategory = card.dataset.category;
        if (category === 'tous' || category === productCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  let cart = {};

  function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    let totalCount = 0;
    for (let item in cart) {
      totalCount += cart[item].quantity;
    }
    cartCount.textContent = totalCount;
  }

  function updateTotalPrice() {
    let total = 0;
    for (let item in cart) {
      total += cart[item].quantity * cart[item].price;
    }
    document.querySelector('.total').textContent = total + ' $';
  }

  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('.card-title').textContent;
    const price = parseInt(card.querySelector('.unit-price').textContent);

    card.querySelector('.fa-plus-circle').addEventListener('click', () => {
      if (!cart[title]) cart[title] = { quantity: 0, price: price };
      cart[title].quantity++;
      card.querySelector('.quantity').textContent = cart[title].quantity;
      updateCartDisplay();
      updateTotalPrice();
    });

    card.querySelector('.fa-minus-circle').addEventListener('click', () => {
      if (cart[title] && cart[title].quantity > 0) {
        cart[title].quantity--;
        card.querySelector('.quantity').textContent = cart[title].quantity;
        if (cart[title].quantity === 0) delete cart[title];
        updateCartDisplay();
        updateTotalPrice();
      }
    });

    card.querySelector('.fa-trash-alt').addEventListener('click', () => {
      if (cart[title]) {
        delete cart[title];
      }
      card.querySelector('.quantity').textContent = 0;
      updateCartDisplay();
      updateTotalPrice();
    });
  });

document.querySelectorAll('.fa-heart').forEach(heart => {
    heart.addEventListener('click', () => {
      heart.classList.toggle('text-danger'); // Bootstrap class rouge
    });
  });



  


