import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth-compat.js"; // <-- changed to compat

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfuAPxTc9iduZB7_mZJZ7iLByaFETfZ9o",
  authDomain: "ai-solutions-5372b.firebaseapp.com",
  projectId: "ai-solutions-5372b",
  storageBucket: "ai-solutions-5372b.firebaseapp.com",
  messagingSenderId: "383381500837",
  appId: "1:383381500837:web:1a3a75525536c105f72e4c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Enable app verification bypass for testing
auth.settings.appVerificationDisabledForTesting = true;
const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      alert("Please verify your email before continuing.");
      return;
    }

    // Get admin record
    const q = query(collection(db, "admins"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      alert("Admin record not found.");
      return;
    }

    const adminData = snapshot.docs[0].data();
    const adminName = adminData.name || "Admin";
    const phone = adminData.phone;

    if (!phone) {
      alert("No phone number found for this admin.");
      return;
    }

    // ✅ Set up invisible reCAPTCHA verifier for testing
    const dummyContainer = document.createElement("div");
    dummyContainer.id = "recaptcha-container";
    document.body.appendChild(dummyContainer);

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible"
      },
      auth
    );

    // Send SMS
    const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
    window.confirmationResult = confirmationResult;

    // Show OTP input screen
    document.getElementById("otp-screen").style.display = "block";

    document.getElementById("verify-otp-btn").addEventListener("click", async () => {
      const otpCode = document.getElementById("otp-code").value.trim();
      try {
        await confirmationResult.confirm(otpCode);

        const welcomeScreen = document.getElementById("welcome-screen");
        const welcomeMessage = document.getElementById("welcome-message");
        welcomeMessage.textContent = `Welcome, ${adminName}!`;
        welcomeScreen.style.display = "flex";

        setTimeout(() => {
          window.location.href = "admin.html";
        }, 2000);
      } catch (error) {
        console.error("OTP error:", error);
        alert("Invalid code. Please try again.");
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed: " + error.message);
  }
});
