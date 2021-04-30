const Vehicle = require('../models/Vehicle');

const vehiclePost = async (req, res) => {
  const prod = new Vehicle(req.body);
  prod.save().then(() => {
    res.send(prod);
  }).catch(() => {
    res.status(401).send({ error: 'Error.' });
  });
};

module.exports = { vehiclePost };
