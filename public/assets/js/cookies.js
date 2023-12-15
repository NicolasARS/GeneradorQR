function verificarAceptacionCookies() {
    var todasLasCookies = document.cookie.split(';');
    for (var i = 0; i < todasLasCookies.length; i++) {
        var cookie = todasLasCookies[i].trim();
        if (cookie.startsWith('aceptar_cookies=')) {
            return true;
        }
    }
    return false;
}

document.addEventListener('DOMContentLoaded', (event) => {
    if (!verificarAceptacionCookies()) {
        // Temporizador para mostrar el modal después de 2 segundos
        setTimeout(mostrarCookiesModal, 2000);
    }
});

function mostrarCookiesModal() {
    var modal = document.getElementById("cookiesModal");
    if (modal) {
        modal.style.display = "block";
    }
}

function cerrarCookiesModal() {
    var modal = document.getElementById("cookiesModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Función que maneja la aceptación de cookies
function aceptarCookies() {
    fetch('/aceptar-cookies')
    .then(response => {
        if(response.ok) {
            console.log('Cookies aceptadas.');
            cerrarCookiesModal();
        // Aquí puedes añadir más código si necesitas hacer algo después de aceptar las cookies
        }
    })
    .catch(error => console.error('Error:', error));
    ;
}

// Visitado login cookies
window.onload = function() {
    fetch('/login-visited-cookie')
    .then(response => {
        if(response.ok) {
            console.log('Cookie "visitado_login" establecida.');
        }
    })
    .catch(error => console.error('Error:', error));
};