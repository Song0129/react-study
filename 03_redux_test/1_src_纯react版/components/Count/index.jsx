import React, { Component } from "react";
import { Button, Select } from "antd";

const { Option } = Select;

export default class Count extends Component {
	state = {
		count: 0,
		value: 1,
	};

	handleChange = (value, Option) => {
		this.setState({ value });
	};

	increment = () => {
		const { count, value } = this.state;
		this.setState({ count: count + value * 1 });
	};

	dencrement = () => {
		const { count, value } = this.state;
		this.setState({ count: count - value * 1 });
	};

	incrementIfOdd = () => {
		const { count, value } = this.state;
		if (count % 2 !== 0) {
			this.setState({ count: count + value * 1 });
		}
	};

	incrementAsync = () => {
		const { count, value } = this.state;
		setTimeout(() => {
			this.setState({ count: count + value * 1 });
		}, 200);
	};

	render() {
		const { count, value } = this.state;
		return (
			<div>
				<h2>当前求和为：{count}</h2>
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
					和为基数+
				</Button>
				&nbsp;
				<Button onClick={this.incrementAsync} type="primary">
					异步+
				</Button>
			</div>
		);
	}
}
