// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAVdjPeaj4c9aw7UEQ4hd8KLtxDJroUrTc",
    authDomain: "gabby-54793.firebaseapp.com",
    databaseURL: "https://gabby-54793-default-rtdb.firebaseio.com",
    projectId: "gabby-54793",
    storageBucket: "gabby-54793.appspot.com",
    messagingSenderId: "135500094061",
    appId: "1:135500094061:web:e2000689178c09f18afd64"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

export function login(email, password){
    return signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
         return userCredential.user
     }).catch(err => {
         return {error: err.code}
     });
}

export function logout(){
    signOut(auth)
}


