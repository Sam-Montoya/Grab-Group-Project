-- This SQL query will get all from the favorites table and users table based on the passed user_id
SELECT *
FROM favorites
JOIN listings ON listings.listing_id = favorites.listing_id
WHERE favorites.user_id = $1;