import React, { Component } from "react";
import qs from "querystring";

const DetailData = [
	{ id: "01", content: "你好，中国" },
	{ id: "02", content: "你好，React" },
	{ id: "03", content: "你好，未来的自己" },
];

export default class Detail extends Component {
	render() {
		// 接收params参数
		// const { id, title } = this.props.match.params;

		// 接收search参数
		const { search } = this.props.location;
		const { id, title } = qs.parse(search.slice(1));

		const findResult =
			DetailData.find((detailObj) => {
				return detailObj.id === id;
			}) || {};
		return (
			<div>
				<ul>
					<li>ID:{id}</li>
					<li>TITLE:{title}</li>
					<li>CONETNT:{findResult.content}</li>
				</ul>
			</div>
		);
	}
}
