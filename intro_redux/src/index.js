import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { counter } from "./index.redux";
import { Provider } from "react-redux";
import App from "./App";

// compose: 柔和两个函数
// applyMiddleware 添加中间件
const store = createStore(
  counter,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
ReactDOM.render(
  // 使用Provider来加载store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
