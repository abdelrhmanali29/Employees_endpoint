const connect = require('./lib/db');
const app = require('./app');
require('dotenv').config({ path: __dirname + '/.env' });

const dbUrl = process.env.DB_URI;

const port = 3001;
connect(dbUrl)
  .then(() => {
    app.listen(port, function () {
      console.log('Listening on, port number ' + port);
    });
  })
  .catch(err => {
    console.log(err);
  });
