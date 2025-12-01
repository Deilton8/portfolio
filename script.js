// Mobile menu toggle with animation
document.getElementById('menu-btn').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('opacity-0');
    menu.classList.toggle('translate-y-4');

    if (!menu.classList.contains('hidden')) {
        setTimeout(() => {
            menu.classList.remove('opacity-0');
            menu.classList.remove('translate-y-4');
        }, 10);
    }
});

// Smooth scrolling for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Calculate offset
            const headerHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight;

            // Smooth scroll
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open with animation
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('opacity-0', 'translate-y-4');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        }
    });
});

// Highlight active nav link on scroll with threshold
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('nav').offsetHeight;

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || (current === 'home' && href === '#')) {
            link.classList.add('active');
        }
    });
});

// Back to Top Button with smooth fade in/out
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > 300) {
        backToTop.classList.remove("opacity-0", "pointer-events-none");
        backToTop.classList.add("opacity-100");
    } else {
        backToTop.classList.add("opacity-0", "pointer-events-none");
        backToTop.classList.remove("opacity-100");
    }
});

// WhatsApp Form Submission with validation
document.getElementById("whatsappForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Form validation
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }

    // Format message for WhatsApp
    let phoneNumber = "258874991977";
    let text = `*Nova mensagem do portfólio!*%0A%0A` +
        `*Nome:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `*Assunto:* ${subject}%0A` +
        `*Mensagem:*%0A${message}%0A%0A` +
        `_Enviado do portfólio de Deilton Matusse_`;

    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    // Add loading state to button
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
    submitBtn.disabled = true;

    // Simulate loading and open WhatsApp
    setTimeout(() => {
        window.open(url, "_blank");

        // Reset button state after 2 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Clear form
            this.reset();

            // Show success message
            showNotification('Mensagem preparada! Abrindo WhatsApp...', 'success');
        }, 2000);
    }, 1000);
});

// Progress bar animation on scroll
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.magic-progress-fill[data-width]');

    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight - 100) {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
            bar.classList.add('progress-bar-animate');
        }
    });
}

// Show notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-6 right-6 px-6 py-4 rounded-xl shadow-2xl z-[1000] transform translate-x-full transition-transform duration-500 ${type === 'success' ? 'bg-green-500 text-white' : type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-3 text-xl"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // If element has data-delay attribute
            const delay = entry.target.getAttribute('data-delay');
            if (delay) {
                entry.target.style.animationDelay = `${delay}ms`;
            }
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Initialize progress bars on load
window.addEventListener('load', () => {
    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#3b82f6", "#8b5cf6", "#ec4899"]
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#3b82f6",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                }
            },
            retina_detect: true
        });
    }

    // Animate progress bars
    animateProgressBars();

    // Add animation classes to cards
    document.querySelectorAll('.magic-card, .magic-skill-card, .magic-project-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.setAttribute('data-delay', index * 100);
    });
});

// Animate progress bars on scroll
window.addEventListener('scroll', () => {
    animateProgressBars();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Hover effect for magic cards
document.querySelectorAll('.magic-card, .magic-skill-card, .magic-project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth hover effects to all interactive elements
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            e.currentTarget.classList.add('transition-transform', 'duration-300');
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.magic-button-primary, .magic-button-secondary').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);