UPDATE users SET notification_count = 0 WHERE auth_id = $1;
UPDATE chats SET notification = false WHERE owner_id = $2 AND client_id = $3;