import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCZIfkdhbur7d5HrndrLz43qiymaBsyGnE",
  authDomain: "chat-application-ff3d2.firebaseapp.com",
  projectId: "chat-application-ff3d2",
  storageBucket: "chat-application-ff3d2.appspot.com",
  messagingSenderId: "131549389363",
  appId: "1:131549389363:web:10dd3ed997ee98b54cf946",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage();
export { db, auth, storage };
