const controller = require('../controller');

const routers = (router) => {
  router.post('/vehicle', controller.vehiclePost);
};

module.exports = routers;
