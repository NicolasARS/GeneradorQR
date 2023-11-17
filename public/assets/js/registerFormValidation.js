document.getElementById("formularioId").onsubmit = function(event) {
    var valido = true;
    var mensajeError = '';

    // Validación del nombre
    var nombre = document.getElementById("registration_form_name").value;
    if (nombre.length === 0) {
        mensajeError +="Por favor, ingresa tu nombre completo.\n";

        valido = false;
    }

    // Validación del correo electrónico
    var correo = document.getElementById("registration_form_email").value;
    if (correo.length === 0 || !correo.includes("@")) {
        mensajeError +="Por favor, ingresa un correo electrónico válido.\n";
        valido = false;
    }

    // Validación de la contraseña
    var contraseña = document.getElementById("registration_form_plainPassword").value;
    if (contraseña.length < 8) {
        mensajeError +="La contraseña debe tener al menos 8 caracteres.\n";
        valido = false;
    }

    // Validación de los términos y condiciones
    var terminos = document.getElementById("registration_form_agreeTerms").checked;
    if (!terminos) {
        mensajeError +="Debes aceptar los términos y condiciones.\n";
        valido = false;
    }

    // Si alguna validación falla, previene el envío del formulario
    if (!valido) {
        alert(mensajeError);
        event.preventDefault();
    }
    return valido;
};
