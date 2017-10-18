-- This will get a listings information based on listing_id
SELECT *
FROM listings
WHERE listing_id = $1;