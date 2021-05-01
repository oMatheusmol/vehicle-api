const controller = require('./controller');
const { findOne, findAll } = require('./middleware/find');

const routers = (router) => {
  router.post('/vehicle', controller.vehiclePost);

  router.patch('/vehicle/update/:placa', controller.updateVehicle);

  router.delete('/vehicle/delete/:placa', findOne, controller.deleteVehicle);

  router.get('/vehicles', findAll, controller.read);
  router.get('/vehicles/placa/:placa', controller.readParams);
  router.get('/vehicles/chassi/:chassi', controller.readParams);
  router.get('/vehicles/renavam/:renavam', controller.readParams);
  router.get('/vehicles/:modelo', findAll, controller.readParamsObject);
  router.get('/vehicles/:marca', findAll, controller.readParamsObject);
  router.get('/vehicles/:ano', findAll, controller.readParamsObject);

  router.get('*', (req, res) => res.sendStatus(404));
};

module.exports = routers;
