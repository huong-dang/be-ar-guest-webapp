const mysql = require('mysql');
const dotenv = require('dotenv').config();

const DB = (function () {
    let instance;

    function init() {
        const pool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DB_NAME
        });

        function runQuery(query) {
            return new Promise ((resolve, reject) => {
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
                const query = 'DROP DATABASE ' + process.env.DB_NAME + ';';
                const drop = await runQuery(query);
                console.log(`Success! Database ${process.env.DB_NAME} dropped.`);
            } catch(e) {
                throw e;
            }
        }

        return { runQuery, dropDatabase };
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
