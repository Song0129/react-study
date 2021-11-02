import React, { Component } from "react";

import { Button, DatePicker, Space } from "antd";
import { WechatOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
export default class App extends Component {
	onChange = (date, dateString) => {
		console.log(date, dateString);
	};
	render() {
		return (
			<div style={{ width: "1000px", margin: "30px auto" }}>
				<div>App...</div>
				<button>按钮</button>
				<Button type="primary">Primary Button</Button>
				<Space direction="vertical">
					<DatePicker onChange={this.onChange} />
					<DatePicker onChange={this.onChange} picker="week" />
					<DatePicker onChange={this.onChange} picker="month" />
					<DatePicker onChange={this.onChange} picker="quarter" />
					<DatePicker onChange={this.onChange} picker="year" />
				</Space>
				<RangePicker />
				<WechatOutlined />
			</div>
		);
	}
}
