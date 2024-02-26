const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const router = express.Router();
const audio = require("./routes/audio");
const video = require("./routes/video");
const userRoutes = require('./routes/user');
const update = require('./routes/update');
const hallOne = require("./routes/hallOne");
const halls = require("./routes/halls");
const contactsData = require("./routes/contactsData");
const hallTwo = require("./routes/hallTwo");
const aboutImages = require("./routes/aboutImages");
const aboutDescription = require("./routes/aboutDescription");
const menuItems = require("./routes/menuItems");
const rootServices = require("./routes/rootServices");
const captionServices = require("./routes/captions");
const sendMail = require("./routes/sendEmail");
//const userRoute = require("./routes/user");
const app = express();
const tobacco = "tobacco-sound-factory";
const user = "ivan_johnson";
const cred = "E_Major123456789";
const dbNodeAngular = "mongodb+srv://" + user + ":" + cred + "@cluster0.vzq5zyf.mongodb.net/" + tobacco + "?retryWrites=true&w=majority";
const client = new MongoClient(dbNodeAngular, { useUnifiedTopology: true });

mongoose
  .connect(dbNodeAngular)
  .then(() => {
    //console.log("Connected to database!");// To be commented for production!
  })
  .catch(() => {
    //console.log("Connection failed!");// To be commented for production!
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

// Angular specific paths
app.use("/Main", express.static(path.join(__dirname, "angular")));
app.use("/Halls", express.static(path.join(__dirname, "angular")));
app.use("/Contacts", express.static(path.join(__dirname, "angular")));
app.use("/About%20Us", express.static(path.join(__dirname, "angular")));
app.use("/Main", express.static(path.join(__dirname, "angular")));
app.use("/Media", express.static(path.join(__dirname, "angular")));
app.use("/Admin-LogIn", express.static(path.join(__dirname, "angular")));

//Error Angular page.
app.use("/", express.static(path.join(__dirname, "angular")));

app.use(express.json({ limit: '50mb' }));

//The Below To be commented for production!!!
app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  res.setHeader('Content-Type', 'image/svg+xml');

  next();

});

app.use("/api/audio", audio);
app.use("/api/video", video);
app.use("/api/users", userRoutes);
app.use("/api/update", update);
app.use("/api/menuItems", menuItems);
app.use("/api/rootServices", rootServices);
app.use("/api/captionServices", captionServices);
app.use("/api/sendMail", sendMail);
app.use("/api/hallOne", hallOne);
app.use("/api/halls", halls);
app.use("/api/contactsData", contactsData);
app.use("/api/hallTwo", hallTwo);
app.use("/api/aboutImages", aboutImages);
app.use("/api/aboutDescription", aboutDescription);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));

});

module.exports = app;
