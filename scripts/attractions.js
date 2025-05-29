document.getElementById('current-year').textContent = new Date().getFullYear();

document.getElementById('last-modified').textContent = document.lastModified;
const attractions = [
    {
        id: 1,
        name: "Galápagos Islands",
        description: "A volcanic archipelago famous for its diverse wildlife and Charles Darwin's evolutionary studies.",
        image: "images/attractions/galapagos.webp",
        mobileImage: "images/attractions/galapagos-small.webp",
        region: "galapagos",
        rating: 5
    },
    {
        id: 2,
        name: "Quito Old Town",
        description: "The historic center of Ecuador's capital, a UNESCO World Heritage site with well-preserved colonial architecture.",
        image: "images/attractions/quito.webp",
        mobileImage: "images/attractions/quito-small.webp",
        region: "andes",
        rating: 4.5
    },
    {
        id: 3,
        name: "Cotopaxi National Park",
        description: "Home to one of the world's highest active volcanoes and stunning Andean landscapes.",
        image: "images/attractions/cotopaxi.webp",
        mobileImage: "images/attractions/cotopaxi-small.webp",
        region: "andes",
        rating: 4.8
    },
    {
        id: 4,
        name: "Baños de Agua Santa",
        description: "Adventure capital of Ecuador with hot springs, waterfalls, and outdoor activities.",
        image: "images/attractions/banos.webp",
        mobileImage: "images/attractions/banos-small.webp",
        region: "andes",
        rating: 4.6
    },
    {
        id: 5,
        name: "Montañita",
        description: "A vibrant beach town known for surfing, nightlife, and bohemian atmosphere.",
        image: "images/attractions/montanita.webp",
        mobileImage: "images/attractions/montanita-small.webp",
        region: "coast",
        rating: 4.2
    },
    {
        id: 6,
        name: "Yasuni National Park",
        description: "One of the most biodiverse places on Earth, located in the Amazon rainforest.",
        image: "images/attractions/yasuni.webp",
        mobileImage: "images/attractions/yasuni-small.webp",
        region: "amazon",
        rating: 4.9
    }
];

const attractionsList = document.getElementById('attractions-list');
const attractionFilter = document.getElementById('attraction-filter');
const favoritesList = document.getElementById('favorites-list');
const noFavoritesMessage = document.getElementById('no-favorites');
function loadAttractions(filter = 'all') {
    attractionsList.innerHTML = '';
    
    const filteredAttractions = filter === 'all' 
        ? attractions 
        : attractions.filter(attraction => attraction.region === filter);
    
    const favorites = getFavorites();
    filteredAttractions.forEach(attraction => {
        const isFavorite = favorites.includes(attraction.id);
        
        const attractionCard = document.createElement('div');
        attractionCard.className = 'attraction-card';
        attractionCard.innerHTML = `
            <picture>
                <source srcset="${attraction.image}" media="(min-width: 800px)">
                <source srcset="${attraction.mobileImage}">
                <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
            </picture>
            <div class="attraction-info">
                <h3>${attraction.name}</h3>
                <p>${attraction.description}</p>
                <div class="attraction-meta">
                    <span class="rating">Rating: ${attraction.rating}/5</span>
                    <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" 
                            data-id="${attraction.id}">
                        ${isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
                    </button>
                </div>
            </div>
        `;
        
        attractionsList.appendChild(attractionCard);
    });
    
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', toggleFavorite);
    });
}

function toggleFavorite(event) {
    const attractionId = parseInt(event.target.getAttribute('data-id'));
    let favorites = getFavorites();
    
    if (favorites.includes(attractionId)) {
        favorites = favorites.filter(id => id !== attractionId);
        event.target.textContent = '☆ Add to Favorites';
        event.target.classList.remove('favorited');
    } else {
        favorites.push(attractionId);
        event.target.textContent = '★ Favorited';
        event.target.classList.add('favorited');
    }
    
    localStorage.setItem('ecuadorFavorites', JSON.stringify(favorites));
    
    displayFavorites();
}

function getFavorites() {
    const storedFavorites = localStorage.getItem('ecuadorFavorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
}

function displayFavorites() {
    const favorites = getFavorites();
    
    if (favorites.length === 0) {
        noFavoritesMessage.style.display = 'block';
        favoritesList.innerHTML = '';
        favoritesList.appendChild(noFavoritesMessage);
        return;
    }
    
    noFavoritesMessage.style.display = 'none';
    
    Array.from(favoritesList.children).forEach(child => {
        if (child.id !== 'no-favorites') {
            favoritesList.removeChild(child);
        }
    });
    
    favorites.forEach(id => {
        const attraction = attractions.find(a => a.id === id);
        if (attraction) {
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item';
            favoriteItem.innerHTML = `
                <h4>${attraction.name}</h4>
                <p>Region: ${attraction.region.charAt(0).toUpperCase() + attraction.region.slice(1)}</p>
                <button class="remove-favorite" data-id="${attraction.id}">Remove</button>
            `;
            favoritesList.appendChild(favoriteItem);
        }
    });
    
    document.querySelectorAll('.remove-favorite').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const id = parseInt(event.target.getAttribute('data-id'));
            
            const updatedFavorites = favorites.filter(favoriteId => favoriteId !== id);
            localStorage.setItem('ecuadorFavorites', JSON.stringify(updatedFavorites));
            displayFavorites();
            loadAttractions(attractionFilter.value);
        });
    });
}

attractionFilter.addEventListener('change', (event) => {
    loadAttractions(event.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
    loadAttractions();
    displayFavorites();
});
