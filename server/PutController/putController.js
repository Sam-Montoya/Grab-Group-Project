/**
 * This controller holds all the put requests
 */

module.exports = {
	// Updates the User info
	updateUserInfo() {},

	// Updates the notification count to zero when the user sees it
	updateNotificationCount(DB, request, response) {
		DB.update_notification(request.params.auth_id).then((_) => {
			response.status(200).send('Notifications have been viewed and reset.');
		});
	}
};
