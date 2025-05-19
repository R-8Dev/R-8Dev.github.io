// Only define config if not already defined globally
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

// Only initialize Firebase once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Only define auth and db if not already defined
if (typeof window.auth === 'undefined') {
  window.auth = firebase.auth();
}
if (typeof window.db === 'undefined') {
  window.db = firebase.firestore();
}
