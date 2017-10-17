-- This query will update all the information available to be changed on each User based on their auth_id.
UPDATE users
SET (full_name, username, profile_pic, city, state, zip, email, cover_photo) = ($1, $2, $3, $4, $5, $6, $7, $8)
WHERE auth_id = $9;