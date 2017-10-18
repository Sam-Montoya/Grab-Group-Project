-- This query will insert a new listing into listings table.
INSERT INTO listings
(auth_id, user_id, title, price, images, city, state, zip, description, pros, cons, phone_number, contact_status, time_submitted, category)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);