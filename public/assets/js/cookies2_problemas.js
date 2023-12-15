function generarQR() {
    var type = this.dataset.type; // esto asumirá que el botón presionado tiene un data-type atributo
    var qrData = '';

    switch (type) {
        case 'url':
            // Lógica para URLs
                var url = document.getElementById('qr-input').value;
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
            break;
        case 'mensaje':
            // Lógica para Mensajes
            break;
        case 'texto':
            // Lógica para Texto
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
        if (type === 'email') {
            document.getElementById('email-form').style.display = 'block';
            document.getElementById('input-area').style.display = 'none'; // Ocultar el input de URL
        } else if (type === 'url' || type === 'text') {
            document.getElementById('email-form').style.display = 'none';
            document.getElementById('input-area').style.display = 'block'; // Mostrar el input de URL
        } else {
            // Para todos los otros tipos, ocultar ambos
            document.getElementById('email-form').style.display = 'none';
            document.getElementById('input-area').style.display = 'none';
        }

        // Establecer el tipo de QR a generar
        document.getElementById('generate-qr').dataset.type = type;
    });
});

// Event listener para el botón de generar QR
document.getElementById('generate-qr').addEventListener('click', generarQR);