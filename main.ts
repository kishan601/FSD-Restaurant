import { renderOrderPage } from './order.js';

const mainContent = document.querySelector('main');

type RouteHandler = (container: HTMLElement) => void;

const routes: { [path: string]: RouteHandler } = {
    '/': renderHomePage,
    '/order': renderOrderPage
};

function renderHomePage(container: HTMLElement) {
    if(container){
        container.innerHTML = `
        <section class="hero">
            <div class="hero-text">
                <h1><span class="typing-effect"></span></h1>
                <p>Experience authentic cuisine made with love and the finest ingredients. A culinary journey that will delight your senses.</p>
                <button class="cta-button">Click Me</button>
            </div>
            <div class="hero-image">
                <img src="./gallery/pexels-robin-stickel-70497.jpg" alt="Delicious food spread">
            </div>
        </section>

        <section class="gallery">
            <div class="gallery-images">
                <img src="./gallery/pexels-mister-mister-3434523.jpg" alt="Restaurant interior">
                <img src="./gallery/pexels-rachel-claire-6752433.jpg" alt="Shrimp dish">
                <img src="./gallery/pexels-eva-bronzini-6141651.jpg" alt="Street cafe">
            </div>
            <div class="gallery-text">
                <p>Our Gallery</p>
                <h2>A Visual Feast of Our Restaurant</h2>
                <a href="#" class="cta-link">View More →</a>
            </div>
        </section>

        <section class="menu-section" id="food">
            <h2>Our special dishes</h2>
            <div class="menu-grid">
                <div class="menu-item">
                    <h3>Gourmet Burger</h3>
                    <p>A juicy, flame-grilled patty with fresh lettuce, tomato, and our secret sauce.</p>
                    <span class="price">$14.99</span>
                </div>
                <div class="menu-item">
                    <h3>Pasta Primavera</h3>
                    <p>Fresh pasta tossed with seasonal vegetables in a light garlic and olive oil sauce.</p>
                    <span class="price">$18.50</span>
                </div>
                <div class="menu-item">
                    <h3>Classic Caesar Salad</h3>
                    <p>Crisp romaine lettuce, parmesan cheese, crunchy croutons, and a creamy Caesar dressing.</p>
                    <span class="price">$12.00</span>
                </div>
                <div class="menu-item">
                    <h3>Chocolate Lava Cake</h3>
                    <p>A decadent, rich chocolate cake with a molten center, served with a scoop of vanilla ice cream.</p>
                    <span class="price">$9.75</span>
                </div>
            </div>
        </section>

        <section class="testimonials-section" id="testimonials">
            <h2>What Our Customers Say</h2>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <p>"The food was absolutely divine! A true taste of heaven. I can't wait to come back."</p>
                    <h4>- Amelia R.</h4>
                </div>
                <div class="testimonial-card">
                    <p>"A wonderful atmosphere and the most welcoming staff. It felt like dining with family."</p>
                    <h4>- James P.</h4>
                </div>
                <div class="testimonial-card">
                    <p>"Every dish was a work of art. The flavors were incredible. Highly recommended!"</p>
                    <h4>- Sofia K.</h4>
                </div>
            </div>
        </section>

        <section class="contact-section" id="contact">
            <h2>Get in Touch</h2>
            <div class="contact-container">
                <div class="contact-form">
                    <form>
                        <input type="text" name="name" placeholder="Your Name" required>
                        <input type="email" name="email" placeholder="Your Email" required>
                        <textarea name="message" placeholder="Your Message" rows="6" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
                <div class="contact-info">
                    <h3>Contact Information</h3>
                    <p>123 Culinary Lane, Flavor Town, 45678</p>
                    <p>Email: contact@therestaurant.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
            </div>
        </section>
    `;
    initializeTypingEffect();
    }
}

function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const lines = [
            "Savor the Flavors of Tradition",
            "Feel the taste of Love"
        ];
        let lineIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentLine = lines[lineIndex];
            const lineLength = currentLine.length;
            const typeSpeed = 1000 / lineLength;
            const deleteSpeed = 1000 / lineLength;
            let delay = isDeleting ? deleteSpeed : typeSpeed;

            if (isDeleting) {
                charIndex--;
                typingElement!.textContent = currentLine.substring(0, charIndex);
            } else {
                charIndex++;
                typingElement!.textContent = currentLine.substring(0, charIndex);
            }

            if (!isDeleting && charIndex === lineLength) {
                delay = 1000; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                lineIndex = (lineIndex + 1) % lines.length;
                delay = 0;
            }

            setTimeout(type, delay);
        }
        type();
    }
}

function router(){
    const path = window.location.hash.slice(1) || '/';
    const route = routes[path];

    if(route && mainContent){
        route(mainContent);
    }
}


window.addEventListener('hashchange', router);

router();