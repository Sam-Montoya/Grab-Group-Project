UPDATE users SET notification_count = notification_count + 1 WHERE auth_id = $1;