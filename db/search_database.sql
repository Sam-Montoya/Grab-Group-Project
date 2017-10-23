-- This query is the search function that will search both the title and the description for a match.
SELECT *
FROM listings
WHERE LOWER(title) LIKE LOWER('%'|| $1 ||'%' ) OR LOWER(description) LIKE LOWER('%'|| $1 ||'%');