document.addEventListener('DOMContentLoaded', function () {
    console.log('El script se ha cargado');
    var form = document.getElementById('contactForm');
    form.addEventListener('send', function (event) {
        if (!validarFormulario()) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, false);
});

function validarFormulario() {
    var valido = true;
    var mensajeError = '';

    var fullName = document.getElementById('fullName').value;
    if (fullName.length < 3) {
        mensajeError += 'El nombre completo debe tener al menos 3 caracteres.\n';
        valido = false;
    }

    var phoneNumber = document.getElementById('phoneNumber').value;
    if (!phoneNumber.match(/^\d{9}$/)) { // Ajusta la expresión regular según tu formato de número de teléfono
        mensajeError += 'El número de teléfono no es válido.\n';
        valido = false;
    }

    var email = document.getElementById('email').value;
    if (!email.match(/^\S+@\S+\.\S+$/)) {
        mensajeError += 'La dirección de correo electrónico no es válida.\n';
        valido = false;
    }

    var message = document.getElementById('message').value;
    if (message.length < 10) {
        mensajeError += 'El mensaje debe tener al menos 10 caracteres.\n';
        valido = false;
    }

    if (!valido) {
        alert(mensajeError);
    }

    return valido;
}