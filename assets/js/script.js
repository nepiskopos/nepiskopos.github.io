// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initThemeSwitcher();
    initEmailProtection();
    initSmoothScrolling();
    initScrollAnimations();
    initParticleEffects();
    initLoadingScreen();
    initDynamicContent();
    initScrollToTop();
    initPerformanceOptimizations();
    initSocialIconFallbacks();
    initAvatarFallbacks();
});

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Theme Switcher
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to light theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update icon
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeIcon.setAttribute('title', 'Switch to light mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.setAttribute('title', 'Switch to dark mode');
        }
    }

    // Initialize theme
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        // Add animation effect
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 100);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Robust Email Protection - Anti-Scraping
function initEmailProtection() {
    const emailDisplay = document.getElementById('email-display');
    if (!emailDisplay) return;

    // Obfuscated email data - multiple layers of protection
    const emailParts = [
        'bmVwaXNrbw==', // Base64: 'nepisko'
        'Z21haWw=',     // Base64: 'gmail'
        'Y29t'          // Base64: 'com'
    ];

    // Additional obfuscation with character codes
    const charCodes = [110, 101, 112, 105, 115, 107, 111]; // 'nepisko'
    const domainCodes = [103, 109, 97, 105, 108]; // 'gmail'
    const tldCodes = [99, 111, 109]; // 'com'

    // Decoy data to confuse scrapers
    const decoys = [
        'spam@example.com', 'bot@crawler.net', 'fake@scraper.org',
        'dummy@harvester.com', 'test@robot.crawler', 'noreply@spam.com'
    ];

    // Email construction function with multiple fallback methods
    function constructEmail() {
        try {
            // Method 1: Try Base64 decoding
            const user = atob(emailParts[0]);
            const domain = atob(emailParts[1]);
            const tld = atob(emailParts[2]);
            return `${user}@${domain}.${tld}`;
        } catch (e) {
            try {
                // Method 2: Use character codes
                const user = String.fromCharCode(...charCodes);
                const domain = String.fromCharCode(...domainCodes);
                const tld = String.fromCharCode(...tldCodes);
                return `${user}@${domain}.${tld}`;
            } catch (e2) {
                // Method 3: Fallback (should never reach here)
                return 'nepisko@gmail.com';
            }
        }
    }

    // Create hidden decoy elements to confuse scrapers
    decoys.forEach(decoy => {
        const hiddenSpan = document.createElement('span');
        hiddenSpan.textContent = decoy;
        hiddenSpan.style.cssText = 'position:absolute;left:-9999px;opacity:0;font-size:0;pointer-events:none;';
        hiddenSpan.setAttribute('aria-hidden', 'true');
        document.body.appendChild(hiddenSpan);
    });

    let clickCount = 0;
    const maxClicks = 3;
    let isRevealed = false;

    // Remove any existing event listeners to prevent conflicts
    const newEmailDisplay = emailDisplay.cloneNode(true);
    emailDisplay.parentNode.replaceChild(newEmailDisplay, emailDisplay);

    const freshEmailDisplay = document.getElementById('email-display');

    freshEmailDisplay.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // If already revealed, copy to clipboard
        if (isRevealed) {
            const email = constructEmail();

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard! 📧', 'success');
                }).catch(() => {
                    fallbackCopy(email);
                });
            } else {
                fallbackCopy(email);
            }
            return;
        }

        clickCount++;

        if (clickCount >= maxClicks) {
            try {
                // Construct email using obfuscated data
                const email = constructEmail();

                // Display the email permanently
            this.textContent = email;
            this.style.userSelect = 'text';
            this.style.webkitUserSelect = 'text';
            this.style.mozUserSelect = 'text';
            this.style.msUserSelect = 'text';
            this.style.cursor = 'text';
                this.style.color = 'var(--accent-primary)';
                this.style.fontWeight = 'bold';

                // Set revealed state
                isRevealed = true;
                this.setAttribute('data-revealed', 'true');

            // Copy to clipboard
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(() => {
                        showNotification('Email copied to clipboard! 📧', 'success');
                }).catch(() => {
                    fallbackCopy(email);
                });
            } else {
                fallbackCopy(email);
            }

                // Email stays revealed until page refresh - no timer

            } catch (error) {
                console.error('Email reveal error:', error);
                this.textContent = 'Error revealing email. Please try again.';
            setTimeout(() => {
                this.textContent = 'Click to reveal';
                clickCount = 0;
                    isRevealed = false;
                    this.removeAttribute('data-revealed');
                }, 2000);
            }
        } else {
            // Show progress
            const remaining = maxClicks - clickCount;
            this.textContent = `Click ${remaining} more time${remaining > 1 ? 's' : ''} to reveal`;
            this.style.color = 'var(--accent-primary)';

            setTimeout(() => {
                if (!isRevealed) {
                this.textContent = 'Click to reveal';
                this.style.color = '';
                }
            }, 1500);
        }
    });

    // Simple hover effect
    freshEmailDisplay.addEventListener('mouseenter', function() {
        if (!isRevealed) {
            this.style.textDecoration = 'underline';
        }
    });

    freshEmailDisplay.addEventListener('mouseleave', function() {
        this.style.textDecoration = '';
    });
}

