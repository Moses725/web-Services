const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navList = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

function setActiveLink() {
  let scrollPos = window.scrollY + 150;

  sections.forEach((sec) => {
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (scrollPos >= offset && scrollPos < offset + height) {
      navList.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href") === "#" + id) {
          a.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", () => {
  // Close hamburger menu on scroll
  if (navLinks.classList.contains("active")) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }

  setActiveLink();
});

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}

navList.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

setActiveLink();
