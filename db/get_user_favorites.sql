-- This SQL query will get all from the favorites table based on the passed user_id
SELECT * 
FROM favorites
WHERE user_id = $1;