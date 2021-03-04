const db = require("../models");
const Product = db.product;
const fs = require('fs');
const path = require('path');
const ApiError = require('../error/ApiError');
const ObjectId = require('mongodb').ObjectID;

exports.create = (req, res, next) => {
  const { name } = req.body
  if (!name) {
    throw next(ApiError.handleError(400, 'name is required'));
  }
  if (!req.files) {
    throw next(ApiError.handleError(400, 'image is required'));
  }
  let image = req.files.image;
  // Checking File Size (Max Size - 1MB)
  if (image.size > 1048576) {

    // Deleting Temporary File
    fs.unlinkSync(image.tempFilePath);
    throw next(ApiError.handleError(431, 'File is too Large'));
  }

  let file = `${image.md5}`;
  image.mv(`uploads/${file}`, (err) => {
    if (err) throw next(ApiError.handleError(500, err));

    const product = new Product({
      name: req.body.name,
      fileName: file,
      fileOriginalName: image.name
    });

    product.save((err, user) => {
      if (err) throw next(ApiError.handleError(500, err));
      res.send({ status: 200, message: "Product was created successfully!" });
    });
  });
};

exports.update = async (req, res, next) => {
  const name = req.body
  if (!name) {
    throw next(ApiError.handleError(400, 'name is required'));
  }
  const product = await Product.findById(req.params.id);
  // validate
  if (!product) throw next(ApiError.handleError(400, 'Product not found'));
  if (req.files) {
    let file = `uploads/${product.fileName}`;
    if (fs.existsSync(file)) {
      fs.unlinkSync(file, (err) => {
        if (err) throw next(ApiError.handleError(500, err));
      });
    }

    let image = req.files.image;
    // Checking File Size (Max Size - 1MB)
    if (image.size > 1048576) {

      // Deleting Temporary File
      fs.unlinkSync(image.tempFilePath);
      throw next(ApiError.handleError(431, 'File is too Large'));
    }
    file = `${image.md5}`;
    image.mv(`uploads/${file}`, (err) => {
      if (err) throw next(ApiError.handleError(500, err));

      product.name = req.body.name;
      product.fileName = file;
      product.fileOriginalName = image.name;
      product.status = req.body.status;

      product.save((err, product) => {
        if (err) throw next(ApiError.handleError(500, err));
        res.send({ status: 200, message: "Product was updated successfully!" });
      });
    });
  } else {
    product.name = req.body.name;
    product.status = req.body.status;
    product.save((err, product) => {
      if (err) throw next(ApiError.handleError(500, err));
      res.send({ status: 200, message: "Product was updated successfully!" });
    });
  }
};
exports.delete = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // validate
  if (!product) throw next(ApiError.handleError(400, 'Product not found'));

  Product.deleteOne((err, product) => {
    if (err) throw next(ApiError.handleError(500, err));
    res.send({ status: 200, message: "Product was deleted successfully!" });
  });
}
exports.getById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // validate
  if (!product) throw next(ApiError.handleError(400, 'Product not found'));
  res.status(200).send({ product });
};
exports.getAll = (req, res) => {
  Product.find({ status: true }, (err, products) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      products,
    });
  });
};



