const express = require("express");
const videoModel = require("../models/video");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const tobacco = "tobacco-sound-factory";
const dbNodeAngular = "mongodb+srv://ivan_johnson:E_Major123456789@cluster0.vzq5zyf.mongodb.net/" + tobacco + "?retryWrites=true&w=majority";
const client = new MongoClient(dbNodeAngular, { useUnifiedTopology: true });

router.get("", (req, res, next) => {

  const database = client.db("tobacco-sound-factory");
  const videoCol = database.collection("video");

  const items = videoCol.find({}).toArray(function (err, result) {
    if (err) {
      res.send(err);
    }

  });

  items.then(documents => {

    data = documents;
    return videoModel.countDocuments();

  })
    .then(count => {

      res.status(200).json({
        success: true,
        data: data
      });

    });

});

module.exports = router;