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

CREATE TABLE `Category` (
  `categoryID` INT NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`categoryID`)
);

CREATE TABLE `Park` (
  `parkID` INT NOT NULL AUTO_INCREMENT,
  `parkName` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`parkID`)
);

CREATE TABLE `MealType` (
  `mealTypeID` INT NOT NULL AUTO_INCREMENT,
  `mealTypeName` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`mealTypeID`)
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

CREATE TABLE `ItemInfo` (
  `itemID` INT NOT NULL,
  `categoryID` INT NOT NULL,
  `mealTypeID` INT NOT NULL,
  PRIMARY KEY (`itemID`, `categoryID`, `mealTypeID`),
  FOREIGN KEY (`itemID`) REFERENCES `Item` (`itemID`),
  FOREIGN KEY (`categoryID`) REFERENCES `Category` (`categoryID`),
  FOREIGN KEY (`mealTypeID`) REFERENCES `MealType` (`mealTypeID`)
);

CREATE TABLE `Review` (
  `userID` VARCHAR(100) NOT NULL,
  `itemID` INT NOT NULL,
  `comment` TEXT,
  `rating` INT,
  `isFavorite` BOOLEAN NOT NULL,
  `flag` BOOLEAN,
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

CREATE TABLE `MealPlan` (
  `tripID` INT NOT NULL,
  `restaurantID` INT NOT NULL,
  `dayID` INT NOT NULL,
  `mealTypeID` INT NOT NULL,
  PRIMARY KEY (`tripID`, `restaurantID`, `dayID`, `mealTypeID`),
  FOREIGN KEY (`tripID`) REFERENCES `TripPlan` (`tripID`),
  FOREIGN KEY (`restaurantID`) REFERENCES `Restaurant` (`restaurantID`),
  FOREIGN KEY (`dayID`) REFERENCES `Day` (`dayID`),
  FOREIGN KEY (`mealTypeID`) REFERENCES `MealType` (`mealTypeID`)
);
