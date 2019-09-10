/* eslint-disable import/first */
// 设置css和图片的hook, Import 必须放在 import App之前，不然不会有效
import csshook from "css-modules-require-hook/preset"; // import hook before routes
import assethook from "asset-require-hook";
assethook({
  extensions: ["jpg", "jpeg", "png"],
  limit: 10000
});

// 安装babel后，支持es6 和 jsx
import React from "react";
// 把 react组件 渲染成 => 前端原始组件 <div>
import { renderToString, renderToNodeStream } from "react-dom/server";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../src/reducer";
import thunk from "redux-thunk";

import { Provider } from "react-redux";
// server 端只能使用 staticRouter
import { StaticRouter } from "react-router-dom";
import AppCommon from "../src/appCommon";
// import { configureStore } from '../../src/store';

// 读取build中 asset-manifest.json 的 js 和 css文件
import assetManifest from "../build/asset-manifest.json";

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// 处理路径引入问题
const path = require("path");

const model = require("./model");
const Chat = model.getModel("chat");

const userRouter = require("./user");
// socket.io work with express
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

//监听connection事件
io.on("connection", function(socket) {
  //io全局的请求
  console.log("io connect");
  socket.on("sendMsg", function(data) {
    //socket当前连接的请求
    console.log(data);
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join("_");
    Chat.create({ chatid, from, to, content: msg }, function(err, doc) {
      //数据库存入数据
      io.emit("recMsg", Object.assign({}, doc._doc));
    });
  });
});
//开启中间件
// 解析cookie
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/user", userRouter);

// 中间件过滤
app.use(function(req, res, next) {
  if (req.url.startsWith("/user/") || req.url.startsWith("/static/")) {
    return next();
  }

  console.log("test1");
  // 核心逻辑，因客户端是由typescript写的，所以目前无法直接执行,报错，  此处只是实现大致思路
  // const store = configureStore();
  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  let context = {};
  // 同构应该保证服务器端和浏览器端渲染的结果要一摸一样
  // 每个用户请求都应该生成新的store,使用StaticRouter替换BrowserRouter
  const App = () => (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <AppCommon />
      </StaticRouter>
    </Provider>
  );
  const Pc = () => <p>抱歉，本应用不支持PC端访问，请切换移动端浏览</p>;

  // const RootComponent = [
  //   <MediaQuery key="mb" maxDeviceWidth={750} component={App} />,
  //   <MediaQuery key="pc" minDeviceWidth={751} component={Pc} />
  // ];

  const RootComponent = <App />;

  // 使用ejs模板渲染
  // const rootHtml = ReactDOMServer.renderToString(<RootComponent />);
  // // 注意此处的PUBLIC_URL变量，为前端打包时的publicPath，此处即homepage的值
  // res.render('index', {
  //   title: 'Bosszhipin',
  //   PUBLIC_URL: '/public/',
  //   rootHtml,
  //   assetManifest
  // });

  console.log("test2");
  // 下面使用新的renderToNodeStream替换renderToString
  // const PUBLIC_URL = "../public/";
  const title = "deerdev";

  // <link rel="manifest" href="/manifest.json" />;
  // html 骨架
  res.write(`<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	  <meta name="theme-color" content="#000000">
		
		<link rel="shortcut icon" href="/favicon.ico" />
	  <title>${title}</title>
		<link rel="stylesheet" href="${assetManifest["main.css"]}">
		<link rel="stylesheet" href="${
      assetManifest["static/css/2.a3b9cdac.chunk.css"]
    }">
	</head>
	<body>
	  <noscript>
		  You need to enable JavaScript to run this app.
	  </noscript>
	  <div id="root">
	`);
  const markupStream = renderToNodeStream(<App />);
  markupStream.pipe(
    res,
    { end: false }
  );
  markupStream.on("end", () => {
    // 渲染结束，渲染结尾
    res.write(`
	  </div>
		<script type="text/javascript" src="${assetManifest["main.js"]}"></script>
	  <script type="text/javascript" src="${
      assetManifest["static/js/2.7cb6373a.chunk.js"]
    }"></script> 
		
		</body>
	</html>
	  `);
    res.end();
  });
});

// 处理静态资源: 读取build目录的静态网页, 资源读取指定为 buid目录，上面的html引入中直接加入build根目录资源即可
app.use("/", express.static(path.resolve("build")));

//改app.listen 为server.listen：使socket.io 与express成功绑定
server.listen(9093, function() {
  console.log("Node app start at port 9093");
});
