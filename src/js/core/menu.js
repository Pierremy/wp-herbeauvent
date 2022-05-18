import config from '../config'

class Menu {
    constructor() {
        this.burger = document.querySelector('.burger');
        this.menu = document.querySelector('.site-header__navigation');

        this.isOpen = false;
        this.isHidden = false;

        // this.init();
    }

    init() {
        this.burger.addEventListener('click', () => this.toggle());
    }

    toggle = () => this.isOpen ? this.close() : this.open();

    open() {
        this.isOpen = true;
        this.burger.classList.add('is-open');
        this.menu.classList.add('is-open');
        config.header.classList.add('is-menu-open');
        document.documentElement.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.burger.classList.remove('is-open');
        this.menu.classList.remove('is-open');
        config.header.classList.remove('is-menu-open');
        document.documentElement.style.overflow = null;
    }

    hide() {
        this.isHidden = true;
        config.header.classList.add('is-hidden');
    }

    show() {
        this.isHidden = false;
        config.header.classList.remove('is-hidden');
    }

    updateNavClass(el) {
        let current = this.menu.querySelector('.current-menu-item');
        current ? current.classList.remove('current-menu-item') : null;

        if (this.menu.contains(el)) {
            el.parentNode.classList.add('current-menu-item');
        }
    }

    updateCurrentMenuItem(current) {
        [...this.menu.querySelectorAll('.current-menu-item')].map(el => el.classList.remove('current-menu-item'));

        if (!this.mainNavigation.contains(current)) return;

        if (current.classList.contains('nav-main__link--child')) {
            current.classList.add('current-menu-item');
        } else {
            current.parentNode.classList.add('current-menu-item');
        }
    }
}

export default new Menu();