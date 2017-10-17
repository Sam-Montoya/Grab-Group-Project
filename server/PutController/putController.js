/**
 * This controller holds all the put requests
 */

module.exports = {
	// Updates the User info
	updateUserInfo() {},

	// Updates the notification count to zero when the user sees it
	updateNotificationCount(DB, request, response) {
		DB.reset_notification([ request.body.listing_id, request.body.client_id ]).then((_) => {
			response.status(200).send('Notifications for that listing have been cleared.');
		});
	}
};
