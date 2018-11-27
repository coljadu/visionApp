var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cons = require("consolidate");
var payment = require("./routes/payment");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "dist/visionApp")));
app.use("/purchase", express.static(path.join(__dirname, "dist/visionApp")));
app.use("/success", express.static(path.join(__dirname, "dist/visionApp")));
app.use("/payment", payment);

app.engine("html", cons.swig);
// //app.set("views", path.join(__dirname, "dist/visionApp"));
app.set("view engine", "html");
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "dist/visionApp/index.html"));
});

module.exports = app;
