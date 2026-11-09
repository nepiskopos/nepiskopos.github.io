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
    initMobileAccordion();
});

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Handle desktop navbar toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Handle mobile floating hamburger toggle
    if (mobileNavToggle && mobileMenu) {
        mobileNavToggle.addEventListener('click', function() {
            mobileNavToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Close desktop menu when clicking on a desktop nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking on a mobile nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileNavToggle) mobileNavToggle.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
        });
    });

    // Close menus when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideNavMenu = navMenu && navMenu.contains(e.target);
        const isClickInsideMobileMenu = mobileMenu && mobileMenu.contains(e.target);
        const isClickOnDesktopToggle = navToggle && navToggle.contains(e.target);
        const isClickOnMobileToggle = mobileNavToggle && mobileNavToggle.contains(e.target);

        if (!isClickInsideNavMenu && !isClickOnDesktopToggle) {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        }

        if (!isClickInsideMobileMenu && !isClickOnMobileToggle) {
            if (mobileNavToggle) mobileNavToggle.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
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

// Contact section functionality
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
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (navMenu && navMenu.classList.contains('active')) {
            if (navToggle) navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }

        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (mobileNavToggle) mobileNavToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
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
        'Generative AI & Agents': [
            'LLMs', 'AI Agents', 'LangGraph', 'LangChain', 'RAG', 'Vector Databases', 'Prompt Engineering', 'Azure OpenAI', 'Azure AI Foundry', 'Azure AI Search', 'LLM Evaluation', 'PII Redaction', 'LoRA Fine-tuning', 'Transformers (BERT)', 'NLP (NLTK)'
        ],
        'ML & Data Science': [
            'Deep Learning', 'scikit-learn', 'XGBoost', 'PyTorch', 'TensorFlow / Keras', 'AutoML', 'Federated Learning (Flower)', 'Time-series Forecasting', 'Feature Engineering', 'Statistical Inference', 'Model Validation', 'Geospatial Data (GeoPandas)'
        ],
        'Data & MLOps': [
            'Apache Spark (PySpark)', 'pandas', 'NumPy', 'Power BI', 'Azure Databricks', 'Azure Machine Learning', 'MLflow', 'ETL / ELT', 'PostgreSQL', 'ClickHouse', 'Beautiful Soup'
        ],
        'Engineering & Cloud': [
            'Python', 'SQL', 'C# / .NET', 'Java', 'Scala', 'Microsoft Azure', 'Azure Functions', 'AWS', 'FastAPI', 'REST APIs', 'Docker', 'CI/CD (Azure DevOps)', 'Git', 'Linux', 'Bash'
        ],
        'Security': [
            'Prompt Injection Protection', 'API Security Testing', 'Intrusion Detection'
        ],
        'Client Delivery': [
            'Scoping Workshops', 'Prototyping & Demos', 'Requirements Analysis', 'Stakeholder Management', 'User Training & Handover', 'Mentoring', 'Technical Project Management', 'EU Proposal & Technical Writing'
        ]
    };

    Object.entries(skillCategories).forEach(([category, skills]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';

        const iconMap = {
            'Generative AI & Agents': 'fas fa-brain',
            'ML & Data Science': 'fas fa-chart-line',
            'Data & MLOps': 'fas fa-database',
            'Engineering & Cloud': 'fas fa-cloud',
            'Security': 'fas fa-shield-alt',
            'Client Delivery': 'fas fa-user-tie'
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
            category: 'AI',
            title: 'Governed Analyst Agent',
            description: 'Agent that answers business questions in natural language over a multi-tenant ClickHouse warehouse, with a semantic layer, database-enforced tenant isolation and guarded SQL. A 46-question gold-set evaluation scored 45 correct with no critical failures. Also includes a churn model with out-of-time validation.',
            url: 'https://github.com/nepiskopos/governed-analyst-agent',
            tech: ['Agentic AI', 'ClickHouse', 'Semantic Layer', 'LLM Evaluation']
        },
        {
            category: 'AI',
            title: 'API Information-Disclosure Hunting Agent',
            description: 'Autonomous LLM agent that tests a running OWASP crAPI instance, a deliberately vulnerable API, through a reason-act-observe tool loop and reports information-disclosure flaws: verbose errors, leaked secrets and PII, cross-account data exposure and exposed internal endpoints. Hardened over 25 review passes against the live target, with 39 bugs fixed and 322 tests.',
            url: 'https://github.com/nepiskopos/api-hunting-agent',
            tech: ['AI Agents', 'Tool Calling', 'API Security', 'OWASP']
        },
        {
            category: 'AI',
            title: 'Mackie — Agentic AI Social Media Assistant',
            description: 'LangGraph agent that plans and drafts on-brand social media posts for nonprofits, learns from voice corrections across sessions and isolates each organization\'s data with PostgreSQL row-level security. Runs on any LiteLLM model with fallback between providers. 1,000+ tests and 95% branch coverage in CI, covering prompt injection and SSRF.',
            url: 'https://github.com/nepiskopos/conversational-social-media-agent',
            tech: ['LangGraph', 'Agentic AI', 'LiteLLM', 'Chainlit']
        },
        {
            category: 'AI',
            title: 'LangGraph PII Detector',
            description: 'Agent that detects names, addresses, phone numbers, emails and other personal data in documents, built with LangGraph and Azure OpenAI GPT-4o using a graph-based flow with parallel execution. A simplified public version of a more feature-rich detector built at IBM for the National Bank of Greece.',
            url: 'https://github.com/nepiskopos/langgraph-pii-detector',
            tech: ['LangGraph', 'Azure OpenAI', 'PII Detection', 'Privacy']
        },
        {
            category: 'AI',
            title: 'Document Summarization AI',
            description: 'Document summarization agent built with LangGraph and Azure OpenAI GPT-4o, using a graph-based flow with parallel execution. A simplified public version of work done at IBM for the National Bank of Greece.',
            url: 'https://github.com/nepiskopos/langgraph-document-summarization',
            tech: ['LangGraph', 'Document AI', 'Summarization', 'NLP']
        },
        {
            category: 'AI',
            title: 'Open WebUI Enhancements',
            description: 'Custom tools, functions and pipeline extensions for Open WebUI, focused on prompt engineering, RAG and experimental LLM workflows with Azure OpenAI GPT-4o. Developed at IBM for the National Bank of Greece.',
            url: 'https://github.com/nepiskopos/open-webui-enhancements',
            tech: ['Open WebUI', 'AI Tools', 'Automation', 'Productivity']
        },
        {
            category: 'AI',
            title: 'LLM Fine-tuning with LoRA',
            description: 'End-to-end pipeline for fine-tuning a Qwen3-0.6B chat assistant with LoRA and 4-bit quantization: data exploration and preparation, training with PEFT, and deployment behind a FastAPI web API in CPU and GPU Docker containers.',
            url: 'https://github.com/nepiskopos/llm-finetuning-with-lora',
            tech: ['LLM Fine-tuning', 'LoRA', 'PEFT', 'Model Deployment']
        },
        {
            category: 'AI',
            title: 'Company Classification with LLMs',
            description: 'Data pipeline that queries a SQLite database, prepares and analyzes the data, fine-tunes an LLM classifier for categorizing companies, and evaluates and reports on model performance.',
            url: 'https://github.com/nepiskopos/company_classification_llm',
            tech: ['LLM', 'Fine-tuning', 'Classification', 'Data Pipeline']
        },
        {
            category: 'AI',
            title: 'BERT Word Prediction',
            description: 'API that predicts a masked word giving a sentence a positive sentiment, using BERT masked language modelling and NLTK. Packaged with Docker, with a load-balanced option of Nginx over four backends.',
            url: 'https://github.com/nepiskopos/missing-positive-word-prediction-mlm',
            tech: ['BERT', 'NLTK', 'NLP', 'Sentiment Analysis']
        },
        {
            category: 'AI',
            title: 'Data-to-Text Generation Models Evaluation',
            description: 'Comparison of three natural language generation models (neural-template-gen, TGen, wiki2bio) on the E2E and WikiBio datasets, including bug fixes, porting and retraining; the TGen changes were upstreamed. Co-developed as an MSc final project.',
            url: 'https://github.com/nepiskopos/templates_to_language_evaluation',
            tech: ['NLG', 'PyTorch', 'TensorFlow', 'Docker']
        },
        {
            category: 'AI',
            extra: true,
            title: 'Blocks World Automated Planning',
            description: 'Automated planning for the Blocks World problem using A* search with a misplaced-blocks heuristic, for up to 26 blocks.',
            url: 'https://github.com/nepiskopos/blocks-world',
            tech: ['Automated Planning', 'A* Search', 'Python']
        },
        {
            category: 'ML',
            title: 'Federated Intrusion Detection (IEC 104)',
            description: 'Intrusion detection neural network for a power-grid control protocol (IEC 60870-5-104), trained with federated learning using Flower, with a Dockerized aggregation server and three training clients, so that each site\'s data stays private.',
            url: 'https://github.com/nepiskopos/simple_ids_with_flwr_iec104',
            tech: ['Federated Learning', 'Flower', 'Cybersecurity', 'Neural Networks']
        },
        {
            category: 'ML',
            title: 'Federated Intrusion Detection (TensorFlow Federated)',
            description: 'Intrusion detection neural network for IEC 104 traffic, trained with federated learning using TensorFlow Federated in a Docker Compose setup. The most-starred repository on my profile.',
            url: 'https://github.com/nepiskopos/simple_ids_with_tff',
            tech: ['Federated Learning', 'TensorFlow Federated', 'Cybersecurity', 'Docker']
        },
        {
            category: 'ML',
            title: 'Federated Intrusion Detection (DNP3)',
            description: 'Intrusion detection neural network trained with Flower on the DNP3 Intrusion Detection Dataset, with a preprocessing notebook and a Dockerized aggregation server and three training clients.',
            url: 'https://github.com/nepiskopos/simple_ids_with_flwr_dnp3',
            tech: ['Federated Learning', 'Flower', 'Cybersecurity', 'DNP3']
        },
        {
            category: 'ML',
            title: 'Energy Forecasting AI',
            description: 'Time-series forecasting of active power with ARIMA and Prophet, using electrical and weather data as exogenous regressors, served as an API behind an Nginx load balancer over four Docker containers.',
            url: 'https://github.com/nepiskopos/active-energy-forecast-time-series',
            tech: ['Time Series', 'ARIMA', 'Prophet', 'Forecasting']
        },
        {
            category: 'ML',
            title: 'News Sentiment Analysis',
            description: 'Command-line tool that queries News API for a topic and runs sentiment analysis with a selectable analyzer: NLTK, TextBlob, spaCy or CoreNLP.',
            url: 'https://github.com/nepiskopos/how_the_world_feels',
            tech: ['Sentiment Analysis', 'NLP', 'NLTK', 'spaCy']
        },
        {
            category: 'ML',
            title: 'Face Detection Algorithms Evaluation',
            description: 'Comparison of seven face detectors (OpenCV Haar cascade, OpenCV DNN, HOG with linear SVM, MMOD CNN, MTCNN, YOLOv3 and YOLOv5) on detection time and number of faces found.',
            url: 'https://github.com/nepiskopos/simple_face_detection',
            tech: ['Computer Vision', 'Deep Learning', 'Face Detection']
        },
        {
            category: 'ML',
            title: 'Face Alignment Algorithms Evaluation',
            description: 'Comparison of three face alignment methods (OpenCV Haar cascade eye detection, dlib 5-point landmarks and YOLOv5Face keypoints) on alignment time and number of faces aligned.',
            url: 'https://github.com/nepiskopos/simple_face_alignment',
            tech: ['Computer Vision', 'Face Alignment', 'dlib', 'YOLOv5']
        },
        {
            category: 'ML',
            title: 'Dense vs Convolutional Neural Networks',
            description: 'Comparison of fully connected and convolutional networks for multi-class image classification on MNIST and SVHN, measuring training time, accuracy, log-loss, precision, recall and F1.',
            url: 'https://github.com/nepiskopos/dense-vs-cnn',
            tech: ['Deep Learning', 'CNN', 'TensorFlow', 'Image Classification']
        },
        {
            category: 'ML',
            extra: true,
            title: 'MNIST Neural Network Architecture Study',
            description: 'Fully connected networks on MNIST, comparing ReLU, tanh and logistic activations across 5, 20 and 40 dense layers.',
            url: 'https://github.com/nepiskopos/dnn-mnist-basic',
            tech: ['Deep Learning', 'Neural Networks', 'MNIST']
        },
        {
            category: 'ML',
            extra: true,
            title: 'SVHN CNN Early Stopping Study',
            description: 'Convolutional networks on SVHN, measuring how early-stopping patience affects multi-class classification loss.',
            url: 'https://github.com/nepiskopos/cnn-svhn-basic',
            tech: ['Deep Learning', 'CNN', 'TensorFlow', 'SVHN']
        },
        {
            category: 'ML',
            extra: true,
            title: 'California Housing Regression',
            description: 'Comparison of Linear Regression, Ridge Regression and Neural Network regression on the California Housing dataset.',
            url: 'https://github.com/nepiskopos/california-housing-regression',
            tech: ['Regression', 'Machine Learning', 'Neural Networks']
        },
        {
            category: 'ML',
            extra: true,
            title: 'Texture Classification with GLCM Features',
            description: 'MATLAB texture classification using gray-level co-occurrence features (contrast, homogeneity, energy) with 3-NN and minimum Euclidean distance classifiers.',
            url: 'https://github.com/nepiskopos/image-classification-textural-features',
            tech: ['Pattern Recognition', 'MATLAB', 'Image Classification']
        },
        {
            category: 'ML',
            extra: true,
            title: 'Image Classification with Moment Invariants',
            description: 'MATLAB image classification using Hu moment invariants with 3-NN and minimum Euclidean distance classifiers, tested on noisy images.',
            url: 'https://github.com/nepiskopos/image-classification-moment-invariants',
            tech: ['Pattern Recognition', 'MATLAB', 'Image Classification']
        },
        {
            category: 'Data',
            title: 'Fake Job Posting Detection with Spark',
            description: 'Analysis and detection of fraudulent job ads: Spark and Scala aggregations, PySpark statistics, outlier detection and n-grams, then ten classifiers compared, from Naive Bayes and boosting to a custom deep learning model.',
            url: 'https://github.com/nepiskopos/spark-fraud-detection',
            tech: ['Apache Spark', 'PySpark', 'Scala', 'scikit-learn']
        },
        {
            category: 'Data',
            title: 'Duplicate Question Detection with LSH',
            description: 'Duplicate detection on Quora Question Pairs, comparing brute-force cosine and Jaccard similarity with Locality Sensitive Hashing using SimHash and MinHash.',
            url: 'https://github.com/nepiskopos/duplicate-questions-detection-lsh',
            tech: ['LSH', 'MinHash', 'SimHash', 'NLP']
        },
        {
            category: 'Data',
            title: 'RE-CENT Performance Data Analysis',
            description: 'Data analysis notebooks for evaluating and comparing the systems developed in the RE-CENT project, used in the research behind the IEEE TVT paper listed under Publications.',
            url: 'https://github.com/nepiskopos/recent-data-analysis-set-1',
            tech: ['Data Analysis', 'pandas', 'Matplotlib', 'Evaluation']
        }
    ];

    // Ordered AI, ML, Data, then anything else; unrelated and coursework-level projects sit behind the "Show more" toggle
    const isExtraProject = project => project.extra || project.category === 'Other';

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        if (isExtraProject(project)) {
            projectCard.classList.add('project-card-extra');
            projectCard.hidden = true;
        }
        projectCard.style.animationDelay = `${(index % 12) * 0.1}s`;

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

    const hiddenCount = projects.filter(isExtraProject).length;
    if (hiddenCount <= 0) return;

    const toggleWrapper = document.createElement('div');
    toggleWrapper.className = 'timeline-toggle';
    toggleWrapper.innerHTML = `
        <button type="button" class="btn btn-secondary" id="projects-toggle" aria-expanded="false" aria-controls="projects-grid">
            <span class="timeline-toggle-label">Show ${hiddenCount} more</span>
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
        </button>
    `;
    projectsGrid.after(toggleWrapper);

    const toggleButton = toggleWrapper.querySelector('button');
    toggleButton.addEventListener('click', () => {
        const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
        projectsGrid.querySelectorAll('.project-card-extra').forEach(card => {
            card.hidden = expanded;
        });
        toggleButton.setAttribute('aria-expanded', String(!expanded));
        toggleButton.querySelector('.timeline-toggle-label').textContent = expanded ? `Show ${hiddenCount} more` : 'Show less';
        toggleButton.querySelector('i').className = expanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        if (expanded) {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Load Experience Timeline from Work_Projects.txt
function loadExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    const experiences = [
        {
            title: 'Senior ML Engineer & AI Consultant',
            company: 'Grant Thornton Greece',
            period: 'Jan 2026 - Present',
            type: 'Full-time Role',
            description: 'Scoped and built agentic AI and RAG solutions on Azure AI Foundry for a banking client and Greece\'s tax authority (IAPR), from business goals to production. Ran MLOps pipelines on Azure Databricks for model packaging, versioning, registration, tracking, drift monitoring, retraining and serving, and engineered PySpark ETL/ELT pipelines using the Medallion architecture.'
        },
        {
            title: 'Data and AI Driven Tax Audits',
            company: 'Grant Thornton Greece',
            period: 'Jan 2026 - Present',
            type: 'Client Project',
            description: 'Co-developed ML and deep learning models for IAPR that selected high-risk businesses for audits, targeted debt collection and detected fraud networks. Deployed the models and their user interfaces as Databricks web apps through Azure DevOps CI/CD pipelines, and trained IAPR staff.'
        },
        {
            title: 'Automated Information Retrieval & Extraction for Greek Public Funding Programs',
            company: 'Grant Thornton Greece',
            period: 'Feb 2026 - Present',
            type: 'Client Project',
            description: 'Built an AI agent that crawled Greek funding portals for a bank\'s corporate clients and used chained LLM prompts to turn each program\'s legal PDFs into structured JSON.'
        },
        {
            title: 'FINCARE - ML-Driven Anomaly & Intrusion Detection',
            company: 'Grant Thornton Greece',
            period: 'Jan 2026 - Jun 2026',
            type: 'Cybersecurity Project',
            description: 'Designed and developed data and Machine Learning driven anomaly and intrusion detection systems for cybersecurity.'
        },
        {
            title: 'AI Consultant & Software Developer',
            company: 'BWG Global (United States, remote)',
            period: 'Nov 2025 - Dec 2025',
            type: 'Freelance Contract',
            description: 'Designed Azure AI Search indexes and indexers to improve search relevance and information retrieval. Built serverless Python applications on Azure Functions for an add-on to conference software, and advised the client\'s US-based team on choosing a technology stack that fit their long-term business goals.'
        },
        {
            title: 'Senior Software Engineering Consultant',
            company: 'EETAA',
            period: 'Feb 2025 - Present',
            type: 'Consulting Role',
            description: 'Developed and secured external-facing REST APIs that give third-party entities compliant access to sensitive information systems used in public tenders. Extended web applications and services to support newer and more complex tenders, refactored the services architecture to reduce system overhead, and migrated legacy services to modern frameworks.'
        },
        {
            title: 'AI Engineer & AI Consultant',
            company: 'IBM (for the National Bank of Greece)',
            period: 'Jan 2025 - Dec 2025',
            type: 'Full-time Role',
            description: 'Co-built NBG-GPT (staff assistant) and Sophia (customer assistant), the National Bank of Greece\'s main LLM chatbots; Sophia now handles about 25% of customer inquiries, around 200,000 chats a month. Led development of 10+ LLM chatbots and agents with RAG on Azure AI Search, deployed as containerized Azure web apps via Azure DevOps CI/CD. Implemented LangGraph routers between agents, built PII redaction and LLM evaluation checks, and created the integration functions that became the standard for connecting NBG-GPT backends to third-party APIs. Owned use cases end-to-end on-site with business units, from scoping workshop to production within weeks.'
        },
        {
            title: 'Open Source Software Developer',
            company: 'Self-employed',
            period: 'Dec 2020 - Present',
            type: 'Ongoing',
            description: 'Develop and maintain a portfolio of open-source projects on GitHub focused on agentic AI, LLM systems and federated learning, and contribute bug fixes, features and documentation to open-source projects.'
        },
        {
            title: 'Data Scientist & Technical Project Manager, R&D',
            company: 'INLECOM',
            period: 'Sep 2023 - Dec 2024',
            type: 'Full-time Role',
            description: 'Worked on Horizon Europe R&D projects. Cut the overall resource overhead of a public-transport data pipeline, including its route-tracing algorithm, by more than 75%, and wrote technical sections of successful EU funding proposals.'
        },
        {
            title: 'AI and Distributed Ledger Convergence',
            company: 'INLECOM',
            period: 'Mar 2024 - Dec 2024',
            type: 'In-house Project',
            description: 'Led an in-house project that combined data science with smart contracts to reward useful contributions to machine learning research.'
        },
        {
            title: 'CONNECTOR - Synthetic Data for Customs and Border Security',
            company: 'INLECOM',
            period: 'Apr 2024 - Dec 2024',
            type: 'Horizon Europe Project',
            gaId: 'GA ID: 101121271',
            description: 'Led the generation of privacy-preserving synthetic datasets for fraud and illegal-activity detection, including the SIAP maritime vessel risk dataset published in Data in Brief.'
        },
        {
            title: 'EMERALDS - Urban Mobility Data Analytics',
            company: 'INLECOM',
            period: 'Mar 2024 - Dec 2024',
            type: 'Horizon Europe Project',
            gaId: 'GA ID: 101093051',
            description: 'Worked on urban mobility data pipelines and geospatial analysis for public transport passenger flow and route planning.'
        },
        {
            title: 'CRM-geothermal - AI Tool for Critical Raw Materials',
            company: 'INLECOM',
            period: 'Sep 2023 - Dec 2024',
            type: 'Horizon Europe Project',
            gaId: 'GA ID: 101058163',
            description: 'Co-designed and, as sole developer, built the AI tool for Critical Raw Materials, which estimates lithium concentration in underground brines to support exploration: explainable ML models, data pipelines and a web interface, deployed through CI/CD.'
        },
        {
            title: 'Data Scientist & Software Developer, R&D',
            company: 'MetaMind Innovations',
            period: 'Sep 2022 - Aug 2023',
            type: 'Full-time Role',
            description: 'Built a Federated Learning Security Toolkit for intrusion detection (Flower, FedTree, TensorFlow, Docker). Developed federated edge AI intrusion and anomaly detection models for EV charging stations with Greece\'s Public Power Corporation (PPC). Co-authored a survey of federated intrusion detection systems in Computer Science Review, and mentored junior engineers.'
        },
        {
            title: 'ELECTRON - Energy Infrastructure Cybersecurity',
            company: 'MetaMind Innovations',
            period: 'Feb 2023 - Aug 2023',
            type: 'Horizon 2020 Project',
            gaId: 'GA ID: 101021936',
            description: 'Developed privacy-preserving anomaly detection with Federated Learning to protect energy infrastructure against cyber-attacks.'
        },
        {
            title: 'DYNABIC - Resilience of Critical Services',
            company: 'MetaMind Innovations',
            period: 'Jan 2023 - Aug 2023',
            type: 'Horizon Europe Project',
            gaId: 'GA ID: 101070455',
            description: 'Applied privacy-preserving Federated Learning to cybersecurity for the business continuity of European critical services.'
        },
        {
            title: 'TERMINET - Next-Generation IoT',
            company: 'MetaMind Innovations',
            period: 'Dec 2022 - Aug 2023',
            type: 'Horizon 2020 Project',
            gaId: 'GA ID: 957406',
            description: 'Implemented Federated Learning solutions for next-generation IoT deployments.'
        },
        {
            title: 'AI4CYBER - Trustworthy AI for Cybersecurity',
            company: 'MetaMind Innovations',
            period: 'Sep 2022 - Aug 2023',
            type: 'Horizon Europe Project',
            gaId: 'GA ID: 101070450',
            description: 'Developed privacy-preserving Federated Learning for distributed threat detection within a trustworthy AI cybersecurity framework.'
        },
        {
            title: 'Data Scientist & Software Developer, R&D',
            company: 'Fogus Innovations and Services',
            period: 'May 2019 - Aug 2022',
            type: 'Full-time Role',
            description: 'Designed a system that optimized video streaming between nearby devices at the network edge, using caching, DASH adaptive streaming, blockchain and smart contracts, and led its performance evaluation (acknowledged in an IEEE Transactions on Vehicular Technology paper, 2024). Built a 4G (LTE) testbed with OpenAirInterface and USRP software-defined radios, ran an OpenStack private cloud, and taught ns-3 network simulation to early-stage researchers. Earlier intern (May - Aug 2018), building an in-house Android application.'
        },
        {
            title: 'OPTIMIST - Personalized Video Delivery in 5G',
            company: 'Fogus Innovations',
            period: 'Jun 2021 - Jul 2022',
            type: 'Horizon 2020 Project',
            gaId: 'GA ID: 872866',
            description: 'Developed RESTful services for traffic management and content placement in personalized video delivery over 5G networks.'
        },
        {
            title: 'INCOGNITO - Privacy-Preserving Digital Identity',
            company: 'Fogus Innovations',
            period: 'Jun 2020 - Jun 2021',
            type: 'Horizon 2020 Project',
            gaId: 'GA ID: 824015',
            description: 'Worked on GDPR-compliant digital identity management across web and mobile platforms.'
        },
        {
            title: 'RE-CENT - Decentralized Video Content Sharing',
            company: 'Fogus Innovations',
            period: 'May 2019 - Jan 2021',
            type: 'Greek National Project',
            gaId: 'GA ID: Τ1ΕΔΚ-03524',
            description: 'Built private LTE networks with edge caching and peer-to-peer video sharing integrated with Ethereum-based payments.'
        },
        {
            title: 'SECONDO - Cybersecurity Investment and Cyber Insurance',
            company: 'Fogus Innovations',
            period: 'Jun 2019 - Jun 2020',
            type: 'Horizon 2020 Project',
            gaId: 'GA ID: 823997',
            description: 'Integrated assessment modules into a platform for cybersecurity investment and cyber insurance decisions, and co-authored the SECONDO paper (TrustBus 2020).'
        },
        {
            title: 'CROSSFIRE - Video Streaming over 4G and 5G',
            company: 'National & Kapodistrian University of Athens',
            period: 'Sep 2018 - Dec 2018',
            type: 'FP7 People Project',
            gaId: 'GA ID: 317126',
            description: 'Improved video streaming quality of experience over 4G and 5G networks and built Android streaming applications.'
        },
        {
            title: 'Earlier Experience',
            company: 'Athens, Greece',
            period: 'Sep 2016 - Aug 2018',
            type: 'IT Specialist',
            description: 'Deployed and customized OpenEMR (electronic health records) on a LAMP stack for an ophthalmology practice.'
        }
    ];

    // Only the most recent entries are shown initially; the rest sit behind a "Show more" toggle
    const visibleCount = 8;

    experiences.forEach((experience, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        if (index >= visibleCount) {
            timelineItem.classList.add('timeline-item-extra');
            timelineItem.hidden = true;
        }
        timelineItem.style.animationDelay = `${(index % visibleCount) * 0.2}s`;

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

    const hiddenCount = experiences.length - visibleCount;
    if (hiddenCount <= 0) return;

    const toggleWrapper = document.createElement('div');
    toggleWrapper.className = 'timeline-toggle';
    toggleWrapper.innerHTML = `
        <button type="button" class="btn btn-secondary" id="experience-toggle" aria-expanded="false" aria-controls="experience-timeline">
            <span class="timeline-toggle-label">Show ${hiddenCount} more</span>
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
        </button>
    `;
    timeline.after(toggleWrapper);

    const toggleButton = toggleWrapper.querySelector('button');
    toggleButton.addEventListener('click', () => {
        const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
        timeline.querySelectorAll('.timeline-item-extra').forEach(item => {
            item.hidden = expanded;
        });
        toggleButton.setAttribute('aria-expanded', String(!expanded));
        toggleButton.querySelector('.timeline-toggle-label').textContent = expanded ? `Show ${hiddenCount} more` : 'Show less';
        toggleButton.querySelector('i').className = expanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        if (expanded) {
            document.getElementById('experience').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Load Publications from Publications.txt
function loadPublications() {
    const publicationsGrid = document.getElementById('publications-grid');
    if (!publicationsGrid) return;

    const publications = [
        {
            title: 'SIAP: Synthetic Dataset for Maritime Vessel Risk Profiling and Illegal Activity Prediction',
            date: 'December 2025',
            venue: 'Data in Brief',
            url: 'https://doi.org/10.1016/j.dib.2025.112101',
            description: 'Comprehensive dataset with 100,000 synthetically generated vessel profiles for training machine learning models to identify vessels with high likelihood of engaging in illegal maritime activities. Features crew criminal records, abnormal routing, inspection history, and cargo characteristics.'
        },
        {
            title: 'SIAP Dataset — Synthetic Vessel Risk Profiles (Zenodo Release)',
            date: 'July 2025',
            venue: 'Zenodo',
            url: 'https://zenodo.org/doi/10.5281/zenodo.16631284',
            description: 'Open-access dataset release accompanying the SIAP research, published on Zenodo for reproducibility and reuse by the maritime security and illegal-activity detection research community.'
        },
        {
            title: 'A Comprehensive Survey of Federated Intrusion Detection Systems: Techniques, Challenges and Solutions',
            date: 'May 2025',
            venue: 'Computer Science Review',
            url: 'https://doi.org/10.1016/j.cosrev.2024.100717',
            description: 'Comprehensive survey of federated intrusion detection techniques, challenges, and solutions across IoT, IIoT, healthcare systems, smart manufacturing, and SCADA systems. Covers latest ML/DL frameworks and implementation strategies.'
        },
        {
            title: 'CRM-geothermal Deliverable 1.4: AI-based Simulation Module',
            date: 'April 2025',
            venue: 'Zenodo (Horizon Europe CRM-geothermal Project)',
            url: 'https://zenodo.org/doi/10.5281/zenodo.15294879',
            description: 'AI tool for uncovering intricate relationships between elemental features and Lithium concentrations in geothermal waters, integrating geological insights with advanced Machine Learning techniques for sustainable resource extraction.'
        },
        {
            title: 'To DASH, or Not to DASH? Optimal Video Bitrate Selection and Edge Network Caching in MEC-Empowered Slice-Enabled Networks',
            date: 'April 2024',
            venue: 'IEEE Transactions on Vehicular Technology (acknowledged contributor)',
            url: 'https://doi.org/10.1109/TVT.2023.3329662',
            description: 'Single-author paper by D. Xenakis on joint video bitrate selection and edge network caching in 5G networks. I am acknowledged in the paper because I carried out its experimental work: setting up the experiments, developing and running the software, and collecting and analyzing the data to identify problems in the design and the need for algorithmic optimization, and producing the final results.'
        },
        {
            title: 'SECONDO: A Platform for Cybersecurity Investments and Cyber Insurance Decisions',
            date: 'September 2020',
            venue: 'TrustBus 2020 Conference',
            url: 'https://doi.org/10.1007/978-3-030-58986-8_5',
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
            ${publication.url ? `<a href="${publication.url}" target="_blank" rel="noopener noreferrer" class="publication-link">View Publication <i class="fas fa-external-link-alt" aria-hidden="true"></i></a>` : ''}
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

// Advanced Icon Fallback System: Inline SVG → External SVG → Text
function initSocialIconFallbacks() {
    // Initialize multi-layer icon fallback system

    // Monitor for potential SVG blocking (inline SVGs can be blocked too)
    monitorInlineSVGBlocking();

    // Monitor external backup images
    monitorExternalBackupImages();

    // Aggressive blocking detection
    setTimeout(() => {
        checkForAdBlockerInterference();
    }, 1500);


}

function monitorInlineSVGBlocking() {
    // Check if inline SVGs are being hidden or blocked
    const inlineSVGs = document.querySelectorAll('.nav-icon, .nav-icon.large');



    inlineSVGs.forEach((svg, index) => {
        // Backups are hidden by default via CSS, no need to manually hide them


        // Monitor for style changes that might indicate blocking
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const computedStyle = getComputedStyle(svg);
                    if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {

                        activateExternalBackup(svg);
                    }
                }
            });
        });

        observer.observe(svg, { attributes: true, attributeFilter: ['style', 'class'] });

        // Initial check - be more careful to avoid false positives
        setTimeout(() => {
            const computedStyle = getComputedStyle(svg);
            const parentLink = svg.closest('a');
            const parentVisible = parentLink ? getComputedStyle(parentLink).display !== 'none' : true;

            // Only consider it blocked if the SVG itself is hidden but its parent is visible
            if (parentVisible && (computedStyle.display === 'none' || computedStyle.visibility === 'hidden' || svg.offsetWidth === 0)) {

                activateExternalBackup(svg);
            } else {

            }
        }, 500);
    });
}

function activateExternalBackup(inlineSvg) {
    const backupImg = inlineSvg.nextElementSibling;
    if (backupImg && backupImg.classList.contains('nav-icon-backup')) {
        inlineSvg.style.display = 'none';
        backupImg.classList.add('backup-active');

    }
}

function monitorExternalBackupImages() {
    const backupImages = document.querySelectorAll('.nav-icon-backup');

    backupImages.forEach(img => {
        img.addEventListener('error', function() {

            activateTextBackup(this);
        });

        // Check loading status
        if (!img.complete || img.naturalWidth === 0) {
            setTimeout(() => {
                if (!img.complete || img.naturalWidth === 0) {
                    activateTextBackup(img);
                }
            }, 1000);
        }
    });
}

function activateTextBackup(element) {

    element.style.display = 'none';

    // Find the text backup (could be next sibling or a few siblings away)
    let sibling = element.nextElementSibling;
    while (sibling) {
        if (sibling.classList && (sibling.classList.contains('text-backup') || sibling.classList.contains('text-fallback'))) {
            sibling.style.display = 'inline-block';

            break;
        }
        sibling = sibling.nextElementSibling;
    }
}

function checkForAdBlockerInterference() {
    // Check only primary icons (SVG) for blocking, not backup icons which are intentionally hidden
    const primaryIcons = document.querySelectorAll('.nav-icon:not(.nav-icon-backup), .social-icon:not(.nav-icon-backup)');
    let blockedCount = 0;

    primaryIcons.forEach(icon => {
        const computedStyle = getComputedStyle(icon);
        const isBlocked = computedStyle.display === 'none' ||
                         computedStyle.visibility === 'hidden' ||
                         icon.offsetWidth === 0;

        if (isBlocked) {
            blockedCount++;
            if (icon.tagName === 'svg') {
                activateExternalBackup(icon);
            }
        }
    });

    // Also check backup images that should be active but failing to load
    const activeBackups = document.querySelectorAll('.nav-icon-backup.backup-active');
    activeBackups.forEach(img => {
        if (img.tagName === 'IMG' && (!img.complete || img.naturalWidth === 0)) {
            blockedCount++;
            activateTextBackup(img);
        }
    });

    if (blockedCount > 0) {

    } else {

    }
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

// Enhanced element visibility detection
function checkIfElementHidden(element) {
    if (!element) return true;

    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);

    return (
        rect.width === 0 ||
        rect.height === 0 ||
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.opacity === '0' ||
        rect.x < -9999 ||
        rect.y < -9999 ||
        element.offsetParent === null
    );
}

// Activate comprehensive fallback system
function activateAllFallbacks(link) {
    // Hide potentially blocked SVG
    const svg = link.querySelector('.social-svg');
    if (svg) {
        svg.style.display = 'none';
    }

    // Determine platform
    let platform = '';
    if (link.href.includes('github')) platform = 'github';
    else if (link.href.includes('linkedin')) platform = 'linkedin';
    else if (link.href.includes('orcid')) platform = 'orcid';

    // Create multiple fallback elements
    createEmojiIcon(link, platform);
    createTextIcon(link, platform);
    createUnicodeIcon(link, platform);

    // Add multiple protection classes
    link.classList.add('fallback-active', 'anti-block', 'social-secure');
}

// Create emoji-based icon
function createEmojiIcon(link, platform) {
    const emojiMap = { github: '⚡', linkedin: '💼', orcid: '🆔' };
    const emoji = emojiMap[platform];

    if (emoji) {
        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = emoji;
        emojiSpan.className = 'emoji-icon backup-icon';
        emojiSpan.style.cssText = `
            display: inline-block;
            font-size: 1.2rem;
            position: relative;
            z-index: 1000;
        `;
        link.appendChild(emojiSpan);
    }
}

// Create text-based icon
function createTextIcon(link, platform) {
    const textMap = { github: 'GH', linkedin: 'LI', orcid: 'OR' };
    const text = textMap[platform];

    if (text) {
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        textSpan.className = 'text-icon backup-icon';
        textSpan.style.cssText = `
            display: inline-block;
            font-size: 0.9rem;
            font-weight: bold;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1001;
            color: currentColor;
        `;
        link.appendChild(textSpan);
    }
}

// Create Unicode symbol icon
function createUnicodeIcon(link, platform) {
    const unicodeMap = {
        github: '■', // Solid square
        linkedin: '●', // Solid circle
        orcid: '◆' // Diamond
    };
    const unicode = unicodeMap[platform];

    if (unicode) {
        const unicodeSpan = document.createElement('span');
        unicodeSpan.textContent = unicode;
        unicodeSpan.className = 'unicode-icon backup-icon';
        unicodeSpan.style.cssText = `
            display: inline-block;
            font-size: 1.1rem;
            position: relative;
            z-index: 999;
            color: currentColor;
        `;
        link.appendChild(unicodeSpan);
    }
}

// Continuous monitoring for dynamic ad blocking
function startContinuousMonitoring() {
    let checkCount = 0;
    const maxChecks = 10;

    const monitor = setInterval(() => {
        checkCount++;

        const socialLinks = document.querySelectorAll('.nav-social-link, .social-link');
        socialLinks.forEach(link => {
            if (checkIfElementHidden(link)) {
                // Re-apply protection
                link.style.setProperty('display', 'flex', 'important');
                link.style.setProperty('visibility', 'visible', 'important');
                link.style.setProperty('opacity', '1', 'important');

                // Ensure fallbacks are active
                if (!link.classList.contains('fallback-active')) {
                    activateAllFallbacks(link);
                }
            }
        });

        if (checkCount >= maxChecks) {
            clearInterval(monitor);
        }
    }, 1000);
}

// Advanced ad blocker detection
function detectAdBlocker() {
    return new Promise((resolve) => {
        // Create test elements with patterns that ad blockers target
        const testElements = [
            { class: 'social-media-icon', content: '<div class="fab fa-facebook"></div>' },
            { class: 'social-widget', content: '<a href="https://facebook.com">Facebook</a>' },
            { class: 'social-button', content: '<svg><path d="M12 0"></path></svg>' }
        ];

        let blockedCount = 0;
        const totalTests = testElements.length;

        testElements.forEach((test, index) => {
            const testDiv = document.createElement('div');
            testDiv.className = test.class;
            testDiv.innerHTML = test.content;
            testDiv.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;';
            document.body.appendChild(testDiv);

            setTimeout(() => {
                const isBlocked = checkIfElementHidden(testDiv);
                if (isBlocked) blockedCount++;

                document.body.removeChild(testDiv);

                if (index === totalTests - 1) {
                    resolve(blockedCount > 0);
                }
            }, 100);
        });
    });
}

// Alternative icon loading approach
function loadAlternativeIcons() {
    const links = document.querySelectorAll('.nav-social-link');

    links.forEach(link => {
        // Add multiple fallback systems simultaneously
        let platform = '';
        if (link.href.includes('github')) platform = 'github';
        else if (link.href.includes('linkedin')) platform = 'linkedin';
        else if (link.href.includes('orcid')) platform = 'orcid';

        if (platform) {
            createEmojiIcon(link, platform);
            createTextIcon(link, platform);
            createUnicodeIcon(link, platform);
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

            fallbackTriggered = true;
            handleAvatarError(avatarImg);
        }
    }, 5000);

    // Monitor successful loading
    avatarImg.addEventListener('load', function() {

        clearTimeout(loadingTimeout);
        if (isImageLoaded(this)) {
            fallbackTriggered = false;
            showAvatar(this);
        }
    });

    // Monitor errors
    avatarImg.addEventListener('error', function() {

        clearTimeout(loadingTimeout);
        if (!fallbackTriggered) {
            fallbackTriggered = true;
            handleAvatarError(this);
        }
    });

    // Initial check if image is already loaded
    if (isImageLoaded(avatarImg)) {

        clearTimeout(loadingTimeout);
        showAvatar(avatarImg);
    }
}

// Enhanced Global avatar error handler function
function handleAvatarError(img) {


    // Prevent infinite loops by tracking attempts
    if (!img.dataset.fallbackAttempts) {
        img.dataset.fallbackAttempts = '0';
    }

    const attempts = parseInt(img.dataset.fallbackAttempts);
    img.dataset.fallbackAttempts = (attempts + 1).toString();

    // If too many attempts, go straight to CSS fallback
    if (attempts >= 3) {

        createCSSAvatar(img);
        return;
    }

    // Remove any existing error handlers to prevent conflicts
    img.onerror = null;

    // Determine next fallback based on current src
    if (img.src.includes('avatars.githubusercontent.com') || (!img.src.includes('avatar-fallback'))) {

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

                handleAvatarError(this);
            }
        };

        img.onload = function() {
            errorHandled = true;
            clearTimeout(errorTimeout);

            showAvatar(this);
        };

    } else if (img.src.includes('avatar-fallback.svg')) {

        createCSSAvatar(img);

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

                createCSSAvatar(this);
            }
        };

        img.onload = function() {
            errorHandled = true;
            clearTimeout(errorTimeout);

            showAvatar(this);
        };

    } else {
        // Final fallback - CSS-based avatar

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


}

// Enhanced avatar preloading with multiple sources
function preloadAvatar() {
    const avatarSources = [
        'https://avatars.githubusercontent.com/u/58558195?v=4',
        'assets/img/avatar-fallback.svg'
    ];

    avatarSources.forEach((src, index) => {
        const img = new Image();
        img.onload = function() {

        };
        img.onerror = function() {

        };
        img.src = src;
    });
}

// Avatar visibility management
function showAvatar(img) {

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
    loadSkills,
    loadProjects,
    loadExperience,
    loadPublications,
    detectAdBlocker,
    loadAlternativeIcons,
    preloadAvatar,
    // Manual triggers for testing anti-ad-blocker systems
    deploySimpleFallbacks: deploySimpleFallbacks,
    checkFallbacks: checkAndActivateFallbacks,
    createBackups: () => {
        document.querySelectorAll('.nav-social-link').forEach(createBackupFallback);
    },
    activateNuclearFallback: activateNuclearCSSFallback,
    // Test function to simulate blocking
    simulateBlocking: () => {
        document.querySelectorAll('.social-svg').forEach(svg => {
            svg.style.display = 'none';
        });
        setTimeout(checkAndActivateFallbacks, 100);
    },
    // Legacy functions for backward compatibility
    rebuildSocialIcons: rebuildSocialIconsCompletely,
    detectBlocked: detectAndRecreateBlockedIcons
};

// Make functions globally available for HTML attributes
window.handleAvatarError = handleAvatarError;
window.showAvatar = showAvatar;
window.hideAvatar = hideAvatar;

// Nuclear Option: Completely rebuild social icons dynamically
function rebuildSocialIconsCompletely() {
    const navSocial = document.querySelector('.nav-social');
    if (!navSocial) return;



    // Store original data
    const platforms = [
        { name: 'github', url: 'https://github.com/nepiskopos', symbol: '⚡', text: 'GH', label: 'GitHub' },
        { name: 'linkedin', url: 'https://linkedin.com/in/nepiskopos', symbol: '💼', text: 'LI', label: 'LinkedIn' },
        { name: 'orcid', url: 'https://orcid.org/0009-0004-7130-3874', symbol: '🆔', text: 'OR', label: 'ORCID' }
    ];

    // Clear existing content
    navSocial.innerHTML = '';

    // Generate random class names to evade detection
    const randomId = Date.now().toString(36) + Math.random().toString(36).substr(2);

    platforms.forEach((platform, index) => {
        // Create container with randomized classes
        const container = document.createElement('a');
        const containerClass = `link-${randomId}-${index}`;
        const iconClass = `icon-${randomId}-${index}`;

        container.href = platform.url;
        container.target = '_blank';
        container.rel = 'noopener noreferrer';
        container.className = containerClass;
        container.setAttribute('aria-label', `Visit ${platform.label} profile`);
        container.setAttribute('data-p', platform.name);

        // Apply styles directly to bypass CSS detection
        const baseStyles = `
            display: flex !important;
            align-items: center;
            justify-content: center;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 0.5rem;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            text-decoration: none;
            transition: all 0.2s ease;
            border: 1px solid var(--border-color);
            position: relative;
            overflow: hidden;
            visibility: visible !important;
            opacity: 1 !important;
            margin: 0 0.375rem;
        `;

        container.style.cssText = baseStyles;

        // Create multiple icon layers for redundancy
        createMultipleIconLayers(container, platform, iconClass);

        // Add dynamic hover effects
        addDynamicHoverEffects(container, platform.name);

        navSocial.appendChild(container);
    });

    // Apply additional protection
    applyDynamicProtection(navSocial);
}

function createMultipleIconLayers(container, platform, iconClass) {
    // Layer 1: Dynamic SVG creation
    createDynamicSVG(container, platform);

    // Layer 2: Text-based icon
    const textIcon = document.createElement('span');
    textIcon.textContent = platform.text;
    textIcon.className = `${iconClass}-text`;
    textIcon.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 0.9rem;
        display: none;
        z-index: 1000;
        color: currentColor;
    `;
    container.appendChild(textIcon);

    // Layer 3: Emoji fallback
    const emojiIcon = document.createElement('span');
    emojiIcon.textContent = platform.symbol;
    emojiIcon.className = `${iconClass}-emoji`;
    emojiIcon.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.2rem;
        display: none;
        z-index: 999;
    `;
    container.appendChild(emojiIcon);

    // Layer 4: Unicode fallback
    const unicodeMap = { github: '■', linkedin: '●', orcid: '◆' };
    const unicodeIcon = document.createElement('span');
    unicodeIcon.textContent = unicodeMap[platform.name] || '●';
    unicodeIcon.className = `${iconClass}-unicode`;
    unicodeIcon.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.1rem;
        display: none;
        z-index: 998;
    `;
    container.appendChild(unicodeIcon);
}

function createDynamicSVG(container, platform) {
    const svgPaths = {
        github: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
        linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
        orcid: "M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.588-1.437 3.588-3.722 0-2.016-1.247-3.722-3.588-3.722h-2.297z"
    };

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    svg.style.cssText = `
        width: 1.2rem;
        height: 1.2rem;
        display: inline-block;
        transition: all 0.2s ease;
        z-index: 1001;
        position: relative;
    `;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', svgPaths[platform.name]);

    svg.appendChild(path);
    container.appendChild(svg);
}

function addDynamicHoverEffects(container, platformName) {
    const hoverColors = {
        github: '#24292e',
        linkedin: '#0077b5',
        orcid: '#a6ce39'
    };

    container.addEventListener('mouseenter', function() {
        this.style.backgroundColor = hoverColors[platformName];
        this.style.color = 'white';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    });

    container.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--bg-tertiary)';
        this.style.color = 'var(--text-primary)';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
}

function detectAndRecreateBlockedIcons() {
    const socialContainer = document.querySelector('.nav-social');
    if (!socialContainer) return;

    const links = socialContainer.querySelectorAll('a');
    let hasVisibleIcons = false;

    links.forEach(link => {
        const rect = link.getBoundingClientRect();
        const style = getComputedStyle(link);

        const isVisible = (
            rect.width > 0 &&
            rect.height > 0 &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0'
        );

        if (isVisible) {
            hasVisibleIcons = true;

            // Check individual icon layers
            const svg = link.querySelector('svg');
            const textIcon = link.querySelector('[class*="-text"]');
            const emojiIcon = link.querySelector('[class*="-emoji"]');

            if (svg && checkIfElementHidden(svg)) {
                // SVG is blocked, show text fallback
                if (textIcon) textIcon.style.display = 'inline-block';
                if (emojiIcon) emojiIcon.style.display = 'inline-block';
            }
        } else {
            // Link itself is blocked, force visibility
            link.style.setProperty('display', 'flex', 'important');
            link.style.setProperty('visibility', 'visible', 'important');
            link.style.setProperty('opacity', '1', 'important');
        }
    });

    // If no icons are visible at all, trigger complete rebuild
    if (!hasVisibleIcons) {

        rebuildSocialIconsCompletely();

        // Also trigger nuclear CSS fallback as absolute last resort
        setTimeout(() => activateNuclearCSSFallback(), 1000);
    }
}

function startAggressiveMonitoring() {
    let checkCount = 0;
    const maxChecks = 20;

    const aggressiveMonitor = setInterval(() => {
        checkCount++;

        // Randomize check timing to avoid detection
        const randomDelay = Math.random() * 500 + 500;

        setTimeout(() => {
            detectAndRecreateBlockedIcons();

            // Apply random style variations to evade detection
            const socialLinks = document.querySelectorAll('.nav-social a');
            socialLinks.forEach(link => {
                const randomVar = Math.random() * 0.01;
                link.style.transform = `scale(${1 + randomVar})`;
            });
        }, randomDelay);

        if (checkCount >= maxChecks) {
            clearInterval(aggressiveMonitor);
        }
    }, 1000);
}

function applyDynamicProtection(container) {
    // Create multiple MutationObservers to detect and counter blocking
    const observer1 = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                const target = mutation.target;
                if (target.style.display === 'none' || target.style.visibility === 'hidden') {
                    target.style.setProperty('display', 'flex', 'important');
                    target.style.setProperty('visibility', 'visible', 'important');
                    target.style.setProperty('opacity', '1', 'important');
                }
            }
        });
    });

    // Monitor the container and all children
    observer1.observe(container, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class']
    });

    // Set up removal protection
    const observer2 = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {

                setTimeout(() => rebuildSocialIconsCompletely(), 100);
            }
        });
    });

    observer2.observe(container.parentNode, {
        childList: true,
        subtree: true
    });
}

// Enhanced fallback deployment with better uBlock Origin detection
function deploySimpleFallbacks() {
    const socialLinks = document.querySelectorAll('.nav-social-link');

    socialLinks.forEach(link => {
        // Force visibility with maximum specificity
        link.style.setProperty('visibility', 'visible', 'important');
        link.style.setProperty('opacity', '1', 'important');
        link.style.setProperty('display', 'flex', 'important');
        link.style.setProperty('position', 'relative', 'important');

        // Ensure fallback elements are ready
        const svg = link.querySelector('.social-svg');
        const fallback = link.querySelector('.platform-fallback');

        if (svg && fallback) {
            // Set up fallback with proper styling
            fallback.style.setProperty('position', 'absolute', 'important');
            fallback.style.setProperty('top', '50%', 'important');
            fallback.style.setProperty('left', '50%', 'important');
            fallback.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
            fallback.style.setProperty('font-size', '1.2rem', 'important');
            fallback.style.setProperty('z-index', '1000', 'important');
            fallback.style.setProperty('display', 'none', 'important');
            fallback.style.setProperty('pointer-events', 'none', 'important');
        }
    });
}

// Removed complex functions that were causing infinite loops

function checkAndActivateFallbacks() {
    const socialLinks = document.querySelectorAll('.nav-social-link');

    socialLinks.forEach(link => {
        const svg = link.querySelector('.social-svg');
        const fallback = link.querySelector('.platform-fallback');

        if (svg && fallback) {
            // Multiple detection methods for uBlock Origin
            const rect = svg.getBoundingClientRect();
            const style = getComputedStyle(svg);
            const linkRect = link.getBoundingClientRect();
            const linkStyle = getComputedStyle(link);

            // Check if SVG or entire link is hidden by uBlock Origin
            const svgBlocked = (
                rect.width === 0 || rect.height === 0 ||
                style.display === 'none' ||
                style.visibility === 'hidden' ||
                style.opacity === '0' ||
                rect.x < -9999 || rect.y < -9999
            );

            const linkBlocked = (
                linkRect.width === 0 || linkRect.height === 0 ||
                linkStyle.display === 'none' ||
                linkStyle.visibility === 'hidden' ||
                linkStyle.opacity === '0'
            );

            if (svgBlocked || linkBlocked) {
                // Force link visibility first
                link.style.setProperty('display', 'flex', 'important');
                link.style.setProperty('visibility', 'visible', 'important');
                link.style.setProperty('opacity', '1', 'important');
                link.style.setProperty('align-items', 'center', 'important');
                link.style.setProperty('justify-content', 'center', 'important');

                // Hide SVG and show emoji fallback
                svg.style.setProperty('display', 'none', 'important');
                fallback.style.setProperty('display', 'inline-block', 'important');
                fallback.style.setProperty('visibility', 'visible', 'important');
                fallback.style.setProperty('opacity', '1', 'important');

                // Add fallback class for CSS styling
                link.classList.add('fallback-active');

                // Create additional backup if emoji fallback might also be blocked
                createBackupFallback(link);


            }
        }
    });
}

// Create additional backup fallback elements
function createBackupFallback(link) {
    // Don't create duplicate backups
    if (link.querySelector('.backup-text-fallback')) return;

    const platform = link.getAttribute('data-platform');
    const textMap = { github: 'GH', linkedin: 'LI', orcid: 'OR' };
    const text = textMap[platform] || '●';

    // Create text-based backup
    const textBackup = document.createElement('span');
    textBackup.className = 'backup-text-fallback';
    textBackup.textContent = text;
    textBackup.style.cssText = `
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        font-size: 0.9rem !important;
        font-weight: bold !important;
        z-index: 1001 !important;
        color: currentColor !important;
        display: none !important;
        visibility: visible !important;
        opacity: 1 !important;
        user-select: none !important;
        pointer-events: none !important;
    `;
    link.appendChild(textBackup);

    // Check if emoji fallback is working, if not show text backup
    setTimeout(() => {
        const fallback = link.querySelector('.platform-fallback');
        if (fallback) {
            const fallbackRect = fallback.getBoundingClientRect();
            if (fallbackRect.width === 0 || fallbackRect.height === 0) {

                textBackup.style.setProperty('display', 'inline-block', 'important');
            }
        }
    }, 100);
}

// Nuclear CSS fallback - Pure CSS icons that can't be blocked
function activateNuclearCSSFallback() {


    const navSocial = document.querySelector('.nav-social');
    if (!navSocial) return;

    // Clear everything and create pure CSS solution
    navSocial.innerHTML = '';
    navSocial.classList.add('nuclear-fallback', 'nuclear-fallback-active');

    // Create the ultimate unblockable icons using only CSS
    const platforms = [
        { name: 'github', url: 'https://github.com/nepiskopos', class: 'css-icon-gh' },
        { name: 'linkedin', url: 'https://linkedin.com/in/nepiskopos', class: 'css-icon-li' },
        { name: 'orcid', url: 'https://orcid.org/0009-0004-7130-3874', class: 'css-icon-or' }
    ];

    platforms.forEach(platform => {
        const link = document.createElement('a');
        link.href = platform.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = platform.class;
        link.title = `Visit ${platform.name}`;

        // Apply nuclear-grade protection
        link.style.cssText = `
            display: inline-block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            z-index: 9999 !important;
        `;

        navSocial.appendChild(link);
    });


}

// New helper functions for enhanced fallback system

function createImmediateTextBackups() {

    const socialLinks = document.querySelectorAll('.nav-social-link');

    socialLinks.forEach(link => {
        const href = link.getAttribute('href');
        let platform = '';
        let text = '';

        if (href.includes('github')) { platform = 'github'; text = 'GH'; }
        else if (href.includes('linkedin')) { platform = 'linkedin'; text = 'LI'; }
        else if (href.includes('orcid')) { platform = 'orcid'; text = 'OR'; }

        if (platform) {
            // Create immediate visible text backup
            const textBackup = document.createElement('div');
            textBackup.className = `immediate-backup-${platform}`;
            textBackup.textContent = text;
            textBackup.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 0.9rem;
                font-weight: bold;
                color: currentColor;
                z-index: 1000;
                display: none;
                pointer-events: none;
                user-select: none;
                opacity: 1;
                visibility: visible;
            `;
            link.appendChild(textBackup);
        }
    });
}

function detectAndActivateAdvancedFallbacks() {

    const socialLinks = document.querySelectorAll('.nav-social-link');

    socialLinks.forEach(link => {
        const svg = link.querySelector('.social-svg');
        const rect = link.getBoundingClientRect();

        // Multiple detection methods for uBlock Origin
        const isLinkHidden = rect.width === 0 || rect.height === 0 ||
                           getComputedStyle(link).display === 'none' ||
                           getComputedStyle(link).visibility === 'hidden';

        const isSvgHidden = svg && (
            svg.getBoundingClientRect().width === 0 ||
            getComputedStyle(svg).display === 'none' ||
            getComputedStyle(svg).visibility === 'hidden'
        );

        if (isLinkHidden || isSvgHidden) {


            // Force link visibility with maximum priority
            link.style.setProperty('display', 'flex', 'important');
            link.style.setProperty('visibility', 'visible', 'important');
            link.style.setProperty('opacity', '1', 'important');

            // Hide problematic SVG
            if (svg) svg.style.display = 'none';

            // Show text backup
            const textBackup = link.querySelector(`[class*="immediate-backup"]`);
            if (textBackup) {
                textBackup.style.display = 'block';
            }

            // Add protective classes
            link.classList.add('advanced-fallback-active', 'ublock-resistant');
        }
    });
}

function activateEmergencyTextFallbacks() {

    const socialLinks = document.querySelectorAll('.nav-social-link');

    socialLinks.forEach(link => {
        const href = link.getAttribute('href');
        let text = '●'; // Default fallback

        if (href.includes('github')) text = 'GH';
        else if (href.includes('linkedin')) text = 'LI';
        else if (href.includes('orcid')) text = 'OR';

        // Create ultra-simple text-only fallback
        const emergencyFallback = document.createElement('span');
        emergencyFallback.className = 'emergency-text-fallback';
        emergencyFallback.textContent = text;
        emergencyFallback.style.cssText = `
            font-size: 0.9rem !important;
            font-weight: bold !important;
            color: currentColor !important;
            display: inline-block !important;
            text-decoration: none !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            z-index: 9999 !important;
        `;

        // Clear existing content and add emergency fallback
        const svg = link.querySelector('.social-svg');
        if (svg) svg.style.display = 'none';

        // Only add if not already present
        if (!link.querySelector('.emergency-text-fallback')) {
            link.appendChild(emergencyFallback);
        }
    });
}

function startDynamicBlockingMonitor() {


    let checkCount = 0;
    const maxChecks = 30;

    const monitor = setInterval(() => {
        checkCount++;

        const socialContainer = document.querySelector('.nav-social');
        if (socialContainer) {
            const links = socialContainer.querySelectorAll('.nav-social-link');

            links.forEach(link => {
                const rect = link.getBoundingClientRect();
                const style = getComputedStyle(link);

                // Check if suddenly hidden by dynamic blocking
                if (rect.width === 0 || style.display === 'none' || style.visibility === 'hidden') {


                    // Force visibility
                    link.style.setProperty('display', 'flex', 'important');
                    link.style.setProperty('visibility', 'visible', 'important');
                    link.style.setProperty('opacity', '1', 'important');

                    // Ensure fallback is active
                    activateEmergencyTextFallbacks();
                }
            });
        }

        if (checkCount >= maxChecks) {
            clearInterval(monitor);

        }
    }, 1000);
}

function startContinuousAntiBlockingSystem() {


    // Create a MutationObserver to watch for style changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const target = mutation.target;

                // If a social link is being hidden, counter it
                if (target.classList.contains('nav-social-link')) {
                    const style = getComputedStyle(target);
                    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {


                        // Override the blocking
                        target.style.setProperty('display', 'flex', 'important');
                        target.style.setProperty('visibility', 'visible', 'important');
                        target.style.setProperty('opacity', '1', 'important');

                        // Ensure text fallback is active
                        const textFallback = target.querySelector('.emergency-text-fallback');
                        if (textFallback) {
                            textFallback.style.display = 'inline-block';
                        }
                    }
                }
            }
        });
    });

    // Observe all social links
    const socialLinks = document.querySelectorAll('.nav-social-link');
    socialLinks.forEach(link => {
        observer.observe(link, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    });

    // Also observe the container for removal attempts
    const socialContainer = document.querySelector('.nav-social');
    if (socialContainer) {
        observer.observe(socialContainer, {
            childList: true,
            subtree: true
        });
    }
}

