import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    
        apiKey: "AIzaSyCi64PewUyWGkfZMMcBayt4izdZw7U_fkw",
        authDomain: "catchmenu-77c4c.firebaseapp.com",
        projectId: "catchmenu-77c4c",
        
      });
   


const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// Thi is a defualt export
export default base;