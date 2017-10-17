/**
 * This controller holds all the post requests
 */

module.exports = {
	// Adds a listing into the database
	addListing() {},
	// Adds the listing to the favorites
	addToFavorites() {},
	// Adds a message to the chat of that listing
	startChat() {},

	addMessage(DB, request, response) {
		DB.add_message([ request.body, request.params.listing_id ]).then((_) => {
			response.status(200).send('Comment Submitted');
		});
	}
};
