/**
 * This controller holds all the get requests
 */

module.exports = {
	constructor(props) {
		console.log(props);
	},

	//This is ran when the user first logs in (user info being stored on redux)
	getInitialUserInfo() {
		console.log('Hit initial user info!');
	},

	//This is called when clicking on a listing (user listing info)
	getUserInfo() {
		console.log('Hit get user info!');
	},

	//This should be called when the user updates their favorites (called to get the new updated list)
	getUserFavorites() {
		console.log('Hit get user listings!');
	},

	//This is called when viewing the user's chats
	getUserChats() {
		console.log('Hit get user chats!');
	}
}