// Fallback copy function
function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showNotification('Email copied to clipboard!', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');

                // Add staggered animation for skill tags
                if (entry.target.classList.contains('skill-category')) {
                    const skillTags = entry.target.querySelectorAll('.skill-tag');
                    skillTags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .publication-card, .timeline-item, .skill-category');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Particle Effects
function initParticleEffects() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    // Create floating particles with better performance
    const particleCount = window.innerWidth < 768 ? 10 : 20;
    for (let i = 0; i < particleCount; i++) {
        createParticle(heroSection);
    }

    // Add AI-themed floating elements
    createAIFloatingElements(heroSection);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    const size = Math.random() * 3 + 2;
    const colors = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: 0.4;
        pointer-events: none;
        animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 5}s;
        box-shadow: 0 0 ${size * 2}px ${color};
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 15000);
}

function createAIFloatingElements(container) {
    // Create AI-themed geometric shapes
    const shapes = ['circle', 'square', 'triangle'];
    const shapeCount = window.innerWidth < 768 ? 3 : 6;

    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 20 + 10;

        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--gradient-ai);
            opacity: 0.1;
            pointer-events: none;
            animation: float ${Math.random() * 15 + 10}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
            border-radius: ${shapeType === 'circle' ? '50%' : shapeType === 'triangle' ? '0' : '2px'};
            transform: ${shapeType === 'triangle' ? 'rotate(45deg)' : 'none'};
        `;

        container.appendChild(shape);
    }
}

// Add CSS for floating particles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Navbar scroll effect - disabled to prevent scroll-linked positioning effects
// Using CSS-only solution instead

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Initialize typing effect
setTimeout(initTypingEffect, 500);

// Parallax effect for neural network background - disabled to prevent scroll-linked positioning effects
// Using CSS animations instead

// Add loading animation to images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Initialize image loading
initImageLoading();

// Add hover effects to project cards
function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize project hover effects
initProjectHoverEffects();

// Add skill tag hover effects
function initSkillTagEffects() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize skill tag effects
initSkillTagEffects();

// Add timeline animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
}

// Initialize timeline animation
initTimelineAnimation();

// Add contact form validation (if needed in the future)
function validateContactForm(form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');

    if (email && !isValidEmail(email.value)) {
        showError('Please enter a valid email address');
        return false;
    }

    if (message && message.value.trim().length < 10) {
        showError('Message must be at least 10 characters long');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Add error notification styles
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(errorStyles);

// Performance optimization: Debounce scroll events
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

// Throttle function for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to resize events only
const throttledResizeHandler = throttle(function() {
    // Handle resize events
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Recalculate particle positions if needed
        const particles = heroSection.querySelectorAll('.floating-particle');
        particles.forEach(particle => {
            if (parseFloat(particle.style.left) > 100) {
                particle.style.left = Math.random() * 100 + '%';
            }
        });
    }
}, 100);

window.addEventListener('resize', throttledResizeHandler);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    // Space/Enter to reveal email
    if (e.key === ' ' || e.key === 'Enter') {
        const emailDisplay = document.getElementById('email-display');
        if (emailDisplay && document.activeElement === emailDisplay) {
            emailDisplay.click();
        }
    }
});

// Add focus management for accessibility
function initFocusManagement() {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-primary)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize focus management
initFocusManagement();

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Hide loading screen after page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Remove from DOM after animation
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.parentNode.removeChild(loadingScreen);
                    }
                }, 500);
            }, 1000);
        });
    }
}

// Add print styles support
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Cache Control and Update Management System
class CacheController {
    constructor() {
        this.version = '1.0.0';
        this.lastUpdateCheck = 'cache_last_update_check';
        this.versionKey = 'site_version';
        this.checkInterval = 30 * 60 * 1000; // Check every 30 minutes
        this.forceRefreshKey = 'force_refresh_assets';
    }

    // Initialize cache control system
    init() {
        this.checkForUpdates();
        this.setupPeriodicChecks();
        this.handleVisibilityChange();
    }

    // Check if site has been updated
    async checkForUpdates() {
        try {
            const lastCheck = localStorage.getItem(this.lastUpdateCheck);
            const currentTime = Date.now();

            // Only check if enough time has passed or no previous check
            if (!lastCheck || (currentTime - parseInt(lastCheck)) > this.checkInterval) {
                await this.performUpdateCheck();
                localStorage.setItem(this.lastUpdateCheck, currentTime.toString());
            }
        } catch (error) {
            console.warn('Cache update check failed:', error);
        }
    }

    // Perform actual update check using cache-busting
    async performUpdateCheck() {
        try {
            // Check main HTML file with cache-busting
            const response = await fetch(`${window.location.href}?v=${Date.now()}`, {
                method: 'HEAD',
                cache: 'no-cache',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });

            if (response.ok) {
                const lastModified = response.headers.get('Last-Modified');
                const etag = response.headers.get('ETag');

                if (this.hasContentChanged(lastModified, etag)) {
                    this.handleContentUpdate();
                }
            }
        } catch (error) {
            console.warn('Update check request failed:', error);
        }
    }

    // Check if content has changed based on headers
    hasContentChanged(lastModified, etag) {
        const storedLastModified = localStorage.getItem('last_modified');
        const storedEtag = localStorage.getItem('stored_etag');

        if (lastModified && lastModified !== storedLastModified) {
            localStorage.setItem('last_modified', lastModified);
            return true;
        }

        if (etag && etag !== storedEtag) {
            localStorage.setItem('stored_etag', etag);
            return true;
        }

        return false;
    }

    // Handle content update detection
    handleContentUpdate() {
        console.log('Site update detected');

        // Clear relevant caches
        this.clearApplicationCache();

        // Show update notification to user
        this.showUpdateNotification();

        // Force refresh critical assets
        this.refreshCriticalAssets();
    }

    // Clear application caches
    async clearApplicationCache() {
        try {
            // Clear service worker caches
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
                console.log('Service Worker caches cleared');
            }

            // Clear localStorage cache flags
            localStorage.removeItem(this.forceRefreshKey);

            // Clear session storage
            sessionStorage.clear();

        } catch (error) {
            console.warn('Cache clearing failed:', error);
        }
    }

    // Show update notification to user
    showUpdateNotification() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="update-content">
                <i class="fas fa-sync-alt"></i>
                <span>Site updated! Refresh for latest version.</span>
                <button onclick="window.location.reload(true)" class="update-btn">Refresh</button>
                <button onclick="this.parentElement.parentElement.remove()" class="dismiss-btn">×</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10001;
            animation: slideInFromRight 0.3s ease;
            max-width: 300px;
            font-family: inherit;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);
    }

    // Refresh critical assets with cache-busting
    refreshCriticalAssets() {
        const criticalAssets = [
            'assets/css/style.css',
            'assets/js/script.js',
            'manifest.json'
        ];

        criticalAssets.forEach(asset => {
            this.preloadAsset(asset);
        });
    }

    // Preload asset with cache-busting
    preloadAsset(assetPath) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = `${assetPath}?v=${Date.now()}`;

        if (assetPath.endsWith('.css')) {
            link.as = 'style';
        } else if (assetPath.endsWith('.js')) {
            link.as = 'script';
        }

        document.head.appendChild(link);
    }

    // Setup periodic update checks
    setupPeriodicChecks() {
        setInterval(() => {
            this.checkForUpdates();
        }, this.checkInterval);
    }

    // Handle page visibility changes for immediate checks
    handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                // Page became visible, check for updates
                setTimeout(() => {
                    this.checkForUpdates();
                }, 1000);
            }
        });
    }

    // Force reload with cache clearing
    static forceReload() {
        // Clear all possible caches
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => caches.delete(name));
            });
        }

        // Hard reload
        window.location.reload(true);
    }
}

// Add notification animation styles
const updateStyles = document.createElement('style');
updateStyles.textContent = `
    @keyframes slideInFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .update-notification .update-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.9rem;
    }

    .update-notification .update-btn {
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8rem;
        transition: background 0.2s ease;
    }

    .update-notification .update-btn:hover {
        background: rgba(255,255,255,0.3);
    }

    .update-notification .dismiss-btn {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: 0.5rem;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }

    .update-notification .dismiss-btn:hover {
        opacity: 1;
    }
