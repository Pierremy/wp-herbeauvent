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
  }

  animateIn = () => {
    gsap.to(this.el.querySelector('img'), {
      duration: 0.7,
      opacity: 1,
      scale: 1,
      onComplete: this.animateOut
    })
  }

  animateOut = () => {
    gsap.to(this.el, {
      duration: 0.6,
      opacity: 0,
      delay: 0.2,
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
