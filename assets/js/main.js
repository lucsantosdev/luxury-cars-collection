// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===== LANGUAGE SWITCHER =====
const languageToggle = document.getElementById('languageToggle');
const languageDropdown = document.getElementById('languageDropdown');

languageToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('active');
});

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!languageToggle?.contains(e.target) && !languageDropdown?.contains(e.target)) {
        languageDropdown?.classList.remove('active');
    }
});

// Close language dropdown on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && languageDropdown?.classList.contains('active')) {
        languageDropdown.classList.remove('active');
    }
});

// ===== NAVIGATION FUNCTIONALITY =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const searchToggle = document.getElementById('searchToggle');
const searchContainer = document.getElementById('searchContainer');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle search
searchToggle?.addEventListener('click', () => {
    searchContainer.classList.add('active');
    setTimeout(() => searchInput?.focus(), 300);
});

searchClose?.addEventListener('click', () => {
    searchContainer.classList.remove('active');
    searchInput.value = '';
    filterBrands('all');
});

// Close search on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
        searchContainer.classList.remove('active');
        searchInput.value = '';
        filterBrands('all');
    }
});

// ===== SEARCH FUNCTIONALITY =====
searchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.list__card');
    
    cards.forEach(card => {
        const brandName = card.querySelector('.list__brand h4').textContent.toLowerCase();
        if (brandName.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
});

// ===== FILTER FUNCTIONALITY =====
const filterBtns = document.querySelectorAll('.filter__btn');
const brandCards = document.querySelectorAll('.list__card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        filterBrands(filter);
    });
});

function filterBrands(filter) {
    brandCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-brand') === filter) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== FAVORITES FUNCTIONALITY =====
const favoritesBtn = document.getElementById('favoritesBtn');
const favoritesCount = document.getElementById('favoritesCount');
const favoritesModal = document.getElementById('favoritesModal');
const modalClose = document.getElementById('modalClose');
const favoritesList = document.getElementById('favoritesList');
const favoriteButtons = document.querySelectorAll('.favorite__btn');

// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('luxuryCarFavorites')) || [];

// Update favorites count
function updateFavoritesCount() {
    const count = favorites.length;
    favoritesCount.textContent = count;
    if (count > 0) {
        favoritesCount.classList.remove('hidden');
    } else {
        favoritesCount.classList.add('hidden');
    }
}

// Update favorite buttons state
function updateFavoriteButtons() {
    favoriteButtons.forEach(btn => {
        const brand = btn.getAttribute('data-brand');
        if (favorites.includes(brand)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Add/Remove favorite
favoriteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const brand = btn.getAttribute('data-brand');
        const index = favorites.indexOf(brand);
        
        if (index > -1) {
            // Remove from favorites
            favorites.splice(index, 1);
            btn.classList.remove('active');
        } else {
            // Add to favorites
            favorites.push(brand);
            btn.classList.add('active');
        }
        
        // Save to localStorage
        localStorage.setItem('luxuryCarFavorites', JSON.stringify(favorites));
        updateFavoritesCount();
    });
});

// Show favorites modal
favoritesBtn?.addEventListener('click', () => {
    favoritesModal.classList.add('active');
    renderFavorites();
});

// Close favorites modal
modalClose?.addEventListener('click', () => {
    favoritesModal.classList.remove('active');
});

favoritesModal?.addEventListener('click', (e) => {
    if (e.target === favoritesModal) {
        favoritesModal.classList.remove('active');
    }
});

// Render favorites list
function renderFavorites() {
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="favorites__empty">No favorites yet. Start exploring!</p>';
        return;
    }
    
    favoritesList.innerHTML = favorites.map(brand => `
        <div class="favorite__item">
            <span class="favorite__item-name">${brand}</span>
            <button class="favorite__item-remove" data-brand="${brand}" aria-label="Remove ${brand} from favorites">
                <i class="ri-close-circle-line"></i>
            </button>
        </div>
    `).join('');
    
    // Add event listeners to remove buttons
    const removeButtons = favoritesList.querySelectorAll('.favorite__item-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const brand = btn.getAttribute('data-brand');
            const index = favorites.indexOf(brand);
            if (index > -1) {
                favorites.splice(index, 1);
                localStorage.setItem('luxuryCarFavorites', JSON.stringify(favorites));
                updateFavoritesCount();
                updateFavoriteButtons();
                renderFavorites();
            }
        });
    });
}

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop?.classList.add('show');
    } else {
        backToTop?.classList.remove('show');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== STATS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat__number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
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

// ===== BRAND SEPARATOR LINE ANIMATION =====
const separatorLine = document.querySelector(".line__wrapper");
const separatorLineBrand = Array.from(separatorLine.children);

separatorLineBrand.forEach((item) => {
    const duplicateNode = item.cloneNode(true);
    duplicateNode.setAttribute("aria-hidden", true);
    separatorLine.appendChild(duplicateNode);
});

// Initialize on page load
updateFavoritesCount();
updateFavoriteButtons();