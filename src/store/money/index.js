export default {
	namespaced: true,
	state:{
		coins: [],
	},

	getters:{

	},

	mutations:{
		SET_COINS(state, coins){
			state.coins = coins;
		},
	},

	actions:{
		GET_COINS({commit}){
			// return $axios.get($API('coins')).then(resp => {
			// 	commit('SET_COINS', resp);
			// })

			//TODO change
			commit('SET_COINS', [
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

		SAVE_COIN({}, payload){
			return $axios.get($API('coins'), payload)
		},

		DELETE_COINS({}, id){
			return $axios.delete($API('coins', id))
		}
	}
}


