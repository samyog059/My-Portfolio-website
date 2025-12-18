// Reveal effect for elements
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

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        subject: document.querySelector('input[name="subject"]').value,
        message: document.querySelector('textarea[name="message"]').value,
    };

    // Send to live backend
    const backendURL = "https://my-portfolio-website-wbz1.onrender.com/api/contact";
    
    fetch(backendURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showPopup("✓ Message sent successfully!", "#4BB543");
            document.getElementById("contactForm").reset();
        } else {
            showPopup("✗ " + data.message, "#FF4C4C");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showPopup("Error sending message!", "#FF4C4C");
    });
});

// Popup function
function showPopup(message, bgColor) {
    const popup = document.createElement("div");
    popup.innerText = message;
    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.right = "20px";
    popup.style.backgroundColor = bgColor;
    popup.style.color = "white";
    popup.style.padding = "15px 20px";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.2)";
    popup.style.zIndex = "1000";
    popup.style.opacity = "1";
    popup.style.transition = "opacity 0.5s ease";
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 500);
    }, 2500);
}

