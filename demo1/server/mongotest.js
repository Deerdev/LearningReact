const express = require("express");
const app = express();
const mongoose = require("mongoose");
// 1. 连接 mongod 并且使用 my-collection 集合
const DB_URL = "mongodb://localhost:27017/test-my-collection";
mongoose.connect(DB_URL);
// 2. 测试是否连接成功
mongoose.connection.on("connected", () => {
  console.log("mongo is connected successful.");
});

// 3. 定义模型 - 类似 MySQL 的表
const User = mongoose.model(
  "user",
  new mongoose.Schema({
    user: { type: String, require: true },
    age: { type: Number, require: true }
  })
);

// 4. 创建数据
User.create(
  {
    name: "wovert",
    age: 18
  },
  (err, doc) => {
    if (!err) {
      console.log(doc);
    } else {
      console.log(err);
    }
  }
);

// 5. 查询数据
app.get("/data", (req, res) => {
  User.find({}, (err, doc) => {
    res.join(doc);
  });
});

// 6. 删除数据
User.remove({ age: 18 }, (err, doc) => {
  if (!err) {
    console.log("delete success");
    User.find({}, (e, d) => {
      console.log(d);
    });
  }
});

// 7. 更新数据
User.update({ user: "wovert" }, { $set: { age: 26 } }, (e, d) => {
  console.log(d);
});
