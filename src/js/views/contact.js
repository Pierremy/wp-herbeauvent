import Barba from 'barba.js'
import { CAPTCHA_OPTIONS } from '../config/constants'

const contact = Barba.BaseView.extend({
    namespace: 'contact',

    onEnter() { },

    onEnterCompleted() {
    

        // Init ReCaptcha validation
        // let captcha_contact_el = document.querySelector('.js-captcha-contact');
        // let captcha_contact;

        // grecaptcha.ready(() => {
        //     captcha_contact = grecaptcha.render(captcha_contact_el, CAPTCHA_OPTIONS);
        // })
    },

    onLeave() { },

    onLeaveCompleted() { }
})

export default contact
