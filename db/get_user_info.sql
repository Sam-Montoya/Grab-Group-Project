-- This will get all user information whether they have a listing or not.
SELECT *
FROM users
WHERE auth_id = $1;