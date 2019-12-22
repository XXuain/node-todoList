var firebase = require("firebase");
// 貼上自己的 config 設定
var config = {
  apiKey: "AIzaSyAdchCz7068P_1ylBuQ2A17EAldBCQI8qI",
  authDomain: "node-authentication-34b3d.firebaseapp.com",
  databaseURL: "https://node-authentication-34b3d.firebaseio.com",
  projectId: "node-authentication-34b3d",
  storageBucket: "node-authentication-34b3d.appspot.com",
  messagingSenderId: "381263352756",
  appId: "1:381263352756:web:0146336755fd3af0fad8e1"
};

firebase.initializeApp(config);

module.exports = firebase;
