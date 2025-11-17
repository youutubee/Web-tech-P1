// ============================================
// Registration Page Logic
// ============================================

function initRegistrationPage() {
    // Try both form IDs (login and registration)
    const form = document.getElementById('registrationForm') || document.getElementById('registrationFormReg');
    if (!form) return;

    // Get form ID to determine which input IDs to use
    const formId = form.id;
    const isRegistration = formId === 'registrationFormReg';
    
    const fullNameInput = document.getElementById(isRegistration ? 'fullNameReg' : 'fullName');
    const phoneInput = document.getElementById(isRegistration ? 'phoneNumberReg' : 'phoneNumber');
    const pinInput = document.getElementById(isRegistration ? 'pinCodeReg' : 'pinCode');
    const emailInput = document.getElementById(isRegistration ? 'emailReg' : 'email');
    
    const nameError = document.getElementById(isRegistration ? 'nameErrorReg' : 'nameError');
    const phoneError = document.getElementById(isRegistration ? 'phoneErrorReg' : 'phoneError');
    const pinError = document.getElementById(isRegistration ? 'pinErrorReg' : 'pinError');
    const emailError = document.getElementById(isRegistration ? 'emailErrorReg' : 'emailError');

    // Real-time validation
    if (fullNameInput && nameError) {
        fullNameInput.addEventListener('input', () => {
            if (fullNameInput.value && !validateName(fullNameInput.value)) {
                showError(fullNameInput, nameError, 'Name must be at least 2 characters and contain only letters');
            } else {
                clearError(fullNameInput, nameError);
            }
        });
    }

    if (phoneInput && phoneError) {
        phoneInput.addEventListener('input', () => {
            if (phoneInput.value && !validatePhone(phoneInput.value)) {
                showError(phoneInput, phoneError, 'Phone number must be exactly 10 digits');
            } else {
                clearError(phoneInput, phoneError);
            }
        });
    }

    if (pinInput && pinError) {
        pinInput.addEventListener('input', () => {
            if (pinInput.value && !validatePIN(pinInput.value)) {
                showError(pinInput, pinError, 'PIN code must be exactly 6 digits');
            } else {
                clearError(pinInput, pinError);
            }
        });
    }

    if (emailInput && emailError) {
        emailInput.addEventListener('input', () => {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                showError(emailInput, emailError, 'Please enter a valid email address');
            } else {
                clearError(emailInput, emailError);
            }
        });
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear previous errors
        if (fullNameInput && nameError) clearError(fullNameInput, nameError);
        if (phoneInput && phoneError) clearError(phoneInput, phoneError);
        if (pinInput && pinError) clearError(pinInput, pinError);
        if (emailInput && emailError) clearError(emailInput, emailError);
        
        // Validate all fields
        if (fullNameInput && !validateName(fullNameInput.value)) {
            showError(fullNameInput, nameError, 'Name must be at least 2 characters and contain only letters');
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
        
        if (isValid) {
            // Store user data
            const userData = {
                fullName: fullNameInput?.value || '',
                phone: phoneInput?.value || '',
                email: emailInput?.value || '',
                pin: pinInput?.value || ''
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            storeData('userData', userData);
            
            // Show success modal (different modals for login vs registration)
            const modalId = isRegistration ? 'successModalReg' : 'successModal';
            showModal(modalId);
        }
    });

    // Modal close button (for login)
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            hideModal('successModal');
            // Redirect to destinations page
            window.location.hash = 'destinations';
            if (typeof showPage === 'function') {
                showPage('destinations');
            }
        });
    }

    // Modal close button (for registration)
    const modalCloseBtnReg = document.getElementById('modalCloseBtnReg');
    if (modalCloseBtnReg) {
        modalCloseBtnReg.addEventListener('click', () => {
            hideModal('successModalReg');
            // Redirect to destinations page
            window.location.hash = 'destinations';
            if (typeof showPage === 'function') {
                showPage('destinations');
            }
        });
    }

    // Setup modals
    setupModalClose('successModal');
    setupModalClose('successModalReg');
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRegistrationPage);
} else {
    initRegistrationPage();
}

