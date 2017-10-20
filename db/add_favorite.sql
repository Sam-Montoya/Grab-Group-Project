-- This query will insert a new favorite into favorites table based on listing and user id.
INSERT INTO favorites (listing_id, user_id)
SELECT $1, $2
WHERE NOT EXISTS (
    SELECT listing_id, user_id
    FROM favorites
    WHERE listing_id = $1 AND user_id = $2
    );