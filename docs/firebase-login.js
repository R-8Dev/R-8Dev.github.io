// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0a5wUtspLGBPpJ6XS6Axg-8XsgiiZbZI",
  authDomain: "r-8-test.firebaseapp.com",
  projectId: "r-8-test",
  storageBucket: "r-8-test.firebasestorage.app",
  messagingSenderId: "289094248821",
  appId: "1:289094248821:web:aabdd412a0e5a6e5730b3c",
  measurementId: "G-62PF9Z5RNY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference the login form
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm["email"].value;
    const password = loginForm["password"].value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // ✅ Login success → redirect to homepage
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Login failed:", error.message);

        // ❌ Redirect back to login with error message
        window.location.href = "login.html?error=1";
      });
  });
}

// Show error message if login failed
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("error") === "1") {
  const errorMsg = document.createElement("p");
  errorMsg.style.color = "red";
  errorMsg.textContent = "Incorrect email or password.";
  document.body.prepend(errorMsg);
}
