import { gsap } from 'gsap'

class Animations {
    constructor() {
        this.init()
    }

    init() {
        console.log('Loaded Animations :')
    }

    global() {
        console.log('- Global')
    }

    /*pageEntries() {
        console.log('- Page Entries')
    }*/

    frontPage() {
        console.log('- Home')
    }
}

export default new Animations();