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

// Contact Form (HTML-only)
const form = document.getElementById("contactForm");

form.addEventListener("submit", function () {
  showPopup("✓ Sending message...", "#3498db");
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
