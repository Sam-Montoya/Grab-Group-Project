-- This SQL query will get all from the favorites table based on the passed user_id
SELECT *
FROM favorites
JOIN listings ON listings.listing_id = favorites.listing_id
JOIN users ON users.user_id = favorites.user_id
WHERE favorites.user_id = $1;