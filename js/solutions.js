const titles = [
    "AI-Powered Virtual Assistant",
    "AI-Driven Performance Analytics",
    "Employee Sentiment Analysis Tool",
    "AI-Optimised Recruitment Platform",
    "Smart Workspace Optimisation"
];

const descriptions = [
    "Streamline workflows and manage tasks with ease using our AI-driven assistant.",
    "Unlock actionable insights into employee performance and skill gaps.",
    "Analyse employee feedback to improve satisfaction and engagement.",
    "Simplify hiring with AI-driven resume screening and onboarding.",
    "Optimise your workspace for hybrid work models and resource allocation."
];

const pointsList = [
    ["Saves time and boosts productivity.", "Improves communication and task organisation.", "Reduces reliance on IT support.", "Enhances user experience and satisfaction."],
    ["Enhances productivity through tracking.", "Empowers managers with real-time dashboards.", "Aligns goals with organisational objectives.", "Boosts team performance and morale."],
    ["Addresses concerns proactively.", "Strengthens engagement and retention.", "Empowers HR teams with insights.", "Improves employee satisfaction and loyalty."],
    ["Accelerates hiring processes.", "Ensures the best candidate fit.", "Streamlines onboarding procedures.", "Reduces recruitment costs and time."],
    ["Enhances space utilisation.", "Supports flexible work environments.", "Reduces operational costs.", "Boosts employee productivity and satisfaction."]
    
];

const backgrounds = [
    "url('images/cardbg.png')"
];

let currentIndex = 0;
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const pointsElement = document.getElementById("points");
const cards = document.querySelectorAll(".card");
const sliderSection = document.querySelector(".slider-section");
sliderSection.style.backgroundSize = 'cover';
sliderSection.style.backgroundPosition = 'center';
sliderSection.style.backgroundRepeat = 'no-repeat';

function updateSlider(index) {
    titleElement.textContent = titles[index];
    descriptionElement.textContent = descriptions[index];
    pointsElement.innerHTML = pointsList[index].map(point => `<li>${point}</li>`).join("");

    cards.forEach((card, i) => {
        card.classList.toggle("active", i === index);
    });

    sliderSection.style.backgroundImag = backgrounds[index];
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % titles.length;
    updateSlider(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + titles.length) % titles.length;
    updateSlider(currentIndex);
}

document.getElementById("next").addEventListener("click", () => {
    clearInterval(autoSlide);
    nextSlide();
});

document.getElementById("prev").addEventListener("click", () => {
    clearInterval(autoSlide);
    prevSlide();
});

const autoSlide = setInterval(nextSlide, 30000); 

updateSlider(currentIndex);