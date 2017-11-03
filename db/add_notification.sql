UPDATE users SET notification_count = notification_count + 1 WHERE auth_id = $1;
UPDATE chats SET notification = true WHERE owner_id = $2 AND client_id = $3;