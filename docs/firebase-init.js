// Avoid redefining firebaseConfig
if (typeof firebaseConfig === 'undefined') {
  window.firebaseConfig = {
    apiKey: "AIzaSyC0a5wUtspLGBPpJ6XS6Axg-8XsgiiZbZI",
    authDomain: "r-8-test.firebaseapp.com",
    projectId: "r-8-test",
    storageBucket: "r-8-test.appspot.com",
    messagingSenderId: "289094248821",
    appId: "1:289094248821:web:aabdd412a0e5a6e5730b3c",
    measurementId: "G-62PF9Z5RNY"
  };
}

// Initialize Firebase once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Declare auth/db only once
if (typeof window.auth === 'undefined') {
  window.auth = firebase.auth();
}
if (typeof window.db === 'undefined') {
  window.db = firebase.firestore();
}
