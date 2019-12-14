const express = require("express");
const app = express();
const engine = require("ejs-locals");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const serviceAccount = require("./key/node-todolist-dd9f0-firebase-adminsdk-8lrqo-ed38e60325.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-todolist-dd9f0.firebaseio.com"
});

// 使用 firebase
const fireData = admin.database();
// console.log(fireData);

app.engine("ejs", engine);
app.set("views", "./views");
app.set("view engine", "ejs");
//增加靜態檔案的路徑
app.use(express.static("public"));

// 增加 body 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 路由
app.get("/", function(req, res) {
  fireData.ref("todoList").once("value", function(snapshop) {
    let data = snapshop.val();
    // console.log(data);
    res.render("index", { todoList: data });
  });
});

/*
 * API
 */
// add
app.post("/addTodo", function(req, res) {
  let params = req.body.content;
  const todoRef = fireData.ref("todoList").push();
  todoRef.set({ content: params }).then(function() {
    fireData.ref("todoList").once("value", function(snapshop) {
      res.send({
        success: true,
        data: snapshop.val(),
        msg: "資料取得成功"
      });
    });
  });
});

// delet
app.post("/deletTodo", function(req, res) {
  let id = req.body.removeId;
  // console.log("id", id);
  fireData
    .ref("todoList")
    .child(id)
    .remove()
    .then(function() {
      fireData.ref("todoList").once("value", function(snapshop) {
        res.send({
          success: true,
          data: snapshop.val(),
          msg: "刪除成功"
        });
      });
    });
});

// 監聽 port
const port = process.env.PORT || 3000;
app.listen(port);
