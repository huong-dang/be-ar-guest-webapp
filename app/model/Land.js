var express = require('express');
var router  = express.Router();
var DB      = require('../db');
var _       = require('lodash');

// Get all of a land's restaurants
// bearguest.com/Land/getRestaurants needs landID
router.post('/getRestaurants', async (req, res) => {
    const {landID} = req.body;

    if (_.isNil(landID)) {
        res.status(401).send('Bad request');
    } else {
        try {
            const query = `select * from Restaurant as R where R.landID = ${escape(landID)};`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('An error occurred when querying the database', e);
            res.status(500).send('Check server logs for errors.');
        }
    }
});

module.exports = router;
