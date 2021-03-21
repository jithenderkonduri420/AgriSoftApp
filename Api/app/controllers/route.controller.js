const db = require("../models");
const Route = db.route;
const ApiError = require('../error/ApiError');
const { validationResult } = require('express-validator')

exports.create = (req, res, next) => {
  const { name, warehouse, openTime, closeTime, locations } = req.body
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: true, message: errors.array() })
  }

  const route = new Route({
    name,
    warehouse,
    openTime,
    closeTime,
    locations
  });

  route.save((err, user) => {
    if (err) res.status(500).send({ error: true, message: err });
    res.send({ message: "route was created successfully!" });
  });

};

exports.update = async (req, res, next) => {
  const { openTime, closeTime, locations } = req.body
  const route = await Route.findById(req.params.id);
  // validate
  if (!route) res.status(400).send({ error: true, message: 'Route not found' });
  route.openTime = openTime;
  route.closeTime = closeTime;
  route.locations = locations;

  route.save((err, product) => {
    if (err) res.status(500).send({ error: true, message: err });
    res.send({message: "Route was updated successfully!" });
  });
};
exports.delete = async (req, res, next) => {
  const route = await Route.findById(req.params.id);
  // validate
  if (!route) res.status(500).send({ error: true, message: 'Route not found' });

  Route.deleteOne((err, product) => {
    if (err) res.status(500).send({ error: true, message: err });
    res.send({ message: "Route was deleted successfully!" });
  });
}
exports.getById = async (req, res, next) => {
  const route = await Route.findById(req.params.id);
  // validate
  if (!route) res.status(400).send({ error: true, message: 'Route not found' });
  res.send({ route });
};
exports.getAll = (req, res) => {
  Route.find({}, (err, routes) => {
    if (err) {
      res.status(500).send({ error: true, message: err });
      return;
    }
    res.status(200).send({
      routes,
    });
  });
};



