// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC0a5wUtspLGBPpJ6XS6Axg-8XsgiiZbZI",
  authDomain: "r-8-test.firebaseapp.com",
  projectId: "r-8-test",
  storageBucket: "r-8-test.appspot.com",
  messagingSenderId: "289094248821",
  appId: "1:289094248821:web:aabdd412a0e5a6e5730b3c",
  measurementId: "G-62PF9Z5RNY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Run when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const errorMessage = document.getElementById("error-message");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = signupForm["email"].value;
      const password = signupForm["password"].value;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          // ✅ Success → Redirect to homepage or login
          window.location.href = "index.html";
        })
        .catch((error) => {
          // ❌ Show error message
          errorMessage.textContent = error.message;
          console.error("Signup failed:", error.message);
        });
    });
  }
});
