const express   = require('express');
const router    = express.Router();
const DB        = require('../db');
const _         = require('lodash');
const moment    = require('moment');
const sqlstring = require('sqlstring');

/**
 * POST: { userID: string } profile/getAllTrips
 * POST: { userID: string } profile/getAllBookmarks
 * POST: { userID: string } profile/getAllFavorites
 */
const STATUS_OPTIONS = {
    ACTIVE:  'ACTIVE',
    DELETED: 'DELETED' // When user deletes profile
};
const ROLE_OPTIONS   = {
    USER:  'user',
    ADMIN: 'admin'
};

/**
 * Add a new profile to
 */
router.post('/create', async (req, res) => {
    const {firstName, lastName, userEmail, uid, userImageURL} = req.body;
    if (!firstName || !lastName || !userEmail || !uid) {
        return res.status(500).json({
                                        error: `First name, last name, email, or uid is missing`,
                                    });
    } else {
        try {
            const dateCreated = sqlstring.escape(new Date().toISOString().slice(0, 19).replace('T', ' ')),
                  role        = sqlstring.escape(ROLE_OPTIONS.USER),
                  status      = sqlstring.escape(STATUS_OPTIONS.ACTIVE),
                  fName       = sqlstring.escape(firstName),
                  lName       = sqlstring.escape(lastName),
                  email       = sqlstring.escape(userEmail),
                  imageURL    = sqlstring.escape(userImageURL),
                  userID      = sqlstring.escape(uid);

            const query = `INSERT INTO Profile (fName, lName, email, role, userID, dateCreated, userStatus, imageURL) 
        VALUES (${fName}, ${lName}, ${email}, ${role}, ${userID}, ${dateCreated}, ${status}, ${imageURL})`;
            console.log('query is', query);
            const result = await DB.runQuery(query);
            res.json({success: true});
        } catch (e) {
            console.log('Error adding a new profile to the database:', e);
            res.json({success: false});
        }
    }
});

module.exports = router;
