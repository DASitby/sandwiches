-- Drop and recreate Listings table (Example)

DROP TABLE IF EXISTS listings CASCADE;
CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  admin_id INTEGER REFERENCES admins(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  sold_date DATE DEFAULT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  gluten_free BOOLEAN NOT NULL,
  vegetarian BOOLEAN NOT NULL,
  size CHAR(1) NOT NULL,
  bread_type VARCHAR(32) NOT NULL,
  protein VARCHAR(32) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  sold BOOLEAN NOT NULL DEFAULT FALSE,
  thumbnail_url VARCHAR(255) NOT NULL,
  buyer_id INTEGER REFERENCES users(id) DEFAULT NULL
);
