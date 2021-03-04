const db = require("../models");
const Brand = db.brand;

exports.list = (req, res) => {
  Brand.find((err, brands) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      brands,
    });
  });
};


