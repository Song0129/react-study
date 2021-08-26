import React, { Component } from "react";
import { Input, Button } from "antd";
import { nanoid } from "nanoid";

import { connect } from "react-redux";
import { createAddPersonAction, createDelPersonAction } from "../../redux/actions/person";

class Person extends Component {
	state = {
		name: "",
		age: "",
	};

	handleChange = (e, type) => {
		console.log(e.target.value, type);
		this.setState({ [type]: e.target.value });
	};

	addPerson = () => {
		const { name, age } = this.state;
		const personObj = { id: nanoid(), name, age: age * 1 };
		this.props.jiayiren(personObj);
		this.setState({ name: "", age: "" });
	};

	delPerson = () => {
		const { name, age } = this.state;
		const personObj = { id: nanoid(), name, age: age * 1 };
		this.props.shanyiren(personObj);
		this.setState({ name: "", age: "" });
	};
	render() {
		return (
			<div>
				<h2>我是Person组件，上面组件的和为{this.props.he}</h2>
				<Input
					onChange={(e) => {
						this.handleChange(e, "name");
					}}
					style={{ width: "200px" }}
					value={this.state.name}
					type="text"
					placeholder="输入姓名"
				/>
				<Input
					onChange={(e) => {
						this.handleChange(e, "age");
					}}
					style={{ width: "200px" }}
					value={this.state.age}
					type="number"
					placeholder="输入年龄"
				/>
				<Button onClick={this.addPerson} type="primary">
					添加
				</Button>
				<Button onClick={this.delPerson} type="primary">
					删除
				</Button>
				<ul>
					{this.props.yiduiren.map((personObj) => {
						return (
							<li key={personObj.id}>
								{personObj.name}---{personObj.age}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		yiduiren: state.rens,
		he: state.he,
	}),
	{
		jiayiren: createAddPersonAction,
		shanyiren: createDelPersonAction,
	}
)(Person);
