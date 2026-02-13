document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileNavLinks = document.getElementById('mobileNavLinks');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    });

    // Close mobile menu on link click
    mobileNavLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });
    });

    // Close on overlay click
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            mobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        }
    });

    // Smooth scrolling for all nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        navbar.style.background = window.scrollY > 50 
            ? 'rgba(26, 26, 46, 0.98)' 
            : 'rgba(26, 26, 46, 0.95)';
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Progress bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.dataset.progress;
                progressBar.style.width = targetWidth + '%';
            }
        });
    }, { threshold: 0.8 });

    document.querySelectorAll('.progress-fill').forEach(bar => {
        observer.observe(bar);
    });

    // Typing effect
    const typingElement = document.getElementById('typingElement');
    const words = ['Web Developer', 'Full Stack Developer', 'IoT Enthusiast', 'BCA Student'];
    let i = 0, j = 0, deleting = false;

    function typeWriter() {
        const word = words[i];
        typingElement.textContent = word.substring(0, j);

        if (!deleting && j <= word.length) {
            j++;
        } else if (deleting && j >= 0) {
            j--;
        } else {
            deleting = !deleting;
            i = deleting ? i : (i + 1) % words.length;
        }
        setTimeout(typeWriter, deleting ? 50 : 100);
    }
    typeWriter();

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.dataset.theme = savedTheme;
    icon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

    themeToggle.addEventListener('click', () => {
        const isDark = body.dataset.theme === 'dark';
        body.dataset.theme = isDark ? 'light' : 'dark';
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', body.dataset.theme);
    });

    // Contact form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const messageEl = document.getElementById('formMessage');
        messageEl.textContent = 'Message sent successfully! 🎉';
        messageEl.style.display = 'block';
        messageEl.style.background = 'rgba(0,255,136,0.2)';
        messageEl.style.border = '2px solid var(--success)';
        messageEl.style.color = 'var(--success)';
        e.target.reset();
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    });
});
