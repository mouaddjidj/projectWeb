// BMW France Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the hero slider if present
    if (document.querySelector('.hero-slider')) {
        initSlider();
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Add scroll animation to header
    initHeaderScroll();
    
    // Initialize animated elements
    initAnimatedElements();
});

// Hero Slider
function initSlider() {
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDots = document.querySelector('.slider-controls');
    let currentSlide = 0;
    let slideInterval;
    
    // Create slider dots if they don't exist
    if (!sliderDots) {
        createSliderDots(sliderItems.length);
    }
    
    // Set up initial slide
    sliderItems[0].classList.add('active');
    document.querySelectorAll('.slider-dot')[0].classList.add('active');
    
    // Start the slideshow
    startSlideShow();
    
    // Event listeners for slider dots
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            startSlideShow();
        });
    });
    
    // Function to create slider dots
    function createSliderDots(count) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-controls';
        
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dotsContainer.appendChild(dot);
        }
        
        document.querySelector('.hero-section').appendChild(dotsContainer);
    }
    
    // Function to navigate to a specific slide
    function goToSlide(index) {
        // Remove active class from current slide and dot
        sliderItems[currentSlide].classList.remove('active');
        document.querySelectorAll('.slider-dot')[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = index;
        
        // Handle index boundaries
        if (currentSlide >= sliderItems.length) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = sliderItems.length - 1;
        }
        
        // Add active class to new slide and dot
        sliderItems[currentSlide].classList.add('active');
        document.querySelectorAll('.slider-dot')[currentSlide].classList.add('active');
    }
    
    // Function to start the automatic slideshow
    function startSlideShow() {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 3000); // Change slide every 3 seconds
    }
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (mainNav.style.display === 'block') {
                mainNav.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else {
                mainNav.style.display = 'block';
                mainNav.style.position = 'fixed';
                mainNav.style.top = 'var(--header-height)';
                mainNav.style.left = '0';
                mainNav.style.width = '100%';
                mainNav.style.height = 'calc(100vh - var(--header-height))';
                mainNav.style.backgroundColor = 'white';
                mainNav.style.zIndex = '999';
                mainNav.style.padding = '20px';
                mainNav.style.overflow = 'auto';
                
                document.body.style.overflow = 'hidden';
                
                // Modify nav list style for mobile
                const navList = document.querySelector('.nav-list');
                navList.style.flexDirection = 'column';
                navList.style.gap = '20px';
                
                const navItems = document.querySelectorAll('.nav-item');
                navItems.forEach(item => {
                    item.style.fontSize = '20px';
                    item.style.padding = '10px 0';
                    item.style.borderBottom = '1px solid #eee';
                });
            }
        });
    }
}

// Header Scroll Animation
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                header.style.height = '70px';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.height = 'var(--header-height)';
            }
        });
    }
}

// Animated Elements
function initAnimatedElements() {
    // Add smooth scroll to page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling for signup form (if it exists)
if (document.getElementById('signup-form')) {
    const form = document.getElementById('signup-form');
    
    form.addEventListener('submit', function(e) {
        // This is handled directly in the signup.html with inline validation
    });
}