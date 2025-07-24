// Obtener usuario actual y mostrar nombre
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "login.html"; // Redirigir si no hay sesión
    } else {
        document.getElementById("userName").textContent = user.displayName || "Usuario";
    }
});

// Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", () => {
    auth.signOut()
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Error al cerrar sesión: " + error.message);
        });
});
