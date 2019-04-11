var express   = require('express');
var router    = express.Router();
var DB        = require('../db');
var _         = require('lodash');
var sqlstring = require('sqlstring');
var moment    = require('moment');

const updateableColumns = ['startDate', 'endDate', 'tripName'];

// Get all trips for a user
router.post('/getByUserID', async (req, res) => {
    const {userID} = req.body;
    try {

    } catch (e) {

    }
});

router.post('/delete', async (req, res) => {
    try {
        const {tripID} = req.body;
        const query    = `delete from TripPlan where tripID=${sqlstring.escape(tripID)};`;
        await DB.runQuery(query);
        res.json({success: true});
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});

router.post('/add', async (req, res) => {
    try {
        const {userID, startDate, endDate, tripName} = req.body;
        if (await tripExists(userID, startDate, endDate, tripName)) {
            res.json({success: false, error: 'Trip already exists.'});
        } else {
            await addTrip(userID, startDate, endDate, tripName);
            res.json({success: true});
        }
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});

async function tripExists(userID, startDate, endDate, tripName) {
    if (_.isNil(userID) || _.isNil(startDate) || _.isNil(endDate) || _.isNil(tripName)) {
        throw new Error('Missing startDate, endDate, userID, or tripName.');
    } else {
        const start = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
        const end   = moment(endDate).format('YYYY-MM-DD HH:mm:ss');
        const query = `select * from TripPlan where userID=${sqlstring.escape(userID)} and 
        startDate=${sqlstring.escape(start)} and endDate=${sqlstring.escape(end)} and tripName=${sqlstring.escape(tripName)};`;

        const result = await DB.runQuery(query);

        // If trip found for the user and this item, then return false, else return true
        return result.length > 0;
    }
}

async function addTrip(userID, startDate, endDate, tripName) {
    if (_.isNil(startDate) || _.isNil(endDate) || _.isNil(userID) || _.isNil(tripName)) {
        throw new Error('Missing startDate, endDate, userID, or tripName.');
    } else {
        if (startAfterEnd(startDate, endDate)) {
            throw new Error('Start date can\'t be after end date');
        }
        const start = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
        const end   = moment(endDate).format('YYYY-MM-DD HH:mm:ss');
        const query = `insert into TripPlan (userID, startDate, endDate, tripName) 
values (${sqlstring.escape(userID)}, ${sqlstring.escape(start)}, ${sqlstring.escape(end)}, ${sqlstring.escape(tripName)});`;
        await DB.runQuery(query);
    }
}

function startAfterEnd(start, end) {
    return moment(start).isAfter(end);
}

module.exports = router;
