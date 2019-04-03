var express   = require('express');
var router    = express.Router();
var DB        = require('../db');
var _         = require('lodash');
var sqlstring = require('sqlstring');


/**
 * POST: { parkID: num } /park/getAllRestaurantsByParkID
 *
 */

// TODO: Code here
router.post('/getAllRestaurantsByParkID', async (req, res) => {
    const {parkID} = req.body;
    if (!parkID) {
        res.status(500).send('No parkID provided.');
    } else {
        try {
            const query  = `SELECT * FROM Restaurant R, Land L, Park P WHERE P.parkID = ${sqlstring.escape(parkID)} AND P.parkID = L.parkID AND R.landID = L.landID;`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('Error', e);
            res.status(500).send('Something went wrong in the server.');
        }
    }
});

router.post('/getAll', async (req, res) => {
    try {
        const query  = `SELECT * FROM Park;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error', e);
        res.status(500).send('Something went wrong in the server.');
    }
});


module.exports = router;
