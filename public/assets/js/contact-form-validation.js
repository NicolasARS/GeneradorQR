document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(event) {
        let isValid = true;

        // Validación del nombre completo
        const fullNameInput = document.getElementById('fullName');
        if (!fullNameInput.value.trim()) {
            isValid = false;
            fullNameInput.classList.add('is-invalid');
            // Añadir aquí el código para mostrar el mensaje de error
            fullNameInput.nextElementSibling.style.display = 'block';
        } else {
            fullNameInput.classList.remove('is-invalid');
            // Añadir aquí el código para ocultar el mensaje de error
            fullNameInput.nextElementSibling.style.display = 'none';
        }

        // Validación del teléfono
        const phoneInput = document.getElementById('phoneNumber');
        if (!phoneInput.value.trim() || !/^\+?\d{10,15}$/.test(phoneInput.value)) {
            isValid = false;
            phoneInput.classList.add('is-invalid');
            // Añadir aquí el código para mostrar el mensaje de error
            phoneInput.nextElementSibling.style.display = 'block';
        } else {
            phoneInput.classList.remove('is-invalid');
            // Añadir aquí el código para ocultar el mensaje de error
            phoneInput.nextElementSibling.style.display = 'none';
        }

        // Validación del email
        const emailInput = document.getElementById('email');
        if (!emailInput.value.trim() || !emailInput.checkValidity()) {
            isValid = false;
            emailInput.classList.add('is-invalid');
            // Añadir aquí el código para mostrar el mensaje de error
            emailInput.nextElementSibling.style.display = 'block';
        } else {
            emailInput.classList.remove('is-invalid');
            // Añadir aquí el código para ocultar el mensaje de error
            emailInput.nextElementSibling.style.display = 'none';
        }

        // Validación del mensaje
        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim()) {
            isValid = false;
            messageInput.classList.add('is-invalid');
            // Añadir aquí el código para mostrar el mensaje de error
            messageInput.nextElementSibling.style.display = 'block';
        } else {
            messageInput.classList.remove('is-invalid');
            // Añadir aquí el código para ocultar el mensaje de error
            messageInput.nextElementSibling.style.display = 'none';
        }

        // Si no es válido, detener el envío del formulario
        if (!isValid) {
            event.preventDefault();
        }
    });
});