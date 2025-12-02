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


document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission

    const formData = {
        name: this.name.value,
        email: this.email.value,
        subject: this.subject.value,
        message: this.message.value
    };

    fetch("https://script.google.com/macros/s/AKfycbzvJD9o_ek07AlwGqKhEvta-gQRDeWgLvRJ6hyFwTzbqQwQG02wxYtECq705-Ug6cinPw/exec", {
        method: "POST",
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Create popup
        const popup = document.createElement("div");
        popup.innerText = "Message sent successfully!";
        popup.style.position = "fixed";
        popup.style.top = "20px";
        popup.style.right = "20px";
        popup.style.backgroundColor = "#4BB543"; // Green
        popup.style.color = "white";
        popup.style.padding = "15px 20px";
        popup.style.borderRadius = "5px";
        popup.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.2)";
        popup.style.zIndex = "1000";
        document.body.appendChild(popup);

        // Remove popup after 3 seconds
        setTimeout(() => {
            popup.remove();
        }, 3000);

        this.reset(); // Reset form
    })
    .catch(error => {
        console.error(error);

        // Show error popup
        const popup = document.createElement("div");
        popup.innerText = "Error sending message!";
        popup.style.position = "fixed";
        popup.style.top = "20px";
        popup.style.right = "20px";
        popup.style.backgroundColor = "#FF4C4C"; // Red
        popup.style.color = "white";
        popup.style.padding = "15px 20px";
        popup.style.borderRadius = "5px";
        popup.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.2)";
        popup.style.zIndex = "1000";
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 3000);
    });
});

