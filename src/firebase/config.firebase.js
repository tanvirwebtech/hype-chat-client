import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCr0A0dfdbyhCvs8aCOLF13Yo8DvJUjoD4",
    authDomain: "hype-chat1.firebaseapp.com",
    projectId: "hype-chat1",
    storageBucket: "hype-chat1.appspot.com",
    messagingSenderId: "676646077194",
    appId: "1:676646077194:web:9d272236729d63893070f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
