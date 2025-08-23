import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config
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

// Elements
const openForm = document.querySelector(".subscribe-form");
const modal = document.getElementById("subscribe-modal");
const subscribeForm = document.getElementById("subscribe-form");
const emailInput = document.getElementById("subscriber-email");

// Open modal
openForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (emailInput.value.trim()) {
    modal.style.display = "flex";
  } else {
    alert("Please enter a valid email.");
  }
});

// Close modal function
window.closeModal = function () {
  modal.style.display = "none";
  subscribeForm.reset();
};

// Handle submission
subscribeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const checkboxes = document.querySelectorAll("input[name='events']:checked");
  const selectedEvents = Array.from(checkboxes).map((cb) => cb.value);
  const email = emailInput.value.trim();

  if (!selectedEvents.length) {
    alert("Please select at least one event.");
    return;
  }

  try {
    await addDoc(collection(db, "subscribers"), {
      email,
      events: selectedEvents,
      subscribedAt: serverTimestamp(),
    });
    alert("Successfully subscribed!");
    closeModal();
    emailInput.value = "";
  } catch (error) {
    console.error("Subscription error:", error);
    alert("Something went wrong. Please try again.");
  }
});
