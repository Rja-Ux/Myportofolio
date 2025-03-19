// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        }
    });
});

// Typing effect
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = [
            'Saya seorang Web Developer',
            'Saya seorang Mobile App Developer',
            'Saya seorang UI/UX Designer'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isTyping = true;
        let typingSpeed = 100; // ms per character
        let deletingSpeed = 50; // ms per character
        let pauseTime = 1500; // ms pause at end of phrase
        
        function typeText() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isTyping) {
                // Typing
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                
                // Add cursor
                if (charIndex === currentPhrase.length) {
                    isTyping = false;
                    setTimeout(typeText, pauseTime);
                } else {
                    setTimeout(typeText, typingSpeed);
                }
            } else {
                // Deleting
                typingElement.textContent = currentPhrase.substring(0, charIndex);
                charIndex--;
                
                if (charIndex < 0) {
                    isTyping = true;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    charIndex = 0;
                }
                
                setTimeout(typeText, deletingSpeed);
            }
        }
        
        // Start typing
        setTimeout(typeText, 1000);
    }
});

// Initialize AOS animation
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Counter up
jQuery(document).ready(function($) {
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
});

// Portfolio filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Initialize testimonial slider
jQuery(document).ready(function($) {
    $('.testimonial-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 1
                }
            }
        ]
    });
});

// Portfolio modal
document.addEventListener('DOMContentLoaded', function() {
    const portfolioModal = document.getElementById('portfolioModal');
    const portfolioItems = document.querySelectorAll('.portfolio-zoom');
    
    if (portfolioModal) {
        // Sample portfolio data - replace with actual data
        const portfolioData = [
            {
                title: 'E-Commerce Website',
                category: 'Web Development',
                image: 'assets/images/portfolio-1.jpg',
                description: 'Pengembangan website e-commerce lengkap dengan sistem pembayaran, pengelolaan produk, dan analitik pelanggan.',
                client: 'Fashion Store',
                date: 'Januari 2023',
                technology: 'React, Node.js, MongoDB',
                link: '#'
            },
            {
                title: 'Brand Identity Design',
                category: 'UI/UX Design',
                image: 'assets/images/portfolio-2.jpg',
                description: 'Desain identitas merek yang komprehensif termasuk logo, pemilihan warna, tipografi, dan panduan penggunaan merek.',
                client: 'StartUp Tech',
                date: 'Maret 2023',
                technology: 'Adobe XD, Photoshop, Illustrator',
                link: '#'
            },
            // Add more portfolio items as needed
        ];
        
        // Initialize the modal
        const modal = new bootstrap.Modal(portfolioModal);
        
        portfolioItems.forEach((item, index) => {
            item.item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get portfolio data for current item
                const portfolioIndex = Math.min(index, portfolioData.length - 1);
                const data = portfolioData[portfolioIndex];
                
                // Populate modal with data
                portfolioModal.querySelector('.portfolio-modal-img img').src = data.image;
                portfolioModal.querySelector('.portfolio-modal-title').textContent = data.title;
                portfolioModal.querySelector('.portfolio-modal-category').textContent = data.category;
                portfolioModal.querySelector('.portfolio-modal-description').textContent = data.description;
                portfolioModal.querySelector('.portfolio-client').textContent = data.client;
                portfolioModal.querySelector('.portfolio-date').textContent = data.date;
                portfolioModal.querySelector('.portfolio-technology').textContent = data.technology;
                portfolioModal.querySelector('.portfolio-link').href = data.link;
                
                // Show modal
                modal.show();
            });
        });
    }
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form validation and submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Harap isi semua bidang yang diperlukan.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Harap masukkan alamat email yang valid.');
            return;
        }
        
        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Pesan Anda telah berhasil dikirim. Saya akan menghubungi Anda segera!';
            contactForm.appendChild(successMessage);
            
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    });
}

// Mobile menu behavior
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const isNavbarCollapse = e.target.closest('.navbar-collapse');
        const isNavbarToggler = e.target.closest('.navbar-toggler');
        
        if (!isNavbarCollapse && !isNavbarToggler && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// Theme switcher (optional feature)
const addThemeSwitcher = () => {
    // Create theme switcher element
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.innerHTML = `
        <button class="theme-switcher-btn">
            <i class="fas fa-palette"></i>
        </button>
        <div class="theme-colors">
            <span class="theme-color theme-default" data-color="default"></span>
            <span class="theme-color theme-blue" data-color="blue"></span>
            <span class="theme-color theme-green" data-color="green"></span>
            <span class="theme-color theme-purple" data-color="purple"></span>
            <span class="theme-color theme-orange" data-color="orange"></span>
        </div>
    `;
    
    document.body.appendChild(themeSwitcher);
    
    // Theme switcher functionality
    const themeColors = document.querySelectorAll('.theme-color');
    const themeSwitcherBtn = document.querySelector('.theme-switcher-btn');
    
    // Toggle theme colors panel
    themeSwitcherBtn.addEventListener('click', () => {
        themeSwitcher.classList.toggle('active');
    });
    
    // Set theme color
    themeColors.forEach(color => {
        color.addEventListener('click', () => {
            const selectedColor = color.getAttribute('data-color');
            document.documentElement.setAttribute('data-theme', selectedColor);
            localStorage.setItem('portfolio-theme', selectedColor);
            themeSwitcher.classList.remove('active');
        });
    });
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Animasi sederhana untuk elemen testimonial saat scroll
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    function checkVisibility() {
        testimonialItems.forEach(item => {
            const position = item.getBoundingClientRect();
            
            // Jika elemen terlihat di viewport
            if(position.top < window.innerHeight && position.bottom >= 0) {
                item.classList.add('visible');
            }
        });
    }
    
    // Tambahkan class untuk CSS transition
    testimonialItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Check visibility on load
    setTimeout(checkVisibility, 100);
    
    // Helper function untuk animasi
    function animateTestimonials() {
        testimonialItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200); // Menambahkan delay untuk efek cascade
        });
    }
    
    // Jalankan animasi setelah halaman dimuat
    setTimeout(animateTestimonials, 300);
});

document.addEventListener('DOMContentLoaded', function() {
    // Optional: Add additional animations or interactions here
    
    // This will make the icons pulse slightly when the page loads
    setTimeout(function() {
        document.querySelectorAll('.skill-icon').forEach(function(icon, index) {
            setTimeout(function() {
                icon.style.transform = 'scale(1.05)';
                setTimeout(function() {
                    icon.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }, 1000);
});


// Uncomment to enable theme switcher
// document.addEventListener('DOMContentLoaded', addThemeSwitcher);
