// var createError = require('http-errors');
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var validator = require("express-validator");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// session
var session = require("express-session");
app.use(express.static("public"));
app.use(session({ secret: "mysupersecret", resave: true, saveUninitialized: true }));
app.use(flash());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(validator()); // tryy引入有問題
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
var routes = require("./routes/index");
var login = require("./routes/login");
var messageBoard = require("./routes/messageBoard");
var signup = require("./routes/signup");
var user = require("./routes/user");
app.use("/", routes);
app.use("/login", login);
app.use("/signup", signup);
app.use("/user", user);
app.use("/messageBoard", messageBoard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
