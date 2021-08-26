import React, { Component } from "react";
import "./App.css";
import Demo from "./components/2_lazyLoad";

export default class App extends Component {
	render() {
		return (
			<div className="box">
				<Demo />
			</div>
		);
	}
}
