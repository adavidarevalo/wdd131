// JavaScript for Temple Album page

// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set the current year for the copyright in the footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Set the last modified date in the footer
    document.getElementById('lastModified').textContent = document.lastModified;

    // Add hamburger menu functionality
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');
    const nav = document.querySelector('nav');
    
    // Function to toggle the menu (only if the elements exist)
    if (hamburgerIcon && closeIcon) {
        function toggleMenu() {
            nav.classList.toggle('open');
            
            // Toggle visibility of icons
            if (nav.classList.contains('open')) {
                hamburgerIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            } else {
                hamburgerIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        }
        
        // Event listeners for hamburger and close icons
        hamburgerIcon.addEventListener('click', toggleMenu);
        closeIcon.addEventListener('click', toggleMenu);
    }
    
    // Add functionality to the menu items
    const oldLink = document.querySelector('.old');
    const newLink = document.querySelector('.new');
    const largeLink = document.querySelector('.large');
    const smallLink = document.querySelector('.small');
    
    // Filter functionality (placeholder for now)
    if (oldLink) {
        oldLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Showing old temples');
        });
    }
    
    if (newLink) {
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Showing new temples');
        });
    }
    
    if (largeLink) {
        largeLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Showing large temples');
        });
    }
    
    if (smallLink) {
        smallLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Showing small temples');
        });
    }
});