// Mobile Accordion Functionality
function initMobileAccordion() {
    // Mobile detection function
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Get all accordion elements
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Function to close all accordions
    function closeAllAccordions() {
        accordionHeaders.forEach(header => {
            header.classList.remove('active');
            const contentId = header.getAttribute('data-target');
            const content = document.getElementById(contentId);
            if (content) {
                content.classList.remove('active');
            }
        });
    }

    // Function to open a specific accordion
    function openAccordion(targetId) {
        if (!isMobile()) return;

        // Close all accordions first
        closeAllAccordions();

        // Open the target accordion
        const targetHeader = document.querySelector(`[data-target="${targetId}"]`);
        const targetContent = document.getElementById(targetId);

        if (targetHeader && targetContent) {
            targetHeader.classList.add('active');
            targetContent.classList.add('active');

            // Smooth scroll to the opened accordion
            setTimeout(() => {
                targetHeader.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }, 300);
        }
    }

    // Initialize accordion click handlers
    function initAccordionHandlers() {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                if (!isMobile()) return;

                const targetId = this.getAttribute('data-target');
                const content = document.getElementById(targetId);
                const isActive = this.classList.contains('active');

                if (isActive) {
                    // Close this accordion
                    this.classList.remove('active');
                    content.classList.remove('active');
                } else {
                    // Close all first, then open this one
                    closeAllAccordions();
                    this.classList.add('active');
                    content.classList.add('active');

                    // Smooth scroll to header after opening
                    setTimeout(() => {
                        this.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'nearest'
                        });
                    }, 300);
                }
            });
        });
    }

    // Initialize button handlers for mobile only
    function initButtonHandlers() {
        if (!isMobile()) return;

        // "Unlock AI's Potential" button -> Contact accordion
        const unlockButton = document.querySelector('a[href="#contact"].btn.btn-primary');
        if (unlockButton) {
            unlockButton.addEventListener('click', function(e) {
                e.preventDefault();
                openAccordion('contact-content');
            });
        }

        // "View My Work" button -> Projects accordion
        const viewWorkButton = document.querySelector('a[href="#projects"].btn.btn-secondary');
        if (viewWorkButton) {
            viewWorkButton.addEventListener('click', function(e) {
                e.preventDefault();
                openAccordion('projects-content');
            });
        }

        // Mobile navigation links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                let targetId = null;

                switch(href) {
                    case '#about':
                        targetId = 'about-content';
                        break;
                    case '#projects':
                        targetId = 'projects-content';
                        break;
                    case '#experience':
                        targetId = 'experience-content';
                        break;
                    case '#publications':
                        targetId = 'publications-content';
                        break;
                    case '#contact':
                        targetId = 'contact-content';
                        break;
                    case '#home':
                        // For home, just close mobile menu
                        const mobileMenu = document.querySelector('.mobile-menu');
                        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
                        if (mobileMenu) mobileMenu.classList.remove('active');
                        if (mobileNavToggle) mobileNavToggle.classList.remove('active');
                        return;
                }

                if (targetId) {
                    e.preventDefault();
                    // Close mobile menu first
                    const mobileMenu = document.querySelector('.mobile-menu');
                    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
                    if (mobileMenu) mobileMenu.classList.remove('active');
                    if (mobileNavToggle) mobileNavToggle.classList.remove('active');

                    // Open corresponding accordion
                    setTimeout(() => {
                        openAccordion(targetId);
                    }, 100);
                }
            });
        });
    }

    // Initialize everything
    initAccordionHandlers();
    initButtonHandlers();

    // Open the first accordion by default on mobile (without scrolling)
    if (isMobile()) {
        setTimeout(() => {
            const firstHeader = document.querySelector('[data-target="about-content"]');
            const firstContent = document.getElementById('about-content');
            if (firstHeader && firstContent) {
                firstHeader.classList.add('active');
                firstContent.classList.add('active');
                // No scrolling - let user stay at top
            }
        }, 100);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            closeAllAccordions();
        } else {
            // Re-initialize button handlers for mobile
            initButtonHandlers();
            // Open first accordion if none are open (without scrolling)
            const hasActiveAccordion = document.querySelector('.accordion-header.active');
            if (!hasActiveAccordion) {
                setTimeout(() => {
                    const firstHeader = document.querySelector('[data-target="about-content"]');
                    const firstContent = document.getElementById('about-content');
                    if (firstHeader && firstContent) {
                        firstHeader.classList.add('active');
                        firstContent.classList.add('active');
                        // No scrolling on resize
                    }
                }, 100);
            }
        }
    });
}