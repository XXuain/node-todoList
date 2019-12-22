var express = require("express");
var router = express.Router();
var firebaseDb = require("../connections/firebase_admin_connect");
router.get("/", function(req, res) {
  // ref('{db 路徑}' + {fireUid}).once(撈出資料)
  firebaseDb.ref("user/" + req.session.uid).once("value", function(snapshot) {
    res.render("user", { title: "會員專區", nickname: snapshot.val().nickname });
  });
});
module.exports = router;
