-- This finds a user based on the auth_id that is passed
SELECT *
FROM users
WHERE auth_id = $1;