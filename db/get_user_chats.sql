-- Get user chats based on auth_id passed in from req.user
SELECT * 
FROM chats
WHERE owner_id = $1 OR client_id = $1 ORDER BY date_modified ASC;