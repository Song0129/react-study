import React from "react";

// 类式组件
// export default class Demo extends React.Component {
// 	state = { count: 0 };
// 	add = () => {
// 		this.setState((state) => ({ count: state.count + 1 }));
// 	};
// 	render() {
// 		return (
// 			<div>
// 				<h2>当前求和为：{this.state.count}</h2>
// 				<button onClick={this.add}>点我+1</button>
// 			</div>
// 		);
// 	}
// }

function Demo() {
	const [count, setCount] = React.useState(0);
	function add() {
		console.log("加了");
		// setCount(count + 1);//第一种写法
		setCount((count) => count + 1);
	}
	return (
		<div>
			<h2>当前求和为：{count}</h2>
			<button onClick={add}>点我+1</button>
		</div>
	);
}

export default Demo;
