import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";

export default class App extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<div className="page-header">
							<Header />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">
							{/* 原生html中，靠<a>跳转不同的页面 */}
							{/* 
                                <a className="list-group-item" href="./about.html">
                                    About
                                </a>
                                <a className="list-group-item active" href="./home.html">
                                    Home
                                </a>
                             */}

							<NavLink activeClassName="demo" className="list-group-item" to="/home">
								Home
							</NavLink>
							<NavLink activeClassName="demo" className="list-group-item" to="/about">
								About
							</NavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								{/* 注册路由 */}

								<Route path="/home" component={Home} />
								<Route path="/about" component={About} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
