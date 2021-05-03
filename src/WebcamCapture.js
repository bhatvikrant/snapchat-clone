import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const videoConstraints = {
	width: 250,
	height: 400,
	facingMode: "user",
};

const WebcamCapture = () => {
	const webcamRef = useRef(null);

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		console.log("imageSrc:", imageSrc);
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
