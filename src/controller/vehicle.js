/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Vehicle = require('../models/Vehicle');

const vehiclePost = async (req, res) => {
  try {
    const prod = new Vehicle(req.body);
    prod.save().then(() => {
      res.status(201).send(prod);
    }).catch(() => {
      res.status(500).send();
    });
  } catch (e) {
    res.status(401).send({ error: 'Error.' });
  }
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
  try {
    const vehicle = await Vehicle.findOne(req.params);
    if (!vehicle) return res.send('Vehicle has not found!');
    res.send(vehicle);
  } catch (e) {
    res.status(401).send({ error: 'Error.' });
  }
};

const readAllParams = async (req, res) => {
  try {
    const vehicleParam = req.params;
    const vehicles = await Vehicle.find(vehicleParam);
    if (!vehicles) return res.send({ error: 'Vehicles has not found!' });
    res.send(vehicles);
  } catch (e) {
    res.status(401).send({ error: 'Error.' });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne(req.params);

    if (!vehicle) {
      res.status(400).send({ error: 'Invalid vehicle!' });
    }
    const updates = Object.keys(req.body);
    const allowUpdates = ['placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano'];
    const isValidOperation = updates.every((update) => allowUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
    updates.forEach((update) => vehicle[update] = req.body[update]);
    await vehicle.save();
    res.status(200).send(vehicle);
  } catch (e) {
    res.status(400).send();
  }
};

module.exports = {
  vehiclePost, readAll, readParams, readAllParams, updateVehicle,
};
