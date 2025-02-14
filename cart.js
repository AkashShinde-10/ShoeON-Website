
const filePath = './api/products.json';  

// Fetch the JSON file
fetch(filePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  
  })
  .then(data => {
    console.log(data)
    let cartIcon = document.querySelector(".cart-btn");
    let closeBtn = document.querySelector(".close");
    let body = document.querySelector("body");
    const homeBtns = document.querySelector(".nav_btns");
    let cart = [];
    
    cartIcon.addEventListener("click", () => {
      body.classList.toggle("activeTabCart")
      homeBtns.classList.remove("active");
    })
    
    closeBtn.addEventListener("click", () => {
      body.classList.toggle("activeTabCart")
    })

    const checkoutButton = document.querySelector(".checkout");

    checkoutButton.addEventListener("click", (e) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      if (cart.length === 0) {
          alert("Your cart is empty! Please add items before checking out.");
      } else {
          window.location.href = "checkout.html"; 
      }
  });
    
    // checkoutButton.addEventListener("click", () => {
    //   window.location.href = "checkout.html";
    // });
   
   
    
    const setProductInCart = (idProduct,quantity,position) => {
      if (quantity > 0){
        if(position < 0){
          cart.push({
            product_id: idProduct,
            quantity: quantity || 1
          });
        }else{
          cart[position].quantity = quantity;
        }
      }else{
        cart.splice(position, 1)
      }
      localStorage.setItem("cart", JSON.stringify(cart))
      refreshCartContent();
    }
    
    const refreshCartContent = () => {
      let cartItems = document.querySelector(".cart-items")
      let template = document.querySelector(".cartTemplate")
      let listHTML = document.querySelector(".cart-items");
      let totalHTML = document.querySelector(".cart-span");
      let totalQuantity = 0;
      let totalAmount = 0;
      listHTML.innerHTML = null;
      console.log(cart);
      
      
      cart.forEach(item => {
        totalQuantity += item.quantity;
        let position = data.findIndex((value) => value.id == item.product_id);
        
        if (position >= 0) {
          let info = data[position];

          const discountPrice = Math.floor(info.price - (info.price * info.discount / 100))
          const totalItemPrice = discountPrice * item.quantity;
          totalAmount += totalItemPrice
     
          let clone = document.importNode(template.content, true);
     
          clone.querySelector(".cartimg").src = info.image;
          clone.querySelector(".cart-item-name").textContent = info.name;
          clone.querySelector(".totalPrice").textContent = "₹  " + totalItemPrice;
          clone.querySelector(".quantity-number").textContent = item.quantity;
          clone.querySelector(".minus").setAttribute("data-id", info.id);
          clone.querySelector(".plus").setAttribute("data-id", info.id);
     
          cartItems.append(clone);
        } else {
          console.log('Product not found in data:', item.product_id);
        }
     });
     
      
      totalHTML.innerHTML = totalQuantity;

      const totalAmountElement = document.querySelector(".total-amount");
  if (totalAmountElement) {
    totalAmountElement.textContent = "₹ " + totalAmount + ".00";
  }
      
    }
    
    
    document.addEventListener("click", (event) => {
      let buttonClick = event.target;
      let idProduct = buttonClick.dataset.id;
      //console.log(idProduct)
      let position = cart.findIndex((value) => value.product_id == idProduct);
      //console.log(position)
      //console.log(data[position])
      let quantity = position < 0 ? 0 : cart[position].quantity;
      //console.log(quantity)
    
      if (buttonClick.classList.contains('cartbtn')|| buttonClick.classList.contains("plus")){
        quantity++;
        setProductInCart(idProduct, quantity, position);
      }
      else if (buttonClick.classList.contains("minus")){
        quantity--;
        setProductInCart(idProduct, quantity, position)
      }
    })


    const loadCartData = () => {
      if (localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"))
      }
      else{
        cart = [];
      }
      cart = cart.filter(item => item.product_id);
      refreshCartContent()

    }

  loadCartData();
console.log(cart)
    
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});