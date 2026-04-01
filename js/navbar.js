let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  
  // Close hamburger menu on scroll
  if (navLinks.classList.contains("active")) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
  
  // Keep navbar visible at all times
  navbar.style.transform = "translateY(0)";
  navbar.style.opacity = "1";
  
  lastScrollY = currentScrollY;
});

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

let navList = document.querySelectorAll("nav .nav-links a");
let sections = document.querySelectorAll("section");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navList.forEach((a) => {
        a.classList.remove("active");
      });
      document
        .querySelector("nav .nav-links a[href*=" + id + "]")
        .classList.add("active");
    }
  });
};
