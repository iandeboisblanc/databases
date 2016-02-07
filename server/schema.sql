CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  ID int(20) NOT NULL AUTO_INCREMENT, 
  Name varchar(150),
  createdAt datetime,
  updatedAt datetime,
  primary key(ID)
);

-- CREATE TABLE rooms (
--   ID int(20) NOT NULL AUTO_INCREMENT, 
--   Name varchar(150),
--   primary key(ID)
-- );

CREATE TABLE messages (
  ID int(20) NOT NULL AUTO_INCREMENT, 
  Content varchar(150),
  createdAt datetime,
  updatedAt datetime,
  UserID int(20),
  Room varchar(50),
  primary key(ID),
  foreign key(UserID) references users(ID)
  -- foreign key(RoomID) references rooms(ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql -p;
 *  to create the database and the tables.*/

