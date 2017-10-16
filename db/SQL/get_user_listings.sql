-- This SQL query will get all the listings based on a passed in user_id.
SELECT * 
FROM listings
WHERE user_id = $1;