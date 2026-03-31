const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let uploadedFiles = [];

document.addEventListener('DOMContentLoaded', () => {
  initImageConverter();
  initQrGenerator();
  initUrlShortener();

  setTimeout(() => {
    initCursor();
    initTilt();
  }, 100);
});

function initImageConverter() {
  const input = $('#imageUpload');
  const previewGallery = $('#previewGallery');
  const downloadLinks = $('#downloadLinks');
  const convertBtn = $('#convertImagesBtn');
  const formatSelect = $('#formatSelect');
  if (!input || !previewGallery || !downloadLinks || !convertBtn || !formatSelect) return;

  input.addEventListener('change', () => {
    uploadedFiles = Array.from(input.files || []);
    previewGallery.innerHTML = '';
    downloadLinks.innerHTML = '';
    uploadedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.alt = file.name;
        previewGallery.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  convertBtn.addEventListener('click', () => {
    const format = formatSelect.value;
    downloadLinks.innerHTML = '';
    if (!uploadedFiles.length) {
      downloadLinks.innerHTML = '<a href="#">Primero carga una o más imágenes.</a>';
      return;
    }
    uploadedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (format === 'image/jpeg') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(img, 0, 0);
          const converted = canvas.toDataURL(format, 0.92);
          const link = document.createElement('a');
          const ext = format === 'image/png' ? 'png' : format === 'image/jpeg' ? 'jpg' : 'webp';
          link.href = converted;
          link.download = `warner-magic-${index + 1}.${ext}`;
          link.textContent = `Descargar imagen ${index + 1} en ${ext.toUpperCase()}`;
          downloadLinks.appendChild(link);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  });
}

function initQrGenerator() {
  const input = $('#qrText');
  const button = $('#generateQrBtn');
  const result = $('#qrResult');
  if (!input || !button || !result) return;
  button.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) {
      result.innerHTML = '<p>Escribe un texto o enlace para generar tu QR.</p>';
      return;
    }
    const encoded = encodeURIComponent(value);
    result.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encoded}" alt="Código QR generado">`;
  });
}

function initUrlShortener() {
  const input = $('#urlInput');
  const button = $('#shortenBtn');
  const copyBtn = $('#copyShortBtn');
  const result = $('#shortUrlResult');
  if (!input || !button || !copyBtn || !result) return;
  button.addEventListener('click', async () => {
    const value = input.value.trim();
    if (!isValidUrl(value)) {
      result.textContent = 'Pega una URL válida que empiece con http:// o https://';
      return;
    }
    result.textContent = 'Procesando…';
    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(value)}`);
      const shortUrl = await response.text();
      result.innerHTML = `<a href="${shortUrl}" target="_blank" rel="noopener noreferrer">${shortUrl}</a>`;
    } catch {
      result.textContent = 'No se pudo acortar la URL en este momento.';
    }
  });
  copyBtn.addEventListener('click', async () => {
    const value = result.textContent.trim();
    if (!value) return;
    try { await navigator.clipboard.writeText(value); copyBtn.textContent = 'Copiado'; }
    catch { copyBtn.textContent = 'No se pudo copiar'; }
    setTimeout(() => copyBtn.textContent = 'Copiar', 1800);
  });
}

function isValidUrl(value) {
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol); }
  catch { return false; }
}

// ====== Custom Glassmorphism Cursor (GSAP) ======
function initCursor() {
  const cursors = $$('.cursor-trail');
  if (!cursors.length || typeof gsap === 'undefined') return;

  if (matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', () => {
      cursors.forEach(c => c.style.opacity = '1');
    }, { once: true });

    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      gsap.to('.cursor-1', { x: clientX, y: clientY, duration: 0.1, ease: 'power2.out' });
      gsap.to('.cursor-2', { x: clientX, y: clientY, duration: 0.25, ease: 'power2.out' });
      gsap.to('.cursor-3', { x: clientX, y: clientY, duration: 0.4, ease: 'power2.out' });
      gsap.to('.cursor-4', { x: clientX, y: clientY, duration: 0.55, ease: 'power2.out' });
    });

    const hoverables = $$('a, button, input, select, .panel');
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
  const tiltElements = $$('.panel');
  if (!tiltElements.length || typeof VanillaTilt === 'undefined') return;

  VanillaTilt.init(tiltElements, {
    max: 4,
    perspective: 1500,
    speed: 1200,
    glare: true,
    "max-glare": 0.1,
    scale: 1.015
  });
}
