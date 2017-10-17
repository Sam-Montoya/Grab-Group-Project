-- This SQL query will get all the listings based on a passed in auth_id.
SELECT * 
FROM listings
WHERE auth_id = $1;