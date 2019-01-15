const express = require('express');
const next = require('next');
const localConfig = require('./app/config');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const doInitializeLocalEnvironment = dev;
const PORT = 3000;

app.prepare()
    .then(async () => {
        try {
            if (doInitializeLocalEnvironment) {
                const setUpResult = await localConfig.initializeLocalDevEnvironment();
            }
            
            const server = express();

            server.get('*', (req, res) => {
                return handle(req, res);
            });

            server.listen(PORT, err => {
                if (err) throw err;
                console.log('> Ready on http://localhost:3000');
            });
        } catch(e) {
            throw e;
        }
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
