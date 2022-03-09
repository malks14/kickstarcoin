const routes = require("next-routes")(); //el parentesis significa que es una funcion que se va a invocar al toque

routes
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new")

module.exports = routes;
