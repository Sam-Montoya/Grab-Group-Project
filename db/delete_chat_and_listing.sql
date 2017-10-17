-- This will delete the chat and the listing based on the listing_id passed.
DELETE
FROM listings
WHERE listing_id = $1;

DELETE
FROM chats
WHERE listing_id = $1;