var express = require("express");
var router = express.Router();
var DB = require("../db");
var _ = require("lodash");
var sqlstring = require("sqlstring");
var errorHandler = require("../../misc/errors-handler");
var ITEMS_UPDATABALE_FIELDS = require("../../misc/FieldNames")
    .ITEMS_UPDATABALE_FIELDS;

// router.post('/getItemByID', async (req, res) => {
//     try {
//         const {itemID} = req.body;
//     } catch (e) {
//         console.log('', e);
//         res.status(500).send('Check server logs for more info');
//     }
// });

// Returns all items. Use this in the admin portal.
router.post("/getAll", async (req, res) => {
    try {
        const query = `select I.*, R.restaurantName, P.parkName, L.landName  from Item I, Restaurant R, Park P, Land L where I.restaurantID = R.restaurantID and R.landID = L.landID and L.parkID = P.parkID order by I.itemName asc;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log("Error", e);
        res.status(500).send("Something went wrong in the server.");
    }
});

router.post("/getItemByID", async (req, res) => {
    try {
        const { itemID } = req.body;
        if (_.isNil(itemID)) {
            throw new Error("Missing itemID");
        }
        const query = `select * from Item where itemID = ${sqlstring.escape(
            itemID
        )};`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log("Error getting item by itemID", e);
        res.status(500).send("Check server logs for more info");
    }
});

router.post("/getItemByName", async (req, res) => {
    try {
        const { itemName } = req.body;
        if (_.isNil(itemName)) {
            throw new Error("Missing itemName");
        }
        const query = `select * from Item where itemName = ${sqlstring.escape(
            itemName
        )};`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log("Error getting item by name", e);
        res.status(500).send("Check server logs for more info");
    }
});

/**
 * Add an item
 * Input:
 * {
 *     "restaurantID": number, // REQUIRED
 *     "itemName": string, // REQUIRED
 *     "itemDescription": string,
 *     "secret": boolean, // REQUIRED
 *     "vegan": boolean, // REQUIRED
 *     "substitution": string,
 *     "itemStatus": string, // REQUIRED
 *     "x": null,
 *     "z": null
 * }
 */
router.post("/add", async (req, res) => {
    try {
        const {
            restaurantID,
            itemName,
            itemDescription,
            secret,
            vegan,
            substitution,
            itemStatus,
            x,
            z,
            pageNum
        } = req.body;

        // Non required fields are x, z, itemDescription, and substitution
        if (
            _.isNil(restaurantID) ||
            _.isNil(itemName) ||
            _.isNil(vegan) ||
            _.isNil(secret) ||
            _.isNil(itemStatus)
        ) {
            throw new Error(
                "Missing restaurantID, itemName, secret, itemStatus, or vegan."
            );
        } else if (await itemDoesExist(itemName, restaurantID)) {
            // Check to make sure that there is not already an item with that name in the database for that restaurant
            throw new Error(itemName + " already exists for restaurant.");
        }

        const query = `insert into Item (restaurantID, itemName, itemDescription, secret, vegan, substitution, itemStatus, x, z, pageNum)
                       values(${sqlstring.escape(restaurantID)}, 
                              ${sqlstring.escape(itemName)}, 
                              ${sqlstring.escape(itemDescription)}, 
                              ${sqlstring.escape(secret)},
                              ${sqlstring.escape(vegan)},
                              ${sqlstring.escape(substitution)},
                              ${sqlstring.escape(itemStatus)},
                              ${sqlstring.escape(x)},
                              ${sqlstring.escape(z)},
                              ${sqlstring.escape(pageNum)});`;

        const result = await DB.runQuery(query);
        res.json({ success: true });
    } catch (e) {
        console.log("Error adding an item", e);
        res.json({ success: false, error: errorHandler.getErrorMessage(e) });
    }
});

/**
 * Update an item
 * Input: (All properties are required)
 * {
 *	 "itemID": number,
 *	 "fieldName": string,
 *	 "newContent": boolean | string | number
 * }
 */
router.post("/update", async (req, res) => {
    try {
        const { fieldName, newContent, itemID } = req.body;
        if (_.isNil(fieldName) || _.isNil(newContent) || _.isNil(itemID)) {
            throw new Error(
                "Missing fieldName, newContent, userID, or itemID."
            );
        } else if (ITEMS_UPDATABALE_FIELDS.indexOf(fieldName) < 0) {
            throw new Error(
                fieldName + " is not a valid field to update for a item."
            );
        }


        const query = `update Item set ${fieldName}=${sqlstring.escape(
            newContent
        )} where itemID = ${sqlstring.escape(itemID)};`;
        const result = await DB.runQuery(query);
        res.json({ success: true });
    } catch (e) {
        res.json({ success: false, error: errorHandler.getErrorMessage(e) });
    }
});

/** HElPER FUNCTIONS */
async function itemDoesExist(itemName, restaurantID) {
    const query = `select itemID from Item where itemName = ${sqlstring.escape(
        itemName
    )} and restaurantID = ${sqlstring.escape(restaurantID)};`;
    const result = await DB.runQuery(query);

    return result.length > 0;
}

module.exports = router;
