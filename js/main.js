/* ============================================================
   TAKEWORKS — main.js
   ============================================================ */

// ── Nav: scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Nav: burger menu ──
const burger     = document.getElementById('navBurger');
const mobileMenu = document.getElementById('navMobile');
const mobileLinks = document.querySelectorAll('.mobile-link');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ── Reveal on scroll (IntersectionObserver) ──
const revealEls = document.querySelectorAll('.reveal, .fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));

// ── Staggered reveal for platform cards ──
const platformCards = document.querySelectorAll('.platform-card');
platformCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});

// ── Tracklist hover: animate bars on cover ──
const tracks = document.querySelectorAll('.music__track');
const coverLines = document.querySelectorAll('.music__cover-lines div');

tracks.forEach(track => {
  track.addEventListener('mouseenter', () => {
    coverLines.forEach(line => {
      line.style.animationDuration = `${0.4 + Math.random() * 0.4}s`;
    });
  });
});

// ── Smooth active nav link highlight ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--gold)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));

// ── Cursor trail effect (subtle) ──
let mouseX = 0, mouseY = 0;
const trail = document.createElement('div');
trail.style.cssText = `
  position: fixed;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(200,169,110,0.6);
  pointer-events: none;
  z-index: 9998;
  transition: transform 0.1s ease;
  mix-blend-mode: screen;
`;
document.body.appendChild(trail);

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  trail.style.left = (mouseX - 3) + 'px';
  trail.style.top  = (mouseY - 3) + 'px';
});

// ── Typewriter effect for hero headline ──
(function initTypewriter() {
  const headline = document.querySelector('.hero__headline');
  if (!headline) return;

  const lines = ['No Clock.', 'No Cage.', 'Keep Growing.'];
  const goldWord = 'Keep Growing.';
  let output = '';

  // We already have the text rendered; just animate opacity line by line
  // Handled by CSS fade-in with data-delay
})();

// ── Parallax subtle on hero mascot ──
const mascot = document.querySelector('.hero__mascot');
if (mascot) {
  document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const dx = (e.clientX / innerWidth  - 0.5) * 12;
    const dy = (e.clientY / innerHeight - 0.5) * 8;
    mascot.style.transform = `translate(${dx}px, ${dy}px)`;
  });
}

// ── Stats counter animation ──
function animateCounter(el, end, suffix = '') {
  const duration = 1500;
  const start = 0;
  const step = (timestamp) => {
    if (!step.startTime) step.startTime = timestamp;
    const progress = Math.min((timestamp - step.startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * end);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = end + suffix;
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEl = entry.target.querySelector('.stat-card__num');
        if (!numEl) return;
        const text = numEl.textContent.trim();
        const numMatch = text.match(/\d+/);
        if (numMatch) {
          const num = parseInt(numMatch[0]);
          const suffix = text.replace(/\d+/, '').trim();
          animateCounter(numEl, num, suffix);
        }
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-card').forEach(card => {
  // Only animate purely numeric ones
  const numEl = card.querySelector('.stat-card__num');
  if (numEl && /^\d+/.test(numEl.textContent.trim())) {
    statObserver.observe(card);
  }
});
