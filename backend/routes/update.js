const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const tobacco = "tobacco-sound-factory";
const dbNodeAngular = "mongodb+srv://ivan_johnson:E_Major123456789@cluster0.vzq5zyf.mongodb.net/" + tobacco + "?retryWrites=true&w=majority";
const client = new MongoClient(dbNodeAngular, { useUnifiedTopology: true });
const database = client.db("tobacco-sound-factory");
const multer = require("multer");
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

//Storage only for about images for now
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images/about");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];

    //NOTE: old logic for file name
    //cb(null, name + "-" + Date.now() + "." + ext);

    //NOTE: new logic for file name
    cb(null, Date.now() + "-" + name);

  }
});

router.get("", (req, res, next) => {

});

router.post("/address", (req, res, next) => {

  const menuItemsCol = database.collection("contactsData");
  let locationString = null;

  if (req.body.lang == "BG") {
    locationString = {
      locationStringBG: req.body.updatedAddress
    }

  }

  if (req.body.lang == "EN") {
    locationString = {
      locationStringEN: req.body.updatedAddress
    }

  }

  menuItemsCol.updateOne(
    { id: req.body.id },
    { $set: locationString },
  )
    .then(user => {

      return res.status(200).json({
        message: "Data has been changed!",
        changed: true
      });

    })

    .catch(err => {

      return res.status(401).json({
        message: "Auth failed!"
      });

    });

});

router.post("/telephone", (req, res, next) => {

  let phone = {
    phone: req.body.updatedAddress
  };

  const menuItemsCol = database.collection("contactsData");

  menuItemsCol.updateOne(
    { id: req.body.id },
    { $set: phone },
  )
    .then(user => {

      return res.status(200).json({
        message: "Data has been changed!",
        changed: true
      });

    })

    .catch(err => {

      return res.status(401).json({
        message: "Auth failed!"
      });

    });

});

router.post("/mail", (req, res, next) => {

  let email = {
    email: req.body.updatedAddress
  };

  const menuItemsCol = database.collection("contactsData");

  menuItemsCol.updateOne(
    { id: req.body.id },
    { $set: email },
  )
    .then(user => {

      return res.status(200).json({
        message: "Data has been changed!",
        changed: true
      });

    })

    .catch(err => {

      return res.status(401).json({
        message: "Auth failed!"
      });

    });

});

router.post("/textMap", (req, res, next) => {

  let contactString;

  let data = {
    mapData: {
      lat: req.body.updatedAddress.mapData["lat"],
      lng: req.body.updatedAddress.mapData["lng"]
    },
    contactString: {
      //BG: null,
      //EN: null
    }

  };

  data.contactString.EN = req.body.updatedAddress.contactString["EN"];
  data.contactString.BG = req.body.updatedAddress.contactString["BG"];

  const menuItemsCol = database.collection("contactsData");

  menuItemsCol.updateOne(
    { id: req.body.id },
    { $set: data },
  )
    .then(user => {

      return res.status(200).json({
        message: "Data has been changed!",
        changed: true
      });

    })

    .catch(err => {

      return res.status(401).json({
        message: "Auth failed!"
      });

    });

});

router.post("/hallOneData", (req, res, next) => {

  DescriptionBG = req.body.hallOne[0].DescriptionBG;
  DescriptionEN = req.body.hallOne[0].DescriptionEN;

  let data = {
    hallOne: [
      {
        DescriptionBG: DescriptionBG,
        DescriptionEN: DescriptionEN,
        id: '01'
      }
    ]
  }

  const hasllCollection = database.collection("halls");

  hasllCollection.updateOne(
    { id: req.body.hallOne.id },
    { $set: data },
  )
    .then(response => {
      return res.status(200).json({
        message: "Data has been changed!",
        changed: true
      });

    })

    .catch(err => {

      return res.status(401).json({
        message: "Auth failed!"
      });

    });

});

router.post("/hallTwoData", (req, res, next) => {

  DescriptionBG = req.body.hallTwo[0].DescriptionBG;
  DescriptionEN = req.body.hallTwo[0].DescriptionEN;

  let data = {
    hallTwo: [
      {
        DescriptionBG: DescriptionBG,
        DescriptionEN: DescriptionEN,
        id: '02'
      }
    ]
  }

  const hasllCollection = database.collection("halls");

  hasllCollection.updateOne(
    { id: req.body.hallTwo.id },
    { $set: data },
  )
    .then(response => {
      return res.status(200).json({
        message: "Data has been changed!",
        changed: true
      });

    })

    .catch(err => {

      return res.status(401).json({
        message: "Auth failed!"
      });

    });

});

router.post("/aboutDescription", (req, res, next) => {

  const aboutDescription = database.collection("aboutDescription");

  let data = {
    aboutDesc: {
      BG: req.body.aboutDesc["BG"],
      EN: req.body.aboutDesc["EN"]
    }
  };

  aboutDescription.updateOne(
    { text: "text" },
    { $set: data },
  )
    .then(response => {

      if (response.modifiedCount > 0) {
        return res.status(200).json({
          message: "Data has been changed!",
          changed: true
        });

      } else {
        return res.status(401).json({
          message: "Something went wrong!"
        });

      }

    })

    .catch(err => {

      return res.status(401).json({
        message: "Something went wrong!"
      });

    });

});

router.post("/addVideo", (req, res, next) => {

  const menuItemsCol = database.collection("video");

  menuItemsCol.insertOne(
    {
      nameBG: req.body.nameBG,
      nameEN: req.body.nameEN,
      videoId: req.body.videoId,

    },
  )
    .then(user => {

      return res.status(200).json({
        message: "Video has been added!",
        changed: true
      });

    })

    .catch(err => {

      return res.status(401).json({
        message: "Something went wrong!"
      });

    });

});

