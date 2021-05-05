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
						username: authUser.displayName,
						profilePic: authUser.photoURL,
						id: authUser.uid,
					}),
				);
				history.replace("/chats");
			} else {
				dispatch(logout());
			}
		});
	}, [dispatch, history]);

	return (
		<div className="app">
			<Router>
				{!user ? (
					<Login />
				) : (
					<>
						<img
							src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
							className="app__logo"
							alt="snapchat logo"
						/>

						<div className="app__body">
							<div className="app__bodyBackground">
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
						</div>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