`;
document.head.appendChild(updateStyles);

// Initialize cache controller
const cacheController = new CacheController();

// Debug cache panel (for development/testing - remove in production)
function addCacheDebugPanel() {
    // Only show in development or when manually enabled
    if (location.hostname === 'localhost' || location.search.includes('debug=cache')) {
        const debugPanel = document.createElement('div');
        debugPanel.id = 'cache-debug-panel';
        debugPanel.innerHTML = `
            <div style="position: fixed; bottom: 20px; left: 20px; background: rgba(0,0,0,0.8); color: white; padding: 1rem; border-radius: 8px; z-index: 10002; font-size: 12px; font-family: monospace;">
                <div style="margin-bottom: 0.5rem; font-weight: bold;">Cache Debug Panel</div>
                <button onclick="window.NikolaosPortfolio.checkForUpdates()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Check Updates</button>
                <button onclick="window.NikolaosPortfolio.clearCache()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Clear Cache</button>
                <button onclick="window.NikolaosPortfolio.forceRefresh()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Force Refresh</button>
                <button onclick="this.parentElement.parentElement.remove()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Close</button>
                <div style="margin-top: 0.5rem; font-size: 10px; opacity: 0.7;">Version: ${cacheController.version}</div>
            </div>
        `;
        document.body.appendChild(debugPanel);
    }
}

// Add debug panel after DOM load
document.addEventListener('DOMContentLoaded', addCacheDebugPanel);

// Enhanced Service Worker registration with update handling
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.protocol === 'file:')) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);

                // Initialize cache controller after SW registration
                cacheController.init();

                // Listen for service worker updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker installed, show update notification
                            cacheController.showUpdateNotification();
                        }
                    });
                });

                // Check for updates immediately
                registration.update();
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
                // Initialize cache controller even if SW fails
                cacheController.init();
            });
    });
} else {
    // Initialize cache controller even without service worker
    window.addEventListener('load', () => cacheController.init());
}

// Add analytics tracking (if needed)
function trackEvent(eventName, eventData) {
    // Google Analytics or other analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Track page views and interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="http"]')) {
        trackEvent('external_link_click', {
            link_url: e.target.href,
            link_text: e.target.textContent
        });
    }

    if (e.target.matches('.social-link')) {
        trackEvent('social_link_click', {
            platform: e.target.classList.contains('github') ? 'github' :
                     e.target.classList.contains('linkedin') ? 'linkedin' : 'orcid'
        });
    }
});

// Add error tracking
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Send to error tracking service if needed
});

// Add performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }
});

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Note: Preloading removed to avoid browser warnings
    // Resources are already loaded via HTML link tags
}

// Dynamic Content Loading
function initDynamicContent() {
    loadSkills();
    loadProjects();
    loadExperience();
    loadPublications();
}

// Load Skills from Skills.txt
function loadSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;

    const skillCategories = {
        'Artificial Intelligence': [
            'Machine Learning', 'Deep Learning', 'Large Language Models (LLM)',
            'Retrieval-Augmented Generation (RAG)', 'AI Agents', 'Generative AI',
            'Prompt Engineering', 'Natural Language Processing (NLP)', 'Federated Learning',
            'Applied Machine Learning', 'Recommender Systems', 'Unsupervised Learning',
            'Data Classification', 'Data Prediction', 'Model Development & Validation'
        ],
        'Technologies & Frameworks': [
            'Python', 'TensorFlow', 'PyTorch', 'LangGraph', 'LangChain', 'FastAPI',
            'spaCy', 'Transformers', 'scikit-learn', 'Open WebUI', 'NumPy', 'Pandas',
            'PIL', 'NLTK', 'OpenCV', 'REST APIs'
        ],
        'Data Science & Engineering': [
            'Data Engineering', 'Data Visualization', 'Forecasting', 'Spark', 'PySpark',
            'Tableau', 'Microsoft Power BI', 'Data Science', 'NoSQL', 'SQL',
            'SPARQL', 'RDF', 'RDFS'
        ],
        'Cloud & Infrastructure': [
            'Microsoft Azure', 'Amazon Web Services (AWS)', 'Open-Source Development',
            'Research and Development (R&D)'
        ]
    };

    Object.entries(skillCategories).forEach(([category, skills]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';

        const iconMap = {
            'Artificial Intelligence': 'fas fa-brain',
            'Technologies & Frameworks': 'fas fa-code',
            'Data Science & Engineering': 'fas fa-database',
            'Cloud & Infrastructure': 'fas fa-cloud'
        };

        categoryDiv.innerHTML = `
            <h3><i class="${iconMap[category]}"></i> ${category}</h3>
            <div class="skill-tags">
                ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;

        skillsGrid.appendChild(categoryDiv);
    });
}

