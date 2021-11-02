import React, { Component } from "react";
import PubSub from "pubsub-js";
import axios from "axios";

export default class Search extends Component {
	search = async () => {
		// 获取用户的输入(连续结构赋值+重命名)
		const {
			keyWordNode: { value: keyWord },
		} = this;
		// 发送请求前通知List更新状态
		PubSub.publish("message", { isFirst: false, isLoading: true });
		// axios.get(`/api1/search/users?q=${keyWord}`).then(
		// 	(response) => {
		// 		// 请求成功后通知List更新状态
		// 		console.log("success", respone.data);
		// 		PubSub.publish("message", { isLoading: false, users: response.data.items });
		// 	},
		// 	(error) => {
		// 		// 请求失败后通知List更新状态
		// 		console.log("error", error);
		// 		PubSub.publish("message", { isLoading: false, err: error.message });
		// 	}
		// );

		// 发送网络请求---使用fetch发送(未优化)
		// fetch(`/api1/search/users2?q=${keyWord}`)
		// 	.then(
		// 		(response) => {
		// 			console.log("联系服务器成功了");
		// 			return response.json();
		// 		},
		// 		(error) => {
		// 			console.log("联系服务器失败了", error);
		// 			return new Promise(() => {});
		// 		}
		// 	)
		// 	.then(
		// 		(response) => {
		// 			console.log("获取到数据", response);
		// 		},
		// 		(error) => {
		// 			console.log("出错了", error);
		// 		}
		// 	);

		// 发送网络请求---使用fetch发送(优化1)
		// fetch(`/api1/search/users21?q=${keyWord}`)
		// 	.then((response) => {
		// 		console.log("联系服务器成功了");
		// 		return response.json();
		// 	})
		// 	.then((response) => {
		// 		console.log("获取到数据", response);
		// 	})
		// 	.catch((error) => {
		// 		console.log("出错", error);
		// 	});

		// 发送网络请求---使用fetch发送(优化2)
		try {
			const response = await fetch(`/api1/search/users2?q=${keyWord}`);
			const data = await response.json();
			console.log(data);
			PubSub.publish("message", { isLoading: false, users: data.items });
		} catch (error) {
			console.log("error", error);
			PubSub.publish("message", { isLoading: false, err: error.message });
		}
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
