var controller = require("../controllers/autoplay.controller");

module.exports = function(app){

  app.route("/autoplays")
     .get(controller.list);

  app.route("/autoplays/create")
     .post(controller.create);

  app.route("/autoplays/cancel")
     .post(controller.cancel);

  app.route("/autoplays/test")
     .get(controller.find);
};
