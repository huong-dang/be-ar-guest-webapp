const mysql = require('mysql');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const async = require('async');
const dotenv = require('dotenv').config();
const DB_SCHEMA_PATH = path.join(__dirname, 'group54.sql');
const DB_POPULATION = path.join(__dirname, 'insertData.sql');

let pool;

if (process.env.NODE_ENV === 'production') {
    pool = mysql.createPool({
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT
    });
} else {
    pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
    });
}

const initializeDatabase = async () => {
    try {
        const dbIsSet = await dbIsSetUp();
        if (!dbIsSet) {
            const initializedDatabase = await setUpLocalDatabase();
            console.log('Local database set up completed!');
        } else {
            console.log('Local database is already set up.');
        }
    } catch (e) {
        console.log('An error occurred in initializeDatabase()', e);
    }
}

const dbIsSetUp = async () => {
    try {
        const query = `SHOW DATABASES LIKE '${process.env.DB_NAME}'`;
        const result = await runQuery(query);

        return result && result.length > 0;
    } catch (e) {
        console.log(e);
    }
}

const getQueries = (arrayOfRawQueries) => {
    return arrayOfRawQueries.reduce((accum, currQuery) => {
        if (currQuery !== '' && currQuery !== '\n') {
            accum.push(currQuery + ';');
        }
        return accum;
    }, []);
};

const runQuery = (query) => {
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

const runQueries = (queries) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (dbConnError, conn) {
            if (dbConnError) {
                console.log('Error making a connection with the database.', dbConnError);
                reject();
            } else {
                async.each(queries, function (query, next) {
                    conn.query(query, (err, data) => {
                        if (err) {
                            next(err);
                        } else {
                            next();
                        }
                    })
                }, function (err) {
                    if (err) {
                        console.log('An error occurred with at a query.', err);
                        reject();
                    } else {
                        console.log('Done!');
                        // Release connection;
                        conn.release();
                        resolve();
                    }
                });
            }
        });
    });
}

const setUpLocalDatabase = async () => {
    try {
        const schemaFile = await readSchemaFile(DB_SCHEMA_PATH);
        const dataFile = await readSchemaFile(DB_POPULATION);

        const schemaQueries = getQueries(schemaFile.split(';'));
        const dataQueries = getQueries(dataFile.split(';'));

        const schemaIsSetUp = await runQueries(schemaQueries);
        const dataIsPopulated = await runQueries(dataQueries);

        return true;
    } catch (e) {
        console.log('Failed to populate default database: ', e);
        throw e;
    }
}

const readSchemaFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                reject();
            } else {
                resolve(data);
            }
        });
    });
}

exports.initializeDatabase = initializeDatabase;
