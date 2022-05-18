//Core
import preloader from './core/preloader'
import router from './core/router'
import emitter from './core/emitter'
import Logger from './core/logger'
import Menu from './core/menu'
import AddToCartManager from './components/AddToCart'

//Config
import { APP_READY, TRANSITION_COMPLETED, NEW_PAGE_READY } from './config/constants'
import config from './config'

//Modules
import polyfills from './polyfill'
import prototype from './prototype'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Swiper, { Navigation, Pagination } from 'swiper'


//Modules configuration
Swiper.use([Navigation, Pagination])
gsap.registerPlugin(ScrollTrigger)

//Components
import Animations from './components/animations'
import Reviews from './components/Reviews'
import FormManager from './components/FormManager'
import AnchorScroll from './components/AnchorScroll'

class App {
  constructor() {
    gsap.defaults({ ease: "expo.out" });
    gsap.config({ nullTargetWarn: false });

    emitter.on(APP_READY, this.ready)
    emitter.on(TRANSITION_COMPLETED, this.Init.bind(this));

    //Init device to watch resolution/device change
    if (window.innerWidth < 1200) {
      this.currentDevice = 'mobile';
    }
    else {
      this.currentDevice = 'desktop';
    }

    Logger.sayHello();
    this.DOMContentLoaded();
  }

  DOMContentLoaded() {
    preloader.init()

    // Initializing polyfill
    polyfills.map(polyfill => polyfill.init());

    // Adding serialize method to HTMLFormElement
    HTMLFormElement.prototype.serialize = prototype.FormElement.serialize;

    //Window listeners
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.onresize = this.handleResize.bind(this);
  }

  Init(){
    /**
     * Init global animations
     * and components
     */
    Animations.global()
    FormManager.initForms()

    //Functions to call on page load
    this.elementsResize();
    this.setCssVars();

    //Only if mobile
    if (window.innerWidth < 1200) {
      //this.initMobileMenu();
    }
    //Only if desktop
    else{
      //this.menuInit();
    }
  }

  handleScroll() {
    // Manage header size depending on scroll value
    if (window.pageYOffset >= 100) {
      config.header.classList.add('is-small');
    } else {
      config.header.classList.remove('is-small');
    }

    // Show/hide header depending on scroll direction
    if (window.pageYOffset >= window.innerHeight && this.lastScrollPosition < window.pageYOffset) {
      config.header.classList.add('is-hidden');
    } else {
      config.header.classList.remove('is-hidden');
    }

    //Other functions calls

    //Update lastScrollPosition
    this.lastScrollPosition = window.pageYOffset;
  }

  handleResize() {
    //Functions to call on window's size change
    this.elementsResize();
    this.setCssVars();

    /**
     * Manage device switch
    */
    if (window.innerWidth < 1200) {
      var newDevice = 'mobile';
    }
    else{
      var newDevice = 'desktop';
    }
    
    if(newDevice != this.currentDevice){
      var deviceSwitch = 1;
      this.currentDevice = newDevice;
    }
    else{
      var deviceSwitch = 0;
    }

    if (deviceSwitch == 1){
      if (window.innerWidth < 1200) {
        //Functions to call if switching to mobile
      }
      else {
        //Functions to call if switching to desktop
      }
    }
  }

  elementsResize(){
    /**
     * Calculate elements's size if depends on windowSize
    */
  }

  setCssVars(){
    /**
     * CSS vars if depends on windowSize
    */
    var viewportHeight = window.innerHeight;
    document.body.style.setProperty('--viewport-height', `${viewportHeight}px`);
  }

  ready() {
    router.init()

    /**
     * Functions declaration
    */

    
    /**
     * Page Init
    */
    function pageInit() {
      //Init classes
        //GMB Reviews
        new Reviews();
        //Smooth scroll
        new AnchorScroll();

      /**
       * Functions calls
      */
        //function1()

        //mobile only
        if(window.innerWidth < 768){

        }
        //desktop/tablet only
        if(window.innerWidth >= 768){
          
        }
    }
    //Initial call
    pageInit();

    
    /**
     * BarbaJS events
    */
    emitter.on('linkClicked', function(HTMLElement) {
      let href = HTMLElement.href.replace(document.location.origin, '');
      let target = document.querySelector(`a[href$="${href}"]`);

      // Un-comment and edit ./core/menu.js if needed
      // Menu.updateCurrentMenuItem(target);
      // Menu.close();
    });

    /**
     * Call pageInit again if page change
    */
    emitter.on('transitionCompleted', function () {
      pageInit();
      AddToCartManager.reload();
    });
  }
}

export default App