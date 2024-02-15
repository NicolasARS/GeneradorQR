$(document).ready(function() {
    // Limpia los campos de entrada al recargar la pagina
    $('form').each(function(){ 
        this.reset(); });
    // Inicializar validaciones para cada tipo de QR
    // Validación para URL
    $("#qr-url-form").validate({
        rules: {
            "qr-url-input": {
                required: true,
                url: true
            }
        },
        messages: {
            "qr-url-input": {
                required: "Por favor, ingresa una URL.",
                url: "La URL no es válida."
            }
        }
    });

    $("#qr-text-form").validate({
        rules: {
            "qr-text-input": {
                required: true
            }
        },
        messages: {
            "qr-text-input": {
                required: "Por favor, ingresa algún texto."
            }
        }
    });
    // Validación para Email - Asume que el formulario de email ya está inicializado con .validate()
    $("#qr-email-form").validate({
        rules: {
            "email-address": {
                required: true,
                email: true
            },
            "email-subject": {
                required: false // Según sea necesario
            },
            "email-message": {
                required: true // Según sea necesario
            }
        },
        messages: {
            "email-address": {
                required: "Por favor, introduce una dirección de email.",
                email: "La dirección de email no es válida."
            },
            "email-message":{
                required: "Porfavor, escribe el mensaje a enviar."
            }
        }
    });

    // Validación para SMS - Asume que el formulario de SMS ya está inicializado con .validate()
    $("#qr-sms-form").validate({
        rules: {
            "sms-phone": {
                required: true,
                digits: true,
                minlength: 12 // Ajusta esto según las necesidades específicas de tu validación
            },
            "sms-message": {
                required: true
            }
        },
        messages: {
            "sms-phone": {
                required: "Por favor, ingresa un número de teléfono.",
                digits: "Por favor, ingresa solo números.",
                minlength: "El número de teléfono debe tener al menos 10 dígitos."
            },
            "sms-message": {
                required: "Por favor, ingresa un mensaje."
            }
        }
    });

    // Validación para WiFi - Asume que el formulario de WiFi ya está inicializado con .validate()
    $("#qr-wifi-form").validate({
        rules: {
            "wifi-red": {
                required: true
            },
            "wifi-contraseña": {
                required: function(element) {
                    return $("#wifi-wpa").is(":checked") || $("#wifi-wep").is(":checked");
                }
            }
        },
        messages: {
            "wifi-red": {
                required: "Por favor, ingresa el nombre de la red WiFi."
            },
            "wifi-contraseña": {
                required: "La contraseña es requerida para redes seguras."
            }
        }
    });

    // Comprobar y ejecutar la validación en el evento de clic del botón de generación de QR
    $('#generate-qr').click(function(e) {
        var isValid = true;
        var type = $(this).attr('data-type'); // Obtiene el tipo de QR a generar basado en el botón activo

        // Determina qué validación ejecutar basada en el tipo de QR
        switch(type) {
            case 'url':
                isValid = $("#qr-url-form").valid();
                break;
            case 'email':
                isValid = $("#qr-email-form").valid();
                break;
            case 'texto':
                isValid = $("#qr-text-form").valid();
                break;
            case 'sms':
                isValid = $("#qr-sms-form").valid();
                break;
            case 'wifi':
                isValid = $("#qr-wifi-form").valid();
                break;
        }

        if (!isValid) {
            e.preventDefault(); // Detiene la generación del QR si la validación falla
            return;
        }
        // Si es válido, el evento de clic continuará y generará el QR según tu lógica existente
    });

    // Añade aquí el resto de tu código JavaScript para la interacción de los botones de opción y cualquier otra lógica necesaria
});