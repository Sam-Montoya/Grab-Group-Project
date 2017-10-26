/**
 * This controller holds all the post requests
 */

module.exports = {
	// Adds a listing into the database
	addListing(DB, request, response) {
		// console.log(request)
		DB.find_user(request.body.auth_id).then((userData) => {
			console.log(userData);
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
		DB.add_favorite([ listing_id, user_id ])
			.then((res) => {
				response.status(200).send('Favorite has been added!');
			})
			.catch((_) => {
				response.status(400).send('Failed to add favorites.');
			})
			.then((increment) => {
				DB.increment_favorites(listing_id);
			});
	},

	// Adds a message to the chat of that listing
	startChat(DB, request, response) {
		console.log(request.body);
		DB.start_chat([ request.body.owner_id, request.body.client_id, request.body.listing_id, request.body.date_modified ]).then((_) => {
			response.status(200).send('Chat has been started!');
		});
	},

	addMessage(DB, request, response) {
		console.log(request.body);
		console.log(request.params);
		let { auth_id_of_comment, owner_id, client_id, message, time_submitted } = request.body;
		let commentInfo = {
			auth_id_of_comment: auth_id_of_comment,
			message: message,
			time_submitted: time_submitted
		};

		DB.get_listing(request.params.listing_id).then((listingData) => {
			if (auth_id_of_comment === owner_id) {
				DB.add_owner_message([
					commentInfo,
					request.params.listing_id,
					auth_id_of_comment,
					client_id
				]).then((_) => {
					DB.add_notification(request.body.client_id).then((_) => {
						response.status(200).send('Comment Submitted from the Owner!');
					});
				});
			} else {
				DB.add_client_message([
					commentInfo,
					request.params.listing_id,
					auth_id_of_comment,
					owner_id
				]).then((_) => {
					DB.add_notification(listingData[0].auth_id).then((_) => {
						response.status(200).send('Comment Submitted from the Client!');
					});
				});
			}
		});
	}
};