// Load Projects from GitHub
function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    const projects = [
        {
            title: 'LangGraph PII Detector',
            description: 'Advanced Personally Identifiable Information (PII) detector implemented in LangGraph powered by Azure OpenAI. Enterprise-grade privacy protection system with real-time detection capabilities.',
            url: 'https://github.com/nepiskopos/langgraph-pii-detector',
            tech: ['LangGraph', 'Azure OpenAI', 'PII Detection', 'Privacy']
        },
        {
            title: 'Document Summarization AI',
            description: 'Intelligent document content summarization system built with LangGraph and Azure OpenAI. Automates document processing and information extraction for enterprise workflows.',
            url: 'https://github.com/nepiskopos/langgraph-document-summarization',
            tech: ['LangGraph', 'Document AI', 'Summarization', 'NLP']
        },
        {
            title: 'Federated Intrusion Detection',
            description: 'Federated Learning-based Intrusion Detection System for cybersecurity. Collaborative AI model training while preserving data privacy across distributed networks.',
            url: 'https://github.com/nepiskopos/simple_ids_with_flwr_iec104',
            tech: ['Federated Learning', 'Cybersecurity', 'Neural Networks', 'Privacy']
        },
        {
            title: 'Energy Forecasting AI',
            description: 'Production-ready API for active energy time series forecasting using ARIMA and Prophet models. Real-time energy consumption prediction with high accuracy.',
            url: 'https://github.com/nepiskopos/active-energy-forecast-time-series',
            tech: ['Time Series', 'ARIMA', 'Prophet', 'Forecasting']
        },
        {
            title: 'BERT Word Prediction',
            description: 'API-based missing word predictor using BERT MLM and NLTK. Intelligent text completion with positive sentiment analysis and context awareness.',
            url: 'https://github.com/nepiskopos/missing-positive-word-prediction-mlm',
            tech: ['BERT', 'NLTK', 'NLP', 'Sentiment Analysis']
        },
        {
            title: 'Open WebUI Enhancements',
            description: 'Custom tools, functions, and pipeline extensions for Open WebUI. Enhanced AI interface capabilities and workflow automation for improved productivity.',
            url: 'https://github.com/nepiskopos/open-webui-enhancements',
            tech: ['Open WebUI', 'AI Tools', 'Automation', 'Productivity']
        }
    ];

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;

        projectCard.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-links">
                    <a href="${project.url}" target="_blank" aria-label="View ${project.title} on GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });
}

