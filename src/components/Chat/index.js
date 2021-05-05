import { Avatar } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import ReactTimeago from "react-timeago";
import { selectImage } from "../../features/appSlice";
import { db } from "../../firebase";
import "./Chat.css";
import { useHistory } from "react-router-dom";

const Chat = ({ id, profilePic, username, timestamp, imageUrl, read }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const open = () => {
		if (!read) {
			dispatch(selectImage(imageUrl));
			db.collection("posts").doc(id).set(
				{
					read: true,
				},
				{ merge: true },
			);

			history.push("/chats/view");
		}
	};
	return (
		<div className="chat" onClick={open}>
			<Avatar src={profilePic} className="chat__avatar" />
			<div className="chat__info">
				<h4>{username}</h4>
				<p>
					{!read && "Tap to view -"}{" "}
					<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
				</p>
			</div>

			{!read && <StopRounded className="chat__readIcon" />}
		</div>
	);
};

export default Chat;
