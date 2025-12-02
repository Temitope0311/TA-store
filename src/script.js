document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".carousel-indicator");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  let currentSlide = 0;
  let slideInterval;

  // Define animations for each slide's elements
  const slideAnimations = [
    // Slide 1 animations
    {
      p: ["animate__animated", "animate__fadeInDown"],
      h2: ["animate__animated", "animate__fadeInUp"],
      button: ["animate__animated", "animate__zoomIn"],
    },
    // Slide 2 animations
    {
      p: ["animate__animated", "animate__rollIn"],
      h2: ["animate__animated", "animate__lightSpeedInRight"],
      button: ["animate__animated", "animate__fadeInUp"],
    },
    // Slide 3 animations
    {
      p: ["animate__animated", "animate__bounceIn"],
      h2: ["animate__animated", "animate__jackInTheBox"],
      button: ["animate__animated", "animate__slideInRight"],
    },
  ];

  // Function to remove animation classes from a slide
  function removeAnimations(slideIndex) {
    const slide = slides[slideIndex];
    const animations = slideAnimations[slideIndex];
    const p = slide.querySelector("p");
    const h2 = slide.querySelector("h2");
    const button = slide.querySelector("button");

    if (p) p.classList.remove(...animations.p);
    if (h2) h2.classList.remove(...animations.h2);
    if (button) button.classList.remove(...animations.button);
  }

  // Function to add animation classes to a slide
  function addAnimations(slideIndex) {
    const slide = slides[slideIndex];
    const animations = slideAnimations[slideIndex];
    const p = slide.querySelector("p");
    const h2 = slide.querySelector("h2");
    const button = slide.querySelector("button");

    // Small delay to ensure animations restart properly
    setTimeout(() => {
      if (p) p.classList.add(...animations.p);
      if (h2) h2.classList.add(...animations.h2);
      if (button) button.classList.add(...animations.button);
    }, 50);
  }

  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class and animations from all slides
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      removeAnimations(i);
    });
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Add active class to current slide and indicator
    slides[index].classList.add("active");
    indicators[index].classList.add("active");

    // Trigger animations for the new active slide
    addAnimations(index);

    currentSlide = index;
  }

  // Function to go to next slide
  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  // Function to go to previous slide
  function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  // Start automatic sliding
  function startSlideShow() {
    slideInterval = setInterval(nextSlide, 3000);
  }

  // Stop automatic sliding
  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  // Event listeners
  nextBtn.addEventListener("click", function () {
    stopSlideShow();
    nextSlide();
    startSlideShow();
  });

  prevBtn.addEventListener("click", function () {
    stopSlideShow();
    prevSlide();
    startSlideShow();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      stopSlideShow();
      showSlide(index);
      startSlideShow();
    });
  });

  const carousel = document.querySelector(".relative.h-screen");

  // Initialize: remove all animations first, then show first slide
  slides.forEach((slide, i) => removeAnimations(i));
  showSlide(0);
  startSlideShow();
});
  
//NavBar colour on scroll
 const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-gray-100", "shadow-md");
    } else {
      navbar.classList.remove("bg-gray-100", "shadow-md");
    }
  });

let products = [];
let currentCategory = "all";

// Function to render products
function renderProducts(category = "all") {
  const productsGrid = document.getElementById("products-grid");
  productsGrid.innerHTML = " ";

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML =
      '<p class="col-span-full text-center text-gray-500 py-8">No products found in this category.</p>';
    return;
  }

  filteredProducts.forEach((product) => {
    const productCard = `
                 <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                        <div class="relative overflow-hidden">
                            <img src="${product.image}" alt="${
      product.name
    }" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300">
                            <button class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                <i class="far fa-heart text-gray-600 hover:text-red-500"></i>
                            </button>
                        </div>
                        <div class="p-4">
                            <h3 class="text-lg font-medium text-gray-900 mb-2">${
                              product.name
                            }</h3>
                            <p class="text-gray-600">${product.price.toFixed(
                              2
                            )}</p>
                        </div>
                    </div>
    `;
    productsGrid.innerHTML += productCard;
  });
}

 //Category tab switching
const categoryTabs = document.querySelectorAll(".category-tab");
categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active state from all tabs
    categoryTabs.forEach((t) => {
      t.classList.remove("border-b-2", "border-black", "font-medium");
      t.classList.add("text-gray-500");
    });

    // Add active state to clicked tab
    tab.classList.add("border-b-2", "border-black", "font-medium");
    tab.classList.remove("text-gray-500");

    // Filter products
    const category = tab.dataset.category;
    currentCategory = category;
    renderProducts(category);
  });
});

// Load products from JSON file
async function loadProducts() {
  try {
    const response = await fetch("products.json");
    const data = await response.json();
    products = data;
    renderProducts(currentCategory);
  } catch (error) {
    console.error("Error loading products:", error);
    document.getElementById("products-grid").innerHTML =
      '<p class="col-span-full text-center text-red-500 py-8">Error loading products. Please check console.</p>';
  }
}

// Initial load
loadProducts();
 
