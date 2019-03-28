var express   = require('express');
var router    = express.Router();
var DB        = require('../db');
var _         = require('lodash');
var sqlstring = require('sqlstring');


// TODO: Code here
router.post('/getAll', async (req, res) => {
    try {
        const query  = `SELECT * FROM Item;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error', e);
        res.status(500).send('Something went wrong in the server.');
    }
});

/**
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
router.post('/addReview', async (req, res) => {
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

module.exports = router;
