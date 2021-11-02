import React, { Component } from "react";

const style = {
	position: "fixed",
	top: "0",
	left: "0",
	width: "100%",
	height: "100%",
	backgroundColor: "rgba(0,0,0,0.5)",
	color: "#fff",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: 9,
};

export default class Loading extends Component {
	render() {
		return (
			<div>
				<h2 style={style}>Loading...</h2>
			</div>
		);
	}
}
