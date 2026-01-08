// Calculate years in business dynamically
function updateYears() {
    const currentYear = new Date().getFullYear();
    const yearsInBusiness = currentYear - 2007;

    // Update all instances of years in business
    document.getElementById('years-in-business').textContent = yearsInBusiness;
    document.getElementById('years-experience').textContent = yearsInBusiness;
    document.getElementById('current-year').textContent = currentYear;
}

// Run on page load
updateYears();

// Testimonial Carousel
class TestimonialCarousel {
    constructor() {
        this.track = document.getElementById('testimonialTrack');
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorsContainer = document.getElementById('indicators');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        // Create indicators
        this.createIndicators();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.goToPrevious());
        this.nextBtn.addEventListener('click', () => this.goToNext());
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause autoplay on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    createIndicators() {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('indicator-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(dot);
        }
    }

    updateIndicators() {
        const dots = this.indicatorsContainer.querySelectorAll('.indicator-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    goToSlide(index) {
        this.currentIndex = index;
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        this.updateIndicators();
    }

    goToNext() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(this.currentIndex);
    }

    goToPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(this.currentIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.goToNext(), 5000); // Change every 5 seconds
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}


// Service card image hover effect (before/after)
function initServiceImageHover() {
    const serviceImages = document.querySelectorAll('.service-image');

    serviceImages.forEach(img => {
        const afterImage = img.getAttribute('data-after');
        const beforeImage = img.getAttribute('data-before');

        // Only add hover effect if both before and after images exist
        if (afterImage && beforeImage) {
            const card = img.closest('.service-card');

            card.addEventListener('mouseenter', () => {
                img.src = afterImage;
            });

            card.addEventListener('mouseleave', () => {
                img.src = beforeImage;
            });
        }
    });
}

// Media Fallback Handler
function createImageFallback(element, iconType = '🖼️') {
    const container = element.parentElement;
    
    // Create fallback div
    const fallback = document.createElement('div');
    fallback.className = 'media-fallback';
    fallback.innerHTML = `
        <div class="media-fallback-icon">${iconType}</div>
        <div class="media-fallback-text">Image unavailable</div>
    `;
    
    // Hide the broken image and show fallback
    element.classList.add('error');
    element.style.display = 'none';
    container.appendChild(fallback);
}

function createVideoFallback(element) {
    const container = element.parentElement;
    
    // Create fallback div
    const fallback = document.createElement('div');
    fallback.className = 'hero-video-fallback';
    fallback.innerHTML = `
        <div class="fallback-icon">🎬</div>
        <div class="fallback-text">Video content temporarily unavailable</div>
    `;
    
    // Hide the video element and show fallback
    element.style.display = 'none';
    container.appendChild(fallback);
}

// Initialize media error handlers
function initMediaFallbacks() {
    // Handle all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Determine icon based on image class/purpose
            let icon = '🖼️';
            
            if (this.classList.contains('service-image')) {
                icon = '🚗'; // Car icon for service images
            } else if (this.classList.contains('hero-logo')) {
                icon = '🏢'; // Building icon for logo
            } else if (this.alt && this.alt.includes('social')) {
                icon = '🔗'; // Link icon for social
            }
            
            createImageFallback(this, icon);
        });
    });
    
    // Handle videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('error', function() {
            createVideoFallback(this);
        });
        
        // Also handle if video fails to load
        video.addEventListener('stalled', function() {
            console.warn('Video loading stalled');
        });
    });
}

// Simple tap to toggle images on mobile
function initMobileImageToggle() {
    // Only run on mobile devices (width <= 768px)
    if (window.innerWidth > 768) return;

    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const img = card.querySelector('.service-image');
        if (!img) return;

        const afterImage = img.getAttribute('data-after');
        const beforeImage = img.getAttribute('data-before');

        // Only add toggle if both images exist
        if (afterImage && beforeImage) {
            let showingAfter = false;

            card.addEventListener('click', () => {
                showingAfter = !showingAfter;
                img.src = showingAfter ? afterImage : beforeImage;
            });
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialCarousel();
    initServiceImageHover();
    initMediaFallbacks();
    initMobileImageToggle();
});
