const SITE_CONFIG = {
  contacts: {
    whatsapp: 'https://wa.me/5215548947779?text=Hola%20Warner%20Magic%2C%20quiero%20platicar%20de%20mi%20idea',
    instagram: 'https://www.instagram.com/warnermagic25/',
    facebook: 'https://www.facebook.com/profile.php?id=61577677627063'
  },
  galleries: {
    experience: [
      { type: 'square', title: 'Experiencia 01', image: 'assets/experiencia-v-01.png' },
      { type: 'square', title: 'Experiencia 02', image: 'assets/experiencia-v-02.png' },
      { type: 'square', title: 'Experiencia 03', image: 'assets/experiencia-v-03.png' },
      { type: 'square', title: 'Experiencia 04', image: 'assets/experiencia-v-04.png' },
      { type: 'square', title: 'Experiencia 05', image: 'assets/experiencia-h-01.png' },
      { type: 'square', title: 'Experiencia 06', image: 'assets/experiencia-h-02.png' },
      { type: 'square', title: 'Experiencia 07', image: 'assets/experiencia-h-03.png' },
      { type: 'square', title: 'Experiencia 08', image: 'assets/experiencia-h-04.png' }
    ],
    ai: [
      { type: 'vertical', title: 'IA 01', image: 'assets/ia-v-01.jpg' },
      { type: 'vertical', title: 'IA 02', image: 'assets/ia-v-02.jpg' },
      { type: 'vertical', title: 'IA 03', image: 'assets/ia-v-03.jpg' },
      { type: 'vertical', title: 'IA 04', image: 'assets/ia-v-04.jpg' },
      { type: 'horizontal', title: 'IA 05', image: 'assets/ia-h-01.jpg' },
      { type: 'horizontal', title: 'IA 06', image: 'assets/ia-h-02.jpg' },
      { type: 'horizontal', title: 'IA 07', image: 'assets/ia-h-03.jpg' },
      { type: 'horizontal', title: 'IA 08', image: 'assets/ia-h-04.jpg' }
    ]
  }
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initReveal();
  initContacts();
  initGalleries();
  initCarouselButtons();

  setTimeout(() => {
    initCursor();
    initTilt();
    initLightbox();
  }, 100);
});

function initMenu() {
  const btn = $('.menu-btn');
  const nav = $('.nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  $$('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

function initReveal() {
  const els = $$('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

function initContacts() {
  const wa = $('#contactWhatsApp');
  const ig = $('#contactInstagram');
  const fb = $('#contactFacebook');
  if (wa) wa.href = SITE_CONFIG.contacts.whatsapp;
  if (ig) ig.href = SITE_CONFIG.contacts.instagram;
  if (fb) fb.href = SITE_CONFIG.contacts.facebook;
}

function initGalleries() {
  renderTrack('#experienceTrack', SITE_CONFIG.galleries.experience);
  renderTrack('#aiTrack', SITE_CONFIG.galleries.ai);
}

function renderTrack(targetSelector, items) {
  const target = $(targetSelector);
  if (!target) return;
  const duplicated = [...items, ...items];
  target.innerHTML = duplicated.map(item => `
    <article class="gallery-item gallery-item--${item.type}">
      <img src="${item.image}" alt="${item.title}">
    </article>
  `).join('');
}

function initCarouselButtons() {
  $$('.carousel-controls').forEach(group => {
    const id = group.dataset.target;
    const target = document.getElementById(id);
    if (!target) return;
    const prev = $('.prev', group);
    const next = $('.next', group);
    const amount = () => Math.min(target.clientWidth * 0.82, 420);
    prev?.addEventListener('click', () => target.scrollBy({ left: -amount(), behavior: 'smooth' }));
    next?.addEventListener('click', () => target.scrollBy({ left: amount(), behavior: 'smooth' }));
  });
}

// ====== Custom Glassmorphism Cursor (GSAP) ======
function initCursor() {
  const cursors = $$('.cursor-trail');
  if (!cursors.length || typeof gsap === 'undefined') return;

  // Show cursors on first mouse movement (if pointer is fine)
  if (matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', () => {
      cursors.forEach(c => c.style.opacity = '1');
    }, { once: true });

    // Move the main cursor instantly, and the others with a delay
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;

      gsap.to('.cursor-1', { x: clientX, y: clientY, duration: 0.1, ease: 'power2.out' });
      gsap.to('.cursor-2', { x: clientX, y: clientY, duration: 0.25, ease: 'power2.out' });
      gsap.to('.cursor-3', { x: clientX, y: clientY, duration: 0.4, ease: 'power2.out' });
      gsap.to('.cursor-4', { x: clientX, y: clientY, duration: 0.55, ease: 'power2.out' });
    });

    // Grow cursor on hoverable elements
    const hoverables = $$('a, button, .carousel-btn, .panel, .gallery-item');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to('.cursor-1', { scale: 1.5, background: 'rgba(255, 255, 255, 0.3)', duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to('.cursor-1', { scale: 1, background: 'rgba(255, 255, 255, 0.1)', duration: 0.3 });
      });
    });
  }
}

// ====== 3D Tilt Effect on Panels (Vanilla-Tilt) ======
function initTilt() {
  const tiltElements = $$('.panel'); // The user requested .seccion-flotante, applying to our .panel classes
  if (!tiltElements.length || typeof VanillaTilt === 'undefined') return;

  // For touch devices we disable it or let vanilla-tilt handle it automatically
  VanillaTilt.init(tiltElements, {
    max: 4,             // Menor ángulo máximo para que se sienta más sutil
    perspective: 1500,  // Mayor perspectiva para reducir la distorsión 3D
    speed: 1200,        // Transición de entrada/salida más lenta y suave
    glare: true,
    "max-glare": 0.1,   // Brillo sutil
    scale: 1.015        // Zoom levísimo
  });
}

// ====== IA Lightbox Viewer ======
function initLightbox() {
  const lightbox = $('#aiLightbox');
  const lightboxImg = $('#lbImg');
  const closeBtn = $('#lbClose');
  const prevBtn = $('#lbPrev');
  const nextBtn = $('#lbNext');
  const aiTrack = $('#aiTrack');
  
  if (!lightbox || !aiTrack) return;

  const aiImages = SITE_CONFIG.galleries.ai.map(item => item.image);
  let currentIndex = 0;

  // Add click listeners to AI track images
  aiTrack.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (img) {
      const src = img.getAttribute('src');
      // Resolve absolute/relative src differences if any, usually getAttribute gives exact string
      const index = aiImages.findIndex(i => src.includes(i));
      if (index !== -1) {
        currentIndex = index;
        openLightbox(aiImages[currentIndex]);
      }
    }
  });

  // Make the images show pointer cursor
  $$('#aiTrack .gallery-item img').forEach(img => {
    img.style.cursor = 'pointer';
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('is-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    setTimeout(() => { lightboxImg.src = ''; }, 400); // Clear after fade out
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % aiImages.length;
    lightboxImg.src = aiImages[currentIndex];
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(lightboxImg, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
    }
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + aiImages.length) % aiImages.length;
    lightboxImg.src = aiImages[currentIndex];
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(lightboxImg, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
    }
  }

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}
