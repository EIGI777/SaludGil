// Configuración de Firebase (ya está en firebase-config.js)
const auth = firebase.auth();

// Función para mostrar mensajes
function showMessage(elementId, message, isError = true) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.color = isError ? '#e74c3c' : '#2ecc71'; // Rojo para error, verde para éxito
    setTimeout(() => element.textContent = '', 5000); // Limpiar después de 5 segundos
}

// Login mejorado
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        showMessage('loginStatus', 'Iniciando sesión...', false);
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        showMessage('loginStatus', '¡Bienvenido! Redirigiendo...', false);
        setTimeout(() => window.location.href = "dashboard.html", 1500);
    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'Usuario no registrado.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Contraseña incorrecta.';
                break;
            default:
                errorMessage = 'Error al iniciar sesión. Intenta nuevamente.';
        }
        showMessage('loginStatus', `❌ ${errorMessage}`);
    }
});

import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Inicializar Firestore
const db = getFirestore();

document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;

    try {
        // 1. Crear usuario en Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // 2. Guardar datos adicionales en Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
            name,
            email,
            gender,
            age,
            createdAt: new Date()
        });

        // 3. Redirigir al dashboard
        window.location.href = "dashboard.html";
    } catch (error) {
        document.getElementById('signupError').textContent = `Error: ${error.message}`;
    }
});
