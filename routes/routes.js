const indexR = require("./index");

const shopR = require("./shop");

const foodR = require("./food");

const userR = require("./usres");

exports.routesInt = (app) => {
  app.use("/", indexR);

  app.use("/shop", shopR);

  app.use("/food", foodR);

  app.use("/users", userR);

  console.log("1");
};
