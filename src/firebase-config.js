import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyB0ZQWqtF_Cm1JDZYAqthC4rgEXhwl3Fho",
    authDomain: "messenger-swiftui-60745.firebaseapp.com",
    databaseURL: "https://messenger-swiftui-60745-default-rtdb.firebaseio.com",
    projectId: "messenger-swiftui-60745",
    storageBucket: "messenger-swiftui-60745.appspot.com",
    messagingSenderId: "758423681770",
    appId: "1:758423681770:web:3a2626fcce66e6916a7593",
    measurementId: "G-NZTDMT61M5"
  };
  const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)