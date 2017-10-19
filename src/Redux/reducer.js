import axios from 'axios';

const initialState = {
    user: {}
}

//ACTION TYPES
const GET_USER_INFO = 'GET_USER_INFO';

//ACTION CREATORS
export function getUserInfo() {
    let userInfo = axios.get('/auth/me').then(res => {
        if (res.data !== 'User not found') {
            return res.data;
        }
    })
    return {
        type: GET_USER_INFO,
        payload: userInfo
    }
}

//REDUCER FUNCTION
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload});
        default:
            return state;
    }
}