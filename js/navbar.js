let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY) {
    // Scrolling down - hide nav
    navbar.style.transform = "translateY(-100%)";
    navbar.style.opacity = "0";
  } else {
    // Scrolling up - show nav
    navbar.style.transform = "translateY(0)";
    navbar.style.opacity = "1";
  }
  lastScrollY = currentScrollY;
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
