/* eslint-disable no-console */
const express = require('express');
require('./db/mongoose');

const router = new express.Router();
const vehiclesRouter = require('./routers/vehiclesRouter');

const app = express();
const port = process.env.PORT || 3000;

vehiclesRouter(router);
app.use(express.json());
app.use(router);

const server = app.listen(port, () => {
  console.log('Listening on port %s', server.address().port);
  console.log('http://localhost:%s', server.address().port);
});

module.exports = { server };
