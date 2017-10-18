-- This will set the client_delte column to True if the client deleted the chat. Also, if both are set to true, the row will be deleted.
UPDATE chats
SET client_delete = true
WHERE listing_id = $1 AND client_id = $2;

DELETE
FROM chats
WHERE owner_delete = true AND client_delete = true;