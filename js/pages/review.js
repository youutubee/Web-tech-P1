// ============================================
// Review Page Logic
// ============================================

function initReviewPage() {
    const stars = document.querySelectorAll('.star');
    let rating = 0;
    const ratingDisplay = document.getElementById('ratingDisplay');
    const reviewForm = document.getElementById('reviewForm');
    const reviewText = document.getElementById('reviewText');
    const reviewSuccess = document.getElementById('reviewSuccess');

    // Star rating
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            rating = index + 1;
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                    s.textContent = '★';
                } else {
                    s.classList.remove('active');
                    s.textContent = '☆';
                }
            });
            
            if (ratingDisplay) {
                ratingDisplay.textContent = `Rating: ${rating}/5`;
            }
        });

        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.style.color = '#ffc107';
                }
            });
        });

        star.addEventListener('mouseleave', () => {
            stars.forEach((s, i) => {
                if (!s.classList.contains('active')) {
                    s.style.color = '#ddd';
                }
            });
        });
    });

    // Form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (rating > 0) {
                const reviewData = {
                    rating: rating,
                    review: reviewText?.value || '',
                    destination: getData('selectedDestination') || 'Unknown',
                    timestamp: new Date().toISOString()
                };
                
                storeData('reviewData', reviewData);
                
                // Show success message
                if (reviewSuccess) {
                    reviewSuccess.classList.remove('hidden');
                    setTimeout(() => {
                        showPage('page5');
                    }, 1500);
                }
            } else {
                alert('Please select a rating');
            }
        });
    }

    // Skip button
    const skipBtn = document.getElementById('nextToPage5');
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            showPage('page5');
        });
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviewPage);
} else {
    initReviewPage();
}

