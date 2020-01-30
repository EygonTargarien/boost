import $ENV from '../env';

const apiPath = $ENV.API_PATH + '/api';

const map = {
	'user.login': '/auth/login',
	'user.roles': '/users/roles',
	'user.actions': '/users/actions',

	'countries': '/countries',
	'contacts': '/users',
	'currencies': '/currencies',
	'faq': '/faq',
	'languages': '/languages',

	'translates': '/translates',
	'translates.modules': '/scopes',

	'games': '/games',

	//TODO template api
	'coins': '/coins',
	'achievements': '/achievements',
	'level': '/level',

	'boost.services': '/services',
	'promocodes': '/promocodes'
};

window.$API = (apiKey, param, query, options = {}) => {
	let queryStr = '',
		paramStr = '';

	if (param) {
		paramStr += `/${param}`;
	}

	if (query) {
		queryStr += '?';

		for (let key in query){
			queryStr += key + '=' + query[key] + '&';
		}

		queryStr = queryStr.substring(0, queryStr.length - 1)
	}

	return  apiPath + map[apiKey] + paramStr + queryStr;
};
