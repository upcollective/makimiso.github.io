// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const projectTypeField = document.getElementById('project-type');
    const messageField = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const charCount = document.getElementById('char-count');
    const formSuccess = document.getElementById('form-success');

    // Character counter for message field
    if (messageField && charCount) {
        messageField.addEventListener('input', function() {
            const currentLength = messageField.value.length;
            charCount.textContent = `${currentLength}/1000 characters`;
            
            if (currentLength > 950) {
                charCount.style.color = '#FF6B6B';
            } else {
                charCount.style.color = '#718096';
            }
        });
    }

    // Real-time validation
    function validateField(field, errorElementId, validationFn) {
        const errorElement = document.getElementById(errorElementId);
        if (!errorElement) return true;

        field.addEventListener('blur', function() {
            const isValid = validationFn(field.value);
            if (!isValid.valid) {
                errorElement.textContent = isValid.message;
                field.style.borderColor = '#FF6B6B';
            } else {
                errorElement.textContent = '';
                field.style.borderColor = '#68B984';
            }
        });

        field.addEventListener('input', function() {
            if (errorElement.textContent) {
                const isValid = validationFn(field.value);
                if (isValid.valid) {
                    errorElement.textContent = '';
                    field.style.borderColor = '#68B984';
                }
            }
        });

        return validationFn(field.value).valid;
    }

    // Validation functions
    const validateName = (value) => {
        if (!value.trim()) {
            return { valid: false, message: 'Name is required' };
        }
        if (value.trim().length < 2) {
            return { valid: false, message: 'Name must be at least 2 characters' };
        }
        return { valid: true };
    };

    const validateEmail = (value) => {
        if (!value.trim()) {
            return { valid: false, message: 'Email is required' };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }
        return { valid: true };
    };

    const validateProjectType = (value) => {
        if (!value) {
            return { valid: false, message: 'Please select a project type' };
        }
        return { valid: true };
    };

    const validateMessage = (value) => {
        if (!value.trim()) {
            return { valid: false, message: 'Message is required' };
        }
        if (value.trim().length < 10) {
            return { valid: false, message: 'Message must be at least 10 characters' };
        }
        if (value.length > 1000) {
            return { valid: false, message: 'Message must be less than 1000 characters' };
        }
        return { valid: true };
    };

    // Set up validation
    if (nameField) validateField(nameField, 'name-error', validateName);
    if (emailField) validateField(emailField, 'email-error', validateEmail);
    if (projectTypeField) validateField(projectTypeField, 'project-type-error', validateProjectType);
    if (messageField) validateField(messageField, 'message-error', validateMessage);

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const nameValid = nameField ? validateName(nameField.value).valid : true;
        const emailValid = emailField ? validateEmail(emailField.value).valid : true;
        const projectTypeValid = projectTypeField ? validateProjectType(projectTypeField.value).valid : true;
        const messageValid = messageField ? validateMessage(messageField.value).valid : true;

        // Show validation errors
        if (!nameValid) {
            const errorMsg = validateName(nameField.value).message;
            document.getElementById('name-error').textContent = errorMsg;
            nameField.style.borderColor = '#FF6B6B';
        }

        if (!emailValid) {
            const errorMsg = validateEmail(emailField.value).message;
            document.getElementById('email-error').textContent = errorMsg;
            emailField.style.borderColor = '#FF6B6B';
        }

        if (!projectTypeValid) {
            const errorMsg = validateProjectType(projectTypeField.value).message;
            document.getElementById('project-type-error').textContent = errorMsg;
            projectTypeField.style.borderColor = '#FF6B6B';
        }

        if (!messageValid) {
            const errorMsg = validateMessage(messageField.value).message;
            document.getElementById('message-error').textContent = errorMsg;
            messageField.style.borderColor = '#FF6B6B';
        }

        // If all valid, submit form
        if (nameValid && emailValid && projectTypeValid && messageValid) {
            // Show loading state
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            if (btnText && btnLoading) {
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline';
                submitBtn.disabled = true;
            }

            // For Netlify Forms, we can submit directly
            // The form will handle the submission automatically
            const formData = new FormData(contactForm);
            
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // Show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth' });
            })
            .catch((error) => {
                console.error('Error:', error);
                
                // Reset button state
                if (btnText && btnLoading) {
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                    submitBtn.disabled = false;
                }
                
                // Show error message
                alert('There was an error sending your message. Please try again or email us directly.');
            });
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Hero section enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.value-prop');
            if (nextSection) {
                nextSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Add cursor pointer
        scrollIndicator.style.cursor = 'pointer';
    }
    
    // Hide scroll indicator when scrolling past hero
    const hero = document.querySelector('.hero');
    if (hero && scrollIndicator) {
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrollIndicator.style.opacity = '1';
                } else {
                    scrollIndicator.style.opacity = '0';
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(hero);
    }
});

// Animated Statistics Counter
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsAnimated = new Set();
    
    function animateNumber(element, target, duration = 2000) {
        // Respect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            element.textContent = target;
            return;
        }
        
        const start = 0;
        const startTime = performance.now();
        const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (numericTarget - start) * easeOutQuart);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated.has(entry.target)) {
                statsAnimated.add(entry.target);
                const statNumber = entry.target.querySelector('.stat-number');
                const originalText = statNumber.textContent;
                
                // Start animation with stagger effect
                const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                setTimeout(() => {
                    animateNumber(statNumber, originalText, 1500);
                }, index * 200);
            }
        });
    }, { threshold: 0.7 });
    
    // Observe all stat elements
    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Fade-in animation for elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in effect to service cards and process steps
    const animatedElements = document.querySelectorAll('.service-card, .process-step, .step');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Email link tracking (for analytics)
document.addEventListener('DOMContentLoaded', function() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track email clicks if Google Analytics is available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_click', {
                    'email_address': this.href.replace('mailto:', ''),
                    'link_text': this.textContent
                });
            }
        });
    });
});

// Form analytics tracking
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Track form start (when user focuses on first field)
    let formStarted = false;
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            if (!formStarted && typeof gtag !== 'undefined') {
                gtag('event', 'form_start', {
                    'form_name': 'contact_form'
                });
                formStarted = true;
            }
        });
    });

    // Track form submission attempts
    contactForm.addEventListener('submit', function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'form_name': 'contact_form'
            });
        }
    });
});

// Progressive enhancement - Add enhanced features only if supported
document.addEventListener('DOMContentLoaded', function() {
    // Check for CSS Grid support
    if (CSS.supports('display', 'grid')) {
        document.body.classList.add('supports-grid');
    }

    // Check for CSS Custom Properties support
    if (CSS.supports('color', 'var(--primary-blue)')) {
        document.body.classList.add('supports-custom-props');
    }

    // Enhance form with better UX if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const form = document.getElementById('contactForm');
        if (form) {
            form.classList.add('enhanced-form');
        }
    }
});

// Handle browser back button with form state
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Reset form if page is loaded from cache
        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.getElementById('form-success');
        
        if (contactForm && formSuccess) {
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
            contactForm.reset();
            
            // Reset all field styles
            const fields = contactForm.querySelectorAll('input, select, textarea');
            fields.forEach(field => {
                field.style.borderColor = '';
            });
            
            // Clear error messages
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.textContent = '';
            });
        }
    }
});