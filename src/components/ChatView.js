import "./ChatView.css";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "../features/appSlice";
import { useHistory } from "react-router-dom";
import { useCallback, useEffect } from "react";

const ChatView = () => {
	const selectedImage = useSelector(selectSelectedImage);
	const history = useHistory();

	const exit = useCallback(() => {
		history.replace("/chats");
	}, [history]);

	useEffect(() => {
		if (!selectedImage) {
			exit();
		}
	}, [selectedImage, exit]);

	return (
		<div className="chatView">
			<img src={selectedImage} alt="" onClick={exit} />
		</div>
	);
};

export default ChatView;
