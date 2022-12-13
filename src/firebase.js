import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "linkedin-clone-d8538.firebaseapp.com",
  projectId: "linkedin-clone-d8538",
  storageBucket: "linkedin-clone-d8538.appspot.com",
  messagingSenderId: "444425821896",
  appId: "1:444425821896:web:b9628c2cf58c1ea61c4ffd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;
