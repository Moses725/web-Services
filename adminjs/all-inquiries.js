import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp
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

const container = document.getElementById("inquiries-container");
const modal = document.getElementById("inquiry-modal");
const inquiryDetails = document.getElementById("inquiry-details");
const respondBtn = document.getElementById("respond-btn");
const deleteBtn = document.getElementById("delete-btn");

let currentInquiry = null;

// Load inquiries
async function loadAllInquiries() {
  const q = query(collection(db, "inquiries"), orderBy("submittedAt", "desc"));
  const snapshot = await getDocs(q);
  container.innerHTML = "";

  if (snapshot.empty) {
    container.innerHTML = "<p>No inquiries found.</p>";
    return;
  }

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const docId = docSnap.id;

    let submittedAt = "Unknown time";
    if (data.submittedAt?.toDate) {
      submittedAt = data.submittedAt.toDate().toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short"
      });
    }

    const div = document.createElement("div");
    div.className = "inquiry";
    div.innerHTML = `
      <p><strong>${data.fullName || "Unnamed"} - ${data.email || "No email"}</strong></p>
      <p style="font-size: 0.85rem; color: #777;">Submitted on: ${submittedAt}</p>
    `;

    div.addEventListener("click", () => {
      currentInquiry = { id: docId, ...data, submittedAt };
      showModal(currentInquiry);
    });

    container.appendChild(div);
  });
}

// Show modal
function showModal(inquiry) {
  inquiryDetails.innerHTML = `
    <h3>${inquiry.fullName || "Unnamed"}</h3>
    <p><strong>Email:</strong> ${inquiry.email || "No email"}</p>
    <p><strong>Phone:</strong> ${inquiry.phone || "N/A"}</p>
    <p><strong>Company:</strong> ${inquiry.company || "N/A"}</p>
    <p><strong>Country:</strong> ${inquiry.country || "N/A"}</p>
    <p><strong>Job Title:</strong> ${inquiry.jobTitle || "N/A"}</p>
    <p><strong>Details:</strong><br>${inquiry.about || "N/A"}</p>
    <p style="font-size: 0.85rem; color: #555;"><strong>Submitted:</strong> ${inquiry.submittedAt}</p>
  `;
  document.getElementById("admin-response").value = "";
  modal.style.display = "flex";
}

// Close modal
window.closeModal = function () {
  modal.style.display = "none";
  currentInquiry = null;
};

// Respond to inquiry
respondBtn.addEventListener("click", async () => {
  const responseText = document.getElementById("admin-response").value.trim();
  const adminEmail = localStorage.getItem("adminEmail");

  if (!currentInquiry || !responseText || !adminEmail) return alert("Missing info");

  await addDoc(collection(db, "responses"), {
    inquiryId: currentInquiry.id,
    respondedByUID: localStorage.getItem("adminUID"),
    response: responseText,
    respondedBy: adminEmail,
    respondedAt: serverTimestamp(),
  });

  alert("Response submitted.");
  closeModal();
});

// Delete inquiry
deleteBtn.addEventListener("click", async () => {
  const adminEmail = localStorage.getItem("adminEmail");

  if (!currentInquiry || !adminEmail) return alert("Missing info");

  await deleteDoc(doc(db, "inquiries", currentInquiry.id));

  await addDoc(collection(db, "deletions"), {
    inquiryId: currentInquiry.id,
    deletedByUID: localStorage.getItem("adminUID"),
    deletedBy: adminEmail,
    deletedAt: serverTimestamp(),
    email: currentInquiry.email,
    fullName: currentInquiry.fullName,
  });

  alert("Inquiry deleted.");
  closeModal();
  loadAllInquiries();
});

loadAllInquiries();
