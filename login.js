document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
      alert("Please fill in all fields.");
      return;
  }

  
  alert("Login Successful!");
  
  window.location.href = "home.html";  
});


const login = document.querySelector(".login")
login.addEventListener("click", function(){
  window.location.href = "login.html"
})
