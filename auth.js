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

// Registro
// En auth.js (dentro del evento de registro)
document.getElementById('signupForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Guardar el nombre en Firestore (o en el perfil de Auth)
            return userCredential.user.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            document.getElementById('signupError').textContent = error.message;
        });
});
