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


module.exports = router;