var express = require('express');
var router = express.Router();
var DB = require('../db');

router.get('/getAll', async (req, res) => {
    try {
        const query = `Select * from Restaurant;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error getting all restaurant info:', e);
        res.status(500).send('Check server logs for more info');
    }
});



module.exports = router;
