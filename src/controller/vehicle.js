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

const read = async (req, res) => {
  res.status(200).send(req.vehicle);
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

const readParamsAno = async (req, res) => {
  const vehicles = req.vehicle;
  const param = req.params;
  let arr = [];
  const vehicle = Object.values(param)[0];
  vehicles.forEach((i) => {
    if (i.ano === vehicle) {
      arr += i;
    }
  });
  res.send(arr);
};

const readParamsModelo = async (req, res) => {
  const vehicles = req.vehicle;
  const param = req.params;
  let arr = [];
  const vehicle = Object.values(param)[0];
  vehicles.forEach((i) => {
    console.log(i.modelo);
    if (i.modelo === vehicle) {
      arr += i;
    }
  });
  res.send(arr);
};

const readParamsMarca = async (req, res) => {
  const vehicles = req.vehicle;
  const param = req.params;
  let arr = [];
  const vehicle = Object.values(param)[0];
  vehicles.forEach((i) => {
    console.log(i.marca);
    if (i.marca === vehicle) {
      arr += i;
    }
  });
  res.send(arr);
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
    res.status(401).send({ error: 'Error.' });
  }
};

const deleteVehicle = async (req, res) => {
  await Vehicle.deleteOne(req.vehicle);
  res.status(200).send('Product deleted!');
};

module.exports = {
  vehiclePost,
  read,
  readParams,
  updateVehicle,
  deleteVehicle,
  readParamsAno,
  readParamsMarca,
  readParamsModelo,
};
