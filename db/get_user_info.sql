-- This will get all user information whether they have a listing or not.
SELECT *
FROM users
WHERE user_id = $1;