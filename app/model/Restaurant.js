var express = require("express");
var router = express.Router();
var DB = require("../db");
var _ = require("lodash");
var sqlstring = require("sqlstring");
var errorHandler = require("../../misc/errors-handler");

router.get("/getAll", async (req, res) => {
    try {
        const query = `Select * from Restaurant;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log("Error getting all restaurant info:", e);
        res.status(500).send("Check server logs for more info");
    }
});

router.get("/getAllRestaurants", async (req, res) => {
    try {
        const query = `Select restaurantID, restaurantName from Restaurant;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log("Error getting all restaurants, returning ID and name:", e);
        res.status(500).send("Check server logs for more info");
    }
});

router.get("/getAllRestaurantsInfo", async (req, res) => {
    try {
        const query = `select Restaurant.*, RestaurantType.*, Land.*, Park.parkName from Restaurant, RestaurantType, Land, Park where Restaurant.restaurantTypeID = RestaurantType.restaurantTypeID and Restaurant.landID = Land.landID and Park.parkID = Land.landID;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log("Error getting all restaurant info:", e);
        res.status(500).send("Check server logs for more info");
    }
});

router.post("/getAllItemsByRestaurantID", async (req, res) => {
    const { restaurantID } = req.body;
    if (_.isNil(restaurantID)) {
        res.status(401).send("Bad request");
    } else {
        try {
            const query = `select * from Item as I where I.restaurantID = ${sqlstring.escape(
                restaurantID
            )};`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log("An error occurred when querying the database", e);
            res.status(500).send("Check server logs for errors.");
        }
    }
});

router.post("/getAllItemsByRestaurantName", async (req, res) => {
    const { restaurantName } = req.body;
    if (_.isNil(restaurantName)) {
        res.status(401).send("Bad request");
    } else {
        try {
            const query = `SELECT * FROM Item I, Restaurant R 
                            WHERE replace(R.restaurantName, '''', '') = ${sqlstring.escape(
                                restaurantName
                            )} 
                            AND R.restaurantID = I.restaurantID`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log("An error occurred when querying the database", e);
            res.status(500).send("Check server logs for errors.");
        }
    }
});

router.get("/getAllRestaurantsInfo", async (req, res) => {
    try {
        const query = `Select L.landName, R.restaurantID, R.restaurantName from Restaurant R, Land L WHERE L.landID = R.landID;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log("Error getting all restaurant info:", e);
        res.status(500).send("Check server logs for more info");
    }
});

router.post("/add", async (req, res) => {
    try {
        const {
            landID,
            restaurantName,
            restaurantStatus,
            restaurantTypeID
        } = req.body;

        if (
            _.isNil(landID) ||
            _.isNil(restaurantName) ||
            _.isNil(restaurantStatus) ||
            _.isNil(restaurantTypeID)
        ) {
            throw new Error(
                "Missing landID, restaurantName, restaurantStatus, or restaurantTypeID."
            );
        } else if (await restaurantDoesExist(restaurantName, landID)) {
            // Check to make sure that there is not already an item with that name in the database for that restaurant
            throw new Error(itemName + " already exists for restaurant.");
        }

        const query = `insert into Restaurant (landID, restaurantTypeID, restaurantName, restaurantStatus)
value (${sqlstring.escape(landID)}, ${sqlstring.escape(
            restaurantTypeID
        )},${sqlstring.escape(restaurantName)},${sqlstring.escape(
            restaurantStatus
        )});`;

        const result = await DB.runQuery(query);
        res.json({ success: true });
    } catch (e) {
        console.log("Error adding a review", e);
        res.json({ success: false, error: errorHandler.getErrorMessage(e) });
    }
});

/** HElPER FUNCTIONS */
async function restaurantDoesExist(restaurantName, landID) {
    const query = `select restaurantID from Restaurant where restaurantName = ${sqlstring.escape(
        restaurantName
    )} and landID = ${sqlstring.escape(landID)};`;
    const result = await DB.runQuery(query);

    return result.length > 0;
}

module.exports = router;
