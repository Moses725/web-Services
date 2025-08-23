import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
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

const container = document.getElementById("testimonial-container");

async function loadApprovedTestimonials() {
  try {
    const q = query(
      collection(db, "testimonials"),
      where("approved", "==", true),
      limit(6),
      orderBy("submittedAt", "desc") 
    );
    const snapshot = await getDocs(q);
    container.innerHTML = "";

    if (snapshot.empty) {
      container.innerHTML =
        "<p style='color: white;'>No testimonials available yet.</p>";
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      const stars = "★".repeat(data.rating || 0).padEnd(5, "☆");

      const card = document.createElement("div");
      card.className = "testimonial-card";
      card.innerHTML = `
          <div class="stars">${stars}</div>
          <h3>${data.company || "Unnamed Company"}</h3>
          <p>"${data.review || "No review text provided."}"</p>
        `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading testimonials:", error);
    container.innerHTML =
      "<p style='color: white;'>Failed to load testimonials.</p>";
  }
}

loadApprovedTestimonials();
