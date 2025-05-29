// Get current year for the footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Get last modified date for the footer
document.getElementById('last-modified').textContent = document.lastModified;

// DOM Elements
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// Form submission history - will be stored in localStorage
let formSubmissions = [];

// Load previous submissions from localStorage if they exist
document.addEventListener('DOMContentLoaded', () => {
    const savedSubmissions = localStorage.getItem('ecuadorFormSubmissions');
    if (savedSubmissions) {
        formSubmissions = JSON.parse(savedSubmissions);
    }
});

// Handle form submission
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    // For checkbox groups that can have multiple values
    formValues.regions = formData.getAll('regions');
    
    // Validate form
    if (validateForm(formValues)) {
        // Add timestamp to submission
        formValues.timestamp = new Date().toISOString();
        
        // Store submission in array
        formSubmissions.push(formValues);
        
        // Save to localStorage (only keep last 5 submissions to save space)
        if (formSubmissions.length > 5) {
            formSubmissions = formSubmissions.slice(-5);
        }
        localStorage.setItem('ecuadorFormSubmissions', JSON.stringify(formSubmissions));
        
        // Show success message
        showMessage('success', 'Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    }
});

// Form validation
function validateForm(formValues) {
    // Required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    // Check each required field
    for (const field of requiredFields) {
        if (!formValues[field] || formValues[field].trim() === '') {
            showMessage('error', `Please complete the ${field} field.`);
            return false;
        }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
        showMessage('error', 'Please enter a valid email address.');
        return false;
    }
    
    // Validate phone format if provided
    if (formValues.phone && formValues.phone.trim() !== '') {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(formValues.phone)) {
            showMessage('error', 'Please enter phone number in format: 123-456-7890');
            return false;
        }
    }
    
    return true;
}

// Display message to user
function showMessage(type, message) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Add some additional CSS for radio and checkbox groups
document.addEventListener('DOMContentLoaded', () => {
    // Add styles for radio and checkbox groups
    const style = document.createElement('style');
    style.textContent = `
        .radio-group, .checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .radio-label, .checkbox-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
        }
        
        .required {
            color: var(--accent-color);
        }
        
        .contact-info {
            margin-top: 3rem;
            padding: 1.5rem;
            background-color: #f9f9f9;
            border-radius: var(--border-radius);
            border-left: 3px solid var(--primary-color);
        }
        
        .contact-info ul {
            padding-left: 1.5rem;
            margin-top: 0.5rem;
        }
        
        .intro-text {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        @media screen and (min-width: 800px) {
            .radio-group, .checkbox-group {
                flex-direction: row;
                flex-wrap: wrap;
                gap: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
});
