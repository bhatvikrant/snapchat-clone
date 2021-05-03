import { Avatar } from "@material-ui/core";
import { ChatBubble, Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Chat from "./Chat";
import "./Chats.css";

const Chats = () => {
	const [posts, setPosts] = useState([]);

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
				<Avatar className="chats__avatar" />
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
						data: { profilepic, username, timestamp, imageUrl, read },
					}) => (
						<Chat
							key={id}
							id={id}
							profilepic={profilepic}
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
