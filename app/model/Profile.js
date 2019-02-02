var express = require('express');
var router  = express.Router();
var DB      = require('../db');
var _       = require('lodash');
/**
 * POST: { userID: string } profile/getAllTrips
 * POST: { userID: string } profile/getAllBookmarks
 * POST: { userID: string } profile/getAllFavorites
 */

 // Get user's trips by userID
router.post('/getTrips', async (req, res) => {
    const {userID} = req.body;
    
    if (_.isNil(userID)) {
        res.status(401).send('Bad request');
    } else {
        try {
            const query = `select * from TripPlan as TP where TP.userID = '${userID}';`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('An error occurred when querying the database', e);
            res.status(500).send('Check server logs for errors.');

        }
    }
});

 // Get user's bookmarks by userID
 router.post('/getBookmarks', async (req, res) => {
    const {userID} = req.body;
    
    if (_.isNil(userID)) {
        res.status(401).send('Bad request');
    } else {
        try {
            const query = `select * from Bookmark as B where B.userID = '${userID}';`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('An error occurred when querying the database', e);
            res.status(500).send('Check server logs for errors.');

        }
    }
});

module.exports = router;
