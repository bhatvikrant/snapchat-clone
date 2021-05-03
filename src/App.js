import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from "react-router-dom";
import "./App.css";

import WebcamCapture from "./components/WebcamCapture";
import Preview from "./components/Preview";
import Chats from "./components/Chats";
import ChatView from "./components/ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./components/Login";
import { auth } from "./firebase";

function App() {
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector(selectUser);

	useEffect(() => {
		auth.onAuthStateChanged(authUser => {
			if (authUser) {
				dispatch(
					login({
						username: authUser.user.displayName,
						profilePic: authUser.user.photoURL,
						id: authUser.user.uid,
					}),
				);
				history.replace("/chats");
			} else {
				dispatch(logout());
			}
		});
	}, []);

	return (
		<div className="app">
			<Router>
				{!user ? (
					<Login />
				) : (
					<div className="app__body">
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
					</div>
				)}
			</Router>
		</div>
	);
}

export default App;
