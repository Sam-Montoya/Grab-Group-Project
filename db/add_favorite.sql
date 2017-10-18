-- This query will insert a new favorite into favorites table based on listing and user id.
INSERT INTO favorites
(listing_id, user_id)
VALUES ($1, $2);