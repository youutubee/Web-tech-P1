// ============================================
// Destination Selection Page Logic
// ============================================

let selectedDestination = null;

function initDestinationSelection() {
    // Wait a bit for cards to be populated
    setTimeout(() => {
        const destinationCards = document.querySelectorAll('.destination-card');
        const nextBtn = document.getElementById('nextToPage3');

        destinationCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove previous selection
                destinationCards.forEach(c => c.classList.remove('selected'));
                
                // Add selection to clicked card
                card.classList.add('selected');
                selectedDestination = card.getAttribute('data-destination');
                
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
document.addEventListener('click', (e) => {
    if (e.target.closest('#page2b')) {
        setTimeout(initDestinationSelection, 100);
    }
});

