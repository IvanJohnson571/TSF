const express = require("express");
const hallOne = require("../models/gallery");
const router = express.Router();
const db = require("mongodb");

router.get("", (req, res, next) => {

  const galleryQuery = hallOne.find({});

  galleryQuery.find()
    .then(data => {

      if (data) {

        res.status(200).json({
          message: "Yes!",
          data: data
        });
      }

    })
    .catch(err => {

      return res.status(401).json({
        message: "Auth failed!"
      });

    });
});

module.exports = router;
