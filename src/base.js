import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCi64PewUyWGkfZMMcBayt4izdZw7U_fkw",
  authDomain: "catchmenu-77c4c.firebaseapp.com",
  projectId: "catchmenu-77c4c",
  // Enable Realtime Database in Firebase Console and paste your URL here for non-demo stores.
  databaseURL: "https://catchmenu-77c4c-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
