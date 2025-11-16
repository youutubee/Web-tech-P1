// ============================================
// VoyageFlow - Main JavaScript
// ============================================

// ============================================
// Page Navigation System
// ============================================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
        
        // Update progress bar if it exists
        updateProgressBar();
        
        // Initialize page-specific features
        initializePage(pageId);
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;
    
    const pages = ['page1', 'page2', 'page2b', 'page3', 'page4', 'page5'];
    const currentPage = document.querySelector('.page.active');
    if (!currentPage) return;
    
    const currentIndex = pages.indexOf(currentPage.id);
    const progress = ((currentIndex + 1) / pages.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function initializePage(pageId) {
    switch(pageId) {
        case 'page2':
            initializeBlogPage();
            break;
        case 'page2b':
            initializeDestinationSelection();
            break;
        case 'page3':
            initializeCalculator();
            break;
        case 'page4':
            initializeReviewPage();
            break;
    }
}

// ============================================
// Page 1: Registration Form Validation
// ============================================

const registrationForm = document.getElementById('registrationForm');
const phoneInput = document.getElementById('phoneNumber');
const pinInput = document.getElementById('pinCode');
const emailInput = document.getElementById('email');
const fullNameInput = document.getElementById('fullName');
const phoneError = document.getElementById('phoneError');
const pinError = document.getElementById('pinError');
const emailError = document.getElementById('emailError');
const successModal = document.getElementById('successModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Validation functions
function validatePhone(phone) {
    return /^\d{10}$/.test(phone);
}

function validatePIN(pin) {
    return /^\d{6}$/.test(pin);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateName(name) {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}

function showError(input, errorElement, message) {
    input.classList.add('input-error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(input, errorElement) {
    input.classList.remove('input-error');
    errorElement.classList.remove('show');
}

// Real-time validation
if (fullNameInput) {
    fullNameInput.addEventListener('input', () => {
        if (fullNameInput.value && !validateName(fullNameInput.value)) {
            showError(fullNameInput, document.getElementById('nameError'), 'Name must be at least 2 characters and contain only letters');
        } else {
            clearError(fullNameInput, document.getElementById('nameError'));
        }
    });
}

if (phoneInput) {
    phoneInput.addEventListener('input', () => {
        if (phoneInput.value && !validatePhone(phoneInput.value)) {
            showError(phoneInput, phoneError, 'Phone number must be exactly 10 digits');
        } else {
            clearError(phoneInput, phoneError);
        }
    });
}

if (pinInput) {
    pinInput.addEventListener('input', () => {
        if (pinInput.value && !validatePIN(pinInput.value)) {
            showError(pinInput, pinError, 'PIN code must be exactly 6 digits');
        } else {
            clearError(pinInput, pinError);
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('input', () => {
        if (emailInput.value && !validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
        } else {
            clearError(emailInput, emailError);
        }
    });
}

// Form submission
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear previous errors
        if (fullNameInput) clearError(fullNameInput, document.getElementById('nameError'));
        if (phoneInput) clearError(phoneInput, phoneError);
        if (pinInput) clearError(pinInput, pinError);
        if (emailInput) clearError(emailInput, emailError);
        
        // Validate all fields
        if (fullNameInput && !validateName(fullNameInput.value)) {
            showError(fullNameInput, document.getElementById('nameError'), 'Name must be at least 2 characters and contain only letters');
            isValid = false;
        }
        
        if (phoneInput && !validatePhone(phoneInput.value)) {
            showError(phoneInput, phoneError, 'Phone number must be exactly 10 digits');
            isValid = false;
        }
        
        if (pinInput && !validatePIN(pinInput.value)) {
            showError(pinInput, pinError, 'PIN code must be exactly 6 digits');
            isValid = false;
        }
        
        if (emailInput && !validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (isValid && successModal) {
            successModal.classList.add('active');
            // Store user data
            storeUserData();
        }
    });
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
        if (successModal) successModal.classList.remove('active');
        showPage('page2');
    });
}

// Store user data
function storeUserData() {
    const userData = {
        name: fullNameInput?.value || '',
        phone: phoneInput?.value || '',
        email: emailInput?.value || '',
        pin: pinInput?.value || ''
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

// ============================================
// Page 2: Blog Navigation
// ============================================

function initializeBlogPage() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update active nav link
                navLinks.forEach(l => {
                    l.classList.remove('active');
                    l.classList.remove('border-green-400');
                });
                link.classList.add('active');
                link.classList.add('border-green-400');
            }
        });
    });
    
    // Highlight active section on scroll
    const sections = document.querySelectorAll('.blog-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    if (link.getAttribute('data-section') === id) {
                        navLinks.forEach(l => {
                            l.classList.remove('active');
                            l.classList.remove('border-green-400');
                        });
                        link.classList.add('active');
                        link.classList.add('border-green-400');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Navigation buttons
const nextToPage2b = document.getElementById('nextToPage2b');
if (nextToPage2b) {
    nextToPage2b.addEventListener('click', () => {
        showPage('page2b');
    });
}

// ============================================
// Page 2b: Destination Selection
// ============================================

let selectedDestination = null;

function initializeDestinationSelection() {
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove previous selection
            destinationCards.forEach(c => c.classList.remove('selected'));
            // Add selection to clicked card
            card.classList.add('selected');
            selectedDestination = card.getAttribute('data-destination');
            
            // Enable next button
            const nextBtn = document.getElementById('nextToPage3');
            if (nextBtn) {
                nextBtn.disabled = false;
                nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
    });
}

