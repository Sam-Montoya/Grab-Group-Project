/**
 * This controller holds all the delete requests
 */

module.exports = {
	// This sets the column owner_delete to True making it invisible for the owner but not for the client
	deleteChat(DB, request, response) {
		DB.get_listing(request.body.listing_id).then((listingData) => {
			if (listingData[0].auth_id === request.body.listing_auth_id) {
				//Delete Owner Chat
				DB.set_owner_delete([
					request.body.listing_id,
					request.body.listing_auth_id,
					request.body.client_id
				]).then((_) => {
					response.status(200).send('Deleted Owner Chat');
				});
			} else {
				//Delete Client Chat
				DB.set_client_delete([ request.body.listing_id, request.body.client_id ]).then((_) => {
					response.status(200).send('Deleted Client Chat');
				});
			}
		});
	},

	// Removes the listing from your favorites
	removeFromFavorites(DB, request, response) {
		console.log(request.params);
		DB.remove_favorite([ request.params.listing_id, request.params.user_id ]).then((res) => {
			response.status(200).send('Favorite has been deleted');
		});
	},
	// Removes a listing from the DB
	removeListing(DB, request, response) {
		DB.delete_chat_and_listing(request.params.listing_id).then((res) => {
			response.status(200).send('Listing has been deleted.');
		});
	}
};
