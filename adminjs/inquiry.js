// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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

// Load recent form submissions
async function loadRecentSubmissions() {
  const q = query(
    collection(db, "inquiries"), 
    orderBy("submittedAt", "desc"),
    limit(3)
  );

  const querySnapshot = await getDocs(q);
  const container = document.getElementById("recent-submissions-container");

  if (querySnapshot.empty) {
    container.innerHTML = "<p>No recent submissions.</p>";
    return;
  }

  container.innerHTML = ""; // Clear existing entries
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "form-item";
    div.innerHTML = `
    ${data.fullName || "No Name"} - ${data.email || "No Email"}<br>
    Company: ${data.company || "No Company"}
  `;
    container.appendChild(div);
  });
}

loadRecentSubmissions();
