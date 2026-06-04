/**
 * Main JavaScript — Professional Template
 * Features: mobile menu, scroll effects, scroll spy, newsletter, contact form,
 *           portfolio filter, dark mode, scroll-to-top, preloader, scroll reveal,
 *           auto active nav, smooth scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // DOM ELEMENTS
    // ============================================
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.header__link');
    const newsletterForm = document.getElementById('newsletter-form');
    const contactForm = document.getElementById('contact-form');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const scrollTopBtn = document.getElementById('scroll-top');
    const themeToggle = document.getElementById('theme-toggle');
    const preloader = document.getElementById('preloader');
    const htmlElement = document.documentElement;

    // ============================================
    // 1. PRELOADER
    // ============================================
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    // ============================================
    // 2. MOBILE MENU TOGGLE
    // ============================================
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });
    }

    // ============================================
    // 3. HEADER SCROLL EFFECT
    // ============================================
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 10) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // ============================================
    // 4. SCROLL SPY (active nav link)
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    function highlightNavLink() {
        const scrollY = window.pageYOffset + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const matchingLink = document.querySelector(`.header__link[href*="${sectionId}"]`);
            if (matchingLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                matchingLink.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);

    // ============================================
    // 5. AUTO ACTIVE NAV LINK (based on URL)
    // ============================================
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (currentPath.endsWith(href) ||
                (currentPath.endsWith('/') && href === 'index.html') ||
                (currentPath === '/' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveNavLink();

    // ============================================
    // 6. NEWSLETTER FORM
    // ============================================
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            if (email) {
                const btn = newsletterForm.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Subscribed!';
                btn.style.background = '#22c55e';
                btn.disabled = true;
                emailInput.value = '';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
                console.log('Newsletter:', email);
            }
        });
    }

    // ============================================
    // 7. CONTACT FORM
    // ============================================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            const submitBtn = contactForm.querySelector('.contact-form__submit');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                console.log('Contact:', data);
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                submitBtn.style.background = '#22c55e';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // ============================================
    // 8. PORTFOLIO FILTER
    // ============================================
    if (filterTabs.length && portfolioItems.length) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const filter = tab.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ============================================
    // 9. SCROLL TO TOP
    // ============================================
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // 10. DARK MODE TOGGLE
    // ============================================
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        });
    }

    // ============================================
    // 11. SCROLL REVEAL
    // ============================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    // ============================================
    // 12. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    console.log('✅ Professional Template — Ready');
});