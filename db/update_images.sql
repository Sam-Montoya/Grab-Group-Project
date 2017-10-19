UPDATE listings
SET images = array_append(images, $1)
WHERE listing_id = $2;