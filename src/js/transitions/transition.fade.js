import scroll from '../util/router'
import { gsap } from 'gsap'

function fade(oldContainer, newContainer, done) {
  function animateOut() {
    gsap.to(oldContainer, {
      duration: 0.4,
      autoAlpha: 0,
      onComplete: animateIn
    })
  }

  function animateIn() {
    scroll.scrollTo(1)
    scroll.reset();

    gsap.timeline({ onComplete: done })
      .set(oldContainer, { display: 'none' })
      .set(newContainer, { autoAlpha: 0 })
      .to(newContainer, {
        duration: 0.6,
        autoAlpha: 1
      })
  }

  return animateOut()
}

export default fade