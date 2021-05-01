/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Vehicle = require('../models/Vehicle');

const vehiclePost = async (req, res) => {
  try {
    const prod = new Vehicle(req.body);
    prod.save().then(() => {
      res.status(201).send(prod);
    }).catch(() => {
      res.status(405).send();
    });
  } catch (e) {
    res.status(500).send('Error! vehiclePost');
  }
};

const read = async (req, res) => {
  try {
    res.status(302).send(req.vehicle);
  } catch {
    res.status(401).send('Error! read');
  }
};

const readParams = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne(req.params);
    if (!vehicle) return res.status(404).send('Vehicle was not found!');
    res.status(226).send(vehicle);
  } catch (e) {
    res.status(401).send('Error! readParams');
  }
};

const readParamsObject = async (req, res) => {
  try {
    const vehicles = req.vehicle;
    const param = req.params;
    let arr = [];
    const vehicle = Object.values(param)[0];
    vehicles.forEach((i) => {
      const { ano, modelo, marca } = i;
      if (ano === vehicle || modelo === vehicle || marca === vehicle) {
        arr += i;
      }
    });
    res.status(226).send(arr);
  } catch {
    res.status(401).send('Error! readParamsObject');
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne(req.params);

    if (!vehicle) {
      res.status(404).send('Invalid vehicle!');
    }
    const updates = Object.keys(req.body);
    const allowUpdates = ['placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano'];
    const isValidOperation = updates.every((update) => allowUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(304).send('Invalid updates!');
    }
    updates.forEach((update) => vehicle[update] = req.body[update]);
    await vehicle.save();
    res.status(301).send(vehicle);
  } catch (e) {
    res.status(401).send('Error! updateVehicle');
  }
};

const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.deleteOne(req.vehicle);
    res.status(303).send('Product deleted!');
  } catch {
    res.status(401).send('Error! deleteVehicle');
  }
};

module.exports = {
  vehiclePost,
  read,
  readParams,
  updateVehicle,
  deleteVehicle,
  readParamsObject,
};
