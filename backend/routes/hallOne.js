const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const tobacco = "tobacco-sound-factory";
const dbNodeAngular = "mongodb+srv://ivan_johnson:E_Major123456789@cluster0.vzq5zyf.mongodb.net/" + tobacco + "?retryWrites=true&w=majority";
const client = new MongoClient(dbNodeAngular, { useUnifiedTopology: true });
const database = client.db("tobacco-sound-factory");
const galleryOne = database.collection("hallOne");

router.get("", (req, res, next) => {

  const gallery = galleryOne.find({}).toArray(function (err, result) {
    if (err) {
      res.send(err);
    }

  });

  gallery.then(documents => {

    galleryOneData = documents;

  })
    .then(count => {

      res.status(200).json({
        success: true,
        data: galleryOneData
      });

    });

});

module.exports = router;
