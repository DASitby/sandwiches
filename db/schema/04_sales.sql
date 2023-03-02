-- Drop and recreate Sales table (Example)

DROP TABLE IF EXISTS sales CASCADE;
CREATE TABLE sales (
  id SERIAL PRIMARY KEY NOT NULL,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
  seller_id INTEGER REFERENCES admins(id),
  buyer_id INTEGER REFERENCES users(id),
  phone_number VARCHAR(15)
);
