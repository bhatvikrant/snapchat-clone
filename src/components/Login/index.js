import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import "./Login.css";
import { auth, provider } from "../../firebase";
import { login } from "../../features/appSlice";
import { useHistory } from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then(result => {
				dispatch(
					login({
						username: result.user.displayName,
						profilePic: result.user.photoURL,
						id: result.user.uid,
					}),
				);

				history.replace("/chats");
			})
			.catch(err => alert(err.message));
	};
	return (
		<div className="login">
			<div className="login__container">
				<img
					src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
					// src="/snapchat-logo.png"
					alt="snapchat logo"
				/>
				<Button variant="outlined" onClick={signIn}>
					Sign in
				</Button>
			</div>
		</div>
	);
};

export default Login;
