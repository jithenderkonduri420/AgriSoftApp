const db = require("../models");
const Notification = db.notification;
var moment = require('moment');

exports.create = async (title, body) => {
  const notification = new Notification({
    distributorId,
    title,
    body,
    date: moment.now()
  });

  notification.save((err, user) => {
    if (err) console.log('notifications error', err);
    return true;
  });

};

exports.getAll = (req, res) => {
  console.log(req.body.distributorId);
  // Notification.find({ distributorId: req.body.distributorId }, (err, notifications) => {
  //   if (err) {
  //     res.status(500).send({ error: true, message: err });
  //     return;
  //   }
  //   res.status(200).send({
  //     notifications,
  //   });
  // });
  Notification.aggregate(
    [
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          records: { $push: "$$ROOT" }
        }
      },
      {
        $sort: { "_id": -1 }
      }
    ],
    function (err, notifications) {
      if (err) {
        res.status(500).send({ error: true, message: err });
        return;
      } else {
        res.status(200).send({
          notifications,
        });
      }
    }
  );
};



