document.getElementById('loginBtn').addEventListener('click', () => {
    window.location.href = 'login.html'; // Crearás esto después
});

document.getElementById('signupBtn').addEventListener('click', () => {
    window.location.href = 'signup.html'; // Crearás esto después
});

// Opcional: Verificar si el usuario ya está autenticado
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("Usuario logueado:", user.email);
        // Redirigir a dashboard.html (lo crearás luego)
    }
});
