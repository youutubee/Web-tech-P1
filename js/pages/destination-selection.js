// ============================================
// Destination Selection Page Logic
// ============================================

let selectedDestination = null;

function initDestinationSelection() {
    // Wait a bit for cards to be populated
    setTimeout(() => {
        const destinationCards = document.querySelectorAll('.destination-card');
        const selectButtons = document.querySelectorAll('.btn-select-destination');
        const nextBtn = document.getElementById('nextToPage3');

        // Handle select button clicks
        selectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                
                const destination = button.getAttribute('data-destination');
                
                // Remove previous selection
                destinationCards.forEach(c => {
                    c.classList.remove('selected');
                    const btn = c.querySelector('.btn-select-destination');
                    if (btn) {
                        btn.classList.remove('selected');
                        btn.innerHTML = '<i class="fas fa-check"></i> Select';
                    }
                });
                
                // Add selection to clicked card
                const card = button.closest('.destination-card');
                if (card) {
                    card.classList.add('selected');
                    button.classList.add('selected');
                    button.innerHTML = '<i class="fas fa-check-circle"></i> Selected';
                }
                
                selectedDestination = destination;
                
                // Store selected destination
                storeData('selectedDestination', selectedDestination);
                
                // Enable next button
                if (nextBtn) {
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('disabled', 'btn-secondary');
                    nextBtn.classList.add('btn-primary');
                }
            });
        });

        // Also handle card clicks
        destinationCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking the button
                if (e.target.closest('.btn-select-destination')) return;
                
                const button = card.querySelector('.btn-select-destination');
                if (button) {
                    button.click();
                }
            });
        });

        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (selectedDestination) {
                    showPage('page3');
                    updateProgressBar(4, 5);
                    // Initialize calculator with selected destination
                    setTimeout(() => {
                        if (typeof initCalculatorPage === 'function') {
                            initCalculatorPage();
                        }
                    }, 100);
                }
            });
        }
    }, 100);
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDestinationSelection);
} else {
    initDestinationSelection();
}

// Re-initialize when page becomes active
const page2bObserver = new MutationObserver(() => {
    const page2b = document.getElementById('page2b');
    if (page2b && page2b.classList.contains('active')) {
        setTimeout(initDestinationSelection, 100);
    }
});

const page2b = document.getElementById('page2b');
if (page2b) {
    page2bObserver.observe(page2b, { attributes: true, attributeFilter: ['class'] });
}

// Also initialize on page show
document.addEventListener('click', (e) => {
    if (e.target.closest('#page2b') || e.target.closest('[onclick*="page2b"]')) {
        setTimeout(initDestinationSelection, 200);
    }
});

