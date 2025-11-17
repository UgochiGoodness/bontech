// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if (!name || !email) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show success message
    alert(`Thank you ${name}! We'll contact you soon.`);
    this.reset();
});

// Newsletter
document.querySelector('.newsletter-form .submit-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = this.previousElementSibling.value;
    if (!email) {
        alert('Please enter your email');
        return;
    }
    
    alert('Thanks for subscribing!');
    this.previousElementSibling.value = '';
});

// Button Navigation
document.querySelector('.btn-brown').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.btn-outline').addEventListener('click', () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.style.background = window.scrollY > 50 ? 
        'rgba(255, 255, 255, 0.98)' : 
        'rgba(255, 255, 255, 0.95)';
});

// Form Submission with Email Notification
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send email notification
    sendEmailNotification(name, email, phone, message, submitBtn, originalText);
});

// Function to send email notification
function sendEmailNotification(name, email, phone, message, submitBtn, originalText) {
    // Using EmailJS (free service) - You need to sign up at https://www.emailjs.com/
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: name,
        from_email: email,
        phone: phone,
        message: message,
        to_email: 'bontechnologie@gmail.com'
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showNotification(`Thank you ${name}! We'll contact you soon.`, 'success');
        document.getElementById('contactForm').reset();
    })
    .catch(function(error) {
        console.log('FAILED...', error);
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    })
    .finally(function() {
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}