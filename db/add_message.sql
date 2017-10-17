-- This SQL query will take a passed in message and update the message array based on the user that sent the message.
UPDATE chats 
SET messages = array_append(messages, $1) 
WHERE listing_id = $2 AND client_id = $3;
UPDATE chats SET notification_count = notification_count + 1 WHERE listing_id = 4 AND client_id = $3;