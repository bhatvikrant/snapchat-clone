import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import WebcamCapture from "./components/WebcamCapture";
import Preview from "./components/Preview";

function App() {
	return (
		<div className="app">
			<div className="app__body">
				<Router>
					<Switch>
						<Route path="/preview">
							<Preview />
						</Route>
						<Route exact path="/">
							<WebcamCapture />
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
