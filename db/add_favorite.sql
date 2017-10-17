-- This query will insert a new favorite into favorites table based on listing and user id.
INSERT INTO favorites
(listing_id, auth_id)
VALUES ($1, $2);