const express = require("express");
const menuItems = require("../models/menuItems");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const menuItemsList = require("../Data/menuItems");
const tobacco = "tobacco-sound-factory";
const dbNodeAngular = "mongodb+srv://ivan_johnson:E_Major123456789@cluster0.vzq5zyf.mongodb.net/" + tobacco + "?retryWrites=true&w=majority";
const client = new MongoClient(dbNodeAngular, { useUnifiedTopology: true });

router.get("", (req, res, next) => {

  const database = client.db("tobacco-sound-factory");
  const menuItemsCol = database.collection("menuItems");

  const items = menuItemsCol.find({}).toArray(function (err, result) {
    if (err) {
      res.send(err);

    }

  });

  items.then(documents => {

    responseData = documents;
    return menuItems.countDocuments();

  })
    .then(count => {

      res.status(200).json({
        success: true,
        data: responseData
      });

    });

});

module.exports = router;