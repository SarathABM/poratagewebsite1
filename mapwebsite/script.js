// MAP Website JavaScript

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// Slider Elements
const slides = document.querySelectorAll('.slide');
const sliderDots = document.querySelectorAll('.slider-dot');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');

// Gallery Elements
const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryGrid = document.querySelector('.gallery-grid');

// Current slide index
let currentSlide = 0;
let slideInterval;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeGallery();
    initializeContactForm();
    initializeLazyLoading();
    initializeAnimations();
    console.log('MAP Website initialized successfully!');
});

// Mobile Navigation
function initializeNavigation() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Hero Slider
function initializeSlider() {
    // Start automatic sliding
    startSlideShow();

    // Dot navigation
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });

    // Arrow navigation
    sliderPrev.addEventListener('click', function() {
        currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        goToSlide(currentSlide);
    });

    sliderNext.addEventListener('click', function() {
        currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        goToSlide(currentSlide);
    });

    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', stopSlideShow);
    sliderContainer.addEventListener('mouseleave', startSlideShow);

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    sliderContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        const difference = startX - endX;

        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                // Swipe left - next slide
                currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            } else {
                // Swipe right - previous slide
                currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            }
            goToSlide(currentSlide);
        }
    });
}

function goToSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    sliderDots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[index].classList.add('active');
    sliderDots[index].classList.add('active');

    currentSlide = index;
}

function startSlideShow() {
    slideInterval = setInterval(function() {
        currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        goToSlide(currentSlide);
    }, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Scroll Effects
function initializeScrollEffects() {
    const animatedElements = document.querySelectorAll('.scroll-animate, .fade-in-up');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add scroll animation classes to elements
    const sections = document.querySelectorAll('section > div');
    sections.forEach((section, index) => {
        section.classList.add('scroll-animate');
        section.style.animationDelay = `${index * 0.1}s`;
    });
}

// Gallery
function initializeGallery() {
    generateGalleryItems();

    // Filter functionality
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter
            galleryFilters.forEach(f => {
                f.classList.remove('active', 'bg-kerala-green', 'text-white');
                f.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            this.classList.add('active', 'bg-kerala-green', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');

            // Filter gallery items
            filterGalleryItems(filterValue);
        });
    });
}

function generateGalleryItems() {
    const galleryData = [
        { category: 'onam', icon: 'fas fa-leaf', title: 'Onam Pookalam', description: 'Beautiful flower carpets' },
        { category: 'onam', icon: 'fas fa-utensils', title: 'Onam Sadya', description: 'Traditional feast' },
        { category: 'onam', icon: 'fas fa-drum', title: 'Onam Dance', description: 'Classical performances' },
        { category: 'christmas', icon: 'fas fa-star', title: 'Christmas Carol', description: 'Community singing' },
        { category: 'christmas', icon: 'fas fa-gifts', title: 'Gift Exchange', description: 'Family celebrations' },
        { category: 'christmas', icon: 'fas fa-tree', title: 'Christmas Tree', description: 'Decoration ceremony' },
        { category: 'sports', icon: 'fas fa-running', title: 'Track Events', description: 'Athletic competitions' },
        { category: 'sports', icon: 'fas fa-football-ball', title: 'Football Match', description: 'Community tournament' },
        { category: 'sports', icon: 'fas fa-trophy', title: 'Awards Ceremony', description: 'Winners celebration' },
        { category: 'cultural', icon: 'fas fa-theater-masks', title: 'Kathakali Performance', description: 'Traditional dance' },
        { category: 'cultural', icon: 'fas fa-music', title: 'Classical Music', description: 'Carnatic concert' },
        { category: 'cultural', icon: 'fas fa-palette', title: 'Art Exhibition', description: 'Local artists showcase' }
    ];

    galleryGrid.innerHTML = '';

    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.innerHTML = `
            <i class="${item.icon} gallery-icon"></i>
            <div class="gallery-overlay">
                <h4 class="font-bold text-lg mb-2">${item.title}</h4>
                <p class="text-sm">${item.description}</p>
            </div>
        `;

        // Add click event for modal (placeholder)
        galleryItem.addEventListener('click', function() {
            showGalleryModal(item);
        });

        galleryGrid.appendChild(galleryItem);

        // Add staggered animation
        setTimeout(() => {
            galleryItem.classList.add('animate-fade-in');
        }, index * 100);
    });
}

function filterGalleryItems(filter) {
    const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
            item.classList.add('animate-fade-in');
        } else {
            item.style.display = 'none';
            item.classList.remove('animate-fade-in');
        }
    });
}

function showGalleryModal(item) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-2xl w-full p-8 relative animate-bounce-in">
            <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl" onclick="this.closest('.fixed').remove()">
                <i class="fas fa-times"></i>
            </button>
            <div class="text-center">
                <i class="${item.icon} text-kerala-green text-8xl mb-6"></i>
                <h3 class="text-3xl font-bold text-kerala-green mb-4">${item.title}</h3>
                <p class="text-gray-600 text-lg mb-6">${item.description}</p>
                <p class="text-gray-500">This is a placeholder for the actual gallery image. In a real implementation, you would display the full-size image here.</p>
            </div>
        </div>
    `;

    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
}

// Contact Form
function initializeContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading mr-2"></span>Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    } animate-slide-in-right`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.closest('.fixed').remove()" class="ml-2 hover:opacity-75">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Lazy Loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        imageObserver.observe(img);
    });
}

// Animations
function initializeAnimations() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.bg-white.rounded-xl, .bg-gradient-to-b');
    cards.forEach(card => {
        card.classList.add('card-hover');
    });

    // Staggered animations for grid items
    const gridItems = document.querySelectorAll('.grid > div');
    gridItems.forEach((item, index) => {
        item.classList.add('fade-in-up');
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('#home');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add typing effect to hero text
    const heroTitle = document.querySelector('#home h2');
    if (heroTitle && !heroTitle.dataset.typed) {
        heroTitle.dataset.typed = 'true';
        typeWriter(heroTitle, heroTitle.textContent, 100);
    }
}

function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1000); // Delay before starting
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const debouncedScroll = debounce(function() {
    // Handle scroll events
}, 10);

const throttledResize = throttle(function() {
    // Handle resize events
}, 250);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', throttledResize);

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.fixed.inset-0');
        modals.forEach(modal => modal.remove());
    }
    
    // Enter key activates buttons
    if (e.key === 'Enter' && e.target.classList.contains('gallery-item')) {
        e.target.click();
    }
});

// Focus management for modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    firstElement.focus();
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Service Worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here in a real application
        console.log('Service Worker support detected');
    });
}

console.log('MAP Website initialized successfully!');
