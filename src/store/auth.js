export default {
    state: {
	    ROLE_DEV: 'dev',

        token: localStorage.getItem('_token_boost_crm') || null,
	    user: JSON.parse(localStorage.getItem('_user_boost_crm')) || null,
    },

    getters: {
        hasLogged: state => {
            return state.token !== null;
        },

	    hasUser(state){
        	return !!state.user
	    },

	    accessDev(state){
        	if (!state.user) return false;
        	return state.user.role === state.ROLE_DEV
	    }
    },

    mutations: {
        SET_TOKEN (state, token) {
            state.token = token;
        },

	    SET_USER (state, user) {
		    state.user = user;
	    },

        LOGOUT(state){
            state.token = null;
            state.user = null;
        },
    },

    actions: {
	    AUTH_LOGIN({commit}, payload) {
		    return $axios.post($API('user.login'), payload).then(resp => {
		    	let token = 'Bearer ' + resp.token;

			    localStorage.setItem('_token_boost_crm', token);
			    localStorage.setItem('_user_boost_crm', JSON.stringify(resp.user));

			    $axios.defaults.headers.common['Authorization'] = token;
			    // console.log($axios.defaults.headers);
			    // console.log(token);

			    commit('SET_TOKEN', resp.token);
			    commit('SET_USER', resp.user);
		    });
	    },

        AUTH_LOGOUT({commit}){
            return new Promise((resolve, reject) => {
                commit('LOGOUT');

                localStorage.removeItem('_token_boost_crm');
                localStorage.removeItem('_user_boost_crm');
                delete $axios.defaults.headers.common['Authorization'];

                resolve();
            })
        }
    }
};
