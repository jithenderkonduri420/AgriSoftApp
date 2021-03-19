const db = require("../models");
const Order = db.order;
const Distributor = db.distributor;
const { check, validationResult } = require('express-validator')
var _ = require('lodash');
var moment = require('moment');

exports.create = async (req, res) => {
  await check('distributorId').notEmpty().withMessage('Distributor name is required').run(req);
  await check('product.*.qty').notEmpty().withMessage('Qty is required').run(req);
  await check('product.*.total_packets').notEmpty().withMessage('No of Packets is required').run(req);
  await check('total').notEmpty().withMessage('Total Price is required').run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const distributor = await Distributor.findById(req.body.distributorId).populate("route", "-__v");
  // validate
  if (!distributor) { res.send({ status: 400, message: 'Distributor not found' }); }
  else {
    if(compareTime(distributor.route.closeTime, moment().format('HH:MM')) === -1) {
      return res.send({ status: 400, message: 'Order placing time is completed for today' });
    }
    const checking = distributorOrderPlacingCheck(distributor, req.body);
    if (!checking) {
      return res.send({ status: 400, message: 'Order not placed due to insufficient crates or amount limit for today' });
    }
    if (checking) {
      const order = new Order({
        distributorId: req.body.distributorId,
        product: req.body.product,
        outstanding_price: req.body.outstanding_price,
        total: req.body.total
      });
      const sumOfCrates = _.sumBy(order.product, function (o) { return o.qty * o.total_packets; });

      order.save((err, user) => {
        if (err) res.send({ status: 500, message: err });
        distributor.outStandingAmount = req.body.total;
        distributor.outStandingCrates = sumOfCrates;
        distributor.save((err, product) => {
          if (err) res.send({ status: 500, message: err });
          res.send({ status: 200, message: "Order placed successfully!" });
        });

      });
    }
  }

};
function distributorOrderPlacingCheck(distributor, order) {
  const sumOfCrates = _.sumBy(order.product, function (o) { return o.qty * o.total_packets; });
  if (distributor.outStandingCrates === 0 && distributor.outStandingAmount === 0) {
    return true;
  }
  if (distributor.outStandingAmount > order.total && distributor.outStandingCrates > sumOfCrates) {
    return true;
  }


}
function compareTime(str1, str2) {
  if (str1 === str2) {
    return 0;
  }
  var time1 = str1.split(':');
  var time2 = str2.split(':');
  if (eval(time1[0]) > eval(time2[0])) {
    return 1;
  } else if (eval(time1[0]) == eval(time2[0]) && eval(time1[1]) > eval(time2[1])) {
    return 1;
  } else {
    return -1;
  }
}


