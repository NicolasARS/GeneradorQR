document.getElementById("formularioId").onsubmit = function(event) {
    var valido = true;

    // Validación del nombre
    var nombre = document.getElementById("registration_form_name").value;
    if (nombre.length === 0) {
        alert("Por favor, ingresa tu nombre completo.");
        valido = false;
    }

    // Validación del correo electrónico
    var correo = document.getElementById("registration_form_email").value;
    if (correo.length === 0 || !correo.includes("@")) {
        alert("Por favor, ingresa un correo electrónico válido.");
        valido = false;
    }

    // Validación de la contraseña
    var contraseña = document.getElementById("registration_form_plainPassword").value;
    if (contraseña.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        valido = false;
    }

    // Validación de los términos y condiciones
    var terminos = document.getElementById("registration_form_agreeTerms").checked;
    if (!terminos) {
        alert("Debes aceptar los términos y condiciones.");
        valido = false;
    }

    // Si alguna validación falla, previene el envío del formulario
    if (!valido) {
        event.preventDefault();
    }
};
