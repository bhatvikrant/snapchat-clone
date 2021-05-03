import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { setCameraImage } from "../features/cameraSlice";
import { useHistory } from "react-router-dom";

const videoConstraints = {
	width: 250,
	height: 400,
	facingMode: "user",
};

const WebcamCapture = () => {
	const webcamRef = useRef(null);

	const dispatch = useDispatch();
	const history = useHistory();

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		dispatch(setCameraImage(imageSrc));

		history.push("/preview");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [webcamRef]);

	return (
		<div className="webcamCapture">
			<Webcam
				audio={false}
				height={videoConstraints.height}
				width={videoConstraints.width}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
			/>

			<RadioButtonUncheckedIcon
				className="webcamCapture__button"
				onClick={capture}
				fontSize="large"
			/>
		</div>
	);
};

export default WebcamCapture;
