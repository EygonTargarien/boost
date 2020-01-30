export default {
	namespaced: true,
	state:{
		achievements: [],
	},

	getters:{

	},

	mutations:{
		SET_ACHIEVEMENTS(state, achievements){
			state.achievements = achievements;
		},
	},

	actions:{
		GET_ACHIEVEMENTS({commit}){
			// return $axios.get($API('achievements')).then(resp => {
			// 	commit('SET_ACHIEVEMENTS', resp);
			// })

			//TODO change
			commit('SET_ACHIEVEMENTS', [
				{
					id: 1,
					hasHot: false,
					cost: 1000,
					bonus: 300
				},
				{
					id: 2,
					hasHot: true,
					cost: 2000,
					bonus: 300
				},
				{
					id: 1,
					hasHot: false,
					cost: 1000,
					bonus: 300
				},
				{
					id: 1,
					hasHot: false,
					cost: 4000,
					bonus: 300
				},
				{
					id: 1,
					hasHot: false,
					cost: 1000,
					bonus: 300
				},
				{
					id: 2,
					hasHot: true,
					cost: 2000,
					bonus: 300
				},
				{
					id: 1,
					hasHot: false,
					cost: 1000,
					bonus: 300
				},
				{
					id: 1,
					hasHot: false,
					cost: 4000,
					bonus: 300
				},
				{
					id: 1,
					hasHot: false,
					cost: 1000,
					bonus: 300
				},
				{
					id: 2,
					hasHot: true,
					cost: 2000,
					bonus: 300
				},
				{
					id: 1,
					hasHot: false,
					cost: 1000,
					bonus: 300
				},
				{
					id: 1,
					hasHot: false,
					cost: 4000,
					bonus: 300
				}
			]);
		},

		SAVE_ACHIEVEMENT({}, payload){
			return $axios.get($API('achievements'), payload)
		},

		DELETE_ACHIEVEMENT({}, id){
			return $axios.delete($API('achievements', id))
		}
	}
}


