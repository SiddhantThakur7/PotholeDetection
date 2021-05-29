const express = require("express");
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const base64Img = require("base64-img");

const app = express();

const Pothole = require("./models/potholes");
const Current = require("./models/count");

if (process.env.NODE_ENV != "production") require("dotenv").config();
const MongoDb_URI = process.env.MONGODB_URI;

// console.log("....................................................");
// console.log(MongoDb_URI);
// console.log("....................................................");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb" }));

mongoose
  .connect(MongoDb_URI)
  .then((result) => {
    console.log("DataBase Connection Established");
  })
  .catch((err) => console.log(err));

app.post("/analyze", (req, res, next) => {
  console.log(req.body.location);
  Pothole.find({})
    .then((result) => {
      const fname = result.length.toString();
      base64Img.img(
        req.body.image,
        "Pothole_Images",
        `${fname}`,
        function (err, filepath) {
          if (err) {
            console.log(err);
            return;
          }
          const child = spawn("python", ["./print.py", 1, 2, filepath]);
          console.log(filepath);
          child.stdout.on("data", (data) => {
            let val = `${data}`.toString();
            val = parseInt(val, 10);
            console.log(val);
            if (val == 1) {
              const pothole = new Pothole({
                name: req.body.user_name,
                email: req.body.user_email,
                pothole: {
                  longitude: req.body.location.split(";")[0],
                  latitude: req.body.location.split(";")[1],
                  file_name: filepath,
                },
              });
              pothole.save().then((result) => {
                if (result) {
                  console.log("------------Pothole Recorded------------");
                }
              });
            }
            child.on("exit", function (code, signal) {
              console.log(
                "child process exited with " +
                  `code ${code} and signal ${signal}`
              );
              res.redirect("/");
            });
          });
        }
      );
    })
    .catch((err) => console.log(err));
});

app.get("/table", (req, res, next) => {
  Pothole.find({})
    .then((result) => {
      console.log(result);
      res.render("table", { items: result });
    })
    .catch((err) => console.log(err));
});



app.get("/", (req, res) => {
  res.render("sample");
});



app.get("/form", (req, res, next) => {
  res.render("form");
});



app.listen("3000", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is started on port 3000");
});
