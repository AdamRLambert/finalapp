import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDieCfAkMMrkCKaHVXNHzyh3QSUZ_ElWAM",
  authDomain: "js411final.firebaseapp.com",
  projectId: "js411final",
  storageBucket: "js411final.appspot.com",
  messagingSenderId: "20494868575",
  appId: "1:20494868575:web:beb08a8acff654ec8efbea",
  measurementId: "G-L36BDQGNNC",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
