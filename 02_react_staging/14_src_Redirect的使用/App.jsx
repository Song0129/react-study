import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import MyNavLink from "./components/MyNavLink";
import Home from "./pages/Home";
import About from "./pages/About";

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

							<MyNavLink to="/home">Home</MyNavLink>
							<MyNavLink to="/about">About</MyNavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								{/* 注册路由 */}
								<Switch>
									<Route path="/home" component={Home} />
									<Route path="/about" component={About} />
									<Redirect to="/home" />
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
