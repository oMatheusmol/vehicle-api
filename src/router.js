const controller = require('./controller');
const { findOne, findAll, findById } = require('./middleware/find');

const routers = (router) => {
  // ROUTE VEHICLE
  router.post('/vehicle', controller.vehiclePost);

  router.patch('/vehicle/update/:placa', controller.updateVehicle);

  router.delete('/vehicle/delete/:placa', findOne, controller.deleteVehicle);

  router.get('/vehicle/placa/:placa', controller.readParams);
  router.get('/vehicle/chassi/:chassi', controller.readParams);
  router.get('/vehicle/renavam/:renavam', controller.readParams);
  router.get('/vehicle/id/:id', findById, controller.read);

  // ROUTE VEHICLES
  router.get('/vehicles', findAll, controller.read);

  router.get('/vehicles/:modelo', findAll, controller.readParamsObject);
  router.get('/vehicles/:marca', findAll, controller.readParamsObject);
  router.get('/vehicles/:ano', findAll, controller.readParamsObject);

  // ERROR ROUTE
  router.get('*', (req, res) => res.sendStatus(404));
};

module.exports = routers;
