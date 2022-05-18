import Barba from 'barba.js'
import Animations from '../components/animations';

const home = Barba.BaseView.extend({
	namespace: 'front-page',

	onEnter() {
		//Init animations
		Animations.frontPage()
	},

	onEnterCompleted() { },

	onLeave() { },

	onLeaveCompleted() { }
})

export default home
