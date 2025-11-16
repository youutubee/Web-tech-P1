// ============================================
// Calculator Page Logic
// ============================================

let selectedItems = {
    accommodation: [],
    travel: [],
    food: [],
    activity: []
};

function initCalculatorPage() {
    // Load destination data
    const selectedDestination = getData('selectedDestination');
    if (!selectedDestination) {
        console.error('No destination selected');
        return;
    }

    // Check if destinationsData is available (from global scope)
    const destData = window.destinationsData || (typeof destinationsData !== 'undefined' ? destinationsData : null);
    if (!destData || !destData[selectedDestination]) {
        console.error('Destination data not found for:', selectedDestination);
        console.log('Available destinations:', Object.keys(destData || {}));
        return;
    }

    const destination = destData[selectedDestination];
    
    // Update page title with destination
    const pageTitle = document.querySelector('#page3 .page-title');
    if (pageTitle) {
        pageTitle.textContent = `Plan Your Trip to ${destination.name}`;
    }
    
    // Also update the subtitle
    const pageSubtitle = document.querySelector('#page3 .section-title p');
    if (pageSubtitle) {
        pageSubtitle.textContent = `Customize your ${destination.name} experience`;
    }
    
    // Show destination info banner
    const destinationBanner = document.querySelector('#page3 .destination-banner');
    if (destinationBanner) {
        destinationBanner.innerHTML = `
            <div class="alert alert-info" style="background: linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(0, 172, 193, 0.1)); border-color: var(--primary-color); color: var(--text-color);">
                <strong><i class="fas fa-map-marker-alt"></i> Selected Destination:</strong> ${destination.name}
                <br><small>${destination.description}</small>
            </div>
        `;
    }

    // Render packages
    renderPackages(destination);

    // Initialize checkboxes
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            calculateTotal();
        });
    });

    // Initial calculation
    calculateTotal();

    // Confirm button
    const confirmBtn = document.getElementById('confirmBooking');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const total = calculateTotal();
            const finalPriceElement = document.getElementById('finalPrice');
            if (finalPriceElement) {
                finalPriceElement.textContent = formatCurrency(total);
            }
            showModal('confirmModal');
        });
    }

    // Modal confirm button
    const modalConfirmBtn = document.getElementById('modalConfirmBtn');
    if (modalConfirmBtn) {
        modalConfirmBtn.addEventListener('click', () => {
            hideModal('confirmModal');
            showPage('page4');
            updateProgressBar(5, 5);
        });
    }

    setupModalClose('confirmModal');
}

function renderPackages(destination) {
    // Render accommodation
    renderPackageSection('accommodation', destination.accommodation, '🏨');
    
    // Render travel
    renderPackageSection('travel', destination.travel, '✈️');
    
    // Render food
    renderPackageSection('food', destination.food, '🍽️');
    
    // Render activities
    renderPackageSection('activity', destination.activities, '🎯');
}

function renderPackageSection(category, items, icon) {
    const container = document.getElementById(`${category}Options`);
    if (!container) return;

    let html = '';
    items.forEach((item, index) => {
        html += `
            <label class="package-option">
                <input type="checkbox" class="custom-checkbox" 
                       data-price="${item.price}" 
                       data-category="${category}" 
                       value="${item.name.toLowerCase().replace(/\s+/g, '-')}"
                       id="${category}-${index}">
                <div class="package-option-info">
                    <div class="package-option-name">${item.name}</div>
                    <div class="package-option-description">${item.description}</div>
                </div>
                <div class="package-option-price">${formatCurrency(item.price)}</div>
            </label>
        `;
    });

    container.innerHTML = html;

    // Re-attach event listeners
    const checkboxes = container.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            calculateTotal();
        });
    });
}

function calculateTotal() {
    let total = 0;
    selectedItems = {
        accommodation: [],
        travel: [],
        food: [],
        activity: []
    };

    // Get number of people
    const numPeople = parseInt(getData('numPeople')) || 1;

    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const price = parseFloat(checkbox.getAttribute('data-price'));
            const category = checkbox.getAttribute('data-category');
            const label = checkbox.closest('label')?.querySelector('.package-option-name')?.textContent || 'Item';
            
            // Multiply travel (flight tickets) by number of people
            let itemPrice = price;
            if (category === 'travel') {
                itemPrice = price * numPeople;
            }
            
            total += itemPrice;
            selectedItems[category].push({
                label: label,
                price: price,
                quantity: category === 'travel' ? numPeople : 1,
                totalPrice: itemPrice
            });
        }
    });

    // Update total price
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = formatCurrency(total);
    }

    // Update price breakdown
    updatePriceBreakdown(total);

    return total;
}

function updatePriceBreakdown(total) {
    const breakdownContainer = document.getElementById('priceBreakdown');
    if (!breakdownContainer) return;

    const numPeople = parseInt(getData('numPeople')) || 1;
    let html = '<div class="price-breakdown">';
    
    // Show number of people
    html += `
        <div class="price-breakdown-item" style="background: rgba(0, 188, 212, 0.05); padding: 12px; border-radius: 6px; margin-bottom: 10px;">
            <span class="price-breakdown-label"><i class="fas fa-users"></i> Travelers:</span>
            <span class="price-breakdown-value">${numPeople} ${numPeople === 1 ? 'person' : 'people'}</span>
        </div>
    `;
    
    const categories = ['accommodation', 'travel', 'food', 'activity'];
    const categoryLabels = {
        accommodation: 'Accommodation',
        travel: 'Travel (Flight Tickets)',
        food: 'Food',
        activity: 'Activities'
    };

    categories.forEach(category => {
        if (selectedItems[category].length > 0) {
            const categoryTotal = selectedItems[category].reduce((sum, item) => sum + (item.totalPrice || item.price), 0);
            const quantity = category === 'travel' ? selectedItems[category].reduce((sum, item) => sum + (item.quantity || 1), 0) : null;
            
            html += `
                <div class="price-breakdown-item">
                    <span class="price-breakdown-label">
                        ${categoryLabels[category]}
                        ${quantity ? ` (${quantity} ticket${quantity > 1 ? 's' : ''})` : ''}
                    </span>
                    <span class="price-breakdown-value">${formatCurrency(categoryTotal)}</span>
                </div>
            `;
        }
    });

    html += `
        <div class="price-breakdown-item">
            <span class="price-breakdown-label">Total:</span>
            <span class="price-breakdown-value">${formatCurrency(total)}</span>
        </div>
    `;
    
    html += '</div>';
    breakdownContainer.innerHTML = html;
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculatorPage);
} else {
    initCalculatorPage();
}

