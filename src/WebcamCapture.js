import { useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 250,
	height: 400,
	facingMode: "user",
};

const WebcamCapture = () => {
	const videocamRef = useRef(null);

	return (
		<div className="webcamCapture">
			<Webcam
				audio={false}
				height={videoConstraints.height}
				width={videoConstraints.width}
				ref={videocamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
			/>
		</div>
	);
};

export default WebcamCapture;
