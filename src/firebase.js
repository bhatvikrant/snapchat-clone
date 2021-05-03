import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyDrLn4aVqJQQoX3KDGKrHjESRCkhw7k4oY",
	authDomain: "snapchat-clone-c8f9b.firebaseapp.com",
	projectId: "snapchat-clone-c8f9b",
	storageBucket: "snapchat-clone-c8f9b.appspot.com",
	messagingSenderId: "628526481542",
	appId: "1:628526481542:web:39d1375ce2c860f2c5d107",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
