import { Avatar } from "@material-ui/core";
import { ChatBubble, Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import "./Chats.css";
import { selectUser } from "../features/appSlice";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useHistory } from "react-router-dom";
import { resetCameraImage } from "../features/cameraSlice";

const Chats = () => {
	const [posts, setPosts] = useState([]);
	const [postsList, setPostsList] = useState([]);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		db.collection("posts")
			.orderBy("timestamp", "desc")
			.onSnapshot(snapshot => {
				setPosts(
					snapshot.docs.map(doc => ({
						id: doc.id,
						data: doc.data(),
					})),
				);
				setPostsList(
					snapshot.docs.map(doc => ({
						id: doc.id,
						data: doc.data(),
					})),
				);
			});
	}, []);

	const takeSnap = () => {
		dispatch(resetCameraImage());
		history.push("/");
	};

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		if (searchQuery !== "") {
			setPostsList(
				posts.filter(post =>
					post.data.username.toLowerCase().includes(searchQuery.toLowerCase()),
				),
			);
		} else {
			setPostsList(posts);
		}
	}, [searchQuery, posts]);

	return (
		<div className="chats">
			<div className="chats__header">
				<Avatar
					className="chats__avatar"
					src={user.profilePic}
					onClick={() => auth.signOut()}
				/>
				<div className="chats__search">
					<Search className="chats__searchIcon" />
					<input
						placeholder="Friends"
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
					/>
				</div>
				<ChatBubble className="chats__chatIcon" />
			</div>

			<div className="chat__posts">
				{postsList.map(
					({
						id,
						data: { profilePic, username, timestamp, imageUrl, read },
					}) => (
						<Chat
							key={id}
							id={id}
							profilePic={profilePic}
							username={username}
							timestamp={timestamp}
							imageUrl={imageUrl}
							read={read}
						/>
					),
				)}
			</div>

			<RadioButtonUncheckedIcon
				className="chats__takePicIcon"
				onClick={takeSnap}
				fontSize="large"
			/>
		</div>
	);
};

export default Chats;
