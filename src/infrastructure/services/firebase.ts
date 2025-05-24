import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCX-MVfT1EX-I9nT4UiTipNfde0Lbp7i-U",
    authDomain: "mariostore-87335.firebaseapp.com",
    databaseURL: "https://mariostore-87335-default-rtdb.firebaseio.com",
    projectId: "mariostore-87335",
    storageBucket: "mariostore-87335.firebasestorage.app",
    messagingSenderId: "186615003297",
    appId: "1:186615003297:web:87ad45c18a264f80f498e0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };