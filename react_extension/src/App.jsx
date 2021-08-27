import React, { Component } from "react";
import "./App.css";
import Demo from "./components/8_ErrorBoundary/Parent";

export default class App extends Component {
	render() {
		return (
			<div className="box">
				<Demo />
			</div>
		);
	}
}
