CREATE DATABASE `BeArGuest`;

USE `BeArGuest`;

CREATE TABLE `Profile` (
  `userID` VARCHAR(100),
  `fName` VARCHAR(100) NOT NULL,
  `lName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `dateCreated` DATETIME NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  `imageURL` TINYTEXT,
  `userStatus` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`userID`)
);

CREATE TABLE `Park` (
  `parkID` INT NOT NULL AUTO_INCREMENT,
  `parkName` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`parkID`)
);

CREATE TABLE `Day` (
  `dayID` INT NOT NULL AUTO_INCREMENT,
  `day` DATE NOT NULL UNIQUE,
  PRIMARY KEY (`dayID`)
);

CREATE TABLE `RestaurantType` (
  `restaurantTypeID` INT NOT NULL AUTO_INCREMENT,
  `restaurantTypeName` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`restaurantTypeID`)
);

CREATE TABLE `Land` (
  `landID` INT NOT NULL AUTO_INCREMENT,
  `landName` VARCHAR(100) NOT NULL,
  `parkID` INT NOT NULL,
  PRIMARY KEY (`landID`),
  FOREIGN KEY (`parkID`) REFERENCES `Park` (`parkID`)
);


CREATE TABLE `TripPlan` (
  `tripID` INT NOT NULL AUTO_INCREMENT,
  `userID` VARCHAR(100) NOT NULL,
  `startDate` DATETIME NOT NULL,
  `endDate` DATETIME NOT NULL,
  `tripName` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`tripID`),
  FOREIGN KEY (`userID`) REFERENCES `Profile` (`userID`)
);

CREATE TABLE `Restaurant` (
  `restaurantID` INT NOT NULL AUTO_INCREMENT,
  `landID` INT NOT NULL,
  `restaurantTypeID` INT NOT NULL,
  `restaurantName` VARCHAR(100) NOT NULL,
  `restaurantStatus` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`restaurantID`),
  FOREIGN KEY (`landID`) REFERENCES `Land` (`landID`),
  FOREIGN KEY (`restaurantTypeID`) REFERENCES `RestaurantType` (`restaurantTypeID`)
);


CREATE TABLE `Item` (
  `itemID` INT NOT NULL AUTO_INCREMENT,
  `restaurantID` INT NOT NULL,
  `itemName` VARCHAR(100) NOT NULL,
  `itemDescription` TEXT,
  `secret` BOOLEAN NOT NULL,
  `vegan` BOOLEAN NOT NULL,
  `substitution` TEXT,
  `itemStatus` VARCHAR(50) NOT NULL,
  `x` FLOAT,
  `y` FLOAT,
  `z` FLOAT,
  PRIMARY KEY (`itemID`),
  FOREIGN KEY (`restaurantID`) REFERENCES `Restaurant` (`restaurantID`)
);

CREATE TABLE `Review` (
  `userID` VARCHAR(100) NOT NULL,
  `itemID` INT NOT NULL,
  `comment` TEXT,
  `rating` INT,
  `isFavorite` BOOLEAN NOT NULL,
  `flag` BOOLEAN,
  `dateOfComment` DATETIME,
  PRIMARY KEY (`userID`, `itemID`),
  FOREIGN KEY (`userID`) REFERENCES `Profile` (`userID`),
  FOREIGN KEY (`itemID`) REFERENCES `Item` (`itemID`)
);

CREATE TABLE `Bookmark` (
  `userID` VARCHAR(100) NOT NULL,
  `restaurantID` INT NOT NULL,
  `dateBookmarked` DATETIME NOT NULL,
  PRIMARY KEY (`restaurantID`, `userID`),
  FOREIGN KEY (`userID`) REFERENCES `Profile` (`userID`),
  FOREIGN KEY (`restaurantID`) REFERENCES `Restaurant` (`restaurantID`)
);

create table MealPlan (
	tripID int not null,
	restaurantID int not null,
	day date not null,
	mealName varchar(200) not null,
	foreign key (tripID) references TripPlan(tripID),
	foreign key (restaurantID) references Restaurant(restaurantID),
	primary key (tripID, restaurantID, day, mealName)
);
