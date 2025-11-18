// animations.js — initialize tsparticles and GSAP per-page (no manual toggle)
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // helper to detect page
  function pageName() {
    const p = window.location.pathname.split('/').pop();
    return p || 'index.html';
  }

  // default particle configs per page
  const configs = {
    'index.html': {
      fpsLimit: 60,
      interactivity: { events: { onHover: { enable: true, mode: 'repulse' } } },
      particles: { number: { value: 40 }, color: { value: '#06b6d4' }, shape: { type: 'circle' }, opacity: { value: 0.45 }, size: { value: { min: 1, max: 4 } }, move: { enable: true, speed: 0.6 } }
    },
    'projects.html': {
      fpsLimit: 45,
      particles: { number: { value: 30 }, color: { value: '#8b5cf6' }, shape: { type: 'polygon' }, opacity: { value: 0.25 }, size: { value: { min: 2, max: 5 } }, move: { enable: true, speed: 0.4 } }
    },
    'about.html': null, // use SVG wave background (no particles)
    'skills.html': null, // Lottie micro-animations only
    'contact.html': { fpsLimit: 30, particles: { number: { value: 18 }, color: { value: '#06b6d4' }, opacity: { value: 0.2 }, move: { enable: true, speed: 0.3 } } },
    'labs.html': { fpsLimit: 60, particles: { number: { value: 50 }, color: { value: '#ef4444' }, opacity: { value: 0.35 }, move: { enable: true, speed: 0.7 } } }
  };

  let tsInstance = null;

  function initParticlesForPage() {
    if (prefersReduced) return; // respect reduced motion
    const p = pageName();
    const cfg = configs[p] || configs['index.html'];
    const el = document.getElementById('tsparticles');
    if (!el) return;
    if (!cfg) {
      // ensure particles are removed if page opted out
      if (tsInstance && tsInstance.destroy) tsInstance.destroy();
      el.innerHTML = '';
      return;
    }
    // destroy previous if exists
    if (tsInstance && tsInstance.destroy) tsInstance.destroy();
    const options = Object.assign({ interactivity: { events: { onHover: { enable: true, mode: 'repulse' } } } }, cfg);
    tsParticles.load({ id: el.id, options }).then(instance => { tsInstance = instance; }).catch(() => { });
  }

  function initGSAP() {
    try {
      // general entry animations
      gsap.from('.hero-text', { opacity: 0, y: 16, duration: 0.85, ease: 'power2.out' });
      gsap.from('.hero-card', { opacity: 0, x: 32, duration: 0.85, delay: 0.12, ease: 'power2.out' });
      gsap.from('.card', { opacity: 0, y: 10, duration: 0.7, stagger: 0.06, ease: 'power2.out' });
      // page-specific tweaks
      const p = pageName();
      if (p === 'projects.html') {
        gsap.from('.works .card', { scale: 0.98, duration: 0.8, stagger: 0.06, opacity: 0 });
      }
    } catch (e) {/*gsap not available*/ }
  }

  window.addEventListener('load', () => {
    initParticlesForPage();
    if (!prefersReduced) initGSAP();
    // respond to system preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { if (tsInstance && tsInstance.destroy) tsInstance.destroy(); document.documentElement.classList.add('reduced-motion'); } else { document.documentElement.classList.remove('reduced-motion'); initParticlesForPage(); initGSAP(); } });
  });

})();
