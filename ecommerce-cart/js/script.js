document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product');
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    let total = 0;

    function createRemoveButton(cartItem, productPrice) {
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-item');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            total -= productPrice;
            totalElement.textContent = total;
            cartItem.remove();
        });
        return removeButton;
    }

    products.forEach(product => {
        const addToCartButton = product.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', function() {
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseInt(addToCartButton.dataset.price);
            
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `${productName} - $${productPrice}`;
            const removeButton = createRemoveButton(cartItem, productPrice);
            cartItem.appendChild(removeButton);
            cartItems.appendChild(cartItem);

            total += productPrice;
            totalElement.textContent = total;
        });
    });
});
