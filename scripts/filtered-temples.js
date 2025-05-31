// JavaScript for Filtered Temple Album page
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
    
    // Temple data array
    const temples = [
        {
            templeName: "Aba Nigeria",
            location: "Aba, Nigeria",
            dedicated: "2005, August, 7",
            area: 11500,
            imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
        },
        {
            templeName: "Manti Utah",
            location: "Manti, Utah, United States",
            dedicated: "1888, May, 21",
            area: 74792,
            imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
        },
        {
            templeName: "Payson Utah",
            location: "Payson, Utah, United States",
            dedicated: "2015, June, 7",
            area: 96630,
            imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
        },
        {
            templeName: "Yigo Guam",
            location: "Yigo, Guam",
            dedicated: "2020, May, 2",
            area: 6861,
            imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
        },
        {
            templeName: "Washington D.C.",
            location: "Kensington, Maryland, United States",
            dedicated: "1974, November, 19",
            area: 156558,
            imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
        },
        {
            templeName: "Lima Perú",
            location: "Lima, Perú",
            dedicated: "1986, January, 10",
            area: 9600,
            imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
        },
        {
            templeName: "Mexico City Mexico",
            location: "Mexico City, Mexico",
            dedicated: "1983, December, 2",
            area: 116642,
            imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
        },
        // Additional 3 temple objects
        {
            templeName: "Quito Ecuador",
            location: "Quito, Ecuador",
            dedicated: "2019, November, 17",
            area: 50900,
            imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/quito-ecuador-temple/quito-ecuador-temple-31202-main.jpg"
        },
        {
            templeName: "Nauvoo Illinois",
            location: "Nauvoo, Illinois, United States",
            dedicated: "1846, April, 30",
            area: 54000,
            imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/nauvoo-illinois-temple/nauvoo-illinois-temple-50576-main.jpg"
        },
        {
            templeName: "Provo City Center",
            location: "Provo, Utah, United States",
            dedicated: "2016, March, 20",
            area: 85084,
            imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/provo-city-center-temple/provo-city-center-temple-56386-main.jpg"
        }
    ];

    // Get elements for temple display and filtering
    const templeGrid = document.getElementById('temple-grid');
    const homeLink = document.getElementById('home-link');
    const oldLink = document.getElementById('old-link');
    const newLink = document.getElementById('new-link');
    const largeLink = document.getElementById('large-link');
    const smallLink = document.getElementById('small-link');
    const pageTitle = document.querySelector('h1');

    // Function to display temples
    function displayTemples(templesArray) {
        // Clear the current display
        templeGrid.innerHTML = '';
        
        // Create temple cards for each temple
        templesArray.forEach(temple => {
            const templeCard = document.createElement('div');
            templeCard.classList.add('temple-card');
            
            // Extract the date parts
            const dedicatedParts = temple.dedicated.split(', ');
            const year = dedicatedParts[0];
            const month = dedicatedParts[1];
            const day = dedicatedParts[2];
            
            // Create the temple card HTML
            templeCard.innerHTML = `
                <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
                <div class="temple-info">
                    <h2>${temple.templeName} Temple</h2>
                    <p><strong>Location:</strong> ${temple.location}</p>
                    <p><strong>Dedicated:</strong> ${month} ${day}, ${year}</p>
                    <p><strong>Area:</strong> ${temple.area.toLocaleString()} square feet</p>
                </div>
            `;
            
            // Add the card to the grid
            templeGrid.appendChild(templeCard);
        });
    }

    // Function to filter temples by criteria
    function filterTemples(criteria) {
        let filteredTemples;
        
        switch(criteria) {
            case 'old':
                // Temples built before 1900
                filteredTemples = temples.filter(temple => {
                    const year = parseInt(temple.dedicated.split(', ')[0]);
                    return year < 1900;
                });
                pageTitle.textContent = 'Old Temples (Before 1900)';
                break;
                
            case 'new':
                // Temples built after 2000
                filteredTemples = temples.filter(temple => {
                    const year = parseInt(temple.dedicated.split(', ')[0]);
                    return year > 2000;
                });
                pageTitle.textContent = 'New Temples (After 2000)';
                break;
                
            case 'large':
                // Temples larger than 90,000 square feet
                filteredTemples = temples.filter(temple => temple.area > 90000);
                pageTitle.textContent = 'Large Temples (>90,000 sq ft)';
                break;
                
            case 'small':
                // Temples smaller than 10,000 square feet
                filteredTemples = temples.filter(temple => temple.area < 10000);
                pageTitle.textContent = 'Small Temples (<10,000 sq ft)';
                break;
                
            default:
                // All temples (home)
                filteredTemples = temples;
                pageTitle.textContent = 'All Temples';
        }
        
        // Display the filtered temples
        displayTemples(filteredTemples);
        
        // Update active class on navigation
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        if (criteria === 'home') {
            homeLink.classList.add('active');
        } else if (criteria === 'old') {
            oldLink.classList.add('active');
        } else if (criteria === 'new') {
            newLink.classList.add('active');
        } else if (criteria === 'large') {
            largeLink.classList.add('active');
        } else if (criteria === 'small') {
            smallLink.classList.add('active');
        }
    }

    // Add event listeners to the filter links
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        filterTemples('home');
    });
    
    oldLink.addEventListener('click', function(e) {
        e.preventDefault();
        filterTemples('old');
    });
    
    newLink.addEventListener('click', function(e) {
        e.preventDefault();
        filterTemples('new');
    });
    
    largeLink.addEventListener('click', function(e) {
        e.preventDefault();
        filterTemples('large');
    });
    
    smallLink.addEventListener('click', function(e) {
        e.preventDefault();
        filterTemples('small');
    });
    
    // Initialize with all temples (home)
    filterTemples('home');
});