const nextToPage3 = document.getElementById('nextToPage3');
if (nextToPage3) {
    nextToPage3.addEventListener('click', () => {
        if (selectedDestination) {
            sessionStorage.setItem('selectedDestination', selectedDestination);
            showPage('page3');
        }
    });
}

// ============================================
// Page 3: Price Calculator
// ============================================

let selectedItems = {
    travel: [],
    food: [],
    activity: [],
    accommodation: []
};

function initializeCalculator() {
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    const totalPriceElement = document.getElementById('totalPrice');
    const priceBreakdown = document.getElementById('priceBreakdown');
    
    if (!totalPriceElement) return;
    
    function calculateTotal() {
        let total = 0;
        selectedItems = {
            travel: [],
            food: [],
            activity: [],
            accommodation: []
        };
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = parseFloat(checkbox.getAttribute('data-price'));
                const category = checkbox.getAttribute('data-category');
                const label = checkbox.closest('label')?.querySelector('span')?.textContent || 'Item';
                
                total += price;
                selectedItems[category].push({
                    label: label,
                    price: price
                });
            }
        });
        
        totalPriceElement.textContent = `$${total.toLocaleString()}`;
        
        // Update price breakdown
        if (priceBreakdown) {
            updatePriceBreakdown(priceBreakdown, total);
        }
        
        return total;
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            calculateTotal();
        });
    });
    
    // Initialize total
    calculateTotal();
}

function updatePriceBreakdown(container, total) {
    let html = '<div class="space-y-2">';
    
    Object.keys(selectedItems).forEach(category => {
        if (selectedItems[category].length > 0) {
            const categoryTotal = selectedItems[category].reduce((sum, item) => sum + item.price, 0);
            html += `
                <div class="price-item flex justify-between p-2 rounded">
                    <span class="capitalize">${category}:</span>
                    <span class="font-semibold">$${categoryTotal.toLocaleString()}</span>
                </div>
            `;
        }
    });
    
    html += `
        <div class="border-t-2 border-purple-300 pt-2 mt-2 flex justify-between">
            <span class="font-bold text-lg">Total:</span>
            <span class="font-extrabold text-xl text-purple-600">$${total.toLocaleString()}</span>
        </div>
    `;
    
    html += '</div>';
    container.innerHTML = html;
}

const confirmBookingBtn = document.getElementById('confirmBooking');
const confirmModal = document.getElementById('confirmModal');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');
const finalPriceElement = document.getElementById('finalPrice');

