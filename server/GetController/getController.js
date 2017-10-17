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
		DB.get_user_info(request.params.auth_id).then((userData) => {
			if (userData[0]) response.status(200).send(userData);
			else response.status(404).send('User Not Found...');
		});
	},

	//This should be called when the user updates their favorites (called to get the new updated list)
	getUserFavorites(DB, request, response) {
		DB.get_user_favorites(request.params.user_id).then((userFavorites) => {
			response.status(200).send(userFavorites);
		});
	},

	//This is called when viewing the user's chats
	getUserChats(DB, request, response) {
		DB.get_user_chats(request.params.auth_id).then((userChats) => {
			response.status(200).send(userChats);
		});
	},

	getProducts(db, response) {
		axios.get('https://practiceapi.devmountain.com/products').then((data) => {
			response.status(200).send(data.data);
		});
	},

	getUserListings(DB, request, response) {
		DB.find_user(request.params.auth_id).then((user) => {
			if (user[0]) {
				DB.get_user_listings(request.params.auth_id).then((userListings) => {
					if (userListings[0]) {
						response.status(200).send(userListings);
					} else {
						response.status(200).send('No Listings From this User.');
					}
				});
			} else {
				response.status(200).send('User does not Exist');
			}
		});
	}
};
