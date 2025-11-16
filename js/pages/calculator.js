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
    // Load destination data from URL parameter or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDestination = urlParams.get('destination') || getData('selectedDestination') || localStorage.getItem('selectedDestination');
    if (!selectedDestination) {
        console.error('No destination selected');
        // Redirect to destinations page if no destination selected
        window.location.href = 'destinations.html';
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
            // Store booking data and redirect to thank you page
            const numAdults = parseInt(document.getElementById('numAdults')?.value || document.getElementById('numPeople')?.value || 1);
            const numChildren = parseInt(document.getElementById('numChildren')?.value || 0);
            const numInfants = parseInt(document.getElementById('numInfants')?.value || 0);
            const tripDate = document.getElementById('tripDate')?.value || '';
            const tripDuration = parseInt(document.getElementById('tripDuration')?.value || 7);
            
            const bookingData = {
                totalPrice: calculateTotal(),
                numPeople: numAdults + numChildren,
                numAdults: numAdults,
                numChildren: numChildren,
                numInfants: numInfants,
                tripDate: tripDate,
                tripDuration: tripDuration
            };
            localStorage.setItem('bookingData', JSON.stringify(bookingData));
            window.location.href = 'thankyou.html';
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

    // Get number of people (adults + children, infants are usually free)
    const numAdults = parseInt(getData('numAdults')) || parseInt(localStorage.getItem('numAdults')) || 1;
    const numChildren = parseInt(getData('numChildren')) || parseInt(localStorage.getItem('numChildren')) || 0;
    const numInfants = parseInt(getData('numInfants')) || parseInt(localStorage.getItem('numInfants')) || 0;
    const numPeople = parseInt(getData('numPeople')) || parseInt(localStorage.getItem('numPeople')) || (numAdults + numChildren);
    
    // Get trip duration
    const tripDuration = parseInt(document.getElementById('tripDuration')?.value) || 7;

    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const price = parseFloat(checkbox.getAttribute('data-price'));
            const category = checkbox.getAttribute('data-category');
            const label = checkbox.closest('label')?.querySelector('.package-option-name')?.textContent || 'Item';
            
            // Calculate item price based on category
            let itemPrice = price;
            let quantity = 1;
            
            if (category === 'travel') {
                // Travel: multiply by number of travelers (adults + children)
                quantity = numPeople;
                itemPrice = price * numPeople;
            } else if (category === 'accommodation') {
                // Accommodation: multiply by number of rooms needed (1 room per 2 adults, children can share)
                const roomsNeeded = Math.ceil((numAdults + Math.ceil(numChildren / 2)) / 2);
                quantity = roomsNeeded;
                itemPrice = price * roomsNeeded * tripDuration; // Per night * duration
            } else if (category === 'food') {
                // Food: multiply by number of travelers and duration
                quantity = numPeople;
                itemPrice = price * numPeople * tripDuration; // Per person per day
            } else if (category === 'activity') {
                // Activities: multiply by number of travelers
                quantity = numPeople;
                itemPrice = price * numPeople;
            }
            
            total += itemPrice;
            selectedItems[category].push({
                label: label,
                price: price,
                quantity: quantity,
                totalPrice: itemPrice,
                unitPrice: price
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

    const numAdults = parseInt(getData('numAdults')) || parseInt(localStorage.getItem('numAdults')) || 1;
    const numChildren = parseInt(getData('numChildren')) || parseInt(localStorage.getItem('numChildren')) || 0;
    const numInfants = parseInt(getData('numInfants')) || parseInt(localStorage.getItem('numInfants')) || 0;
    const numPeople = numAdults + numChildren;
    const tripDuration = parseInt(document.getElementById('tripDuration')?.value) || 7;
    const tripDate = document.getElementById('tripDate')?.value || 'Not selected';
    
    let html = '<div class="price-breakdown">';
    
    // Show trip details
    html += `
        <div class="price-breakdown-item" style="background: rgba(0, 188, 212, 0.05); padding: 12px; border-radius: 6px; margin-bottom: 10px;">
            <div style="margin-bottom: 8px;">
                <span class="price-breakdown-label"><i class="fas fa-calendar"></i> Travel Date:</span>
                <span class="price-breakdown-value">${tripDate}</span>
            </div>
            <div style="margin-bottom: 8px;">
                <span class="price-breakdown-label"><i class="fas fa-clock"></i> Duration:</span>
                <span class="price-breakdown-value">${tripDuration} day${tripDuration > 1 ? 's' : ''}</span>
            </div>
            <div>
                <span class="price-breakdown-label"><i class="fas fa-users"></i> Travelers:</span>
                <span class="price-breakdown-value">${numAdults} adult${numAdults > 1 ? 's' : ''}${numChildren > 0 ? `, ${numChildren} child${numChildren > 1 ? 'ren' : ''}` : ''}${numInfants > 0 ? `, ${numInfants} infant${numInfants > 1 ? 's' : ''}` : ''}</span>
            </div>
        </div>
    `;
    
    const categories = ['accommodation', 'travel', 'food', 'activity'];
    const categoryLabels = {
        accommodation: 'Accommodation',
        travel: 'Travel (Flight Tickets)',
        food: 'Food Packages',
        activity: 'Activities'
    };

    categories.forEach(category => {
        if (selectedItems[category].length > 0) {
            const categoryTotal = selectedItems[category].reduce((sum, item) => sum + (item.totalPrice || item.price), 0);
            const items = selectedItems[category];
            
            html += `
                <div class="price-breakdown-item">
                    <div>
                        <span class="price-breakdown-label">${categoryLabels[category]}</span>
                        <div style="margin-top: 4px; font-size: 12px; color: #666;">
            `;
            
            items.forEach(item => {
                const qty = item.quantity || 1;
                const unitPrice = item.unitPrice || item.price;
                html += `${item.label}: ${formatCurrency(unitPrice)} × ${qty} = ${formatCurrency(item.totalPrice)}<br>`;
            });
            
            html += `
                        </div>
                    </div>
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

