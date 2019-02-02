var express = require('express');
var router  = express.Router();
var DB      = require('../db');
var _       = require('lodash');

/**
 * POST: { parkID: num } /parks/getAllLands
 *
 */

router.post('/getAllLands', async (req, res) => {
    const {parkID} = req.body;

    if (_.isNil(parkID)) {
        res.status(401).send('Bad request');
    } else {
        try {
            // const query = `select * from Restaurant as R where R.landID = ${escape(landID)};`;
            const query = `select * from Land as L where L.parkID = ${escape(parkID)};`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('An error occurred when querying the database', e);
            res.status(500).send('Check server logs for errors.');
        }
    }
});

/**
 * POST: { parkID: num } /parks/getAllRestaurantsByParkID
 *
 */


module.exports = router;
