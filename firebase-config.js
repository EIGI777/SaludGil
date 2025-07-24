  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBBzkIspTEddUQeiecXGU4-2y8N8vdOXxA",
    authDomain: "saludgil-ad9f3.firebaseapp.com",
    projectId: "saludgil-ad9f3",
    storageBucket: "saludgil-ad9f3.firebasestorage.app",
    messagingSenderId: "454890537120",
    appId: "1:454890537120:web:e985a8bc9e79f63c3209c5",
    measurementId: "G-ZLYYL9R44X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = firebase.auth();
