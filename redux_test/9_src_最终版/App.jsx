import React, { Component } from "react";
import Count from "./containers/Count"; //引入conut容器组件
import Person from "./containers/Person"; //引入Person容器组件

export default class App extends Component {
	render() {
		return (
			<div className="box">
				<Count />
				<hr />
				<Person />
			</div>
		);
	}
}
