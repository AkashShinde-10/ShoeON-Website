document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();

  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
  }

  if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
  }

  
  alert("Signup Successful!");
  
  window.location.href = "login.html"; 
});


const login = document.querySelector(".login")
login.addEventListener("click", function(){
  window.location.href = "login.html"
})
