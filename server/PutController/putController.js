/**
 * This controller holds all the put requests
 */

module.exports = {
	// Updates the User info
	updateUserInfo(DB, request, response) {
		let { auth_id, full_name, username, profile_pic, city, state, zip, email, cover_photo } = request.body;
		DB.find_user(auth_id).then((userData) => {
			if (userData[0]) {
				DB.update_user_info([
					full_name,
					username,
					profile_pic,
					city,
					state,
					zip,
					email,
					cover_photo,
					auth_id
				]).then((_) => {
					response.status(200).send('User has been updated.');
				});
			} else {
				response.status(404).send('User with that ID was not found.');
			}
		});
	},

	checkUserName(DB, request, response) {
		DB.check_username(request.params.username).then((status) => {
			if (status[0].exists === true) response.status(200).send('Username is taken.');
			else response.status(400).send('Username Available!');
		});
	},

	// Updates the notification count to zero when the user sees it
	updateNotificationCount(DB, request, response) {
		DB.update_notification([request.body.auth_id, request.body.owner_id, request.body.client_id, request.body.listing_id]).then((_) => {
			response.status(200).send('Notifications have been viewed and reset.');
		});
	},

	updateImages(DB, request, response) {
		for (let i = 0; i < request.body.images.length; i++) {
			DB.update_images([request.body.images[i], request.body.listing_id]).then((res) => {
				response.status(200).send('Added');
			});
		}
	}
};
