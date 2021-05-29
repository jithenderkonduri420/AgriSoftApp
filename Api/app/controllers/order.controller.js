const db = require("../models");
const Order = db.order;
const Distributor = db.distributor;
const Notification = db.notification;
const { check, validationResult } = require('express-validator')
const notifications = require("./notifications.controller");
var _ = require('lodash');
var moment = require('moment');
const orderid = require('order-id')('mysecret');

exports.create = async (req, res) => {
  await check('distributorId').notEmpty().withMessage('Distributor name is required').run(req);
  await check('product.*.qty').notEmpty().withMessage('Qty is required').run(req);
  await check('product.*.total_packets').notEmpty().withMessage('No of Packets is required').run(req);
  await check('total').notEmpty().withMessage('Total Price is required').run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  try {
    const distributor = await Distributor.findById(req.body.distributorId).populate("route", "-__v");
    // validate
    if (!distributor) { res.status(400).send({ error: true, message: 'Distributor not found' }); }
    else {
      if (compareTime(moment(distributor.route.closeTime, ["h:mm A"]).format('HH:MM'), moment().format('HH:MM')) === -1) {
        return res.status(400).json({ error: true, message: 'Order placing time is completed for today' });
      }
      const checking = distributorOrderPlacingCheck(distributor, req.body);
      if (!checking) {
        return res.status(400).json({ error: true, message: 'Order not placed due to insufficient crates or amount limit for today' });
      }
      if (checking) {
        const id = orderid.generate();
        const orderId = orderid.getTime(id);
        const order = new Order({
          orderId,
          distributorId: req.body.distributorId,
          routeId: distributor.route,
          product: req.body.product,
          outstanding_price: req.body.outstanding_price,
          total: req.body.total,
          order: 'accept'
        });
        const sumOfCrates = _.sumBy(order.product, function (o) { return o.qty * o.total_packets; });
        distributor.outStandingAmount += req.body.total;
        distributor.outStandingCrates += sumOfCrates;
        if (distributor.cashLimit <= (req.body.total + distributor.outStandingAmount) && distributor.crateLimit <= (sumOfCrates + distributor.outStandingCrates)) {
          distributor.active = false;
        }

        const orderResult = await order.save();

        await distributor.save();

        const notification = new Notification({
          distributorId: req.body.distributorId,
          title: 'Order Accepted',
          body: `We acknowledge the receipt of your purchase order number ${orderId}`,
          isRead : false
        })
        await notification.save()

        res.status(200).send({ message: `Your order (${orderId}) placed successfully!.` });

      }
    }
  } catch (err) {
    console.log(err);
  }

};
function distributorOrderPlacingCheck(distributor, order) {
  const sumOfCrates = _.sumBy(order.product, function (o) { return o.qty * o.total_packets; });
  if (distributor.outStandingCrates === 0 && distributor.outStandingAmount === 0) {
    return true;
  }
  if (distributor.cashLimit >= (order.total + distributor.outStandingAmount) && distributor.crateLimit >= (sumOfCrates + distributor.outStandingCrates)) {
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
function orderNumber() {
  let now = Date.now().toString() // '1492341545873'
  // pad with extra random digit
  now += now + Math.floor(Math.random() * 10)
  // format
  return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-')
}


