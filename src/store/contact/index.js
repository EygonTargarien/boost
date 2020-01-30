export default {
	namespaced: true,
	state:{
		contact:{},
	},

	mutations:{
		SET_CONTACT(state, contact){
			state.contact = contact;
		},
	},

	actions:{
		GET_CONTACT({commit}, id){
			return $axios.get($API('contacts', id)).then(resp => {
				commit('SET_CONTACT', resp.item);
			})
		}
	}
}


