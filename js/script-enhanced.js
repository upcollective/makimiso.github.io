/**
 * Makimiso Website - Enhanced JavaScript
 * Professional, modular, and performance-optimized
 */

class MakimisoWebsite {
    constructor() {
        this.isInitialized = false;
        this.observers = new Map();
        this.elements = new Map();
        this.formState = {
            started: false,
            submitted: false
        };
        
        // Bind methods to preserve context
        this.handleResize = this.debounce(this.handleResize.bind(this), 250);
        this.handleScroll = this.debounce(this.handleScroll.bind(this), 16); // ~60fps
        
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        if (this.isInitialized) return;
        
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
            } else {
                this.initializeComponents();
            }
            
            // Initialize progressive enhancements
            this.initializeProgressiveEnhancement();
            
            this.isInitialized = true;
        } catch (error) {
            this.handleError('Initialization failed', error);
        }
    }

    /**
     * Initialize all components
     */
    initializeComponents() {
        this.cacheElements();
        this.initializeNavigation();
        this.initializeForm();
        this.initializeSmoothScrolling();
        this.initializeAnimations();
        this.initializeAnalytics();
        this.initializeAccessibility();
        
        // Add global event listeners
        window.addEventListener('resize', this.handleResize, { passive: true });
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        window.addEventListener('pageshow', this.handlePageShow.bind(this));
    }

    /**
     * Cache frequently used DOM elements
     */
    cacheElements() {
        const selectors = {
            mobileMenu: '#mobile-menu',
            navMenu: '.nav-menu',
            navLinks: '.nav-link',
            contactForm: '#contactForm',
            formFields: '#contactForm input, #contactForm select, #contactForm textarea',
            submitBtn: '#submit-btn',
            formSuccess: '#form-success',
            scrollIndicator: '.scroll-indicator',
            hero: '.hero',
            statsNumbers: '.stat-number',
            stats: '.stat',
            animatedElements: '.service-card, .process-step, .step',
            emailLinks: 'a[href^="mailto:"]'
        };

        Object.entries(selectors).forEach(([key, selector]) => {
            const elements = selector.includes(',') ? 
                document.querySelectorAll(selector) : 
                document.querySelector(selector);
            this.elements.set(key, elements);
        });
    }

    /**
     * Initialize mobile navigation
     */
    initializeNavigation() {
        const mobileMenu = this.elements.get('mobileMenu');
        const navMenu = this.elements.get('navMenu');
        const navLinks = this.elements.get('navLinks');

        if (!mobileMenu || !navMenu) return;

        // Mobile menu toggle
        mobileMenu.addEventListener('click', () => {
            const isActive = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active', !isActive);
            navMenu.classList.toggle('active', !isActive);
            
            // Update ARIA attributes for accessibility
            mobileMenu.setAttribute('aria-expanded', !isActive);
            navMenu.setAttribute('aria-hidden', isActive);
        });

        // Close menu when clicking nav links
        navLinks?.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                this.closeMobileMenu();
                mobileMenu.focus(); // Return focus to toggle button
            }
        });
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const mobileMenu = this.elements.get('mobileMenu');
        const navMenu = this.elements.get('navMenu');
        
        if (mobileMenu && navMenu) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * Initialize form functionality
     */
    initializeForm() {
        const form = this.elements.get('contactForm');
        if (!form) return;

        this.initializeFormValidation();
        this.initializeFormSubmission();
        this.initializeCharacterCounter();
        this.initializeFormAnalytics();
    }

    /**
     * Initialize form validation
     */
    initializeFormValidation() {
        const form = this.elements.get('contactForm');
        const formFields = this.elements.get('formFields');

        // Validation rules
        const validators = {
            name: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s'-]+$/,
                message: 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            'project-type': {
                required: true,
                message: 'Please select a project type'
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000,
                message: 'Message must be between 10 and 1000 characters'
            }
        };

        // Add validation to each field
        formFields?.forEach(field => {
            const validator = validators[field.name];
            if (!validator) return;

            // Real-time validation on blur
            field.addEventListener('blur', () => this.validateField(field, validator));
            
            // Clear errors on input
            field.addEventListener('input', () => this.clearFieldErrors(field));
        });
    }

    /**
     * Validate individual field
     */
    validateField(field, validator) {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.name}-error`);
        
        let isValid = true;
        let message = '';

        // Required check
        if (validator.required && !value) {
            isValid = false;
            message = `${this.capitalize(field.name.replace('-', ' '))} is required`;
        }
        // Pattern check
        else if (value && validator.pattern && !validator.pattern.test(value)) {
            isValid = false;
            message = validator.message;
        }
        // Length checks
        else if (value && validator.minLength && value.length < validator.minLength) {
            isValid = false;
            message = `Must be at least ${validator.minLength} characters`;
        }
        else if (value && validator.maxLength && value.length > validator.maxLength) {
            isValid = false;
            message = `Must be less than ${validator.maxLength} characters`;
        }

        this.updateFieldValidation(field, errorElement, isValid, message);
        return isValid;
    }

    /**
     * Update field validation UI
     */
    updateFieldValidation(field, errorElement, isValid, message) {
        if (!errorElement) return;

        if (isValid) {
            errorElement.textContent = '';
            field.classList.remove('error');
            field.classList.add('valid');
            field.setAttribute('aria-invalid', 'false');
        } else {
            errorElement.textContent = message;
            field.classList.remove('valid');
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
        }
    }

    /**
     * Clear field errors
     */
    clearFieldErrors(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement?.textContent) {
            errorElement.textContent = '';
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
        }
    }

    /**
     * Initialize character counter
     */
    initializeCharacterCounter() {
        const messageField = document.getElementById('message');
        const charCount = document.getElementById('char-count');
        
        if (!messageField || !charCount) return;

        messageField.addEventListener('input', () => {
            const currentLength = messageField.value.length;
            const maxLength = 1000;
            
            charCount.textContent = `${currentLength}/${maxLength} characters`;
            
            // Update styling based on length
            if (currentLength > maxLength * 0.95) {
                charCount.style.color = 'var(--accessible-orange)';
            } else if (currentLength > maxLength * 0.8) {
                charCount.style.color = 'var(--bright-blue)';
            } else {
                charCount.style.color = 'var(--slate-gray)';
            }
        });
    }

    /**
     * Initialize form submission
     */
    initializeFormSubmission() {
        const form = this.elements.get('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission(form);
        });
    }

    /**
     * Handle form submission
     */
    async handleFormSubmission(form) {
        try {
            // Validate all fields
            const isValid = this.validateForm(form);
            if (!isValid) {
                this.focusFirstError(form);
                return;
            }

            // Show loading state
            this.setFormLoading(true);

            // Submit form
            const formData = new FormData(form);
            const response = await this.submitForm(formData);

            if (response.ok) {
                this.showFormSuccess();
                this.trackFormSuccess();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            this.handleFormError(error);
        } finally {
            this.setFormLoading(false);
        }
    }

    /**
     * Validate entire form
     */
    validateForm(form) {
        const formFields = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        formFields.forEach(field => {
            const fieldIsValid = this.validateField(field, this.getValidator(field.name));
            if (!fieldIsValid) isValid = false;
        });

        return isValid;
    }

    /**
     * Get validator for field
     */
    getValidator(fieldName) {
        const validators = {
            name: { required: true, minLength: 2, pattern: /^[a-zA-Z\s'-]+$/ },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            'project-type': { required: true },
            message: { required: true, minLength: 10, maxLength: 1000 }
        };
        return validators[fieldName] || {};
    }

    /**
     * Submit form data
     */
    async submitForm(formData) {
        return fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        });
    }

    /**
     * Set form loading state
     */
    setFormLoading(isLoading) {
        const submitBtn = this.elements.get('submitBtn');
        if (!submitBtn) return;

        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        if (btnText && btnLoading) {
            if (isLoading) {
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline';
                submitBtn.disabled = true;
                submitBtn.setAttribute('aria-busy', 'true');
            } else {
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.setAttribute('aria-busy', 'false');
            }
        }
    }

    /**
     * Show form success state
     */
    showFormSuccess() {
        const form = this.elements.get('contactForm');
        const formSuccess = this.elements.get('formSuccess');

        if (form && formSuccess) {
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth' });
            
            // Focus on success message for screen readers
            formSuccess.setAttribute('tabindex', '-1');
            formSuccess.focus();
        }
    }

    /**
     * Handle form errors
     */
    handleFormError(error) {
        console.error('Form submission error:', error);
        
        // Show user-friendly error message
        const errorMessage = 'There was an error sending your message. Please try again or email us directly.';
        this.showNotification(errorMessage, 'error');
    }

    /**
     * Focus first error field
     */
    focusFirstError(form) {
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    /**
     * Initialize smooth scrolling
     */
    initializeSmoothScrolling() {
        // Smooth scroll for anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Scroll indicator functionality
        this.initializeScrollIndicator();
    }

    /**
     * Initialize scroll indicator
     */
    initializeScrollIndicator() {
        const scrollIndicator = this.elements.get('scrollIndicator');
        const hero = this.elements.get('hero');

        if (!scrollIndicator) return;

        // Click handler
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.value-prop, .services-overview');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        // Hide/show based on hero visibility
        if (hero && 'IntersectionObserver' in window) {
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    scrollIndicator.style.opacity = entry.isIntersecting ? '1' : '0';
                });
            }, { threshold: 0.5 });

            heroObserver.observe(hero);
            this.observers.set('hero', heroObserver);
        }
    }

    /**
     * Initialize animations
     */
    initializeAnimations() {
        this.initializeStatsAnimation();
        this.initializeFadeInAnimations();
    }

    /**
     * Initialize stats counter animation
     */
    initializeStatsAnimation() {
        const stats = this.elements.get('stats');
        if (!stats || !('IntersectionObserver' in window)) return;

        const animatedStats = new Set();

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedStats.has(entry.target)) {
                    animatedStats.add(entry.target);
                    const statNumber = entry.target.querySelector('.stat-number');
                    
                    if (statNumber) {
                        const originalText = statNumber.textContent;
                        const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                        
                        setTimeout(() => {
                            this.animateStatNumber(statNumber, originalText);
                        }, index * 200);
                    }
                }
            });
        }, { threshold: 0.7 });

        stats.forEach?.(stat => statsObserver.observe(stat));
        this.observers.set('stats', statsObserver);
    }

    /**
     * Animate stat number
     */
    animateStatNumber(element, target, duration = 1500) {
        // Respect reduced motion preference
        if (this.prefersReducedMotion()) {
            element.textContent = target;
            return;
        }

        const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(numericTarget * easeOutQuart);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * Initialize fade-in animations
     */
    initializeFadeInAnimations() {
        const animatedElements = this.elements.get('animatedElements');
        if (!animatedElements || !('IntersectionObserver' in window)) return;

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            fadeObserver.observe(element);
        });

        this.observers.set('fadeIn', fadeObserver);
    }

    /**
     * Initialize analytics tracking
     */
    initializeAnalytics() {
        this.initializeFormAnalytics();
        this.initializeEmailTracking();
    }

    /**
     * Initialize form analytics
     */
    initializeFormAnalytics() {
        const formFields = this.elements.get('formFields');
        
        formFields?.forEach(field => {
            field.addEventListener('focus', () => {
                if (!this.formState.started) {
                    this.trackEvent('form_start', { form_name: 'contact_form' });
                    this.formState.started = true;
                }
            }, { once: true });
        });
    }

    /**
     * Initialize email link tracking
     */
    initializeEmailTracking() {
        const emailLinks = this.elements.get('emailLinks');
        
        emailLinks?.forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('email_click', {
                    email_address: link.href.replace('mailto:', ''),
                    link_text: link.textContent
                });
            });
        });
    }

    /**
     * Track form success
     */
    trackFormSuccess() {
        this.trackEvent('form_submit_success', { form_name: 'contact_form' });
    }

    /**
     * Initialize accessibility features
     */
    initializeAccessibility() {
        // Add skip link functionality
        this.initializeSkipLinks();
        
        // Enhance focus management
        this.initializeFocusManagement();
        
        // Add keyboard navigation
        this.initializeKeyboardNavigation();
    }

    /**
     * Initialize skip links
     */
    initializeSkipLinks() {
        const skipLinks = document.querySelectorAll('.skip-link');
        
        skipLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    /**
     * Initialize focus management
     */
    initializeFocusManagement() {
        // Ensure modal and dropdown focus is properly managed
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }

    /**
     * Handle tab navigation
     */
    handleTabNavigation(e) {
        const navMenu = this.elements.get('navMenu');
        
        // Trap focus in mobile menu when open
        if (navMenu?.classList.contains('active')) {
            const focusableElements = navMenu.querySelectorAll(
                'a[href], button, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    /**
     * Initialize keyboard navigation
     */
    initializeKeyboardNavigation() {
        // Add keyboard support for interactive elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const target = e.target;
                
                // Handle space/enter on scroll indicator
                if (target.classList.contains('scroll-indicator')) {
                    e.preventDefault();
                    target.click();
                }
            }
        });
    }

    /**
     * Initialize progressive enhancement
     */
    initializeProgressiveEnhancement() {
        // Feature detection
        const features = {
            grid: CSS.supports('display', 'grid'),
            customProperties: CSS.supports('color', 'var(--primary-blue)'),
            intersectionObserver: 'IntersectionObserver' in window,
            requestAnimationFrame: 'requestAnimationFrame' in window
        };

        // Add feature classes to body
        Object.entries(features).forEach(([feature, supported]) => {
            if (supported) {
                document.body.classList.add(`supports-${feature.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
            }
        });
    }

    /**
     * Handle page show (back button)
     */
    handlePageShow(event) {
        if (event.persisted) {
            this.resetFormState();
        }
    }

    /**
     * Reset form state
     */
    resetFormState() {
        const form = this.elements.get('contactForm');
        const formSuccess = this.elements.get('formSuccess');

        if (form && formSuccess) {
            form.style.display = 'block';
            formSuccess.style.display = 'none';
            form.reset();

            // Reset field states
            const fields = form.querySelectorAll('input, select, textarea');
            fields.forEach(field => {
                field.classList.remove('error', 'valid');
                field.setAttribute('aria-invalid', 'false');
            });

            // Clear error messages
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.textContent = '';
            });

            this.formState = { started: false, submitted: false };
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            this.closeMobileMenu();
        }
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        // Placeholder for scroll-based functionality
        // Can be extended for scroll-triggered animations, etc.
    }

    /**
     * Utility Methods
     */

    /**
     * Debounce function
     */
    debounce(func, wait) {
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

    /**
     * Check if user prefers reduced motion
     */
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Capitalize string
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Track analytics event
     */
    trackEvent(eventName, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create or update notification element
        let notification = document.getElementById('notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'polite');
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.className = `notification notification--${type}`;
        notification.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }

    /**
     * Handle errors gracefully
     */
    handleError(context, error) {
        console.error(`[MakimisoWebsite] ${context}:`, error);
        
        // Track error if analytics available
        this.trackEvent('javascript_error', {
            error_context: context,
            error_message: error.message
        });
    }

    /**
     * Cleanup method for proper disposal
     */
    destroy() {
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
        
        // Disconnect observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        // Clear cached elements
        this.elements.clear();
        
        this.isInitialized = false;
    }
}

// Initialize the application
const makimisoWebsite = new MakimisoWebsite();

// Make it globally available for debugging
window.MakimisoWebsite = makimisoWebsite;