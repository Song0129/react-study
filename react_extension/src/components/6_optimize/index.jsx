import React, { PureComponent } from "react";
import "./index.css";

export default class Parent extends PureComponent {
	state = { carName: "奔驰", stus: ["a,", "b,", "c,"] };

	changeCar = () => {
		// 使用PureComponent要产生新数据修改state,PureComponent是浅比较
		// this.setState({ carName: "宝马" });

		// 不能直接修改原始数据
		// const obj = this.state;
		const obj = JSON.parse(JSON.stringify(this.state));
		obj.carName = "宝马";
		console.log(obj === this.state);
		this.setState(obj);
	};

	addStu = () => {
		// const { stus } = this.state;
		// stus.unshift("d,");
		// this.setState({ stus });

		const { stus } = this.state;
		this.setState({ stus: ["d,", ...stus] });
	};

	// shouldComponentUpdate(nextProps, nextState) {
	// 	// console.log(this.props, this.state); //目前的props和state
	// 	// console.log(nextProps, nextState); //接下来要变化的目标props，目标state
	// 	return !(this.state.carName === nextState.carName);
	// }

	render() {
		console.log("parent-----render");
		const { carName, stus } = this.state;
		return (
			<div className="parent">
				<h2>我是父组件</h2>
				<div>{stus}</div>
				<span>我的车名字是：{carName}</span>
				<br />
				<button onClick={this.changeCar}>点我换车</button>
				<button onClick={this.addStu}>点我加人</button>
				<Child carName="奥迪" />
			</div>
		);
	}
}

class Child extends PureComponent {
	// shouldComponentUpdate(nextProps, nextState) {
	// 	// console.log(this.props, this.state); //目前的props和state
	// 	// console.log(nextProps, nextState); //接下来要变化的目标props，目标state
	// 	return !(this.props.carName === nextProps.carName);
	// }

	render() {
		console.log("child-----render");
		// const { carName } = this.props;
		return (
			<div className="child">
				<h2>我是子组件</h2>
				{/* <span>我接到的车是：{carName}</span> */}
			</div>
		);
	}
}
