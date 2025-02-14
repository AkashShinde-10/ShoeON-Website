document.addEventListener("DOMContentLoaded", () => {
  const addressContainer = document.querySelector("#addressContainer");

  const cart = JSON.parse(localStorage.getItem("cart"))
 
  

  const latestAddress = JSON.parse(localStorage.getItem("userAddress"));
 console.log(latestAddress);

 const filePath = './api/products.json';  

 fetch(filePath)
   .then(response => response.json())
   .then(data=>{
    
    
    const amount = document.querySelector(".amt")
    let deliveryCost = document.querySelector(".delivery")
    const packageCost = document.querySelector(".package")
    const total = document.querySelector(".total-amount")
    
    let totalAmount = 0;
    let packageAmount = 250
   
    cart.forEach((c)=>{
      let product = data.findIndex((p)=> p.id == c.product_id)
      console.log(product);
      
     
        let info = data[product]
        const discountedPrice = Math.floor(info.price - (info.price * info.discount / 100));
        const itemTotal = discountedPrice * c.quantity;
        totalAmount += itemTotal;
       
      
    })
    
    
    amount.innerHTML = `₹ ${totalAmount}.00`
    let deliveryCharge = (totalAmount < 10000)?500:0
    let sum = totalAmount + deliveryCharge + packageAmount
    deliveryCost.innerHTML = `₹ ${deliveryCharge}`
    packageCost.innerHTML = `₹ ${packageAmount}.00`
    total.innerHTML = `₹ ${sum}.00`
   
 

    addressContainer.innerHTML = `
    <h2>Confirm your Address</h2>
   <p> <b>Name: </b>     ${latestAddress.name} </br>
       <b>Phone No.: </b>${latestAddress.phone}</br>
       <b>Email: </b>    ${latestAddress.email}</br>

       <b>Address: </b> ${latestAddress.address1},
                        ${latestAddress.address2}</br>
    
                        ${latestAddress.city}
                        ${latestAddress.state}</br>
       <b>Pin code: </b>${latestAddress.pin}</p>
          
    `;

    const confirm = document.querySelector(".confirm-order-btn")
    const payOptions = document.querySelectorAll('input[name="payment"]')
    const razorpayContainer = document.getElementById("razorpay-container");
   

    payOptions.forEach((option)=>{
      option.addEventListener("change", function(){
        if(this.value === 'cod'){
          confirm.classList.remove("paynow")
          razorpayContainer.style.display = "none"
          confirm.textContent = "Place Order"
          option.style.backgroundColor = "pink"
        }
        else if (this.value === "online") {
          confirm.textContent = 'Pay Now'
          confirm.classList.add("paynow")
          razorpayContainer.style.display = "block"; 
         
      }
      })
    })
    
    
    confirm.addEventListener("click", function(){
      const checked = document.querySelector('input[name="payment"]:checked')

         if (checked){
          if (checked.value === 'cod'){
            localStorage.removeItem("cart")
            window.location.href = "success.html"
           }
           else if(checked.value === 'online'){
            var options = {
              "key": "rzp_test_7x8bVtbA7CEG6I",
              "amount": sum * 100, 
              "currency": "INR",
              "name": "ShoeON",
              "description": "Test Transaction",
              "image": "Images/shoeONLogo.svg",
              "handler": function (response) {
                  //alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                  localStorage.removeItem("cart")
                  window.location.href = "success.html"; 
              },
              "prefill": {
                  "name": "Akash Shinde",
                  "email": "akshinde023@gmail.com",
                  "contact": "7796593068"
              },
              "theme": {
                  "color": "#3399cc"
              }
          };
    
          var rzp1 = new Razorpay(options);
          rzp1.open();
           }
          
         }
         else{
          alert("please select payment method first")
         }
    })

  })
 
});
