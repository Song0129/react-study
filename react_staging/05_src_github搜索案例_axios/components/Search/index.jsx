import React, { Component } from "react";
import axios from "axios";

export default class Search extends Component {
	search = () => {
		// 获取用户的输入(连续结构赋值+重命名)
		const {
			keyWordNode: { value: keyWord },
		} = this;
		// 发送请求前通知App更新状态
		this.props.updateAppState({ isFirst: false, isLoading: true });
		axios.get(`/api1/search/users?q=${keyWord}`).then(
			(respone) => {
				// 请求成功后通知App更新状态
				console.log("success", respone.data);
				this.props.updateAppState({ isLoading: false, users: respone.data.items });
			},
			(error) => {
				// 请求失败后通知App更新状态
				console.log("error", error);
				this.props.updateAppState({ isLoading: false, err: error.message });
			}
		);
	};

	render() {
		return (
			<section className="jumbotron">
				<h3 className="jumbotron-heading">搜索 Github 用户</h3>
				<div>
					<input ref={(c) => (this.keyWordNode = c)} type="text" placeholder="输入关键字点击搜索" />
					&nbsp;<button onClick={this.search}>搜索</button>
				</div>
			</section>
		);
	}
}
