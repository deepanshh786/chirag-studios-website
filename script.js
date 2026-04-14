// ============================================
// CHIRAG STUDIOS — Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 800);
    });
    // Fallback: hide preloader after 3s even if load event already fired
    setTimeout(() => preloader.classList.add('hidden'), 3000);

    // ---- Navbar scroll ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ---- Mobile menu ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---- Smooth scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Reveal on scroll ----
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));

    // ---- Counter animation ----
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target + '+';
            }
        }

        requestAnimationFrame(update);
    }

    // ---- Portfolio filter ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach(item => {
                const show = filter === 'all' || item.dataset.category === filter;
                item.style.opacity = show ? '1' : '0.15';
                item.style.transform = show ? 'scale(1)' : 'scale(0.95)';
                item.style.pointerEvents = show ? 'auto' : 'none';
                item.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        });
    });

    // ---- Lightbox ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.portfolio-img img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    [lightbox, lightboxClose].forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightboxClose) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ---- Contact form ----
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = '#2a7a4f';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });

    // ---- Parallax-lite on hero background ----
    const heroBgImage = document.querySelector('.hero-bg-image');
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBgImage.style.transform = `translateY(${scrolled * 0.4}px) scale(1.1)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
    });

    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.style.color = '#c9a96e';
                } else {
                    link.style.color = '';
                }
            }
        });
    });

});
