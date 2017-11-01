DROP TABLE IF EXISTS files CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	last_name VARCHAR(255),
  first_name VARCHAR(255),
	username VARCHAR(255),
	email VARCHAR(255),
	password_digest VARCHAR(255),
	type VARCHAR(255)
);

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  address VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
