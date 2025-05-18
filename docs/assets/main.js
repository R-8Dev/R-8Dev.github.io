document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      // Redirect to your login page (create login.html or link to a service)
      window.location.href = "login.html";
    });
  }
});
