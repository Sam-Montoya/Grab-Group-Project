/**
 * This controller holds all the put requests
 */

module.exports = {
	// Updates the User info
	updateUserInfo() {},

	// Updates the notification count to zero when the user sees it
	updateNotificationCount(DB, request, response) {
		DB.get_listing(request.params.listing_id).then((listingData) => {
			if (listingData[0].auth_id === request.params.auth_id) {
				DB.update_owner_notification([ request.params.listing_id, request.params.auth_id ]).then((_) => {
					response.status(200).send('Notifications for that listing have been cleared for the owner.');
				});
			} else {
				DB.update_client_notification([ request.params.listing_id, request.params.auth_id ]).then((_) => {
					response.status(200).send('Notifications for that listing have been cleared for the client.');
				});
			}
		});
	}
};
