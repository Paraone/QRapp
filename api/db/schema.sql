DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INTEGER NOT NULL,
	last_name VARCHAR(255),
	first_name VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255),
	type VARCHAR(255),
	PRIMARY KEY (id)
);