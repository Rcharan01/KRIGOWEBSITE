/* ============================================================
   MAIN.JS — Krigo Fine Dining
   ============================================================ */
'use strict';

(function () {

  /* ── Offer Banner ── */
  const offerBanner = document.getElementById('offerBanner');
  const bannerClose = document.getElementById('bannerClose');

  if (bannerClose && offerBanner) {
    bannerClose.addEventListener('click', () => {
      offerBanner.style.height = offerBanner.offsetHeight + 'px';
      requestAnimationFrame(() => {
        offerBanner.style.transition = 'height 0.35s ease, opacity 0.35s ease';
        offerBanner.style.height = '0';
        offerBanner.style.overflow = 'hidden';
        offerBanner.style.opacity = '0';
      });
      setTimeout(() => {
        offerBanner.remove();
        updateNavbar();
      }, 400);
    });
  }

  /* ── Navbar Scroll Behaviour ── */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function updateNavbar() {
    const scrollY = window.scrollY;
    
    // Dynamically adjust navbar top based on banner height
    const bannerInDOM = offerBanner && document.body.contains(offerBanner);
    const bannerHeight = bannerInDOM ? offerBanner.offsetHeight : 0;

    if (scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.style.top = '0px';
    } else {
      navbar.classList.remove('scrolled');
      navbar.style.top = Math.max(0, bannerHeight - scrollY) + 'px';
    }
    
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  window.addEventListener('resize', updateNavbar, { passive: true });
  updateNavbar();

  /* ── Active Nav Link on Scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ── Mobile Hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinksEl.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close on link click
    navLinksEl.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navLinksEl.contains(e.target) && !hamburger.contains(e.target)) {
        navLinksEl.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Hero Particles ── */
  const particleContainer = document.getElementById('heroParticles');

  function createParticle() {
    if (!particleContainer) return;
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    const dur = Math.random() * 8 + 6;
    const del = Math.random() * 4;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = del + 's';
    particleContainer.appendChild(p);
    setTimeout(() => p.remove(), (dur + del) * 1000);
  }

  // Create initial particles
  for (let i = 0; i < 20; i++) createParticle();
  setInterval(createParticle, 800);

  /* ── Menu Tabs ── */
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuPanels = document.querySelectorAll('.menu-panel');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      menuTabs.forEach(t => t.classList.remove('active'));
      menuPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.querySelector(`.menu-panel[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── Reservation Form → WhatsApp Removed ── */

  /* ── Notification Toast ── */
  function showNotification(message, type = 'info') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;

    const colors = {
      success: 'linear-gradient(135deg, #22c55e, #16a34a)',
      error: 'linear-gradient(135deg, #ef4444, #dc2626)',
      info: 'linear-gradient(135deg, var(--gold), var(--gold-dark))'
    };

    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: colors[type] || colors.info,
      color: type === 'info' ? 'var(--dark)' : '#fff',
      padding: '0.875rem 1.75rem',
      borderRadius: '999px',
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.9rem',
      fontWeight: '600',
      boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
      zIndex: '9999',
      opacity: '0',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ── Back To Top ── */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  }, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Intersection Observer (AOS-like animations) ── */
  const aosElements = document.querySelectorAll('[data-aos]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.aosDelay;
          if (delay) {
            setTimeout(() => entry.target.classList.add('animated'), parseInt(delay));
          } else {
            entry.target.classList.add('animated');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    aosElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: animate immediately
    aosElements.forEach(el => el.classList.add('animated'));
  }

  /* ── Smooth Scroll for anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Gallery lightbox (simple) ── */
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      const overlay = document.createElement('div');
      Object.assign(overlay.style, {
        position: 'fixed', inset: '0',
        background: 'rgba(14,11,8,0.95)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'zoom-out',
        animation: 'fadeIn 0.3s ease',
      });

      const fullImg = document.createElement('img');
      fullImg.src = img.src;
      fullImg.alt = img.alt;
      Object.assign(fullImg.style, {
        maxWidth: '90vw',
        maxHeight: '85vh',
        objectFit: 'contain',
        borderRadius: '8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
        animation: 'fadeIn 0.3s ease',
      });

      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '✕';
      Object.assign(closeBtn.style, {
        position: 'absolute', top: '1.5rem', right: '1.5rem',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#fff', fontSize: '1.25rem',
        width: '44px', height: '44px',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s',
        fontFamily: 'Inter, sans-serif',
      });

      overlay.appendChild(fullImg);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      function close() {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      }

      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      closeBtn.addEventListener('click', close);
      document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
      });
    });
  });

  /* ── Stat number increment animation ── */
  function animateStats() {
    const stats = document.querySelectorAll('.stat-num');
    stats.forEach(stat => {
      const text = stat.textContent;
      const num = parseFloat(text);
      if (isNaN(num)) return;
      const suffix = text.replace(/[\d.]/g, '');
      let start = 0;
      const duration = 1500;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        stat.textContent = Math.round(eased * num) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  // Trigger stat animation when hero stats come into view
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        statsObserver.disconnect();
      }
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
  }

})();
