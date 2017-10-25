/**
 * This controller holds all the post requests
 */

module.exports = {
	// Adds a listing into the database
	addListing(DB, request, response) {
		// console.log(request)
		DB.find_user(request.body.auth_id).then((userData) => {
			console.log(userData)
			if (userData[0]) {
				let {
					auth_id,
					user_id,
					title,
					price,
					images,
					city,
					state,
					zip,
					description,
					pros,
					cons,
					phone_number,
					contact_status,
					time_submitted,
					category
				} = request.body;

				DB.add_listing([
					auth_id,
					user_id,
					title,
					price,
					images,
					city,
					state,
					zip,
					description,
					pros,
					cons,
					phone_number,
					contact_status,
					time_submitted,
					category
				]).then((listing) => {
					response.status(200).send('Listing has been added');
				});
			} else {
				response.status(404).send('Please log in to post a listing.');
			}
		});
	},

	// Adds the listing to the favorites
	addFavorite(DB, request, response) {
		let { listing_id, user_id } = request.body;
		DB.add_favorite([listing_id, user_id])
			.then((res) => {
				response.status(200).send('Favorite has been added!');
			})
			.catch((_) => {
				response.status(400).send('Failed to add favorites.');
			})
			.then((increment) => {
				DB.increment_favorites(listing_id);
			})
	},

	// Adds a message to the chat of that listing
	startChat(DB, request, response) {
		DB.start_chat([request.body.owner_id, request.body.client_id, request.body.listing_id]).then((_) => {
			response.status(200).send('Chat has been started!');
		});
	},

	addMessage(DB, request, response) {
		console.log(request.body)
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
					DB.add_notification(request.body.client_id).then((_) => {
						response.status(200).send('Comment Submitted from the Owner!');
					});
				});
			} else {
				DB.add_client_message([
					commentInfo,
					request.params.listing_id,
					request.body.auth_id_of_comment
				]).then((_) => {
					DB.add_notification(listingData[0].auth_id).then((_) => {
						response.status(200).send('Comment Submitted from the Client!');
					});
				});
			}
		});
	}
};
