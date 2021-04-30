const controller = require('../controller');

const routers = (router) => {
  router.post('/vehicle', controller.vehiclePost);
  router.get('/all_vehicles', controller.readAll);
  router.get('/vehicles/placa/:placa', controller.readParams);
  router.get('/vehicles/chassi/:chassi', controller.readParams);
  router.get('/vehicles/renavam/:renavam', controller.readParams);
  router.get('/vehicles/modelo/:modelo', controller.readParams);
  router.get('/vehicles/marca/:marca', controller.readParams);
  router.get('/vehicles/ano/:ano', controller.readAllParams);
};

module.exports = routers;
