var express = require("express");
var router = express.Router();
var firebase = require("../connections/firebase_connect");
var firebaseDb = require("../connections/firebase_admin_connect");
var fireAuth = firebase.auth(); // 會員認證
router.get("/", function(req, res) {
  res.render("signup", { title: "註冊", error: req.flash("error") });
});

router.post("/", function(req, res) {
  var email = req.body.email;
  var password = req.body.passwd;
  var nickname = req.body.nickname;
  fireAuth
    .createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      var saveUser = {
        email: email,
        nickname: nickname,
        uid: user.uid
      };
      // 擷取 user uid 存入 DB
      // ref('{db 路徑}' + {fireUid}).set({存入的user資料 可自訂需要內容})
      firebaseDb.ref("/user/" + user.uid).set(saveUser);
      res.redirect("/signup/success");
    })
    .catch(function(error) {
      var errorMessage = error.message;
      // 使用 flash 套件顯示至畫面上 沒有錯誤的話預設空值
      req.flash("error", errorMessage);
      res.redirect("/signup");
    });
});
router.get("/success", function(req, res) {
  res.render("success", {
    title: "註冊成功"
  });
});
module.exports = router;
