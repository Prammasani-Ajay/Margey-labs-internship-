// src/firebase.js  
import { initializeApp } from "firebase/app";  
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';   
import { getDatabase, ref, set , get } from "firebase/database";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeAm6fOBB1DeIthqS4rkf2dVh9Mi9DVHg",
  authDomain: "margey-labs.firebaseapp.com",
  databaseURL: "https://margey-labs-default-rtdb.firebaseio.com",
  projectId: "margey-labs",
  storageBucket: "margey-labs.firebasestorage.app",
  messagingSenderId: "212006153192",
  appId: "1:212006153192:web:25fd086fc619b2dc0b525d",
  measurementId: "G-XL5BWFGGLX"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const firebaseConfig = {
//   apiKey: "AIzaSyB8j6kgFV51YCKAl_8Ia8rV01QvJxK0E68",
//   authDomain: "bytesplash-db.firebaseapp.com",
//   databaseURL: "https://bytesplash-db-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "bytesplash-db",
//   storageBucket: "bytesplash-db.firebasestorage.app",
//   messagingSenderId: "759832240114",
//   appId: "1:759832240114:web:cf02b92fd599156f86d56b",
//   measurementId: "G-YW7HG9LWJ1"
// };
// Initialize Firebase  
const app = initializeApp(firebaseConfig);  
const analytics = getAnalytics(app);  
const storage = getStorage(app); 


const database = getDatabase(app);

const db = getFirestore(app);



export { storage ,app , database , ref , set , db};
