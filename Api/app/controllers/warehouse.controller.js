const db = require("../models");
const Warehouse = db.warehouse;
const ApiError = require('../error/ApiError');

exports.create = (req, res, next) => {
  const { name } = req.body
  if (!name) {
    res.status(500).send({ error: true, message: 'name is required' });
  }

  const warehouse = new Warehouse({
    name: req.body.name
  });

  warehouse.save((err, user) => {
    if (err) res.status(500).send({ error: true,  message: err });
    res.send({ status: 200, message: "Warehouse was created successfully!" });
  });

};

exports.getAll = (req, res) => {
  Warehouse.find((err, warehouses) => {
    if (err) {
      res.status(500).send({ error: true, message: err });
      return;
    }
    res.status(200).send({
      warehouses,
    });
  });
};



