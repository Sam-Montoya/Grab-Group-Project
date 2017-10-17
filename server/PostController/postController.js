/**
 * This controller holds all the post requests
 */

module.exports = {
	// Adds a listing into the database
	addListing(DB, request, response) {
		let { auth_id, user_id, title, price, images, city, state, zip, description, pros, cons, phone_number, contact_status, time_submitted } = req.body;
		DB.add_listing([auth_id, user_id, title, price, images, city, state, zip, description, pros, cons, phone_number, contact_status, time_submitted]).then((listing) => {
			response.status(200).send('Listing has been added');
		});
	},

	// Adds the listing to the favorites
	addFavorite(DB, request, response) {
		DB.add_favorite([ request.params.listing_id, request.params.auth_id ]).then((res) => {
			response.status(200).send('Favorite has been added!');
		});
	},

	// Adds a message to the chat of that listing
	startChat(DB, request, response) {
		DB.start_chat([ request.body.owner_id, request.body.client_id, request.body.listing_id ]).then((_) => {
			response.status(200).send('Chat has been started!');
		});
	},

	addMessage(DB, request, response) {
		let commentInfo = {
			auth_id_of_comment: request.body.auth_id_of_comment,
			message: request.body.message,
			time_submitted: request.body.time_submitted
		};

		DB.get_listing(request.params.listing_id).then((listingData) => {
			if (listingData[0].auth_id === request.body.auth_id_of_comment) {
				DB.add_owner_message([
					commentInfo,
					request.params.listing_id,
					request.body.auth_id_of_comment
				]).then((_) => {
					response.status(200).send('Comment Submitted!');
				});
			} else {
				DB.add_client_message([
					commentInfo,
					request.params.listing_id,
					request.body.auth_id_of_comment
				]).then((_) => {
					response.status(200).send('Comment Submitted!');
				});
			}
		});
	}
};
