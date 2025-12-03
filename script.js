// Reveal effect for elements
const reveals = document.querySelectorAll('.reveal');

function revealElements() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 100) {
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
        name: this.name.value,
        email: this.email.value,
        subject: this.subject.value,
        message: this.message.value
    };

    fetch("https://script.google.com/macros/s/AKfycbzP7oCTle6tyFIe5cR0v0dP__OxwIta6QSwGLaNs_Gr-E2PgXH7birn5AqHADUT8uV2pQ/exec", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Success popup 
        const popup = document.createElement("div");
        popup.innerText = "Message sent successfully!";
        popup.style.position = "fixed";
        popup.style.top = "20px";
        popup.style.right = "20px";
        popup.style.backgroundColor = "#4BB543";
        popup.style.color = "white";
        popup.style.padding = "15px 20px";
        popup.style.borderRadius = "5px";
        popup.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.2)";
        popup.style.zIndex = "1000";
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 3000);

        this.reset();
    })
    .catch(error => {
        console.error(error);

        // Error popup
        const popup = document.createElement("div");
        popup.innerText = "Error sending message!";
        popup.style.position = "fixed";
        popup.style.top = "20px";
        popup.style.right = "20px";
        popup.style.backgroundColor = "#FF4C4C";
        popup.style.color = "white";
        popup.style.padding = "15px 20px";
        popup.style.borderRadius = "5px";
        popup.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.2)";
        popup.style.zIndex = "1000";
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 3000);
    });
});
