function generarQR() {
    var type = this.dataset.type; // esto asumirá que el botón presionado tiene un data-type atributo
    if (!type) {
        alert('Por favor, selecciona el tipo de QR que deseas generar.');
        return; // Detiene la ejecución de la función si no se ha seleccionado un tipo
    }
    var qrData = '';

    switch (type) {
        case 'url':
            // Lógica para URLs
            var url = document.getElementById('qr-url-input').value;
            if (!url) {
                alert('Por favor, ingresa una URL.');
                return;
            }
            qrData = encodeURIComponent(url);
            break;

        case 'email':
            // Lógica para Emails
            var emailAddress = document.getElementById('email-address').value;
            var emailSubject = document.getElementById('email-subject').value;
            var emailMessage = document.getElementById('email-message').value;

            if (!emailAddress) {
                alert('Por favor, ingresa una Correo.');
                return;
            }

            qrData = 'mailto:' + encodeURIComponent(emailAddress);
            var params = [];
            if (emailSubject) {
                params.push('subject=' + encodeURIComponent(emailSubject));
            }
            if (emailMessage) {
                params.push('body=' + encodeURIComponent(emailMessage));
            }
            if (params.length) {
                qrData += '?' + params.join('&');
            }
            break;

        case 'wifi':
            // Lógica para WiFi
            var ssid = document.getElementById('wifi-red').value;
            var password = document.getElementById('wifi-contraseña').value;

            if (!ssid) {
                alert('Por favor, ingresa el nombre de la red WiFi.');
                return;
            }
            qrData = 'WIFI:S:' + encodeURIComponent(ssid) + ';T:WPA;P:' + encodeURIComponent(password) + ';;';
            break;
            break;

        case 'sms':
            // Lógica para Mensajes
            var telefono = document.getElementById('sms-phone').value;
            var mensaje = document.getElementById('sms-message').value;

            if (!telefono) {
                alert('Por favor, ingresa un número de teléfono.');
                return;
            }
            qrData = 'sms:' + encodeURIComponent(telefono) + '?body=' + encodeURIComponent(mensaje);
            break;

        case 'texto':
            // Lógica para Texto
            var texto = document.getElementById('qr-text-input').value; // Asegúrate de que este es el ID correcto
            if (!texto) {
                alert('Por favor, ingresa un texto.');
                return;
            }
            qrData = encodeURIComponent(texto);
            break;
        default:
            console.error('Tipo no reconocido:', type);
            return;
    }

    // Encuentra el selector de tamaño activo basado en el tipo de QR
    var sizeSelector = document.querySelector('#qr-' + type + '-area .sizeqr');
    var size = sizeSelector ? sizeSelector.value : '200'; // Usar un valor por defecto si no se encuentra

    // Hacer la solicitud fetch al backend para generar el QR
    fetch('/generar-qr?url=' + qrData + '&size=' + size)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.blob();
        })
        .then(blob => {
            // Crear un URL con el blob recibido y mostrarlo en el img
            var newImg = document.createElement('img');
            var url = URL.createObjectURL(blob);

            newImg.onload = function () {
                // No necesitas más el blob, así que liberamos la memoria
                URL.revokeObjectURL(url);
            };

            newImg.src = url;
            var qrPreviewDiv = document.querySelector('.qr-preview');
            qrPreviewDiv.innerHTML = ''; // Limpia el contenido actual
            qrPreviewDiv.appendChild(newImg); // Añade la nueva imagen QR
            qrPreviewDiv.dataset.qrData = qrData;
            qrPreviewDiv.dataset.size = size; // Guarda el tamaño en el dataset

            // Borrar el contenido del campo basado en el tipo de QR
            switch (type) {
                case 'url':
                    document.getElementById('qr-url-input').value = '';
                    break;
                case 'email':
                    document.getElementById('email-address').value = '';
                    document.getElementById('email-subject').value = '';
                    document.getElementById('email-message').value = '';
                    break;
                case 'wifi':
                    document.getElementById('wifi-red').value = '';
                    document.getElementById('wifi-contraseña').value = '';
                    break;
                case 'sms':
                    document.getElementById('sms-phone').value = '';
                    document.getElementById('sms-message').value = '';
                    break;
                case 'texto':
                    document.getElementById('qr-text-input').value = '';
                    break;
                // No es necesario un caso 'default' aquí
            }
        })
        .catch(error => {
            console.error('Error al generar el QR:', error);
            alert('Hubo un error al generar el código QR.');
        });
}

//Establece el tipo de QR en URL por defecto
document.addEventListener('DOMContentLoaded', function () {
    // Establecer el tipo de QR por defecto como 'url'
    var generateQRButton = document.getElementById('generate-qr');
    if (generateQRButton) {
        generateQRButton.dataset.type = 'url';
    }

    // Opcionalmente, también puedes mostrar automáticamente el área de entrada para URLs
    var inputArea = document.getElementById('qr-url-area');
    if (inputArea) {
        inputArea.style.display = 'block';
    }

    var selectors = document.querySelectorAll('.sizeqr');
    selectors.forEach(function (selector) {
        selector.value = '200';
    });

});

// Event listeners para botones de tipo de QR
var optionButtons = document.querySelectorAll('.option-button');
optionButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var type = this.dataset.type;

        // Mostrar el formulario de email si el tipo es 'email'
        var inputArea = document.getElementById('qr-url-area');
        var emailForm = document.getElementById('qr-email-area');
        var textArea = document.getElementById('qr-texto-area'); // Asegúrate de que este es el ID correcto
        var smsArea = document.getElementById('qr-sms-area');
        var wifiArea = document.getElementById('qr-wifi-area');

        // Ocultar todos los campos
        inputArea.style.display = 'none';
        emailForm.style.display = 'none';
        textArea.style.display = 'none';
        smsArea.style.display = 'none';
        wifiArea.style.display = 'none';


        // Mostrar el campo adecuado basado en el tipo seleccionado
        if (type === 'email') {
            emailForm.style.display = 'block';
        } else if (type === 'url') {
            inputArea.style.display = 'block';
        } else if (type === 'texto') {
            textArea.style.display = 'block';
        } else if (type === 'sms') {
            smsArea.style.display = 'block';
        } else if (type === 'wifi') {
            wifiArea.style.display = 'block';
        }

        // Establecer el tipo de QR a generar
        document.getElementById('generate-qr').dataset.type = type;
    });
});

// Event listener para el botón de generar QR
document.getElementById('generate-qr').addEventListener('click', generarQR);