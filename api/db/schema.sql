DROP TABLE IF EXISTS files CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
  box_id VARCHAR(255),
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
  filename VARCHAR(255),
  mimetype VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
