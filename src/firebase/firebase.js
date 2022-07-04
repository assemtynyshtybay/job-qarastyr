import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAkn13xO0ineF9mhiNyIOQTKWf7GnJWKLM",
  authDomain: "diploma-414a7.firebaseapp.com",
  databaseURL: "https://diploma-414a7-default-rtdb.firebaseio.com",
  projectId: "diploma-414a7",
  storageBucket: "diploma-414a7.appspot.com",
  messagingSenderId: "550823563243",
  appId: "1:550823563243:web:d42e131faefeb1d1d4d3ae",
  measurementId: "G-EV4EBYJERD"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage().ref();