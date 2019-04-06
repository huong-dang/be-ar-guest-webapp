var express   = require('express');
var router    = express.Router();
var DB        = require('../db');
var _         = require('lodash');
var sqlstring = require('sqlstring');


// Get all trips for a user
router.post('/getByUserID', async (req, res) => {
    const {userID} = req.body;
    try {

    } catch (e) {

    }
});

module.exports = router;
