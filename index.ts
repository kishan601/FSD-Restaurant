import { router } from './router';

document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        router(mainContainer as HTMLElement);
    }
});
