const express = require('express');
const next = require('next');
const localConfig = require('./app/config');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const doInitializeLocalEnvironment = dev;
const PORT = process.env.PORT || 3000;

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

client.connect();


app.prepare()
    .then(async () => {
        try {
            // if (doInitializeLocalEnvironment) {
            //     const setUpResult = await localConfig.initializeLocalDevEnvironment();
            // }
            
            const server = express();
            
            server.post('/createDatabase', (req, res) => {
                client.query('SHOW DATABASES;', (err, response) => {
                    if (err) {
                        res.status(500).send('An error occurred.');
                    } else {
                        res.json(response);
                    }
                    client.end();
                });
            });

            server.get('*', (req, res) => {
                return handle(req, res);
            });

            server.listen(PORT, err => {
                if (err) throw err;
                console.log(`> Ready on port ${PORT}`);
            });
        } catch(e) {
            throw e;
        }
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
