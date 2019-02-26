var express   = require('express');
var router    = express.Router();
var DB        = require('../db');
var _         = require('lodash');
var sqlstring = require('sqlstring');

router.get('/getAll', async (req, res) => {
    try {
        const query  = `Select * from Restaurant;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error getting all restaurant info:', e);
        res.status(500).send('Check server logs for more info');
    }
});

router.get('/getAllRestaurantsInfo', async (req, res) => {
    try {
        const query  = `Select L.landName, R.restaurantID, R.restaurantName from Restaurant R, Land L WHERE L.landID = R.landID;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error getting all restaurant info:', e);
        res.status(500).send('Check server logs for more info');
    }
});

router.post('/getAllItems', async (req, res) => {
    const {restaurantID} = req.body;
    if (_.isNil(restaurantID)) {
        res.status(401).send('Bad request');
    } else {
        try {
            const query  = `select * from Item as I where I.restaurantID = ${sqlstring.escape(restaurantID)};`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('An error occurred when querying the database', e);
            res.status(500).send('Check server logs for errors.');
        }
    }
});

// /restaurants/

module.exports = router;