router.post("/deleteVideo", (req, res, next) => {

  const menuItemsCol = database.collection("video");

  menuItemsCol.deleteOne(
    {
      nameBG: req.body.nameBG,
      videoId: req.body.videoId,
      nameEN: req.body.nameEN
    },
  )
    .then(user => {

      return res.status(200).json({
        message: "Video has been deleted!",
        changed: true
      });

    })

    .catch(err => {

      return res.status(401).json({
        message: "Something went wrong!"
      });

    });

});

router.post("/addImage", multer({ storage: storage }).single("image"),
  (req, res, next) => {

    const url = req.protocol + "://" + req.get("host");
    const menuItemsCol = database.collection("aboutImages");

    menuItemsCol.insertOne(
      {
        big: req.file.filename,
        medium: req.file.filename,
        small: req.file.filename,
      },
    )
      .then(user => {

        return res.status(200).json({
          message: "Image has been added successfully!",
          changed: true
        });

      })

      .catch(err => {

        return res.status(401).json({
          message: "Something went wrong!"
        });

      });

  }
);

const storageHallOneInsert = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");

    if (isValid) {
      error = null;
    }
    cb(error, "images/Gallery");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, Date.now() + "-" + name);

  }
});

router.post("/addImageHallOne", multer({ storage: storageHallOneInsert }).single("image"),
  (req, res, next) => {

    const url = req.protocol + "://" + req.get("host");
    const menuItemsCol = database.collection("hallOne");

    menuItemsCol.insertOne(
      {
        big: req.file.filename,
        medium: req.file.filename,
        small: req.file.filename,
      },
    )
      .then(user => {

        return res.status(200).json({
          message: "Image has been added successfully!",
          changed: true
        });

      })

      .catch(err => {

        return res.status(401).json({
          message: "Something went wrong!"
        });

      });

  }
);

router.post("/addError", multer({ storage: storage }).single("image"),
  (req, res, next) => {

    const menuItemsCol = database.collection("errors");
    var datetime = new Date();

    menuItemsCol.insertOne(
      {
        error: req.body,
        date: datetime
      },
    )
      .then(user => {

        return res.status(200).json({
          message: "Error has been added successfully!",
          send: true
        });

      })

      .catch(err => {

        return res.status(401).json({
          message: "Something went wrong!"
        });

      });

  }
);

router.post("/addImageHallTwo", multer({ storage: storageHallOneInsert }).single("image"),
  (req, res, next) => {

    const url = req.protocol + "://" + req.get("host");
    const menuItemsCol = database.collection("hallTwo");

    menuItemsCol.insertOne(
      {
        big: req.file.filename,
        medium: req.file.filename,
        small: req.file.filename,
      },
    )
      .then(response => {

        return res.status(200).json({
          message: "Image has been added successfully!",
          changed: true
        });

      })

      .catch(err => {

        return res.status(401).json({
          message: "Something went wrong!"
        });

      });

  }
);

router.post("/deleteImage", (req, res, next) => {

  const menuItemsCol = database.collection("aboutImages");
  let originalImageName = req.body.imageData.originalImageName;

  menuItemsCol.deleteOne({ _id: new ObjectId(req.body.imageData._id) })
    .then(result => {

      if (result.deletedCount > 0) {

        //Delete image from physical server!
        fs.unlink("images/about/" + originalImageName, (err => {

          if (err) {
            //To do...

          } else {
            //To do...

          }

        }));

        return res.status(200).json({
          message: "Image " + originalImageName + " has been deleted!",
          changed: true
        });

      } else {

        return res.status(401).json({
          message: "Something went wrong!"
        });

      }


    }).catch(err => {

      return res.status(401).json({
        message: "Something went wrong!"
      });

    });

});

router.post("/deleteImageHallOne", (req, res, next) => {

  const menuItemsCol = database.collection("hallOne");
  let originalImageName = req.body.imageData.originalImageName;

  menuItemsCol.deleteOne({ _id: new ObjectId(req.body.imageData._id) })
    .then(result => {

      if (result.deletedCount > 0) {

        //Delete image from physical server!
        fs.unlink("images/Gallery/" + originalImageName, (err => {

          if (err) {
            //To do...

          } else {
            //To do...

          }

        }));

        return res.status(200).json({
          message: "Image " + originalImageName + " has been deleted!",
          changed: true
        });

      } else {

        return res.status(401).json({
          message: "Something went wrong!"
        });

      }


    }).catch(err => {

      return res.status(401).json({
        message: "Something went wrong!"
      });

    });

});

router.post("/deleteImageHallTwo", (req, res, next) => {

  const menuItemsCol = database.collection("hallTwo");
  let originalImageName = req.body.imageData.originalImageName;

  menuItemsCol.deleteOne({ _id: new ObjectId(req.body.imageData._id) })
    .then(result => {

      if (result.deletedCount > 0) {

        //Delete image from physical server!
        fs.unlink("images/Gallery/" + originalImageName, (err => {

          if (err) {
            //To do...

          } else {
            //To do...

          }

        }));

        return res.status(200).json({
          message: "Image " + originalImageName + " has been deleted!",
          changed: true
        });

      } else {

        return res.status(401).json({
          message: "Something went wrong!"
        });

      }


    }).catch(err => {

      return res.status(401).json({
        message: "Something went wrong!"
      });

    });

});

module.exports = router;
