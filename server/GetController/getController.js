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
		try {
			DB.get_user_info(request.params.auth_id).then((userData) => {
				if (userData[0]) response.status(200).send(userData[0]);
				else response.status(404).send('User Not Found...');
			});
		} catch (err) {
			response.status(404).send(err);
			console.log('Something went wrong ' + err);
		}
	},

	getUserInfoById(DB, request, response) {
		try {
			DB.get_user_info_byID(request.params.user_id).then((userData) => {
				if (userData[0]) response.status(200).send(userData[0]);
				else response.status(404).send('User Not Found...');
			});
		} catch (err) {
			response.status(404).send(err);
			console.log('Something went wrong ' + err);
		}
	},

	//This should be called when the user updates their favorites (called to get the new updated list)
	getUserFavorites(DB, request, response) {
		try {
			DB.get_user_favorites(request.params.user_id).then((userFavorites) => {
				response.status(200).send(userFavorites);
			});
		} catch (err) {
			console.log('Something went wrong... ' + err);
			response.status(404).send(err);
		}
	},

	//This is called when viewing the user's chats
	getUserChats(DB, request, response) {
		DB.get_user_chats(request.params.auth_id).then((userChats) => {
			response.status(200).send(userChats);
		});
	},

	getAllListings(DB, response) {
		try {
			DB.get_all_listings().then((data) => {
				response.status(200).send(data);
			});
		} catch (err) {
			console.log('Something went wrong... ' + err);
			response.status(404).send('Wrong');
		}
	},

	getListing(DB, request, response) {
		try {
			DB.get_listing(request.params.listing_id).then((listingData) => {
				response.status(200).send(listingData[0]);
			});
		} catch (err) {
			console.log('Something went wrong... ' + err);
			response.status(404).send(err);
		}
	},

	getUserListings(DB, request, response) {
		try {
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
					response.status(404).send('User does not Exist');
				}
			});
		} catch (err) {
					
			respone.status(404).send(err);
		}
	},

	search(DB, request, response) {
		DB.search_database(request.params.search_term).then((results) => {
			response.status(200).send(results);
		});
	}, 

	getZips(DB, request, response) {
		axios.get(`https://www.zipcodeapi.com/rest/${process.env.ZIPCODE_API_KEY}/radius.json/${request.params.zip}/${request.params.miles}/miles?minimal`).then((res) => {
			if(res.status === 200){
				response.status(200).send(res.data);
			}
		})
	}
};
