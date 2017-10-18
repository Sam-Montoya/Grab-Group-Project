-- This query will create a user based off of information passed from Auth0
INSERT INTO users
(auth_id, full_name, username, profile_pic, email, date_created)
VALUES
($1, $2, $3, $4, $5, $6)
RETURNING *;