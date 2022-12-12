import db, { auth, provider, storage } from "../firebase";
import {
  collection,
  addDoc,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { signInWithPopup } from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch.apply((e) => {
        console.log(e);
      });
  };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image !== "") {
      const storageRef = ref(storage, `images/${payload?.image?.name}`);
      console.log(payload);
      const uploadTask = uploadBytesResumable(storageRef, payload.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress: ${progress}% `);
          if (snapshot.state === "RUNNING") {
            console.log(`progress: ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(db, "articles"), {
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              sharedImg: downloadURL,
              comments: Math.floor(Math.random() * 100) + 1,
              likes: Math.floor(Math.random() * 1000) + 1,
              description: payload.description,
            });
          });
          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        comments: Math.floor(Math.random() * 100) + 1,
        likes: Math.floor(Math.random() * 1000) + 1,
        description: payload.description,
      });
      dispatch(setLoading(false));
    } else if (payload) {
      addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: "",
        sharedImg: "",
        comments: Math.floor(Math.random() * 100) + 1,
        likes: Math.floor(Math.random() * 1000) + 1,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}

export function getArticlesAPI() {
  return (dispatch) => {
    let payload;

    const q = query(collection(db, "articles"), orderBy("actor.date", "desc"));
    onSnapshot(q, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data());
      
      dispatch(getArticles(payload));
    });
  };
}
