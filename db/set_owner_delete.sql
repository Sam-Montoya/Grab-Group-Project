-- This will set the owner_delete column to True if the owner deleted the chat. Also, if both are set to true, the row will be deleted.
UPDATE chats
SET owner_delete = true
WHERE listing_id = $1 AND owner_delete = $2;

DELETE
FROM chats
WHERE owner_delete = true AND client_delete = true;