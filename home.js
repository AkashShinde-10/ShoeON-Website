document.addEventListener("DOMContentLoaded", function () {
  
  const menuToggle = document.querySelector(".menu-toggle");
  const homeBtns = document.querySelector(".nav_btns");

  menuToggle.addEventListener("click", function () {
    homeBtns.classList.toggle("active"); 
  });

 
  let currentIndex = 0;
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  const carousel = document.querySelector(".carousel");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");

  function ToNext() {
    if (currentIndex < totalItems - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    ChangePosition();
  }

  function ToPrev() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalItems - 1;
    }
    ChangePosition();
  }

  function ChangePosition() {
    const pos = -currentIndex * 100;
    carousel.style.transform = `translateX(${pos}%)`;
  }

  next.addEventListener("click", ToNext);
  prev.addEventListener("click", ToPrev);

  setInterval(ToNext, 5000);

  
  const prodcontent = document.querySelector(".cardContainer");
  const template = document.querySelector(".cardTemplate");
  const filePath = "./api/products.json";

  
  let allProducts = [];

  // Debounce function for search
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  
  function renderProducts(products) {
    prodcontent.innerHTML = ""; 

    if (products.length === 0) {
      const noProductMessage = document.createElement("div");
      noProductMessage.className = "no-product-message";
      noProductMessage.textContent = "No such product found.";
      prodcontent.appendChild(noProductMessage);
    } 
    else {
      products.forEach((currentEle) => {
        const { name, category, id, image, discount, description, brand, rating, price } = currentEle;

        const clone = document.importNode(template.content, true);

        clone.querySelector(".cardimg").src = image;
        clone.querySelector(".details").setAttribute("href", `product.html?id=${id}`);
        clone.querySelector(".productName").textContent = name.length > 30 ? name.slice(0, 30) + "..." : name;
        clone.querySelector(".discount").textContent = discount + "% OFF";
        clone.querySelector(".actualPrice").textContent = "₹  " + price;
        clone.querySelector(".sellingPrice").textContent = "₹  " + Math.floor(price - (price * discount) / 100);
        clone.querySelector(".rating").textContent = rating;
        clone.querySelector(".cartbtn").setAttribute("data-id", `${id}`);

        prodcontent.append(clone);
      });
    }
  }

  
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      allProducts = data; 
      renderProducts(allProducts); 
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });



  // Search functionality
  const searchInput = document.querySelector("#search");

  function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts); 
  }

  // Add debounced search event listener
  searchInput.addEventListener("input", debounce(handleSearch, 400));
});