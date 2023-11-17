// Función para mostrar el modal de cookies
function mostrarCookiesModal() {
    var modal = document.getElementById("cookiesModal");
    modal.style.display = "block";
}

// Función para cerrar el modal de cookies
function cerrarCookiesModal() {
    var modal = document.getElementById("cookiesModal");
    modal.style.display = "none";
}

// Función que maneja la aceptación de cookies
function aceptarCookies() {
    // Aquí puedes agregar código para manejar la aceptación de cookies
    cerrarCookiesModal();
}

// Mostrar el modal después de un cierto retardo (ejemplo: 2 segundos)
setTimeout(mostrarCookiesModal, 1000);