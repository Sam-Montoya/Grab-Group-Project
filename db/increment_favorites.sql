-- This will add 1 to the favorites count each time the listing is favorited.
UPDATE listings
SET favorites_count = favorites_count + 1
WHERE listing_id = $1;