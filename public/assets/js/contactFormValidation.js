document.addEventListener("DOMContentLoaded", function() {
    var contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        var isValid = true;

        var fullName = document.getElementById('fullName');
        var phoneNumber = document.getElementById('phoneNumber');
        var email = document.getElementById('email');
        var message = document.getElementById('message');

        // Validación del nombre completo
        if (typeof fullName !== "undefined") {
            // Ahora sabemos que foo está definido, ahora podemos continuar.
        if (!fullName.value.trim()) {
            fullName.nextElementSibling.textContent = "Por favor, introduce tu nombre completo.";
            isValid = false;
        } else {
            fullName.nextElementSibling.textContent = "";
        }
    }

        // Validación del teléfono (ajusta el regex según tus necesidades)
        var phoneRegex = /^[0-9\-\(\)\/\+\s]*$/;
        if (!phoneRegex.test(phoneNumber.value.trim())) {
            phoneNumber.nextElementSibling.textContent = "Por favor, introduce un número de teléfono válido.";
            isValid = false;
        } else {
            phoneNumber.nextElementSibling.textContent = "";
        }

        // Validación del correo electrónico
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.nextElementSibling.textContent = "Por favor, introduce un correo electrónico válido.";
            isValid = false;
        } else {
            email.nextElementSibling.textContent = "";
        }

        // Validación del mensaje
        if (!message.value.trim()) {
            message.nextElementSibling.textContent = "Por favor, introduce tu mensaje.";
            isValid = false;
        } else {
            message.nextElementSibling.textContent = "";
        }

        if (!isValid) {
            event.preventDefault(); // Prevenir que el formulario se envíe
        }
    });
});