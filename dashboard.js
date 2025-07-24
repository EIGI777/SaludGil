import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

auth.onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        // Obtener datos de Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById("profileName").textContent = userData.name;
            document.getElementById("profileAge").textContent = userData.age;
            document.getElementById("profileGender").textContent = userData.gender;
        }
    }
});
