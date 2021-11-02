import React, { Component, Fragment } from "react";

export default class Demo extends Component {
	/*
        为避免组件外层dom被真实渲染出来
        可以使用<Fragment></Fragment>或者<></>包裹组件内容
        Fragment可以写key属性，除key不能写其他属性，可在遍历的时候使用
        <></>空标签不能写任何属性
    */
	render() {
		return (
			<Fragment>
				<input type="text" />
				<input type="text" />
			</Fragment>
		);
	}
}
