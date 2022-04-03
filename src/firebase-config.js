
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "hack-manas-22.firebaseapp.com",
    projectId: "hack-manas-22",
    storageBucket: "hack-manas-22.appspot.com",
    messagingSenderId: "16430521504",
    appId: process.env.REACT_APP_APP_ID,
    measurementId: "G-N90YDE10PN"
  };

  //inicia a conexão
  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);