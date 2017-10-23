import axios from 'axios';

const initialState = {
	user: {},
	favorites: [],
	search_term: ''
};

//ACTION TYPES
const GET_USER_INFO = 'GET_USER_INFO';
const GET_USER_FAVORITES = 'GET_USER_FAVORITES';
const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';

//ACTION CREATORS
export function getUserInfo() {
	let userInfo = axios.get('/auth/me').then((userData) => {
		if (userData.data[0].hasOwnProperty('profile_pic')) {
			return userData.data[0];
		} else if(userData.data[0].hasOwnProperty('nickname')) {
			alert('Something happened with the login. Please try again later.');
		}
	});
	return {
		type: GET_USER_INFO,
		payload: userInfo
	};
}

export function getUserFavorites(user_id) {
	if (user_id) {
		let userFavorites = axios.get(`/api/getUserFavorites/${user_id}`).then((favorites) => {
			return favorites.data;
		});
		return {
			type: GET_USER_FAVORITES,
			payload: userFavorites
		};
	} else {
		return {
			type: GET_USER_FAVORITES,
			payload: []
		};
	}
}

export function updateSearchTerm(word){
	return {
		type: UPDATE_SEARCH_TERM,
		payload: word
	}
}

//REDUCER FUNCTION
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER_INFO + '_FULFILLED':
			return Object.assign({}, state, { user: action.payload });
		case GET_USER_FAVORITES + '_FULFILLED':
			return Object.assign({}, state, { favorites: action.payload });
		case UPDATE_SEARCH_TERM:
			return Object.assign({}, state, { search_term: action.payload });
		default:
			return state;
	}
}
