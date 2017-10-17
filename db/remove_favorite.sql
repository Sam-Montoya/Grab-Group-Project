-- Remove a favorited item based on user_id
DELETE 
FROM favorites
WHERE auth_id = $1;