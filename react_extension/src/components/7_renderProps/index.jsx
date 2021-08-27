import React, { Component } from "react";
import "./index.css";

export default class Parent extends Component {
	render() {
		return (
			<div className="parent">
				<h2>我是Parent组件</h2>
				<A render={(state) => <B state={state} />} />
			</div>
		);
	}
}

class A extends Component {
	state = {
		name: "tom",
	};
	render() {
		console.log(this.props);
		return (
			<div className="a">
				<h2>我是A组件</h2>
				{this.props.render(this.state)}
			</div>
		);
	}
}

class B extends Component {
	render() {
		console.log("b-----render", this.props);
		return (
			<div className="b">
				<h2>我是B组件</h2>
				<span>这是Parent组件传过来的名字:{this.props.state.name}</span>
			</div>
		);
	}
}
