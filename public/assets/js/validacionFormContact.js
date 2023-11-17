document.addEventListener('DOMContentLoaded', function () {
    console.log('El script se ha cargado');
    var form = document.getElementById('contactForm');
    form.addEventListener('submit', function (event) { // Cambiado de 'send' a 'submit'
        if (!validarFormulario()) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, false);
});

function validarFormulario() {
    var valido = true;
    var mensajeError = '';

    var fullName = document.getElementById('contact_form_fullName').value;
    if (fullName.length < 3) {
        mensajeError += 'El nombre completo debe tener al menos 3 caracteres.\n';
        valido = false;
    }

    var phoneNumber = document.getElementById('contact_form_phoneNumber').value;
    if (!phoneNumber.match(/^\d{9}$/)) { // Ajusta la expresión regular según tu formato de número de teléfono
        mensajeError += 'El número de teléfono no es válido.\n';
        valido = false;
    }

    var email = document.getElementById('contact_form_email').value;
    if (!email.match(/^\S+@\S+\.\S+$/)) {
        mensajeError += 'La dirección de correo electrónico no es válida.\n';
        valido = false;
    }

    var message = document.getElementById('contact_form_message').value;
    if (message.length < 10) {
        mensajeError += 'El mensaje debe tener al menos 10 caracteres.\n';
        valido = false;
    }

    if (!valido) {
        alert(mensajeError);
    }

    return valido;
}
