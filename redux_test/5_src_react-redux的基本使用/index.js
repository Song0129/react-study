import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import App from "./App";
import "./App.css";

ReactDOM.render(<App />, document.getElementById("root"));

// 订阅redux状态发生变化时，触发render，所有组件触发！亦可在单独组件中单独定义
store.subscribe(() => {
	ReactDOM.render(<App />, document.getElementById("root"));
});
