USE `BeArGuest`;

INSERT INTO
`Profile` (`userID`, `fName`, `lName`, `email`, `dateCreated`, `role`, `imageURL`, `userStatus`)
VALUES ('123456789', 'admin', 'admin', 'admin@admin.com', '18-11-01', 'admin', '#', 'ACTIVE'),
       ('abcdefghi', 'user1', 'admin', 'user1@user.com', '18-11-01', 'user', '#', 'ACTIVE'),
       ('987654321', 'user2', 'admin', 'user2@user.com', '18-11-01', 'user', '#', 'ACTIVE'),
       ('111111111', 'user3', 'admin', 'user3@user.com', '18-11-01', 'user', '#', 'ACTIVE'),
       ('222222222', 'user4', 'admin', 'user4@user.com', '18-11-01', 'user', '#', 'ACTIVE'),
       ('333333333', 'user5', 'admin', 'user5@user.com', '18-11-01', 'user', '#', 'DELETED');

INSERT INTO
`Category` (`categoryName`)
VALUES ('Daiya'),
       ('Impossible'),
       ('Sorbet'),
       ('Beyond');

INSERT INTO
`Park` (`parkName`)
VALUES ('Magic Kingdom Park'),
       ('Epcot'),
       ('Disney\'s Hollywood Studios'),
       ('Disney\'s Animal Kingdom Theme Park'),
       ('Disney\'s Typhoon Lagoon Water Park'),
       ('Disney\'s Blizzard Beach Water Park');

INSERT INTO
`Land` (`landName`, `parkID`)
VALUES ('Main Street, USA', (SELECT `parkID` FROM `Park` where `parkName` = 'Magic Kingdom Park')),
       ('Adventureland', (SELECT `parkID` FROM `Park` where `parkName` = 'Magic Kingdom Park')),
       ('Fantasyland', (SELECT `parkID` FROM `Park` where `parkName` = 'Magic Kingdom Park')),
       ('Frontierland', (SELECT `parkID` FROM `Park` where `parkName` = 'Magic Kingdom Park')),
       ('Liberty Square', (SELECT `parkID` FROM `Park` where `parkName` = 'Magic Kingdom Park')),
       ('Tomorrowland', (SELECT `parkID` FROM `Park` where `parkName` = 'Magic Kingdom Park'));

INSERT INTO
`MealType` (`mealTypeName`)
VALUES ('Breakfast'),
       ('Lunch'),
       ('Brunch'),
       ('Dinner'),
       ('Snack'),
       ('Anything');

INSERT INTO
`RestaurantType` (`restaurantTypeName`)
VALUES ('Quick Service'),
       ('Table Service'),
       ('Cart'),
       ('Other');

INSERT INTO
`Day` (`day`)
VALUES ('2018-10-01'),
       ('2018-10-02'),
       ('2018-10-03'),
       ('2018-10-04'),
       ('2018-10-05'),
       ('2018-10-06'),
       ('2018-10-07'),
       ('2018-10-08'),
       ('2018-10-09'),
       ('2018-10-10'),
       ('2018-10-11'),
       ('2018-10-12'),
       ('2018-10-13');

INSERT INTO
`Restaurant` (`landID`, `restaurantTypeID`, `restaurantName`, `restaurantStatus`)
VALUES ((SELECT `landID` FROM `Land` WHERE `landName` = 'Main Street, USA' AND `parkID` = (SELECT `parkID` FROM `Park` WHERE `parkName` = 'Magic Kingdom Park')),
        (SELECT `restaurantTypeID` FROM `RestaurantType` WHERE `restaurantTypeName` = 'Quick Service'), 'Casey\'s Corner', 'AVAILABLE');

INSERT INTO
`Restaurant` (`landID`, `restaurantTypeID`, `restaurantName`, `restaurantStatus`)
VALUES ((SELECT `landID` FROM `Land` WHERE `landName` = 'Frontierland' AND `parkID` = (SELECT `parkID` FROM `Park` WHERE `parkName` = 'Magic Kingdom Park')),
        (SELECT `restaurantTypeID` FROM `RestaurantType` WHERE `restaurantTypeName` = 'Quick Service'), 'Pecos Bill Tall Tale Cafe', 'AVAILABLE');

INSERT INTO
`Restaurant` (`landID`, `restaurantTypeID`, `restaurantName`, `restaurantStatus`)
VALUES ((SELECT `landID` FROM `Land` WHERE `landName` = 'Liberty Square' AND `parkID` = (SELECT `parkID` FROM `Park` WHERE `parkName` = 'Magic Kingdom Park')),
        (SELECT `restaurantTypeID` FROM `RestaurantType` WHERE `restaurantTypeName` = 'Quick Service'), 'Columbia Harbor House', 'AVAILABLE');

