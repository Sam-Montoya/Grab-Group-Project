-- This SQL query will take a passed in message from the owner and push it on the messages array.
UPDATE chats 
SET messages = array_append(messages, $1) 
WHERE listing_id = $2 AND owner_id = $3 AND client_id= $4;
