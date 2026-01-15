// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Stats Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-target]');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Testimonial Slider
let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
}

// Auto-advance testimonials
if (testimonialCards.length > 0) {
    setInterval(nextSlide, 5000);

    // Manual dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing! We'll send monthly updates to ${email}`);
        newsletterForm.reset();
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Case Filter Functionality (for cases.html)
const filterButtons = document.querySelectorAll('.filter-btn');
const caseCards = document.querySelectorAll('.case-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter cases
        caseCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Search Functionality (for cases.html)
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        caseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Copy to Clipboard Functionality (for donate.html)
const copyButtons = document.querySelectorAll('.copy-btn');
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const textToCopy = button.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        });
    });
});

// Zakat Calculator (for donate.html)
const zakatForm = document.querySelector('#zakat-calculator');
if (zakatForm) {
    zakatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const gold = parseFloat(document.getElementById('gold').value) || 0;
        const silver = parseFloat(document.getElementById('silver').value) || 0;
        const cash = parseFloat(document.getElementById('cash').value) || 0;
        const investments = parseFloat(document.getElementById('investments').value) || 0;
        const business = parseFloat(document.getElementById('business').value) || 0;
        const debts = parseFloat(document.getElementById('debts').value) || 0;

        const totalAssets = gold + silver + cash + investments + business;
        const netAssets = totalAssets - debts;

        // Nisab value (approximate - should be updated regularly)
        const nisabValue = 135000; // Rs. 135,000 (example)

        const resultDiv = document.getElementById('zakat-result');

        if (netAssets >= nisabValue) {
            const zakatAmount = netAssets * 0.025; // 2.5%
            resultDiv.innerHTML = `
                <div class="zakat-result-box success">
                    <h3>Zakat is Obligatory</h3>
                    <p>Your total assets: <strong>Rs. ${netAssets.toLocaleString()}</strong></p>
                    <p>Nisab threshold: <strong>Rs. ${nisabValue.toLocaleString()}</strong></p>
                    <p class="zakat-amount">Your Zakat: <strong>Rs. ${zakatAmount.toLocaleString()}</strong></p>
                    <a href="#payment-methods" class="btn btn-primary">Pay Zakat Now</a>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="zakat-result-box info">
                    <h3>Zakat is Not Obligatory</h3>
                    <p>Your total assets: <strong>Rs. ${netAssets.toLocaleString()}</strong></p>
                    <p>Nisab threshold: <strong>Rs. ${nisabValue.toLocaleString()}</strong></p>
                    <p>Your assets are below the Nisab threshold. Zakat is not obligatory, but Sadaqah is always encouraged!</p>
                    <a href="#payment-methods" class="btn btn-secondary">Give Sadaqah</a>
                </div>
            `;
        }
    });
}

// Contact Form (for contact.html)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // In a real implementation, this would send to a server
        alert(`Thank you ${name}! Your message has been received. We'll contact you soon at ${email}.`);
        contactForm.reset();
    });
}

// Donation Amount Selection (for donate.html)
const amountButtons = document.querySelectorAll('.amount-btn');
const customAmountInput = document.querySelector('#custom-amount');

amountButtons.forEach(button => {
    button.addEventListener('click', () => {
        amountButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        if (customAmountInput) {
            customAmountInput.value = '';
        }
    });
});

if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
        amountButtons.forEach(btn => btn.classList.remove('active'));
    });
}

// Share Case Functionality
const shareButtons = document.querySelectorAll('.share-btn');
shareButtons.forEach(button => {
    button.addEventListener('click', () => {
        const caseTitle = button.getAttribute('data-title');
        const caseUrl = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: caseTitle,
                text: `Help support: ${caseTitle}`,
                url: caseUrl
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: copy link
            navigator.clipboard.writeText(caseUrl).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all case cards and other animated elements
document.querySelectorAll('.case-card, .step-card, .promise-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('IWT Website Loaded Successfully');

// Volunteer Form - Open Google Form
// IMPORTANT: Replace 'YOUR_GOOGLE_FORM_URL_HERE' with your actual Google Form URL
const VOLUNTEER_FORM_URL = 'YOUR_GOOGLE_FORM_URL_HERE';

// Handle all volunteer buttons
document.addEventListener('DOMContentLoaded', () => {
    // Get all volunteer buttons (including the one with ID and class-based ones)
    const volunteerButtons = document.querySelectorAll('#volunteerBtn, .volunteer-btn');
    
    volunteerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if the form URL has been set
            if (VOLUNTEER_FORM_URL === 'YOUR_GOOGLE_FORM_URL_HERE') {
                alert('Volunteer form is being set up. Please contact us directly or check back soon!');
                console.warn('Please update VOLUNTEER_FORM_URL in script.js with your actual Google Form URL');
            } else {
                // Open Google Form in a new tab
                window.open(VOLUNTEER_FORM_URL, '_blank');
            }
        });
    });
});
