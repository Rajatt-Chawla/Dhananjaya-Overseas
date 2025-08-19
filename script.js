// Carousel Functionality
class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startAutoPlay();
        this.updateSlides();
    }
    
    bindEvents() {
        // Previous button
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
        });
        
        // Next button
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Pause autoplay on hover
        const carousel = document.querySelector('.hero-carousel');
        carousel.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        carousel.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }
    
    updateSlides() {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === this.currentSlide) {
                slide.classList.add('active');
            }
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === this.currentSlide) {
                dot.classList.add('active');
            }
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlides();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlides();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Scroll Animation Observer
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.observeElements();
    }
    
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);
        
        // Observe product cards
        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });
        
        // Observe design cards
        document.querySelectorAll('.design-card').forEach(card => {
            observer.observe(card);
        });
        
        // Observe testimonial cards
        document.querySelectorAll('.testimonial-card').forEach(card => {
            observer.observe(card);
        });
        
        // Observe blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScrolling {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Header Scroll Effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollTop = 0;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        this.lastScrollTop = scrollTop;
    }
}

// Search Functionality
class SearchFunctionality {
    constructor() {
        this.searchIcon = document.querySelector('.search-icon');
        this.init();
    }
    
    init() {
        this.searchIcon.addEventListener('click', () => {
            this.showSearchModal();
        });
    }
    
    showSearchModal() {
        // Create search modal
        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-header">
                    <h3>Search Dhananjaya Products</h3>
                    <button class="close-search">&times;</button>
                </div>
                <div class="search-input-container">
                    <input type="text" placeholder="Search for laminates, designs, or products..." class="search-input">
                    <button class="search-btn"><i class="fas fa-search"></i></button>
                </div>
                <div class="search-suggestions">
                    <h4>Popular Searches:</h4>
                    <div class="suggestion-tags">
                        <span class="tag">Kitchen Laminates</span>
                        <span class="tag">Wood Grain</span>
                        <span class="tag">Marble Effect</span>
                        <span class="tag">Glossy Finish</span>
                        <span class="tag">Anti-bacterial</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .search-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            
            .search-modal-content {
                background: white;
                padding: 30px;
                border-radius: 15px;
                width: 90%;
                max-width: 600px;
                animation: slideUp 0.3s ease;
            }
            
            .search-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .search-header h3 {
                color: #333;
                margin: 0;
            }
            
            .close-search {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            }
            
            .search-input-container {
                display: flex;
                margin-bottom: 20px;
            }
            
            .search-input {
                flex: 1;
                padding: 15px;
                border: 2px solid #e9ecef;
                border-radius: 25px 0 0 25px;
                font-size: 16px;
                outline: none;
            }
            
            .search-input:focus {
                border-color: #EF4174;
            }
            
            .search-btn {
                background: #EF4174;
                color: white;
                border: none;
                padding: 15px 20px;
                border-radius: 0 25px 25px 0;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            .search-btn:hover {
                background: #d63384;
            }
            
            .search-suggestions h4 {
                color: #666;
                margin-bottom: 15px;
            }
            
            .suggestion-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .tag {
                background: #f8f9fa;
                color: #333;
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .tag:hover {
                background: #EF4174;
                color: white;
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-search');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Search functionality
        const searchInput = modal.querySelector('.search-input');
        const searchBtn = modal.querySelector('.search-btn');
        const tags = modal.querySelectorAll('.tag');
        
        searchBtn.addEventListener('click', () => {
            this.performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(searchInput.value);
            }
        });
        
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                searchInput.value = tag.textContent;
                this.performSearch(tag.textContent);
            });
        });
    }
    
    performSearch(query) {
        // Simulate search functionality
        console.log('Searching for:', query);
        alert(`Search functionality would search for: "${query}"`);
    }
}

// Clients Slider Animation
class ClientsSlider {
    constructor() {
        this.slider = document.querySelector('.clients-slider');
        this.init();
    }
    
    init() {
        if (this.slider) {
            this.animateSlider();
        }
    }
    
    animateSlider() {
        const logos = this.slider.querySelectorAll('.client-logo');
        let currentIndex = 0;
        
        setInterval(() => {
            logos.forEach((logo, index) => {
                if (index === currentIndex) {
                    logo.style.opacity = '1';
                    logo.style.transform = 'scale(1.1)';
                } else {
                    logo.style.opacity = '0.6';
                    logo.style.transform = 'scale(1)';
                }
            });
            
            currentIndex = (currentIndex + 1) % logos.length;
        }, 2000);
    }
}

// Mobile Menu Toggle (for future implementation)
class MobileMenu {
    constructor() {
        this.init();
    }
    
    init() {
        // Add mobile menu button to navbar
        const navbar = document.querySelector('.navbar .container');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.display = 'none';
        
        navbar.appendChild(mobileMenuBtn);
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-btn {
                display: none;
                background: none;
                border: none;
                font-size: 20px;
                color: #333;
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block;
                }
                
                .nav-center {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Modern Hero Section Animations
class ModernHeroAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.initFloatingElements();
        this.initAnimatedCounters();
        this.initParallaxEffect();
        this.initScrollIndicator();
    }
    
    initFloatingElements() {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        floatingCards.forEach(card => {
            const speed = parseFloat(card.dataset.speed) || 0.5;
            
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * speed;
                card.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    initAnimatedCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.dataset.count);
                    this.animateCounter(target, count);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }
    
    initParallaxEffect() {
        const heroBg = document.querySelector('.hero-bg-image');
        
        if (heroBg) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                heroBg.style.transform = `translateY(${rate}px) scale(1.1)`;
            });
        }
    }
    
    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('.features-section');
                if (nextSection) {
                    nextSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modern hero animations
    new ModernHeroAnimations();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize smooth scrolling
    new SmoothScrolling();
    
    // Initialize header scroll effect
    new HeaderScroll();
    
    // Initialize search functionality
    new SearchFunctionality();
    
    // Initialize clients slider
    new ClientsSlider();
    
    // Initialize mobile menu
    new MobileMenu();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .product-card,
    .design-card,
    .testimonial-card,
    .blog-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .product-card.visible,
    .design-card.visible,
    .testimonial-card.visible,
    .blog-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(loadingStyle);

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.cta-button, .view-all-btn, .discover-btn, .read-more-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.slide-bg');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
});

// Add counter animation for statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Add lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages); 