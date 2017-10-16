-- This query will bring back data based on Auth0.\
SELECT * 
FROM users
WHERE auth_id = $1;