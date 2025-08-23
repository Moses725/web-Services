document.addEventListener("DOMContentLoaded", async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAfuAPxTc9iduZB7_mZJZ7iLByaFETfZ9o",
    authDomain: "ai-solutions-5372b.firebaseapp.com",
    projectId: "ai-solutions-5372b",
    storageBucket: "ai-solutions-5372b.appspot.com",
    messagingSenderId: "383381500837",
    appId: "1:383381500837:web:1a3a75525536c105f72e4c",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();

  async function loadPendingReviews() {
    const container = document.getElementById("latest-reviews");

    try {
      const querySnapshot = await db
        .collection("pendingTestimonials")
        .where("approved", "==", false)
        .orderBy("submittedAt", "desc")
        .limit(2)
        .get();

      container.innerHTML = "";

      if (querySnapshot.empty) {
        container.innerHTML = "<p>No pending reviews.</p>";
        return;
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "form-item";
        div.innerHTML = `
          <p><strong>${data.company || "Unknown Company"}</strong><br>${
          data.name || "Unnamed"
        }</p>
        `;
        container.appendChild(div);
      });
    } catch (error) {
      console.error("Error loading reviews:", error);
      document.getElementById("latest-reviews").innerHTML =
        "<p>Failed to load reviews.</p>";
    }
  }

  loadPendingReviews();
});
