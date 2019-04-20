const mongoose = require("mongoose");
// 链接mongo 并且使用imooc-chat这个集合(没有imooc会自动创建)
const DB_URL = "mongodb://localhost:27017/imooc-chat";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    //头像
    avatar: { type: String },
    // 个人简介或者职位简介
    desc: { type: String },
    // 职位名
    title: { type: String },
    // 如果你是boss 还有两个字段
    company: { type: String },
    money: { type: String }
  },
  chat: {
    chatId: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, default: false },
    content: { type: String, require: true, default: '' },
    create_time: { type: Number, default: new Date().getTime() }
  }
};

for (let m in models) {
  // 定义模型 - 类似 MySQL 的表
  // m 名称，models[m] 模型
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name);
  }
};
