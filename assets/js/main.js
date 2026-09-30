/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    isOpen
  );

  menuToggle.textContent =
    isOpen ? "✕" : "☰";

});


/* Close menu after clicking a link */

navLinks.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.textContent = "☰";

  });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    }

  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
  document.querySelectorAll("section[id]");

const navItems =
  document.querySelectorAll(".nav-links a");


function updateActiveNav() {

  let currentSection = "";

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 160;

    if (
      window.scrollY >= sectionTop
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });


  navItems.forEach(link => {

    const href =
      link.getAttribute("href");

    link.classList.toggle(
      "active",
      href === `#${currentSection}`
    );

  });

}


window.addEventListener(
  "scroll",
  updateActiveNav,
  { passive: true }
);

updateActiveNav();


/* =========================================
   CURRENT YEAR
========================================= */

const year =
  new Date().getFullYear();

const yearElement =
  document.querySelector("footer strong");

if (yearElement) {
  // Year is intentionally kept in HTML
  // so the footer remains SEO readable.
}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
  document.querySelector(".contact-form");

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    () => {

      const button =
        contactForm.querySelector(
          ".submit-btn"
        );

      if (button) {

        button.innerHTML =
          "Sending... <span>→</span>";

      }

    }
  );

}
