document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  

 
  const filePath = './api/products.json';
  fetch(filePath)
    .then(response => response.json())
    .then(data => {
      
      const orderItemsContainer = document.querySelector(".order-items");
      const totalAmountElement = document.querySelector(".total-amount");
      let orderItemsHTML = "";
      let totalAmount = 0;

      cart.forEach((cartItem) => {
        const product = data.find((p) => p.id == cartItem.product_id);
        if (product) {
          const discountedPrice = Math.floor(product.price - (product.price * product.discount / 100));
          const itemTotal = discountedPrice * cartItem.quantity;
          totalAmount += itemTotal;

          orderItemsHTML += `
            <div class="order-item">
              <span>${product.name} (x${cartItem.quantity})</span>
              <span>₹ ${itemTotal}</span>
            </div>
          `;
        }
      });

      orderItemsContainer.innerHTML = orderItemsHTML;
      totalAmountElement.textContent = `₹ ${totalAmount}`;

      
      const addressForm = document.querySelector("#addressForm");
      addressForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.querySelector(".name").value.trim();
        const phone = document.querySelector(".phone").value.trim();
        const email = document.querySelector(".email").value.trim();
        const address1 = document.querySelector(".address1").value.trim();
        const address2 = document.querySelector(".address2").value.trim();
        const city = document.querySelector(".city").value.trim();
        const state = document.querySelector(".state").value.trim();
        const pin = document.querySelector(".pin").value.trim();

       
        if (!name || !phone || !email || !address1 || !address2 || !city || !state || !pin) {
          alert("Please fill out all required fields.");
          return;
        }

        // Save address to localStorage
        const addressObj = {
          name,
          phone,
          email,
          address1,
          address2,
          city,
          state,
          pin,
        };
        localStorage.setItem('userAddress', JSON.stringify(addressObj));

        
        addressForm.reset();
        window.location.href = 'payment.html';
      });
    })
    .catch(error => {
      console.error("Error fetching product data:", error);
    });
});