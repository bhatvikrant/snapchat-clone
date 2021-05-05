import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../redux/slices/appSlice";
import cameraReducer from "../redux/slices/cameraSlice";

export const store = configureStore({
	reducer: {
		app: appReducer,
		camera: cameraReducer,
	},
});