if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.custom-checkbox');
        let total = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseFloat(checkbox.getAttribute('data-price'));
            }
        });
        
        if (finalPriceElement) {
            finalPriceElement.textContent = `Total: $${total.toLocaleString()}`;
        }
        
        if (confirmModal) {
            confirmModal.classList.add('active');
        }
    });
}

if (modalConfirmBtn) {
    modalConfirmBtn.addEventListener('click', () => {
        if (confirmModal) confirmModal.classList.remove('active');
        showPage('page4');
    });
}

// ============================================
// Page 4: Review Page
// ============================================

function initializeReviewPage() {
    const stars = document.querySelectorAll('.star');
    let rating = 0;
    
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
            
            const ratingDisplay = document.getElementById('ratingDisplay');
            if (ratingDisplay) {
                ratingDisplay.textContent = `Rating: ${rating}/5`;
            }
        });
        
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.style.color = '#fbbf24';
                }
            });
        });
        
        star.addEventListener('mouseleave', () => {
            stars.forEach((s, i) => {
                if (!s.classList.contains('active')) {
                    s.style.color = '#d1d5db';
                }
            });
        });
    });
    
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const reviewText = document.getElementById('reviewText')?.value || '';
            
            if (rating > 0) {
                const reviewData = {
                    rating: rating,
                    review: reviewText,
                    destination: sessionStorage.getItem('selectedDestination') || 'Unknown'
                };
                sessionStorage.setItem('reviewData', JSON.stringify(reviewData));
                
                // Show success message
                const reviewSuccess = document.getElementById('reviewSuccess');
                if (reviewSuccess) {
                    reviewSuccess.classList.remove('hidden');
                    setTimeout(() => {
                        showPage('page5');
                    }, 1500);
                }
            }
        });
    }
}

const nextToPage5 = document.getElementById('nextToPage5');
if (nextToPage5) {
    nextToPage5.addEventListener('click', () => {
        showPage('page5');
    });
}

// ============================================
// Page 5: Thank You / Confirmation
// ============================================

function displaySummary() {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    const destination = sessionStorage.getItem('selectedDestination') || 'Unknown';
    const reviewData = JSON.parse(sessionStorage.getItem('reviewData') || '{}');
    
    const summaryName = document.getElementById('summaryName');
    const summaryDestination = document.getElementById('summaryDestination');
    const summaryRating = document.getElementById('summaryRating');
    
    if (summaryName) summaryName.textContent = userData.name || 'Traveler';
    if (summaryDestination) summaryDestination.textContent = destination;
    if (summaryRating && reviewData.rating) {
        summaryRating.textContent = `${reviewData.rating}/5`;
    }
}

// ============================================
// Start Over Function
// ============================================

const startOverBtn = document.getElementById('startOverBtn');
if (startOverBtn) {
    startOverBtn.addEventListener('click', () => {
        // Clear session storage
        sessionStorage.clear();
        
        // Reset form
        if (registrationForm) registrationForm.reset();
        if (phoneInput) clearError(phoneInput, phoneError);
        if (pinInput) clearError(pinInput, pinError);
        if (emailInput) clearError(emailInput, emailError);
        if (fullNameInput) clearError(fullNameInput, document.getElementById('nameError'));
        
        // Reset checkboxes
        const checkboxes = document.querySelectorAll('.custom-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset destination selection
        const destinationCards = document.querySelectorAll('.destination-card');
        destinationCards.forEach(card => card.classList.remove('selected'));
        selectedDestination = null;
        
        // Reset stars
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.classList.remove('active');
            star.textContent = '☆';
        });
        
        // Reset review form
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) reviewForm.reset();
        
        // Go back to page 1
        showPage('page1');
    });
}

// ============================================
// Initialize on page load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Show first page
    showPage('page1');
    
    // Initialize calculator if on page 3
    if (document.getElementById('page3')?.classList.contains('active')) {
        initializeCalculator();
    }
    
    // Display summary if on page 5
    if (document.getElementById('page5')?.classList.contains('active')) {
        displaySummary();
    }
});

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

