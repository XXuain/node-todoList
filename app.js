const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const flash = require("connect-flash");
const validator = require("express-validator");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// session
const session = require("express-session");
app.use(express.static("public"));
app.use(session({ secret: "mysupersecret", resave: true, saveUninitialized: true }));
app.use(flash());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
const routes = require("./routes/index");
const login = require("./routes/login");
const messageBoard = require("./routes/messageBoard");
const signup = require("./routes/signup");
const user = require("./routes/user");

app
  .use("/", routes)
  .use("/login", login)
  .use("/signup", signup);

// check login
app
  .use(function(req, res, next) {
    if (req.session.uid) next();
    res.redirect("/");
  })
  .use("/user", user)
  .use("/messageBoard", messageBoard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: err
  });
});
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});
module.exports = app;
