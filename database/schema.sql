CREATE DATABASE week_planner;

USE week_planner;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password varchar(512) NOT NULL
);

CREATE TABLE workouts(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(128) NOT NULL,
    day VARCHAR(32) NOT NULL,
    created_at VARCHAR(64) NOT NULL,
    was_trained bool NOT NULL,
    user_id INT NOT NULL
);

ALTER TABLE workouts 
ADD CONSTRAINT fk_users
FOREIGN KEY (user_id)
REFERENCES users(id);