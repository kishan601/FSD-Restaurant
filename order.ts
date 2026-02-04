export interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

export const menu: Dish[] = [
    {
        id: 1,
        name: "Gourmet Burger",
        description: "A juicy, flame-grilled patty with fresh lettuce, tomato, and our secret sauce.",
        price: 14.99,
        image: "./gallery/pexels-robin-stickel-70497.jpg"
    },
    {
        id: 2,
        name: "Pasta Primavera",
        description: "Fresh pasta tossed with seasonal vegetables in a light garlic and olive oil sauce.",
        price: 18.50,
        image: "./gallery/pexels-rachel-claire-6752433.jpg"
    },
    {
        id: 3,
        name: "Classic Caesar Salad",
        description: "Crisp romaine lettuce, parmesan cheese, crunchy croutons, and a creamy Caesar dressing.",
        price: 12.00,
        image: "./gallery/pexels-eva-bronzini-6141651.jpg"
    },
    {
        id: 4,
        name: "Chocolate Lava Cake",
        description: "A decadent, rich chocolate cake with a molten center, served with a scoop of vanilla ice cream.",
        price: 9.75,
        image: "./gallery/pexels-mister-mister-3434523.jpg"
    }
];

function getCart(): { [key: number]: number } {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : {};
}

function saveCart(cart: { [key: number]: number }) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function renderOrderPage(container: HTMLElement) {
    let cart = getCart();
    container.innerHTML = `
        <section class="order-section">
            <h2>Place Your Order</h2>
            <div class="order-grid">
                ${menu.map(dish => `
                    <div class="order-item-card" data-dish-id="${dish.id}">
                        <img src="${dish.image}" alt="${dish.name}">
                        <div class="item-details">
                            <h3>${dish.name}</h3>
                            <p class="price">$${dish.price.toFixed(2)}</p>
                            <div class="quantity-selector">
                                <button class="quantity-btn minus">-</button>
                                <span class="quantity">${cart[dish.id] || 0}</span>
                                <button class="quantity-btn plus">+</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary">
                <h3>Your Cart</h3>
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
                <a href="#/cart" class="cta-button">View Cart</a>
            </div>
        </section>
    `;

    updateCartSummary(container);

    container.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;

        if (target.matches('.quantity-btn')) {
            const card = target.closest('.order-item-card') as HTMLElement;
            if (!card) return;

            const dishId = parseInt(card.dataset.dishId || '0');
            const quantitySpan = card.querySelector('.quantity') as HTMLElement;
            let quantity = parseInt(quantitySpan.textContent || '0');

            if (target.matches('.plus')) {
                quantity++;
            } else if (target.matches('.minus') && quantity > 0) {
                quantity--;
            }

            quantitySpan.textContent = quantity.toString();
            let cart = getCart();
            if (quantity > 0) {
                cart[dishId] = quantity;
            } else {
                delete cart[dishId];
            }
            saveCart(cart);
            updateCartSummary(container);
        }
    });
}

function updateCartSummary(container: HTMLElement) {
    const cart = getCart();
    let subtotal = 0;
    for (const dishId in cart) {
        const dish = menu.find(d => d.id === parseInt(dishId));
        if (dish) {
            subtotal += dish.price * cart[dishId];
        }
    }

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const subtotalSpan = container.querySelector('.subtotal') as HTMLElement;
    const taxSpan = container.querySelector('.tax') as HTMLElement;
    const totalSpan = container.querySelector('.total-price') as HTMLElement;

    if (subtotalSpan) subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
    if (taxSpan) taxSpan.textContent = `$${tax.toFixed(2)}`;
    if (totalSpan) totalSpan.textContent = `$${total.toFixed(2)}`;
}
