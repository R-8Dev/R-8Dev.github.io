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

// Assuming you already have auth and db initialized

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Add user record to Firestore here
      db.collection("users").doc(user.uid).set({
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        // add any other fields you want to store here
      })
      .then(() => {
        alert("Account created successfully!");
        location.replace("https://r-8dev.github.io");
      })
      .catch((error) => {
        alert("Failed to save user data: " + error.message);
      });
    })
    .catch((error) => {
      alert(error.message);
    });
});
