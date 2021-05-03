import { useEffect } from "react";
import "./Preview.css";
import { resetCameraImage, selectCameraImage } from "../features/cameraSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
	AttachFile,
	Create,
	Crop,
	MusicNote,
	Note,
	TextFields,
	Timer,
	Close,
	Send,
} from "@material-ui/icons";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase";
import firebase from "firebase";

const Preview = () => {
	const cameraImage = useSelector(selectCameraImage);

	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!cameraImage) {
			history.replace("/");
		}
	}, [cameraImage, history]);

	const closePreview = () => {
		dispatch(resetCameraImage());
	};

	const sendPost = () => {
		const id = uuid();
		const uploadTask = storage
			.ref(`posts/${id}`)
			.putString(cameraImage, "data_url");

		uploadTask.on(
			"state_changed",
			null,
			err => {
				// Error function
				console.log("err:", err);
			},
			() => {
				// Complete function
				storage
					.ref("posts")
					.child(id)
					.getDownloadURL()
					.then(url => {
						db.collection("posts").add({
							imageUrl: url,
							username: "viki",
							read: false,
							// profilePic
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
						});

						history.replace("/chats");
					});
			},
		);
	};
	return (
		<div className="preview">
			<Close className="preview__close" onClick={closePreview} />
			<div className="preview__toolbarRight">
				<TextFields />
				<Create />
				<Note />
				<MusicNote />
				<AttachFile />
				<Crop />
				<Timer />
			</div>
			<img src={cameraImage} alt="" />

			<div className="preview__footer" onClick={sendPost}>
				<h2>Send Now</h2>
				<Send fontSize="small" className="preview__sendIcon" />
			</div>
		</div>
	);
};

export default Preview;
