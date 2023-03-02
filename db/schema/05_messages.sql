-- Drop and recreate Messages table (Example)

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  sale_id INTEGER REFERENCES sales(id) ON DELETE CASCADE,
  seller_is_sender BOOLEAN NOT NULL,
  body TEXT NOT NULL
);
