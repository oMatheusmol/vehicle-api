const mongoose = require('mongoose');
require('validator');

const vehicleSchema = new mongoose.Schema({
  placa: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    validate(value) {
      if (value.length < 7) {
        throw new Error('Invalid value!');
      }
    },
  },
  chassi: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    validate(value) {
      if (value.length < 17) {
        throw new Error('Invalid value!');
      }
    },
  },
  renavam: {
    type: Number,
    require: true,
    trim: true,
    unique: true,
    validate(value) {
      if (value.length < 11) {
        throw new Error('Invalid value!');
      }
    },
  },
  modelo: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
  },
  marca: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
  },
  ano: {
    type: Number,
    require: true,
    trim: true,
    validate(value) {
      const d = new Date();
      const n = d.getFullYear();
      if (value < 1900 || value > (n + 1)) {
        throw new Error('Invalid date!');
      }
    },
  },
}, {
  timestamps: true,
});

const Vehicle = mongoose.model('vehicles', vehicleSchema);

module.exports = Vehicle;
