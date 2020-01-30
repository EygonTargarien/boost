import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '@views/dashboard/DashboardIndex.vue';
import LoginIndex from '@views/LoginIndex';

import $store from '../store';
Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'login',
		component: LoginIndex,
		meta: {
			layout: $store.state.LAYOUT_LOGIN,
			requiresFree: true
		}
	},
	{
		path: '/',
		name: 'dashboard',
		component: Dashboard,
	},

	//builder type default
	{
		path: '/roles',
		name: 'roles',
		component: () => import(/* webpackChunkName: "builderTypeDefault" */ '@views/builderTypeDefault/BuilderIndex'),
		meta: {
			builderType: 'roles'
		}
	},
	{
		path: '/languages',
		name: 'languages',
		component: () => import(/* webpackChunkName: "builderTypeDefault" */ '@views/builderTypeDefault/BuilderIndex'),
		meta: {
			builderType: 'languages'
		}
	},
	{
		path: '/translate-modules',
		name: 'translateModules',
		component: () => import(/* webpackChunkName: "builderTypeDefault" */ '@views/builderTypeDefault/BuilderIndex'),
		meta: {
			builderType: 'translateModules'
		}
	},
	{
		path: '/contacts',
		name: 'contacts',
		component: () => import(/* webpackChunkName: "builderTypeFilter" */ '@views/builderTypeFilter/BuilderIndex'),
		meta: {
			builderType: 'contacts'
		}
	},
	{
		path: '/translates',
		name: 'translates',
		component: () => import(/* webpackChunkName: "builderTypeFilter" */ '@views/builderTypeFilter/BuilderIndex'),
		meta: {
			builderType: 'translates'
		}
	},
	{
		path: '/faq',
		name: 'faq',
		component: () => import(/* webpackChunkName: "builderTypeFilter" */ '@views/builderTypeFilter/BuilderIndex'),
		meta: {
			builderType: 'faq'
		}
	},
	{
		path: '/money',
		name: 'money',
		component: () => import(/* webpackChunkName: "money" */ '@views/money/MoneyIndex'),
	},
	{
		path: '/contacts/:id',
		name: 'contacts_item',
		component: () => import(/* webpackChunkName: "contacts_item" */ '@views/contacts/ContactsItem'),
		props: true,
	},
	{
		path: '/settings',
		name: 'settings',
		component: () => import(/* webpackChunkName: "settings" */ '@views/settings/SettingsIndex'),
	},
	{
		path: '/achievements',
		name: 'achievements',
		component: () => import(/* webpackChunkName: "achievements" */ '@views/achievements/AchievementsIndex'),
	},
	{
		path: '/level',
		name: 'level',
		component: () => import(/* webpackChunkName: "level" */ '@views/level/LevelIndex'),
	},
	{
		path: '/boost-games',
		name: 'boostGames',
		component: () => import(/* webpackChunkName: "boostGames" */ '@views/boostGames/GameIndex'),
	},
	{
		path: '/boost-games/:id',
		name: 'boostGame',
		component: () => import(/* webpackChunkName: "boostGame" */ '@views/boostGames/GameItem'),
		props: true
	},
	{
		path: '/service/:id?',
		name: 'service',
		component: () => import(/* webpackChunkName: "service" */ '@views/boostServices/ServiceIndex'),
		props: true
	},
	{
		path: '/promo-codes',
		name: 'promoCodes',
		component: () => import(/* webpackChunkName: "builderTypeFilter" */ '@views/builderTypeFilter/BuilderIndex'),
		meta: {
			builderType: 'promocodes'
		}
	},


	//404-------------------------/
	{
		path: '*',
		redirect: '/404'
	},
	{
		path: '/404',
		component: () => import(/* webpackChunkName: "404" */ '@views/error404'),
		meta: {
			//layout: $store.state.LAYOUT_ERROR
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({x: 0, y: 0});
			}, 200);
		});
	}
});

router.beforeEach((to, from, next) => {
	if (to.meta.requiresFree === true){
		next();

	} else {
		$store.getters.hasLogged ? next() : next({name: 'login'});
	}
});

window.$router = router;
export default router;
