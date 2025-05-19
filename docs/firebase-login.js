// firebase-login.js

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  // Signup
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert("Account created!");
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          alert("Logged in!");
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }
});
