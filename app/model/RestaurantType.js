var express   = require('express');
var router    = express.Router();
var DB        = require('../db');
var _         = require('lodash');
var sqlstring = require('sqlstring');

router.get('/getAll', async (req, res) => {
    try {
        const query  = `Select * from RestaurantType;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error getting all restaurant type info:', e);
        res.status(500).send('Check server logs for more info');
    }
});

router.post("/get", async (req, res) => {
    const {restaurantTypeID} = req.body;
    if (_.isNil(restaurantTypeID)) {
        res.status(401).send("Bad request");
    } else {
        try {
            const query  = `select * from RestaurantType as RT where RT.restaurantTypeID = ${sqlstring.escape(
                restaurantTypeID
            )};`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log("An error occurred when querying the database", e);
            res.status(500).send("Check server logs for errors.");
        }
    }
});

module.exports = router;
