
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    let currentIndex = 0;
  
    function moveSlide() {
      currentIndex++;
      if (currentIndex >= slides.length) {
        currentIndex = 0;
      }
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
  
    setInterval(moveSlide, 3000);
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.event-carousel');
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    let currentIndex = 0;
    let autoSlideInterval;
    let isPaused = false;
  
    function updateSlide() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
  
    function moveNext() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    }
  
    function movePrev() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlide();
    }
  
    function startAutoSlide() {
      autoSlideInterval = setInterval(moveNext, 3000);
    }
  
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }
  
    // Start auto sliding initially
    startAutoSlide();
  
    // Detect mouse position on carousel and move slides accordingly
    carousel.addEventListener('mousemove', (e) => {
      if (isPaused) return; // don't move if paused
  
      const rect = carousel.getBoundingClientRect();
      const x = e.clientX - rect.left; // x relative to carousel
      const width = rect.width;
  
      if (x > width * 0.7) {
        // Right 30% of carousel
        moveNext();
        resetAutoSlide();
      } else if (x < width * 0.3) {
        // Left 30% of carousel
        movePrev();
        resetAutoSlide();
      }
    });
  
    // To avoid too frequent slide moves on mousemove, add a debounce:
    let lastMoveTime = 0;
    function resetAutoSlide() {
      const now = Date.now();
      if (now - lastMoveTime > 1000) { // at least 1 second between moves
        stopAutoSlide();
        startAutoSlide();
        lastMoveTime = now;
      }
    }
  
    // On click: toggle pause/play
    carousel.addEventListener('click', () => {
      if (isPaused) {
        startAutoSlide();
        isPaused = false;
      } else {
        stopAutoSlide();
        isPaused = true;
      }
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-menu a");
    const sections = document.querySelectorAll(".content-section");
  
    navLinks.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
  
        // Get the target section ID from href (e.g., #about → about)
        const targetId = link.getAttribute("href").substring(1);
  
        // Hide all sections
        sections.forEach(section => section.classList.remove("active"));
  
        // Show the clicked section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add("active");
          window.scrollTo(0, 0); // Optional: scroll to top
        }
      });
    });
  });
  

  function showSection(sectionId) {
    // Hide all sections first
    const allSections = ['home', 'about', 'projects', 'contact'];
    allSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  
    if (sectionId === 'home') {
      document.querySelector('.hero').style.display = 'block';
    } else if (sectionId === 'contact') {
      document.querySelector('#contact').style.display = 'block';
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.style.display = 'block';
    }
  
    // Smooth scroll into view for the section being shown
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) sectionToShow.scrollIntoView({ behavior: 'smooth' });
  }
  