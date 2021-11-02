import React, { Component } from "react";
import { Button, Select } from "antd";

// 引入action
import { increment, decrement, incrementAsync } from "../../redux/actions/count";
// 引入connect用于连接UI组件和redux
import { connect } from "react-redux";

const { Option } = Select;

class Count extends Component {
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
		this.props.increment(value * 1);
	};

	// 减法
	dencrement = () => {
		const { value } = this.state;
		this.props.decrement(value * 1);
	};

	// 奇数再加
	incrementIfOdd = () => {
		const { value } = this.state;
		if (this.props.count % 2 !== 0) {
			this.props.increment(value);
		}
	};

	// 异步加
	incrementAsync = () => {
		const { value } = this.state;
		this.props.incrementAsync(value, 500);
	};

	render() {
		const { value } = this.state;
		return (
			<div>
				<h2>我是Count组件，下面组件的人数为{this.props.renshu}</h2>
				<h4>当前求和为：{this.props.count}</h4>
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

// 使用connect()()创建并暴露一个Count的容器组件
export default connect(
	(state) => ({
		count: state.count,
		personCount: state.persons.length,
	}),
	{
		increment,
		decrement,
		incrementAsync,
	}
)(Count);
