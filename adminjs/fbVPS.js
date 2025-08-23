import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfuAPxTc9iduZB7_mZJZ7iLByaFETfZ9o",
  authDomain: "ai-solutions-5372b.firebaseapp.com",
  projectId: "ai-solutions-5372b",
  storageBucket: "ai-solutions-5372b.firebasestorage.app",
  messagingSenderId: "383381500837",
  appId: "1:383381500837:web:1a3a75525536c105f72e4c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadVisitStats() {
  const querySnapshot = await getDocs(collection(db, "sectionVisits"));
  const container = document.getElementById("visit-stats");

  if (querySnapshot.empty) {
    container.innerHTML = "<p>No section data available.</p>";
    return;
  }

  let total = 0;
  const stats = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    total += data.count || 0;
    stats.push(data);
  });

  // Sort stats by count descending and take top 4
  const topStats = stats
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, 4);

  container.innerHTML = ""; // Clear any existing entries

  topStats.forEach((data) => {
    const percent = total ? ((data.count / total) * 100).toFixed(1) : 0;
    const div = document.createElement("div");
    div.className = "circular";
    div.innerHTML = `
      <span>${percent}%</span>
      <p style="font-size: 14px;">${data.name}</p>
    `;
    container.appendChild(div);
  });
}

loadVisitStats();
