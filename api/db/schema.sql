DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	last_name VARCHAR(255),
  first_name VARCHAR(255),
	username VARCHAR(255),
	email VARCHAR(255),
	password_digest VARCHAR(255),
	type VARCHAR(255)
);
