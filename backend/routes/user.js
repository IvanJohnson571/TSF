const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const user = require("../models/user");
const tobacco = "tobacco-sound-factory";
const dbNodeAngular = "mongodb+srv://ivan_johnson:E_Major123456789@cluster0.vzq5zyf.mongodb.net/" + tobacco + "?retryWrites=true&w=majority";
const client = new MongoClient(dbNodeAngular, { useUnifiedTopology: true });

const router = express.Router();


//router.post("/signup", (req, res, next) => {

//  bcrypt.hash(req.body.password, 10)
//    .then(hash => {

//      const user = new User({
//        email: req.body.email,
//        password: hash
//      });

//      user.save()
//        .then(result => {
//          res.status(201).json({
//            message: 'User created',
//            result: result
//          });
//        })
//        .catch(err => {
//          res.status(500).json({
//            error: err
//          });
//        });

//    });

//});

router.post("/signup", (req, res, next) => {

  const database = client.db("tobacco-sound-factory");
  const Items = database.collection("users");

  Items.insertOne({ name: req.body.name, pass: req.body.pass })
    .then(response => {

      return res.status(200).json({
        message: "User " + req.body.name + " has been created successfully!",
        success: true
      });

    })
    .catch(err => {

      return res.status(401).json({
        message: "Something went wrong!",
        success: false
      });

    });


});

router.post("/login", (req, res, next) => {

  let fetchedUser;

  const database = client.db("tobacco-sound-factory");
  const menuItemsCol = database.collection("users");

  menuItemsCol.findOne({ name: req.body.name, pass: req.body.pass })
    .then(user => {

      if (user.name != req.body.name) {

        return res.status(401).json({
          message: "Auth failed!"
        });

      }

      fetchedUser = user;
      return bcrypt.compare(req.body.pass, user.pass);

    })
    .then(result => {

      const token = jwt.sign(

        { name: fetchedUser.name, userId: fetchedUser._id },
        'secret_this_should_be_longer',
        { expiresIn: "1h" }

      );

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        //expiresIn: 300,
        userId: fetchedUser._id,
        user_name: req.body.name
      });

    })
    .catch(err => {

      return res.status(401).json({
        message: "Auth failed!"
      });

    });

});

module.exports = router;
