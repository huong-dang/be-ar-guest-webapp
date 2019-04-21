var express        = require('express');
var router         = express.Router();
var DB             = require('../db');
var _              = require('lodash');
var sqlstring      = require('sqlstring');
const errorHandler = require('../../misc/errors-handler');
var moment         = require('moment');

// Column property names that can be updated
const updateableColumns = ['comment', 'rating', 'isFavorite', 'flag'];

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
        const reviewExists                                        = await userHasReviewForItem(userID, itemID);

        if (reviewExists) {
            // Update the review
            _.forEach(updateableColumns, async (columnName) => {
                if (!_.isNil(req.body[columnName])) {
                    await updateReviewForUser(columnName, req.body[columnName], userID, itemID);
                }
            });
        } else {
            // Add a brand new review
            await addNewReview(userID, itemID, comment, rating, isFavorite, flag);
        }

        res.json({success: true});
    } catch (e) {
        console.log('Error adding a review', e);
        res.status(500).send(e);
    }
});

async function addNewReview(userID, itemID, comment, rating, isFavorite, flag) {
    if (_.isNil(userID) || _.isNil(itemID)) {
        throw new Error('userID or itemID is missing.');
    } else if (!_.isNil(rating) && Number.isInteger(rating) && (rating < 1 || rating > 5)) {
        throw new Error('Rating must be between 1 and 5.');
    }

    const query = `insert into Review (userID, itemID, comment, rating, isFavorite, flag, dateOfComment)
                        values (${sqlstring.escape(userID)}, 
                        ${sqlstring.escape(itemID)}, 
                        ${sqlstring.escape(comment)}, 
                        ${sqlstring.escape(rating)}, 
                        ${sqlstring.escape((_.isNil(isFavorite) ? false : isFavorite))}, 
                        ${sqlstring.escape((_.isNil(flag) ? false : isFavorite))},
                        ${sqlstring.escape(new Date().toISOString().slice(0, 19).replace('T', ' '))});`;

    const result = await DB.runQuery(query);
}

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
        const query  = `select R.*, I.*, P.fName, P.lName, P.imageURL from Review R, Item I, Profile P where I.itemID = ${sqlstring.escape(itemID)} and 
R.itemID = I.itemID and P.userID = R.userID order by R.dateOfComment desc;`;
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
        const result           = await getReviewForUserAndItem(itemID, userID);
        res.json(result);
    } catch (e) {
        console.log('Error getting review for user', e);
        res.status(500).send('Check server logs for more info');
    }
});

async function getReviewForUserAndItem(itemID, userID) {
    if (_.isNil(itemID) || _.isNil(userID)) {
        throw new Error('Missing itemID or userID.');
    }

    const query  = `select * from Review R, Item I, Profile P where P.userID = ${sqlstring.escape(userID)} and 
I.itemID = ${sqlstring.escape(itemID)} and R.userID = P.userID and R.itemID = I.itemID;`;
    const result = await DB.runQuery(query);

    return result;
}

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
        await updateReviewForUser(fieldName, newContent, userID, itemID);
        res.json({success: true});
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});


router.post('/favorite', async (req, res) => {
    try {
        const {userID, itemID, favorite} = req.body;
        const reviewExists               = await userHasReviewForItem(userID, itemID);

        if (reviewExists) {
            await updateReviewForUser('isFavorite', favorite, userID, itemID);
        } else {
            await addNewReview(userID, itemID, null, null, favorite, null);
        }

        res.json({success: true})
    } catch (e) {
        console.log(e);
        res.json({success: false, error: errorHandler.getErrorMessage(e)});
    }
});

router.post('/flag', async (req, res) => {
    try {
        const {userID, itemID, flag} = req.body;
        const reviewExists               = await userHasReviewForItem(userID, itemID);

        if (reviewExists) {
            await updateReviewForUser('flag', flag, userID, itemID);
        } else {
            await addNewReview(userID, itemID, null, null, null, flag);
        }

        res.json({success: true})
    } catch (e) {
        console.log(e);
        res.json({success: false, error: errorHandler.getErrorMessage(e)});
    }
});

router.post('/userHasReviewForItem', async (req, res) => {
    try {
        const {userID, itemID} = req.body;
        const userHasReview    = await userHasReviewForItem(userID, itemID);
        res.json({reviewExists: userHasReview})
    } catch (e) {
        console.log('Error:', e);
        res.status(500).send(e);
    }
});

