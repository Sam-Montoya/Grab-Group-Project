const axios = require('axios');

/**
 * This controller holds all the get requests
 */

module.exports = {
	//This is ran when the user first logs in (user info being stored on redux)
	getInitialUserInfo(DB, request, response) {
		DB.get_initial_user(request.params.auth_id).then((userData) => {
			if (userData[0]) response.status(200).send(userData);
			else response.status(404).send('User Not Found...');
		});
	},

	//This is called when clicking on a listing (user listing info)
	getUserInfo(DB, request, response) {
		DB.get_user_info(request.params.user_id).then((userData) => {
			response.status(200).send(userData);
		});
	},

	//This should be called when the user updates their favorites (called to get the new updated list)
	getUserFavorites() {
		console.log('Hit get user listings!');
	},

	//This is called when viewing the user's chats
	getUserChats() {
		console.log('Hit get user chats!');
	},

	getProducts(db, response) {
		axios.get('https://practiceapi.devmountain.com/products').then(data => {
			response.status(200).send(data.data);
		})
	}
};
