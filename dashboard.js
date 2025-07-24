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

document.getElementById('updateForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newAge = document.getElementById('newAge').value;
    
    try {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            age: newAge
        });
        alert("¡Perfil actualizado!");
        location.reload(); // Recargar para ver cambios
    } catch (error) {
        console.error("Error al actualizar:", error);
    }
});
