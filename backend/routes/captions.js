const express = require("express");
const rootServices = require("../models/rootServices");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;

const BG_Captions = require("../Data/BG_Captions");
const EN_Captions = require("../Data/EN_Captions");
const tobacco = "tobacco-sound-factory";
const dbNodeAngular = "mongodb+srv://ivan_johnson:E_Major123456789@cluster0.vzq5zyf.mongodb.net/" + tobacco + "?retryWrites=true&w=majority";
let captionsList = null;

const client = new MongoClient(dbNodeAngular, { useUnifiedTopology: true });

router.get("/:lang", (req, res, next) => {

    if(req.params.lang == "BG") {
        captionsList = BG_Captions;

    }else {
        captionsList = EN_Captions;

    }

    res.status(200).json({
        success: true,
        data: captionsList // from back-end for now!
        
    });

});

module.exports = router;
