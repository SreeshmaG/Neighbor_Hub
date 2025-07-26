// Sample provider data
const providers = {
    electrician: [
        { id: 1, name: "Mike Electrics", phone: "9823451111", area: "Singanallur", rating: 4.9, reviews: 32, price: "₹500/hr", distance: "1.2 km" },
        { id: 2, name: "Current Masters", phone: "9823452222", area: "Peelamedu", rating: 4.7, reviews: 28, price: "₹450/hr", distance: "2.5 km" }
    ],
    plumber: [
        { id: 1, name: "Pushpa Plumbing", phone: "9812342222", area: "Peelamedu", rating: 4.7, reviews: 19, price: "₹600/hr", distance: "0.8 km" },
        { id: 2, name: "Ravi Plumber", phone: "9812340000", area: "Ganapathy", rating: 4.5, reviews: 27, price: "₹550/hr", distance: "3.1 km" }
    ],
    // Add more providers for other services
};

let selectedService = null;
let selectedArea = null;

// Initialize the dashboard
function initDashboard() {
    // Service category selection
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            document.querySelectorAll('.category-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Add active class to clicked card
            this.classList.add('selected');
            
            selectedService = this.getAttribute('data-service');
            updateResults();
        });
    });
    
    // Location selection
    document.querySelectorAll('.location-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            document.querySelectorAll('.location-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Add active class to clicked card
            this.classList.add('selected');
            
            selectedArea = this.getAttribute('data-area');
            updateResults();
        });
    });
    
    // Sort functionality
    document.getElementById('sortSelect')?.addEventListener('change', updateResults);
}

// Update results based on selections
function updateResults() {
    const resultsSection = document.getElementById('results-section');
    const providerList = document.getElementById('providerList');
    
    if (selectedService && selectedArea) {
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Get providers for selected service (in a real app, this would be an API call)
        const serviceProviders = providers[selectedService] || [];
        
        // Sort providers
        const sortBy = document.getElementById('sortSelect')?.value || 'rating';
        const sortedProviders = [...serviceProviders].sort((a, b) => {
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
            if (sortBy === 'price') return parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, ''));
            return 0;
        });
        
        // Display providers
        providerList.innerHTML = '';
        
        if (sortedProviders.length > 0) {
            sortedProviders.forEach(provider => {
                const card = document.createElement('div');
                card.className = 'provider-card';
                card.innerHTML = `
                    <div class="provider-header">
                        <div class="provider-avatar">${provider.name.split(' ').map(n => n[0]).join('')}</div>
                        <div class="provider-info">
                            <h3>${provider.name}</h3>
                            <div class="provider-rating">
                                ${'★'.repeat(Math.floor(provider.rating))}${'☆'.repeat(5 - Math.floor(provider.rating))}
                                <span>(${provider.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div class="provider-details">
                        <p><i class="fas fa-map-marker-alt"></i> ${provider.area}, ${provider.distance} away</p>
                        <p><i class="fas fa-rupee-sign"></i> ${provider.price}</p>
                        <p><i class="fas fa-phone"></i> ${provider.phone}</p>
                    </div>
                    <div class="provider-actions">
                        <button class="action-btn call-btn" onclick="window.location.href='tel:${provider.phone}'">
                            <i class="fas fa-phone"></i> Call
                        </button>
                        <button class="action-btn whatsapp-btn" onclick="window.open('https://wa.me/${provider.phone}')">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </button>
                    </div>
                `;
                providerList.appendChild(card);
            });
        } else {
            providerList.innerHTML = '<p>No providers found for this service in your area.</p>';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);