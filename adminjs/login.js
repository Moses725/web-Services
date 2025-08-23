import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAfuAPxTc9iduZB7_mZJZ7iLByaFETfZ9o",
  authDomain: "ai-solutions-5372b.firebaseapp.com",
  projectId: "ai-solutions-5372b",
  storageBucket: "ai-solutions-5372b.firebasestorage.app",
  messagingSenderId: "383381500837",
  appId: "1:383381500837:web:1a3a75525536c105f72e4c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user.emailVerified) {
      alert("Please verify your email address before logging in.");
      return;
    }

    // Get admin name from Firestore
    const q = query(collection(db, "admins"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);

    let adminName = "Admin";
    if (!snapshot.empty) {
      adminName = snapshot.docs[0].data().name || "Admin";
    }

    // Show welcome screen
    const welcomeScreen = document.getElementById("welcome-screen");
    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = `Welcome, ${adminName}!`;
    welcomeScreen.style.display = "flex";

    // Redirect after delay
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 2000);
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed: " + error.message);
  }
});
