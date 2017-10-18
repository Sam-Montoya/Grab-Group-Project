-- This query will return true if the username passed exists in the DB
SELECT EXISTS
    (SELECT username
        FROM users
        WHERE LOWER(username) = LOWER('Wh3at1y'));