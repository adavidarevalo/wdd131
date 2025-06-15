// TechVision Academy - Global JavaScript

// Course data
const courses = [
  {
    id: 1,
    title: 'Web Development Basics',
    description: 'Learn HTML, CSS, and JavaScript to build modern, responsive websites.',
    image: 'images/course-webdev.jpg'
  },
  {
    id: 2,
    title: 'JavaScript Algorithms',
    description: 'Master problem-solving skills with hands-on algorithm challenges.',
    image: 'images/course-js.jpg'
  },
  {
    id: 3,
    title: 'Introduction to Cybersecurity',
    description: 'Understand the fundamentals of securing applications and networks.',
    image: 'images/course-security.jpg'
  }
];

// Utility: create element from course object
function buildCourseCard(course) {
  const article = document.createElement('article');
  article.className = 'course-card';
  article.innerHTML = `
      <img src="${course.image}" alt="${course.title}" loading="lazy">
      <h3>${course.title}</h3>
      <p>${course.description}</p>
  `;
  return article;
}

// Populate course lists if container present
function displayCourses(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return; // Exit if page does not contain element
  courses.forEach(course => container.appendChild(buildCourseCard(course)));
}

// Nav hamburger toggle
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}

// Theme toggle using localStorage
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

// Display current year and last modified
function displayFooterInfo() {
  const yearSpan = document.getElementById('year');
  const lastModifiedSpan = document.getElementById('lastModified');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (lastModifiedSpan) lastModifiedSpan.textContent = `Last Updated: ${document.lastModified}`;
}

// Contact form handler with localStorage
function initContactForm() {
  const form = document.getElementById('contactForm');
  const messagePara = document.getElementById('formMessage');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      date: new Date().toISOString()
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      messagePara.textContent = 'Please complete all fields.';
      messagePara.style.color = 'var(--accent-color)';
      return;
    }

    // Store in localStorage (for demonstration purposes)
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push(formData);
    localStorage.setItem('submissions', JSON.stringify(submissions));

    messagePara.textContent = 'Thank you! Your message has been sent.';
    messagePara.style.color = 'green';
    form.reset();
  });
}

// Init everything when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  displayCourses('courses-list');
  displayCourses('all-courses');
  initHamburger();
  initThemeToggle();
  displayFooterInfo();
  initContactForm();
});
