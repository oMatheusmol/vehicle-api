const Vehicle = require('../models/Vehicle');

const findAll = async (req, res, next) => {
  try {
    await Vehicle.find({}).then((vehicles) => {
      req.vehicle = vehicles;
    }).catch(() => {
      res.status(500).send();
    });

    next();
  } catch (e) {
    res.status(401).send({ error: 'Error.' });
  }
};

const findOne = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findOne(req.params);

    if (!vehicle) {
      throw new Error();
    }
    req.vehicle = vehicle;

    next();
  } catch (e) {
    res.status(401).send({ error: 'Error.' });
  }
};

module.exports = { findOne, findAll };
