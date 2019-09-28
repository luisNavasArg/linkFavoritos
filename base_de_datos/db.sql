CREATE DATABASE data_base_links;
USE data_base_links;
CREATE TABLE users(
id INT(11) NOT NULL,
userName VARCHAR(16) NOT NULL,
password VARCHAR(60) NOT NULL,
fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
	ADD PRIMARY KEY (id);

ALTER TABLE users
	MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

--tabla links
CREATE TABLE link(
	id INT(11) NOT NULL,
	url VARCHAR(255) NOT NULL,
	descripcion TEXT,
	user_id INT(11),
	created_at timestamp NOT NULL DEFAULT current_timestamp,
	CONSTRAINT fk_user FOREIGN KEY (user_id)  REFERENCES users(id)
);

ALTER TABLE link
	ADD PRIMARY KEY (id);

ALTER TABLE link
	MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =2;

DESCRIBE link;