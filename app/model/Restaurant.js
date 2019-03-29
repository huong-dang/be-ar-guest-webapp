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

router.post('/getAllItemsByRestaurantID', async (req, res) => {
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

router.post('/getAllItemsByRestaurantName', async (req, res) => {
    const {restaurantName} = req.body;
    if (_.isNil(restaurantName)) {
        res.status(401).send('Bad request');
    } else {
        try {
            const query  = `SELECT * FROM Item I, Restaurant R 
                            WHERE replace(R.restaurantName, '''', '') = ${sqlstring.escape(restaurantName)} 
                            AND R.restaurantID = I.restaurantID`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('An error occurred when querying the database', e);
            res.status(500).send('Check server logs for errors.');
        }
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


module.exports = router;
