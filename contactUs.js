const form = document.getElementById("contact-form")

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value
  const response = document.getElementById("response")

  if (name && email && subject && message){
      response.innerHTML = `<p style="color: green;">Thank you, ${name}! Your message has been sent successfully</p>`

      form.reset()
  }

  else{
    response.innerHTML = `<p style="color: red;">Please fill in all required fields</p>`
  }

})