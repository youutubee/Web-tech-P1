// ============================================
// Navigation System
// ============================================

// Initialize navigation
function initNavigation() {
    // Sticky navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', () => {
            navbarNav.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-link, .nav-dropdown-item');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarNav) {
                navbarNav.classList.remove('active');
            }
        });
    });

    // Dropdown menu toggle
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = toggle.closest('.nav-dropdown');
            const isActive = dropdown.classList.contains('active');
            
            // Close all dropdowns
            document.querySelectorAll('.nav-dropdown').forEach(d => {
                d.classList.remove('active');
            });
            
            // Toggle current dropdown
            if (!isActive) {
                dropdown.classList.add('active');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown').forEach(d => {
                d.classList.remove('active');
            });
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

