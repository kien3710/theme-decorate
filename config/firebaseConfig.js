import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDq6q4tyR3cGI1qWpqQdfWdxLbnEqixFHE",
  authDomain: "thinktodo-27986.firebaseapp.com",
  projectId: "thinktodo-27986",
  storageBucket: "thinktodo-27986.appspot.com",
  messagingSenderId: "205171788428",
  appId: "1:205171788428:web:96806ae1afd5a04600c9a9",
  measurementId: "G-6SGGYEV1C0",
  // apiKey: "AIzaSyAAmDUD2ziWCN5Q1uIbk7fRKnJQWpRQqeE",
  // authDomain: "taskdinodev.firebaseapp.com",
  // projectId: "taskdinodev",
  // storageBucket: "taskdinodev.appspot.com",
  // messagingSenderId: "1069735472931",
  // appId: "1:1069735472931:web:3ff2dbf55b28b304b16696",
  // measurementId: "G-5L0V7S42E9",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getFirestore(app);
