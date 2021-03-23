                              const config = require("../config/auth.config");
const db = require("../models");
const ApiError = require('../error/ApiError');
const { validationResult } = require('express-validator')
const Distributor = db.distributor;
const Route = db.route;
const Brand = db.brand;
var bcrypt = require("bcryptjs");
var ObjectId = require('mongoose').Types.ObjectId;

exports.create = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ error: true, message: errors.array() })
  const route = await Route.findById(req.body.route).populate("warehouse", "-__v");
  // validate
  if (!route) res.status(400).send({  error: true,  message: 'Route not found' });

  const brand = await Brand.findById(req.body.brand);
  // validate
  if (!brand) res.status(400).send({  error: true,  message: 'Brand not found' });

  const password = Math.random().toString(36).substring(4);

  var code = `${route.warehouse.name.substring(0, 2).toUpperCase()}${route.name.substring(0, 3).toUpperCase()}${brand.name.substring(0, 3).toUpperCase()}${req.body.name.substring(0, 3).toUpperCase()}`;

  Distributor.findOne({
    code
  }).exec((err, user) => {
    if (err) res.status(500).send({  error: true, message: err });
    if (user) res.status(400).send({  error: true, message: "Failed! Distributor is already in use!" });
  });

  const distributor = new Distributor({
    name: req.body.name,
    brand: req.body.brand,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    route: req.body.route,
    location: req.body.location,
    products: req.body.products,
    crateLimit: req.body.crateLimit,
    cashLimit: req.body.cashLimit,
    password,
    passwordHash: bcrypt.hashSync(password, 8),
    code
  });

  distributor.save((err, user) => {
    if (err) res.status(500).send({  error: true,  message: err });
    res.send({ message: "Distributor was created successfully!" });
  });
};
exports.update = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({  error: true, message: errors.array() })

  const distributor = await Distributor.findById(req.params.id);
  // validate
  if (!distributor) res.status(400).send({  error: true, message: 'Distributor not found'});

  distributor.name = req.body.name;
  distributor.email = req.body.email;
  distributor.phone = req.body.phone;
  distributor.address = req.body.address;
  distributor.products = req.body.products;
  distributor.crateLimit = req.body.crateLimit;
  distributor.cashLimit = req.body.cashLimit;


  distributor.save((err, product) => {
    if (err) res.status(500).send({  error: true, message: err });
    res.send({ status: 200, message: "Distributor was updated successfully!" });
  });
};
exports.delete = async (req, res, next) => {
  const distributor = await Distributor.findById(req.params.id);
  // validate
  if (!distributor) res.status(400).send({  error: true, message: "distributor not found" });
  Distributor.deleteOne((err, distributor) => {
    if (err) res.status(500).send({  error: true,  message: err });
    res.send({ status: 200, message: "Distributor was deleted successfully!" });
  });
}
exports.getById = async (req, res, next) => {
  const distributor = await Distributor.findById(req.params.id).populate("brand", "-__v").populate("products.productId", "-__v").populate("route", "-__v");
  // validate
  if (!distributor) res.status(400).send({  error: true,  message: 'Distributor not found' });
  res.status(200).send({ distributor });
};
exports.getAll = (req, res) => {
  Distributor.find({}, (err, distributors) => {
    if (err) {
      res.status(500).send({ error: true, message: err });
      return;
    }
    res.status(200).send({
      distributors,
    });
  });
};
