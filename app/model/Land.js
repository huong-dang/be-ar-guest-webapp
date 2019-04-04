var express   = require('express');
var router    = express.Router();
var DB        = require('../db');
var _         = require('lodash');
var sqlstring = require('sqlstring');

router.post('/getAll', async (req, res) => {
    try {
        const query  = `SELECT * FROM Land;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error', e);
        res.status(500).send('Something went wrong in the server.');
    }
});

/**
 * Add a new land here
 */
router.post('/add', async (req, res) => {
    const {park_id, land_name} = req.body;
    if (!park_id || !land_name) {
        return res.status(500).json({
                                        error: `There are missing arguments.`,
                                    });
    } else {
        try {
            const parkID   = sqlstring.escape(park_id),
                  landName = sqlstring.escape(land_name);

            const query  = `INSERT INTO Land (parkID, landName) VALUES (${parkID}, ${landName})`;
            const result = await DB.runQuery(query);
            res.json({success: true});
        } catch (e) {
            console.log('Error adding a new land to the database:', e);
            res.json({success: false});

        }
    }
});

router.post('/getLands', async (req, res) => {
    const {parkID} = req.body;
    if (_.isNil(parkID)) {
        res.status(401).send('Bad request');
    } else {
        try {
            const query  = `select * from Land as L where L.parkID = ${escape(parkID)};`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('An error occurred when querying the database', e);
            res.status(500).send('Check server logs for errors.');
        }
    }
});

router.post('/getRestaurantsByLand', async (req, res) => {
    const {landID} = req.body;
    if (_.isNil(landID)) {
        res.status(401).send('Bad request');
    } else {
        try {
            const query  = `select * from Restaurant as R where R.landID = ${escape(landID)};`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('An error occurred when querying the database', e);
            res.status(500).send('Check server logs for errors.');
        }
    }
});

module.exports = router;
