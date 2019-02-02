/**
 * This module provides a singleton instance to the mysql database.
 * Here is where basic query operations should be defined and made public
 * to be used by other modules.
 */
'use strict';

const mysql  = require('mysql');
const dotenv = require('dotenv').config();

const DB = (function () {
    let instance;

    function init() {
        const pool = process.env.NODE_ENV === 'production' ?
            mysql.createPool({
                                 host:     process.env.RDS_HOSTNAME,
                                 user:     process.env.RDS_USERNAME,
                                 password: process.env.RDS_PASSWORD,
                                 port:     process.env.RDS_PORT,
                                 database: process.env.DB_NAME
                             })
            : mysql.createPool({
                                   host:     process.env.HOST,
                                   user:     process.env.USERNAME,
                                   password: process.env.PASSWORD,
                                   database: process.env.DB_NAME
                               });

        function runQuery(query) {
            return new Promise((resolve, reject) => {
                pool.getConnection((dbConnError, conn) => {
                    if (dbConnError) {
                        console.log('Failed to get database connection.', dbConnError);
                        reject();
                    } else {
                        conn.query(query, (err, data) => {
                            if (err) {
                                console.log('Failed to execute query:', err);
                                reject();
                            } else {
                                console.log('Done!');
                                conn.release();
                                resolve(data);
                            }
                        })
                    }
                })
            });
        }

        async function dropDatabase() {
            try {
                const query  = 'DROP DATABASE ' + process.env.DB_NAME + ';';
                const result = await runQuery(query);
                console.log(`Success! Database ${process.env.DB_NAME} dropped.`);
            } catch (e) {
                throw e;
            }
        }

        // Export public methods that can be used by calling
        // DB.methodName();
        return {runQuery, dropDatabase};
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }

            return instance;
        }
    }
})();

module.exports = DB.getInstance();
// module.exports.dropDatabase = DB.getInstance().dropDatabase;
