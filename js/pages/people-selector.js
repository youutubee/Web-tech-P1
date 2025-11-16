// ============================================
// People Selector Logic
// ============================================

let numAdults = 1;
let numChildren = 0;
let numInfants = 0;
let selectedTickets = 0;
const MAX_TICKETS = 4;

function initPeopleSelector() {
    // Handle both old and new structure
    const numPeopleInput = document.getElementById('numPeople');
    const numAdultsInput = document.getElementById('numAdults');
    const numChildrenInput = document.getElementById('numChildren');
    const numInfantsInput = document.getElementById('numInfants');
    
    const decreaseBtns = document.querySelectorAll('.btn-people-decrease');
    const increaseBtns = document.querySelectorAll('.btn-people-increase');
    const peopleWarning = document.getElementById('peopleWarning');
    const totalTravelersSpan = document.getElementById('totalTravelers');

    // Initialize with new structure (adults, children, infants)
    if (numAdultsInput) {
        numAdults = parseInt(numAdultsInput.value) || 1;
    } else if (numPeopleInput) {
        numAdults = parseInt(numPeopleInput.value) || 1;
    }

    if (numChildrenInput) {
        numChildren = parseInt(numChildrenInput.value) || 0;
    }

    if (numInfantsInput) {
        numInfants = parseInt(numInfantsInput.value) || 0;
    }

    updateTotalTravelers();

    // Handle decrease buttons
    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (target === 'numAdults' && numAdults > 1) {
                numAdults--;
                if (numAdultsInput) numAdultsInput.value = numAdults;
                updateTotalTravelers();
            } else if (target === 'numChildren' && numChildren > 0) {
                numChildren--;
                if (numChildrenInput) numChildrenInput.value = numChildren;
                updateTotalTravelers();
            } else if (target === 'numInfants' && numInfants > 0) {
                numInfants--;
                if (numInfantsInput) numInfantsInput.value = numInfants;
                updateTotalTravelers();
            } else if (!target && numAdults > 1) {
                // Old structure
                numAdults--;
                if (numPeopleInput) numPeopleInput.value = numAdults;
                updateTotalTravelers();
            }
        });
    });

    // Handle increase buttons
    increaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (target === 'numAdults' && numAdults < 10) {
                numAdults++;
                if (numAdultsInput) numAdultsInput.value = numAdults;
                updateTotalTravelers();
            } else if (target === 'numChildren' && numChildren < 10) {
                numChildren++;
                if (numChildrenInput) numChildrenInput.value = numChildren;
                updateTotalTravelers();
            } else if (target === 'numInfants' && numInfants < 5) {
                numInfants++;
                if (numInfantsInput) numInfantsInput.value = numInfants;
                updateTotalTravelers();
            } else if (!target && numAdults < 10) {
                // Old structure
                numAdults++;
                if (numPeopleInput) numPeopleInput.value = numAdults;
                updateTotalTravelers();
            }
        });
    });

    // Set minimum date to today
    const tripDateInput = document.getElementById('tripDate');
    if (tripDateInput) {
        const today = new Date().toISOString().split('T')[0];
        tripDateInput.setAttribute('min', today);
        if (!tripDateInput.value) {
            tripDateInput.value = today;
        }
    }

    // Update when inputs change
    if (numAdultsInput) {
        numAdultsInput.addEventListener('change', () => {
            numAdults = Math.max(1, Math.min(10, parseInt(numAdultsInput.value) || 1));
            numAdultsInput.value = numAdults;
            updateTotalTravelers();
        });
    }

    if (numChildrenInput) {
        numChildrenInput.addEventListener('change', () => {
            numChildren = Math.max(0, Math.min(10, parseInt(numChildrenInput.value) || 0));
            numChildrenInput.value = numChildren;
            updateTotalTravelers();
        });
    }

    if (numInfantsInput) {
        numInfantsInput.addEventListener('change', () => {
            numInfants = Math.max(0, Math.min(5, parseInt(numInfantsInput.value) || 0));
            numInfantsInput.value = numInfants;
            updateTotalTravelers();
        });
    }

    // Initial update
    updatePeopleSelector();
}

function updateTotalTravelers() {
    const totalTravelers = numAdults + numChildren; // Infants don't count for pricing
    const totalTravelersSpan = document.getElementById('totalTravelers');
    if (totalTravelersSpan) {
        totalTravelersSpan.textContent = totalTravelers;
    }
    
    // Store in localStorage and sessionStorage
    storeData('numPeople', totalTravelers);
    storeData('numAdults', numAdults);
    storeData('numChildren', numChildren);
    storeData('numInfants', numInfants);
    localStorage.setItem('numPeople', totalTravelers);
    localStorage.setItem('numAdults', numAdults);
    localStorage.setItem('numChildren', numChildren);
    localStorage.setItem('numInfants', numInfants);
    
    updatePeopleSelector();
}

function updatePeopleSelector() {
    const totalTravelers = numAdults + numChildren;
    const peopleWarning = document.getElementById('peopleWarning');

    // Show warning for 6+ people
    if (peopleWarning) {
        if (totalTravelers >= 6) {
            peopleWarning.classList.remove('d-none');
        } else {
            peopleWarning.classList.add('d-none');
        }
    }

    // Disable customization for 6+ people
    if (totalTravelers >= 6) {
        disableCustomization();
    } else {
        enableCustomization();
    }

    // Recalculate total
    if (typeof calculateTotal === 'function') {
        calculateTotal();
    }
}

function disableCustomization() {
    // Disable all checkboxes except flight tickets
    const allCheckboxes = document.querySelectorAll('.custom-checkbox');
    allCheckboxes.forEach(checkbox => {
        const category = checkbox.getAttribute('data-category');
        if (category !== 'travel') {
            checkbox.disabled = true;
            checkbox.closest('label')?.classList.add('disabled');
        }
    });
}

function enableCustomization() {
    // Enable all checkboxes
    const allCheckboxes = document.querySelectorAll('.custom-checkbox');
    allCheckboxes.forEach(checkbox => {
        checkbox.disabled = false;
        checkbox.closest('label')?.classList.remove('disabled');
    });
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initPeopleSelector();
        setTimeout(monitorTicketSelections, 500);
    });
} else {
    initPeopleSelector();
    setTimeout(monitorTicketSelections, 500);
}

// Monitor ticket selections
function monitorTicketSelections() {
    const travelCheckboxes = document.querySelectorAll('.custom-checkbox[data-category="travel"]');
    travelCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const totalTravelers = numAdults + numChildren;
            const checkedTickets = document.querySelectorAll('.custom-checkbox[data-category="travel"]:checked');
            selectedTickets = checkedTickets.length;
            
            // If more tickets than travelers, uncheck extras
            if (selectedTickets > totalTravelers) {
                checkedTickets.forEach((ticket, index) => {
                    if (index >= totalTravelers) {
                        ticket.checked = false;
                    }
                });
            }
            
            // If more than MAX_TICKETS, uncheck extras
            if (selectedTickets > MAX_TICKETS) {
                checkedTickets.forEach((ticket, index) => {
                    if (index >= MAX_TICKETS) {
                        ticket.checked = false;
                    }
                });
            }
            
            if (typeof calculateTotal === 'function') {
                calculateTotal();
            }
        });
    });
}
