const express     = require('express');
const next        = require('next');
const localConfig = require('./app/config');

const dev        = process.env.NODE_ENV !== 'production';
const app        = next({dev});
const handle     = app.getRequestHandler();
const PORT       = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const DB         = require('./app/db');
const Profile    = require('./app/model/Profile');

app.prepare()
   .then(async () => {
       try {
           const setUpResult = await localConfig.initializeDatabase();

           const server = express();
           server.use(bodyParser.json());
           server.use('/profile', Profile);

           server.get('/showDatabases', async (req, res) => {
               try {
                   const result = await DB.runQuery(`show databases;`);
                   res.json(result);
               } catch (e) {
                   console.log('Error showing database:', e);
                   res.status(500).send('An error occurred.');
               }
           });

           server.get('/getAllRestaurants', async (req, res) => {
               try {
                   const result = await DB.runQuery(`select * from Restaurant;`);
                   res.json(result);
               } catch (e) {
                   console.log('Error showing database:', e);
                   res.status(500).send('An error occurred.');
               }
           });

           server.get('*', (req, res) => {
               return handle(req, res);
           });

           server.listen(PORT, err => {
               if (err) throw err;
               console.log(`> Ready on port ${PORT}`);
           });
       } catch (e) {
           throw e;
       }
   })
   .catch(ex => {
       console.error(ex.stack);
       process.exit(1);
   });
