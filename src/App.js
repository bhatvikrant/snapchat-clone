import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import WebcamCapture from "./components/WebcamCapture";
import Preview from "./components/Preview";
import Chats from "./components/Chats";
import ChatView from "./components/ChatView";

function App() {
	return (
		<div className="app">
			<div className="app__body">
				<Router>
					<Switch>
						<Route path="/chats/view">
							<ChatView />
						</Route>
						<Route path="/chats">
							<Chats />
						</Route>
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
