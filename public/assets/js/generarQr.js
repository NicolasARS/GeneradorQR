function generarQR() {
    var type = this.dataset.type; // esto asumirá que el botón presionado tiene un data-type atributo
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

    // Hacer la solicitud fetch al backend para generar el QR
    fetch('/generar-qr?url=' + qrData)
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

            newImg.onload = function() {
                // No necesitas más el blob, así que liberamos la memoria
                URL.revokeObjectURL(url);
            };

            newImg.src = url;
            var qrPreviewDiv = document.querySelector('.qr-preview');
            qrPreviewDiv.innerHTML = ''; // Limpia el contenido actual
            qrPreviewDiv.appendChild(newImg); // Añade la nueva imagen QR
        })
        .catch(error => {
            console.error('Error al generar el QR:', error);
            alert('Hubo un error al generar el código QR.');
        });
}

// Event listeners para botones de tipo de QR
var optionButtons = document.querySelectorAll('.option-button');
optionButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var type = this.dataset.type;
        
        // Mostrar el formulario de email si el tipo es 'email'
        var inputArea = document.getElementById('qr-url-area');
        var emailForm = document.getElementById('qr-email-area');
        var textArea = document.getElementById('qr-text-area'); // Asegúrate de que este es el ID correcto
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
