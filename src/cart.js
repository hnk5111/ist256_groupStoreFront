function loadCart() {
    const cart = JSON.parse(localStorage.getItem('shoppingcart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceEl = document.getElementById('totalPrice');

    cartItemsContainer.innerHTML = ''; 
    let totalPrice = 0; // Reset total price

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceEl.textContent = `$0.00`; // Set total to 0 if cart is empty
    } else {
        cart.forEach((item, index) => {
            // Create a row for each cart item
            const itemRow = document.createElement('div');
            itemRow.classList.add('row', 'align-items-center', 'mb-3');

            itemRow.innerHTML = `
                <div class="col-md-4">
                    <h5>${item.name}</h5>
                </div>
                <div class="col-md-2">
                    <p>Quantity: <span class="quantity">${item.quantity}</span></p>
                </div>
                <div class="col-md-2">
                    <p>Price: $${item.price}</p>
                </div>
                <div class="col-md-2">
                    <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="col-md-2 text-right">
                    <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
                </div>
            `;

            cartItemsContainer.appendChild(itemRow);

            totalPrice += item.price * item.quantity; 
        });

        totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`; 
    }
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('shoppingcart')) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity--; 
    } else {
        cart.splice(index, 1); 
    }

    localStorage.setItem('shoppingcart', JSON.stringify(cart)); // Update localStorage
    loadCart(); 
}

const cartItemsContainer = document.getElementById('cartItems');

cartItemsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-item')) {
        const index = event.target.getAttribute('data-index');
        removeItem(index);
    }
});

function checkout() {
   window.location.href = "checkout.html";
}


window.onload = loadCart;
