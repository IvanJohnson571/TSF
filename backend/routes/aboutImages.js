const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const tobacco = "tobacco-sound-factory";
const dbNodeAngular = "mongodb+srv://ivan_johnson:E_Major123456789@cluster0.vzq5zyf.mongodb.net/" + tobacco + "?retryWrites=true&w=majority";
const client = new MongoClient(dbNodeAngular, { useUnifiedTopology: true });
const database = client.db("tobacco-sound-factory");
const aboutImages = database.collection("aboutImages");

router.get("", (req, res, next) => {

  const gallery = aboutImages.find({}).toArray(function (err, result) {
    if (err) {
      res.send(err);
    }

  });

  gallery.then(documents => {

    fetchedData = documents;

  })
    .then(count => {

      res.status(200).json({
        success: true,
        data: fetchedData
      });

    });

});

module.exports = router;