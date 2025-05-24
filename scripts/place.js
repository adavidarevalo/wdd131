// Get current year for the footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Get last modified date for the footer
document.getElementById('last-modified').textContent = document.lastModified;

// Static values for temperature and wind speed for Ecuador
const temperature = document.getElementById('temperature').textContent;
const windSpeed = document.getElementById('wind-speed').textContent;

// Wind chill calculation function (using metric formula for Ecuador)
function calculateWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

// Display wind chill on page load
document.addEventListener('DOMContentLoaded', () => {
    const tempElement = document.getElementById('temperature');
    const windSpeedElement = document.getElementById('wind-speed');
    const windChillElement = document.getElementById('wind-chill');
    
    const temp = parseFloat(tempElement.textContent);
    const speed = parseFloat(windSpeedElement.textContent);
    
    // Check if conditions are met for wind chill calculation (metric)
    if (temp <= 10 && speed > 4.8) {
        // Calculate and round to one decimal place
        const windChill = calculateWindChill(temp, speed).toFixed(1);
        windChillElement.textContent = `${windChill}°C`;
    } else {
        windChillElement.textContent = "N/A";
    }
});
