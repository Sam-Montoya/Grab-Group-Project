-- Remove a favorited item based on user_id
DELETE 
FROM favorites
WHERE listing_id = $1 AND user_id = $2;