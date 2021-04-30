const controller = require('../controller');
const { findOne, findAll } = require('../middleware/find');

const routers = (router) => {
  router.post('/vehicle', controller.vehiclePost);

  router.patch('/vehicle/update/:placa', controller.updateVehicle);

  router.delete('/vehicle/delete/:placa', findOne, controller.deleteVehicle);

  router.get('/vehicles', findAll, controller.read);
  router.get('/vehicles/placa/:placa', controller.readParams);
  router.get('/vehicles/chassi/:chassi', controller.readParams);
  router.get('/vehicles/renavam/:renavam', controller.readParams);
  router.get('/vehicles/modelo/:modelo', findAll, controller.readParamsModelo);
  router.get('/vehicles/marca/:marca', findAll, controller.readParamsMarca);
  router.get('/vehicles/ano/:ano', findAll, controller.readParamsAno);
};

module.exports = routers;
