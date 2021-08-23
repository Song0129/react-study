import React, { Component } from "react";
import { Button, Select } from "antd";

import store from "../../redux/store";
import { createIncrmentAction, createDecrmentAction } from "../../redux/count_action";

const { Option } = Select;

export default class Count extends Component {
	state = {
		value: 1,
	};

	// componentDidMount() {
	// 	// 检测redux中状态的变化，只要变化，就调用render
	// 	store.subscribe(() => {
	// 		this.setState({});
	// 	});
	// }

	// 下拉框回调
	handleChange = (value, Option) => {
		this.setState({ value });
	};

	// 加法
	increment = () => {
		const { value } = this.state;
		// this.setState({ count: count + value * 1 });
		// store.dispatch({ type: "increment", data: value * 1 });
		store.dispatch(createIncrmentAction(value * 1));
	};

	// 减法
	dencrement = () => {
		const { value } = this.state;
		// this.setState({ count: count - value * 1 });
		// store.dispatch({ type: "decrement", data: value * 1 });
		store.dispatch(createDecrmentAction(value * 1));
	};

	// 奇数再加
	incrementIfOdd = () => {
		const { value } = this.state;
		const count = store.getState();
		if (count % 2 !== 0) {
			// this.setState({ count: count + value * 1 });
			// store.dispatch({ type: "increment", data: value * 1 });
			store.dispatch(createIncrmentAction(value * 1));
		}
	};

	// 异步加
	incrementAsync = () => {
		const { value } = this.state;
		setTimeout(() => {
			// this.setState({ count: count + value * 1 });
			// store.dispatch({ type: "increment", data: value * 1 });
			store.dispatch(createIncrmentAction(value * 1));
		}, 200);
	};

	render() {
		const { value } = this.state;
		return (
			<div>
				<h2>当前求和为：{store.getState()}</h2>
				<Select defaultValue={value} style={{ width: 120 }} onChange={this.handleChange}>
					<Option value="1">1</Option>
					<Option value="2">2</Option>
					<Option value="3">3</Option>
				</Select>
				&nbsp;
				<Button onClick={this.increment} type="primary">
					+
				</Button>
				&nbsp;
				<Button onClick={this.dencrement} type="primary">
					-
				</Button>
				&nbsp;
				<Button onClick={this.incrementIfOdd} type="primary">
					和为奇数+
				</Button>
				&nbsp;
				<Button onClick={this.incrementAsync} type="primary">
					异步+
				</Button>
			</div>
		);
	}
}
