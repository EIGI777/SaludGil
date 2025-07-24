// Configuración de Firebase (ya está en firebase-config.js)
const auth = firebase.auth();

// Login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "dashboard.html"; // Redirigir al dashboard (lo crearemos después)
        })
        .catch((error) => {
            document.getElementById('loginError').textContent = error.message;
        });
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
