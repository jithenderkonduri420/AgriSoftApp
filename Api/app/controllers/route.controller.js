const db = require("../models");
const Route = db.route;
const ApiError = require('../error/ApiError');
const { validationResult } = require('express-validator')

exports.create = (req, res, next) => {
  const { name, warehouse, openTime, closeTime, locations } = req.body
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const route = new Route({
    name,
    warehouse,
    openTime,
    closeTime,
    locations
  });

  route.save((err, user) => {
    if (err) throw next(ApiError.handleError(500, err));
    res.send({ status: 200, message: "route was created successfully!" });
  });

};

exports.update = async (req, res, next) => {
  const { openTime, closeTime, locations } = req.body
  const route = await Route.findById(req.params.id);
  // validate
  if (!route) throw next(ApiError.handleError(400, 'Route not found'));
  route.openTime = openTime;
  route.closeTime = closeTime;
  route.locations = locations;

  route.save((err, product) => {
    if (err) throw next(ApiError.handleError(500, err));
    res.send({ status: 200, message: "Route was updated successfully!" });
  });
};
exports.delete = async (req, res, next) => {
  const route = await Route.findById(req.params.id);
  // validate
  if (!route) throw next(ApiError.handleError(400, 'Route not found'));

  Route.deleteOne((err, product) => {
    if (err) throw next(ApiError.handleError(500, err));
    res.send({ status: 200, message: "Route was deleted successfully!" });
  });
}
exports.getById = async (req, res, next) => {
  const route = await Route.findById(req.params.id);
  // validate
  if (!route) throw next(ApiError.handleError(400, 'route not found'));
  res.status(200).send({ route });
};
exports.getAll = (req, res) => {
  Route.find({}, (err, routes) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      routes,
    });
  });
};



