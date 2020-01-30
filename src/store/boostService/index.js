import {findIndex} from 'lodash';
import Vue from 'vue';

export default {
	namespaced: true,
	state:{
		service: {},
		game: {},

		CONSTRUCTOR_TYPES: {
			'lvl_dv': ['level', 'division'],
			'range': ['range'],
			'lvl_slider': ['level', 'slider'],
			'lvl_dv_slider': ['level', 'division', 'slider'],
			'lvl': ['level'],
			'slider': ['slider_single']
		}
	},

	getters:{

	},

	mutations:{
		SET_SERVICE(state, service){
			state.service = service;
		},

		SET_GAME(state, game){
			state.game = game
		},

		SET_SERVICE_TITLE(state, {title, lang}){
			state.service.item.title[lang] = title
		},
		SET_SERVICE_BLOCK_ONE_TITLE(state, {title, lang}){
			state.service.item.block_one_title[lang] = title
		},
		SET_SERVICE_BLOCK_TWO_TITLE(state, {title, lang}){
			state.service.item.block_two_title[lang] = title
		},

		SET_SERVICE_ACTIVE(state, status){
			state.service.item.is_active = status
		},

		SET_CONSTRUCTOR_TYPE(state, type){
			state.service.item.layout_key = type;
		},

		SAVE_ORDER_OPTION(state, option){
			let params = state.service.details.order_params,
				index = findIndex(params, ['key', option.key]);

			if (index !== -1){
				Vue.set(params, index, option)
			} else {
				params.push(option);
			}
		},
		DELETE_ORDER_OPTION(state, option){
			let params = state.service.details.order_params,
				index = findIndex(params, ['key', option.key]);

			Vue.delete(params, index);
		},

		SAVE_SERVICE_OPTION(state, option){
			let params = state.service.details.params,
				index = findIndex(params, ['key', option.key]);

			if (index !== -1){
				Vue.set(params, index, option)
			} else {
				params.push(option);
			}
		},
		DELETE_SERVICE_OPTION(state, option){
			let params = state.service.details.params,
				index = findIndex(params, ['key', option.key]);

			Vue.delete(params, index);
		},

		SAVE_REGION(state, region){
			let params = state.service.details.regions,
				index = findIndex(params, ['key', region.key]);

			if (region.is_default){
				params.forEach(item => {
					item.is_default = false;
				})
			}

			if (index !== -1){
				Vue.set(params, index, region)
			} else {
				params.push(region);
			}
		},
		DELETE_REGION(state, region){
			let params = state.service.details.regions,
				index = findIndex(params, ['key', region.key]);

			Vue.delete(params, index);
		},
	},

	actions:{
		GET_SERVICE({commit}){
			// return $axios.get($API('boost.service', game_id)).then(resp => {
			// 	commit('SET_SERVICE', resp);
			// })

			//TODO change
			return new Promise(resolve => {
				commit('SET_SERVICE', {
					"item": {
						"game_id": 1,
						is_active: true,
						"layout_key": "lvl_dv",
						"title": {
							"ru": "Прокачка персонажа",
							"en": "Character leveling"
						},
						"block_one_title": {
							"ru": "Ваш текущий ранг",
							"en": "Your current rank"
						},
						"block_two_title": {
							"ru": "Ваш желаемый ранг",
							"en": "Your desired rank"
						}
					},
					"details": {
						"champions": [
							{
								"key": "champion_1",
								"name": {
									"ru": "Champion 1",
									"en": "Champion 1"
								},
								"value": 1,
								"image": "base64_encoded_image"
							},
							{
								"key": "champion-2",
								"name": {
									"ru": "Champion 2",
									"en": "Champion 2"
								},
								"value": 2,
								"image": "base64_encoded_image"
							}
						],
						"order_params": [
							{
								"title": {
									"ru": "Параметр 1",
									"en": "Some param 1"
								},
								"key": "some_param_1",
								"rate": 2,
								"is_default": true
							},
							{
								"title": {
									"ru": "Параметр 2",
									"en": "Some param 2"
								},
								"key": "some_param_2",
								"rate": null,
								"is_default": false
							},
							{
								"title": {
									"ru": "Параметр 3",
									"en": "Some param 3"
								},
								"key": "some_param_3",
								"rate": 2,
								"is_default": true
							}
						],
						"params": [
							{
								"title": {
									"ru": "Парам 1",
									"en": "Some param 1"
								},
								"key": "some_param_1",
								"options": [
									{
										"title": {
											"ru": "Опция 1",
											"en": "Some option 1"
										},
										"value": 1,
										"rate": 1,
										"is_default": false
									},
									{
										"title": {
											"ru": "Опция 2",
											"en": ""
										},
										"value": 2,
										"rate": 0.2,
										"is_default": true
									}
								]
							},
							{
								"title": {
									"ru": "Парам 2",
									"en": ""
								},
								"key": "some_param_2",
								"options": [
									{
										"title": {
											"ru": "Опция 1",
											"en": "Some option 1"
										},
										"value": 1,
										"rate": 1,
										"is_default": false
									},
									{
										"title": {
											"ru": "Опция 2",
											"en": ""
										},
										"value": 2,
										"rate": null,
										"is_default": true
									}
								]
							}
						],
						"regions": [
							{
								id: 1,
								key: 'reg_1',
								"title": {
									"ru": "Some region 1",
									"en": "Some region 1"
								},
								"is_default": true
							},
							{
								id: 2,
								key: 'reg_2',
								"title": {
									"ru": "Some region 2",
									"en": "Some region 2"
								},
								"is_default": false
							}
						],
						"selects": [
							{
								"title": {
									"ru": "Some select 1",
									"en": "Some select 1"
								},
								"key": "some_key",
								"position": 1,
								"options": [
									{
										"text": {
											"ru": "Some option 1",
											"en": "Some option 1"
										},
										"image": "base64_encoded_image",
										"key": "option_value",
										"price": 20,
										"time": 15,
										"is_selected": true,
										"insides": [
											{
												"title": {
													"ru": "Some inside select 1",
													"en": "Some inside select 1"
												},
												"key": "some_inside_key",
												"position": 1,
												"options": [
													{
														"text": {
															"ru": "Some option 1",
															"en": "Some option 1"
														},
														"image": "base64_encoded_image",
														"key": "option_value",
														"price": 20,
														"time": 15,
														"is_selected": true
													}
												],
												"additional": {
													"price": 20,
													"time": 100,
													"some_attribute": 20
												}
											}
										],
									}
								],
								"additional": {
									"price": 20,
									"time": 100,
									"some_attribute": 20
								}
							},

							{
								"title": {
									"ru": "Some select 2",
									"en": "Some select 2"
								},
								"key": "some_key",
								"position": 1,
								"options": [
									{
										"text": {
											"ru": "Some option 1",
											"en": "Some option 1"
										},
										"image": "base64_encoded_image",
										"key": "option_value",
										"price": 20,
										"time": 15,
										"is_selected": true,
										"insides": [
											{
												"title": {
													"ru": "Some inside select 1",
													"en": "Some inside select 1"
												},
												"key": "some_inside_key",
												"position": 1,
												"options": [
													{
														"title": {
															"ru": "Some option 1",
															"en": "Some option 1"
														},
														"image": "base64_encoded_image",
														"key": "option_value",
														"price": 20,
														"time": 15,
														"is_selected": true
													}
												],
												"additional": {
													"price": 20,
													"time": 100,
													"some_attribute": 20
												}
											}
										]
									},
									{
										"text": {
											"ru": "Some option 2",
											"en": "Some option 2"
										},
										"image": "base64_encoded_image",
										"key": "option_value",
										"price": 20,
										"time": 15,
										"is_selected": true,
										"insides": null
									}
								],
								"additional": {
									"price": 20,
									"time": 100,
									"some_attribute": 20
								}
							}
						]
					}
				});

				return resolve()
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
				promo: require('@img/games/lol_bg.jpg')
			});
		},
	}
}


