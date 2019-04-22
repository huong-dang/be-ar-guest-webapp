var express   = require('express');
var router    = express.Router();
var DB        = require('../db');
var _         = require('lodash');
var sqlstring = require('sqlstring');
var moment    = require('moment');


const updateableColumns = ['tripID', 'restaurantID', 'day', 'mealName'];

router.post('/update', async (req, res) => {
    try {
        const {tripID, fieldName, newContent, mealName, day, restaurantID} = req.body;
        await updateMealPlan(tripID, fieldName, newContent, mealName, day, restaurantID);
        res.json({success: true});
    } catch (e) {
        console.log(e);
        res.json({success: false, error: e});
    }
});

router.post('/deleteRestaurantFromTrip', async (req, res) => {
    try {
        const {tripID, mealName, day, restaurantID} = req.body;
        await deleteRestaurantFromTrip(tripID, mealName, day, restaurantID);
        res.json({success: true});
    } catch (e) {
        console.log(e);
        res.json({success: false, error: e});
    }
});

async function deleteRestaurantFromTrip(tripID, mealName, day, restaurantID) {
    if (_.isNil(tripID) || _.isNil(mealName) || _.isNil(day) || _.isNil(restaurantID)) {
        throw new Error('TripID, mealName, day, or restaurantID is missing.');
    } else if (!moment(day).isValid()) {
        throw new Error('That is not a valid day.');
    }

    const query = `delete from MealPlan where tripID=${sqlstring.escape(tripID)} 
    and mealName=${sqlstring.escape(mealName)}
    and day=${sqlstring.escape(moment(day).format('YYYY-MM-DD'))}
    and restaurantID=${sqlstring.escape(restaurantID)};`;

    await DB.runQuery(query);
}

async function updateMealPlan(tripID, fieldName, newContent, mealName, day, restaurantID) {
    if (_.isNil(tripID) || _.isNil(fieldName) || _.isNil(newContent) || _.isNil(mealName) || _.isNil(day) || _.isNil(restaurantID)) {
        throw new Error('TripID, fieldName, newContent, mealName, day, or restaurantID is missing.');
    } else if (updateableColumns.indexOf(fieldName) < 0) {
        throw new Error(fieldName + ' is not a valid field to update for a meal plan.');
    } else if (!moment(day).isValid()) {
        throw new Error('That is not a valid day.');
    }

    // If the field to be updated is day, make sure that it's in the correct format
    if (fieldName === 'day' && moment(newContent).isValid()) {
        newContent = moment(newContent).format('YYYY-MM-DD HH:mm:ss');
    }

    const dayFormatted = moment(day).format('YYYY-MM-DD HH:mm:ss');
    const query        = `update MealPlan set ${fieldName}=${sqlstring.escape(newContent)} where tripID=${sqlstring.escape(tripID)} and day=${sqlstring.escape(dayFormatted)} and restaurantID=${sqlstring.escape(restaurantID)} and mealName=${sqlstring.escape(mealName)};`;
    await DB.runQuery(query);
}

module.exports = router;
