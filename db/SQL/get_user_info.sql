-- This SQL query will bring back all information on the user and all 
-- details on the listings that user has.
SELECT *
FROM users
JOIN listings ON users.user_id = listings.user_id
WHERE users.user_id = $1;