// Load Experience Timeline from Work_Projects.txt
function loadExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    const experiences = [
        {
            title: 'Public Sector Digital Transformation Leader',
            company: 'EETAA',
            period: 'Feb 2025 - Present',
            type: 'In-house Project',
            description: 'Drove critical government modernization initiatives by orchestrating enterprise-scale systems migration from legacy infrastructure to cutting-edge frameworks. Redesigned operational workflows that deliver measurable efficiency gains while developing next-generation applications that serve evolving citizen needs, resulting in tangible performance improvements and significant cost savings for public sector operations.'
        },
        {
            title: 'Enterprise AI Banking Solutions Architect',
            company: 'IBM',
            period: 'Jan 2025 - Present',
            type: 'In-house Project',
            description: 'Lead the National Bank of Greece\'s comprehensive AI transformation by architecting and deploying intelligent automation agents that revolutionize critical banking operations. Implemented state-of-the-art AI solutions that dramatically reduce processing times, eliminate manual errors, and enhance customer experience while ensuring strict regulatory compliance and security standards.'
        },
        {
            title: 'AI-Blockchain Convergence Innovation Lead',
            company: 'INLECOM',
            period: 'Mar 2024 - Dec 2024',
            type: 'In-house Project',
            description: 'Pioneered breakthrough research combining Artificial Intelligence with Blockchain technology to solve complex enterprise scalability and trust challenges. Developed practical implementation frameworks that demonstrate how distributed ledger technology addresses AI transparency, data integrity, and decentralized learning challenges, creating sustainable competitive advantages for adopting organizations.'
        },
        {
            title: 'CONNECTOR - EU Border Security Intelligence System',
            company: 'INLECOM',
            period: 'Apr 2024 - Dec 2024',
            type: 'Horizon Europe Project',
            gaId: 'GA ID: 101121271',
            description: 'Engineered mission-critical synthetic data systems supporting European border security operations. Created advanced simulation environments that enable police and customs authorities to train AI systems without compromising sensitive data, directly contributing to enhanced border protection capabilities and streamlined customs operations across all EU member states.'
        },
        {
            title: 'EMERALDS - Smart City Mobility Intelligence Platform',
            company: 'INLECOM',
            period: 'Mar 2024 - Dec 2024',
            type: 'Horizon Europe Project',
            gaId: 'GA ID: 101093051',
            description: 'Solved complex urban mobility challenges by developing high-performance algorithms that process terabytes of transportation data in real-time. Built intelligent systems that optimize passenger flow and route planning for Utrecht and The Hague, delivering measurable improvements in commute times, reduced traffic congestion, and enhanced citizen satisfaction with public transportation services.'
        },
        {
            title: 'CRM-geothermal - Sustainable Resource AI Platform',
            company: 'INLECOM',
            period: 'Sep 2023 - Dec 2024',
            type: 'Horizon Europe Project',
            gaId: 'GA ID: 101058163',
            description: 'Revolutionized sustainable resource extraction by developing the innovative CRM AI Tool platform, seamlessly combining geothermal energy production with critical raw material mining. Created sophisticated Machine Learning models with Explainable AI that accurately predict lithium concentrations, supporting Europe\'s green energy transition while reducing dependency on imported raw materials and maximizing extraction efficiency.'
        },
        {
            title: 'ELECTRON - Energy Infrastructure Cyber-Defense Platform',
            company: 'MetaMind Innovations',
            period: 'Feb 2023 - Aug 2023',
            type: 'Horizon 2020 Project',
            gaId: 'GA ID: 101021936',
            description: 'Safeguarded critical energy infrastructure by architecting next-generation AI-powered cybersecurity systems. Developed privacy-preserving anomaly detection using advanced Federated Learning that protects against sophisticated cyber-attacks while maintaining operational continuity, delivering enterprise-grade security solutions that ensure energy system resilience against rapidly evolving threats.'
        },
        {
            title: 'DYNABIC - Enterprise Resilience AI Framework',
            company: 'MetaMind Innovations',
            period: 'Jan 2023 - Aug 2023',
            type: 'Horizon Europe Project',
            gaId: 'GA ID: 101070455',
            description: 'Enhanced European critical services business continuity by building intelligent cybersecurity frameworks that adapt dynamically to emerging threats. Implemented advanced AI-driven defense systems using privacy-preserving Federated Learning, ensuring organizational resilience while maintaining optimal operational efficiency during complex cyber-physical incidents.'
        },
        {
            title: 'TERMINET - Enterprise IoT Modernization Platform',
            company: 'MetaMind Innovations',
            period: 'Dec 2022 - Aug 2023',
            type: 'Horizon 2020 Project',
            gaId: 'GA ID: 957406',
            description: 'Accelerated enterprise IoT transformation by leading strategic platform migrations for next-generation architectures. Guided cross-functional teams through complex technology transitions, implementing cutting-edge Federated Learning solutions that deliver superior performance, reduced latency, and enhanced scalability for market-oriented IoT deployments with measurable ROI improvements.'
        },
        {
            title: 'AI4CYBER - Enterprise AI Security Ecosystem',
            company: 'MetaMind Innovations',
            period: 'Sep 2022 - Aug 2023',
            type: 'Horizon Europe Project',
            gaId: 'GA ID: 101070450',
            description: 'Built comprehensive AI-powered cybersecurity ecosystems that protect enterprises against advanced threats. Developed trustworthy AI frameworks with demonstrable explainability and fairness, implementing privacy-preserving Federated Learning for distributed threat intelligence that maintains competitive advantage while ensuring full regulatory compliance and operational transparency.'
        },
        {
            title: 'OPTIMIST - 5G Video Commerce Innovation Platform',
            company: 'Fogus Innovations',
            period: 'Jun 2021 - Jul 2022',
            type: 'Horizon 2020 Project',
            gaId: 'GA ID: 872866',
            description: 'Pioneered personalized video content delivery in 5G networks by engineering intelligent traffic management systems. Developed revenue-generating RESTful services that enabled innovative subscription-based business models, optimizing content placement and delivery to maximize user engagement while creating substantial new monetization opportunities for telecom operators worldwide.'
        },
        {
            title: 'INCOGNITO - Enterprise Privacy Identity Solution',
            company: 'Fogus Innovations',
            period: 'Jun 2020 - Jun 2021',
            type: 'Horizon 2020 Project',
            gaId: 'GA ID: 824015',
            description: 'Revolutionized digital identity management by creating privacy-first authentication platforms that fully comply with GDPR requirements. Designed comprehensive cross-platform solutions spanning web and mobile environments, enabling secure identity verification that builds customer trust while significantly reducing compliance risks and operational overhead for service providers.'
        },
        {
            title: 'RE-CENT - Decentralized Content Monetization Ecosystem',
            company: 'Fogus Innovations',
            period: 'May 2019 - Jan 2021',
            type: 'Greek National Project',
            gaId: 'GA ID: Τ1ΕΔΚ-03524',
            description: 'Transformed content distribution economics by building innovative private LTE networks with intelligent edge caching. Created breakthrough peer-to-peer video sharing platforms integrated with Ethereum-based payment systems, establishing revolutionary new revenue models for content creators while reducing distribution costs and significantly improving user experience quality.'
        },
        {
            title: 'SECONDO - Strategic Cybersecurity Investment Optimizer',
            company: 'Fogus Innovations',
            period: 'Jun 2019 - Jun 2020',
            type: 'Horizon 2020 Project',
            gaId: 'GA ID: 823997',
            description: 'Optimized enterprise cybersecurity investments by integrating diverse assessment modules into comprehensive risk quantification platforms. Developed intelligent decision-support tools that effectively balance security effectiveness with insurance cost optimization, enabling data-driven investment strategies that maximize protection while minimizing total cost of ownership and operational disruption.'
        },
        {
            title: 'CROSSFIRE - Mobile Network Performance Optimizer',
            company: 'National & Kapodistrian University of Athens',
            period: 'Sep 2018 - Jan 2019',
            type: 'FP7 People Project',
            gaId: 'GA ID: 317126',
            description: 'Enhanced mobile network efficiency by developing innovative Android applications that optimize video streaming performance in cellular environments. Created user-centric solutions that significantly improved Quality of Experience (QoE) metrics, reducing network congestion and increasing customer satisfaction for mobile operators while maximizing spectrum utilization efficiency and network profitability.'
        }
    ];

    experiences.forEach((experience, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.animationDelay = `${index * 0.2}s`;

        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3 class="timeline-title">${experience.title}</h3>
                <p class="timeline-company">${experience.company} • ${experience.period}</p>
                <p class="timeline-type">${experience.type}${experience.gaId ? ` • ${experience.gaId}` : ''}</p>
                <p class="timeline-description">${experience.description}</p>
            </div>
        `;

        timeline.appendChild(timelineItem);
    });
}

// Load Publications from Publications.txt
function loadPublications() {
    const publicationsGrid = document.getElementById('publications-grid');
    if (!publicationsGrid) return;

    const publications = [
        {
            title: 'SIAP: Synthetic Dataset for Maritime Vessel Risk Profiling',
            date: 'July 2025',
            venue: 'Zenodo',
            description: 'Comprehensive dataset with 100,000 synthetically generated vessel profiles for training machine learning models to identify vessels with high likelihood of engaging in illegal maritime activities. Features crew criminal records, abnormal routing, inspection history, and cargo characteristics.'
        },
        {
            title: 'Federated Intrusion Detection Systems: A Comprehensive Survey',
            date: 'May 2025',
            venue: 'Computer Science Review',
            description: 'Comprehensive survey of federated intrusion detection techniques, challenges, and solutions across IoT, IIoT, healthcare systems, smart manufacturing, and SCADA systems. Covers latest ML/DL frameworks and implementation strategies.'
        },
        {
            title: 'AI-based Simulation Module for CRM-geothermal',
            date: 'April 2025',
            venue: 'Zenodo',
            description: 'AI tool for uncovering intricate relationships between elemental features and Lithium concentrations in geothermal waters, integrating geological insights with advanced Machine Learning techniques for sustainable resource extraction.'
        },
        {
            title: 'Optimal Video Bitrate Selection in MEC-Empowered Networks',
            date: 'November 2023',
            venue: 'IEEE',
            description: 'Research on joint video bitrate selection and edge network caching for 5G networks. Proposes dynamic programming solutions for optimal content delivery in slice-enabled networks, improving Quality of Experience through intelligent optimization.'
        },
        {
            title: 'Peer-to-Peer Video Content Delivery Optimization',
            date: 'October 2022',
            venue: 'National & Kapodistrian University of Athens',
            description: 'Master\'s thesis on innovative video streaming services combining edge caching, D2D communication, and adaptive streaming for improved user experience in 5G networks. Focuses on reducing delivery costs and network traffic while enhancing QoE.'
        },
        {
            title: 'SECONDO: Cybersecurity Investment Platform',
            date: 'September 2020',
            venue: 'TrustBus 2020 Conference',
            description: 'Framework for cybersecurity investments and cyber-insurance decisions. Implements three-phase approach: cyber-physical risk assessment, investment-driven risk control, and blockchain-enabled insurance contracts.'
        }
    ];

    publications.forEach((publication, index) => {
        const publicationCard = document.createElement('div');
        publicationCard.className = 'publication-card';
        publicationCard.style.animationDelay = `${index * 0.1}s`;

        publicationCard.innerHTML = `
            <div class="publication-header">
                <h3 class="publication-title">${publication.title}</h3>
                <span class="publication-date">${publication.date}</span>
            </div>
            <p class="publication-venue">${publication.venue}</p>
            <p class="publication-description">${publication.description}</p>
        `;

        publicationsGrid.appendChild(publicationCard);
    });
}

// Scroll to Top functionality - using Intersection Observer instead of scroll events
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (!scrollToTopBtn) return;

    // Use Intersection Observer instead of scroll events
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scrollToTopBtn.classList.remove('visible');
            } else {
                scrollToTopBtn.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-300px 0px 0px 0px'
    });

    // Observe the top of the page
    const topSentinel = document.createElement('div');
    topSentinel.style.position = 'absolute';
    topSentinel.style.top = '0';
    topSentinel.style.left = '0';
    topSentinel.style.width = '1px';
    topSentinel.style.height = '1px';
    topSentinel.style.pointerEvents = 'none';
    document.body.appendChild(topSentinel);
    observer.observe(topSentinel);

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Social Icon Fallbacks - Ad Blocker Resistant
function initSocialIconFallbacks() {
    // Check if SVG icons are working after a short delay
    setTimeout(() => {
        const socialLinks = document.querySelectorAll('.nav-social-link, .social-link');

        socialLinks.forEach(link => {
            const svg = link.querySelector('.social-svg');
            if (svg) {
                // Check if SVG is properly rendered
                const svgRect = svg.getBoundingClientRect();
                if (svgRect.width === 0 || svgRect.height === 0 ||
                    getComputedStyle(svg).display === 'none' ||
                    getComputedStyle(svg).visibility === 'hidden') {

                    // SVG is blocked, add fallback
                    link.classList.add('no-svg');
                    console.log('SVG blocked for', link.getAttribute('aria-label'), 'adding text fallback');

                    // Add additional text fallback for nav links
                    if (link.classList.contains('nav-social-link')) {
                        addTextFallback(link);
                    }
                }
            }
        });
    }, 500);
}

function addTextFallback(link) {
    const label = link.getAttribute('aria-label');
    let shortText = '';

    if (label.includes('GitHub')) {
        shortText = 'GH';
    } else if (label.includes('LinkedIn')) {
        shortText = 'LI';
    } else if (label.includes('ORCID')) {
        shortText = 'OR';
    }

    // Create text fallback element
    const textFallback = document.createElement('span');
    textFallback.className = 'icon-text-fallback';
    textFallback.textContent = shortText;
    textFallback.style.cssText = `
        display: inline-block;
        font-size: 0.8rem;
        font-weight: bold;
        color: currentColor;
        text-align: center;
        width: 100%;
    `;

    // Hide SVG and show text
    const svg = link.querySelector('.social-svg');
    if (svg) {
        svg.style.display = 'none';
    }

    link.appendChild(textFallback);
}

// Additional fallback detection using various methods
function detectAdBlocker() {
    return new Promise((resolve) => {
        // Test if certain social media patterns are blocked
        const testDiv = document.createElement('div');
        testDiv.innerHTML = '<svg style="width:1px;height:1px;"><path d="M12 0c-6.626 0-12 5.373-12 12"></path></svg>';
        testDiv.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;';
        document.body.appendChild(testDiv);

        setTimeout(() => {
            const isBlocked = testDiv.offsetHeight === 0 ||
                            getComputedStyle(testDiv).display === 'none';
            document.body.removeChild(testDiv);
            resolve(isBlocked);
        }, 100);
    });
}

// Alternative icon loading approach
function loadAlternativeIcons() {
    const links = document.querySelectorAll('.nav-social-link');
    const iconMap = {
        'github': '⚡',
        'linkedin': '💼',
        'orcid': '🆔'
    };

    links.forEach(link => {
        const platform = link.className.match(/\b(github|linkedin|orcid)\b/)?.[1];
        if (platform && iconMap[platform]) {
            const emojiIcon = document.createElement('span');
            emojiIcon.textContent = iconMap[platform];
            emojiIcon.style.fontSize = '1.2rem';
            emojiIcon.className = 'emoji-fallback';

            // Add as additional fallback
            link.appendChild(emojiIcon);
        }
    });
}

// Simplified Avatar Fallback System
function initAvatarFallbacks() {
    const avatarImg = document.querySelector('.avatar-image');
    if (!avatarImg) return;

    let fallbackTriggered = false;

    // Function to check if image actually loaded properly
    function isImageLoaded(img) {
        return img.complete &&
               img.naturalWidth > 0 &&
               img.naturalHeight > 0;
    }

    // Set up a simple timeout fallback (5 seconds)
    const loadingTimeout = setTimeout(() => {
        if (!fallbackTriggered && !isImageLoaded(avatarImg)) {
            console.log('Avatar loading timeout - triggering fallback');
            fallbackTriggered = true;
            handleAvatarError(avatarImg);
        }
    }, 5000);

    // Monitor successful loading
    avatarImg.addEventListener('load', function() {
        console.log('Avatar load event fired');
        clearTimeout(loadingTimeout);
        if (isImageLoaded(this)) {
            fallbackTriggered = false;
            showAvatar(this);
        }
    });

    // Monitor errors
    avatarImg.addEventListener('error', function() {
        console.log('Avatar error event fired');
        clearTimeout(loadingTimeout);
        if (!fallbackTriggered) {
            fallbackTriggered = true;
            handleAvatarError(this);
        }
    });

    // Initial check if image is already loaded
    if (isImageLoaded(avatarImg)) {
        console.log('Avatar already loaded');
        clearTimeout(loadingTimeout);
        showAvatar(avatarImg);
    }
}

// Enhanced Global avatar error handler function
function handleAvatarError(img) {
    console.log('Avatar error handler called for:', img.src);

    // Prevent infinite loops by tracking attempts
    if (!img.dataset.fallbackAttempts) {
        img.dataset.fallbackAttempts = '0';
    }

    const attempts = parseInt(img.dataset.fallbackAttempts);
    img.dataset.fallbackAttempts = (attempts + 1).toString();

    // If too many attempts, go straight to CSS fallback
    if (attempts >= 3) {
        console.log('Too many fallback attempts, using CSS fallback');
        createCSSAvatar(img);
        return;
    }

    // Remove any existing error handlers to prevent conflicts
    img.onerror = null;

    // Determine next fallback based on current src
    if (img.src.includes('avatars.githubusercontent.com') || (!img.src.includes('avatar-fallback'))) {
        console.log('Trying SVG fallback...');
        img.src = 'assets/img/avatar-fallback.svg';

        // Set up new error handler with timeout
        let errorHandled = false;
        const errorTimeout = setTimeout(() => {
            if (!errorHandled) {
                errorHandled = true;
                handleAvatarError(img);
            }
        }, 2000);

        img.onerror = function() {
            if (!errorHandled) {
                errorHandled = true;
                clearTimeout(errorTimeout);
                console.log('SVG fallback failed');
                handleAvatarError(this);
            }
        };

        img.onload = function() {
            errorHandled = true;
            clearTimeout(errorTimeout);
            console.log('SVG fallback loaded successfully');
            showAvatar(this);
        };

    } else if (img.src.includes('avatar-fallback.svg')) {
        console.log('Trying PNG fallback...');
        img.src = 'assets/img/avatar-fallback.png';

        let errorHandled = false;
        const errorTimeout = setTimeout(() => {
            if (!errorHandled) {
                errorHandled = true;
                createCSSAvatar(img);
            }
        }, 2000);

        img.onerror = function() {
            if (!errorHandled) {
                errorHandled = true;
                clearTimeout(errorTimeout);
                console.log('PNG fallback failed, using CSS fallback');
                createCSSAvatar(this);
            }
        };

        img.onload = function() {
            errorHandled = true;
            clearTimeout(errorTimeout);
            console.log('PNG fallback loaded successfully');
            showAvatar(this);
        };

    } else {
        // Final fallback - CSS-based avatar
        console.log('Using CSS fallback as final option');
        createCSSAvatar(img);
    }
}

// Create a CSS-based avatar as the ultimate fallback
function createCSSAvatar(img) {
    const container = img.parentElement;

    // Hide the loading indicator
    const loadingIndicator = document.getElementById('avatar-loading');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }

    // Hide the broken image
    img.style.display = 'none';

    // Check if CSS avatar already exists
    if (container.querySelector('.css-avatar-fallback')) {
        console.log('CSS avatar already exists');
        return;
    }

    // Create CSS avatar
    const cssAvatar = document.createElement('div');
    cssAvatar.className = 'css-avatar-fallback';
    cssAvatar.style.cssText = `
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #3b82f6 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        font-weight: bold;
        color: white;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        border: 4px solid var(--accent-primary);
        box-shadow: var(--shadow-heavy);
        position: relative;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Add initials
    cssAvatar.textContent = 'NE';

    // Add a subtle pattern overlay
    const pattern = document.createElement('div');
    pattern.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 70%);
        pointer-events: none;
    `;
    cssAvatar.appendChild(pattern);

    container.appendChild(cssAvatar);

    // Fade in the CSS avatar
    setTimeout(() => {
        cssAvatar.style.opacity = '1';
    }, 100);

    console.log('CSS avatar fallback created successfully');
}

// Enhanced avatar preloading with multiple sources
function preloadAvatar() {
    const avatarSources = [
        'https://avatars.githubusercontent.com/u/58558195?v=4',
        'assets/img/avatar-fallback.svg',
        'assets/img/avatar-fallback.png'
    ];

    avatarSources.forEach((src, index) => {
        const img = new Image();
        img.onload = function() {
            console.log(`Avatar source ${index + 1} preloaded successfully: ${src}`);
        };
        img.onerror = function() {
            console.log(`Avatar source ${index + 1} failed to preload: ${src}`);
        };
        img.src = src;
    });
}

// Avatar visibility management
function showAvatar(img) {
    console.log('Avatar loaded successfully, hiding loading indicator');
    const loadingIndicator = document.getElementById('avatar-loading');

    // Ensure image is visible
    img.classList.remove('loading');
    img.style.opacity = '1';
    img.style.display = 'block';

    // Hide loading indicator
    if (loadingIndicator) {
        loadingIndicator.classList.add('hidden');
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
        }, 300);
    }
}

function hideAvatar(img) {
    console.log('Hiding avatar, showing loading indicator');
    const loadingIndicator = document.getElementById('avatar-loading');

    // Show loading indicator
    if (loadingIndicator) {
        loadingIndicator.style.display = 'flex';
        loadingIndicator.classList.remove('hidden');
    }

    // Hide image
    img.classList.add('loading');
}

// Call preload on page load
window.addEventListener('load', preloadAvatar);

// Export functions for potential external use
window.NikolaosPortfolio = {
    initThemeSwitcher,
    initEmailProtection,
    initSocialIconFallbacks,
    initAvatarFallbacks,
    handleAvatarError,
    trackEvent,
    validateContactForm,
    loadSkills,
    loadProjects,
    loadExperience,
    loadPublications,
    cacheController,
    forceRefresh: () => CacheController.forceReload(),
    checkForUpdates: () => cacheController.checkForUpdates(),
    clearCache: () => cacheController.clearApplicationCache(),
    detectAdBlocker,
    loadAlternativeIcons,
    preloadAvatar
};

// Make functions globally available for HTML attributes
window.handleAvatarError = handleAvatarError;
window.showAvatar = showAvatar;
window.hideAvatar = hideAvatar;