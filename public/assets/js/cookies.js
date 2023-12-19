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

//Ventanas flotantes register y cookies
document.addEventListener('DOMContentLoaded', (event) => {
    if (!verificarAceptacionCookies()) {
        // Si las cookies no han sido aceptadas, muestra el modal de cookies
        mostrarCookiesModal();
    } else {
        // Si las cookies ya han sido aceptadas, muestra el registerWindow después de 2 minutos (120,000 milisegundos)
        setTimeout(mostrarRegisterWindow, 2000);
    }
});

//Aviso de cookies
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
        // Una vez cerrado el modal de cookies, programa la aparición de registerWindow después de 2 minutos
        setTimeout(mostrarRegisterWindow, 2000);
    }
}

//Ventana registro modal
function mostrarRegisterWindow() {
    var registerWindow = document.getElementById('registerWindow');
    if (registerWindow) {
        registerWindow.style.display = 'block';
    }
}

function cerrarRegisterWindow() {
    var registerWindow = document.getElementById('registerWindow');
    if (registerWindow) {
        registerWindow.style.display = 'none';
    }
}

//Cookies
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