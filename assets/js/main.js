// Reveal animation
const reveals = document.querySelectorAll('.reveal');

function revealElements() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// Typewriter effect for hero heading
const typeTarget = document.querySelector('[data-type-text]');

if (typeTarget) {
  const fullText = typeTarget.getAttribute('data-type-text')?.trim() || typeTarget.textContent.trim();
  const typingDelay = 80;
  let index = 0;

  typeTarget.textContent = '';

  const typeNext = () => {
    typeTarget.textContent = fullText.slice(0, index);
    index += 1;

    if (index <= fullText.length) {
      setTimeout(typeNext, typingDelay);
    } else {
      typeTarget.classList.add('typed');
    }
  };

  setTimeout(typeNext, 400);
}

// Contact Form (HTML-only)
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function () {
    showPopup("✓ Sending message...", "#3498db");
  });
}

// Mobile nav toggle
const nav = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('nav a');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', open);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Copy-to-clipboard for share buttons
const copyLinks = document.querySelectorAll('[data-copy-link]');

copyLinks.forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-copy-link');

    if (navigator.clipboard && url) {
      navigator.clipboard.writeText(url)
        .then(() => showPopup('Link copied', '#16a34a'))
        .catch(() => showPopup('Copy failed', '#ef4444'));
    } else if (url) {
      const helper = document.createElement('textarea');
      helper.value = url;
      document.body.appendChild(helper);
      helper.select();
      try {
        document.execCommand('copy');
        showPopup('Link copied', '#16a34a');
      } catch (e) {
        showPopup('Copy failed', '#ef4444');
      }
      document.body.removeChild(helper);
    }
  });
});

// Popup
function showPopup(message, bgColor) {
  const popup = document.createElement("div");
  popup.innerText = message;
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.backgroundColor = bgColor;
  popup.style.color = "white";
  popup.style.padding = "15px 20px";
  popup.style.borderRadius = "6px";
  popup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  popup.style.zIndex = "9999";

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 2000);
}
