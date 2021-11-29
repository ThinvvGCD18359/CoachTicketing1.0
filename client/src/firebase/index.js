import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBr8G3dDV6PV3Xn9il5vlz3IChMdCfYBH0",
    authDomain: "final-project-321202.firebaseapp.com",
    projectId: "final-project-321202",
    storageBucket: "final-project-321202.appspot.com",
    messagingSenderId: "408947312675",
    appId: "1:408947312675:web:38fe0f18e0b07b8b134996",
    measurementId: "G-XWSKL463F3"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const phoneProvider = new firebase.auth.PhoneAuthProvider();

export { auth, firebase, googleProvider, phoneProvider };