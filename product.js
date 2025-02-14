
const menuToggle = document.querySelector(".menu-toggle");
  const homeBtns = document.querySelector(".nav_btns");

  menuToggle.addEventListener("click", function () {
    homeBtns.classList.toggle("active"); // Toggle home links
  });
  

const filePath = '/api/products.json';  
// Fetch the JSON file
fetch(filePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  // Parse the JSON data
  })
  .then(data => {

function productdetails(){
  let productId = new URLSearchParams(window.location.search).get("id");
  let info = data.filter((value)=> value.id == productId)[0];
  console.log(info)
  if (!info){
    window.location.href = "index.html"
  }
  let details = document.querySelector(".productdetails");
  details.querySelector(".productimg").src = info.image;
  details.querySelector(".productname").innerHTML = info.name;
  details.querySelector(".productdesc").innerHTML = info.description;
  details.querySelector(".rating").textContent = info.rating;
  details.querySelector(".sellingPrice").innerHTML =  "₹  " + Math.floor(info.price - (info.price * info.discount/100) );
  details.querySelector(".actualPrice").innerHTML= "₹  " + info.price;
  details.querySelector(".discount").innerHTML = info.discount + "% OFF"; 
  details.querySelector(".cartbtn").setAttribute("data-id", productId)
  console.log(productId)

}

productdetails();

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


//Add products to Cart and save in local storage


let cartIcon = document.querySelector(".cart-btn");
let closeBtn = document.querySelector(".close");
let body = document.querySelector("body");
let cart = [];

cartIcon.addEventListener("click", () => {
  body.classList.toggle("activeTabCart")
})

closeBtn.addEventListener("click", () => {
  body.classList.toggle("activeTabCart")
})

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
      clone.querySelector(".totalPrice").textContent = "₹  " + Math.floor(info.price - (info.price * info.discount / 100)) * item.quantity;
      clone.querySelector(".quantity-number").textContent = item.quantity;
      clone.querySelector(".minus").setAttribute("data-id", info.id);
      clone.querySelector(".plus").setAttribute("data-id", info.id);
 
      cartItems.append(clone);
    } else {
      console.log('Product not found in data:', item.product_id);
    }
 });
 
  
  totalHTML.innerHTML = totalQuantity

  const totalAmountElement = document.querySelector(".total-amount");
  if (totalAmountElement) {
    totalAmountElement.textContent = "₹ " + totalAmount +".00";
  }
  
}


document.addEventListener("click", (event) => {
  let buttonClick = event.target;
  let idProduct = buttonClick.dataset.id;
  console.log(idProduct)
  let position = cart.findIndex((value) => value.product_id == idProduct);
  console.log(position)
  console.log(data[position])
  let quantity = position < 0 ? 0 : cart[position].quantity;
  console.log(quantity)

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

//        Show Similar products on product page

function showSimilarProducts(){
  let simprodId = new URLSearchParams(window.location.search).get("id");

  const similarProd = data.filter((value) => value.id != simprodId)
  console.log(similarProd)

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}
shuffleArray(similarProd)
  console.log(similarProd)

  const productsToDisplay = similarProd.slice(0,8)
  console.log(productsToDisplay)

  const prodcontent = document.querySelector(".cardContainer");
const template = document.querySelector(".cardTemplate");

  productsToDisplay.forEach((prod) => {
    const clone = document.importNode(template.content, true);
      
     
  clone.querySelector(".cardimg").src = prod.image;
  clone.querySelector(".details").setAttribute("href", `product.html?id=${prod.id}`)
  //clone.querySelector(".cardDescription").textContent = (prod.description.length > 60) ? prod.description.slice(0, 60) + "..." : prod.description;
  clone.querySelector(".productName").textContent = (prod.name.length > 17) ? prod.name.slice(0, 17) + "..." : prod.name;
  clone.querySelector(".discount").textContent = prod.discount + "% OFF"; 
  clone.querySelector(".actualPrice").textContent = "₹  " + prod.price;
  clone.querySelector(".sellingPrice").textContent = "₹  " + Math.floor(prod.price - (prod.price * prod.discount/100) )
  clone.querySelector(".rating").textContent = prod.rating;
  clone.querySelector(".cartbtn").setAttribute("data-id", `${prod.id}`)

  prodcontent.append(clone)

  })

  
}

showSimilarProducts();


})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});




 
