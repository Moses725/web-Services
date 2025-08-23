import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
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

const listContainer = document.getElementById("review-list");
const modal = document.getElementById("review-modal");
const modalContent = document.getElementById("modal-content");

let currentReview = null;

async function loadReviews() {
  const q = query(
    collection(db, "pendingTestimonials"),
    where("approved", "==", false)
  );

  const snapshot = await getDocs(q);
  listContainer.innerHTML = "";

  if (snapshot.empty) {
    listContainer.innerHTML = "<p>No pending reviews.</p>";
    return;
  }

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <p><strong>${data.company || "Unknown Company"}</strong></p>
      <p>${data.name || "Anonymous"}</p>
    `;

    card.addEventListener("click", () => {
      currentReview = { id: docSnap.id, ...data };
      openModal(currentReview);
    });

    listContainer.appendChild(card);
  });
}

function openModal(review) {
  modalContent.innerHTML = `
    <h3>${review.company}</h3>
    <p><strong>Name:</strong> ${review.name}</p>
    <p><strong>Project ID:</strong> ${review.projectId}</p>
    <p><strong>Rating:</strong> ${"★".repeat(review.rating)}</p>
    <p><strong>Review:</strong> ${review.review}</p>
    <div style="margin-top: 15px;">
      <button class="approve-btn">Approve</button>
      <button class="delete-btn">Delete</button>
      <button class="close-btn">Close</button>
    </div>
  `;

  modal.style.display = "flex";

  modalContent.querySelector(".approve-btn").onclick = approveReview;
  modalContent.querySelector(".delete-btn").onclick = deleteReview;
  modalContent.querySelector(".close-btn").onclick = () => {
    modal.style.display = "none";
  };
}

async function approveReview() {
  if (!currentReview) return;

  await addDoc(collection(db, "testimonials"), {
    name: currentReview.name,
    company: currentReview.company,
    rating: currentReview.rating,
    review: currentReview.review,
    projectId: currentReview.projectId,
    approved: true,
    submittedAt: currentReview.submittedAt || serverTimestamp(),
  });

  await deleteDoc(doc(db, "pendingTestimonials", currentReview.id));
  alert("Review approved!");
  modal.style.display = "none";
  loadReviews();
}

async function deleteReview() {
  if (!currentReview) return;

  await addDoc(collection(db, "deletions"), {
    type: "testimonial",
    deletedAt: serverTimestamp(),
    deletedBy: localStorage.getItem("adminEmail") || "Unknown Admin",
    ...currentReview,
  });

  await deleteDoc(doc(db, "pendingTestimonials", currentReview.id));
  alert("Review deleted!");
  modal.style.display = "none";
  loadReviews();
}

loadReviews();
