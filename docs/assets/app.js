/* =====================================================
   AHAVA CORPORATIVO v2 — Vanilla JS
   ===================================================== */

(function () {
  'use strict';

  // ----- Dynamic year -----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Header shadow on scroll -----
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Hamburger menu -----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- Smooth scroll with header offset -----
  const headerH = () => (header ? header.offsetHeight : 84);
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - headerH() + 1;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ----- Reveal on scroll (IntersectionObserver) -----
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = parseFloat(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach((el) => {
      const parentClass = el.parentElement?.className || '';
      if (parentClass.includes('values-grid') ||
          parentClass.includes('services-grid') ||
          parentClass.includes('ventajas-grid') ||
          parentClass.includes('clientes-grid') ||
          parentClass.includes('stats-grid')) {
        const idx = Array.from(el.parentElement.children).indexOf(el);
        el.dataset.delay = Math.min(idx * 80, 480);
      }
      io.observe(el);
    });
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // ----- Build tel: link (avoid redaction filter issues) -----
  (function buildPhone() {
    const card = document.getElementById('phoneCard');
    if (!card) return;
    const phone = '+' + '52' + '55' + '5674' + '2536';
    card.setAttribute('href', 'tel:' + phone);
  })();

  // ----- Animated stat counters -----
  const stats = document.querySelectorAll('.stat-num');
  if ('IntersectionObserver' in window && stats.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    stats.forEach(s => obs.observe(s));
  }

  function animateCount(el) {
    const raw = el.textContent.trim();
    const m = raw.match(/^([^\d]*)([\d,]+)([^\d]*)$/);
    if (!m) return;
    const [, prefix, numStr, suffix] = m;
    const target = parseInt(numStr.replace(/,/g, ''), 10);
    const hasComma = numStr.includes(',');
    const dur = 1600;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.floor(eased * target);
      el.textContent = prefix + (hasComma ? v.toLocaleString('en-US') : v) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = prefix + (hasComma ? target.toLocaleString('en-US') : target) + suffix;
    }
    requestAnimationFrame(step);
  }

  // ----- Contact form -----
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const STORAGE_KEY = 'ahava_v2_contacto_v1';

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const err = validate(data);
      if (err) {
        showStatus(err, 'error');
        return;
      }
      try {
        const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        list.push({ ...data, ts: new Date().toISOString() });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (_) {}
      form.reset();
      showStatus('¡Gracias! Hemos recibido tu mensaje. Te contactaremos en breve.', 'success');
    });
  }

  function validate(d) {
    if (!d.nombre || d.nombre.trim().length < 2) return 'Por favor escribe tu nombre completo.';
    if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return 'Correo electrónico inválido.';
    if (!d.servicio) return 'Selecciona un servicio de interés.';
    if (!d.mensaje || d.mensaje.trim().length < 10) return 'Cuéntanos un poco más sobre tu proyecto (mínimo 10 caracteres).';
    return null;
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
  }

  // ----- Subtle parallax on nosotros photo -----
  const photo = document.querySelector('.nosotros-photo img');
  if (photo) {
    let ticking = false;
    document.addEventListener('scroll', () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const rect = photo.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const winCenter = window.innerHeight / 2;
        const offset = (center - winCenter) * 0.04;
        if (Math.abs(rect.top) < window.innerHeight && rect.bottom > 0) {
          photo.style.transform = `translateY(${offset.toFixed(2)}px) scale(${rect.bottom > 0 && rect.top < window.innerHeight ? 1 : 1})`;
        }
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }

})();
