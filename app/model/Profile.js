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

const ROLE_OPTIONS_VALUES = ['\'user\'', '\'admin\''];

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

            const query  = `INSERT INTO Profile (fName, lName, email, role, userID, dateCreated, userStatus, imageURL) 
        VALUES (${fName}, ${lName}, ${email}, ${role}, ${userID}, ${dateCreated}, ${status}, ${imageURL})`;
            const result = await DB.runQuery(query);
            res.json({success: true});
        } catch (e) {
            console.log('Error adding a new profile to the database:', e);
            res.json({success: false});
        }
    }
});

router.post('/getProfileById', async (req, res) => {
    const {uid} = req.body;
    if (_.isNil(uid)) {
        return res.status(500).json({
                                        error: `Cannot get profile because no ID was provided.`,
                                    });
    } else {
        try {
            const userID = sqlstring.escape(uid);
            const query  = `SELECT * FROM Profile WHERE userID = ${userID}`;
            const result = await DB.runQuery(query);
            res.json(result);
        } catch (e) {
            console.log('Error retrieving profile from the database:', e);
            res.status(500).json({
                                     error: `Cannot retrieve profile from the database.`,
                                 });
        }
    }
});

router.post('/isAdmin', async (req, res) => {
    const {uid} = req.body;
    if (_.isNil(uid)) {
        return res.send(false);
    } else {
        try {
            const userID = sqlstring.escape(uid);
            const query  = `SELECT role FROM Profile WHERE userID = ${userID}`;
            const result = await DB.runQuery(query);
            if (result.length === 1 && result[0].role === ROLE_OPTIONS.ADMIN) {
                res.send(true);
            } else {
                res.send(false);
            }
        } catch (e) {
            console.log('Error retrieving role from database:', e);
            res.send(false);
        }
    }
});

router.post('/updateRole', async (req, res) => {
    const {uid, newRole} = req.body;
    if (!uid || !newRole) {
        console.log(`Unable to update profile's role because uid or newRole is undefined.`);
        return res.status(500).json({
                                        error: `Cannot update role.`,
                                    });
    } else {
        try {
            const userID = sqlstring.escape(uid);
            const role   = sqlstring.escape(newRole);
            // Check that it's a valid role
            if (ROLE_OPTIONS_VALUES.indexOf(role) > -1) {
                const query  = `UPDATE Profile SET role = ${role} WHERE userID = ${userID};`;
                const result = await DB.runQuery(query);
                res.json({success: true});
            } else {
                throw 'Invalid role';
            }
        } catch (e) {
            console.log(`Unable to update profile's role:`, e);
            return res.status(500).json({
                                            error: `Cannot update role.`,
                                        });
        }
    }
});

router.post('/getAllProfiles', async (req, res) => {
    try {
        const query  = `SELECT * FROM Profile;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log('Error retrieving all profiles from the database:', e);
        res.status(500).json({
                                 error: `Cannot retrieve profiles from the database.`,
                             });
    }

});

module.exports = router;
