import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false;
window.$EventBus = new Vue();
import {forIn} from 'lodash';

//---------env-------------------------/
import env from '../env';
window.$ENV = env;


//--------noty--------------------------/
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
Vue.use(VueNoty, {
	timeout: 4000,
	theme: 'sunset',
	progressBar: true,
	layout: 'bottomRight'
});



//--------validator---------------------/
import VeeValidate, { Validator } from 'vee-validate';
Vue.use(VeeValidate);



//--------apiMap------------------------/
import './apiMap';


//--------mask-------------------/
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);


//---------add axios--------------------/
import axios from 'axios'
window.$axios = axios;

import {loadProgressBar} from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
loadProgressBar();

axios.interceptors.response.use((resp) => {
	if (resp.data.message) app.$noty.success(resp.data.message);
	return resp.data;

}, function (err) {
	let status = err.response.status;

	if (status === 401) {
		console.warn('Unauthorized');
		$store.dispatch('AUTH_LOGOUT').then(() => {
			$router.push({ name: 'LoginIndex' });
			app.$noty.error('Unauthorized');
		});

	} else {
		let errorMsg = err.response.data.message;
		if (!errorMsg) return;

		if (typeof(errorMsg) === 'string'){
			app.$noty.error(errorMsg);

		}  else {
			forIn(errorMsg, (item, key) => {
				app.$noty.error(item);
			})
		}

		return Promise.reject(err);
	}
});


//--------store-------------------------/
import store from './store';
window.$store = store;


//--------router-----------------------/
import router from './router'



//--------modal--------------------------/
import VModal from 'vue-js-modal';
Vue.use(VModal, {
	dynamic: true,
	injectModalsContainer: true
});

window.$MODAL_OPTIONS = {
	default: {
		delay: 100,
		draggable: false,
		adaptive: true,
		scrollable: true,
		height: 'auto',
		clickToClose: true,
	}
};
$MODAL_OPTIONS.big = {
  ...$MODAL_OPTIONS.default,
	width: 900,
	maxWidth: 900
};
$MODAL_OPTIONS.full = {
	...$MODAL_OPTIONS.default,
	width: 1280,
	maxWidth: 1280,
};


//--------------------------------------/
const app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

window.$noty = app.$noty;
