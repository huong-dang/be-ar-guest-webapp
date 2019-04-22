var express = require("express");
var router = express.Router();
var DB = require("../db");
var _ = require("lodash");
var sqlstring = require("sqlstring");

router.post('/insert', async(req, res) => {
    try {
        const { imgdbImage, imageName } = req.body;
        const query = `insert into AR (arFile, arFilename) values (${sqlstring.escape(imageName)}, ${sqlstring.escape(imgdbImage)});`;
        await DB.runQuery(query);
        res.json({success: true});
    } catch (e) {
        console.log(e);
        res.json({success: false, error: e})
    }
});

/**
 * Returning all arFile from AR table (should only be one)
 */
router.get("/getImgdb", async (req, res) => {
    try {
        const query =  `select arFile from AR;`
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log("Error getting arFile", e);
        res.status(500).send("Check server logs for more info");
    }
});

module.exports = router;