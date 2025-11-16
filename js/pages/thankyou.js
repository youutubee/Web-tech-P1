// ============================================
// Thank You Page Logic
// ============================================

function initThankYouPage() {
    // Display summary
    displaySummary();

    // Start over button
    const startOverBtn = document.getElementById('startOverBtn');
    if (startOverBtn) {
        startOverBtn.addEventListener('click', () => {
            resetAll();
            showPage('page1');
            updateProgressBar(1, 5);
        });
    }
}

function displaySummary() {
    const userData = getData('userData');
    const destination = getData('selectedDestination');
    const reviewData = getData('reviewData');

    // Update name
    const summaryName = document.getElementById('summaryName');
    if (summaryName && userData) {
        summaryName.textContent = userData.name || 'Traveler';
    }

    // Update destination
    const summaryDestination = document.getElementById('summaryDestination');
    if (summaryDestination) {
        summaryDestination.textContent = destination || 'Not selected';
    }

    // Update rating
    const summaryRating = document.getElementById('summaryRating');
    if (summaryRating && reviewData) {
        summaryRating.textContent = `${reviewData.rating}/5`;
    }
}

function resetAll() {
    // Clear session storage
    clearSessionData();

    // Reset registration form
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.reset();
    }

    // Clear errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });
    document.querySelectorAll('.form-control.error').forEach(input => {
        input.classList.remove('error');
    });

    // Reset checkboxes
    document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset destination selection
    document.querySelectorAll('.destination-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Reset stars
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('active');
        star.textContent = '☆';
        star.style.color = '';
    });

    // Reset review form
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.reset();
    }

    const reviewSuccess = document.getElementById('reviewSuccess');
    if (reviewSuccess) {
        reviewSuccess.classList.add('hidden');
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThankYouPage);
} else {
    initThankYouPage();
}

