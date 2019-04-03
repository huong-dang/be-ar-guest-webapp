var express   = require('express');
var router    = express.Router();
var DB        = require('../db');
var _         = require('lodash');
var sqlstring = require('sqlstring');

// General format of defining a post request
// router.post('/', async (req, res) => {
//     try {
//
//     } catch (e) {
//         console.log('', e);
//         res.status(500).send('Check server logs for more info');
//     }
// });

router.post('/getAll', async (req, res) => {
    try {
        const query  = `select * from Review;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error fetching all reviews', e);
        res.status(500).send('Check server logs for more info');
    }
});

/**
 * Add a new review for a user and item
 *
 * Input: {
 *  "userID": string, // REQUIRED
 *  "itemID": number, // REQUIRED
 *  "comment": string,
 *  "rating": number, // MUST BE BETWEEN 1 AND 5
 *  "isFavorite": boolean,
 *  "flag": boolean,
 * }
 *
 * Output: {
 *  "success": true
 * }
 *
 * OR
 *
 * 'Check server logs for more info'
 */
router.post('/add', async (req, res) => {
    try {
        const {userID, itemID, comment, rating, isFavorite, flag} = req.body;
        if (!_.isNil(rating) && Number.isInteger(rating) && (rating < 1 || rating > 5)) {
            throw new Error('Rating must be between 1 and 5.');
        }

        const query = `insert into Review (userID, itemID, comment, rating, isFavorite, flag)
                        values (${sqlstring.escape(userID)}, 
                        ${sqlstring.escape(itemID)}, 
                        ${sqlstring.escape(comment)}, 
                        ${sqlstring.escape(rating)}, 
                        ${sqlstring.escape((_.isNil(isFavorite) ? false : isFavorite))}, 
                        ${sqlstring.escape((_.isNil(flag) ? false : isFavorite))});`

        const result = await DB.runQuery(query);
        res.json({success: true});
    } catch (e) {
        console.log('Error adding a review', e);
        res.status(500).send('Check server logs for more info');
    }
});

/**
 * Get all reviews by userID sorted by rating in descending order
 * Input:
 * {
 *  "userID": string // REQUIRED
 * }
 *
 * Output:
 * [
 *     {
 *       "userID": string,
 *       "itemID": number,
 *       "comment": string,
 *       "rating": number,
 *       "isFavorite": number, // 0 or 1
 *       "flag": number, // 0 or 1
 *       "fName": string,
 *       "lName": string,
 *       "email": string,
 *       "dateCreated": date, // Date the profile was created
 *       "role": string, // admin or user
 *       "imageURL": string,
 *       "userStatus": string // active or inactive
 *       },
 *       ...
 * ]
 *
 * OR
 *
 * Console the error
 */
router.post('/getAllByUserID', async (req, res) => {
    try {
        const {userID} = req.body;
        if (_.isNil(userID)) {
            throw new Error('Missing userID.');
        }

        const query  = `select * from Review R, Profile P where P.userID = ${sqlstring.escape(userID)} and R.userID = P.userID order by R.rating desc;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error getting all reviews by userID', e);
        res.status(500).send('Check server logs for more info');
    }
});

/**
 * Get all reviews by email sorted by rating in descending order
 * Input:
 * {
 *  "email": string // REQUIRED
 * }
 *
 * Output:
 * [
 *     {
 *       "userID": string,
 *       "itemID": number,
 *       "comment": string,
 *       "rating": number,
 *       "isFavorite": number, // 0 or 1
 *       "flag": number, // 0 or 1
 *       "fName": string,
 *       "lName": string,
 *       "email": string,
 *       "dateCreated": date, // Date the profile was created
 *       "role": string, // admin or user
 *       "imageURL": string,
 *       "userStatus": string // active or inactive
 *       },
 *       ...
 * ]
 *
 * OR
 *
 * Console the error
 */
router.post('/getAllByUserEmail', async (req, res) => {
    try {
        const {email} = req.body;
        if (_.isNil(email)) {
            throw new Error('Missing userID.');
        }

        const query  = `select * from Review R, Profile P where P.email = ${sqlstring.escape(email)} and R.userID = P.userID order by R.rating desc;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error getting all reviews by user\'s email', e);
        res.status(500).send('Check server logs for more info');
    }
});

/**
 * Get all reviews by itemID sorted by rating in descending order
 * Input:
 * {
 *  "itemID": number // REQUIRED
 * }
 *
 * Output:
 * [
 *     {
 *       "userID": string,
 *       "itemID": number,
 *       "comment": string,
 *       "rating": number,
 *       "isFavorite": number, // 0 or 1
 *       "flag": number, // 0 or 1
 *       "restaurantID": number,
 *       "itemName": string,
 *       "itemDescription": string,
 *       "secret": number, // 0 or 1
 *       "vegan": number, // 0 or 1
 *       "substitution": string,
 *       "itemStatus": string,
 *       "x": float,
 *       "z": float
 *   }
 *       ...
 * ]
 *
 * OR
 *
 * Console the error
 */
router.post('/getAllByItemID', async (req, res) => {
    try {
        const {itemID} = req.body;
        if (_.isNil(itemID)) {
            throw new Error('Missing itemID.');
        }
        const query = `select R.*, I.*, P.fName, P.lName, P.imageURL from Review R, Item I, Profile P where I.itemID = ${sqlstring.escape(itemID)} and 
R.itemID = I.itemID and P.userID = R.userID order by R.rating desc;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error getting all reviews by itemID', e);
        res.status(500).send('Check server logs for more info');
    }
});

/**
 * Get the review that a user made for a particular item
 * Input:
 * {
 *  "userID": string, // REQUIRED
 *  "itemID": number // REQUIRED
 * }
 *
 */
router.post('/get', async (req, res) => {
    try {
        const {itemID, userID} = req.body;
        if (_.isNil(itemID) || _.isNil(userID)) {
            throw new Error('Missing itemID or userID.');
        }

        const query  = `select * from Review R, Item I, Profile P where P.userID = ${sqlstring.escape(userID)} and 
I.itemID = ${sqlstring.escape(itemID)} and R.userID = P.userID and R.itemID = I.itemID;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error getting review for user', e);
        res.status(500).send('Check server logs for more info');
    }
});

// Column property names that can be updated
const updateableColumns = ['comment', 'rating', 'isFavorite', 'flag'];

/**
 * Update a review for a user and item
 * Input: (All properties are required)
 * {
 *   "userID": string,
 *	 "itemID": number,
 *	 "fieldName": string,
 *	 "newContent": boolean | string | number
 * }
 */
router.post('/update', async (req, res) => {
    try {
        const {fieldName, newContent, userID, itemID} = req.body;
        if (_.isNil(fieldName) || _.isNil(newContent) || _.isNil(userID) || _.isNil(itemID)) {
            throw new Error('Missing fieldName, newContent, userID, or itemID.');
        } else if (updateableColumns.indexOf(fieldName) < 0) {
            throw new Error(fieldName + ' is not a valid field to update for a review.');
        } else if (fieldName === 'rating' && Number.isInteger(newContent) && (newContent < 1 || newContent > 5)) {
            throw new Error('Rating must be between 1 and 5');
        }

        const query = `update Review set ${fieldName}=${sqlstring.escape(newContent)} where userID = ${sqlstring.escape(userID)} and itemID = ${sqlstring.escape(itemID)};`;
        const result = await DB.runQuery(query);
        res.json({success: true});
    } catch (e) {
        console.log('', e);
        res.status(500).send('Check server logs for more info');
    }
});

module.exports = router;
