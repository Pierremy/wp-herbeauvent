import config from '../config'
import emitter from './emitter'
import { APP_READY } from '../config/constants'
import { gsap } from 'gsap'
import utils from '../util'

class Preloader {
  constructor () {
    this.el = config.preloader
  }

  init() {
    utils.detectPointer()
    utils.detectBrowser()

    this.animateIn()
    //this.done()
  }

  animateIn = () => {
    gsap.to(this.el.querySelector('img'), {
      duration: 1,
      opacity: 1,
      scale: 1,
      ease: 'Power2.easeOut',
      onComplete: this.animateOut
    })
  }

  animateOut = () => {
    gsap.to(this.el, {
      duration: .8,
      opacity: 0,
      delay: 0.6,
      ease: 'Power2.easeIn',
      onComplete: this.done
    })
  }

  done = () => {
    this.el.parentNode.removeChild(this.el)
    config.body.classList.remove('is-loading')

    emitter.emit(APP_READY)
  }
}

export default new Preloader()
