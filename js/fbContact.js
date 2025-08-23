// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAfuAPxTc9iduZB7_mZJZ7iLByaFETfZ9o",
  authDomain: "ai-solutions-5372b.firebaseapp.com",
  projectId: "ai-solutions-5372b",
  storageBucket: "ai-solutions-5372b.firebasestorage.app",
  messagingSenderId: "383381500837",
  appId: "1:383381500837:web:1a3a75525536c105f72e4c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference the form
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = grecaptcha.getResponse();
  if (!token) {
    alert("Please verify you are not a robot!");
    return;
  }

  const fullName = contactForm.querySelector(
    'input[placeholder="full name"]'
  ).value;
  const phone = contactForm.querySelector(
    'input[placeholder="+44 123 456 789"]'
  ).value;
  const email = contactForm.querySelector('input[type="email"]').value;
  const company = contactForm.querySelector(
    'input[placeholder="company name"]'
  ).value;
  const country = contactForm.querySelector(
    'input[placeholder="country"]'
  ).value;
  const jobTitle = contactForm.querySelector(
    'input[placeholder="job title"]'
  ).value;
  const about = contactForm.querySelector("textarea").value;

  try {
    await addDoc(collection(db, "inquiries"), {
      fullName,
      phone,
      email,
      company,
      country,
      jobTitle,
      about,
      submittedAt: serverTimestamp(),
    });

    alert("Thanks! Your message has been submitted.");
    contactForm.reset();
  } catch (err) {
    console.error("Submission error:", err);
    alert("Oops! Something went wrong.");
  }
});
