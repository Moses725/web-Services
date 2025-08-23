import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfuAPxTc9iduZB7_mZJZ7iLByaFETfZ9o",
  authDomain: "ai-solutions-5372b.firebaseapp.com",
  projectId: "ai-solutions-5372b",
  storageBucket: "ai-solutions-5372b.appspot.com",
  messagingSenderId: "383381500837",
  appId: "1:383381500837:web:1a3a75525536c105f72e4c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const modal = document.getElementById("feedback-modal");
const starsDiv = document.getElementById("stars");
const form = document.getElementById("testimonial-form");
const closeButton = document.getElementById("feeback-close-modal"); // Make sure this exists in HTML

let selectedRating = 0;

// Star selection logic
starsDiv.addEventListener("click", (e) => {
  if (e.target.textContent === "★") {
    selectedRating = Array.from(starsDiv.children).indexOf(e.target) + 1;
    Array.from(starsDiv.children).forEach((star, index) => {
      star.classList.toggle("selected", index < selectedRating);
    });
  }
});

document.getElementById("open-feedback-modal").addEventListener("click", () => {
  modal.style.display = "flex";
});

function closeModal() {
  modal.style.display = "none";
  form.reset();
  Array.from(starsDiv.children).forEach((star) =>
    star.classList.remove("selected")
  );
  selectedRating = 0;
}

// Add event listeners for both close elements
document
  .querySelector(".feedback-close-modal")
  .addEventListener("click", closeModal);
document
  .querySelector(".feedback-modal-overlay")
  .addEventListener("click", closeModal);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const company = document.getElementById("company").value.trim();
  const projectId = document.getElementById("projectId").value.trim();
  const review = document.getElementById("review").value.trim();

  if (!name || !company || !projectId || !review || !selectedRating) {
    alert("Please fill in all fields and select a rating.");
    return;
  }

  try {
    await addDoc(collection(db, "pendingTestimonials"), {
      name,
      company,
      projectId,
      review,
      rating: selectedRating,
      approved: false,
      submittedAt: serverTimestamp(),
    });

    alert("Thank you for your feedback! It will be reviewed by our team.");
    closeModal();
    form.reset();
    modal.style.display = "none";
  } catch (err) {
    console.error("Submission error:", err);
    alert("Error submitting your feedback. Please try again.");
  }
});
