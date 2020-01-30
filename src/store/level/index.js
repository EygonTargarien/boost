export default {
	namespaced: true,
	state:{
		levels: [],
	},

	getters:{

	},

	mutations:{
		SET_LEVELS(state, levels){
			state.levels = levels;
		},
	},

	actions:{
		GET_LEVELS({commit}){
			// return $axios.get($API('level')).then(resp => {
			// 	commit('SET_COINS', resp);
			// })

			//TODO change
			commit('SET_LEVELS', [
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

		SAVE_LEVEL({}, payload){
			return $axios.get($API('level'), payload)
		},

		DELETE_LEVEL({}, id){
			return $axios.delete($API('level', id))
		}
	}
}


