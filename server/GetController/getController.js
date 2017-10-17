/**
 * This controller holds all the get requests
 */

module.exports = {
	//This is ran when the user first logs in (user info being stored on redux)
	getInitialUserInfo(DB, response) {
		DB.get_initial_user('123').then(userData => {
			response.status(200).send(userData);
		});
	},

	//This is called when clicking on a listing (user listing info)
	getUserInfo(DB, response) {
		DB.get_user_info(1).then(userData => {
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
	}
};
