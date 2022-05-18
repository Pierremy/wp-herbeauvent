import { gsap } from 'gsap'
class AddToCartManager {
    constructor() {
        this.elCartTotal = document.querySelector('.js-cart-count');
        this.elCartMsg = document.querySelector('.js-cart-message');
        this.buttons = document.querySelectorAll('.single_add_to_cart_button');

        this._clickHandler = this.handleClick.bind(this);

        this.events();

    }

    handleClick(e) {
        e.preventDefault();

        let _self = this;
        let button = e.currentTarget;

        if (!button.isPending) {
            button.isPending = true;
            button.classList.add('is-pending');

            let xhr = new XMLHttpRequest();

            xhr.open('POST', APP.AJAX_URL, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onloadend = function () {
                const response = JSON.parse(this.response);

                button.classList.remove('is-pending');
                button.isPending = false;

                if (response.data && response.data.cart_count) {
                    if(_self.elCartTotal){
                        _self.elCartTotal.innerHTML = response.data.cart_count;
                    }
                }

                //Animation
                if (response.message) {
                    _self.elCartMsg.innerHTML = response.message;
                    gsap.to(_self.elCartMsg, {
                        x: '50',
                        autoAlpha: 1,
                        duration: 1,
                        ease: "power4"
                    })
                    gsap.to(_self.elCartMsg, {
                        delay: 5,
                        duration: 1,
                        autoAlpha: 0,
                        x: '-100%',
                        ease: "power4"
                    })
                }
            };
            xhr.send(`action=add_to_cart&product_id=${button.value}&${button.parentNode.serialize()}`);
        }
    }

    events() {
        this.buttons.forEach(btn => btn.addEventListener('click', this._clickHandler));
    }

    reload() {
        this.destroy();
        this.buttons = document.querySelectorAll('.single_add_to_cart_button');
        this.events();
    }

    destroy() {
        this.buttons.forEach(btn => btn.removeEventListener('click', this._clickHandler));
    }
}

export default new AddToCartManager();