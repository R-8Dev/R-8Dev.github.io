// firebase-init.js

// Your Firebase config (replace with your actual config)
 const firebaseConfig = {
  apiKey: "AIzaSyC0a5wUtspLGBPpJ6XS6Axg-8XsgiiZbZI",
  authDomain: "r-8-test.firebaseapp.com",
  projectId: "r-8-test",
  storageBucket: "r-8-test.firebasestorage.app",
  messagingSenderId: "289094248821",
  appId: "1:289094248821:web:aabdd412a0e5a6e5730b3c",
  measurementId: "G-62PF9Z5RNY"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Create Firebase Auth and Firestore instances
const auth = firebase.auth();
const db = firebase.firestore();

// Make auth and db available globally so other scripts can use them
window.auth = auth;
window.db = db;
