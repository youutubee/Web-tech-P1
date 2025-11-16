// ============================================
// Utility Functions
// ============================================

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Update progress bar
function updateProgressBar(currentPage, totalPages) {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = (currentPage / totalPages) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.style.transition = 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

// Auto-update progress bar based on active page
function updateProgressBarAuto() {
    const pages = ['page1', 'page2', 'page2b', 'page3', 'page4', 'page5'];
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        const currentIndex = pages.indexOf(activePage.id);
        if (currentIndex !== -1) {
            updateProgressBar(currentIndex + 1, pages.length);
        }
    }
}

// Show page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Also ensure body can scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        // Update progress bar
        updateProgressBarAuto();
        
        // Re-initialize destination selection if needed
        if (pageId === 'page2b' && typeof initDestinationSelection === 'function') {
            setTimeout(initDestinationSelection, 200);
        }
    }
}

// Show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Hide modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on outside click
function setupModalClose(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modalId);
            }
        });
    }
}

// Validate email
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate phone (10 digits)
function validatePhone(phone) {
    return /^\d{10}$/.test(phone);
}

// Validate PIN (6 digits)
function validatePIN(pin) {
    return /^\d{6}$/.test(pin);
}

// Validate name
function validateName(name) {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}

// Show error message
function showError(input, errorElement, message) {
    if (input) input.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Clear error message
function clearError(input, errorElement) {
    if (input) input.classList.remove('error');
    if (errorElement) errorElement.classList.remove('show');
}

// Store data in session storage
function storeData(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

// Get data from session storage
function getData(key) {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Clear all session data
function clearSessionData() {
    sessionStorage.clear();
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        updateProgressBar,
        showPage,
        showModal,
        hideModal,
        setupModalClose,
        validateEmail,
        validatePhone,
        validatePIN,
        validateName,
        showError,
        clearError,
        storeData,
        getData,
        clearSessionData,
        debounce,
        scrollToElement
    };
}

