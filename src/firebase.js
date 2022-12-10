import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import API_KEY from "./keys.js";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "linkedin-clone-d8538.firebaseapp.com",
  projectId: "linkedin-clone-d8538",
  storageBucket: "linkedin-clone-d8538.appspot.com",
  messagingSenderId: "444425821896",
  appId: "1:444425821896:web:671af084bd9d70f51c4ffd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage();

export { auth, provider, storage };
export default db;
