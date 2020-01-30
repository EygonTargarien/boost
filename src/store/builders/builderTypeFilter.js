import {pickBy} from 'lodash';
import axios from 'axios'

const CancelToken = axios.CancelToken;
let cancel;

export default {
	namespaced: true,
	state:{
		list: [],
		pagination : {},

		filter:{
			page: 1,
			limit: 15,
		}
	},

	getters:{
		fullFilter(state){
			return pickBy(state.filter, item => {
				return !!item
			});
		}
	},

	mutations:{
		SET_LIST(state, listCnf){
			state.list = listCnf.list;
			state.pagination = listCnf.pagination
		},

		MUTATION_FILTER(state, newFilterObj){
			state.filter = Object.assign({}, state.filter, newFilterObj);
		},

		MUTATION_RESET_MODULE(state){
			state.list = [];

			state.filter = {
				page: 1,
				limit: 15,
			}
		}
	},

	actions:{
		GET_LIST({state, getters, commit}, {lang = 'en', apiKey}){
			if(cancel) cancel();

			return $axios.get($API(apiKey),{
				params: getters.fullFilter,
				cancelToken: new CancelToken(function executor(c) {
					cancel = c;
				}),
				headers: {
					'Content-Language': lang
				}
			}).then(resp => {
				commit('SET_LIST', resp);
			})
		},

		DELETE_ITEM({commit}, {id, apiKey}){
			return $axios.delete($API(apiKey, id));
		},
	}
}


