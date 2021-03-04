const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const dbConfig = require("./app/config/db.config");
const path = require('path');
const app = express();
const apiErrorHandler = require('./app/error/api-error-handler');
var corsOptions = {
  origin: "http://localhost:8081"
};

// enable files upload
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'uploads'),
}));


app.use(cors(corsOptions));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded



const db = require("./app/models");
const Role = db.role;
const Brand = db.brand;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods: *",
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
// routes
require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app);
require("./app/routes/brands.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/warehouse.routes")(app);
require("./app/routes/route.routes")(app);
require("./app/routes/distributor.routes")(app);




app.use(apiErrorHandler);
// set port, listen for requests
const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "distributor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Distributor' to roles collection");
      });

      new Role({
        name: "delivery-boy"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Delivery Boy' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
  Brand.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Brand({
        name: "Sabari Milk"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Sabari Milk' to Brand collection");
      });

      new Brand({
        name: "Menma Milk"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Menma Milk' to Brand collection");
      });

      new Brand({
        name: "Malabar Milk"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Malabar Milk' to Brand collection");
      });
    }
  });
}
