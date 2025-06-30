// ----------------------------
// Nav Underline
// ----------------------------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function onScroll() {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        const span = link.querySelector(".underline-indicator");
        if (link.dataset.link === current) {
            span.classList.add("w-full");
            link.classList.add("text-blue-500");
        } else {
            span.classList.remove("w-full");
            link.classList.remove("text-blue-500");
        }
    });
}

window.addEventListener("scroll", onScroll);

// ----------------------------
// Mobile Menu Toggle (Responsive Nav)
// ----------------------------

// Grab the menue button (hamburger icon) and the mobile menu container
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Toggle 'hidden' class on click to show/hide the mobile menu
menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('hidden');
});

// ----------------------------
// Scroll Trigger Animation (Intersection Observer)
// ----------------------------

// Select all elements that should animate when scolled into view
const scrollTriggers = document.querySelectorAll('.scroll-trigger');

// Create an IntersectionObserver to detect when each element becomes visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'active' class to trigger CSS animations
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

// Start observing each scroll-trigger element
scrollTriggers.forEach(trigger => {
    observer.observe(trigger);
});

// ----------------------------
// Smooth Scrolling for Anchor Links
// ----------------------------

// Select all anchor tags that link to in-page sections (start with #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default jump-to behavior
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { // Scroll only if target exists
            // Smooth scroll to the target section
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open, close it after navigation
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// ----------------------------
// Audio Preview on Track Hover
// ----------------------------

// Detect if the device is hover-capable (i.e. desktop)
const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Function to play a preview (fade in)
function playPreview(id) {
    if (!isDesktop) return;

    const audio = document.getElementById(`${id}-preview`);
    if (audio) {
        audio.currentTime = 0;
        audio.volume = 0;
        audio.play().then(() => {
            const fadeIn = setInterval(() => {
                if (audio.volume < 0.9) {
                    audio.volume = Math.min(audio.volume + 0.1, 1);
                } else {
                    clearInterval(fadeIn);
                }
            }, 50);
        }).catch((e) => {
            console.warn(`Audio play failed for ${id}:`, e);
        });
    }
}

// Function to pause a preview (fade out)
function pausePreview(id) {
    if (!isDesktop) return;

    const audio = document.getElementById(`${id}-preview`);
    if (audio) {
        const fadeOut = setInterval(() => {
            if (audio.volume > 0.1) {
                audio.volume = Math.max(audio.volume - 0.1, 0);
            } else {
                clearInterval(fadeOut);
                audio.pause();
                audio.currentTime = 0;
                audio.volume = 1; // Reset volume
            }
        }, 50);
    }
}

// ----------------------------
// Dynamic Footer Year
// ----------------------------

document.addEventListener("DOMContentLoaded", function() {
    const yearSpan = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});
