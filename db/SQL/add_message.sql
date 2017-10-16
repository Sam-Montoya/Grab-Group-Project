-- This SQL query will take a passed in message and update the message array based on the user that sent the message.
UPDATE chats 
SET messages = array_append(messages, '{$1: $2}') 
WHERE listing_id = $3;