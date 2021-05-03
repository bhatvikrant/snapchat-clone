import { Avatar } from "@material-ui/core";
import { ChatBubble, Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import "./Chats.css";
import { selectUser } from "../features/appSlice";

const Chats = () => {
	const [posts, setPosts] = useState([]);
	const user = useSelector(selectUser);

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
			});
	}, []);

	return (
		<div className="chats">
			<div className="chats__header">
				<Avatar
					className="chats__avatar"
					src={user.profilePic}
					onClick={() => auth.signOut()}
				/>
				<div className="chats__search">
					<Search />
					<input placeholder="Friends" type="text" />
				</div>
				<ChatBubble className="chats__chatIcon" />
			</div>

			<div className="chat__posts">
				{posts.map(
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
		</div>
	);
};

export default Chats;
