import React, { Component } from "react";

export default class Child extends Component {
	state = {
		users: [
			{ id: "001", name: "tom", age: 18 },
			{ id: "002", name: "jerry", age: 19 },
			{ id: "003", name: "jack", age: 20 },
		],
	};

	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({ users: "12" });
		}, 3000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		return (
			<div>
				<h2>我是child组件</h2>
				{this.state.users.map((userObj) => {
					return (
						<h4 key={userObj.id}>
							{userObj.name}------{userObj.age}
						</h4>
					);
				})}
			</div>
		);
	}
}
