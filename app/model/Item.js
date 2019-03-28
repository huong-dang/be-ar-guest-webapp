var express = require('express');
var router  = express.Router();
var DB      = require('../db');
var _       = require('lodash');
var sqlstring = require('sqlstring');


// TODO: Code here
router.post('/getAll', async (req, res) => {
    try {
        const query  = `SELECT * FROM Item;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error', e);
        res.status(500).send('Something went wrong in the server.');
    }
});

module.exports = router;
