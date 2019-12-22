var admin = require("firebase-admin");
// 輸入自己的金鑰
var serviceAccount = require("./key/node-authentication-34b3d-firebase-adminsdk-o1yg9-91cc12d0d3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-authentication-34b3d.firebaseio.com"
});

var db = admin.database();

module.exports = db;
