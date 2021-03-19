const db = require("../models");
const Product = db.product;
const fs = require('fs');
const path = require('path');
const ApiError = require('../error/ApiError');
const { check, validationResult } = require('express-validator')

exports.create = async (req, res, next) => {
  await check('name').notEmpty().withMessage('Product name is required').run(req);
  await check('packet').notEmpty().withMessage('Packet count is required').run(req);
  if (!req.files) {
    res.send({ status: 400, message: 'Product image is required' });
  }
  
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const { name, packet } = req.body
  let image = req.files.image;
  let extension = path.extname(image.name)
  // Checking File Size (Max Size - 1MB)
  if (image.size > 1048576) {

    // Deleting Temporary File
    fs.unlinkSync(image.tempFilePath);
    res.send({ status: 431, message: 'File is too Large' });
  }

  let file = `${image.md5}${extension}`;
  image.mv(`public/uploads/${file}`, (err) => {
    if (err) res.send({ status: 500, message: err });
    
    const product = new Product({
      name: req.body.name,
      fileName: file,
      packet: req.body.packet,
      fileOriginalName: image.name
    });

    product.save((err, user) => {
      if (err) res.send({ status: 500, message: err });
      res.send({ status: 200, message: "Product was created successfully!" });
    });
  });
};

exports.update = async (req, res, next) => {
  await check('name').notEmpty().withMessage('Product name is required').run(req);
  await check('packet').notEmpty().withMessage('Packet count is required').run(req);
  
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const { name, packet } = req.body
  
  const product = await Product.findById(req.params.id);
  // validate
  if (!product) res.send({ status: 400, message: 'Product not found' });
  if (req.files) {
    let file = `public/uploads/${product.fileName}`;
    if (fs.existsSync(file)) {
      fs.unlinkSync(file, (err) => {
        if (err) res.send({ status: 500, message: err });
      });
    }

    let image = req.files.image;
    let extension = path.extname(image.name)
    // Checking File Size (Max Size - 1MB)
    if (image.size > 1048576) {

      // Deleting Temporary File
      fs.unlinkSync(image.tempFilePath);
      res.send({ status: 431, message: 'File is too Large' });
    }
    file = `${image.md5}${extension}`;
    image.mv(`public/uploads/${file}`, (err) => {
      if (err) res.send({ status: 500, message: err });
      product.name = req.body.name;
      product.fileName = file;
      product.fileOriginalName = image.name;
      product.packet = req.body.packet;
      product.status = req.body.status;

      product.save((err, product) => {
        if (err) res.send({ status: 500, message: err });
        res.send({ status: 200, message: "Product was updated successfully!" });
      });
    });
  } else {
    product.name = req.body.name;
    product.status = req.body.status;
    product.packet = req.body.packet;
    product.save((err, product) => {
      if (err) res.send({ status: 500, message: err });
      res.send({ status: 200, message: "Product was updated successfully!" });
    });
  }
};
exports.delete = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // validate
  if (!product) res.send({ status: 400, message: 'Product not found' });

  Product.deleteOne((err, product) => {
    if (err) res.send({ status: 500, message: err });
    res.send({ status: 200, message: "Product was deleted successfully!" });
  });
}
exports.getById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // validate
  if (!product) res.send({ status: 400, message: 'Product not found' });
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



