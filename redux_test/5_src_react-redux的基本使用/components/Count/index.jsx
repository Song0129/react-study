import React, { Component } from "react";
import { Button, Select } from "antd";

const { Option } = Select;

export default class Count extends Component {
	state = {
		value: 1,
	};

	// 下拉框回调
	handleChange = (value, Option) => {
		this.setState({ value });
	};

	// 加法
	increment = () => {
		const { value } = this.state;
		this.props.jia(value * 1);
	};

	// 减法
	dencrement = () => {
		const { value } = this.state;
		this.props.jian(value * 1);
	};

	// 奇数再加
	incrementIfOdd = () => {
		const { value } = this.state;
		if (this.props.count % 2 !== 0) {
			this.props.jia(value);
		}
	};

	// 异步加
	incrementAsync = () => {
		const { value } = this.state;
		this.props.jiaAsync(value, 500);
	};

	render() {
		console.log(this.props);
		const { value } = this.state;
		return (
			<div>
				<h2>当前求和为：{this.props.count}</h2>
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
