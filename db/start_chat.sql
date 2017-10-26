--This query will create an initial chat between the users.
INSERT INTO chats
(owner_id, client_id, listing_id, date_modified)
VALUES
($1, $2, $3, $4);