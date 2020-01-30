import map from 'lodash';

export default {
	namespaced: true,
	state:{
		actions: [],
		pagination : {},

		page: 1,
		limit: 15,
	},

	getters:{
	},

	mutations:{
		RESET_STATE(state){
			state.actions = [];
			state.pagination  = {};
			state.page = 1;
		},

		SET_ACTIONS(state, actions){
			state.actions = state.actions.concat(actions.list);
			state.pagination = actions.pagination
		},

		SET_PAGE(state, page){
			state.page = page
		}
	},

	actions:{
		GET_ACTIONS({state, commit}, id){
			return $axios.get($API('user.actions'), {params: {
				user_id: id,
				page: state.page,
				limit: state.limit

			}}).then(resp => {
				commit('SET_ACTIONS', resp)
			})
		}
	}
}


