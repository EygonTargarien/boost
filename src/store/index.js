import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {forIn} from 'lodash';

import auth from '@/store/auth'
import common from '@/store/common';
import builderTypeFilter from '@/store/builders/builderTypeFilter';

import contact from '@/store/contact'
import contact_actions from '@/store/contact/actions'
import money from '@/store/money'
import achievement from '@/store/achievement'
import settings from '@/store/settings'
import level from '@/store/level'
import boostGames from '@/store/boostGames'
import boostService from '@/store/boostService'

export default new Vuex.Store({
	modules: {
		auth,
		common,

		builderTypeFilter,
		contact,
		contact_actions,
		money,
		settings,
		achievement,
		level,
		boostGames,
		boostService
	},

	state: {
		LAYOUT_DEFAULT: 'default-layout',
		LAYOUT_LOGIN: 'login-layout',
		LAYOUT_ERROR: 'error-layout',

		DEFAULT_LANG:{
			code: "ru",
			name: "Русский"
		},

		FAQ_TYPES:[
			{
				name: 'Global',
				key: 'common'
			},
			{
				name: 'Game',
				key: 'game'
			}
		],

		layout: 'default-layout',
		hasOpenMenu: true
	},

	mutations: {
		SET_LAYOUT (state, payload) {
			state.layout = payload;
		},
		SET_OPEN_MENU (state, status){
			state.hasOpenMenu = status
		},
	},

	actions: {
		COMMON_VALIDATE_ERRORS({state}, {err, validateErrors}){
			let list = err.response.data.message;

			forIn(list, (item,key) => {
				validateErrors.add({
					field: key,
					msg: item[0]
				});
			});
		},
	},
});