router.post('/getUserFavoritedItems', async (req, res) => {
    try {
        const {userID} = req.body;
        if (_.isNil(userID)) {
            throw new Error('userID is missing.');
        }
        const query  = `select Item.itemID, Item.itemName, Restaurant.restaurantName, Restaurant.restaurantID, Land.landID, Park.parkID from Review, Restaurant, Park, Land, Item where Review.userID=${sqlstring.escape(userID)} 
and Review.itemID=Item.itemID and Review.isFavorite=true and Item.restaurantID=Restaurant.restaurantID and Restaurant.landID=Land.landID and Land.parkID=Park.parkID;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error:', e);
        res.status(500).send(e);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const {userID, itemID} = req.body;
        await deleteReview(userID, itemID);
        res.json({success: true})
    } catch (e) {
        console.log('Error:', e);
        res.status(500).send(e);
    }
});

// Add route for deleting a comment
router.post('/deleteComment', async (req, res) => {
    try {
        const {userID, itemID} = req.body;
        await updateReviewForUser('comment', null, userID, itemID);
        res.json({success: true})
    } catch (e) {
        console.log('Error:', e);
        res.status(500).send(e);
    }
});

// Add route for deleting a rating
router.post('/deleteRating', async (req, res) => {
    try {
        const {userID, itemID} = req.body;
        await updateReviewForUser('rating', null, userID, itemID);
        res.json({success: true})
    } catch (e) {
        console.log('Error:', e);
        res.status(500).send(e);
    }
});

router.post('/getAllUniqueFlaggedItems', async (req, res) => {
    try {
        const query       = `select * from Review where Review.flag = true;`;
        const result      = await DB.runQuery(query);
        const uniqueItems = _.uniqBy(result, (review) => review.itemID).map((review) => {
            return review.itemID;
        });

        res.json(uniqueItems);
    } catch (e) {
        console.log('Error:', e);
        res.send(e);
    }
});

async function userHasReviewForItem(userID, itemID) {
    if (_.isNil(userID) || _.isNil(itemID)) {
        throw new Error('userID or itemID is missing.');
    } else {
        const query  = `select * from Review R, Item I, Profile P where P.userID = ${sqlstring.escape(userID)} and 
I.itemID = ${sqlstring.escape(itemID)} and R.userID = P.userID and R.itemID = I.itemID;`;
        const result = await DB.runQuery(query);

        // If review found for the user and this item, then return false, else return true
        return result.length > 0;
    }
}

async function updateReviewForUser(fieldName, newContent, userID, itemID) {
    if (_.isNil(fieldName) || _.isNil(userID) || _.isNil(itemID)) {
        throw new Error('Missing fieldName, userID, or itemID.');
    } else if (updateableColumns.indexOf(fieldName) < 0) {
        throw new Error(fieldName + ' is not a valid field to update for a review.');
    } else if (fieldName === 'rating' && Number.isInteger(newContent) && (newContent < 1 || newContent > 5)) {
        throw new Error('Rating must be between 1 and 5');
    }

    const query = `update Review set ${fieldName}=${sqlstring.escape(newContent)} where userID = ${sqlstring.escape(userID)} and itemID = ${sqlstring.escape(itemID)};`;
    await DB.runQuery(query);

    if (fieldName === 'comment') {
        // Update the date of the comment if the field updated was comment
        const updatedDate              = moment().format('YYYY-MM-DD HH:mm:ss');
        const updateDateOfCommentQuery = `update Review set dateOfComment=${sqlstring.escape(updatedDate)} where userID = ${sqlstring.escape(userID)} and itemID = ${sqlstring.escape(itemID)};`;
        await DB.runQuery(updateDateOfCommentQuery);
    }
}

// Delete the entire review row for a user and item
async function deleteReview(userID, itemID) {
    if (_.isNil(userID) || _.isNil(itemID)) {
        throw new Error('Missing userID or itemID.');
    } else {
        const query = `delete from Review where userID=${sqlstring.escape(userID)} and itemID=${sqlstring.escape(itemID)};`;
        await DB.runQuery(query);
    }
}

module.exports = router;