INSERT INTO
`Restaurant` (`landID`, `restaurantTypeID`, `restaurantName`, `restaurantStatus`)
VALUES ((SELECT `landID` FROM `Land` WHERE `landName` = 'Fantasyland' AND `parkID` = (SELECT `parkID` FROM `Park` WHERE `parkName` = 'Magic Kingdom Park')),
        (SELECT `restaurantTypeID` FROM `RestaurantType` WHERE `restaurantTypeName` = 'Quick Service'), 'Pinocchio Village Haus', 'AVAILABLE');

INSERT INTO
`Restaurant` (`landID`, `restaurantTypeID`, `restaurantName`, `restaurantStatus`)
VALUES ((SELECT `landID` FROM `Land` WHERE `landName` = 'Fantasyland' AND `parkID` = (SELECT `parkID` FROM `Park` WHERE `parkName` = 'Magic Kingdom Park')),
        (SELECT `restaurantTypeID` FROM `RestaurantType` WHERE `restaurantTypeName` = 'Quick Service'), 'The Friar\'s Nook', 'AVAILABLE');

INSERT INTO
`Restaurant` (`landID`, `restaurantTypeID`, `restaurantName`, `restaurantStatus`)
VALUES ((SELECT `landID` FROM `Land` WHERE `landName` = 'Tomorrowland' AND `parkID` = (SELECT `parkID` FROM `Park` WHERE `parkName` = 'Magic Kingdom Park')),
        (SELECT `restaurantTypeID` FROM `RestaurantType` WHERE `restaurantTypeName` = 'Quick Service'), 'Cosmic Ray\'s Starlight Café', 'AVAILABLE');

INSERT INTO
`Restaurant` (`landID`, `restaurantTypeID`, `restaurantName`, `restaurantStatus`)
VALUES ((SELECT `landID` FROM `Land` WHERE `landName` = 'Tomorrowland' AND `parkID` = (SELECT `parkID` FROM `Park` WHERE `parkName` = 'Magic Kingdom Park')),
        (SELECT `restaurantTypeID` FROM `RestaurantType` WHERE `restaurantTypeName` = 'Quick Service'), 'The Lunching Pad', 'AVAILABLE');


insert into Item (`restaurantID`, `itemName`, `itemDescription`, `secret`, `vegan`, `substitution`, `itemStatus`)
values ((select restaurantID from Restaurant where restaurantName = 'Casey\'s Corner'), 'Plant-based loaded-slaw dog',
'Plant-based Sausage topped with Pickled Slaw, BBQ Vegan Aïoli and Roasted Corn Relish served with French Fries or Apple Slices',
false, true, 'None', 'AVAILABLE');

insert into Item (`restaurantID`, `itemName`, `itemDescription`, `secret`, `vegan`, `substitution`, `itemStatus`)
values ((select restaurantID from Restaurant where restaurantName = 'Casey\'s Corner'), 'Plant-based Dog', 'Plant-Based Sausage in a Potato Bun served with French Fries or Apple Slices', false, true, 'None', 'AVAILABLE');

insert into Item (`restaurantID`, `itemName`, `itemDescription`, `secret`, `vegan`, `substitution`, `itemStatus`)
values ((select restaurantID from Restaurant where restaurantName = 'Pecos Bill Tall Tale Cafe'), 'Plant-based Southwest Cheeseburger', 'Topped with Vegan Jalapeno Jack and Vegan Avocado Aioli on a Toasted Bun', false, true, 'None', 'AVAILABLE');

insert into Item (`restaurantID`, `itemName`, `itemDescription`, `secret`, `vegan`, `substitution`, `itemStatus`)
values ((select restaurantID from Restaurant where restaurantName = 'Pecos Bill Tall Tale Cafe'), 'Veggie Rice Bowl', 'Yellow Rice topped with Black Beans and Roasted Vegetables', false, false, 'Substitute plain white rice', 'AVAILABLE');

insert into Item (`restaurantID`, `itemName`, `itemDescription`, `secret`, `vegan`, `substitution`, `itemStatus`, `x`, `y`, `z`)
values ((select restaurantID from Restaurant where restaurantName = 'Pecos Bill Tall Tale Cafe'), 'Veggie Nachos', 'Tortilla Chips topped with Queso, Zucchini and Squash', false, false, 'Order without chese', 'AVAILABLE', 1.0, 2.0, 3.0);
