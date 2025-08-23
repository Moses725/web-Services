import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAfuAPxTc9iduZB7_mZJZ7iLByaFETfZ9o",
  authDomain: "ai-solutions-5372b.firebaseapp.com",
  projectId: "ai-solutions-5372b",
  storageBucket: "ai-solutions-5372b.firebasestorage.app",
  messagingSenderId: "383381500837",
  appId: "1:383381500837:web:1a3a75525536c105f72e4c",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// List of tracked section IDs
const sections = [
  "about",
  "solutions",
  "gallery",
  "feedback",
  "contact",
  "article",
  "events"
];

// IntersectionObserver to track visits
const observer = new IntersectionObserver(
  async (entries) => {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        const ref = doc(db, "sectionVisits", sectionId);

        try {
          const snap = await getDoc(ref);
          if (snap.exists()) {
            await updateDoc(ref, { count: increment(1) });
          } else {
            await setDoc(ref, { name: sectionId, count: 1 });
          }
        } catch (err) {
          console.error(`Error logging visit to ${sectionId}:`, err);
        }

        observer.unobserve(entry.target); // only count once per session
      }
    }
  },
  { threshold: 0.5 }
);

// Start observing each section
sections.forEach((id) => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});
