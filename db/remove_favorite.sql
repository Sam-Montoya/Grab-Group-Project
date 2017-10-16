-- Remove a favorited item based on user_id
DELETE 
FROM favorites
WHERE user_id = $1;