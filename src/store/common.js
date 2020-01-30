export default {
	state: {
		languages: [],
		roles: [],
		currencies: [],
		countries: [],
		translate_modules: [],
		faq_types: []
	},

	mutations: {
		SET_LIST(state, {prop, data}){
			state[prop] = data
		},
	},

	actions: {
		GET_LANGUAGES({commit}){
			return $axios.get($API('languages')).then(resp => {
				commit('SET_LIST', {
					prop: 'languages',
					data: resp.list
				})
			});
		},

		GET_ROLES({commit}){
			return $axios.get($API('user.roles')).then(resp => {
				commit('SET_LIST', {
					prop: 'roles',
					data: resp.list
				})
			})
		},

		GET_CURRENCIES({commit}){
			return $axios.get($API('currencies')).then(resp => {
				commit('SET_LIST', {
					prop: 'currencies',
					data: resp.list
				})
			})
		},

		GET_COUNTRIES({commit}){
			return $axios.get($API('countries')).then(resp => {
				commit('SET_LIST', {
					prop: 'countries',
					data: resp.list
				})
			})
		},

		GET_TRANSLATE_MODULES({commit}){
			return $axios.get($API('translates.modules')).then(resp => {
				commit('SET_LIST', {
					prop: 'translate_modules',
					data: resp.list
				})
			})
		},

		GET_FAQ_TYPES({rootState, commit}){
			// TODO api for get faq_types
			commit('SET_LIST', {
				prop: 'faq_types',
				data: rootState.FAQ_TYPES
			})
		}
	}
};
