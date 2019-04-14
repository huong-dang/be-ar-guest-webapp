const express     = require('express');
const next        = require('next');
const localConfig = require('./app/config');

const dev            = process.env.NODE_ENV !== 'production';
const app            = next({dev});
const handle         = app.getRequestHandler();
const PORT           = process.env.PORT || 3000;
const bodyParser     = require('body-parser');
const Profile        = require('./app/model/Profile');
const Park           = require('./app/model/Park');
const Land           = require('./app/model/Land');
const Restaurant     = require('./app/model/Restaurant');
const Item           = require('./app/model/Item');
const Review         = require('./app/model/Review');
const RestaurantType = require('./app/model/RestaurantType');
const Trip           = require('./app/model/Trip');

app.prepare()
   .then(async () => {
       try {
           const setUpResult = await localConfig.initializeDatabase();
           const server      = express();
           server.use(bodyParser.json());
           server.use('/profile', Profile);
           server.use('/park', Park);
           server.use('/land', Land);
           server.use('/restaurant', Restaurant);
           server.use('/item', Item);
           server.use('/review', Review);
           server.use('/restaurantType', RestaurantType);
           server.use('/trip', Trip);
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
