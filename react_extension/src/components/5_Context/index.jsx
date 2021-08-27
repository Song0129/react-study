import React, { Component } from "react";
import "./index.css";

// 创建Context对象
const MyContext = React.createContext();
const { Provider, Consumer } = MyContext;

export default class A extends Component {
	state = { username: "tom", age: 18 };
	render() {
		const { username, age } = this.state;
		return (
			<div className="parent">
				<h2>我是A组件</h2>
				<h4>我的用户名是:{username}</h4>
				<Provider value={{ username, age }}>
					<B />
				</Provider>
			</div>
		);
	}
}

class B extends Component {
	render() {
		return (
			<div className="child">
				<h2>我是B组件</h2>
				{/* <h4>我从A接收到的用户名是:{this.props.username}</h4> */}
				<C />
			</div>
		);
	}
}

// class C extends Component {
// 	static contextType = MyContext;
// 	render() {
// 		console.log(this);
// 		const { username, age } = this.context;
// 		return (
// 			<div className="grand">
// 				<h2>我是B组件</h2>
// 				<h4>
// 					我从A接收到的用户名是:{username},年龄是{age}
// 				</h4>
// 			</div>
// 		);
// 	}
// }

function C() {
	return (
		<div className="grand">
			<h2>我是B组件</h2>
			<h4>
				我从A接收到的用户名是:
				<Consumer>{(value) => `${value.username},年龄是${value.age}`}</Consumer>
			</h4>
		</div>
	);
}
