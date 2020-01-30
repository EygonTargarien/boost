export default {
	namespaced: true,
	state:{
		games: [],
		game: {}
	},

	getters:{

	},

	mutations:{
		SET_GAMES(state, games){
			state.games = games;
		},

		SET_GAME(state, game){
			state.game = game;
		}
	},

	actions:{
		GET_GAMES({commit}){
			return $axios.get($API('games')).then(resp => {
				commit('SET_GAMES', resp.list);
			})
		},

		SAVE_GAME({commit}, formData){
			return $axios.post($API('games'), formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
		},

		GET_GAME({commit}, game_id){
			// return $axios.get($API('boost.services', game_id)).then(resp => {
			// 	commit('SET_GAME', resp);
			// })

			//TODO change
			commit('SET_GAME', {
				title: 'League of Legends',
				logo: require('@img/games/lol_logo.png'),
				promo: require('@img/games/lol_bg.jpg'),
				services:[
					{
						id: 1,
						title: 'Прокачивание дивизионнов',
					},
					{
						id: 1,
						title: 'Квалификационные игры',
					},
					{
						id: 1,
						title: 'Дуо игры',
					},
					{
						id: 1,
						title: 'Точные победы',
					},
					{
						id: 1,
						title: 'Победы в нормалах',
					},
					{
						id: 1,
						title: 'TFT',
					},
					{
						id: 1,
						title: 'Мастерство чемпионов',
					},
					{
						id: 1,
						title: 'Обучение',
					}
				]
			});
		},
	}
}


