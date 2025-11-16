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

    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const price = parseFloat(checkbox.getAttribute('data-price'));
            const category = checkbox.getAttribute('data-category');
            const label = checkbox.closest('label')?.querySelector('.package-option-name')?.textContent || 'Item';
            
            total += price;
            selectedItems[category].push({
                label: label,
                price: price
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

    let html = '<div class="price-breakdown">';
    
    const categories = ['accommodation', 'travel', 'food', 'activity'];
    const categoryLabels = {
        accommodation: 'Accommodation',
        travel: 'Travel',
        food: 'Food',
        activity: 'Activities'
    };

    categories.forEach(category => {
        if (selectedItems[category].length > 0) {
            const categoryTotal = selectedItems[category].reduce((sum, item) => sum + item.price, 0);
            html += `
                <div class="price-breakdown-item">
                    <span class="price-breakdown-label">${categoryLabels[category]}:</span>
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

