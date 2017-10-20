import axios from 'axios';

const initialState = {
	user: {},
	favorites: []
};

//ACTION TYPES
const GET_USER_INFO = 'GET_USER_INFO';
const GET_USER_FAVORITES = 'GET_USER_FAVORITES';

//ACTION CREATORS
export function getUserInfo() {
	let userInfo = axios.get('/auth/me').then((userData) => {
		if (userData.data !== 'User not found') {
			return userData.data[0];
		}
	});
	return {
		type: GET_USER_INFO,
		payload: userInfo
	};
}

export function getUserFavorites(user_id) {
	let userFavorites = axios.get(`/api/getUserFavorites/${user_id}`).then((favorites) => {
		return favorites.data;
	})
	console.log('userfav', userFavorites);
	return {
		type: GET_USER_FAVORITES,
		payload: userFavorites
	}
}

//REDUCER FUNCTION
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER_INFO + '_FULFILLED':
			return Object.assign({}, state, { user: action.payload });
		case GET_USER_FAVORITES:
			console.log('HIT')
			return Object.assign({}, state, { favorites: action.payload });
		default:
			return state;
	}
}