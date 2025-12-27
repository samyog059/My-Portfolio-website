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

// Contact Form
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: document.querySelector('input[name="name"]').value,
    email: document.querySelector('input[name="email"]').value,
    subject: document.querySelector('input[name="subject"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  };

  // Change to your deployed API URL when hosting the backend
  const backendURL = "http://localhost:5000/api/contact";

  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      showPopup("✓ Message sent successfully!", "#4BB543");
      document.getElementById("contactForm").reset();
    } else {
      showPopup("✗ " + data.message, "#FF4C4C");
    }
  } catch (error) {
    console.error(error);
    showPopup("Server error!", "#FF4C4C");
  }
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

  setTimeout(() => popup.remove(), 2500);
}
