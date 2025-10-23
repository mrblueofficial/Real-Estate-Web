// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll to section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Logo scroll to top
const logo = document.getElementById('logo');
logo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Property Search
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
    const location = document.getElementById('location').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    console.log('Search Parameters:', {
        location,
        bedrooms,
        bathrooms,
        minPrice,
        maxPrice
    });

    showToast('Search functionality will be implemented with backend integration.', 'success');
});

// Gallery Carousel
let currentSlide = 0;
const carouselImages = document.querySelectorAll('.carousel-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

function showSlide(index) {
    // Remove active class from all images and thumbnails
    carouselImages.forEach(img => img.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));

    // Add active class to current image and thumbnail
    carouselImages[index].classList.add('active');
    thumbnails[index].classList.add('active');

    currentSlide = index;
}

carouselPrev.addEventListener('click', () => {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
        newIndex = carouselImages.length - 1;
    }
    showSlide(newIndex);
});

carouselNext.addEventListener('click', () => {
    let newIndex = currentSlide + 1;
    if (newIndex >= carouselImages.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
});

// Thumbnail click
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-advance carousel every 5 seconds
setInterval(() => {
    let newIndex = currentSlide + 1;
    if (newIndex >= carouselImages.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
}, 5000);

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!email) {
        showToast('Email is required!', 'error');
        return;
    }

    // In a real application, this would send the form data to a server
    console.log('Form Submitted:', { name, email, message });

    showToast('Message sent successfully!', 'success');

    // Clear form
    contactForm.reset();
});

// Toast Notification Function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections for animation
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
