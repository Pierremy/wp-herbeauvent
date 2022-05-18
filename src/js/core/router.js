import Barba from 'barba.js'
import views from '../views'
import emitter from './emitter'
import utils from '../util'
import config from '../config'
import transitionReducer from '../transitions/reducer'
import {
  INIT_STATE_CHANGE,
  NEW_PAGE_READY,
  TRANSITION_COMPLETED
} from '../config/constants'

class Router {
  constructor () {
    Barba.Pjax.Dom.wrapperId = 'app'
    Barba.Pjax.Dom.containerClass = 'view'

    this.utils = utils.router
  }

  init() {
    this.addEventListeners()

    views.map(view => view.init())
    Barba.Prefetch.init()
    Barba.Pjax.start()

    Barba.Pjax.getTransition = () => transitionReducer
  }

  addEventListeners() {
    emitter.on(INIT_STATE_CHANGE, this.handleStateChange)
    emitter.on(NEW_PAGE_READY, this.handleNewPageReady)
    emitter.on(TRANSITION_COMPLETED, this.handleTransitionCompleted)
  }

  handleStateChange = () => {
    this.utils.lock();
  }

  handleNewPageReady = () => {
    if (Barba.Pjax.History.prevStatus()) {
      config.body.classList.remove(`is-${Barba.Pjax.History.prevStatus().namespace}`)
    }

    config.body.classList.add(`is-${Barba.Pjax.History.currentStatus().namespace}`)
  }

  handleTransitionCompleted = () => {
    this.utils.unlock();
  }
}

export default new Router()