const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  placa: {
    type: Number,
    require: true,
    trim: true,
    unique: true,
  },
  chassi: {
    type: Number,
    require: true,
    trim: true,
    unique: true,

  },
  renavam: {
    type: Number,
    require: true,
    trim: true,
    unique: true,
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
    type: String,
    require: true,
    trim: true,
  },
}, {
  timestamps: true,
});

const Vehicle = mongoose.model('vehicles', vehicleSchema);

module.exports = Vehicle;
