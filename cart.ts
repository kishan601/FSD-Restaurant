import { menu } from './order';

interface CartItem {
    id: number;
    quantity: number;
}

function getCart(): { [key: number]: number } {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : {};
}

function saveCart(cart: { [key: number]: number }) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function renderCartPage(container: HTMLElement) {
    const cart = getCart();
    container.innerHTML = `
    <section class="cart-page-section">
        <h2>Your Cart</h2>
        <div class="cart-page-items">
            <!-- Cart items will be rendered here -->
        </div>
        <div class="cart-page-summary">
            <div class="summary-line">
                <span>Subtotal:</span>
                <span class="subtotal">$0.00</span>
            </div>
            <div class="summary-line">
                <span>Tax (5%):</span>
                <span class="tax">$0.00</span>
            </div>
            <div class="summary-line total">
                <span>Total:</span>
                <span class="total-price">$0.00</span>
            </div>
            <button class="cta-button checkout-btn">Proceed to Checkout</button>
        </div>
    </section>
    `;

    updateCartPageUI(container);

    container.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const cartItem = target.closest('.cart-page-item') as HTMLElement;
        if (!cartItem) return;

        const dishId = parseInt(cartItem.dataset.dishId || '0');
        let cart = getCart();

        if (target.matches('.plus')) {
            cart[dishId] = (cart[dishId] || 0) + 1;
        } else if (target.matches('.minus')) {
            cart[dishId] = (cart[dishId] || 0) - 1;
            if (cart[dishId] <= 0) {
                delete cart[dishId];
            }
        }

        saveCart(cart);
        updateCartPageUI(container);
    });
}

function updateCartPageUI(container: HTMLElement) {
    const cart = getCart();
    const cartItemsContainer = container.querySelector('.cart-page-items') as HTMLElement;
    const subtotalSpan = container.querySelector('.subtotal') as HTMLElement;
    const taxSpan = container.querySelector('.tax') as HTMLElement;
    const totalSpan = container.querySelector('.total-price') as HTMLElement;

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    const hasItems = Object.keys(cart).length > 0;

    if (hasItems) {
        for (const dishId in cart) {
            const quantity = cart[dishId];
            const dish = menu.find(d => d.id === parseInt(dishId));
            if (dish) {
                subtotal += dish.price * quantity;
                const cartItemHTML = `
                <div class="cart-page-item" data-dish-id="${dish.id}">
                    <div class="cart-item-info">
                        <img src="${dish.image}" alt="${dish.name}">
                        <div class="cart-item-details">
                            <h4>${dish.name}</h4>
                            <p class="price">$${dish.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="quantity-selector">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">${quantity}</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
                `;
                cartItemsContainer.innerHTML += cartItemHTML;
            }
        }
    } else {
        cartItemsContainer.innerHTML = '<p>Your cart is empty. <a href="#/order">Go back to order</a></p>';
    }

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
    taxSpan.textContent = `$${tax.toFixed(2)}`;
    totalSpan.textContent = `$${total.toFixed(2)}`;
}

