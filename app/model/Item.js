var express = require('express');
var router  = express.Router();
var DB      = require('../db');
var _       = require('lodash');
const mysql = require('mysql');

// Get an item's information based on it's name
// Needs exact name
router.post('/get', async (req, res) => {
    const {itemName} = req.body;
    if (_.isNil(itemName)) {
        res.status(401).send('Bad request');
    } else {
        try {
            const query = `select * from Item as I where I.itemName = '${itemName}';`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('An error occurred when querying the database', e);
            res.status(500).send('Check server logs for errors.');

        }
    }
});

module.exports = router;
