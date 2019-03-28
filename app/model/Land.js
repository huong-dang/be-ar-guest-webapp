var express   = require('express');
var router    = express.Router();
var DB        = require('../db');
var _         = require('lodash');
var sqlstring = require('sqlstring');


// TODO: Code here
router.post('/getAll', async (req, res) => {
    try {
        const query  = `SELECT * FROM Land;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error', e);
        res.status(500).send('Something went wrong in the server.');
    }
});

/**
 * Add a new land here
 */
router.post('/add', async (req, res) => {
    const {park_id, land_name} = req.body;
    if (!park_id || !land_name) {
        return res.status(500).json({
                                        error: `There are missing arguments.`,
                                    });
    } else {
        try {
            const parkID   = sqlstring.escape(park_id),
                  landName = sqlstring.escape(land_name);

            const query  = `INSERT INTO Land (parkID, landName) VALUES (${parkID}, ${landName})`;
            const result = await DB.runQuery(query);
            res.json({success: true});
        } catch (e) {
            console.log('Error adding a new land to the database:', e);
            res.json({success: false});
        }
    }
});

module.exports = router;
