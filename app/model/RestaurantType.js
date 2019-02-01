var express = require('express');
var router  = express.Router();
var DB      = require('../db');
var _       = require('lodash');

// Get all restaurants of certain type (i.e. Quick Service, Cart, Table Service, Other)
// bearguest.com/restaurants/getAllItems need restaurantID
// req = { body: { name: 'Casey's Corner', restaurantID: 2 } }
router.post('/getAllByRestaurantType', async (req, res) => {
    const {restaurantTypeID} = req.body;

    if (_.isNil(restaurantTypeID)) {
        res.status(401).send('Bad request');
    } else {
        try {
            const query = `select * from Restaurant as R where R.restaurantTypeID = ${escape(restaurantTypeID)};`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('An error occurred when querying the database', e);
            res.status(500).send('Check server logs for errors.');
        }
    }
});

module.exports = router;
