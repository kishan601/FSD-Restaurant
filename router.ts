import { renderHomePage } from './home';
import { renderOrderPage } from './order';
import { renderCartPage } from './cart';

const routes: { [key: string]: (container: HTMLElement) => void } = {
    '/': renderHomePage,
    '/order': renderOrderPage,
    '/cart': renderCartPage
};

export function router(container: HTMLElement) {
    const path = window.location.hash.slice(1) || '/';
    const render = routes[path] || routes['/'];
    render(container);

    window.addEventListener('hashchange', () => {
        const path = window.location.hash.slice(1) || '/';
        const render = routes[path] || routes['/'];
        render(container);
    });
}
