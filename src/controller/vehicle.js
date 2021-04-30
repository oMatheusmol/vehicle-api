const Vehicle = require('../models/Vehicle');

const vehiclePost = async (req, res) => {
  const prod = new Vehicle(req.body);
  prod.save().then(() => {
    res.send(prod);
  }).catch(() => {
    res.status(401).send({ error: 'Error.' });
  });
};

const readAll = async (req, res) => {
  try {
    await Vehicle.find({}).then((vehicle) => {
      res.status(200).send(vehicle);
    }).catch(() => {
      res.status(500).send();
    });
  } catch (e) {
    res.status(401).send({ error: 'Error.' });
  }
};

const readParams = async (req, res) => {
  const vehicle = await Vehicle.findOne(req.params);
  res.send(vehicle);
};

const readAllParams = async (req, res) => {
  const vehicleParam = req.params;
  const vehicles = await Vehicle.find(vehicleParam);
  res.send(vehicles);
};

module.exports = {
  vehiclePost, readAll, readParams, readAllParams,
};
