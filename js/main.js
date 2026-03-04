/* ============================================================
   YURI PEIXOTO PORTFOLIO — main.js
   Interactions: navbar scroll, mobile menu, reveal animations
   ============================================================ */

(function () {
  'use strict';

  // ── NAV: scrolled class ──────────────────────────────────
  const navbar = document.getElementById('navbar');
  function updateNav() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ── NAV: mobile hamburger ────────────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    navLinks.classList.toggle('open', isOpen);
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      navLinks.classList.remove('open');
    });
  });

  // ── GITHUB AVATAR: resolve correct URL ──────────────────
  // GitHub returns the avatar at /yuriPeixoto.png directly
  const avatarImg = document.getElementById('hero-avatar');
  if (avatarImg) {
    avatarImg.src = 'https://github.com/yuriPeixoto.png?size=200';
  }

  // ── INTERSECTION OBSERVER: reveal on scroll ──────────────
  const revealEls = document.querySelectorAll(
    '.section-title, .section-subtitle, .sobre-text, .sobre-cards, ' +
    '.stack-group, .project-card, .contact-lead, .contact-card, ' +
    '.timeline-item, .info-card, .footer'
  );

  // Add reveal class to all target elements
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger children of grid containers
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 60}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));

  // ── TIMELINE: staggered reveal ───────────────────────────
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const idx = Array.from(timelineItems).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 120);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => timelineObserver.observe(item));

  // ── ACTIVE NAV LINK HIGHLIGHT ────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = '';
          a.style.background = '';
        });
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active && !active.classList.contains('nav-cta')) {
          active.style.color = 'var(--clr-purple-light)';
          active.style.background = 'var(--clr-purple-dim)';
        }
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px'
  });

  sections.forEach(s => sectionObserver.observe(s));

  // ── CURSOR GLOW (desktop only) ───────────────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      width: 320px;
      height: 320px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: left 0.12s ease, top 0.12s ease;
      will-change: left, top;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

  // ── CONSOLE EASTER EGG ───────────────────────────────────
  console.log('%c Yuri Peixoto — Senior Dev & PM', 'color:#a78bfa;font-size:14px;font-weight:bold;');
  console.log('%c Built with HTML, CSS & vanilla JS. No frameworks. Just vibes.', 'color:#4ade80;font-size:11px;');
  console.log('%c github.com/yuriPeixoto', 'color:#6b7280;font-size:11px;');

})();
