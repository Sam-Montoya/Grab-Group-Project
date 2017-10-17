-- This SQL query will bring back all information on the user and all 
-- details on the listings that user has. This will return nothing if the user does not have a listing.
SELECT *
FROM users
JOIN listings ON users.user_id = listings.user_id
WHERE users.user_id = $1;