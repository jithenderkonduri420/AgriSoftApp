const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Distributor = db.distributor;
const ApiError = require('../error/ApiError');
const { check, validationResult } = require('express-validator')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      let role = 'admin';

      for (let i = 0; i < user.roles.length; i++) {
        role = user.roles[i].name;
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role,
        accessToken: token
      });
    });
};
exports.appSignin = async (req, res, next) => {
  await check('code').notEmpty().withMessage('Distributor userid is required').run(req);
  await check('password').notEmpty().withMessage('Password is required').run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  Distributor.findOne({
    code: req.body.code
  })
    .exec((err, distributor) => {
      if (err) throw next(ApiError.handleError(500, err));
      if (!distributor) res.status(400).json({ status: 400, message: "Distributor userid is invalid." });

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        distributor.passwordHash
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          status: 401,
          message: "Invalid Password!"
        });
      }

      let token = jwt.sign({ distributor: distributor }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        accessToken: token
      });
    });
};
