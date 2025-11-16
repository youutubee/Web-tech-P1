// ============================================
// People Selector Logic
// ============================================

let numPeople = 1;
let selectedTickets = 0;
const MAX_TICKETS = 4;

function initPeopleSelector() {
    const numPeopleInput = document.getElementById('numPeople');
    const decreaseBtn = document.querySelector('.btn-people-decrease');
    const increaseBtn = document.querySelector('.btn-people-increase');
    const peopleWarning = document.getElementById('peopleWarning');
    const ticketChecker = document.getElementById('ticketChecker');

    if (!numPeopleInput) return;

    // Set initial value
    numPeople = parseInt(numPeopleInput.value) || 1;
    storeData('numPeople', numPeople);

    // Decrease button
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (numPeople > 1) {
                numPeople--;
                updatePeopleSelector();
            }
        });
    }

    // Increase button
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            if (numPeople < 10) {
                numPeople++;
                updatePeopleSelector();
            }
        });
    }

    // Update when input changes
    numPeopleInput.addEventListener('change', () => {
        const value = parseInt(numPeopleInput.value);
        if (value >= 1 && value <= 10) {
            numPeople = value;
            updatePeopleSelector();
        } else {
            numPeopleInput.value = numPeople;
        }
    });

    function updatePeopleSelector() {
        numPeopleInput.value = numPeople;
        storeData('numPeople', numPeople);

        // Update decrease button
        if (decreaseBtn) {
            decreaseBtn.disabled = numPeople <= 1;
        }

        // Show warning for 6+ people
        if (peopleWarning) {
            if (numPeople > 6) {
                peopleWarning.classList.remove('d-none');
            } else {
                peopleWarning.classList.add('d-none');
            }
        }

        // Disable customization for 6+ people
        if (numPeople > 6) {
            disableCustomization();
        } else {
            enableCustomization();
        }

        // Update ticket checker
        updateTicketChecker();

        // Recalculate total
        if (typeof calculateTotal === 'function') {
            calculateTotal();
        }
    }

    // Initial update
    updatePeopleSelector();
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

    // Show message
    const ticketChecker = document.getElementById('ticketChecker');
    if (ticketChecker) {
        ticketChecker.innerHTML = `
            <small class="text-warning">
                <i class="fas fa-exclamation-triangle"></i> 
                For groups of 6+ people, only flight tickets can be selected. Please contact us for accommodation and other services.
            </small>
        `;
        ticketChecker.classList.add('warning');
    }
}

function enableCustomization() {
    // Enable all checkboxes
    const allCheckboxes = document.querySelectorAll('.custom-checkbox');
    allCheckboxes.forEach(checkbox => {
        checkbox.disabled = false;
        checkbox.closest('label')?.classList.remove('disabled');
    });

    // Update ticket checker
    updateTicketChecker();
}

function updateTicketChecker() {
    const ticketChecker = document.getElementById('ticketChecker');
    if (!ticketChecker) return;

    // Count selected flight tickets
    const travelCheckboxes = document.querySelectorAll('.custom-checkbox[data-category="travel"]:checked');
    selectedTickets = travelCheckboxes.length;

    if (numPeople === 1) {
        // If only 1 person, only 1 ticket should be selected
        if (selectedTickets > 1) {
            ticketChecker.innerHTML = `
                <small class="text-danger">
                    <i class="fas fa-times-circle"></i> 
                    Only 1 flight ticket can be selected for 1 person. Please unselect other tickets.
                </small>
            `;
            ticketChecker.classList.remove('warning');
            ticketChecker.classList.add('error');
        } else {
            ticketChecker.innerHTML = `
                <small class="text-muted">
                    <i class="fas fa-info-circle"></i> 
                    Select 1 flight ticket for 1 person
                </small>
            `;
            ticketChecker.classList.remove('warning', 'error');
        }
    } else if (selectedTickets > MAX_TICKETS) {
        ticketChecker.innerHTML = `
            <small class="text-danger">
                <i class="fas fa-times-circle"></i> 
                Maximum ${MAX_TICKETS} flight tickets allowed. You have selected ${selectedTickets}. Please unselect ${selectedTickets - MAX_TICKETS} ticket(s).
            </small>
        `;
        ticketChecker.classList.remove('warning');
        ticketChecker.classList.add('error');
    } else if (selectedTickets > numPeople) {
        ticketChecker.innerHTML = `
            <small class="text-warning">
                <i class="fas fa-exclamation-triangle"></i> 
                You have selected ${selectedTickets} tickets for ${numPeople} people. Consider selecting ${numPeople} tickets.
            </small>
        `;
        ticketChecker.classList.add('warning');
        ticketChecker.classList.remove('error');
    } else {
        ticketChecker.innerHTML = `
            <small class="text-muted">
                <i class="fas fa-info-circle"></i> 
                Selected ${selectedTickets} ticket(s) for ${numPeople} people. Maximum ${MAX_TICKETS} tickets allowed.
            </small>
        `;
        ticketChecker.classList.remove('warning', 'error');
    }
}

// Monitor ticket selections
function monitorTicketSelections() {
    const travelCheckboxes = document.querySelectorAll('.custom-checkbox[data-category="travel"]');
    travelCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateTicketChecker();
            
            // If only 1 person and more than 1 ticket selected, uncheck others
            if (numPeople === 1) {
                const checkedTickets = document.querySelectorAll('.custom-checkbox[data-category="travel"]:checked');
                if (checkedTickets.length > 1) {
                    // Keep only the last checked one
                    checkedTickets.forEach((ticket, index) => {
                        if (index < checkedTickets.length - 1) {
                            ticket.checked = false;
                        }
                    });
                }
            }
            
            // If more than MAX_TICKETS selected, uncheck the last ones
            const checkedTickets = document.querySelectorAll('.custom-checkbox[data-category="travel"]:checked');
            if (checkedTickets.length > MAX_TICKETS) {
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

// Re-initialize when page3 becomes active
const page3Observer = new MutationObserver(() => {
    const page3 = document.getElementById('page3');
    if (page3 && page3.classList.contains('active')) {
        setTimeout(() => {
            initPeopleSelector();
            monitorTicketSelections();
        }, 100);
    }
});

const page3 = document.getElementById('page3');
if (page3) {
    page3Observer.observe(page3, { attributes: true, attributeFilter: ['class'] });
}

