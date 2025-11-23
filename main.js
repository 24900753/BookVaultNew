// ===== Firebase imports =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


// ===== Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyCmumPXOxaUrezGXjgEQ47yJoLlxtoZ_qc",
  authDomain: "bookvault-d39fa.firebaseapp.com",
  projectId: "bookvault-d39fa",
  storageBucket: "bookvault-d39fa.firebasestorage.app",
  messagingSenderId: "712953994105",
  appId: "1:712953994105:web:a90c813b0377104e85ada8"
};


// ===== INIT =====
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";


// -------------------- GOOGLE LOGIN --------------------
const provider = new GoogleAuthProvider();

document.getElementById("google-btn").addEventListener("click", () => {
  
  signInWithPopup(auth, provider)
    .then((result) => {

      const user = result.user;

      alert("Logged in as: " + user.email);

      // Save data
      localStorage.setItem("loggedInUser", user.email);
      localStorage.setItem("userPhoto", user.photoURL);

      window.location.href = "index.html";
    })

    .catch((error) => {
      console.error("Google Login Error:", error);
      alert("Google Login Failed ❌");
    });

});



// -------------------- EMAIL LOGIN --------------------
window.validateLogin = function (event) {
  event.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      alert("Logged in as: " + res.user.email);
      localStorage.setItem("loggedInUser", res.user.email);
      window.location.href = "index.html";
    })
    .catch((err) => {
      if (err.code === "auth/user-not-found") {
        alert("❌ No account found. Please use *Create New Account*.");
      } else if (err.code === "auth/wrong-password") {
        alert("❌ Wrong Password.");
      } else if (err.code === "auth/invalid-email") {
        alert("❌ Invalid Email Format.");
      } else if (err.code === "auth/invalid-credential") {
        alert("❌ This email is registered with Google. Use Continue with Google.");
      } else {
        alert("❌ Error: " + err.message);
      }
    });
};


// -------------------- SIGNUP --------------------
document.getElementById("signup-btn").addEventListener("click", () => {
  const email = prompt("Enter Email:");
  const password = prompt("Enter Password (8+ chars):");

  if (!email || !password) return alert("Email & Password required!");

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("🎉 Account created successfully! Now login.");
    })
    .catch((err) => {
      alert("❌ " + err.message);
    });
});

